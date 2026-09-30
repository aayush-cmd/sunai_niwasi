# Daily Meal and Income Report (Sunai staff report + Partner Admin Reports tab)

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-09-30 |
| Shipped | |
| SRS row | — (no `docs/requirement/SRS.md` in this repo yet) |
| Test cases | TC-DMI-01..40 |
| Prototype todo | — |

## 1. Requirement (as given)

> add another report in the daily reports (this report also follow the similar pattern as the daily activity report)
> report name: Daily Meal and Income Report
> its prototype staff:  file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/daily-meal-income-report.html
> for the admin : file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/admin-daily-meal-income-report.html
> now make a proper plan after reading and understanding all the requirements
> validations
>
> 5. Daily Meal and Income Report (Staff)
>
> | # | Field (English) | Type | Required | Validation |
> |---|---|---|---|---|
> | | Date | Date | Yes | Default today |
> | | **Tiffin** | | | |
> | 1 | Morning Tiffin | Number | No | 0 - 99999 |
> | 2 | Evening Tiffin | Number | No | 0 - 99999 |
> | 3 | Cash Payment | Number | No | 0 - 99999 |
> | 4 | Online Payment | Number | No | 0 - 99999 |
> | | **Mess** | | | |
> | 5 | Morning Mess | Number | No | 0 - 99999 |
> | 6 | Evening Mess | Number | No | 0 - 99999 |
> | 7 | Cash Payment (Mess) | Number | No | 0 - 99999 |
> | 8 | Online Payment (Mess) | Number | No | 0 - 99999 |
> | | **Expense and Money** | | | |
> | 9 | Total Expense at Mitram | Number | No | 0 - 99999 |
> | 10 | Amount Received from Sunai | Number | No | 0 - 99999 |
> | 11 | Money Given To / With Whom | Text | No | Max - 150 ch |
> | | **Stock Remaining** | | | |
> | 12 | Rice Remaining | Text | No | Max - 150 ch |
> | 13 | Dal Remaining | Text | No | Max - 150 ch |
> | 14 | Vegetables Remaining | Text | No | Max - 150 ch |
> | 15 | Anything Else Remaining | Text | No | Max - 150 ch |
> | | **Remarks** | | No | |
> | 16 | विवरणी / Remarks | Text | No | Max - 150 ch |

(user, 2026-09-30; the validation table was pasted as flat text and is transcribed as a table here.)

## 2. Plan

### 2.1 What the prototypes show

**Staff page** (`daily-meal-income-report.html`, engine `daily-reports.js`, `DR_CONFIG`):
- **Heading and button:** heading "Daily Meal and Income Report" and an **Add Report** button.
  There is no CSV button on the staff page.
- **Filter card:** Search, which matches **across all columns** (`searchAll`); Date From and Date
  To; Search and Clear.
- **List columns:** S.No, Date, Morning Tiffin, Evening Tiffin, Morning Mess, Evening Mess,
  **Total Expense**, **Received from Sunai**, Actions (👁 View, ✏ Edit). There is **no delete**.
- **Form:** full page, in **six titled sections** (the prototype's `group`s):

  | Section | Fields | Hindi section title |
  |---|---|---|
  | **Date** | Date | दिनांक |
  | **Tiffin** | Morning Tiffin, Evening Tiffin, Cash Payment, Online Payment | टिफ़िन |
  | **Mess** | Morning Mess, Evening Mess, Cash Payment (Mess), Online Payment (Mess) | मेस |
  | **Expense and Money** | Total Expense at Mitram, Amount Received from Sunai, Money Given To / With Whom | खर्च और पैसा |
  | **Stock Remaining** | Rice / Dal / Vegetables / Anything Else Remaining | बचा हुआ सामान |
  | **Remarks** | Remarks (a full-width textarea) | विवरणी |

  The number fields are `type="number"`; the Stock and Money-Given fields are text inputs.
- **View page:** the same sections, read-only; Back and Edit.
- **Menu:** Reports and Tracking → Daily Reports: Team Daily Report, Daily Activity Report, Daily
  Mitram Expense, **Daily Meal and Income Report**, Ham Niwasi Daily Report.

**Admin page** (`admin-daily-meal-income-report.html`, engine `admin-reports.js`):
- **Header:** "Daily Meal and Income Report" and a **Download CSV** button.
- **Filters:** Staff, Search (all fields plus the staff name), Date From, Date To.
- **List:**
  - Columns: S.No, **Staff**, Date, Morning Tiffin, Evening Tiffin, Morning Mess, Evening Mess,
    Total Expense, Received from Sunai, Actions (👁 View only). The page is read-only.
  - Sorted date desc, then staff.
- **View page:** "Staff: <name>" and every section, read-only.
- **CSV** (the prototype's `admin-reports.js`): one row per report. Headers are `S.No, Staff` +
  **all 17 fields in form order**:
  `Date, Morning Tiffin, Evening Tiffin, Cash Payment, Online Payment, Morning Mess, Evening Mess,
  Cash Payment (Mess), Online Payment (Mess), Total Expense at Mitram, Amount Received from Sunai,
  Money Given To / With Whom, Rice Remaining, Dal Remaining, Vegetables Remaining, Anything Else
  Remaining, Remarks`. It starts with a BOM, and dates are `DD-MM-YYYY`.

### 2.2 How this fits the current code

It is the **Daily Activity Report** pattern with more fields and no item rows:
- the same gates;
- the staff own-reports pages (list / new / `[id]` / `[id]/edit`);
- the admin read-only list with filters in the URL, staff options and the CSV export (every
  field quoted, BOM, filename built by the page);
- the keyed-result loading and the Sunai-only layouts;
- translation wrapping.

It also carries the conventions settled for the first two reports:
- a `status` column (1 active / -1 soft-deleted), with every read limited to `status = 1`, from
  `2026-09-30-report-status-soft-delete.md`;
- text columns `TEXT` with the limit enforced by the application;
- timestamps set by the application only;
- no whole-report delete for now.

It needs **no master data** and no options endpoint. Unlike Daily Mitram Expense, there are no
references to other tables.

**Menus:**
- **Staff:** the Sunai-only Daily Reports block in `buildReportsMenu` gets **Daily Meal and Income
  Report** after Daily Mitram Expense.
- **Admin:** the Sunai-only Reports dropdown gets a third leaf after Daily Mitram Expense.

### 2.3 Database — one new table (dated migration, run by the user)

Table: `partner_staff_daily_meal_income_report`, following the `partner_staff_{report_name}`
convention.

File: `apps/api/prisma/sql/2026-09-30-partner-staff-daily-meal-income-report.sql`

```sql
CREATE TABLE partner_staff_daily_meal_income_report (
  id                          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  partner_id                  INT UNSIGNED  NOT NULL,
  report_date                 DATE          NOT NULL,
  -- Tiffin
  morning_tiffin              INT UNSIGNED  NULL,   -- count (Q2)
  evening_tiffin              INT UNSIGNED  NULL,
  tiffin_cash_payment         DECIMAL(7,2)  NULL,   -- ₹, up to 2 decimals (Q2)
  tiffin_online_payment       DECIMAL(7,2)  NULL,
  -- Mess
  morning_mess                INT UNSIGNED  NULL,
  evening_mess                INT UNSIGNED  NULL,
  mess_cash_payment           DECIMAL(7,2)  NULL,
  mess_online_payment         DECIMAL(7,2)  NULL,
  -- Expense and Money
  total_expense_at_mitram     DECIMAL(7,2)  NULL,
  amount_received_from_sunai  DECIMAL(7,2)  NULL,
  money_given_to              TEXT          NULL,   -- max 150, application-level
  -- Stock Remaining
  rice_remaining              TEXT          NULL,
  dal_remaining               TEXT          NULL,
  vegetables_remaining        TEXT          NULL,
  anything_else_remaining     TEXT          NULL,
  -- Remarks
  remarks                     TEXT          NULL,
  status                      TINYINT       NOT NULL DEFAULT 1,  -- 1 = active, -1 = soft-deleted
  created_by                  INT UNSIGNED  NOT NULL,            -- the staff member whose report it is
  updated_by                  INT UNSIGNED  NOT NULL,
  created_at                  TIMESTAMP     NULL DEFAULT NULL,
  updated_at                  TIMESTAMP     NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY psdmi_partner_date_idx (partner_id, report_date),
  KEY psdmi_partner_creator_date_idx (partner_id, created_by, report_date),
  KEY psdmi_partner_status_idx (partner_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

- **No reference columns** other than the standard `partner_id` / `created_by` / `updated_by`, so
  the `{table_name}_id` naming rule doesn't come into play.
- **Numbers:** an empty number field is stored as **NULL**, not 0, so "not filled in" and "zero"
  stay different (Q4). `DECIMAL(7,2)` holds 0.00 to 99999.99, which covers the 0–99999 range.
- **Timestamps** are set by the application; the `status` default is not a timestamp. There are no
  FK constraints.

### 2.4 API — new module `daily-meal-income-report.*`

Files in `apps/api/src/modules/partner/`:
- `daily-meal-income-report.schema.ts`
- `daily-meal-income-report.service.ts`
- `daily-meal-income-report.controller.ts`
- `daily-meal-income-report.routes.ts`

It is mounted with one line in `partner.routes.ts`. The DAR and DME modules aren't touched;
small helpers are copied, not shared.

**Staff** (base `/orgs/:slug/daily-meal-income-reports`): `requireSunaiOrg` →
`requirePartnerAuth` → `validateParams` → `requireOrgMember()`; **own reports only**.

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/daily-meal-income-reports` | My reports: `?page&limit&q&from&to`. `q` covers the text fields (Q5); sorted `report_date` desc, then `id` desc |
| POST | `/orgs/:slug/daily-meal-income-reports` | Create (status 1) |
| GET | `/orgs/:slug/daily-meal-income-reports/:id` | One of my reports |
| PUT | `/orgs/:slug/daily-meal-income-reports/:id` | Edit mine (`created_*` kept) |

**Admin** (base `/orgs/:slug/admin/daily-meal-income-reports`): `requireSunaiOrg` →
`requirePartnerAuth` → `validateParams` → `requireOrgAccess()`; read-only; the fixed paths come
before `/:id`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/admin/daily-meal-income-reports` | All reports with `staff_name`: `?page&limit&staff_id&q&from&to`. `q` also matches the staff name; sorted date desc, then staff name, then id desc |
| GET | `/orgs/:slug/admin/daily-meal-income-reports/staff-options` | Staff with at least one active report |
| GET | `/orgs/:slug/admin/daily-meal-income-reports/export` | CSV of the filtered set: one row per report, headers as in §2.1, every field quoted, BOM, `DD-MM-YYYY`; empty numbers become empty cells. Filename `daily-meal-income-report_<IST date>.csv`. Cap 20000 |
| GET | `/orgs/:slug/admin/daily-meal-income-reports/:id` | One report with its staff name |

That's **8 endpoints**. Every read is limited to `status = 1`.

**Validation.** Backend (Zod) and the form enforce the same rules (AGENTS.md):

| Field | Rule |
|---|---|
| `report_date` | required; a real `YYYY-MM-DD`; any past or future date, editable (same as DAR); the form prefills IST today |
| `morning_tiffin`, `evening_tiffin`, `morning_mess`, `evening_mess` | optional; a **whole number 0–99999** (Q2, Q3); empty → NULL |
| `tiffin_cash_payment`, `tiffin_online_payment`, `mess_cash_payment`, `mess_online_payment`, `total_expense_at_mitram`, `amount_received_from_sunai` | optional; a number **0–99999**, **up to 2 decimal places** (Q2, Q3); empty → NULL; no sign or exponent |
| `money_given_to`, `rice_remaining`, `dal_remaining`, `vegetables_remaining`, `anything_else_remaining`, `remarks` | optional; trimmed; **max 150 characters**; blank → NULL |
| list `from` / `to`, `q`, `limit`, `staff_id` | as for DAR: `from` ≤ `to` (the page shows its own message); `q` ≤ 150; `limit` 1..100, default 10 |

- The API accepts a number or a numeric string for the number fields, and returns decimals as
  strings without trailing zeros (`1200.50` → `1200.5`).
- A report with **only a Date** is allowed, because every other field is optional (as in the
  user's table).

### 2.5 Frontend

**Staff pages** (under the requested `staff/reports/`; Sunai-only via `layout.tsx` →
`notFound()`):

| URL | File | What |
|---|---|---|
| `/{slug}/staff/reports/daily-meal-income-report` | `…/daily-meal-income-report/page.tsx` | My reports: filter card (Search, Date From, Date To), count, table (S.No, Date, Morning Tiffin, Evening Tiffin, Morning Mess, Evening Mess, Total Expense, Received from Sunai, 👁 / ✏), pagination, **Add Report** |
| `…/new` | `…/new/page.tsx` | Add form |
| `…/[id]` | `…/[id]/page.tsx` | Read-only view, by section; Back and Edit |
| `…/[id]/edit` | `…/[id]/edit/page.tsx` | Edit form, prefilled |

**Admin pages** (inside the existing Sunai-only `admin/reports/` layout):

| URL | File | What |
|---|---|---|
| `/{slug}/admin/reports/daily-meal-income-report` | `…/page.tsx` | All reports: Staff / Search / Date filters in the URL; count; table (S.No, Staff, Date, the 6 columns, 👁); pagination; **Download CSV** |
| `…/[id]` | `…/[id]/page.tsx` | Read-only view with "Staff: <name>"; Back keeps the filters |

**Components:**
- `components/partner/daily-meal-income/DailyMealIncomeForm.tsx`: the six sections as titled
  groups in a 2–4 column grid. Remarks is a full-width textarea.
  - Count inputs: `inputMode="numeric"`, digits only.
  - Money inputs: `inputMode="decimal"`, digits and one dot.
  - Text inputs: `maxLength` 150 with a live `n/150` counter.
  - Inline errors under each field.
- `components/partner/daily-meal-income/DailyMealIncomeDetails.tsx`: the read-only view.
- Reused: `DarFilterCard` (unchanged props), the `surveyUi` helpers, `dmy()` / `istToday()`, and
  the `?back=` pattern.

Empty numbers show as "—" in the list and view (Q4). Money is shown as entered, without ₹
formatting or thousands separators.

**Labels:** the field labels are the English ones from the user's table. The Remarks field is
labelled **"Remarks"**, and "विवरणी" comes through the translation layer (Q6). All UI text is
wrapped in `t()`; the data and the CSV headers are not. No label SQL.

### 2.6 Docs to update in the same change

- `docs/frontend/partner-portal.md`: staff and admin rows, plus 6 All-pages rows. 224 → 230.
- `docs/api/endpoints.md`: 8 rows. 928 → 936; partner 418 → 426.
- `docs/api/api-structure.md`: the new router mount and the `requireSunaiOrg` mounts.
- On ship: §3 → `TEST_CASES.md`; status → shipped.

### 2.7 Risk / impact

- The change is new code only:
  - 1 table;
  - a new module plus 1 mount line;
  - 1 line in the Sunai-only menu block;
  - 1 leaf in the Sunai-only admin dropdown;
  - 6 pages.
- DAR and DME are untouched.
- **Deploy order:** SQL first, then the API.

### 2.8 Open questions (answers go in §4)

_All resolved 2026-09-30, all as recommended (§4)._

1. **Same rules as the other two reports.** Recommendation: yes:
   - own reports only;
   - edit any time, no delete;
   - several reports per day;
   - admin read-only;
   - the Staff filter lists submitters only;
   - 10 per page.
2. **Kinds of number.** The tiffin and mess fields are counts; the payment, expense and received
   fields are rupees. Recommendation: counts are **whole numbers**; rupee amounts allow **up to 2
   decimal places** (e.g. 1200.50). The alternative is whole numbers everywhere.
3. **Is 99999 included?** "0 - 99999" reads as a range. Recommendation: **both 0 and 99999 are
   allowed**. (Daily Mitram Expense's quantity said "less than 99999", which excludes it.)
4. **Empty number fields.** Recommendation: store them **empty** (NULL) and show "—", not 0, so
   "not filled in" and "zero" stay different.
5. **Search.** The prototype searches every column. Recommendation: the staff search matches the
   text fields (Money Given To, the four Stock fields, Remarks); the admin search also matches the
   staff name. Number fields aren't searched; use the date filters for dates.
6. **Remarks label.** Your table says "विवरणी / Remarks". Recommendation: label it "Remarks" (the
   same as the list, CSV and prototype), and let the Hindi "विवरणी" come from the Language admin
   like every other label. The alternative is to show "विवरणी / Remarks" literally, both languages
   at once.

## 3. Test cases (designed up front)

"Staff" means an approved Sunai staff member. The 404 cases apply to the page (not-found) and
the API.

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-DMI-01 | Staff menu entry | Sunai staff with Reports and Tracking | Open Daily Reports | … Daily Activity Report, Daily Mitram Expense, **Daily Meal and Income Report**; it opens the list | H |
| TC-DMI-02 | Not in other orgs' menus | Staff of another org | Open Daily Reports | Not listed | H |
| TC-DMI-03 | Admin Reports leaf | Sunai PA | Open the Reports dropdown | Third leaf, Daily Meal and Income Report | H |
| TC-DMI-04 | Admin leaf absent elsewhere | PA of another org | Admin nav | No Reports dropdown | M |
| TC-DMI-05 | Access roles | SA; Sunai PA; Sunai staff | Staff list; add a report | All three can; each sees only their own | H |
| TC-DMI-06 | Other org is not-found | Any user, including SA | Both page URLs and APIs on `<Other>` | Not-found page; API 404 | H |
| TC-DMI-07 | Logged out | No session | Staff list, admin list | 401 | H |
| TC-DMI-08 | Staff blocked from admin | Sunai staff | Admin list / export / staff-options / `:id` | 403 | H |
| TC-DMI-09 | Other org's users blocked | PA / staff of org X | Sunai staff and admin APIs | 403 | H |
| TC-DMI-10 | Form sections | Staff | Open Add Report | Six titled sections (Date, Tiffin, Mess, Expense and Money, Stock Remaining, Remarks), fields in table order | H |
| TC-DMI-11 | Add a full report | Staff | Fill every field (e.g. 18 / 14 / 1200 / 850.50 / 22 / 20 / 1500 / 1100 / 2300 / 2000 / Ramesh / 5 Kg / 1 Kg / 2 Kg / — / remark) → Save | Saved; the list row shows Date DD-MM-YYYY, 18, 14, 22, 20, 2300, 2000 | H |
| TC-DMI-12 | Date only | Staff | Only the Date → Save | Saved; empty columns show "—" | H |
| TC-DMI-13 | Date defaults to today | Staff | Open Add Report | Date = IST today, editable | H |
| TC-DMI-14 | Date required / invalid | Form / API | Clear the date; API `2026-02-30`, `30-09-2026` | Inline "Date is required."; API 422 | H |
| TC-DMI-15 | Past / future dates | Staff | Save last month and next month; edit the date | All saved | M |
| TC-DMI-16 | Count range | Form / API | Morning Tiffin = 0, 99999, 100000, -1 | 0 and 99999 saved; 100000 and -1 → inline error / 422 on that field | H |
| TC-DMI-17 | Counts are whole numbers | Form / API | Evening Mess = 2.5 | Rejected ("whole number"); the input accepts digits only | H |
| TC-DMI-18 | Money range and decimals | Form / API | Cash Payment = 0, 99999, 99999.99, 100000, 12.5, 12.345, 1e3, abc | 0, 99999 and 12.5 saved; 99999.99 → rejected (above 99999); 100000, 12.345 (3 decimals), 1e3 and abc → rejected | H |
| TC-DMI-19 | Decimal round-trip | Staff | Online Payment 850.50 | Reads back 850.5 in the view, edit and CSV | M |
| TC-DMI-20 | Text max 150 | Form / API | Each text field at 150, then 151 | 150 saved; the input stops at 150 with an `n/150` counter; 151 via the API → 422 on that field | M |
| TC-DMI-21 | Blank → empty | Staff | Numbers left empty, text of only spaces | Stored NULL; shown "—" (not 0) | M |
| TC-DMI-22 | Zero is not empty | Staff | Morning Tiffin = 0 | Stored 0; shown "0" | M |
| TC-DMI-23 | View page | Own report | 👁 | All 17 fields by section, text in full; Back / Edit | H |
| TC-DMI-24 | Edit own | Own report | Change several numbers and the remarks → Save | Updated; `created_*` unchanged | H |
| TC-DMI-25 | Can't read / edit another's | Staff A; B's id | GET / PUT `:id`; open the pages | 404 / not found; B unchanged | H |
| TC-DMI-26 | No delete | — | Check the actions; DELETE `:id` | No control; 404 | M |
| TC-DMI-27 | Body can't set owner / org / status | API | POST with `created_by`, `partner_id`, `status: -1` | Saved under the caller and Sunai, with status 1 | H |
| TC-DMI-28 | Soft-deleted hidden | A row set to status -1 in the DB | Staff list, get, admin list, get, staff-options, CSV | Hidden; get → 404 | M |
| TC-DMI-29 | Staff search | Several reports | Search by Money Given To name, a stock text, a remark | Matching rows; a number value doesn't match (Q5) | M |
| TC-DMI-30 | Date range | — | From / To; From > To | Correct rows; From > To → the page's own message / API 422 | M |
| TC-DMI-31 | Staff pagination | 11+ reports | Page 2 | 10 per page, sorted date desc | M |
| TC-DMI-32 | Admin list | Reports by 2+ staff | PA opens the admin list | All reports; Staff column; sorted date desc, then staff | H |
| TC-DMI-33 | Admin staff filter | — | Staff dropdown | Submitters only; the filter works; filters in the URL | H |
| TC-DMI-34 | Admin search incl. staff name | — | Search a staff name; a remark | Matching reports | M |
| TC-DMI-35 | Admin view | — | 👁 | "Staff: <name>" plus every section; no Edit; Back keeps the filters | H |
| TC-DMI-36 | CSV follows the filters | Staff + date filter | Download CSV | Only the filtered reports; filename `daily-meal-income-report_<today>.csv` | H |
| TC-DMI-37 | CSV headers and format | — | Open the CSV | Exactly `S.No, Staff` + the 17 field headers in §2.1 order; DD-MM-YYYY; BOM; empty numbers are empty cells; 850.5 shown | H |
| TC-DMI-38 | CSV tricky text | A remark with `a, b; "c"` and a newline | Open the CSV | Stays in its own column | H |
| TC-DMI-39 | Timestamps | — | Create then edit; check the DB | Correct times (no 5h30m skew); edit changes only `updated_*` | L |
| TC-DMI-40 | Translation wrapped | i18n on; some Hindi labels entered (e.g. "Remarks" → विवरणी) | Switch to हिं | Those labels in Hindi; the data and CSV headers unchanged | L |

## 4. Sign-off

- 2026-09-30: plan drafted; the §2.8 questions are waiting for the user.
- 2026-09-30, user: "all as recommended and start with the implementaion".
  1. Same rules as DAR / DME: own reports only; edit any time; no delete; several per day; admin
     read-only; Staff filter lists submitters only; 10 per page.
  2. The 4 counts are whole numbers; the 6 rupee amounts allow up to 2 decimals.
  3. 0 and 99999 are both allowed; anything above 99999 (including 99999.50) is rejected.
  4. Empty number fields are stored NULL and shown "—" (0 stays 0).
  5. Staff search covers the 6 text fields; admin search also covers the staff name; numbers
     aren't searched.
  6. The field is labelled "Remarks"; the Hindi comes through the Language admin.

  Status → in-progress.

## 5. Execution log

- 2026-09-30: implementation (uncommitted). A VS Code crash interrupted the work during the API
  typecheck; it resumed with every file intact, the Prisma client regenerated, and the PM2
  servers restarted.
  - **DB:**
    - `apps/api/prisma/sql/2026-09-30-partner-staff-daily-meal-income-report.sql`: 1 table; counts
      `INT UNSIGNED`, rupees `DECIMAL(7,2)`, text `TEXT`, `status TINYINT DEFAULT 1`, no
      timestamp defaults;
    - `model partner_staff_daily_meal_income_report` in `schema.prisma`; validate and generate
      passed;
    - **not yet run by the user.**
  - **API:**
    - `daily-meal-income-report.{schema,service,controller,routes}.ts`, mounted with
      `router.use(dailyMealIncomeReportRouter)`;
    - 8 endpoints (staff `requireOrgMember` own rows; admin `requireOrgAccess` read-only; all
      behind `requireSunaiOrg`);
    - a field registry (`DMI_FIELDS`) drives the Zod shape, the write data and the CSV columns;
    - raw-id list query (text search; admin also the staff name; staff-name sort), then Prisma
      load; every read limited to `status = 1`;
    - money is returned without trailing zeros.
    - `reports-menu.service.ts`: added after Daily Mitram Expense in the Sunai block.
  - **Frontend:**
    - `lib/partner-daily-meal-income-report.ts`: sections / fields / list columns, validation
      mirror, client, CSV download;
    - `components/partner/daily-meal-income/{DailyMealIncomeForm,DailyMealIncomeDetails}.tsx`;
    - staff `staff/reports/daily-meal-income-report/{layout,page,new,[id],[id]/edit}`;
    - admin `admin/reports/daily-meal-income-report/{page,[id]}`;
    - `PartnerOrgNav.tsx`: third Reports leaf;
    - count inputs digits only, money digits + dot, text `n/150` counters;
    - all UI text wrapped in `t()`.
  - **Checks:**
    - API and frontend `tsc` clean; eslint clean.
    - Probes: Sunai staff and admin lists without a session → 401 (TC-DMI-07); pratham → 404
      (TC-DMI-06, API half).
    - The staff and admin pages return 200; `staff/reports/global` still 200.
  - **Docs:**
    - `docs/frontend/partner-portal.md`: staff and admin rows, 6 All-pages rows, 224 → 230;
    - `docs/api/endpoints.md`: 8 rows, 928 → 936, partner 418 → 426;
    - `docs/api/api-structure.md`: partner module row and the `requireSunaiOrg` mounts.
- 2026-09-30: the user ran `2026-09-30-partner-staff-daily-meal-income-report.sql` locally.
  Verification: a DB + API script (89 checks) plus headless Chromium (22 checks), all PASS.
  - **Setup:** locally signed JWTs for SA (1), PA (111454), staff 124 / 126, Office Staff 208,
    pratham PA 3556 and pratham staff 3557.
  - **Access:**
    - TC-DMI-05 PASS: SA / PA / staff list and create, own reports only.
    - TC-DMI-06 PASS: pratham → API 404 (SA) and not-found pages.
    - TC-DMI-07 PASS: 401 with no session.
    - TC-DMI-08 PASS: staff → 403 on admin list / export / staff-options / `:id`.
    - TC-DMI-09 PASS: pratham PA and staff → 403.
  - **Menus:**
    - TC-DMI-01 PASS: Office Staff 208 sees Daily Reports = [Team Daily Report, Daily Activity
      Report, Daily Mitram Expense, Daily Meal and Income Report].
    - TC-DMI-02 PASS: pratham staff doesn't see it.
    - TC-DMI-03 PASS: third admin Reports leaf.
    - TC-DMI-04 PASS: pratham admin has no Reports.
  - **Form and create:**
    - TC-DMI-10 PASS: six sections, in order.
    - TC-DMI-11 PASS: a full create reads back (counts as numbers, 850.50 → "850.5",
      empty → null); list row via API and UI: 18-09-2026, 18, 14, **0**, "—", 2300, 2000.
    - TC-DMI-12 PASS: a date-only report has every other field null.
    - TC-DMI-13 PASS: Date prefilled with IST today.
    - TC-DMI-14 PASS: missing, 2026-02-30 or 30-09-2026 → 422; "Date is required." inline.
    - TC-DMI-15 PASS: past and future dates; date editable (→ 2026-10-05).
  - **Numbers and text:**
    - TC-DMI-16 PASS: count 0 and 99999 saved; 100000 and -1 → 422 on the field; the range
      message shows inline.
    - TC-DMI-17 PASS: count "2.5" and 2.5 → 422; the input strips non-digits ("2.5a" → "25").
    - TC-DMI-18 PASS: money 0, 99999 and 12.5 saved; 99999.99, 100000, 12.345, 1e3, abc and -5
      → 422; the decimals and max messages show inline.
    - TC-DMI-19 PASS: 850.50 → 850.5 in the view, edit prefill and CSV (1100.50 → 1100.5).
    - TC-DMI-20 PASS: each of the 6 text fields: 150 saved, 151 → 422; the remarks textarea
      stops at 150 with a 150/150 counter.
    - TC-DMI-21 PASS: spaces and empty numbers → null.
    - TC-DMI-22 PASS: 0 stays 0.
  - **View and edit:**
    - TC-DMI-23 PASS: view by section.
    - TC-DMI-24 PASS: edit via API (`created_at` kept, `updated_at` advanced) and via the UI
      (prefilled, saved).
    - TC-DMI-25 PASS: another staff member's id → 404 on GET and PUT; their report unchanged.
    - TC-DMI-26 PASS: no DELETE.
    - TC-DMI-27 PASS: `created_by` / `partner_id` / `status: -1` in the body are ignored
      (saved as 124 / Sunai / 1).
    - TC-DMI-28 PASS: a status -1 row is hidden from get, the staff list, the admin list and
      get, and the CSV.
  - **Staff filters:**
    - TC-DMI-29 PASS: search by Money Given To, stock text and remark; a number ("2300")
      doesn't match.
    - TC-DMI-30 PASS: date range; from > to → 422.
    - TC-DMI-31 PASS: 10 per page, date desc.
  - **Admin:**
    - TC-DMI-32 PASS: all staff; sorted date desc, then staff; admin columns.
    - TC-DMI-33 PASS: staff options = submitters (124, 126, 111454; not 208); staff filter;
      filters in the URL.
    - TC-DMI-34 PASS: search by staff name and by remark.
    - TC-DMI-35 PASS: admin view with "Staff: <name>"; no Edit; no admin PUT; Back keeps the
      filters.
  - **CSV and DB:**
    - TC-DMI-36 PASS: API and UI CSV follow the filters; filename
      `daily-meal-income-report_<IST today>.csv`.
    - TC-DMI-37 PASS: UTF-8 BOM (checked on the raw bytes: `fetch().text()` strips it, which is
      why the first assertion failed), the exact 19 headers, every field quoted, empty numbers
      as empty cells, decimals trimmed.
    - TC-DMI-38 PASS: a remark with `a, b; "c"` and a newline stays in its own column; every row
      has 19 cells.
    - TC-DMI-39 PASS: `updated_at` ≈ now (no skew); `created_by` / `updated_by` = the author.
  - **Not run:** TC-DMI-40 (needs Hindi labels in the Language admin).
  - **Cleanup:** the 23 reports created by the tests were deleted by id; no `ZZ…`-marked rows
    remain. The user's own report (id 1, created_by 1) was untouched.

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- SRS row: n/a
- TEST_CASES: TC-DMI-01..40 (promote on ship)
- Page maps / API docs to update: `docs/frontend/partner-portal.md`, `docs/api/endpoints.md`,
  `docs/api/api-structure.md`
- Migration: `apps/api/prisma/sql/2026-09-30-partner-staff-daily-meal-income-report.sql` (user
  runs it)
- Related:
  - `2026-09-30-daily-activity-report.md` (the pattern);
  - `2026-09-30-daily-mitram-expense.md` (the menu block and admin dropdown extended here);
  - `2026-09-30-report-status-soft-delete.md` (the `status` convention).
- Prototypes: `~/Downloads/Niwasi/niwasi-app/partner/daily-meal-income-report.html` (engine
  `daily-reports.js`), `admin-daily-meal-income-report.html` (engine `admin-reports.js`)
