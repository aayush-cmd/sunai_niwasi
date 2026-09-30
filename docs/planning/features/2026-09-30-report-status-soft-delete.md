# Status column + soft delete for the Sunai daily report tables

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-09-30 |
| Shipped | |
| SRS row | — |
| Test cases | TC-RSD-01..14 |
| Prototype todo | — |

## 1. Requirement (as given)

> there is one small change i want to add in the sql and the system
> so we actualy did not add any status column for the reports tables
> if we implement delete in the future we need status column for that where we could send status -1 for solf delete so we need that also in the
> expense item table
> http://partner.niwasi.abhishek/Sunai/staff/reports/daily-mitram-expense/1/edit
> we have that cross button check ss
> it delete rows right ?
> for these it should send status -1 instead of deleting

(user, 2026-09-30, with a screenshot of the Daily Mitram Expense edit form's item rows and their
✕ buttons.)

## 2. Plan

This is a modification to two shipped features:
- `2026-09-30-daily-activity-report.md` (DAR);
- `2026-09-30-daily-mitram-expense.md` (DME).

Both features' §6 get a pointer to this file.

### 2.1 What happens today

- **DME edit** (`daily-mitram-expense.service.ts` `updateOwn`): in one transaction, the header
  is updated, **every** item row of the report is hard-deleted (`deleteMany`), and the submitted
  list is inserted as new rows (`createMany`). The form doesn't send item ids, so a kept row gets
  a new id, and the ✕ on a row simply removes it from the list that is sent. That row is
  therefore **physically deleted** on Save.
- None of the three report tables (`partner_staff_daily_activity_report`,
  `partner_staff_daily_mitram_expense`, `partner_staff_expense_item`) has a `status` column.
  Neither report can delete a whole report (no delete in either prototype).

### 2.2 Change

**DB.** ~~One new dated migration `2026-09-30-report-status-soft-delete.sql`.~~ **Superseded
(user 2026-09-30):** the DAR and DME commits aren't merged into main yet, so the column goes
straight into the existing `CREATE TABLE` files:
- `2026-09-30-partner-staff-daily-activity-report.sql`;
- `2026-09-30-partner-staff-daily-mitram-expense.sql`.

The user is given the equivalent `ALTER TABLE` statements (below) to bring their **local** DB
up to date by hand. No separate migration file ships.

```sql
ALTER TABLE partner_staff_daily_activity_report
  ADD COLUMN status TINYINT NOT NULL DEFAULT 1 AFTER items_sold_today,
  ADD KEY psdar_partner_status_idx (partner_id, status);

ALTER TABLE partner_staff_daily_mitram_expense
  ADD COLUMN status TINYINT NOT NULL DEFAULT 1 AFTER master_partner_center_id,
  ADD KEY psdme_partner_status_idx (partner_id, status);

ALTER TABLE partner_staff_expense_item
  ADD COLUMN status TINYINT NOT NULL DEFAULT 1 AFTER comment,
  ADD KEY pssei_expense_status_idx (partner_staff_daily_mitram_expense_id, status);
```

- **Values:** `1` means active and `-1` means soft-deleted (the user's value). `TINYINT` is
  signed so it can hold -1. The `DEFAULT 1` backfills existing rows as active; it is a status,
  not a timestamp, so the "no DB-filled timestamps" rule doesn't apply. The API still writes
  `status: 1` explicitly on create.
- **Headers:** they only get the column now, ready for a future report delete. No delete
  endpoint or button is added (Q2).

**API — DME item soft delete:**
- Each item in the create/update body may carry an optional `id`, the item's existing row id.
- `updateOwn` now **diffs** instead of replacing. In one transaction:
  - the header is updated as today;
  - a submitted item **with an id** that belongs to this report and is active is **updated in
    place** (material, quantity, unit, comment, `sort_order`, `updated_by`, `updated_at`);
  - a submitted item **without an id** is **inserted** (status 1);
  - an active item of the report whose id **isn't in the submitted list** (the rows removed
    with ✕) is set to **`status = -1`**, with `updated_by` / `updated_at` stamped. The row is
    never deleted.
  - An id that isn't an active item of *this* report → 422 on `items.<i>.id`, so it can't touch
    another report's items or revive a deleted one.
- Create ignores item ids. It always inserts.
- **Reads filter `status = 1`:**
  - the items of each report (hydrate, view, list summary, CSV);
  - the item-name / comment search (`EXISTS` subquery);
  - the "saved inactive master" set used on edit (Q4 of DME);
  - DME and DAR headers everywhere (lists, get, admin, staff-options, export).

  Only active rows exist today, so the output doesn't change. The filter is there so that a
  future delete (`status = -1`) hides rows everywhere at once.
- The max-50-items and at-least-1 rules count **active** items only; soft-deleted rows don't
  count.

**Frontend — DME form:**
- On edit, each row keeps its item `id` in form state (a new row has none), and Save sends it.
- ✕ works as today on screen. The removed row's id is simply not sent, and the server
  soft-deletes it.
- Nothing visible changes, and no new wording is needed.

**Prisma:** the three models get `status Int @default(1) @db.TinyInt` and the new indexes.

**Validation mirror:** item `id` is optional, a positive integer if present. It's the same on
the form side, where it's never user-entered.

**Docs:**
- `docs/api/api-structure.md`: note the item `id` in the DME body and the soft delete on edit.
- `endpoints.md`: no new endpoints, so the rows are unchanged.
- The page map is unchanged.
- The DAR and DME plans get a §6 pointer to this file.

### 2.3 Risk / impact

- The migration adds a column (backfilled 1) and an index to each of three tables. It's safe to
  run anytime, **but it must run before this API deploys**, because the new code reads and
  writes `status`.
- The DME edit changes from "replace all" to "diff". The item ids of rows that are kept are now
  stable, which also helps any future per-item history.
- DAR changes only by the added `status = 1` read filter.

### 2.4 Open questions (answers go in §4)

1. **Scope.** "status column for the reports tables … also in the expense item table".
   Recommendation: add `status` to **all three** tables: the DAR table, the DME header and the
   DME items.
2. **Whole-report delete now?** Recommendation: **no**. Only the column is added (for later);
   the only soft delete built now is the item ✕ on edit, as you asked.
3. **Status values.** Recommendation: `1` = active, `-1` = soft-deleted, with `0` left free for a
   possible "inactive" state later. Only 1 and -1 are used now.

## 3. Test cases (designed up front)

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-RSD-01 | Migration adds columns | SQL run | Inspect the 3 tables | `status TINYINT NOT NULL DEFAULT 1` plus the index on each; existing rows = 1 | H |
| TC-RSD-02 | New rows active | — | Create a DAR report and a DME report | Header `status = 1`; every DME item `status = 1` | H |
| TC-RSD-03 | ✕ soft-deletes an item | DME report with 3 items | Edit → ✕ the middle row → Save | The DB still has 3 item rows: the removed one has `status = -1` with `updated_by` / `updated_at` set; the other two stay 1 | H |
| TC-RSD-04 | Kept items keep their ids | Same report | Edit item 1's quantity → Save | Item 1 has the **same id**, is updated in place, and `created_at` is unchanged | H |
| TC-RSD-05 | New item inserted | — | Edit → Add Item → Save | One new row, status 1; the others unchanged | H |
| TC-RSD-06 | Order kept after remove / add | — | Remove row 1, add a row at the end → Save | `sort_order` of the active rows matches the on-screen order | M |
| TC-RSD-07 | Deleted items hidden everywhere | Report with a soft-deleted item | Staff view, edit form, list summary, admin view, CSV, search by that item's material / comment | The -1 item appears nowhere; searching for its text doesn't match the report | H |
| TC-RSD-08 | Can't touch another report's item | Item id from report B | PUT report A with `items: [{ id: <B item>, … }]` | 422 on `items.0.id`; B unchanged | H |
| TC-RSD-09 | Can't revive a deleted item | A soft-deleted item's id | PUT the same report with that id | 422 on `items.<i>.id`; the row stays -1 | M |
| TC-RSD-10 | Create ignores ids | — | POST with an item `id` | Saved as a new row; no other row changed | M |
| TC-RSD-11 | Limits count active items only | Report with 50 active items, then ✕ 1 and add 1 | Save | Saved (50 active); the -1 row doesn't count | L |
| TC-RSD-12 | Headers filtered by status | A DAR and a DME header set to -1 in the DB | Staff list, get `:id`, admin list, staff-options, CSV | Hidden everywhere; `:id` → 404 | M |
| TC-RSD-13 | DAR unaffected | — | Create / edit / list / CSV of DAR | Same as before (regression) | M |
| TC-RSD-14 | Existing report intact after migration | The user's report id 1 with 2 items | Open its view and edit | Both items show; saving unchanged keeps both ids | H |

## 4. Sign-off

- 2026-09-30: plan drafted; the §2.4 questions are waiting for the user.
- 2026-09-30, user (mid-turn): "also the code that has been commit is not merged with the main
  branch so you can directly update the sql files and then give me the alter sql for the local
  db".
  - The status column is added to the existing CREATE TABLE files; the ALTER block is given for
    the local DB; no new migration file.
  - The §2.4 questions were taken as answered by the requirement itself and the go-ahead:
    - Q1: all three tables ("status column for the reports tables … also in the expense item
      table");
    - Q2: no whole-report delete now ("if we implement delete in the future");
    - Q3: 1 = active, -1 = soft-deleted (the user's value).

  Status → in-progress.

## 5. Execution log

- 2026-09-30: implementation (uncommitted).
  - **SQL:** `status TINYINT NOT NULL DEFAULT 1` plus an index added to the CREATE TABLE in
    `2026-09-30-partner-staff-daily-activity-report.sql` (after `items_sold_today`, index
    `psdar_partner_status_idx`) and in `2026-09-30-partner-staff-daily-mitram-expense.sql`
    (header after `master_partner_center_id`, index `psdme_partner_status_idx`; items after
    `comment`, index `pssei_expense_status_idx`). The equivalent ALTER block from §2.2 was given
    to the user for the local DB.
  - **Prisma:** `status Int @default(1) @db.TinyInt` plus the `@@index` on the 3 models; client
    regenerated. A first `prisma format` reformatted unrelated models, so the file was restored
    and only the 6 lines were added.
  - **API:**
    - DAR: every read (own list, get, admin list/export via `r.status = 1`, get, staff-options)
      filters status 1; create writes 1.
    - DME: header and item reads (hydrate, the item search `EXISTS`, list SQL, get,
      staff-options) filter status 1; create writes 1 on the header and items.
    - `updateOwn` now diffs:
      - kept ids are updated in place;
      - new rows are inserted;
      - missing active ids are set to `status -1` (`updated_by` / `updated_at` stamped);
      - an id that isn't an active item of this report, or is a duplicate → 422
        `items.<i>.id`.
    - The schema accepts an optional item `id`; no `deleteMany` remains.
  - **Frontend:** `ItemValues.id`; the edit prefill keeps the item ids and the body sends them;
    an `items.<i>.id` error shows under the row.
  - **Checks:** API and frontend `tsc` clean; eslint clean.
  - **Docs:** `api-structure.md` DME row (item id + soft delete + status filter). No endpoint
    or page change.
- 2026-09-30: the user ran the ALTER block on the local DB. Verification: a DB + API script
  (23 checks) plus one headless-browser flow, all PASS. The first run hit `fetch failed`
  because a VS Code crash had stopped the PM2 servers again; they were restarted and the run
  repeated.
  - TC-RSD-01 PASS: all 3 `status` columns are `tinyint NOT NULL DEFAULT 1`, the 3 indexes
    exist, and every existing row = 1 (DAR 2, DME 1, items 2).
  - TC-RSD-02 PASS: new DME header / items and a new DAR row are saved with status 1.
  - TC-RSD-03 PASS: after removing the middle of 3 items, the DB still has 3 rows and the
    removed one is -1, with `updated_by` / `updated_at` stamped. Also verified through the UI
    (✕ in the edit form → Save): ids 135/136/137 kept; 136 → -1; 137's `sort_order` → 1.
  - TC-RSD-04 PASS: the kept item has the same id, is updated in place and keeps `created_at`.
  - TC-RSD-05 PASS: a new item is inserted with status 1; the others are unchanged.
  - TC-RSD-06 PASS: `sort_order` follows the screen.
  - TC-RSD-07 PASS: the -1 item is hidden in the staff view, admin view and CSV; search on its
    text doesn't match, while an active item's text does.
  - TC-RSD-08 PASS: another report's item id → 422 `items.0.id`; that report is unchanged.
  - TC-RSD-09 PASS: a deleted item's id → 422 and it stays -1; a duplicate id → 422.
  - TC-RSD-10 PASS: create ignores item ids.
  - TC-RSD-11 PASS: 50 items, remove 1 and add 1 → saved; 50 active + 1 at -1.
  - TC-RSD-12 PASS: a DME header at -1 is hidden from get (404), the staff list, the admin list
    and get, and the CSV; staff-options ignores -1 reports; a DAR header at -1 is hidden from
    get and the admin list.
  - TC-RSD-13 PASS: DAR create / get / edit / CSV work as before.
  - TC-RSD-14 PASS (read-only): the user's report 1 shows both items (ids 1 and 2). The "save
    unchanged" half wasn't run, to avoid re-stamping the user's own report; TC-RSD-04 covers
    that path.
  - **Cleanup:** every `ZZRSD` / `zzui` master, report and item row was deleted, and the 2 DAR
    test rows. Left: DME 1 (the user's) with 2 items, DAR 2 (the user's).

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- Modifies: `2026-09-30-daily-activity-report.md`, `2026-09-30-daily-mitram-expense.md`
- TEST_CASES: TC-RSD-01..14 (promote on ship)
- Migration: folded into the two existing CREATE files (not merged to main yet); the local DB is updated with the ALTER block in §2.2 (run by the user)
- Docs: `docs/api/api-structure.md` (DME body item `id`, soft delete on edit)
