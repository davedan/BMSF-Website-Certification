# Certification evidence register

**Qualification:** `website/custom-web/astro-payload`  
**Status:** NOT CERTIFIED  
**Canonical review:** https://github.com/davedan/BMSF-Arquitecture/pull/38

| ID | Gate | Evidence | Commit SHA | Run/command | Result | Independent review |
| --- | --- | --- | --- | --- | --- | --- |
| HIST-001 | Context only | Amaiur Astro SSR + Payload integration reported in previous work; reproducible source and test logs not found | NOT PINNED | Historical account | UNVERIFIED | No |
| LAB-001 | G1 | Registry schema, version/hash pin and compatibility | PENDING | Not run | UNVERIFIED | Pending |
| LAB-002 | G2 | Fixture source adds Payload Works/Media/Site, draft-aware server-side access, Astro REST rendering and automated integration coverage. Local execution evidence still pending. | PENDING | `npm run test:integration` | UNVERIFIED | Pending |
| LAB-003 | G3 | npm workspace, lockfile and CI commands added. Local clean install did not complete in the managed Windows runner because the runner terminates npm during reification; no build/lint/typecheck/audit PASS is claimed. | PENDING | `npm ci && npm run lint && npm run typecheck && npm run build && npm run audit:dependencies` | BLOCKED | Pending |
| LAB-004 | G4 | Playwright Chromium suite added for rendered content, draft protection, media, keyboard navigation and desktop/mobile layout. It has not executed locally. | PENDING | `npx playwright install chromium && npm run test:e2e` | UNVERIFIED | Pending |
| LAB-005 | G5 | Astro source provides description, canonical, robots and sitemap endpoints. Runtime verification remains pending. | PENDING | `npm run test:e2e` | UNVERIFIED | Pending |
| LAB-006 | G6 | Canonical BMSF source search found no implemented `website/custom-web/astro-payload` registry entry, manifest schema or adapter capability implementation. Contract sources require an immutable manifest/hash and actual consumption; integration cannot be inferred. | `fd7bf3df690cc2139409201fdb3266880b050d60` | GitHub source search plus `docs/implementation/INCREMENT-C-MULTI-TARGET-PROJECTS.md` | BLOCKED | Pending |
| LAB-007 | G7 | Hostinger staging deployment, backup and rollback | PENDING | Deliberately last | DEFERRED | Pending |
| LAB-008 | G8 | Owner acceptance and canonical certification | PENDING | Formal approval | NOT APPROVED | Pending |

To change a gate to PASS, include exact command, UTC date/time, complete repository commit SHA, environment, exit code, relevant logs/artifacts and independent QA review when required. Generic BMSF CI success for architecture PR #38 does not prove Astro/Payload integration.
