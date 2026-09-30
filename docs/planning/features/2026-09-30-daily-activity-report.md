# Daily Activity Report (Sunai staff report + Partner Admin Reports tab)

| Field | Value |
|---|---|
| Status | shipped |
| Started | 2026-09-30 |
| Shipped | 2026-09-30 |
| SRS row | — (no `docs/requirement/SRS.md` in this repo yet) |
| Test cases | TC-DAR-01..42. Promoted to `docs/testing/TEST_CASES.md` |
| Prototype todo | — |

## 1. Requirement (as given)

> next i want to add a new report in sunai partner staff dashboard in reports and tracking / daily reports
> it should be in  daily reports (in ui) inside this path
> /home/triline27/myproject/sunai_niwasi/apps/frontend/app/(partner)/partner/(dash)/[slug]/staff/reports
> its name Daily Activity Report
> it's prototype
> file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/daily-activity-report.html
> table convension will be partner_staff_{report_name}
> its is only for the sunai staff right now (superadmin/ sunai admin / sunai staff)
> the sunai admin also gets a new reports tab
> file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/admin-daily-activity-report.html
> there the admin will be able to view the list of all reports and download csv

> create a plan for this feature

(user, 2026-09-30)

## 2. Plan

### 2.1 What the prototypes show

**Staff page** (`daily-activity-report.html`, engine `daily-reports.js`, `DR_CONFIG`):

- **Heading and button:** heading "Daily Activity Report" and an **Add Report** button. There is
  no CSV button on the staff page.
- **Filter card:**
  - Search, which matches across all columns;
  - Date From and Date To;
  - Search and Clear buttons.
- **List columns:** S.No, Date, Work Start Time, Work End Time, Work Done, Next Plan, Items Sold
  Today, Actions (👁 View, ✏ Edit). There is **no delete** (`noDelete`).
- **Form:** a full-page form with 3 columns and these fields:

  | Field | Hindi | Input | Required |
  |---|---|---|---|
  | Date | दिनांक | date | yes |
  | Work Start Time | काम शुरू करने का समय | time | no |
  | Work End Time | काम समाप्त करने का समय | time | no |
  | Work Done | क्या काम किए | textarea | no |
  | Next Plan / Expected Completion Date | इससे सम्बंधित आगे क्या योजना है या कब तक पूरा होगा | textarea | no |
  | Items Sold Today | आज क्या क्या बेचा | textarea | no |

- **View page:** a read-only copy of the form, with Back and Edit buttons.
- **Menu:** Reports and Tracking → **Daily Reports**, in this order: Team Daily Report,
  **Daily Activity Report**, Daily Mitram Expense, Daily Meal and Income Report, Ham Niwasi Daily
  Report.

**Admin page** (`admin-daily-activity-report.html`, engine `admin-reports.js`, `AR_CONFIG`):

- **Header:** "Daily Activity Report" and a **Download CSV** button.
- **Filter card:**
  - Staff (All Staff / one staff member);
  - Search, which matches across all fields including the staff name;
  - Date From and Date To;
  - Search and Clear buttons.
- **List:**
  - Columns: S.No, **Staff**, Date, Work Start Time, Work End Time, Work Done, Next Plan, Items
    Sold Today, Actions (👁 View only). The page is read-only.
  - Sorted by date (newest first), then by staff name.
- **View page:** "Staff: <name>" followed by the same read-only fields, with a Back button.
- **CSV:**
  - It follows the current filters.
  - Headers: `S.No, Staff, Date, Work Start Time, Work End Time, Work Done, Next Plan / Expected
    Completion Date, Items Sold Today`.
  - It starts with a UTF-8 BOM.
  - Dates are `DD-MM-YYYY`.
- **Menu:** a new **Reports** dropdown after Users, containing: Project Report, **Daily Activity
  Report**, Daily Mitram Expenses, Daily Meal and Income Report.

Out of scope, because they aren't requested:
- the other daily reports in both menus (Daily Mitram Expense, Daily Meal and Income Report);
- the admin's "Project Report".

### 2.2 How this fits the current code

- **Staff menu.** The staff "Reports and Tracking" menu is built on the server
  (`apps/api/src/modules/partner/reports-menu.service.ts` `buildReportsMenu`). Its "Daily
  Reports" group lists the global `master_report_mappings` rows with `notrequiredPermission=1`.
  Locally that is one row: **Team Daily Report** (mapping 4). For the Sunai slug only, the
  resolver will add **Daily Activity Report** to that group, after the mapping items. If the
  group is empty, the resolver creates it.

  The result matches the prototype's order (Team Daily Report, then Daily Activity Report). Other
  orgs' menus don't change.
- **Staff portal access.** The staff portal layout (`staff/layout.tsx`) is open to any active
  member of the org: System Admin, the org's Partner Admin, and approved staff. That matches the
  requirement "superadmin / sunai admin / sunai staff".
- **Nearest existing report.** The closest one is **Ham Niwasi Daily Report**
  (`samajik-udyami.*`, `staff/ham-niwasi-daily-report/`):
  - list / `new` / `[id]` / `[id]/edit` pages;
  - reports scoped to their creator (`created_by`);
  - `HH:mm` times kept in `@db.Time` columns with the repo-standard UTC round-trip
    (`toTimeOnly` / `fmtTime`);
  - an "end after start" check.

  This feature follows that pattern.
- **Admin side.** It follows **Partner Admin Orders** (`order-placement.admin.*`, `admin/orders`):
  - the `requireSunaiOrg` + `requireOrgAccess()` gate;
  - the staff filter fed by a `staff-options` endpoint;
  - a CSV export that follows the filters (csv-stringify, every field quoted, BOM);
  - a read-only detail page.

### 2.3 Database — one new table (dated migration, run by the user)

The table is named with the requested `partner_staff_{report_name}` convention:
`partner_staff_daily_activity_report`.

File: `apps/api/prisma/sql/2026-09-30-partner-staff-daily-activity-report.sql`

```sql
CREATE TABLE partner_staff_daily_activity_report (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  partner_id       INT UNSIGNED NOT NULL,
  report_date      DATE         NOT NULL,
  work_start_time  TIME         NULL,
  work_end_time    TIME         NULL,
  work_done        TEXT         NULL,
  next_plan        TEXT         NULL,
  items_sold_today TEXT         NULL,
  created_by       INT UNSIGNED NOT NULL,
  updated_by       INT UNSIGNED NOT NULL,
  created_at       TIMESTAMP    NULL DEFAULT NULL,
  updated_at       TIMESTAMP    NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY psdar_partner_date_idx (partner_id, report_date),
  KEY psdar_partner_creator_date_idx (partner_id, created_by, report_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

- **`created_by`** is the staff member who wrote the report. The admin list's "Staff" column is
  that user's `users.name`.
- **No FK constraints** (AGENTS.md). Indexes are used instead: one on the org's date for the
  admin list, and one on org + author + date for the staff's own list.
- **Timestamps are set by the application only**, following the earlier "application level only"
  decision (2026-09-29): no DB default and no `ON UPDATE`. The API binds `new Date()`.
- **Times.** `report_date` is bound as a UTC-midnight `Date` (the `@db.Date` round-trip used
  elsewhere). Times use Ham Niwasi's `toTimeOnly` / `fmtTime`, so what is saved reads back as the
  same `HH:mm`.
- **No `status` or `deleted_at`.** Neither prototype has a delete, so rows are never removed. If
  delete is wanted later, it would be a new migration.
- **Multiple reports per staff per day are allowed**, with no unique key (Q3).

### 2.4 API — new module `daily-activity-report.*`

Files in `apps/api/src/modules/partner/`:
- `daily-activity-report.schema.ts`
- `daily-activity-report.service.ts`
- `daily-activity-report.controller.ts`
- `daily-activity-report.routes.ts`

The router is mounted in `partner.routes.ts` with one `router.use(...)` line, so no existing
routes are touched.

**Staff endpoints** (base `/orgs/:slug/daily-activity-reports`):
- **Gate:** `requireSunaiOrg` (any other org → 404, System Admin included) →
  `requirePartnerAuth` → `validateParams` → **`requireOrgMember()`**, which admits System Admin,
  the Sunai Partner Admin and active Sunai staff.
- **Scope:** every route works only on **the caller's own** reports (`created_by =
  req.user.userId`) inside this org. Anyone else's id → 404.

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/daily-activity-reports` | My reports: `?page&limit&q&from&to`. `q` matches Work Done / Next Plan / Items Sold (LIKE); `from`/`to` filter `report_date`. Sorted by `report_date` desc, then `id` desc. |
| POST | `/orgs/:slug/daily-activity-reports` | Create. `partner_id` comes from the gate and `created_by` from the session; neither is read from the body. |
| GET | `/orgs/:slug/daily-activity-reports/:id` | One of my reports (view page and edit prefill). |
| PUT | `/orgs/:slug/daily-activity-reports/:id` | Edit one of my reports. `created_*` is never re-stamped. |

**Admin endpoints** (base `/orgs/:slug/admin/daily-activity-reports`):
- **Gate:** `requireSunaiOrg` → `requirePartnerAuth` → `validateParams` → **`requireOrgAccess()`**
  (System Admin + the Sunai Partner Admin). Staff get 403.
- **Read-only.** Registration order puts the fixed paths before `/:id`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/admin/daily-activity-reports` | Every report for the org: `?page&limit&staff_id&q&from&to`. `q` also matches the staff name. Sorted by `report_date` desc, then staff name, then `id` desc. Each row has `staff_name`. |
| GET | `/orgs/:slug/admin/daily-activity-reports/staff-options` | Staff who have submitted at least one report (Q6): `{ id, name }`, sorted by name. |
| GET | `/orgs/:slug/admin/daily-activity-reports/export` | CSV using the list filters (no paging). Headers as in §2.1. Every field is quoted (the Orders `;` column-shift lesson); UTF-8 BOM; `DD-MM-YYYY` dates, `HH:mm` times. Filename `daily-activity-report_<YYYY-MM-DD IST>.csv`. The page builds the filename itself, because the response header isn't CORS-exposed (same as Orders). |
| GET | `/orgs/:slug/admin/daily-activity-reports/:id` | One report with its staff name (view page). |

That's **8 endpoints**.

**Validation.** Backend (Zod) and frontend enforce the same rules (AGENTS.md):

| Field | Rule |
|---|---|
| `report_date` | required; `YYYY-MM-DD`; a real calendar date. **Past and future dates are allowed**, and the date can be changed on edit (user 2026-09-30). The add form **prefills today** (IST), and the user can change it |
| `work_start_time` | optional; `HH:mm` (00:00–23:59) |
| `work_end_time` | optional; `HH:mm`; **must be later than the start time** when both are given (user 2026-09-30; the Ham Niwasi rule) |
| `work_done`, `next_plan`, `items_sold_today` | **optional** (user 2026-09-30, superseding Q4's "Work Done required"); trimmed; **max 150 characters** each (superseding Q5's 2000); blank is stored as NULL. The limit is enforced by the application (Zod + the form); the columns stay `TEXT` (user 2026-09-30) |
| list `from` / `to` | `YYYY-MM-DD`; `from` ≤ `to`; the page shows a message itself (`noValidate`, the Orders lesson) |
| list `q` | up to 150 characters |
| list `limit` | 1..100; default 10 (Q7) |
| `staff_id` | a positive integer. An unknown id just returns an empty list. |

Errors use the standard shape: 422 `VALIDATION_ERROR` with `details.fieldErrors`, shown next to
each field; 404 for an id that isn't found or isn't yours.

### 2.5 Frontend

**Staff pages** (in the requested folder, Sunai-only via `layout.tsx` → `notFound()` for other
slugs):

| URL | File | What |
|---|---|---|
| `/{slug}/staff/reports/daily-activity-report` | `staff/reports/daily-activity-report/page.tsx` | My reports: filter card (Search, Date From, Date To, Search / Clear), count, table (S.No, Date, Work Start Time, Work End Time, Work Done, Next Plan, Items Sold Today, 👁 / ✏), pagination, **Add Report** button |
| `/{slug}/staff/reports/daily-activity-report/new` | `…/new/page.tsx` | Add form: 3-column grid like the prototype (Date / Start / End, then the three textareas); Save / Back |
| `/{slug}/staff/reports/daily-activity-report/[id]` | `…/[id]/page.tsx` | Read-only view; Back and Edit |
| `/{slug}/staff/reports/daily-activity-report/[id]/edit` | `…/[id]/edit/page.tsx` | Edit form, prefilled |

These sit alongside the existing report pages (`proposed-*`, `global`, `my-panchayat`, …) in
`staff/reports/`. One shared `DailyActivityReportForm` component is used by the new and edit
pages.

**Admin pages** (Sunai-only via `admin/reports/layout.tsx` → `notFound()`):

| URL | File | What |
|---|---|---|
| `/{slug}/admin/reports/daily-activity-report` | `admin/reports/daily-activity-report/page.tsx` | All staff reports: filters (Staff, Search, Date From, Date To), count, table (S.No, Staff, Date, … , 👁), pagination, **Download CSV**. Filters and page live in the URL, so Back from the view page keeps them (the Orders pattern). |
| `/{slug}/admin/reports/daily-activity-report/[id]` | `…/[id]/page.tsx` | Read-only view, "Staff: <name>" above the fields; Back returns to the list with the same filters |

**Menus:**
- **Staff:** the server-built menu adds **Daily Activity Report** under Reports and Tracking →
  Daily Reports (§2.2). `buildReportsMenu` gets a Sunai check (the shared `isSunaiSlug`). This is
  the only change to that resolver.
- **Admin:** `PartnerOrgNav.tsx` gets a new **Reports** dropdown after "Users & Report
  Management", **Sunai only**, containing only **Daily Activity Report** (Q8). Other orgs' admin
  nav doesn't change.

**Display:**
- Dates are `DD-MM-YYYY`, as in the prototype, on screen and in the CSV.
- Times are `HH:mm`.
- Long text is clamped to 2 lines in the table and shown in full on the view page.

**Translation** (AGENTS.md rule):
- All UI text is wrapped in `t()`: headings, labels, buttons, headers, messages, and the
  bilingual field labels. The team adds Hindi labels through the Language admin, and the
  prototype's Hindi text is listed here for them.
- The data (what staff typed) isn't passed through `t()`.
- The CSV headers stay in English, as in the prototype.
- No label SQL.

### 2.6 Docs to update in the same change

- `docs/frontend/partner-portal.md`: the staff Reports section plus 4 staff rows, and the admin
  section plus 2 admin rows, in "All pages". Page count 212 → 218.
- `docs/api/endpoints.md`: 8 rows (guards `requireSunaiOrg`, `requirePartnerAuth`, plus
  `requireOrgMember` or `requireOrgAccess`). Totals bumped.
- `docs/api/api-structure.md`: the new router mount and the added `requireSunaiOrg` mounts.
- On ship: §3 copied to `docs/testing/TEST_CASES.md`; status → shipped.

### 2.7 Risk / impact

The change adds new code only:
- one new table;
- a new API module, plus one mount line;
- a Sunai-only branch in `buildReportsMenu`, which leaves other orgs' output byte-identical;
- one Sunai-only nav block;
- 6 new pages, plus 2 layouts.

Existing reports, Team Daily Report and Ham Niwasi are untouched. **Deploy order:** SQL first,
then the API.

### 2.8 Open questions (answers go in §4)

_All resolved 2026-09-30, "all as recommended", except that Q4/Q5 validation follows the user's
field table (see §4)._

1. **Whose reports on the staff page.** Recommendation: each person sees and edits **only their
   own** reports. That includes the Sunai admin and System Admin when they use the staff page.
   The admin Reports tab is where all reports can be seen.
2. **Editing.** Recommendation: the author can edit their report **at any time**, as the
   prototype has no time limit; nobody can delete; the admin tab is **read-only** (view + CSV).
   The alternative is to allow edits only on the same day or within N days.
3. **More than one report per day.** Recommendation: **allowed**. The prototype doesn't prevent
   it, and a staff member may log morning and evening work separately. The alternative is one
   report per staff per date, which would need a unique key.
4. **Validation beyond the prototype** (the prototype only requires Date). Recommendation:
   - **Work Done is required**, so a report can't be blank;
   - the Date can't be in the future;
   - End Time must be after Start Time when both are given.

   Everything else stays optional.
5. **Text length.** Recommendation: 2000 characters maximum for each text field.
6. **Admin Staff filter list.** Recommendation: only staff who have **submitted at least one**
   report, the same as your answer for Orders (2026-09-25, Q4).
7. **Rows per page.** Recommendation: **10**, the same as your Orders answer (2026-09-25, Q3), on
   both the staff and admin lists.
8. **Admin "Reports" dropdown contents.** The prototype also lists Project Report, Daily Mitram
   Expenses and Daily Meal and Income Report. Recommendation: show **only** Daily Activity Report
   now, and add the others when they're built. The alternative is showing them greyed out as
   "coming soon".

## 3. Test cases (designed up front)

"Staff" means an approved Sunai staff member (not the Partner Admin). The 404 cases apply to
the page URL (the not-found page) and the API.

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-DAR-01 | Staff menu entry | Logged in as Sunai staff | Open Reports and Tracking → Daily Reports | "Team Daily Report", then "Daily Activity Report"; it opens the list | H |
| TC-DAR-02 | Staff menu entry absent elsewhere | Staff of a non-Sunai org | Open Reports and Tracking | No "Daily Activity Report"; the rest of the menu is unchanged | H |
| TC-DAR-03 | Admin Reports tab | Sunai Partner Admin | Look at the admin nav | New "Reports" dropdown after Users & Report Management, containing Daily Activity Report | H |
| TC-DAR-04 | Admin Reports tab absent elsewhere | Partner Admin of another org | Look at the admin nav | No "Reports" dropdown | H |
| TC-DAR-05 | Staff page open to all three roles | Sunai staff; Sunai PA; System Admin | Open `/Sunai/staff/reports/daily-activity-report`, add a report | All three can use it; each sees only their own reports | H |
| TC-DAR-06 | Non-Sunai URLs are not-found | Any user, including System Admin | Open `/<Other>/staff/reports/daily-activity-report` and `/<Other>/admin/reports/daily-activity-report`; call both list APIs on `<Other>` | Not-found page; API 404 | H |
| TC-DAR-07 | Logged out | No session | Call the staff list API and the admin list API | 401 | H |
| TC-DAR-08 | Staff blocked from admin API | Sunai staff | Call admin list / export / `:id` / staff-options | 403 | H |
| TC-DAR-09 | Other org's member blocked | Staff / PA of org X | Call the Sunai staff and admin APIs | 403 | H |
| TC-DAR-10 | Empty staff list | Staff with no reports | Open the list | "No result found."; count 0; Add Report visible | M |
| TC-DAR-11 | Add a report | Staff | Add Report → Date today, 08:00–16:30, Work Done "Kitchen setup", Next Plan "Stock audit by 27-09-2026", Items "40 thalis" → Save | Saved; back on the list with the new row first; date shown DD-MM-YYYY, times HH:mm | H |
| TC-DAR-12 | Only required fields | Staff | Date only (everything else blank) → Save | Saved; empty columns show "—" | H |
| TC-DAR-13 | Date required | Add form | Clear the Date → Save | Inline "Date is required."; API 422 on `report_date` | H |
| TC-DAR-14 | Date defaults to today | Staff | Open Add Report | Date is prefilled with today's date (IST); it can be changed | H |
| TC-DAR-15 | Past and future dates allowed | Add form / edit form | Save with a date last month, then with a date next month; edit a report's date | All saved; the edited date is kept | H |
| TC-DAR-16 | Invalid date | API | `report_date` "2026-02-30" / "30-09-2026" / "abc" | 422 | M |
| TC-DAR-17 | End before start | Add form | Start 16:00, End 08:00 (and End = Start) | Inline "End time must be after the start time."; API 422 on `work_end_time` | H |
| TC-DAR-18 | Only one time given | Add form | Start 08:00, End blank | Saved | M |
| TC-DAR-19 | Invalid time | API | `work_start_time` "24:00" / "8:5" / "08:60" | 422 | M |
| TC-DAR-20 | Text max length | Add form / API | Work Done / Next Plan / Items Sold with 151 characters (and exactly 150) | 151: inputs stop at 150; API 422 if sent directly. 150: saved | M |
| TC-DAR-21 | Whitespace handling | Staff | Next Plan "   " → Save; reopen | Stored as empty (NULL); view shows "—" | L |
| TC-DAR-22 | Times read back unchanged | Staff | Save 08:05–23:59; reopen view and edit | Exactly 08:05 and 23:59 (no timezone shift) | H |
| TC-DAR-23 | Date reads back unchanged | Staff | Save Date 01-09-2026; reopen | 01-09-2026 (no off-by-one day) | H |
| TC-DAR-24 | Multiple reports same day | Staff | Add two reports with the same date | Both saved and listed | M |
| TC-DAR-25 | View page | Staff with a report | 👁 on a row | All six fields read-only, in full; Back returns to the list; Edit opens the edit form | H |
| TC-DAR-26 | Edit own report | Staff | ✏ → change Work Done → Save | Updated; `created_at` / `created_by` unchanged, `updated_*` set | H |
| TC-DAR-27 | Can't read or edit another's report | Staff A; report id owned by staff B | Open `/…/daily-activity-report/<B id>` and `/edit`; call GET / PUT `:id` | Not found / API 404; B's report unchanged | H |
| TC-DAR-28 | No delete | Any row | Check the actions; call `DELETE …/daily-activity-reports/:id` | No delete control; API 404 | M |
| TC-DAR-29 | Body can't set owner or org | Staff | POST with extra `created_by: 1, partner_id: 5` | Saved under the caller and Sunai | H |
| TC-DAR-30 | Staff filters | Staff with several reports | Search "thali"; Date From/To range; Clear | Only matching rows; Clear resets; page returns to 1 | M |
| TC-DAR-31 | Date range order | Staff / admin filters | From after To → Search | Page's own message; no request; API 422 if called directly | M |
| TC-DAR-32 | Staff pagination | 11+ own reports | Page 2 | 10 per page; count text correct | M |
| TC-DAR-33 | Admin sees everyone's reports | Reports by 2+ staff | PA opens the admin list | All rows, with the Staff column; sorted by date desc, then staff name | H |
| TC-DAR-34 | Admin staff filter | Several staff; one staff has none | Open the Staff dropdown; choose a staff member | Only staff with ≥1 report are listed; choosing one filters the rows | H |
| TC-DAR-35 | Admin search includes staff name | Admin | Search by part of a staff name, and by text in Items Sold | Matching rows | M |
| TC-DAR-36 | Admin view | Admin | 👁 on a row | "Staff: <name>" and all fields read-only; no Edit; Back keeps the filters and page | H |
| TC-DAR-37 | Admin can't edit | Admin | Call `PUT /admin/daily-activity-reports/:id`; try staff `PUT` on another person's id | 404 (no route / not own) | M |
| TC-DAR-38 | CSV follows the filters | Admin with a staff + date filter applied | Download CSV | Only the filtered rows; filename `daily-activity-report_<today>.csv` | H |
| TC-DAR-39 | CSV headers and format | Admin | Open the CSV in Excel / LibreOffice | Headers exactly `S.No, Staff, Date, Work Start Time, Work End Time, Work Done, Next Plan / Expected Completion Date, Items Sold Today`; dates DD-MM-YYYY; Hindi text readable (BOM) | H |
| TC-DAR-40 | CSV with commas, semicolons, quotes, newlines | Report text with `a, b; "c"` and a line break | Download and open | Each value stays in its own column; no row shift | H |
| TC-DAR-41 | Admin empty / pagination | No reports / 11+ reports | Open the list | "No result found." / 10 per page; CSV of an empty result has only the header row | M |
| TC-DAR-42 | Translation wrapped | `NEXT_PUBLIC_I18N_ENABLED` on; Hindi rows added via the Language admin for some labels | Switch to हिं | Those labels in Hindi; others stay English; data and CSV headers unchanged | L |

## 4. Sign-off

- 2026-09-30: plan drafted; the open questions in §2.8 are waiting for the user.
- 2026-09-30, user: "i would like to go with the recommendations and for the validation" plus a
  field table (screenshot, transcribed):

  | # | Field | Type | Required | Validation |
  |---|---|---|---|---|
  | 1 | Date | Date | Yes | Defaults to today |
  | 2 | Work Start Time | Time | No | |
  | 3 | Work End Time | Time | No | Must be later than the start time |
  | 4 | Work Done | Text | No | Max - 150 ch |
  | 5 | Next Plan / Expected Completion Date | Text | No | Max - 150 ch |
  | 6 | Items Sold Today | Text | No | Max - 150 ch |

  Result:
  - Q1–Q3 and Q6–Q8 are as recommended.
  - **Q4 is partly superseded:** Work Done is **not** required (the recommendation was that it
    be required). Built as asked. With every text field optional, a report can hold only a
    Date.
  - **Q5 is superseded:** the maximum is 150 characters per text field, not 2000. The columns
    are `VARCHAR(150)`. **Superseded the same day** (next entry).
  - **Added:** Date defaults to today.
  - End after start is kept as recommended.
  - The "Date not in the future" rule was recommended in Q4 and isn't in the user's table. It is
    **kept for now**; the user was asked to confirm. **Resolved** later the same day (below):
    dropped.

  TC-DAR-12, 14 and 20 were updated to match.
- 2026-09-30, user: "dont change the datatype to varchar keep it text we can apply application
  level validation for the characters". The three text columns go back to `TEXT`; the 150
  character maximum is enforced only in the application (backend Zod and frontend inputs).
  This supersedes the `VARCHAR(150)` column type above.
- 2026-09-30, user, asked what "Defaults to today" means: "dont add those extra validations they
  should be able to add past and future dates and yeah date should be editable too".
  - "Defaults to today" means the add form **prefills** today's date (IST), and the user can
    change it.
  - Any past or future date is allowed, on create and on edit. The recommended "not in the
    future" rule is **dropped**, and no "always today" lock is added.
  - The Date's only rules are required + a valid date.
  - TC-DAR-15 was changed from "future date rejected" to "past and future dates allowed".

- 2026-09-30, user, on the `reports.view` menu gap (options: 1 leave it / 2 always show the menu
  to Sunai staff / 3 restrict the report to `reports.view` too): "leave it". No change: the menu
  keeps its existing `reports.view` gate, and the report stays open to any active Sunai member
  (`requireOrgMember()`) as planned. Staff without `reports.view` can reach it by URL only. This
  is a known limitation, not a bug.

## 5. Execution log

- 2026-09-30: implementation (uncommitted). VS Code crashed after the migration and the Prisma
  model were written; the work resumed from there.
  - **DB:**
    - `apps/api/prisma/sql/2026-09-30-partner-staff-daily-activity-report.sql`: one table, text
      columns `TEXT`, no timestamp defaults;
    - `model partner_staff_daily_activity_report` in `schema.prisma`;
    - `prisma validate` / `generate` passed;
    - **not yet run by the user.**
  - **API:**
    - `daily-activity-report.{schema,service,controller,routes}.ts`, mounted in
      `partner.routes.ts` (`router.use(dailyActivityReportRouter)`);
    - 8 endpoints:
      - staff: `requireSunaiOrg` → `requirePartnerAuth` → `requireOrgMember()`, own rows only;
      - admin: `requireSunaiOrg` → `requirePartnerAuth` → `requireOrgAccess()`, read-only;
    - the admin list and export order by date desc, then staff name, via a parameterised raw id
      query (`Prisma.sql`, LIKE wildcards escaped), then Prisma loads the rows;
    - CSV: every field quoted, BOM, `DD-MM-YYYY`, export cap 20000.
    - `reports-menu.service.ts`: a Sunai-only "Daily Activity Report" is added to Daily Reports
      after the mapping items. Other orgs' output is unchanged.
  - **Frontend:**
    - `lib/partner-daily-activity-report.ts`: API client, validation mirror, CSV download;
    - `components/partner/daily-activity/`: `DailyActivityReportForm`,
      `DailyActivityReportDetails`, `DarFilterCard`;
    - staff `staff/reports/daily-activity-report/{layout,page,new,[id],[id]/edit}`;
    - admin `admin/reports/{layout}`, `admin/reports/daily-activity-report/{page,[id]}`;
    - both layouts call `notFound()` for non-Sunai slugs;
    - `PartnerOrgNav.tsx`: a Sunai-only "Reports" dropdown after Users & Report Management;
    - the Date is prefilled with IST today and is editable;
    - text inputs stop at 150 characters, with a counter;
    - all UI text is wrapped in `t()`.
  - **Checks:**
    - API and frontend `tsc --noEmit` clean; eslint on the new/changed frontend files clean.
    - The niwasi-api / niwasi-web PM2 processes had stopped after the crash and were restarted.
    - Live gate probes: Sunai staff and admin lists without a session → 401 (TC-DAR-07);
      pratham staff and admin → 404 (TC-DAR-06, API half).
  - **Docs:**
    - `docs/frontend/partner-portal.md`: staff Reports row, admin row, 6 All-pages rows,
      212 → 218 pages;
    - `docs/api/endpoints.md`: 8 rows, 911 → 919, partner 401 → 409;
    - `docs/api/api-structure.md`: partner module row and the `requireSunaiOrg` mounts.
- 2026-09-30: the user ran `2026-09-30-partner-staff-daily-activity-report.sql` locally. Live
  verification:
  - **Setup:**
    - locally signed JWTs for System Admin (1), Sunai PA (111454), Sunai staff 124 ("Teacher" /
      "Director") and 126 ("data analyst"), Sunai Office Staff 208, pratham PA 3556 and pratham
      staff 3557;
    - an API script (85 checks, all PASS) plus headless Chromium on `partner.niwasi.abhishek`;
    - my first pick for staff (user 180) had no active designation, so the gate returned 403;
      the checks were re-run with active staff.
  - **Access:**
    - TC-DAR-05 PASS: SA / PA / staff can each create and list, each seeing only their own; PA
      gets 404 on a staff member's report through the staff API.
    - TC-DAR-06 PASS: pratham → API 404 for SA, and not-found pages for both URLs.
    - TC-DAR-07 PASS: 401 with no session.
    - TC-DAR-08 PASS: staff get 403 on the admin list / export / staff-options / `:id`, and the
      admin page shows them no data.
    - TC-DAR-09 PASS: pratham PA and staff get 403 on the Sunai APIs.
  - **Menus:**
    - TC-DAR-01 PASS: as Office Staff 208, PA and SA, Daily Reports = [Team Daily Report, Daily
      Activity Report], and it opens the list.
    - TC-DAR-02 PASS: pratham's Daily Reports = [Team Daily Report] only.
    - TC-DAR-03 PASS: the admin "Reports" dropdown sits after Users & Report Management.
    - TC-DAR-04 PASS: pratham admin has no Reports tab.
  - **Staff create and validation:**
    - TC-DAR-11 PASS: create; read back; the list shows DD-MM-YYYY and HH:mm; sorted by date
      desc.
    - TC-DAR-12 PASS: a date-only report saves, with NULLs.
    - TC-DAR-13 PASS: a missing / blank date → 422, and "Date is required." inline.
    - TC-DAR-14 PASS: Add form Date = IST today.
    - TC-DAR-15 PASS: past (2025-08-15) and future (2027-01-15) dates save; the date is editable
      (moved to 2026-10-05 in the UI).
    - TC-DAR-16 PASS: 2026-02-30, 30-09-2026, abc, 2026-13-01 → 422.
    - TC-DAR-17 PASS: end ≤ start → 422 on `work_end_time`, inline in the UI.
    - TC-DAR-18 PASS: start only / end only both save.
    - TC-DAR-19 PASS: 24:00, 8:5, 08:60, 8am → 422.
    - TC-DAR-20 PASS: 151 characters → 422 on each text field; exactly 150 saves; the textarea
      stops at 150 and shows 150/150.
    - TC-DAR-21 PASS: a spaces-only field is stored as NULL.
  - **Round-trips and editing:**
    - TC-DAR-22 PASS: 08:05 / 23:59 read back exactly.
    - TC-DAR-23 PASS: 2026-09-01 reads back unchanged.
    - TC-DAR-24 PASS: two reports on the same day.
    - TC-DAR-25 PASS: view page.
    - TC-DAR-26 PASS: edit via API and UI (prefilled; "Save changes").
    - TC-DAR-27 PASS: another staff member's id → 404 on GET and PUT, and their report is
      unchanged.
    - TC-DAR-28 PASS: no DELETE route.
    - TC-DAR-29 PASS: `created_by` / `partner_id` in the body are ignored.
  - **Staff filters:**
    - TC-DAR-30 PASS: search, date range, Clear.
    - TC-DAR-31 PASS: from > to → the page's own message; API 422 (staff and admin).
    - TC-DAR-32 PASS: 10 per page.
  - **Admin:**
    - TC-DAR-33 PASS: every user's rows; sorted date desc, then staff name.
    - TC-DAR-34 PASS: staff options = submitters only, sorted; filter by staff; filters kept in
      the URL.
    - TC-DAR-35 PASS: search by staff name and by Items Sold; `%` is matched literally.
    - TC-DAR-36 PASS: view with "Staff: <name>"; no Edit anywhere; Back keeps the filters; a
      missing id → 404.
    - TC-DAR-37 PASS: no admin PUT route.
  - **CSV:**
    - TC-DAR-38 PASS: the UI download is named `daily-activity-report_<IST today>.csv` and follows
      the staff + search filters.
    - TC-DAR-39 PASS: BOM, text/csv, exact headers, DD-MM-YYYY.
    - TC-DAR-40 PASS: `a, b; "c"` plus a newline, and `x;y`, stay in their own columns; every
      field is quoted.
    - TC-DAR-41 PASS: an empty result gives a header-only CSV and an empty list.
  - **DB:** created_at / updated_at are within 0 min of now (no 5h30m skew); `created_by` /
    `updated_by` = the author; the text columns are `text`; no column defaults.
  - **Not run:** TC-DAR-10 (empty staff list, not isolated) and TC-DAR-42 (needs Hindi
    `label_text` rows entered through the Language admin).
  - **Cleanup:** 27 test rows deleted (11 from an aborted first run, then 16). The user's own
    rows 1 and 2 (created_by 1) were kept.
  - **Found, not changed (question to the user):** the staff "Reports and Tracking" menu itself
    is gated by the existing `reports.view` permission (by designation name: Office Staff,
    Surveyor, Vendor Admin, Supervisor, IEC Staff Campaigner, Zero waste Technician,
    Coordinator, DEO, Facilitator Volunteer; plus SA and PA). Sunai staff with other
    designations (e.g. 124 "Teacher" / "Director", 126 "data analyst") get 403 on
    `/reports/menu`, so they don't see the menu. The Daily Activity Report API, however, uses
    `requireOrgMember()` as planned, so those staff can still use the page by its URL. This is
    pre-existing menu behaviour, not changed by this feature.

- 2026-09-30: shipped. Commits: api `c2a9847`, frontend `cf391f9`, parent `43632aa`. The 42 §3
  rows were copied verbatim into `docs/testing/TEST_CASES.md` ("Daily Activity Report
  (Sunai-only)"). Status → shipped. **Before deploying the API to beta/prod, the user runs
  `apps/api/prisma/sql/2026-09-30-partner-staff-daily-activity-report.sql` there.**

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- SRS row: n/a
- TEST_CASES: TC-DAR-01..42 ✔ promoted on ship (2026-09-30)
- Page maps / API docs to update: `docs/frontend/partner-portal.md`, `docs/api/endpoints.md`,
  `docs/api/api-structure.md`
- Migration: `apps/api/prisma/sql/2026-09-30-partner-staff-daily-activity-report.sql` (user runs
  it)
- Related:
  - `2026-09-25-partner-admin-orders.md` (admin list/CSV/view pattern, `requireSunaiOrg`);
  - `2026-09-29-partner-sunai-masters.md` (application-level timestamps decision);
  - Ham Niwasi Daily Report (`samajik-udyami.*`: TIME round-trip, caller-scoped CRUD);
  - `reports-menu.service.ts` (staff Reports and Tracking menu).
- Prototypes: `~/Downloads/Niwasi/niwasi-app/partner/daily-activity-report.html` (engine
  `daily-reports.js`), `admin-daily-activity-report.html` (engine `admin-reports.js`)
