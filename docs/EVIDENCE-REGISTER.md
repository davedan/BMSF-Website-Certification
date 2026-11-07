# Certification evidence register

**Qualification:** `website/custom-web/astro-payload`  
**Status:** NOT CERTIFIED  
**Canonical review:** https://github.com/davedan/BMSF-Arquitecture/pull/38

| ID | Gate | Evidence | Commit SHA | Run/command | Result | Independent review |
| --- | --- | --- | --- | --- | --- | --- |
| HIST-001 | Context only | Amaiur Astro SSR + Payload integration reported in previous work; reproducible source and test logs not found | NOT PINNED | Historical account | UNVERIFIED | No |
| LAB-001 | G1 | Canonical source review found no implemented registry manifest or adapter capability for this target profile. | `fd7bf3df690cc2139409201fdb3266880b050d60` | BMSF source review | BLOCKED | Pending |
| LAB-002 | G2 | Fixture source exposes published Payload Works and media through Astro SSR, while draft content remains absent from anonymous REST results. | `d9f40bb6d1ae66c4103a065169d18bb4345e9eaf` | GitHub Actions run `42366305280`, `npm run test` (4 REST tests, including published CMS update rendered by Astro) | PASS (CI) | No |
| LAB-003 | G3 | Clean CI install, lint, typecheck and build completed on Ubuntu with Node 24.22.1. The production audit was reduced to 13 advisories (7 low, 5 moderate, 0 high, 1 critical), but the security sub-gate remains blocked by the exact Monaco → DOMPurify path. | `d9f40bb6d1ae66c4103a065169d18bb4345e9eaf` | GitHub Actions run `42366305280`, `npm ci && npm run lint && npm run typecheck && npm run build && npm run audit:dependencies`; `docs/evidence/npm-audit-production-2026-11-07.json` | BLOCKED | No |
| LAB-004 | G4 | Chromium rendered-content, media, draft-exclusion, keyboard-navigation and desktop/mobile checks passed. | `d9f40bb6d1ae66c4103a065169d18bb4345e9eaf` | GitHub Actions run `42366305280`, `npm run test` (2 Chromium tests) | PASS (CI) | No |
| LAB-005 | G5 | Chromium check verified canonical URL on the rendered public index; source includes description, robots and sitemap endpoints. | `d9f40bb6d1ae66c4103a065169d18bb4345e9eaf` | GitHub Actions run `42366305280`, `npm run test` | PASS (CI) | No |
| LAB-006 | G6 | Canonical BMSF source search found no implemented `website/custom-web/astro-payload` registry entry, manifest schema or adapter capability implementation. Contract sources require an immutable manifest/hash and actual consumption; integration cannot be inferred. | `fd7bf3df690cc2139409201fdb3266880b050d60` | GitHub source search plus `docs/implementation/INCREMENT-C-MULTI-TARGET-PROJECTS.md` | BLOCKED | Pending |
| LAB-007 | G7 | Hostinger staging deployment, backup and rollback | PENDING | Deliberately last | DEFERRED | Pending |
| LAB-008 | G8 | Owner acceptance and canonical certification | PENDING | Formal approval | NOT APPROVED | Pending |

The CI run started on 2026-11-07 UTC and completed with fixture test/build stages passing, then exited non-zero at the strict dependency-audit stage. The safe upgrade to Payload 3.93.0, Next 16.4.5 and sharp 0.35.5 removed all high findings and one critical path; the remaining critical DOMPurify finding is exactly pinned by Monaco in the current Payload UI dependency path. No risk acceptance, audit suppression or forced downgrade was applied. A future security review must select a supported upstream remediation and rerun the full gate. Generic BMSF CI success for architecture PR #38 does not prove Astro/Payload integration.
