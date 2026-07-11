const { app } = require("@azure/functions");
const { BlobServiceClient } = require("@azure/storage-blob");

const OWNER_EMAIL = "mdfirouzjaei@gmail.com";
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER || "site-data";
const BLOB_NAME = process.env.AZURE_STATE_BLOB || "site-state.json";
const MAX_STATE_BYTES = 32 * 1024 * 1024;

let containerPromise = null;

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
      ...(etag ? { ETag: etag } : {}),
    },
  };
}

function clientPrincipal(request) {
  const encoded = request.headers.get("x-ms-client-principal");
  if (!encoded) return null;
  try {
    return JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

function principalEmail(principal) {
  const claims = Array.isArray(principal?.claims) ? principal.claims : [];
  const emailClaim = claims.find((claim) => {
    const type = String(claim?.typ || claim?.type || "").toLowerCase();
    return type === "email" || type === "emails" || type === "preferred_username" || type.endsWith("/emailaddress");
  });
  return normalizeEmail(principal?.userDetails || emailClaim?.val || emailClaim?.value);
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

async function getContainerClient() {
  if (!containerPromise) {
    containerPromise = (async () => {
      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
      if (!connectionString) throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured.");
      const service = BlobServiceClient.fromConnectionString(connectionString);
      const container = service.getContainerClient(CONTAINER_NAME);
      await container.createIfNotExists();
      return container;
    })();
  }
  return containerPromise;
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

async function getState(request, context) {
  try {
    const stored = await readStateBlob();
    if (!stored.state) return jsonResponse(404, { message: "داده مشترک هنوز ایجاد نشده است." });
    const email = principalEmail(clientPrincipal(request));
    const responseState = isAdminEmail(email, stored.state) ? stored.state : publicState(stored.state);
    return jsonResponse(200, responseState, stored.etag);
  } catch (error) {
    context.error("Unable to read shared state", error);
    return jsonResponse(500, { message: "دریافت داده مشترک از Azure انجام نشد." });
  }
}

async function putState(request, context) {
  try {
    const stored = await readStateBlob();
    const email = principalEmail(clientPrincipal(request));
    if (!email) return jsonResponse(401, { message: "ابتدا با حساب مایکروسافت وارد شوید." });
    if (!isAdminEmail(email, stored.state)) return jsonResponse(403, { message: "این حساب در فهرست مدیران سایت نیست." });

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
    const now = new Date().toISOString();
    state.updatedAt = now;
    state.publishedAt = now;
    state.publishedVersion = "site-state-v2-azure";

    const ifMatch = request.headers.get("if-match");
    if (ifMatch && stored.etag && ifMatch !== stored.etag) {
      return jsonResponse(412, { message: "نسخه تازه‌تری در Azure ذخیره شده است." }, stored.etag);
    }

    const content = Buffer.from(JSON.stringify(state, null, 2), "utf8");
    const upload = await stored.blob.uploadData(content, {
      blobHTTPHeaders: { blobContentType: "application/json; charset=utf-8" },
      conditions: ifMatch && stored.etag ? { ifMatch: stored.etag } : undefined,
    });
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

app.http("putSharedState", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "state",
  handler: putState,
});
