import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "assets", "book", "family-tree", "book-family-tree.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const peopleById = new Map();
const errors = [];

for (const person of data.people) {
  if (!person.id || !person.name) errors.push(`Person is missing id or name: ${JSON.stringify(person)}`);
  if (peopleById.has(person.id)) errors.push(`Duplicate person id: ${person.id}`);
  peopleById.set(person.id, person);
}

for (const person of data.people) {
  if ((person.parentIds || []).length > 2) errors.push(`More than two parents: ${person.id}`);
  if (!Array.isArray(person.sourcePages) || !person.sourcePages.length) errors.push(`Missing source page: ${person.id}`);
  if (!["high", "medium", "low"].includes(person.confidence)) errors.push(`Invalid confidence: ${person.id}`);
  if (!["male", "female", "unknown"].includes(person.gender)) errors.push(`Invalid gender: ${person.id}`);

  for (const parentId of person.parentIds || []) {
    const parent = peopleById.get(parentId);
    if (!parent) {
      errors.push(`Missing parent ${parentId} for ${person.id}`);
      continue;
    }
    if (Number(parent.generation) >= Number(person.generation)) {
      errors.push(`Generation does not descend: ${parent.id} -> ${person.id}`);
    }
  }

  for (const parentId of person.adoptiveParentIds || []) {
    const parent = peopleById.get(parentId);
    if (!parent) {
      errors.push(`Missing adoptive parent ${parentId} for ${person.id}`);
      continue;
    }
    if (parentId === person.id) errors.push(`Self adoptive-parent link: ${person.id}`);
    if ((person.parentIds || []).includes(parentId)) {
      errors.push(`Parent is both biological and adoptive: ${parentId} -> ${person.id}`);
    }
    if (Number(parent.generation) >= Number(person.generation)) {
      errors.push(`Adoptive generation does not descend: ${parent.id} -> ${person.id}`);
    }
  }

  for (const spouseId of person.spouseIds || []) {
    const spouse = peopleById.get(spouseId);
    if (!spouse) {
      errors.push(`Missing spouse ${spouseId} for ${person.id}`);
      continue;
    }
    if (!(spouse.spouseIds || []).includes(person.id)) {
      errors.push(`Spouse link is not reciprocal: ${person.id} <-> ${spouseId}`);
    }
  }
}

const summary = {
  people: data.people.length,
  highConfidence: data.people.filter((person) => person.confidence === "high").length,
  needsReview: data.people.filter((person) => person.confidence !== "high").length,
  multipleSpouses: data.people.filter((person) => (person.spouseIds || []).length > 1).length,
  unresolvedSpecificParent: data.people.filter((person) => person.parentUncertainty).length,
  adoptiveLinks: data.people.reduce((count, person) => count + (person.adoptiveParentIds || []).length, 0),
  reviewedPdfPages: data.reviewedPdfPages,
};

if (errors.length) {
  console.error(JSON.stringify({ ...summary, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ...summary, errors: [] }, null, 2));
