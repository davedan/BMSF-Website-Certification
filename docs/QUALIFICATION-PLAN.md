# Astro + Payload — qualification plan v0.1

**State:** PROPOSED / NOT CERTIFIED. **Scope:** `website` → `custom-web` → `astro-payload`.
**Architecture certification record:** https://github.com/davedan/BMSF-Arquitecture/pull/38

## Acceptance gates

| Gate | Evidence required | Current state |
| --- | --- | --- |
| G1 — Contract | Exact canonical target/schema reference, semver, compatibility mapping, pinned SHA and registry acceptance test | UNVERIFIED |
| G2 — CMS integration | Real persisted content via Payload REST, Astro renders published records and media, published/draft isolation, CMS authn/authz and editor roles | UNVERIFIED |
| G3 — Code quality | Reproducible install/lockfile, lint, typecheck, frontend+CMS production builds, dependency/security audit | UNVERIFIED |
| G4 — QA / E2E | Chromium browser checks, unauthorized access tests, responsive and accessibility evidence, deterministic seed/reset, QA review | UNVERIFIED |
| G5 — SEO | Meta/canonical/robots/sitemap/indexability and structured data only when applicable; verify contractual compatibility without modifying SEO360 or BMSEO | UNVERIFIED |
| G6 — BMSF consumption | Actual BMSF registry resolution and immutable version/hash pin; preflight and adapter behavior evidenced; no inferred APIs | UNVERIFIED |
| G7 — Hosting (LAST) | Approved Hostinger staging path, running frontend+CMS, health checks, controlled rollback/restore including DB/media | DEFERRED |
| G8 — Approval | Independent review, resolved blockers, final Owner decision and canonical activation/merge | NOT APPROVED |

**PASS means executed proof, not a design intent.** Log command, environment, observed result, source commit, time and evidence link. Missing evidence is `UNVERIFIED`; failed required gate is `BLOCKED`.

## Minimal positive/negative scenarios

- Editor changes public sample record → published content updates on Astro after refresh, with no developer edits.
- Unpublished draft is invisible on unauthenticated API and public site.
- Unauthorized users cannot create/edit/delete records or access unpublished media.
- Images load and meet rights/alt-text and appropriate cache expectations.
- Public routes render correctly at mobile and desktop widths; navigation works with keyboard.
- Production builds and service startup pass under documented env setup.
- BMSF resolves compatible `website` specialization using exact schema/version/hash, and rejects incompatible/stale values.
- Staging deployment and tested recovery are last, never silently promoted to production.

## Execution rules

Use a dedicated fixture and a separate evidence ledger; no changing WordPress, SEO360 or BMSEO. Amaiur findings are historical hints unless reproducibly verified. Credential changes, production deploy and risk exceptions require BMSF approval. QA must include independent review. The final report explicitly differentiates contract-ready, integration-tested, and formally certified.
