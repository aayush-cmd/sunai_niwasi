<!-- Copy this file to <YYYY-MM-DD>-<short-slug>.md when starting a new feature or significant
     modification, BEFORE writing any code. See AGENTS.md's "Feature planning files" rule for
     the full convention this template follows. Delete this comment block in the copy. -->

# <Feature title>

| Field | Value |
|---|---|
| Status | proposed |
| Started | YYYY-MM-DD |
| Shipped | |
| SRS row | v1.X |
| Test cases | TC-XX-NN..NN |
| Prototype todo | — |

## 1. Requirement (as given)

> Verbatim quote of what the user / client said.

## 2. Plan

Rule-by-rule analysis (see `AGENTS.md`), files to touch, security/performance considerations, open questions for the user.

## 3. Test cases (designed up front)

Defined here **before coding** so the feature is testable from day one. Cover at minimum: happy path, every forbidden role, every validation failure mode, every error/edge condition surfaced in §2's plan.

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-XX-NN | ... | ... | ... | ... | H/M/L |

When the feature ships, copy these rows verbatim into `docs/testing/TEST_CASES.md` under the appropriate module, and tick the cross-reference in §7.

## 4. Sign-off

Pre-implementation questions + the user's answers. Dated entries.

## 5. Execution log

Dated entries on each meaningful milestone — commits, live verifications, typecheck passes, agent dispatches. Each test case from §3 gets a PASS/FAIL row here as it's verified live.

## 6. Post-deploy

Issues surfaced after going live + their diagnosis + the fix. Multiple dated entries OK. Stays open indefinitely.

## 7. Cross-references

- SRS row: `docs/requirement/SRS.md` §_
- TEST_CASES: TC-XX-NN..NN (promoted from §3 on ship)
- Page maps / API docs updated: `docs/frontend/<portal>.md`, `docs/api/api-structure.md` _(list which, or "none — no page/endpoint change")_
- Prototype todo row #: _(if applicable — no prototype-changes tracker exists in this repo yet)_
- CHANGELOG bullet: _(no CHANGELOG exists in this repo yet)_
- Production deploy notes (if any non-standard steps needed)
