const { app } = require("@azure/functions");
const { BlobServiceClient } = require("@azure/storage-blob");
const { randomBytes, scryptSync, timingSafeEqual } = require("node:crypto");
const { SignJWT, jwtVerify } = require("jose");

const OWNER_EMAIL = "mdfirouzjaei@gmail.com";
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER || "site-data";
const BLOB_NAME = process.env.AZURE_STATE_BLOB || "site-state.json";
const CREDENTIALS_BLOB_NAME = process.env.AZURE_CREDENTIALS_BLOB || "admin-credentials.json";
const MAX_STATE_BYTES = 32 * 1024 * 1024;
const SITE_AUTH_SECRET = process.env.SITE_AUTH_SECRET || "";
const OWNER_PASSWORD_HASH = process.env.OWNER_PASSWORD_HASH || "";
const SITE_AUTH_ISSUER = "firouzjaei-family-api";
const SITE_AUTH_AUDIENCE = "firouzjaei.com";
const SITE_SESSION_SECONDS = 30 * 24 * 60 * 60;

let containerPromise = null;
const loginAttempts = new Map();

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function jsonResponse(status, body, etag = "") {
  return {
    status,
    jsonBody: body,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Expose-Headers": "ETag",
      ...(etag ? { ETag: etag } : {}),
    },
  };
}

function authSecretKey() {
  const key = Buffer.from(SITE_AUTH_SECRET, "base64");
  if (key.length < 32) throw new Error("Site authentication is not configured.");
  return key;
}

async function bearerSession(request) {
  const authorization = request.headers.get("authorization") || "";
  if (!authorization.toLowerCase().startsWith("bearer ")) return null;
  const token = authorization.slice(7).trim();
  if (!token) return null;
  const { payload } = await jwtVerify(token, authSecretKey(), {
    issuer: SITE_AUTH_ISSUER,
    audience: SITE_AUTH_AUDIENCE,
    algorithms: ["HS256"],
  });
  const email = normalizeEmail(payload?.email || payload?.sub);
  return email ? { email, role: payload?.role === "owner" ? "owner" : "admin" } : null;
}

async function authenticatedSession(request) {
  try {
    return await bearerSession(request);
  } catch {
    return null;
  }
}

async function authenticatedEmail(request) {
  return (await authenticatedSession(request))?.email || "";
}

function sanitizeState(value) {
  const state = JSON.parse(JSON.stringify(value || {}));
  const admins = (Array.isArray(state.admins) ? state.admins : [])
    .map((admin) => ({
      email: normalizeEmail(admin?.email),
      role: admin?.role === "owner" ? "owner" : "admin",
    }))
    .filter((admin) => admin.email);
  const owner = admins.find((admin) => admin.email === OWNER_EMAIL);
  if (owner) owner.role = "owner";
  else admins.unshift({ email: OWNER_EMAIL, role: "owner" });
  state.admins = admins;
  return state;
}

function publicState(value) {
  const state = sanitizeState(value);
  state.admins = [];
  state.subscribers = [];
  state.submissions = [];
  state.articleComments = [];
  return state;
}

function isAdminEmail(email, state) {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  if (normalized === OWNER_EMAIL) return true;
  return (state?.admins || []).some((admin) => normalizeEmail(admin?.email) === normalized);
}

function passwordHash(password) {
  const salt = randomBytes(16);
  const cost = 16384;
  const blockSize = 8;
  const parallelization = 1;
  const derived = scryptSync(String(password), salt, 64, {
    N: cost,
    r: blockSize,
    p: parallelization,
    maxmem: 64 * 1024 * 1024,
  });
  return ["scrypt", cost, blockSize, parallelization, salt.toString("base64"), derived.toString("base64")].join("$");
}

function passwordMatches(password, encodedHash) {
  const [algorithm, costRaw, blockSizeRaw, parallelizationRaw, saltRaw, hashRaw] = String(encodedHash || "").split("$");
  if (algorithm !== "scrypt" || !saltRaw || !hashRaw) return false;
  const expected = Buffer.from(hashRaw, "base64");
  if (!expected.length) return false;
  const actual = scryptSync(String(password), Buffer.from(saltRaw, "base64"), expected.length, {
    N: Number(costRaw),
    r: Number(blockSizeRaw),
    p: Number(parallelizationRaw),
    maxmem: 64 * 1024 * 1024,
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function normalizeCredentials(value) {
  const credentials = (Array.isArray(value) ? value : [])
    .map((credential) => ({
      email: normalizeEmail(credential?.email),
      role: credential?.role === "owner" ? "owner" : "admin",
      passwordHash: String(credential?.passwordHash || ""),
      updatedAt: String(credential?.updatedAt || ""),
    }))
    .filter((credential) => credential.email && credential.passwordHash);
  const owner = credentials.find((credential) => credential.email === OWNER_EMAIL);
  if (owner) owner.role = "owner";
  else if (OWNER_PASSWORD_HASH) {
    credentials.unshift({
      email: OWNER_EMAIL,
      role: "owner",
      passwordHash: OWNER_PASSWORD_HASH,
      updatedAt: new Date().toISOString(),
    });
  }
  return credentials;
}

async function issueSessionToken(email, role) {
  return new SignJWT({ email, role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(SITE_AUTH_ISSUER)
    .setAudience(SITE_AUTH_AUDIENCE)
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SITE_SESSION_SECONDS}s`)
    .sign(authSecretKey());
}

async function getContainerClient() {
  if (!containerPromise) {
    containerPromise = (async () => {
      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || process.env.AzureWebJobsStorage;
      if (!connectionString) throw new Error("Azure Storage is not configured.");
      const service = BlobServiceClient.fromConnectionString(connectionString);
      const container = service.getContainerClient(CONTAINER_NAME);
      await container.createIfNotExists();
      return container;
    })();
  }
  return containerPromise;
}

async function readCredentials() {
  const container = await getContainerClient();
  const blob = container.getBlockBlobClient(CREDENTIALS_BLOB_NAME);
  try {
    const download = await blob.download();
    const buffer = await streamToBuffer(download.readableStreamBody);
    return { credentials: normalizeCredentials(JSON.parse(buffer.toString("utf8"))), blob };
  } catch (error) {
    if (error?.statusCode === 404) return { credentials: normalizeCredentials([]), blob };
    throw error;
  }
}

async function writeCredentials(blob, credentials) {
  const content = Buffer.from(JSON.stringify(normalizeCredentials(credentials), null, 2), "utf8");
  await blob.uploadData(content, {
    blobHTTPHeaders: { blobContentType: "application/json; charset=utf-8" },
  });
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

async function readStateBlob() {
  const container = await getContainerClient();
  const blob = container.getBlockBlobClient(BLOB_NAME);
  try {
    const download = await blob.download();
    const buffer = await streamToBuffer(download.readableStreamBody);
    return { state: sanitizeState(JSON.parse(buffer.toString("utf8"))), etag: download.etag || "", blob };
  } catch (error) {
    if (error?.statusCode === 404) return { state: null, etag: "", blob };
    throw error;
  }
}

async function writeStateBlob(stored, state, ifMatch = "") {
  const content = Buffer.from(JSON.stringify(sanitizeState(state), null, 2), "utf8");
  return stored.blob.uploadData(content, {
    blobHTTPHeaders: { blobContentType: "application/json; charset=utf-8" },
    conditions: ifMatch && stored.etag ? { ifMatch } : undefined,
  });
}

function loginAttemptKey(request, email) {
  const forwarded = String(request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  return `${forwarded || "unknown"}:${email}`;
}

function isLoginRateLimited(key) {
  const now = Date.now();
  for (const [attemptKey, record] of loginAttempts) {
    if (record.resetAt <= now) loginAttempts.delete(attemptKey);
  }
  const record = loginAttempts.get(key);
  return Boolean(record && record.count >= 6 && record.resetAt > now);
}

function recordLoginFailure(key) {
  const now = Date.now();
  const record = loginAttempts.get(key);
  if (!record || record.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return;
  }
  record.count += 1;
}

async function loginAdmin(request, context) {
  try {
    if (!SITE_AUTH_SECRET || !OWNER_PASSWORD_HASH) {
      return jsonResponse(503, { message: "ورود مدیر هنوز در Azure پیکربندی نشده است." });
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { message: "ایمیل و رمز عبور را وارد کنید." });
    }
    const email = normalizeEmail(body?.email);
    const password = String(body?.password || "");
    if (!email || !password || password.length > 256) {
      return jsonResponse(400, { message: "ایمیل و رمز عبور را وارد کنید." });
    }

    const attemptKey = loginAttemptKey(request, email);
    if (isLoginRateLimited(attemptKey)) {
      return jsonResponse(429, { message: "تلاش‌های ورود بیش از حد بود. پانزده دقیقه بعد دوباره امتحان کنید." });
    }

    const [stored, credentialStore] = await Promise.all([readStateBlob(), readCredentials()]);
    const credential = credentialStore.credentials.find((item) => item.email === email);
    if (!stored.state || !isAdminEmail(email, stored.state) || !credential || !passwordMatches(password, credential.passwordHash)) {
      recordLoginFailure(attemptKey);
      return jsonResponse(401, { message: "ایمیل یا رمز عبور درست نیست." });
    }

    loginAttempts.delete(attemptKey);
    const role = email === OWNER_EMAIL ? "owner" : "admin";
    const token = await issueSessionToken(email, role);
    return jsonResponse(200, {
      token,
      email,
      role,
      expiresAt: new Date(Date.now() + SITE_SESSION_SECONDS * 1000).toISOString(),
    });
  } catch (error) {
    context.error("Unable to authenticate administrator", error);
    return jsonResponse(500, { message: "ورود مدیر انجام نشد. دوباره تلاش کنید." });
  }
}

async function upsertAdmin(request, context) {
  try {
    const ownerEmail = await authenticatedEmail(request);
    if (!ownerEmail) return jsonResponse(401, { message: "نشست مدیریت پایان یافته است؛ دوباره وارد شوید." });
    if (ownerEmail !== OWNER_EMAIL) return jsonResponse(403, { message: "فقط مالک می‌تواند مدیران را تغییر دهد." });

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, { message: "اطلاعات مدیر کامل نیست." });
    }
    const email = normalizeEmail(body?.email);
    const password = String(body?.password || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonResponse(400, { message: "ایمیل مدیر درست نیست." });
    if (password.length < 8 || password.length > 128) {
      return jsonResponse(400, { message: "رمز عبور باید دست‌کم ۸ نویسه باشد." });
    }

    const [stored, credentialStore] = await Promise.all([readStateBlob(), readCredentials()]);
    if (!stored.state) return jsonResponse(404, { message: "داده مشترک سایت پیدا نشد." });
    const now = new Date().toISOString();
    const role = email === OWNER_EMAIL ? "owner" : "admin";
    const existingAdmin = stored.state.admins.find((admin) => admin.email === email);
    if (existingAdmin) existingAdmin.role = role;
    else stored.state.admins.push({ email, role });

    const existingCredential = credentialStore.credentials.find((credential) => credential.email === email);
    const nextCredential = { email, role, passwordHash: passwordHash(password), updatedAt: now };
    if (existingCredential) Object.assign(existingCredential, nextCredential);
    else credentialStore.credentials.push(nextCredential);

    stored.state.updatedAt = now;
    await writeCredentials(credentialStore.blob, credentialStore.credentials);
    const upload = await writeStateBlob(stored, stored.state);
    return jsonResponse(200, { admins: sanitizeState(stored.state).admins }, upload.etag || "");
  } catch (error) {
    context.error("Unable to save administrator", error);
    return jsonResponse(500, { message: "ذخیره مدیر در Azure انجام نشد." });
  }
}

async function deleteAdmin(request, context) {
  try {
    const ownerEmail = await authenticatedEmail(request);
    if (!ownerEmail) return jsonResponse(401, { message: "نشست مدیریت پایان یافته است؛ دوباره وارد شوید." });
    if (ownerEmail !== OWNER_EMAIL) return jsonResponse(403, { message: "فقط مالک می‌تواند مدیران را تغییر دهد." });

    const email = normalizeEmail(decodeURIComponent(String(request.params?.email || "")));
    if (!email || email === OWNER_EMAIL) return jsonResponse(400, { message: "حساب مالک را نمی‌توان حذف کرد." });
    const [stored, credentialStore] = await Promise.all([readStateBlob(), readCredentials()]);
    if (!stored.state) return jsonResponse(404, { message: "داده مشترک سایت پیدا نشد." });
    stored.state.admins = stored.state.admins.filter((admin) => admin.email !== email);
    credentialStore.credentials = credentialStore.credentials.filter((credential) => credential.email !== email);
    stored.state.updatedAt = new Date().toISOString();
    await writeCredentials(credentialStore.blob, credentialStore.credentials);
    const upload = await writeStateBlob(stored, stored.state);
    return jsonResponse(200, { admins: sanitizeState(stored.state).admins }, upload.etag || "");
  } catch (error) {
    context.error("Unable to delete administrator", error);
    return jsonResponse(500, { message: "حذف مدیر از Azure انجام نشد." });
  }
}

async function getState(request, context) {
  try {
    const stored = await readStateBlob();
    if (!stored.state) return jsonResponse(404, { message: "داده مشترک هنوز ایجاد نشده است." });
    const hasBearerToken = String(request.headers.get("authorization") || "").toLowerCase().startsWith("bearer ");
    const adminSession = await authenticatedSession(request);
    if (hasBearerToken && !adminSession) return jsonResponse(401, { message: "نشست مدیریت پایان یافته است؛ دوباره وارد شوید." });
    if (adminSession && !isAdminEmail(adminSession.email, stored.state)) {
      return jsonResponse(403, { message: "این ایمیل در فهرست مدیران سایت نیست." });
    }
    const responseState = adminSession ? stored.state : publicState(stored.state);
    return jsonResponse(200, responseState, stored.etag);
  } catch (error) {
    context.error("Unable to read shared state", error);
    return jsonResponse(500, { message: "دریافت داده مشترک از Azure انجام نشد." });
  }
}

async function putState(request, context) {
  try {
    const stored = await readStateBlob();
    const email = await authenticatedEmail(request);
    if (!email) return jsonResponse(401, { message: "نشست مدیریت پایان یافته است؛ دوباره وارد شوید." });
    if (!isAdminEmail(email, stored.state)) return jsonResponse(403, { message: "این ایمیل در فهرست مدیران سایت نیست." });

    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_STATE_BYTES) {
      return jsonResponse(413, { message: "حجم داده برای ذخیره یک‌جا بیش از حد مجاز است." });
    }

    let incoming;
    try {
      incoming = JSON.parse(raw);
    } catch {
      return jsonResponse(400, { message: "ساختار داده JSON درست نیست." });
    }
    if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
      return jsonResponse(400, { message: "ساختار داده سایت درست نیست." });
    }

    const state = sanitizeState(incoming);
    state.admins = sanitizeState(stored.state).admins;
    const now = new Date().toISOString();
    state.updatedAt = now;
    state.publishedAt = now;
    state.publishedVersion = "site-state-v2-azure";

    const ifMatch = request.headers.get("if-match");
    if (ifMatch && stored.etag && ifMatch !== stored.etag) {
      return jsonResponse(412, { message: "نسخه تازه‌تری در Azure ذخیره شده است." }, stored.etag);
    }

    const upload = await writeStateBlob(stored, state, ifMatch);
    return jsonResponse(200, { state }, upload.etag || "");
  } catch (error) {
    if (error?.statusCode === 409 || error?.statusCode === 412) {
      return jsonResponse(412, { message: "نسخه تازه‌تری در Azure ذخیره شده است." });
    }
    context.error("Unable to save shared state", error);
    return jsonResponse(500, { message: "ذخیره داده مشترک در Azure انجام نشد." });
  }
}

app.http("getSharedState", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "state",
  handler: getState,
});

app.http("loginAdmin", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "auth/login",
  handler: loginAdmin,
});

app.http("upsertAdmin", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "auth/admins",
  handler: upsertAdmin,
});

app.http("deleteAdmin", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "auth/admins/{email}",
  handler: deleteAdmin,
});

app.http("putSharedState", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "state",
  handler: putState,
});
