# Issue #7 — residual dependency security triage

**Status:** OPEN / NOT ACCEPTED / NOT SECURITY-CERTIFIED  
**Scope:** the clean lockfile state introduced by PR #6 (`db7ed5469a93234ec0f6779218cd352d33ebb721`) and its child correction branch.  
**Command:** `npm audit --omit=dev --json` on 2026-11-07.  
**Observed total:** 11 advisories: 0 critical, 0 high, 5 moderate and 6 low. The command exits non-zero. No advisory has been suppressed, accepted or force-fixed.

## DOMPurify verification

`package.json` constrains `monaco-editor > dompurify` to `3.4.17`; the regenerated root lockfile records `node_modules/monaco-editor/node_modules/dompurify` at `3.4.17`, replacing `3.4.15`. GitHub Actions run `42367804330` performed a clean `npm ci` with this lockfile and passed the fixture build and seven tests. This removes the previously reported critical DOMPurify path, but is not a whole-program security PASS.

The existing REST test performs an authenticated editor update. This branch additionally creates an authenticated session in the Chromium page context through the CMS login endpoint, opens the rendered `Works` screen, and observes the seeded record. The first clean CI run (`42370126265`) found a real admin defect: the route loaded the placeholder TypeScript import map while `payload generate:importmap` wrote `importMap.js` elsewhere. The configuration now pins generation and both admin consumers to the route's tracked `importMap.ts`; its evidence remains pending until the correction CI has completed.

## Complete npm-audit inventory

“Reachability” describes what the current repository demonstrates. It does not convert a dependency-path inference into a claim that an exploit is impossible. `Unknown` remains a release/security finding rather than an exemption.

| Audit item | Resolved version(s) / dependency path | Advisory and affected range | Fix status from audit / registry | Execution classification and current reachability evidence |
| --- | --- | --- | --- | --- |
| `@esbuild-kit/core-utils` | `3.3.2` ← `@esbuild-kit/esm-loader@2.6.5` ← `drizzle-kit@0.31.7` ← `@payloadcms/db-sqlite@3.93.0` | Aggregate moderate via `esbuild`; package range `*` | Audit reports a fix path, but upstream `drizzle-kit` requires the deprecated loader; no compatible automated change identified | Build/migration-tool dependency installed with the production CMS package. It is not imported by fixture runtime source. Runtime non-reachability is **not proven**. |
| `@esbuild-kit/esm-loader` | `2.6.5` ← `drizzle-kit@0.31.7` ← `@payloadcms/db-sqlite@3.93.0` | Aggregate moderate via core-utils; package range `*` | Audit reports a fix path; package registry latest remains `2.6.5` | Build/migration-tool dependency; runtime non-reachability **not proven**. |
| `@payloadcms/db-sqlite` | `3.93.0`, direct CMS dependency; fixture calls `sqliteAdapter()` in `cms/payload.config.ts` | Aggregate moderate through `@payloadcms/drizzle`, `drizzle-kit` and `payload`; package range `*` | No automated fix; current registry version is `3.93.0` | **CMS runtime reachable:** application config constructs this adapter. The report does not show that an esbuild exploit path executes in the deployed server. |
| `@payloadcms/drizzle` | `3.93.0` ← `@payloadcms/db-sqlite@3.93.0` | Aggregate low via `payload`; package range `*` | Audit reports a fix path; current Payload release is `3.93.0` | Installed CMS adapter dependency. Runtime exploit reachability **not proven**. |
| `@payloadcms/graphql` | `3.93.0` ← `@payloadcms/next@3.93.0` | Aggregate low via `payload`; package range `*` | Audit reports a fix path; current Payload release is `3.93.0` | CMS package dependency. GraphQL is packaged by the CMS; endpoint/exploit reachability **not proven**. |
| `@payloadcms/next` | `3.93.0`, direct CMS dependency; imports are used by the admin route and REST handlers | Aggregate low via `@payloadcms/graphql`, `@payloadcms/ui`, `payload`; package range `*` | No automated fix; current registry version is `3.93.0` | **CMS runtime reachable:** `RootLayout`, `RootPage` and route handlers are imported. The underlying advisory path is not proven executable. |
| `@payloadcms/ui` | `3.93.0` ← `@payloadcms/next@3.93.0`; used by the administered Next/Payload UI | Aggregate low via `payload`; package range `*` | Audit reports a fix path; current Payload release is `3.93.0` | **Admin runtime reachable** through the Payload UI. Underlying advisory execution **not proven**. |
| `deepmerge` | `4.3.1` ← `payload@3.93.0` | `GHSA-gcqx-w48m-w2h4`, prototype pollution, `>=4.2.0 <=4.3.1` | No fix available; `4.3.1` is current registry version | Payload is a CMS runtime dependency. No controlled input-to-`mergeObject` proof was obtained; therefore frontend/CMS exploit reachability is **unknown**, not waived. |
| `drizzle-kit` | `0.31.7` ← `@payloadcms/db-sqlite@3.93.0` (the upstream package pins this exact version) | Aggregate moderate via `@esbuild-kit/esm-loader`; audit range `0.19.0 - 1.0.0-beta.1-fd8bfcc` | Audit says a fix path exists; registry `0.31.11` remains within the reported range and cannot clear it | Build/migration binary, not imported by fixture source. Runtime non-reachability **not proven** because it is shipped as an installed production dependency. |
| `esbuild` | `0.18.20` nested under core-utils and `0.27.7` nested under root `tsx@4.21.0` | `GHSA-67mh-4wv8-2f99` (`<=0.24.2`, moderate) and `GHSA-g7r4-m6w7-qqqr` (`>=0.27.3 <0.28.1`, low) | Audit reports a fix path. The root `esbuild@0.28.2` is outside both ranges, but does not replace the nested pinned copies | Bundler/dev-server tooling. No dev server was exposed and no build-tool exploit was demonstrated. This does **not** prove the installed copies unreachable in CMS lifecycle. |
| `payload` | `3.93.0`, direct CMS dependency | Aggregate low via `deepmerge`; package range `*` | No automated fix; current registry version is `3.93.0` | **CMS runtime reachable:** `buildConfig` and `getPayload` are used. Exact vulnerable `deepmerge` call path remains **unknown**. |

## Compatible remediation assessment

The direct Payload family is already uniformly pinned at `3.93.0`, which is the current registry version. `@payloadcms/db-sqlite@3.93.0` pins `drizzle-kit@0.31.7`; replacing it with an override would move a tightly coupled vendor package without a compatibility release and still remains inside the audit's vulnerable range. `deepmerge@4.3.1` and `@esbuild-kit/esm-loader@2.6.5` are the current registry versions but are still reported. A forced downgrade, `npm audit fix --force`, lockfile suppression, or risk acceptance would violate the issue scope, so none was performed.

## Applicable governance and required decision

The canonical BMSF QA Contract v1 at `BMSF-Arquitecture` commit `b0a8319431396e8d6c9fc852d5335411a0a5f7f1`, `docs/QA-CONTRACT.md`, requires explicit authorized risk acceptance for a `WONT_FIX` terminal state and independent verification before an implementer closes a defect. The Security and Authorization Contract at the same commit reserves acceptance of a critical security or QA exception/risk to an auditable Owner HAR. These contracts do not define an automatic severity-only disposition for this website's low/moderate dependency advisories.

**Narrow Owner/QA decision requested (not granted here):** for each row above, decide whether it remains an open blocker pending upstream remediation, or record an exact-scope, expiry-bound accepted residual risk through the canonical HAR/QA process. The decision must not collapse the 11 rows into a single blanket “low/moderate accepted” statement. Independent QA must verify the branch's clean install, audit snapshot, CMS browser login test and regression results before any security gate is considered.

## Reproduction

```text
npm ci
npm run lint
npm run typecheck
npm run build
npm run test
npm audit --omit=dev --json
```

The final audit is expected to return non-zero while the listed findings remain. This document is an evidence/inventory artifact, not a policy change or certification.
