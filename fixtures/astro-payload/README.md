# Astro + Payload certification fixture

**Status: NOT YET IMPLEMENTED.** This document is the Codex implementation handoff. It is not evidence of a working application.

## Scope

Create a minimal two-service reference under this directory:

- `web/`: Astro frontend with index and detail pages, navigation, published content from Payload REST API, media display, SEO metadata and responsive accessible UI.
- `cms/`: Payload headless CMS with authenticated admin, Works collection, Media collection and Site global. Seed deterministic sample content with published and draft records.
- `e2e/`: Playwright Chromium tests against actual web and CMS services.
- `scripts/`: repeatable local test/build and fixture seed/reset commands.
- `.env.example`: placeholders only, no real credentials.

Use supported package versions and lockfiles. Do not assume a particular database or hosting topology is approved for production. SQLite may be used for local qualification only when supported by selected Payload release.

## Required verifications

1. Published content and its media appear on Astro index/detail routes.
2. Draft is not readable anonymously or rendered publicly.
3. Authenticated editor can change permitted content, while unauthorized writes are rejected.
4. CMS global Site settings drive public navigation.
5. Repeated seed runs are deterministic and database resets are safe.
6. Clean checkout builds and starts both apps; lint and typecheck pass.
7. Playwright tests verify desktop/mobile, keyboard navigation and basic accessibility.
8. SEO checks cover metadata, canonical URL, sitemap/indexability as applicable.
9. Evidence records preserve command, commit SHA, UTC timestamp, logs and reviewer.

Leave Hostinger staging/rollback and all production publishing for the **last qualification block**.

## Completion

Codex must submit an implementation PR with reproducible commands and actual test results. Do not claim the Target Profile is certified: BMSF registry consumption, independent QA and Owner approval remain distinct gates.
