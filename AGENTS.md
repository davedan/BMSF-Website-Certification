# Codex instructions — BMSF Website Certification Lab

You are implementing a **qualification fixture**, not a commercial customer website. Read README.md, docs/QUALIFICATION-PLAN.md, docs/ARCHITECTURE.md, and fixtures/astro-payload/README.md.

## Mission

Build a fully reproducible Astro + Payload CMS sample, with automated validation and traceable evidence, then demonstrate target registry/adapter consumption against the **real** BMSF implementation. Reference certification PR: https://github.com/davedan/BMSF-Arquitecture/pull/38.

## Immutable principles

- Keep parent target `website` stack-neutral. Astro + Payload is a candidate `custom-web` technology configuration, not a replacement for the canonical target.
- Do not mark `CERTIFIED` or `PASS` until actual test output and independent review are recorded.
- Do not fabricate a Target Profile manifest schema, BMSF API, credentials, registry ID, pin hash, permissions, or Hostinger support. Inspect and cite actual canonical sources before integration.
- No changes to WordPress, SEO360, BMSEO or commercial client projects.
- Never write credentials, API keys, .env values, production data, personal data or generated DB content to Git.
- Do not deploy to production. Leave Hostinger staging and rollback for the final qualification block.
- Follow BMSF QA, authorization, review and Owner-approval gates; implementation PR is not certification approval.
- Lock dependencies and save reproducible commands. Prefer a CI-friendly local environment (SQLite for CMS fixture is acceptable for local qualification, without claiming it is a production architecture).
- Handle unknowns explicitly as `BLOCKED`; do not substitute a mock for an integration result without labelling it.
- No automatic merge. Use a reviewable PR and report tests, known gaps, and the next gate.

## Work order

1. Inspect current tree and baseline; use supported maintained Astro / Payload versions and record exact versions. Agree upon the minimal fixture topology before edits.
2. Implement public frontend, CMS collections, settings, media, sample content, published-only reads, authenticated admin writes, and safe access controls.
3. Add setup, migrations/seed and test data reset; deterministic build/typecheck/lint/integration and Playwright Chromium E2E. Cover draft isolation, author permissions, unauthorized access, media, rendered content, basic SEO, responsive and accessible navigation.
4. Capture test evidence in docs/EVIDENCE-REGISTER.md with actual commit ID, executed command, environment, timestamp, outcome and artifact links.
5. Verify BMSF profile schema/versioning, SHA pin, project compatibility, preflight, adapter and consumption. Where unsupported, write a precise issue and tests reproducing the blocker.
6. Run independent review; record status and ask for formal Owner decision only for the exact reviewed artifact.
7. Handle Hostinger deployment/restore **last**, under applicable authorizations.

## Required handoff

Submit code, repeatable commands, CI results, evidence-register updates, risks, unresolved blockers and refs to PR #38. Separate `LAB TESTED`, `BMSF INTEGRATED`, and `FORMALLY CERTIFIED` outcomes.

## Recommended first Codex task

Implement `fixtures/astro-payload` per its README as a minimal two-service, locally reproducible Astro + Payload reference app; add real E2E tests and CI that actually runs those tests. Do not alter the certification status. Resolve authoritative dependency versions rather than guessing.
