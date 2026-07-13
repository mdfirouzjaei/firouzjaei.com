# Book genealogy working data

This folder contains the genealogy reconstructed from *Az Balaganjkola ta Payin-Shalingchal*.
It is intentionally separate from the live website state until the complete graph has been reconciled.

## Source map

| PDF pages | Section |
| --- | --- |
| 26-30 | Common Shal ancestry and collateral lines of Morteza, Mohammad, Kazem, and Haji Taqi |
| 31-194 | Descendants of Mehdi Soltan, son of Haji Taqi |
| 195-302 | Descendants of Haji Biglar, son of Haji Taqi |
| 303-326 | Descendants of Ali Khan, son of Haji Taqi |
| 327-366 | Descendants of Tahmasb, son of Haji Taqi |

PDF page numbers match the printed page numbers in this scan.

## Confidence

- `high`: confirmed by a diagram and/or clear narrative text.
- `medium`: readable but spelling, alias, or identity needs another pass.
- `low`: best reading of a blurred label; retain for family review.

Unknown parents are not guessed. When a person had several spouses but the book does not assign a child to a specific spouse, the child receives only the known parent and an explanatory `parentUncertainty` note.

Biological parents remain in `parentIds`. Adoption is recorded separately in `adoptiveParentIds` so an adoptive relationship can never be rendered as biological ancestry.

`listedOrder` records the order in which names appear in the book. It must not be treated as oldest-to-youngest unless a narrative page explicitly establishes birth order.

## Current progress

`book-family-tree.json` currently contains the curated opening batch through PDF page 38 (excluding artifact-only and not-yet-transcribed diagram pages). Later continuation pages have been indexed visually but are not yet merged into this file.
