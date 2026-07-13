import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const bookSource = fs.readFileSync(path.join(root, "assets", "book", "book-data.js"), "utf8");

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  if (start < 0) throw new Error(`Function not found: ${name}`);
  const signatureEnd = source.indexOf(") {", start);
  if (signatureEnd < 0) throw new Error(`Function signature is incomplete: ${name}`);
  const braceStart = signatureEnd + 2;
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Function is incomplete: ${name}`);
}

const functionNames = [
  "normalizeGender",
  "bookIdentityKeys",
  "findBookMergeCandidate",
  "mergeBookPeople",
  "toEnglishDigits",
  "normalizeSearchText",
];
const sandbox = { result: null };
vm.createContext(sandbox);
vm.runInContext(
  [
    "const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';",
    "const clone = (value) => JSON.parse(JSON.stringify(value));",
    ...functionNames.map((name) => extractFunction(appSource, name)),
    "this.result = mergeBookPeople;",
  ].join("\n\n"),
  sandbox
);

const bookSandbox = { window: {} };
vm.createContext(bookSandbox);
vm.runInContext(bookSource, bookSandbox);
const bookData = bookSandbox.window.FIROUZJAEI_BOOK_DATA;
const response = await fetch(`https://firouzjaei-family-api.azurewebsites.net/api/state?audit=${Date.now()}`);
if (!response.ok) throw new Error(`Azure state request failed: HTTP ${response.status}`);
const published = await response.json();
const merged = sandbox.result(published.people, bookData.people);
const mergedById = new Map(merged.map((person) => [person.id, person]));
const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const publishedIds = new Set(published.people.map((person) => person.id));
const publishedPhotoIds = published.people.filter((person) => person.photo).map((person) => person.id);
const bookRecordIds = merged.map((person) => person.bookRecordId).filter(Boolean);

expect([...publishedIds].every((id) => mergedById.has(id)), "An existing Azure profile was removed");
expect(publishedPhotoIds.every((id) => mergedById.get(id)?.photo), "An existing profile photo was removed");
expect(bookData.people.every((person) => bookRecordIds.includes(person.id)), "A curated book record was not merged");
expect(new Set(bookRecordIds).size === bookRecordIds.length, "A curated book record was merged more than once");
expect(
  merged.some((person) => person.id === "p1783810512389" && person.bookRecordId === "b-agha-dadash"),
  "The shared Agha Dadash root was duplicated instead of matched"
);
expect(merged.some((person) => person.name === "مصطفی داداشی فیروزجایی"), "The existing Dadashi branch was not preserved");
expect(merged.some((person) => person.name === "عنایت سلطان"), "The curated Enayat Soltan branch was not added");

for (const person of merged) {
  for (const parentId of person.parentIds || []) {
    expect(mergedById.has(parentId), `Missing parent ${parentId} for ${person.id}`);
  }
  for (const spouseId of person.spouseIds || []) {
    expect(mergedById.has(spouseId), `Missing spouse ${spouseId} for ${person.id}`);
  }
}

const summary = {
  status: failures.length ? "failed" : "passed",
  azurePeople: published.people.length,
  curatedPeople: bookData.people.length,
  mergedPeople: merged.length,
  preservedPhotos: publishedPhotoIds.length,
  matchedBookRecords: bookRecordIds.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
