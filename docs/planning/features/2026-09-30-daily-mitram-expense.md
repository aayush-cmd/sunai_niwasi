# Daily Mitram Expense (Sunai staff report + Partner Admin Reports tab)

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-09-30 |
| Shipped | |
| SRS row | — (no `docs/requirement/SRS.md` in this repo yet) |
| Test cases | TC-DME-01..48 |
| Prototype todo | — |

## 1. Requirement (as given)

> next i want to add another report in the daily reports (this report also follow the similar pattern as the daily activity report)
> report name: Daily Mitram Expense
> its prototype staff:  file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/daily-mitram-expense.html
> for the admin : file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/admin-daily-mitram-expense.html
> we will have two tables for this report
> items table name will be
> partner_staff_expense_item
> now make a proper plan after reading and understanding all the requirements
> validations
>
> 4. Daily Mitram Expense (Staff)
> Header
>
> | # | Field | Type | Required | Validation |
> |---|---|---|---|---|
> | 1 | Date | Date | Yes | Defaults to today |
> | 2 | Center Code | Dropdown (Center master, active only) | Yes | |
> | 3 | Center Name | text | Yes | Auto-fills from the chosen center code |
>
> Item-wise entry (repeatable rows: Add Item / Remove)
>
> | # | Field | Type | Required | Validation |
> |---|---|---|---|---|
> | 4 | Material | Dropdown (Material and Expense Head, active only) | Yes | |
> | 5 | Quantity | Number (decimal) | Yes | More than 0, Less than - 99999 |
> | 6 | Quantity Unit | Dropdown (Quantity Unit master, active only) | Yes | |
> | 7 | Comment | Text | No | Max - 150 ch |

(user, 2026-09-30; the validation table was pasted as text and is transcribed as tables here.)

## 2. Plan

### 2.1 What the prototypes show

**Staff page** (`daily-mitram-expense.html`, engine `daily-reports.js`, `DR_CONFIG` with
`items: true`):

- **Heading and button:** heading "Daily Mitram Expense" and an **Add Expense** button. There is
  no CSV button on the staff page.
- **Filter card:**
  - Search, labelled "Center Name / Item", which matches the center name and any item's text;
  - a **Center Code** filter (a dropdown of center codes);
  - Date From and Date To;
  - Search and Clear buttons.
- **List columns:** S.No, Date, Center Name, Center Code, **Items**, Actions (👁 View, ✏ Edit).
  The Items column is a one-line summary such as "Rice 10 Kg, Dal 3 Kg". There is **no delete**
  (`noDelete`).
- **Form** (full page):
  - **Header:** Date* / Center Code* (select) / Center Name*.
  - **"Item wise entry":** a table of rows with Material* (select from Material and Expense
    Head), Quantity* (number, min 0, step any), Quantity Unit* (select from Quantity Unit),
    Comment, and a remove button. The remove button is hidden when only one row is left.
  - An **Add Item** button adds a row.
- **Save rules in the prototype:**
  - an entirely blank item row is skipped;
  - a partly filled row needs Material, Quantity and Unit;
  - **at least one item** is required ("Please add at least one item").
- **View page:** the header fields, plus a read-only items table (Material, Quantity, Quantity
  Unit, Comment); Back and Edit buttons.
- **Menu:** Reports and Tracking → Daily Reports: Team Daily Report, Daily Activity Report,
  **Daily Mitram Expense**, Daily Meal and Income Report, Ham Niwasi Daily Report.

**Admin page** (`admin-daily-mitram-expense.html`, engine `admin-reports.js`, `AR_CONFIG` with
`items: true`):

- **Header:** "Daily Mitram Expense" and a **Download CSV** button.
- **Filters:** Staff (All Staff / one staff member), Search (all fields, including items and the
  staff name), Date From, Date To.
- **List:**
  - Columns: S.No, Staff, Date, Center Name, Center Code, Items (summary), Actions (👁 View only).
    The page is read-only.
  - Sorted by date (newest first), then by staff name.
- **View page:** "Staff: <name>", the header fields and the items table.
- **CSV:**
  - **One row per item.** The report's own columns repeat on each of its item rows.
  - Headers: `S.No, Staff, Date, Center Code, Center Name, Material, Quantity, Quantity Unit,
    Comment`.
  - S.No numbers the **report**, so each item row of the same report shares it.
  - It starts with a BOM.
- **Menu:** the admin Reports dropdown already has Daily Activity Report. The prototype lists
  "Daily Mitram Expenses" (plural) after it.

### 2.2 How this fits the current code

It follows the **Daily Activity Report** (`2026-09-30-daily-activity-report.md`, shipped) one to
one wherever the two can match:
- the same gates;
- the staff own-reports pattern;
- the admin read-only list with URL filters, staff options and the CSV approach;
- the keyed-result loading pattern;
- the Sunai-only layouts and the translation wrapping.

The new parts are:
- the **item rows** (a second table and a repeatable form section);
- **three master dropdowns**, which read the Sunai masters shipped on 2026-09-29.

**Master data for the form.** The masters' own API (`/orgs/:slug/masters/*`) is **System Admin +
Partner Admin only**; staff get 403. So the report gets its own read-only **options** endpoint
behind the staff gate, returning the **active** rows only:
- centers: `{ id, code, name }`;
- heads: `{ id, name }`;
- units: `{ id, name, short_name }`.

The masters' pages and API stay untouched.

**Menus:**
- **Staff:** `buildReportsMenu` already has a Sunai-only block that adds Daily Activity Report.
  **Daily Mitram Expense** goes right after it, in the same block, which gives the prototype's
  order. The existing greyed, unrelated **"Mitram Daily Reports"** top-level placeholder (legacy
  item D) is left as is (Q9).
- **Admin:** the existing Sunai-only **Reports** dropdown in `PartnerOrgNav.tsx` gets a second
  leaf after Daily Activity Report (Q8 for the label).

### 2.3 Database — two new tables (one dated migration, run by the user)

- Header table: `partner_staff_daily_mitram_expense`, following the
  `partner_staff_{report_name}` convention.
- Items table: `partner_staff_expense_item`, **as named by the user**.

File: `apps/api/prisma/sql/2026-09-30-partner-staff-daily-mitram-expense.sql`

```sql
CREATE TABLE partner_staff_daily_mitram_expense (
  id                                             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  partner_id                                     INT UNSIGNED NOT NULL,
  report_date                                    DATE         NOT NULL,
  master_partner_center_id                       INT UNSIGNED NOT NULL,          -- master_partner_center.id
  created_by                                     INT UNSIGNED NOT NULL,          -- the staff member whose report it is
  updated_by                                     INT UNSIGNED NOT NULL,
  created_at                                     TIMESTAMP    NULL DEFAULT NULL,
  updated_at                                     TIMESTAMP    NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY psdme_partner_date_idx (partner_id, report_date),
  KEY psdme_partner_creator_date_idx (partner_id, created_by, report_date),
  KEY psdme_center_idx (master_partner_center_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE partner_staff_expense_item (
  id                                             INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  partner_staff_daily_mitram_expense_id          INT UNSIGNED  NOT NULL,     -- partner_staff_daily_mitram_expense.id
  sort_order                                     SMALLINT UNSIGNED NOT NULL, -- row order in the form (0, 1, 2 …)
  master_partner_material_and_expense_head_id    INT UNSIGNED  NOT NULL,     -- master_partner_material_and_expense_head.id
  quantity                                       DECIMAL(8,3)  NOT NULL,     -- > 0 and < 99999, up to 3 decimals (Q3)
  master_partner_quantity_unit_id                INT UNSIGNED  NOT NULL,     -- master_partner_quantity_unit.id
  comment                                        TEXT          NULL,         -- max 150 characters, application-level
  created_by                                     INT UNSIGNED  NOT NULL,
  updated_by                                     INT UNSIGNED  NOT NULL,
  created_at                                     TIMESTAMP     NULL DEFAULT NULL,
  updated_at                                     TIMESTAMP     NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY pssei_expense_order_idx (partner_staff_daily_mitram_expense_id, sort_order),
  KEY pssei_material_idx (master_partner_material_and_expense_head_id),
  KEY pssei_unit_idx (master_partner_quantity_unit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

- **Column names for references (user 2026-09-30).** A column that points at another table is
  named after that table: `{table_name}_id` for the id, and `{table_name}_<column>` for a
  snapshot of one of its columns. For example `master_partner_center_id` (and, had copies been
  kept, `master_partner_center_code` / `master_partner_center_name`; they were later dropped, see
  "No copied master values" below). This makes it clear which table
  a column refers to. The same names are used for the API request and response keys, so a field
  can be traced to its column. The TypeScript view-models use camelCase.
  - **Kept as-is:** `partner_id` and `created_by` / `updated_by`. These are the repo-wide
    standard columns: every table uses them, and the gates and helpers rely on them. Flagged in
    §4; confirmed by the user on 2026-09-30.
  - Every name is within MySQL's 64-character identifier limit; the longest is
    `master_partner_material_and_expense_head_name` at 45 characters.
- **No FK constraints** (AGENTS.md). The id columns are indexed, and the relations are checked in
  the application: on save, every `master_partner_center_id` / `master_partner_material_and_expense_head_id` / `master_partner_quantity_unit_id` must be an active row of
  **this** partner's master (§2.4).
- **No copied master values (user 2026-09-30, Q2).** Both tables store **only the ids**:
  `master_partner_center_id`, `master_partner_material_and_expense_head_id` and
  `master_partner_quantity_unit_id`. The center code/name, material name and unit name/short
  code are always **looked up from the masters**: in the list, view, search, CSV and edit
  prefill. A rename or code change in a master therefore shows on every old report. The masters
  have no delete (deactivate only), so every stored id always resolves. The lookups read the
  master row **whatever its status**, so a report whose center/head/unit was later deactivated
  still shows its name. Searches on center name, center code and material name join the masters.
- **Timestamps** are set by the application only; no DB default (the 2026-09-29 decision).
- **`comment` is `TEXT`** with the 150-character limit enforced by the application, the same as
  the Daily Activity Report text fields (user decision on 2026-09-30 for that report).
- **`partner_id` is not repeated on items.** Items are always reached through their header, which
  carries the partner scope.
- **No `status` / `deleted_at`:** there is no delete, as on the Daily Activity Report.

### 2.4 API — new module `daily-mitram-expense.*`

Files in `apps/api/src/modules/partner/`:
- `daily-mitram-expense.schema.ts`
- `daily-mitram-expense.service.ts`
- `daily-mitram-expense.controller.ts`
- `daily-mitram-expense.routes.ts`

It is mounted in `partner.routes.ts` with one line. The Daily Activity Report module is not
touched. Small shared helpers (date/time round-trip, a real-date check, the LIKE escape) are
copied rather than refactored out of the shipped module, so that module stays unchanged.

**Staff endpoints** (base `/orgs/:slug/daily-mitram-expenses`):
- **Gate:** `requireSunaiOrg` → `requirePartnerAuth` → `validateParams` → `requireOrgMember()`.
- **Scope:** only **the caller's own** reports (`created_by = caller`); anyone else's id → 404.

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/daily-mitram-expenses/options` | Active centers / heads / units of this org for the form's dropdowns and the Center Code filter, each sorted (code; name; name). |
| GET | `/orgs/:slug/daily-mitram-expenses` | My reports: `?page&limit&q&master_partner_center_id&from&to`. `q` matches the center name and any item's material name or comment. Each row carries its items (for the summary column). Sorted `report_date` desc, then `id` desc. |
| POST | `/orgs/:slug/daily-mitram-expenses` | Create a report with its items, in **one transaction**. |
| GET | `/orgs/:slug/daily-mitram-expenses/:id` | One of my reports, with its items in `sort_order`. |
| PUT | `/orgs/:slug/daily-mitram-expenses/:id` | Edit one of my reports. In one transaction: update the header, delete its items, insert the new item list. `created_*` on the header is never re-stamped. |

**Admin endpoints** (base `/orgs/:slug/admin/daily-mitram-expenses`):
- **Gate:** `requireSunaiOrg` → `requirePartnerAuth` → `validateParams` → `requireOrgAccess()`.
- **Read-only.** The fixed paths are registered before `/:id`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/admin/daily-mitram-expenses` | Every report of the org, with items and `staff_name`: `?page&limit&staff_id&q&from&to`. `q` also matches the staff name and the center code. Sorted date desc, then staff name, then id desc. |
| GET | `/orgs/:slug/admin/daily-mitram-expenses/staff-options` | Staff with at least one report (the DAR rule). |
| GET | `/orgs/:slug/admin/daily-mitram-expenses/export` | CSV using the list filters: one row per item, headers as in §2.1, every field quoted, BOM, `DD-MM-YYYY` dates. Filename `daily-mitram-expense_<IST date>.csv`, built by the page as for DAR. Export cap 20000 reports. |
| GET | `/orgs/:slug/admin/daily-mitram-expenses/:id` | One report with its items and the staff name. |

That's **9 endpoints**.

**Save rules and validation.** Backend (Zod plus service checks) and the form enforce the same
rules (AGENTS.md):

| Field | Rule |
|---|---|
| `report_date` | required; a real `YYYY-MM-DD`; **any past or future date**, editable (same as DAR, user 2026-09-30); the form prefills IST today |
| `master_partner_center_id` | required; must be an **active** center of this org (service check → 422 on `master_partner_center_id`). Only the id is stored. Any center code / name the client sends is ignored; they are always read from the master |
| Center Name (UI) | read-only; fills in when a Center Code is chosen; never submitted |
| `items` | an array; **at least 1** item (422 "Add at least one item."); **at most 50** (Q5). The form drops entirely blank rows before sending (prototype rule), so the API only sees real rows |
| `items[i].master_partner_material_and_expense_head_id` | required; an **active** head of this org |
| `items[i].quantity` | required; a number **greater than 0 and less than 99999** (Q3: whether 99999 itself is allowed); **up to 3 decimal places** (Q3); a string like `"10.5"` or a number is accepted; exponent, sign, empty and 0 are rejected |
| `items[i].master_partner_quantity_unit_id` | required; an **active** unit of this org |
| `items[i].comment` | optional; trimmed; max **150** characters; blank → NULL |
| list `from` / `to`, `q`, `limit`, `staff_id`, `master_partner_center_id` | as for DAR: `from` ≤ `to` (page message, `noValidate`); `q` ≤ 150; `limit` 1..100, default 10; ids are positive integers |

Error reporting:
- Zod item errors come back as `items.<i>.<field>` in `details.fieldErrors`, so the form marks
  the exact cell.
- "Not an active master row" errors use the same key shape.

**Editing a report whose master row was later deactivated (Q4).** Recommendation: the edit form
still shows the saved choice, labelled "(inactive)", so an old report can be re-saved unchanged.
The server allows an **inactive** id **only if it is already on this report** (center on the
header, or material / unit on the report's current items). Any new choice must be active.

### 2.5 Frontend

**Staff pages** (under the requested `staff/reports/`, Sunai-only via `layout.tsx` →
`notFound()`):

| URL | File | What |
|---|---|---|
| `/{slug}/staff/reports/daily-mitram-expense` | `…/daily-mitram-expense/page.tsx` | My reports: filters (Search "Center Name / Item", **Center Code** dropdown, Date From, Date To), count, table (S.No, Date, Center Name, Center Code, Items summary, 👁 / ✏), pagination, **Add Expense** |
| `/{slug}/staff/reports/daily-mitram-expense/new` | `…/new/page.tsx` | Add form |
| `/{slug}/staff/reports/daily-mitram-expense/[id]` | `…/[id]/page.tsx` | Read-only view: header + items table; Back and Edit |
| `/{slug}/staff/reports/daily-mitram-expense/[id]/edit` | `…/[id]/edit/page.tsx` | Edit form, prefilled |

**Form** (`components/partner/daily-mitram-expense/DailyMitramExpenseForm.tsx`):
- **Header:** Date (prefilled today) / Center Code (select, showing the **code**) / Center Name
  (read-only, filled from the chosen center).
- **"Item wise entry":** a table of rows (Material select, Quantity number input, Quantity Unit
  select, Comment input with a live `n/150` counter, and a remove ✕).
  - The form opens with **one empty row**.
  - **Add Item** appends a row.
  - The ✕ is hidden when only one row is left (prototype).
  - Unit options show "Kilogram (kg)".
- **Errors** show inline under each cell: `items.<i>.<field>` from the API, or the page's own
  mirror check.
- If a master list is **empty** (e.g. no centers yet), the form shows "No active centers — ask
  your admin to add them in Master → Center Name." and Save stays disabled for that field.

**Admin pages** (inside the existing Sunai-only `admin/reports/` layout):

| URL | File | What |
|---|---|---|
| `/{slug}/admin/reports/daily-mitram-expense` | `…/daily-mitram-expense/page.tsx` | All reports: filters (Staff, Search, Date From, Date To) in the URL; count; table (S.No, Staff, Date, Center Name, Center Code, Items, 👁); pagination; **Download CSV** |
| `/{slug}/admin/reports/daily-mitram-expense/[id]` | `…/[id]/page.tsx` | Read-only view with "Staff: <name>" and the items table; Back keeps the filters |

**Reused:** the DAR filter card is not a perfect fit (it has no Center Code filter). It gains an
optional `centerOptions` prop, which adds only a dropdown and is **backward compatible**: DAR
passes nothing and renders exactly as today. Also reused: `surveyUi` table/pager helpers, the
`?back=` pattern, the keyed-result loading, and `dmy()` / `istToday()`.

**Items summary** (list and admin table): `Material qty unit_short`, joined with ", ", e.g.
"Rice 10 kg, Dal 3 kg". Clamped to 2 lines; the view page shows everything. Quantities are shown
without trailing zeros (`10.500` → `10.5`).

**Translation:** all UI text is wrapped in `t()`. The data (master names, comments) and the CSV
headers are not. No label SQL.

### 2.6 Docs to update in the same change

- `docs/frontend/partner-portal.md`: the staff Reports row and the admin Reports row, plus 6
  "All pages" rows. 218 → 224 pages.
- `docs/api/endpoints.md`: 9 rows. 919 → 928; partner 409 → 418.
- `docs/api/api-structure.md`: the new router mount and the `requireSunaiOrg` mounts.
- On ship: §3 → `TEST_CASES.md`; status → shipped.

### 2.7 Risk / impact

- The change is mostly new code:
  - 2 tables;
  - a new module plus 1 mount line;
  - one more line in the existing Sunai-only block of `buildReportsMenu`;
  - one more leaf in the existing Sunai-only admin Reports dropdown;
  - 6 pages;
  - an optional prop on `DarFilterCard`.
- The masters and the Daily Activity Report behave exactly as before.
- **Deploy order:** SQL first, then the API. The form is only useful once the Sunai admin has
  added at least one active center, head and unit.

### 2.8 Open questions (answers go in §4)

_All resolved 2026-09-30 (Q2: no copies; the rest as recommended). See §4._

1. **Same rules as the Daily Activity Report.** Recommendation: yes, same as DAR, which you
   already decided for that report:
   - each person sees and edits only their own reports;
   - edit at any time, no delete;
   - several reports per day are allowed;
   - the admin tab is read-only;
   - the Staff filter lists only people who have submitted;
   - 10 rows per page.
2. **Keep a copy of the names on each report.** The report keeps the chosen master **ids**. Should
   it also keep the center code/name, material name and unit name **as they were when saved**?
   Recommendation: **yes**. Then renaming or deactivating a master later doesn't change old
   reports or old CSVs.
   **Resolved 2026-09-30: no copies.** Reports show what the master says now (§4).

3. **Quantity limits.** "More than 0, less than 99999":
   - (a) Is **99999 itself allowed**? Recommendation: no, taking "less than" literally, so the
     maximum is 99998.999.
   - (b) How many **decimal places**? Recommendation: up to **3** (e.g. 0.250 kg).
4. **Inactive master on an old report.** Recommendation: when editing, the report's own saved
   (now inactive) center / material / unit stays selectable, marked "(inactive)"; new choices
   are active only (§2.4).
5. **Maximum items per report.** Recommendation: **50**.
6. **Search on the staff page.** The prototype's search covers "Center Name / Item".
   Recommendation: match the center name, material names and comments; the Center Code has its
   own dropdown filter.
7. **Unit in the list and the CSV.** Recommendation: show the **short code** ("kg") in the list's
   Items summary, and the **unit name** ("Kilogram") in the CSV's Quantity Unit column. The
   alternative is the short code in both.
8. **Admin menu label.** The admin prototype says "Daily Mitram **Expenses**" and every page title
   says "Daily Mitram **Expense**". Recommendation: use **"Daily Mitram Expense"** everywhere.
9. **The existing greyed "Mitram Daily Reports" menu item** (a legacy placeholder at the top level
   of Reports and Tracking, for every org). Recommendation: **leave it**; it isn't this report.
   The alternative is to hide it for Sunai.

## 3. Test cases (designed up front)

"Staff" means an approved Sunai staff member. The pre-condition for the form cases is at least
one active center, head and unit. The 404 cases apply to the page (not-found) and the API.

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-DME-01 | Staff menu entry | Sunai staff with Reports and Tracking | Open Daily Reports | Team Daily Report, Daily Activity Report, **Daily Mitram Expense**; it opens the list | H |
| TC-DME-02 | Not in other orgs' menus | Staff of another org | Open Daily Reports | No Daily Mitram Expense | H |
| TC-DME-03 | Admin Reports leaf | Sunai PA | Open the Reports dropdown | Daily Activity Report, then Daily Mitram Expense | H |
| TC-DME-04 | Admin leaf absent elsewhere | PA of another org | Admin nav | No Reports dropdown | M |
| TC-DME-05 | Access roles | SA; Sunai PA; Sunai staff | Open the staff list, add a report | All three can; each sees only their own | H |
| TC-DME-06 | Other org is not-found | Any user, including SA | Open both page URLs on `<Other>`; call the list, options and admin APIs | Not-found page; API 404 | H |
| TC-DME-07 | Logged out | No session | Call the staff list / options / admin list | 401 | H |
| TC-DME-08 | Staff blocked from admin | Sunai staff | Admin list / export / staff-options / `:id` | 403 | H |
| TC-DME-09 | Other org's users blocked | PA / staff of org X | Sunai staff and admin APIs | 403 | H |
| TC-DME-10 | Options = active masters only | Masters with active and inactive rows | GET options; open Add Expense | Only active centers / heads / units, sorted; the dropdowns match | H |
| TC-DME-11 | Empty master | No active centers | Open Add Expense | The "No active centers…" message; can't save | M |
| TC-DME-12 | Add a report | Staff | Date (today), Center 16, two items (Rice 10 kg; Dal 3.5 kg "Arhar") → Save | Saved; on the list: date DD-MM-YYYY, Center Name, Code 16, Items "Rice 10 kg, Dal 3.5 kg" | H |
| TC-DME-13 | Date defaults to today | Staff | Open Add Expense | Date = IST today, editable | H |
| TC-DME-14 | Past / future date | Staff | Save with last month, then next month; edit the date | All saved | M |
| TC-DME-15 | Center Name auto-fills | Add form | Choose a Center Code; change it | Center Name shows the matching name, read-only, and follows the change | H |
| TC-DME-16 | Center required | Add form | No center → Save | Inline "Center Code is required."; API 422 on `master_partner_center_id` | H |
| TC-DME-17 | Inactive / foreign center | API | POST with an inactive center id, and another org's center id | 422 on `master_partner_center_id` | H |
| TC-DME-18 | Center name/code always from the master | API | POST with `master_partner_center_id` of center 16 plus bogus center name / code keys | Saved; the report shows center 16's master name and code; the bogus keys are ignored | H |
| TC-DME-19 | At least one item | Add form | Leave the only row blank → Save; API with `items: []` | "Add at least one item."; API 422 | H |
| TC-DME-20 | Blank extra rows ignored | Add form | One full row plus two fully blank rows → Save | Saved with 1 item | M |
| TC-DME-21 | Partly filled row | Add form | A row with Material only (no quantity, no unit) | Inline errors on that row's Quantity and Unit; nothing saved | H |
| TC-DME-22 | Material / unit required, active, own org | API | Item with no material; an inactive head id; another org's unit id | 422 on `items.<i>.master_partner_material_and_expense_head_id` / `master_partner_quantity_unit_id` | H |
| TC-DME-23 | Quantity > 0 | Add form / API | 0, -1, empty | Inline error; API 422 on `items.<i>.quantity` | H |
| TC-DME-24 | Quantity upper limit | Add form / API | 99998.999, 99999, 100000 | 99998.999 saved; 99999 and 100000 rejected (per Q3) | H |
| TC-DME-25 | Quantity decimals | Add form / API | 0.25, 1.125, 1.1234, "1e3", "abc" | 0.25 and 1.125 saved (read back unchanged); 1.1234, 1e3 and abc → 422 | M |
| TC-DME-26 | Comment max 150 | Add form / API | 150 characters, then 151 | 150 saved; the input stops at 150 with a `n/150` counter; 151 via the API → 422 | M |
| TC-DME-27 | Max items | API | 50 items, then 51 | 50 saved; 51 → 422 | L |
| TC-DME-28 | Add / remove rows | Add form | Add Item ×2, then remove the middle row | Rows add and remove; ✕ hidden with one row left; the saved order matches the screen | M |
| TC-DME-29 | View page | Own report | 👁 | Header fields plus the items table in order, comments in full; Back / Edit | H |
| TC-DME-30 | Edit report and items | Own report with 2 items | Change the center, edit item 1, remove item 2, add a new item → Save | Header updated; items replaced exactly; header `created_*` unchanged | H |
| TC-DME-31 | Edit keeps an inactive saved choice | Report whose head was later deactivated | Open Edit → Save unchanged | The head shows "(inactive)"; save succeeds. Choosing a different inactive head is rejected | M |
| TC-DME-32 | Reports follow master renames | Report saved with head "Oil" and center 16 | Rename the head to "Mustard Oil" and change the center's name / code in Master; reopen the report, the list and the CSV | They show the **current** master values ("Mustard Oil", new center name / code) (user 2026-09-30, Q2) | M |
| TC-DME-33 | Can't read / edit another's report | Staff A; B's report id | GET / PUT `:id`; open the pages | 404 / not found; B's report unchanged | H |
| TC-DME-34 | No delete | Any report | Check the actions; DELETE `:id` | No control; 404 | M |
| TC-DME-35 | Body can't set owner / org | API | POST with `created_by`, `partner_id` | Saved under the caller and Sunai | H |
| TC-DME-36 | Save is atomic | API | Items where item 2 is invalid | Nothing saved (no header without items); 422 | H |
| TC-DME-37 | Staff filters | Several reports | Search by center name, item name, comment; Center Code dropdown; date range; Clear | Correct rows; Clear resets | M |
| TC-DME-38 | Date range order | Staff / admin | From > To | The page's own message; API 422 | M |
| TC-DME-39 | Staff pagination | 11+ reports | Page 2 | 10 per page | M |
| TC-DME-40 | Admin list | Reports by 2+ staff | PA opens the admin list | Every report; Staff column; sorted date desc, then staff | H |
| TC-DME-41 | Admin staff filter | — | Staff dropdown; choose one | Only submitters listed; the filter works; filters in the URL | H |
| TC-DME-42 | Admin search | — | By staff name, center code, item name | Matching reports | M |
| TC-DME-43 | Admin view | — | 👁 | "Staff: <name>", header, items; no Edit; Back keeps the filters | H |
| TC-DME-44 | CSV one row per item | A filtered set with a 2-item and a 1-item report | Download CSV | 3 data rows; both rows of the 2-item report share its S.No; filename `daily-mitram-expense_<today>.csv` | H |
| TC-DME-45 | CSV headers and format | — | Open the CSV | Exactly `S.No, Staff, Date, Center Code, Center Name, Material, Quantity, Quantity Unit, Comment`; DD-MM-YYYY; BOM; units per Q7 | H |
| TC-DME-46 | CSV tricky text | A comment with `a, b; "c"` and a newline | Open the CSV | The values stay in their own columns | H |
| TC-DME-47 | Numbers and dates round-trip | Staff | Quantity 12.5, Date 01-09-2026 | Read back 12.5 and 01-09-2026 exactly | H |
| TC-DME-48 | Translation wrapped | i18n on; some Hindi labels entered | Switch to हिं | Those labels in Hindi; the data and CSV headers unchanged | L |

## 4. Sign-off

- 2026-09-30: plan drafted; the §2.8 questions are waiting for the user.
- 2026-09-30, user: "some improvements i would like to add in the table / for columns that refer
  to another table columns ex center_id … center_code … center_name / their names format should
  be {table_name}_id {table_name}_name etc based on this format so it is easy to know or find
  out that a column referes to another table and also which table".
  - Applied to both tables in §2.3, and to the API / validation / test text:
    - `center_id` / `_code` / `_name` → `master_partner_center_id` / `_code` / `_name`;
    - `expense_id` → `partner_staff_daily_mitram_expense_id`;
    - `material_id` / `material_name` → `master_partner_material_and_expense_head_id` / `_name`;
    - `unit_id` / `unit_name` / `unit_short_name` → `master_partner_quantity_unit_id` / `_name` /
      `_short_name`.
  - The API keys use the same names.
  - **Open:** should `partner_id` (→ `partners_id`) and `created_by` / `updated_by` (→ `users_id`)
    follow the rule too? They were kept, because every existing table and the gates use them.
    Should the rule also go into AGENTS.md "Database conventions" for future tables?
- 2026-09-30, user: "they stay / yes add rule".
  - `partner_id` and `created_by` / `updated_by` **stay** as they are.
  - The naming rule was added to AGENTS.md "Database conventions" for new tables and columns,
    with the standard columns listed as exceptions: `partner_id`, `community_id`, `user_id`,
    `created_by` / `updated_by` / `deleted_by`.
- 2026-09-30, user, asked why the copied `master_partner_center_code` / `_name` columns exist when
  the id is stored: "it should record what master says now and i think we need similar change in
  the items table".
  - **Q2 is resolved the other way:** the recommendation was to keep copies, so old reports stay
    as they were; the decision is **no copies**. Built as asked.
  - Removed `master_partner_center_code` and `master_partner_center_name` from the header table.
  - Removed `master_partner_material_and_expense_head_name`, `master_partner_quantity_unit_name`
    and `master_partner_quantity_unit_short_name` from `partner_staff_expense_item`.
  - Everything is looked up by id (§2.3).
  - TC-DME-18 and TC-DME-32 were updated (renames now show on old reports).
- 2026-09-30, user: "all as recommended" for the remaining §2.8 questions:
  1. Same rules as DAR: own reports only; edit any time; no delete; several per day; admin
     read-only; Staff filter lists submitters only; 10 per page.
  3. Quantity: 99999 itself is **not** allowed (the maximum is 99998.999), and up to **3**
     decimal places. TC-DME-24 expects 99999 → rejected.
  4. A saved inactive center / material / unit stays selectable on edit, marked "(inactive)";
     new choices must be active.
  5. Maximum **50** items per report.
  6. Staff search matches the center name, material names and item comments. Center Code has
     its own filter.
  7. Unit: the short code in the list's Items summary, the unit **name** in the CSV's Quantity
     Unit column.
  8. Admin menu label: "Daily Mitram Expense" (singular) everywhere.
  9. The greyed legacy "Mitram Daily Reports" placeholder is left unchanged.

  Status → in-progress (user: "start implementation").

## 5. Execution log

- 2026-09-30: implementation (uncommitted). A system crash interrupted the work after the
  migration and the Prisma models were written; the work resumed from there.
  - **DB:**
    - `apps/api/prisma/sql/2026-09-30-partner-staff-daily-mitram-expense.sql`: 2 tables, ids
      only (no copied names), reference columns named `{table_name}_id`, `comment` TEXT, no
      timestamp defaults;
    - `model partner_staff_daily_mitram_expense` and `model partner_staff_expense_item` in
      `schema.prisma`;
    - `prisma validate` / `generate` passed;
    - **not yet run by the user.**
  - **API:**
    - `daily-mitram-expense.{schema,service,controller,routes}.ts`, mounted with
      `router.use(dailyMitramExpenseRouter)`;
    - 9 endpoints: staff `options`, list, create, get, update (`requireOrgMember`, own rows);
      admin list, staff-options, export, get (`requireOrgAccess`); all behind
      `requireSunaiOrg`;
    - a module-local `validateExpenseBody` keeps full error paths (`items.0.quantity`), because
      the shared `validate()` flattens them to `items`;
    - the service checks every center / material / unit id against THIS org's master (active,
      or already on the report when editing, Q4) → 422 per cell;
    - create and edit are single transactions; edit replaces the items;
    - lists use a parameterised raw id query (joins for search and the staff-name sort; LIKE
      wildcards escaped), then hydrate the master names by id, whatever the master's status;
    - CSV: one row per item; S.No per report; the unit **name**; every field quoted; BOM.
    - `reports-menu.service.ts`: "Daily Mitram Expense" is added after Daily Activity Report
      in the Sunai-only Daily Reports block.
  - **Frontend:**
    - `lib/partner-daily-mitram-expense.ts`: API client, validation mirror, blank-row drop, API
      error index remap, items summary, CSV download;
    - `components/partner/daily-mitram-expense/{DailyMitramExpenseForm,DailyMitramExpenseDetails}.tsx`;
    - staff `staff/reports/daily-mitram-expense/{layout,page,new,[id],[id]/edit}`;
    - admin `admin/reports/daily-mitram-expense/{page,[id]}` (inside the existing Sunai-only
      `admin/reports/layout.tsx`);
    - `DarFilterCard` gained **optional** `centerOptions` / `searchLabel` props (generic over the
      filter type); DAR passes neither and renders as before;
    - `PartnerOrgNav.tsx`: a second leaf in the Sunai-only Reports dropdown;
    - all UI text is wrapped in `t()`.
  - **Checks:**
    - API and frontend `tsc` clean; eslint on the new and changed frontend files clean.
    - The PM2 servers were stopped by the crash and were started again.
    - Gate probes: Sunai staff list / options / admin list without a session → 401
      (TC-DME-07); pratham staff and admin → 404 (TC-DME-06, API half).
    - The staff and admin pages return 200, and the pre-existing `staff/reports/global` still
      loads (the Next.js cache wasn't corrupted this time).
  - **Docs:**
    - `docs/frontend/partner-portal.md`: staff and admin rows, 6 All-pages rows, 218 → 224
      pages;
    - `docs/api/endpoints.md`: 9 rows, 919 → 928, partner 409 → 418;
    - `docs/api/api-structure.md`: partner module row and the `requireSunaiOrg` mounts.
- 2026-09-30: the user ran `2026-09-30-partner-staff-daily-mitram-expense.sql` locally. Live
  verification:
  - **Setup:**
    - test masters created directly: 3 Sunai centers (2 active, 1 inactive), 3 heads (1
      inactive), 2 units, plus a pratham center and unit, all prefixed `ZZDME`;
    - locally signed JWTs for SA (1), PA (111454), staff 124 / 126, Office Staff 208, pratham
      PA 3556 and pratham staff 3557;
    - an API script (95 checks) plus headless Chromium (29 checks).
  - **Access:**
    - TC-DME-05 PASS: SA / PA / staff list and create, own reports only.
    - TC-DME-06 PASS: pratham → API 404 for SA (list, options, admin, export, staff-options),
      and not-found pages.
    - TC-DME-07 PASS: 401 with no session.
    - TC-DME-08 PASS: staff → 403 on admin list / export / staff-options / `:id`.
    - TC-DME-09 PASS: pratham PA and staff → 403.
  - **Menus:**
    - TC-DME-01 PASS: Office Staff 208 sees Daily Reports = [Team Daily Report, Daily Activity
      Report, Daily Mitram Expense].
    - TC-DME-02 PASS: pratham staff doesn't see it.
    - TC-DME-03 PASS: admin Reports has both leaves.
    - TC-DME-04 PASS: pratham admin has no Reports leaf.
  - **Options and the form:**
    - TC-DME-10 PASS: options return active, own-org masters only, sorted; the inactive center
      isn't offered in the form.
    - TC-DME-12 PASS: two-item create reads back (names and codes looked up, quantities `10`
      and `3.5`); in the UI a fully blank third row is ignored and the summary reads
      "ZZDME Rice 10 zkg, ZZDME Dal 3.5 zL". My UI assertion expected center code 91091, but an
      earlier rename test had changed it to 91092; the data was correct.
    - TC-DME-13 PASS: Date prefilled with IST today.
    - TC-DME-14 PASS: past and future dates.
    - TC-DME-15 PASS: Center Name auto-fills and follows the change.
    - TC-DME-16 PASS: missing center → 422.
    - TC-DME-17 PASS: inactive or other-org center → 422 on `master_partner_center_id`.
    - TC-DME-18 PASS: bogus center name / code in the body are ignored; the master's values are
      shown.
    - TC-DME-19 PASS: `items: []` or missing → 422; the UI shows "Add at least one item.".
    - TC-DME-21 PASS: a partial row gives errors keyed `items.0.*`, and inline in the UI.
    - TC-DME-22 PASS: an inactive head → `items.1.…head_id`; an other-org unit → 422.
  - **Quantity and comment:**
    - TC-DME-23 PASS: 0, -1, empty, 0.000 → 422.
    - TC-DME-24 PASS: 99998.999 is saved; 99999 and 100000 are rejected (also inline).
    - TC-DME-25 PASS: 0.25 and 1.125 read back exactly; 1.1234, 1e3 and abc → 422 (the UI shows
      the ">3 decimals" message); " 5" is trimmed and accepted.
    - TC-DME-26 PASS: 150 characters saved; 151 → 422; the input stops at 150 with a 150/150
      counter.
    - TC-DME-27 PASS: 50 items saved; 51 → 422.
    - TC-DME-28 PASS: order is kept; Add Item / ✕ work; no ✕ with one row.
  - **View and edit:**
    - TC-DME-29 PASS: view page.
    - TC-DME-30 PASS: edit changes the center and date and replaces the items (API); UI edit
      prefilled, a row removed, saved.
    - TC-DME-31 PASS: after the head was deactivated, the report still names it and re-saving
      with it succeeds; a different inactive head is rejected; a new report can't use it.
    - TC-DME-32 PASS: renaming the head and the center name / code in the masters shows on the
      old report.
    - TC-DME-33 PASS: another staff member's id → 404 on GET and PUT; their report unchanged.
    - TC-DME-34 PASS: no DELETE.
    - TC-DME-35 PASS: `created_by` / `partner_id` in the body are ignored.
    - TC-DME-36 PASS: an invalid item means nothing is saved.
  - **Staff filters:**
    - TC-DME-37 PASS: search by center name, material name and comment; center filter; date
      range; UI search plus the center filter.
    - TC-DME-38 PASS: from > to → 422.
    - TC-DME-39 PASS: 10 per page, sorted date desc.
  - **Admin:**
    - TC-DME-40 PASS: all staff; sorted date desc, then staff name; admin columns; no Center Code
      filter.
    - TC-DME-41 PASS: staff options = submitters only; staff filter; filters in the URL.
    - TC-DME-42 PASS: search by staff name, center code and item name; `%` matched literally.
    - TC-DME-43 PASS: admin view shows "Staff: <name>", header and items, and no Edit; no admin
      PUT; Back keeps the filters. The first UI text check picked up the nav's "Staff Dashboard";
      confirmed by screenshot.
  - **CSV and round-trips:**
    - TC-DME-44 PASS: one row per item — 3 rows for a 2-item plus a 1-item report, with the
      2-item report's rows sharing S.No 2. My first assertion assumed that report would come
      first; the data was correct. Empty result → header only; UI filename
      `daily-mitram-expense_<IST today>.csv`, filtered.
    - TC-DME-45 PASS: exact headers, BOM, DD-MM-YYYY, the unit **name** in Quantity Unit.
    - TC-DME-46 PASS: a comment with `a, b; "c"` and a newline stays in its own column.
    - TC-DME-47 PASS: 12.5, 99998.999 and 2026-09-01 read back exactly.
  - **Not run:**
    - TC-DME-11 (empty-master warning) — it would have meant deactivating the user's own
      masters;
    - TC-DME-48 (needs Hindi labels).
  - **Cleanup:** 17 test reports, their 69 items and all 10 `ZZDME` masters were deleted. The
    user's existing report (id 1, 2 items, center id 10) was untouched.
  - **Noted:** Sunai's only center (id 10, code 99999) is inactive, so the Add Expense form
    currently offers no center. It was deactivated by user 1 (SA) at 07:51 UTC, not by the
    tests, which ran as PA 111454.

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- SRS row: n/a
- TEST_CASES: TC-DME-01..48 (promote on ship)
- Page maps / API docs to update: `docs/frontend/partner-portal.md`, `docs/api/endpoints.md`,
  `docs/api/api-structure.md`
- Migration: `apps/api/prisma/sql/2026-09-30-partner-staff-daily-mitram-expense.sql` (user runs
  it)
- Related:
  - `2026-09-30-daily-activity-report.md` (the pattern this follows);
  - `2026-09-29-partner-sunai-masters.md` (the Center / Material and Expense Head / Quantity Unit
    masters these dropdowns read, with their 2026-09-30 validation limits);
  - `reports-menu.service.ts` (staff menu).
- Prototypes: `~/Downloads/Niwasi/niwasi-app/partner/daily-mitram-expense.html` (engine
  `daily-reports.js`, `items: true`), `admin-daily-mitram-expense.html` (engine
  `admin-reports.js`)
