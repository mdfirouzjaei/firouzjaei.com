import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "assets", "book", "family-tree", "book-family-tree.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const peopleById = new Map(data.people.map((person) => [person.id, person]));
const failures = [];

const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const person = (id) => {
  const value = peopleById.get(id);
  expect(Boolean(value), `Missing expected person: ${id}`);
  return value || {};
};

const sameIds = (actual, expected) => {
  const left = [...actual].sort();
  const right = [...expected].sort();
  return left.length === right.length && left.every((id, index) => id === right[index]);
};

const hosseinJan = person("b-hossein-jan-mehdi");
expect(hosseinJan.aliases?.includes("\u062d\u06cc\u0646 \u062c\u0627\u0646"), "Hossein Jan is missing the Hin Jan alias");
expect(!hosseinJan.aliases?.includes("\u062c\u0645\u06cc\u0646 \u062c\u0627\u0646"), "The OCR-only Jamin Jan reading remains");
expect(hosseinJan.sourcePages?.includes(32), "Hossein Jan is missing the page 32 citation");

const janmar = person("b-janmar-teymourpour");
expect(janmar.name === "\u062c\u0627\u0646\u200c\u0645\u0627\u0631 \u062a\u06cc\u0645\u0648\u0631\u067e\u0648\u0631", "Janmar spelling is not normalized");
expect(janmar.confidence === "high", "Janmar should be high confidence after the cross-book name check");

const gorji = person("b-gorji-khan-rezaqoli");
expect(gorji.gender === "unknown", "Gorgi Khan has an inferred gender not stated by the book");
expect(gorji.confidence === "medium", "Gorgi Khan should remain marked for family review");

const malak = person("b-malak-mehdi");
expect(sameIds(malak.parentIds || [], ["b-mehdi-soltan", "b-houri-mehdi"]), "Malak's biological parents changed");
expect(sameIds(malak.adoptiveParentIds || [], ["b-abdolhossein-khan-sartip"]), "Malak's adoptive relationship is missing");
person("b-abdolhossein-khan-sartip");

const mehdi = person("b-mehdi-soltan");
expect(mehdi.unnamedSpouseCount === 1, "Mehdi Soltan's unnamed first wife is not recorded");

const sanobarChildIds = data.people
  .filter((entry) => entry.parentIds?.includes("b-sanobar-arayi"))
  .map((entry) => entry.id);
const khavarChildIds = data.people
  .filter((entry) => entry.parentIds?.includes("b-khavar-tonkaboni"))
  .map((entry) => entry.id);

expect(sameIds(sanobarChildIds, [
  "b-mohammad-agha-mehdi",
  "b-abdolrashid-hosseinjan",
  "b-ali-akbar-hosseinjan",
  "b-abbas-hosseinjan",
  "b-abdollah-hosseinjan",
  "b-kolsum-hosseinjan",
  "b-khanom-hosseinjan",
  "b-khatun-hosseinjan",
  "b-nazafarin-hosseinjan",
]), "Sanobar Arayi's children do not match page 32");

expect(sameIds(khavarChildIds, [
  "b-gholamali-hosseinjan",
  "b-pori-hosseinjan",
]), "Khavar Tonkaboni's children do not match page 32");

for (const childId of [...sanobarChildIds, ...khavarChildIds]) {
  expect(person(childId).sourcePages?.includes(32), `${childId} is missing the page 32 citation`);
}

expect(data.reviewedPdfPages.includes(32), "Page 32 is missing from reviewedPdfPages");

const summary = {
  status: failures.length ? "failed" : "passed",
  checks: 12 + sanobarChildIds.length + khavarChildIds.length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
