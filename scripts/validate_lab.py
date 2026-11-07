#!/usr/bin/env python3
"""Validate qualification documentation, not the Astro/Payload runtime."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "README.md", "AGENTS.md", "docs/QUALIFICATION-PLAN.md",
    "docs/ARCHITECTURE.md", "docs/EVIDENCE-REGISTER.md",
    "fixtures/astro-payload/README.md",
    "scripts/validate_lab.py", ".github/workflows/lab-contract.yml",
    ".github/pull_request_template.md", ".gitignore"
]
missing = [p for p in REQUIRED if not (ROOT / p).is_file()]
if missing:
    print("FAIL missing:", ", ".join(missing))
    sys.exit(1)
readme = (ROOT / "README.md").read_text()
plan = (ROOT / "docs/QUALIFICATION-PLAN.md").read_text()
evidence = (ROOT / "docs/EVIDENCE-REGISTER.md").read_text()
assertions = {
    "identity": all(s in readme for s in ("website", "custom-web", "astro-payload")),
    "not certified": "NOT CERTIFIED" in readme and "NOT CERTIFIED" in evidence,
    "eight gates": all("G" + str(i) in plan for i in range(1, 9)),
    "evidence rows": all("LAB-00" + str(i) in evidence for i in range(1, 9)),
    "traceability": "BMSF-Arquitecture/pull/38" in readme,
    "Hostinger deferred": "Hostinger" in plan,
}
failed = [k for k, v in assertions.items() if not v]
if failed:
    print("FAIL assertions:", ", ".join(failed))
    sys.exit(1)
print("PASS lab documentation contract")
print("NOTE: Astro/Payload integration, E2E, registry and deployment have NOT been tested.")
