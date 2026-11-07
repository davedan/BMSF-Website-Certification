# Astro + Payload certification fixture

**Status: IMPLEMENTED FOR LABORATORY QUALIFICATION; NOT CERTIFIED.** The fixture has CI evidence for its build and runtime tests, but dependency-security remediation, canonical registry consumption, independent QA and Owner approval remain open gates.

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

## Implemented fixture commands

The fixture is an npm workspace. It pins Astro 7.4.7, Payload 3.91.0,
Next 16.3.3 and Playwright 1.65.0 in `package-lock.json`. Payload 3.91.0 is
used because it supports the available Node 24.13.1 runtime; the newer 3.93.0
requires Node 24.22.1 or later.

```bash
npm ci
npx playwright install chromium
npm run lint
npm run typecheck
npm run build
npm run test
npm run audit:dependencies
```

`npm run test` creates an ignored local CMS environment and SQLite dataset,
then runs deterministic seed data before both the REST integration suite and
the Chromium suite. The seeded administrator is only for local tests and its
password is generated in the ignored `cms/.env`; it is never committed. For
manual development, copy `.env.example` to `cms/.env`, set a unique
`PAYLOAD_SECRET`, run `npm run seed --workspace=cms`, and start each workspace.

The public Astro pages use the real Payload REST endpoints. Payload access
control exposes only `_status: published` Works to anonymous requests; writes
require an authenticated editor or administrator. Media is an authenticated
management collection with publicly readable rendered assets. The Site global
provides public navigation data.
