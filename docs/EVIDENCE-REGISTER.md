# Certification evidence register

**Qualification:** `website/custom-web/astro-payload`  
**Status:** NOT CERTIFIED  
**Canonical review:** https://github.com/davedan/BMSF-Arquitecture/pull/38

| ID | Gate | Evidence | Commit SHA | Run/command | Result | Independent review |
| --- | --- | --- | --- | --- | --- | --- |
| HIST-001 | Context only | Amaiur Astro SSR + Payload integration reported in previous work; reproducible source and test logs not found | NOT PINNED | Historical account | UNVERIFIED | No |
| LAB-001 | G1 | Canonical source review found no implemented registry manifest or adapter capability for this target profile. | `fd7bf3df690cc2139409201fdb3266880b050d60` | BMSF source review | BLOCKED | Pending |
| LAB-002 | G2 | Fixture source exposes published Payload Works and media through Astro SSR, while draft content remains absent from anonymous REST results. The prior CI also passed REST admin reachability and authenticated editor publishing. Issue #7 adds a browser administrator interaction for the Payload Works screen; that addition remains pending current CI evidence. | `db7ed5469a93234ec0f6779218cd352d33ebb721` | GitHub Actions run `42367804330`, `npm run test` (5 REST tests, including Payload admin reachability and published CMS update rendered by Astro); Issue #7 branch: `npm run test` | PASS (prior CI); new browser interaction UNVERIFIED | No |
| LAB-003 | G3 | Clean CI install, lint, typecheck and build completed on Ubuntu with Node 24.22.1. The DOMPurify critical path is resolved by lockfile override (3.4.15 → 3.4.17); strict audit still reports 11 low/moderate advisories and exits non-zero. Issue #7 supplies the individual inventory and a bounded Owner/QA decision request. | `db7ed5469a93234ec0f6779218cd352d33ebb721` | GitHub Actions run `42367804330`, `npm ci && npm run lint && npm run typecheck && npm run build && npm run audit:dependencies`; `docs/evidence/dompurify-remediation-2026-11-07.json`; Issue #7 branch CI | BLOCKED (no residual-risk decision) | No |
| LAB-004 | G4 | Chromium rendered-content, media, draft-exclusion, keyboard-navigation and desktop/mobile checks passed. | `db7ed5469a93234ec0f6779218cd352d33ebb721` | GitHub Actions run `42367804330`, `npm run test` (2 Chromium tests) | PASS (CI) | No |
| LAB-005 | G5 | Chromium check verified canonical URL on the rendered public index; source includes description, robots and sitemap endpoints. | `db7ed5469a93234ec0f6779218cd352d33ebb721` | GitHub Actions run `42367804330`, `npm run test` | PASS (CI) | No |
| LAB-006 | G6 | Canonical BMSF source search found no implemented `website/custom-web/astro-payload` registry entry, manifest schema or adapter capability implementation. Contract sources require an immutable manifest/hash and actual consumption; integration cannot be inferred. | `fd7bf3df690cc2139409201fdb3266880b050d60` | GitHub source search plus `docs/implementation/INCREMENT-C-MULTI-TARGET-PROJECTS.md` | BLOCKED | Pending |
| LAB-007 | G7 | Hostinger staging deployment, backup and rollback | PENDING | Deliberately last | DEFERRED | Pending |
| LAB-008 | G8 | Owner acceptance and canonical certification | PENDING | Formal approval | NOT APPROVED | Pending |

The CI run started on 2026-11-07 UTC and completed with fixture test/build stages passing, then exited non-zero at the strict dependency-audit stage. The clean-lock npm override resolves the DOMPurify critical path from 3.4.15 to 3.4.17; the remaining 11 findings are six low and five moderate paths. No risk acceptance, audit suppression or forced downgrade was applied. The applicable security policy must classify those residual findings before the global security gate can pass. Generic BMSF CI success for architecture PR #38 does not prove Astro/Payload integration.
