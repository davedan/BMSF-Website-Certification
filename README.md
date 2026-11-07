# BMSF Website Certification Lab

A reproducible, GitHub-governed **technical qualification lab** for the BMSF Public Website delivery target. The first candidate is an **Astro frontend + Payload headless CMS** configuration.

> **Certification status: NOT CERTIFIED.** This repository contains a qualification contract and Codex execution handoff; it is not an approved Target Profile, an independently reviewed E2E result, or evidence of a production deployment.

## Purpose and boundaries

BMSF operates **one Development Factory** with multiple Project Types / Target Profiles. The canonical Public Website Target Profile ID is `website`; the first specialization under qualification is `custom-web`, using the `astro-payload` technology configuration. These are distinct concepts:

| Concept | Current selection | Authority |
| --- | --- | --- |
| Project Type | Public Website | BMSF project model |
| Parent Target Profile | `website` | BMSF registry and architecture |
| Specialization | `custom-web` | Target-specific configuration |
| Reference technology | Astro + Payload | Qualified by evidence, not by category |
| Commercial project functionality | **Not decided in this lab** | Product Manager → BA → Architect |
| Formal certification | **Not yet granted** | BMSF governance and Owner |

An application needing editable content can use the CMS configuration only when its approved requirements justify it. Do **not** force Payload into a Product Manager's product definition.

## Repository map

- [`AGENTS.md`](AGENTS.md) — binding Codex implementation and safety instructions.
- [`docs/QUALIFICATION-PLAN.md`](docs/QUALIFICATION-PLAN.md) — acceptance criteria, evidence matrix and certification gates.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — reference system boundaries, decisions and alternatives.
- [`docs/EVIDENCE-REGISTER.md`](docs/EVIDENCE-REGISTER.md) — auditable evidence ledger, initially all unverified.
- [`fixtures/astro-payload/README.md`](fixtures/astro-payload/README.md) — requirements for the reproducible reference fixture.
- [`scripts/validate_lab.py`](scripts/validate_lab.py) — repository structure and evidence-state check (not an E2E test).
- [`.github/workflows/lab-contract.yml`](.github/workflows/lab-contract.yml) — initial CI for lab documentation and contract sanity.
- [`.github/pull_request_template.md`](.github/pull_request_template.md) — evidence-focused PR checklist.

## Start here: Codex

1. Open this repository in Codex at the **feature branch**; read `AGENTS.md`, the qualification plan and the fixture specification before writing code.
2. Implement the two-app reference fixture in `fixtures/astro-payload/`: **Astro frontend** and **Payload CMS** with a real persisted database, sample media, a public published-only endpoint and private editorial authorization.
3. Add repeatable install/build/typecheck/test commands, lockfiles, Playwright Chromium browser tests, and a local CI service setup. Never commit credentials, personal data, generated DB files or runtime uploads.
4. Run and record every test with **commit SHA, exact command, output, timestamp, environment, and independent reviewer** where required. No retroactive PASS from historical conversations.
5. Prove that BMSF can **resolve, pin and consume** the configuration through its actual versioned Target Profile contract. If the adapter or registry support is missing, report **BLOCKED** with evidence rather than inventing interfaces.
6. Prepare a reviewable PR and link its evidence to [BMSF architecture qualification PR #38](https://github.com/davedan/BMSF-Arquitecture/pull/38). Do not merge or claim certification automatically.

**Suggested local preflight (available now):**

```bash
python3 scripts/validate_lab.py
```

The command above validates this repository's **qualification paperwork**, not Astro/Payload behavior. The fixture commands must be added and verified by Codex as it implements the sample.

## Qualification order — agreed with the Owner

1. Define and pin the target specialization and compatible schema/version/hashes.
2. Build and prove Astro ↔ Payload content, publishing, media, permissions and data boundaries.
3. Run deterministic build, integration, browser E2E, accessibility/responsive, security and SEO-contract checks.
4. Perform independent QA and demonstrate BMSF target registry resolution/consumption.
5. **Last:** reuse the existing Hostinger deployment capability for staging deployment and tested recovery/rollback. No live client publication is authorized.

A green generic BMSF CI pipeline is **not** proof that Astro + Payload has passed these gates.

## Historical reference: Amaiur

The earlier Amaiur prototype reportedly used Astro SSR, Payload CMS and a published-only REST flow, including three sample Works and media. This is useful design context **but not a reproducible test result**: a source commit, executable fixture and independently verifiable test artifacts have not been pinned here.

## Governance, safety and links

Canonical constraints: [BMSF Increment C](https://github.com/davedan/BMSF-Arquitecture/blob/main/docs/implementation/INCREMENT-C-MULTI-TARGET-PROJECTS.md), [F2 Architecture Contract](https://github.com/davedan/BMSF/blob/main/docs/convergence/F2-ARCHITECTURE-CONTRACT.md), [QA](https://github.com/davedan/BMSF-Arquitecture/blob/main/docs/QA-CONTRACT.md), [Security](https://github.com/davedan/BMSF-Arquitecture/blob/main/docs/SECURITY-AUTHORIZATION-CONTRACT.md), and [Governance](https://github.com/davedan/BMSF-Arquitecture/blob/main/docs/GOVERNANCE.md).

- **Canonical architecture and approval** live in [BMSF-Arquitecture](https://github.com/davedan/BMSF-Arquitecture), **not** in this lab.
- **Evidence and executable sample** live here; record exact commit refs and verification artifacts.
- No changes to WordPress, BMSEO, or SEO360; consume their existing SEO contract only.
- This lab bypasses the commercial product discovery workflow, **not** security, independent QA, review or Owner approvals.
- Production releases, secrets and governance exceptions require their normal Owner authorization.
- GitHub files are source-of-truth artifacts, not blanket permission to deploy or certify.

**Milestone:** a Codex-built repeatable fixture and successful evidence-led BMSF integration, followed by approved certification. Until then, `NOT CERTIFIED` is the only truthful status.
