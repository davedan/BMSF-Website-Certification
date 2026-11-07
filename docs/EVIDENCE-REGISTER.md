# Certification evidence register

**Qualification:** `website/custom-web/astro-payload`  
**Status:** NOT CERTIFIED  
**Canonical review:** https://github.com/davedan/BMSF-Arquitecture/pull/38

| ID | Gate | Evidence | Commit SHA | Run/command | Result | Independent review |
| --- | --- | --- | --- | --- | --- | --- |
| HIST-001 | Context only | Amaiur Astro SSR + Payload integration reported in previous work; reproducible source and test logs not found | NOT PINNED | Historical account | UNVERIFIED | No |
| LAB-001 | G1 | Canonical source review found no implemented registry manifest or adapter capability for this target profile. | `fd7bf3df690cc2139409201fdb3266880b050d60` | BMSF source review | BLOCKED | Pending |
| LAB-002 | G2 | Fixture source exposes published Payload Works and media through Astro SSR, while draft content remains absent from anonymous REST results. | `069c7238cd1745bd0faf21bedec54a90704ceaf9` | GitHub Actions run `42364561963`, `npm run test` (3 REST tests) | PASS (CI) | No |
| LAB-003 | G3 | Clean CI install, lint, typecheck and build completed on Ubuntu with Node 24.13.1. The production dependency audit found 19 vulnerabilities (6 low, 6 moderate, 5 high, 2 critical), so the security sub-gate is not passed. | `069c7238cd1745bd0faf21bedec54a90704ceaf9` | GitHub Actions run `42364561963`, `npm ci && npm run lint && npm run typecheck && npm run build && npm run audit:dependencies` | BLOCKED | No |
| LAB-004 | G4 | Chromium rendered-content, media, draft-exclusion, keyboard-navigation and desktop/mobile checks passed. | `069c7238cd1745bd0faf21bedec54a90704ceaf9` | GitHub Actions run `42364561963`, `npm run test` (2 Chromium tests) | PASS (CI) | No |
| LAB-005 | G5 | Chromium check verified canonical URL on the rendered public index; source includes description, robots and sitemap endpoints. | `069c7238cd1745bd0faf21bedec54a90704ceaf9` | GitHub Actions run `42364561963`, `npm run test` | PASS (CI) | No |
| LAB-006 | G6 | Canonical BMSF source search found no implemented `website/custom-web/astro-payload` registry entry, manifest schema or adapter capability implementation. Contract sources require an immutable manifest/hash and actual consumption; integration cannot be inferred. | `fd7bf3df690cc2139409201fdb3266880b050d60` | GitHub source search plus `docs/implementation/INCREMENT-C-MULTI-TARGET-PROJECTS.md` | BLOCKED | Pending |
| LAB-007 | G7 | Hostinger staging deployment, backup and rollback | PENDING | Deliberately last | DEFERRED | Pending |
| LAB-008 | G8 | Owner acceptance and canonical certification | PENDING | Formal approval | NOT APPROVED | Pending |

The CI run started on 2026-11-07 UTC and completed with fixture test/build stages passing, then exited non-zero at the dependency-audit stage. The unresolved audit paths include Payload 3.91.0 transitive packages and Next 16.3.3; npm proposes a breaking change to `@payloadcms/richtext-lexical@0.1.9`, so no automatic remediation was applied. A future security review must select a supported Payload upgrade path and rerun the full gate. Generic BMSF CI success for architecture PR #38 does not prove Astro/Payload integration.
