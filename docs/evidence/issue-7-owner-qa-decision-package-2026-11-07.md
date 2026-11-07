# Issue #7 — Owner/QA residual-security decision package

**State:** `OWNER_DECISION_REQUIRED` — no decision, exception or certification is granted by this document.  
**Evidence baseline:** commit `41a659195c67d3cc9951d46fd982da4cd4678c1a`; clean CI run `42371369954`; `npm audit --omit=dev --json` reproduced on 2026-11-07.  
**Scope:** isolated Astro + Payload qualification fixture only; no deployment topology or production exposure is approved.

## Required individual decisions

| Decision ID | Finding(s) | Current evidence | Recommended disposition | Owner/QA action required |
| --- | --- | --- | --- | --- |
| SEC-7-01 | `deepmerge@4.3.1` / `GHSA-gcqx-w48m-w2h4` through runtime `payload@3.93.0` | Payload is used by CMS runtime; an attacker-controlled route to `mergeObject` is not proven. No patched upstream version exists. | Keep OPEN; monitor upstream Payload/deepmerge release. Do not classify as unreachable. | Decide whether it blocks the isolated lab or issue an exact-package, expiry-bound HAR disposition after independent QA review. |
| SEC-7-02 | `payload`, `@payloadcms/db-sqlite`, `@payloadcms/drizzle`, `@payloadcms/graphql`, `@payloadcms/next`, `@payloadcms/ui` aggregate paths | Current vendor release is `3.93.0`; CMS runtime imports db-sqlite, next and UI. Audit provides no compatible automated fix. | Keep OPEN as a vendor-family dependency finding; retest each Payload release. | Individually confirm the retained path and release-monitor owner; no blanket low-severity acceptance. |
| SEC-7-03 | `drizzle-kit@0.31.7`, `@esbuild-kit/esm-loader@2.6.5`, `@esbuild-kit/core-utils@3.3.2` | Installed transitively by db-sqlite; fixture source does not import the migration binary. Runtime non-reachability is not established. Registry `drizzle-kit@0.31.11` remains inside audit range. | Keep OPEN; do not override a vendor-pinned Drizzle dependency. Treat as build/migration tooling with unproven runtime absence. | Decide whether use is limited to the isolated build environment while upstream replacement is awaited. |
| SEC-7-04 | nested `esbuild@0.18.20` and `0.27.7`; `GHSA-67mh-4wv8-2f99`, `GHSA-g7r4-m6w7-qqqr` | No dev server was exposed; root `esbuild@0.28.2` is patched, but does not replace nested copies. No safe compatible override clears both paths. | Keep OPEN; prohibit exposing a development server from the qualification fixture. | Confirm that deployment/production promotion stays blocked until patched dependency chain or a governed exception. |

## Validation conditions before any disposition

1. Independent QA repeats clean `npm ci`, lint, typecheck, production build, eight Playwright tests and the production-only audit.
2. QA verifies DOMPurify resolves to `3.4.17` in the lockfile and clean installation.
3. The decision names the exact package/advisory group above, environment, expiration/review date and upstream monitoring action.
4. An approved canonical HAR records any risk acceptance. A PR comment, automated CI or Owner identity alone is not an approval record.

## Technical result

CI passed clean install, lint, typecheck, production build and all eight browser/integration tests. The strict audit intentionally remains failing with 11 findings (6 low, 5 moderate, 0 high, 0 critical). No suppression, downgrade, forced update or risk acceptance was applied.
