# Partner Masters — Material and Expense Head, Center Name, Quantity Unit (Sunai-only)

| Field | Value |
|---|---|
| Status | shipped |
| Started | 2026-09-29 |
| Shipped | 2026-09-29 |
| SRS row | — (no `docs/requirement/SRS.md` in this repo yet) |
| Test cases | TC-PSM-01..35. Promoted to `docs/testing/TEST_CASES.md` |
| Prototype todo | — |

## 1. Requirement (as given)

> we need to add 3 new master tables in the partner portal
> they will be added here
> /home/triline27/myproject/sunai_niwasi/apps/frontend/app/(partner)/partner/(dash)/[slug]/admin/masters/
> Material and Expense Head
> Center Name
> Quantity Unit
> their names in the ui
> in the db their names will be
> master_partner_material_and_expense_head
> (min columns: id,name,status)
> master_partner_center
> (min columns: id,name,code (int, unique(table unique and partner id unique) unsigned),status)
> master_partner_quantity_unit
> (min columns: id,name,short_name(example name = killogram, short_name = kg),status)
> (correct the spellings if wrong)
> these are the minimam columns that are required in those tables you should also refrence already existing table `master_activity_categories`
> for the actual schema
>
> right now these masters will only be visible and managable by the superadmin and the sunai partner admin only
> file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/material-expense-head-master.html
> file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/center-name-master.html
> file:///home/triline27/Downloads/Niwasi/niwasi-app/partner/quantity-unit.html
> these are the prototype of each page
> now make a plan for this feature

(user, 2026-09-29)

**Spellings.** The table names are correct as given and are used unchanged (singular, like the
user wrote them; the older `master_activity_categories` is plural, but the user named these).
"killogram" → **Kilogram**, "minimam" → minimum, "refrence" → reference. The prototype's
"Material and Expense Head" and "Center Name" labels are kept exactly. "Center" (US spelling)
is kept as well, because the prototype and the table name both use it.

## 2. Plan

### 2.1 What the prototypes show

All three pages are the same shared prototype engine (`partner/daily-reports.js` with a
`DR_CONFIG`), in its `modal` + `noDelete` + `noView` mode:

| Page | Heading / Add button | List columns | Add/Edit modal fields | Prototype uniqueness |
|---|---|---|---|---|
| Material and Expense Head | "Material and Expense Head" / "Add Head" | S.No, Name, Status, Actions | Name* ; Status* (edit only, default Active) | none |
| Center Name | "Center Name" / "Add Center" | S.No, Center Name, Center Code, Status, Actions | Center Name* ; Center Code* (unique) ; Status* (edit only) | code |
| Quantity Unit | "Quantity Unit" / "Add Quantity Unit" | S.No, Unit Name, Short Code, Status, Actions | Unit Name* (unique) ; Short Code* ; Status* (edit only) | name |

Also shared across the three pages:
- **Filter card:** a search box, a Status `<select>` (All / Active / Inactive), and Search +
  Clear buttons.
- **Record count and pagination.**
- **Actions:** Edit only. There is no delete and no view page.
- **CSV export:** none. The engine has a CSV function, but these pages don't render its button.
- **Menu:** in the prototype's partner nav, under **Master** after "Call Status", in this order:
  Material and Expense Head, Center Name, Quantity Unit.

Seed data in the prototypes is example data only:
- Units: Kilogram/kg, Gram/g, Litre/L, Millilitre/ml.
- Centers: "Mitram Rasoi Ballia" with code 16.
- Heads: Rice, Dal, Gas Cylinder, Transport and more. These seed rows carry a
  `type: Material|Expense`, but the form has no such field (Q4).

These masters are what the prototype's Sunai daily reports select from: the "Item wise entry"
rows pick a Material and a Quantity Unit. Those daily reports are **out of scope** here; this
feature only builds the masters. The data shape is chosen so the reports can reference these
rows by `id` later.

### 2.2 Database — three new tables (dated migration, run by the user)

The shape follows `master_activity_categories`:
- `partner_id`;
- `status` Int, 1 = active / 0 = inactive;
- `created_by` / `updated_by` NOT NULL unsigned;
- nullable `created_at` / `updated_at` Timestamp(0), with **no DB default**. The application
  sets them (user 2026-09-29; see "Timestamps" below).

The user's minimum columns are added to that. One deliberate difference: `project_id` is left
out, because these masters aren't tied to a project. There are no FK constraints (AGENTS.md);
indexes are used instead.

File: `apps/api/prisma/sql/2026-09-29-partner-sunai-masters.sql`

```sql
CREATE TABLE master_partner_material_and_expense_head (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  partner_id  INT UNSIGNED NOT NULL,
  name        VARCHAR(255) NOT NULL,
  status      INT NOT NULL DEFAULT 1,
  created_by  INT UNSIGNED NOT NULL,
  updated_by  INT UNSIGNED NOT NULL,
  created_at  TIMESTAMP NULL DEFAULT NULL,
  updated_at  TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY mpmeh_partner_status_idx (partner_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE master_partner_center (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  partner_id  INT UNSIGNED NOT NULL,
  name        VARCHAR(255) NOT NULL,
  code        INT UNSIGNED NOT NULL,
  status      INT NOT NULL DEFAULT 1,
  created_by  INT UNSIGNED NOT NULL,
  updated_by  INT UNSIGNED NOT NULL,
  created_at  TIMESTAMP NULL DEFAULT NULL,
  updated_at  TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY mpc_partner_code_uq (partner_id, code),
  KEY mpc_partner_status_idx (partner_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE master_partner_quantity_unit (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  partner_id  INT UNSIGNED NOT NULL,
  name        VARCHAR(100) NOT NULL,
  short_name  VARCHAR(20)  NOT NULL,
  status      INT NOT NULL DEFAULT 1,
  created_by  INT UNSIGNED NOT NULL,
  updated_by  INT UNSIGNED NOT NULL,
  created_at  TIMESTAMP NULL DEFAULT NULL,
  updated_at  TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY mpqu_partner_status_idx (partner_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

- **`code` uniqueness.** "unique (table unique and partner id unique)" is read as a DB
  `UNIQUE (partner_id, code)`: one code per partner, and two different partners may both have
  code 16. Because the index is at DB level, it covers **inactive rows too**, so a deactivated
  center's code can't be reused. Q1 confirms both points.
- **`code` type.** `INT UNSIGNED`, so the range is 0..4294967295. Leading zeros are not stored:
  "016" is saved as 16. The API accepts 1..4294967295 (no 0, Q1). **Superseded 2026-09-30
  (§6):** the application now accepts 1..99999.
- **Other uniqueness** is done in the application: a name (and, for units, a short name) must be
  unique **among this partner's active rows**, case-insensitive. This matches the Activity
  Category and Designations masters and the prototype's checks (Q2). A DB unique index isn't
  used for names, because the existing masters let a deactivated name be reused.
- **Timestamps: application-level only** (user 2026-09-29, superseding the earlier
  `DEFAULT CURRENT_TIMESTAMP` decision). The columns have no DB default and no `ON UPDATE`. The
  API binds `new Date()` on every create (`created_at` + `updated_at`) and every update / status
  change (`updated_at` only), the same as every other master.

  The reason is the timezone hazard documented in `auth.service.ts` (forgot-password):
  - the DB `time_zone` is SYSTEM (IST);
  - the MariaDB adapter reads TIMESTAMP values back labelled as UTC;
  - so any value the DB fills in itself reads back in the app **5h30m off**, while app-bound
    `Date`s round-trip correctly.

  Keeping one source of truth avoids a mix of correct and skewed rows. Rows inserted by hand
  must set both columns themselves, or they are left NULL.
- **Prisma.** Three `model`s are added to `schema.prisma` to mirror the SQL. The client is
  regenerated by `npm run build`, never committed.

### 2.3 API — new module, Sunai-gated, no changes to existing masters

The large `partner.service.ts` / `partner.routes.ts` are **not** extended. The new code goes in a
self-contained module, the same way `order-placement.admin.*` was built, so it can't affect the
existing masters:

- `apps/api/src/modules/partner/partner-masters.sunai.schema.ts`: Zod schemas for the params,
  list query and bodies, one body schema per master.
- `apps/api/src/modules/partner/partner-masters.sunai.service.ts`: one small config per master:
  - the Prisma delegate;
  - the editable fields;
  - the unique-among-active fields;
  - the 404 wording.

  One shared set of functions runs all three: list / create / update / setStatus. The config is
  fixed in code and never built from request input.
- `apps/api/src/modules/partner/partner-masters.sunai.controller.ts`.
- `apps/api/src/modules/partner/partner-masters.sunai.routes.ts`: mounted in `partner.routes.ts`
  with one `router.use(partnerMastersSunaiRouter)` line.

**Gate** (per the requirement: System Admin + the Sunai Partner Admin only):
`router.use('/orgs/:slug/masters/<master>', requireSunaiOrg)` → `requirePartnerAuth` →
`validateParams` → `requireOrgAccess()` (no extra roles).
- Any other org's slug → **404**, System Admin included. This is the same pattern as
  Order Placement and Admin Orders.
- Sunai staff (Vendor Admin / Office Staff / Surveyor) → **403**. This is stricter than Activity
  Category, whose gate also admits those staff roles; that's intentional here.

**Endpoints.** Each of the three masters, `<m>` ∈ `material-expense-head` | `center` |
`quantity-unit`, gets four routes under `/api/v1/partner/orgs/:slug/masters/<m>`:

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/masters/<m>` | List: `?page&limit&search&status=active\|inactive\|all`. Search matches the name (plus code / short name where the master has one); newest first. Returns `{ items, total, page, limit }`. |
| POST | `/orgs/:slug/masters/<m>` | Create. Status is always 1; `partner_id` comes from the slug, never the body. |
| PUT | `/orgs/:slug/masters/<m>/:id` | Edit the fields (not status). |
| PATCH | `/orgs/:slug/masters/<m>/:id/status` | Activate / Deactivate (`{ active: boolean }`, the existing `MasterStatusSchema`). |

That's **12 endpoints**. There's **no DELETE**, because the prototype has `noDelete`.

**Behaviour:**
- Every query is scoped to the slug-resolved `partnerId`. An id from another org, or one that
  doesn't exist → 404.
- `created_by` / `updated_by` are the caller's `users.id`. Timestamps are bound as JS
  `new Date()`, the same timezone-safe convention as the other masters.
- Edit doesn't re-stamp `created_*`.
- Names are trimmed and whitespace is collapsed. The first letter is capitalised with `ucfirst`,
  as the Activity master does. `short_name` is only trimmed, so "kg" and "ml" stay lowercase
  (Q3).
- **Uniqueness conflicts return 409:**
  - `NAME_TAKEN` for a name clash (all three masters);
  - `SHORT_NAME_TAKEN` for units;
  - `CODE_TAKEN` for centers. This is the app-level check, backed by the DB unique: a
    concurrent Prisma `P2002` is also mapped to 409.
- **Reactivating** a row re-runs the active-name checks. Otherwise switching an old row back on
  could create a duplicate active name, which is a gap the Activity toggle has. If the check
  fails, the result is 409 and the row stays inactive.
- Error shape is `{ success:false, error:{ code, message, fields? } }`. Validation failures are
  422 via the existing `validate` middleware.

**Validation.** Backend (Zod) and frontend enforce the same rules (AGENTS.md sync rule):

| Field | Rule |
|---|---|
| name (all three) | required; trimmed length 1..100 for units, 1..255 for the others. **Superseded 2026-09-30 (§6):** Head name and Center name 1..100, Unit name 1..50 |
| code (center) | required; whole number 1..4294967295; digits only, no sign, decimal or exponent. **Superseded 2026-09-30 (§6):** 1..99999 |
| short_name (unit) | required; trimmed length 1..20 (kept unchanged on 2026-09-30, by the user's choice) |
| status (PATCH) | boolean |
| list `limit` | 1..100, default 20 |
| list `search` | max 150 characters |

### 2.4 Frontend — three pages + menu (Sunai-only)

New pages under `app/(partner)/partner/(dash)/[slug]/admin/masters/`:
- `material-expense-head/page.tsx` → `/{slug}/admin/masters/material-expense-head`
- `center/page.tsx` → `/{slug}/admin/masters/center`
- `quantity-unit/page.tsx` → `/{slug}/admin/masters/quantity-unit`

Plus:
- **One layout guard.** A route group `masters/(sunai)/layout.tsx` wraps just these three folders
  and calls `notFound()` for non-Sunai slugs, the same approach as `admin/orders/layout.tsx`.
  The route group adds no URL segment, and Activity Category is left outside it, untouched.
- **One shared list component.** `components/partner/masters/SunaiMasterListView.tsx` takes a
  per-page config: title, add-button label, columns, fields and API functions. That keeps the
  three pages identical in behaviour, like the prototype's single engine. The component copies
  the Activity Category page's look: breadcrumb, filter card, `ResultCount`, the table,
  `AdminPagination`, the `AdminModal` add/edit form, and inline field errors from
  `splitApiFieldErrors`.
- **Status handling** follows the existing partner masters, not the prototype's
  "Status select inside the Edit form":
  - `StatusFilterChips` (Active / Inactive / All, Active by default) in the filter card;
  - the `MasterStatusToggle` row action;
  - `StatusBadge`.

  This keeps all partner masters consistent (Q5).
- **Data client:** `lib/partner-sunai-masters.ts`, typed calls for the 12 endpoints plus the
  error-text mapping (409 codes → inline field messages).
- **Menu:** `PartnerOrgNav.tsx` "Master" dropdown. Only when `isSunaiSlug(slug)`, it appends the
  three leaves after "Master Activity", in prototype order: **Material and Expense Head**,
  **Center Name**, **Quantity Unit**. Other orgs see only "Master Activity", as today. The staff
  nav isn't touched, since staff have no access.
- **Center Code input:** `inputMode="numeric"`, digits only, the same 1..4294967295 check as the
  API. **Superseded 2026-09-30 (§6):** 1..99999, and `maxLength` is 5.
- **Translation** (AGENTS.md rule): every UI string — headings, labels, buttons, placeholders,
  headers, empty states, messages — is wrapped in `t()`. Master data values (names, codes, short
  names) are not. No `label_text` SQL is written; the team enters Hindi labels through the live
  Language admin.
- 20 rows per page, like Activity Category.

### 2.5 Docs to update in the same change (AGENTS.md)

- **`docs/frontend/partner-portal.md`:**
  - the 3 pages in the Masters feature section (Sunai-only);
  - 3 rows in "All pages";
  - the page count bumped.
- **`docs/api/endpoints.md`:** 12 rows under the partner mount, with guards
  `requireSunaiOrg`, `requirePartnerAuth`, `requireOrgAccess`, plus the file:line of each
  route. Totals bumped.
- **`docs/api/api-structure.md`:** the new `partner-masters.sunai.routes.ts` router mount in the
  modules-and-URLs table.
- **On ship:**
  - §3 rows copied to `docs/testing/TEST_CASES.md`;
  - this file's status set to shipped;
  - the doc updates recorded in §5.

### 2.6 Risk / impact

- The change adds new code only:
  - three new tables;
  - four new API files, plus one `router.use` line;
  - three new pages, one layout, one component and one lib file;
  - one conditional nav block.
- Activity Category, its routes and every other master are unchanged.
- **Deploy order:** the user runs the SQL first, then deploys the API. The API needs the tables
  to exist; until then these endpoints return 500, and no other endpoint is affected.
- Load is negligible: small, indexed, partner-scoped tables.

### 2.7 Open questions (answers go in §4)

_All resolved 2026-09-29, "all as recommended" (see §4)._

1. **Center code uniqueness:**
   - Unique per partner (Sunai and another org may both use 16), or across the whole table?
   - Should an **inactive** center's code block reuse? The recommendation is yes, which is the
     behaviour of the DB unique on `(partner_id, code)`.
   - Is 0 allowed? The recommendation is no, so codes start at 1.
2. **Name uniqueness:** unique among the partner's **active** rows, case-insensitive, for all
   three masters, and also Short Name for units. The prototype only enforced Unit Name and Center
   Code; this recommendation adds Head name, Center name and Short Name. OK?
3. **Capitalisation:** first letter of names capitalised (as Activity does), while Short Name is
   kept exactly as typed ("kg", "L", "ml"). OK?
4. **Material vs Expense:** the prototype's seed rows are tagged Material/Expense, but its form
   has no such field. Add a `type` column (Material | Expense) now, or leave it out as the form
   does? The recommendation is to leave it out until the daily reports need it.
5. **Status UI:** existing masters' chips + row Activate/Deactivate toggle (recommended, for
   consistency), or the prototype's Status dropdown inside the Edit modal?
6. **Seed data:** should the prototype's units (kg, g, L, ml…) be pre-filled for Sunai? The
   default is **no seeding**: the admin enters them in the UI.

## 3. Test cases (designed up front)

`<M>` means the case is run for each of the three masters. The 404 cases apply to the page URL
and to the API.

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-PSM-01 | Menu shows three new leaves for Sunai | Logged in as Sunai Partner Admin | Open the Master dropdown on `/Sunai/admin` | "Master Activity", then Material and Expense Head, Center Name, Quantity Unit, in that order; each opens its page | H |
| TC-PSM-02 | Menu hides leaves for other orgs | Partner Admin of a non-Sunai org | Open the Master dropdown | Only "Master Activity"; no new leaves | H |
| TC-PSM-03 | System Admin can manage on Sunai | Logged in as System Admin (users.id 1) | Open each `<M>` page under `/Sunai/admin/masters/…`, add, edit, toggle | All succeed | H |
| TC-PSM-04 | Non-Sunai org URL is 404 (page) | Any user, including System Admin | Visit `/<OtherOrg>/admin/masters/center` directly | Next.js 404 page | H |
| TC-PSM-05 | Non-Sunai org URL is 404 (API) | System Admin token | `GET /api/v1/partner/orgs/<OtherOrg>/masters/center` | 404 `NOT_FOUND` | H |
| TC-PSM-06 | Sunai staff blocked | Logged in as a Sunai staff member (Vendor Admin / Office Staff / Surveyor) | Visit a `<M>` page URL, and call its GET API | Page shows no access / is not in the menu; API 403 | H |
| TC-PSM-07 | Logged out blocked | No partner session | Call `GET …/masters/quantity-unit` | 401 | H |
| TC-PSM-08 | Other org's Partner Admin can't reach Sunai rows | Partner Admin of org X | `GET /api/v1/partner/orgs/Sunai/masters/center` | 403 (not this org's admin) | H |
| TC-PSM-09 | Empty list | No rows yet | Open a `<M>` page | "No result found."; count 0; Add button visible | M |
| TC-PSM-10 | Add Material and Expense Head | Sunai admin | Add Head → Name "rice" → Save | Row "Rice", Active; count +1; modal closes | H |
| TC-PSM-11 | Add Center | Sunai admin | Add Center → "Mitram Rasoi Ballia", code 16 → Save | Row shows name, code 16, Active | H |
| TC-PSM-12 | Add Quantity Unit keeps short name case | Sunai admin | Add → Unit Name "kilogram", Short Code "kg" → Save | Row "Kilogram" / "kg" (short name not capitalised) | H |
| TC-PSM-13 | Required fields | Add modal open, per `<M>` | Save with every field blank / only spaces | Inline "required" error under each field; nothing saved; API returns 422 with the same fields if called directly | H |
| TC-PSM-14 | Max length _(superseded 2026-09-30 by TC-PSM-36)_ | Add modal | Name of 256 characters (101 for unit name); unit short name of 21 | Inline max-length error; API 422 | M |
| TC-PSM-15 | Center code must be a whole number | Add Center | Enter `abc`, `-5`, `1.5`, `1e3`, `0`, `4294967296` | Each rejected inline; API 422 for each | H |
| TC-PSM-16 | Center code upper bound ok _(superseded 2026-09-30 by TC-PSM-37)_ | Add Center | Code `4294967295` | Saved | L |
| TC-PSM-17 | Center code leading zeros | Add Center | Code `016` | Saved and shown as 16 | L |
| TC-PSM-18 | Duplicate center code | Center with code 16 exists | Add another center with code 16 | Inline "code already exists" (409 `CODE_TAKEN`); not saved | H |
| TC-PSM-19 | Duplicate code blocked even when inactive | Center code 16 exists and is deactivated | Add a new center with code 16 | 409 `CODE_TAKEN` | M |
| TC-PSM-20 | Same code allowed in another org | Another org has a center row with code 16 (inserted directly) | Sunai adds code 16 | Saved (uniqueness is per partner) | M |
| TC-PSM-21 | Duplicate active name, case-insensitive | Active "Kilogram" exists | Add unit "KILOGRAM" | 409 `NAME_TAKEN`, inline on the name; not saved | H |
| TC-PSM-22 | Duplicate short name | Active unit with "kg" exists | Add unit "Kilo" / "KG" | 409 `SHORT_NAME_TAKEN`, inline on short code | M |
| TC-PSM-23 | Inactive name can be reused | Head "Oil" deactivated | Add head "Oil" | Saved as a new active row | M |
| TC-PSM-24 | Edit | Existing row, per `<M>` | ✏ → change fields → Save | Row updated; `created_at` / `created_by` unchanged, `updated_*` set | H |
| TC-PSM-25 | Edit to a clashing value | Two active units "Gram"/"g" and "Litre"/"L" | Edit Litre's name to "gram" | 409 inline; original values kept | M |
| TC-PSM-26 | Edit unchanged saves | Existing row | ✏ → Save without changes | Saved (no self-clash) | M |
| TC-PSM-27 | Deactivate / Activate | Active row | Toggle to inactive, then back | Status flips; row moves between the Active and Inactive filters | H |
| TC-PSM-28 | Reactivate blocked by a newer duplicate | "Oil" inactive; a new active "Oil" exists | Activate the old "Oil" | 409 `NAME_TAKEN`; old row stays inactive; message shown | M |
| TC-PSM-29 | No delete | Any row | Inspect the actions; call `DELETE …/masters/center/:id` | No delete button; API 404 (route doesn't exist) | M |
| TC-PSM-30 | Search and status filters | Mixed active/inactive rows | Search a partial name (and "kg" / "16" on unit / center); switch chips; Clear | Only matching rows; chips filter by status; Clear resets search and page | M |
| TC-PSM-31 | Pagination | 25+ rows | Go to page 2 | 20 per page; "Showing 21–25 of 25" | M |
| TC-PSM-32 | Id from another org or missing | Row id belonging to another partner / nonexistent | `PUT` and `PATCH …/status` with that id on the Sunai slug | 404; nothing changed | H |
| TC-PSM-33 | Body can't set partner or status | Sunai admin | POST with extra `partner_id: 5, status: 0` | Row saved under Sunai, active (extra keys ignored or rejected) | M |
| TC-PSM-35 | Timestamps set on create/edit | Sunai admin | Create a row, then edit it; check the DB | API sets both on create, and only `updated_at` on edit / toggle; the values match the real time (not 5h30m off); the columns have no DB default | L |
| TC-PSM-36 | Name length limits (2026-09-30) | Add / Edit modal, per master | Head Name 100 / 101 chars; Center Name 100 / 101; Unit Name 50 / 51; Short Code 20 / 21 | 100 / 100 / 50 / 20 saved; the inputs stop at those lengths; 101 / 101 / 51 / 21 sent to the API → 422 on that field | H |
| TC-PSM-37 | Center Code range 1–99999 (2026-09-30) | Add Center | Code 99999; 100000; 0 / 00000; `00016` | 99999 saved; 100000 and 0 → inline "Center Code must be between 1 and 99999." and API 422; the input stops at 5 digits; `00016` saved as 16 | H |
| TC-PSM-34 | Translation wrapped | `NEXT_PUBLIC_I18N_ENABLED` on; a Hindi `label_text` row added via the Language admin for "Center Name" | Switch to हिं | That label shows in Hindi; strings without a row stay English; master data values unchanged | L |

## 4. Sign-off

- 2026-09-29: plan drafted; open questions in §2.7 are waiting for the user.
- 2026-09-29, user: "i dont want the unit name unique". This was applied, then **withdrawn** by
  the user the same day ("can you undo the edit related to this"). All of that change was
  reverted: Unit Name stays unique among active rows, as in the original plan and prototype, and
  Q2 is open as first written.
- 2026-09-29, user: "why dont we keep the createdat and updatedat default current_timestamp".
  Adopted: `created_at` / `updated_at` are NOT NULL `DEFAULT CURRENT_TIMESTAMP` (`updated_at`
  also has `ON UPDATE CURRENT_TIMESTAMP`). The API still binds `new Date()` explicitly (the
  IST/UTC read-back skew, §2.2 "Timestamps"). Recommended as a safety net only; built as
  asked.
  **Superseded** the same day. User, before implementation: "i thing we should handel the
  timestamp of the updated at and created at from the application level only if the db can cause
  +5:30 inconsistency". The DB defaults were dropped: the columns are back to `TIMESTAMP NULL
  DEFAULT NULL`, as in `master_activity_categories`, and the application alone sets them.

- 2026-09-29, user: "all as recommended". §2.7 is resolved as recommended:
  1. Center code is unique per partner (`UNIQUE (partner_id, code)`); an inactive center's code
     can't be reused; codes start at 1 (0 is rejected).
  2. Head name, Center name, Unit name and Unit short name are unique among the partner's active
     rows, case-insensitive; a deactivated value may be reused.
  3. Names get their first letter capitalised (`ucfirst`); Short Name is stored as typed
     (trimmed).
  4. No Material/Expense `type` column for now.
  5. Status UI is the existing masters' chips (Active / Inactive / All) plus a row
     Activate/Deactivate toggle, not the prototype's Status dropdown in the Edit form.
  6. No seed data; the admin enters rows through the UI.

  Status → in-progress.

## 5. Execution log

- 2026-09-29: implementation (uncommitted).
  - **DB:** `apps/api/prisma/sql/2026-09-29-partner-sunai-masters.sql` (3 tables, no timestamp
    defaults), plus 3 `model`s in `schema.prisma`. `prisma validate` and `prisma generate`
    passed. **The user has not run the SQL yet.**
  - **API:**
    - `partner-masters.sunai.{schema,service,controller,routes}.ts`;
    - mounted in `partner.routes.ts` (`router.use(partnerMastersSunaiRouter)`);
    - 12 endpoints, gate `requireSunaiOrg` → `requirePartnerAuth` → `requireOrgAccess()`;
    - 409 conflicts carry `details.fieldErrors` so the page shows them inline;
    - `P2002` on the center code is mapped to `CODE_TAKEN`.
  - **Frontend:**
    - `lib/partner-sunai-masters.ts` (API client + validation mirror);
    - `components/partner/masters/SunaiMasterListView.tsx`;
    - `admin/masters/(sunai)/layout.tsx` (notFound for non-Sunai slugs);
    - 3 pages (`material-expense-head`, `center`, `quantity-unit`);
    - `PartnerOrgNav.tsx` Master dropdown: 3 Sunai-only leaves after Master Activity.

    All UI text is wrapped in `t()`; no label SQL. The list uses the keyed-result load pattern
    (lint-clean).
  - **Checks:**
    - API `tsc --noEmit` clean; frontend `tsc --noEmit` clean; eslint on the new/changed
      frontend files clean.
    - Live gate probes on niwasi-api: Sunai list without a session → 401 (TC-PSM-07);
      `Pratham/masters/center` → 404 (TC-PSM-05); `DELETE …/center/1` → 404 (TC-PSM-29, API
      half).
    - The remaining TCs are pending until the tables exist.
  - **Docs:**
    - `docs/frontend/partner-portal.md`: feature row, 3 All-pages rows, 209 → 212 pages.
    - `docs/api/endpoints.md`: 12 rows, 899 → 911, partner 389 → 401.
    - `docs/api/api-structure.md`: partner module row and the `requireSunaiOrg` mounts.
    - Noted: the existing `partner.routes.ts:<line>` refs in endpoints.md were already stale
      before this change (89 of 92 don't match the committed file). They were left as-is; they
      are a separate cleanup.
- 2026-09-29: the user ran `2026-09-29-partner-sunai-masters.sql` on the local DB. Live
  verification:
  - **Setup:** API calls to niwasi-api (JWTs signed locally for System Admin = user 1, Sunai
    Partner Admin = 111454, Sunai staff = 180, pratham Partner Admin = 3556), plus headless
    Chromium on `partner.niwasi.abhishek`.
  - **Access:**
    - TC-PSM-01 PASS: Master menu order is Master Activity, Material and Expense Head, Center
      Name, Quantity Unit.
    - TC-PSM-02 PASS: pratham sees Master Activity only.
    - TC-PSM-03 PASS: SA and PA list all 3; lowercase `sunai` slug works; SA page 200.
    - TC-PSM-04 PASS: SA on `/pratham/admin/masters/center` renders "404 This page could not be
      found". The HTTP status is 200 because layout `notFound()` runs while streaming; the
      existing `admin/orders` layout behaves the same.
    - TC-PSM-05 PASS: API 404 for pratham, SA included.
    - TC-PSM-06 PASS: staff get API 403 and can't see the list.
    - TC-PSM-07 PASS: 401 with no session.
    - TC-PSM-08 PASS: pratham's admin gets 403 on Sunai.
  - **Create and validation:**
    - TC-PSM-10 PASS: "  zZTest   rice  " → "ZZTest rice".
    - TC-PSM-11 PASS: center created by SA; columns correct.
    - TC-PSM-12 PASS: short name kept as typed; added via the UI.
    - TC-PSM-13 PASS: 422 with field errors; inline "… is required." in the UI; status body
      must be boolean.
    - TC-PSM-14 PASS: 256 / 101 / 21 characters → 422.
    - TC-PSM-15 PASS: 'abc', '-5', '1.5', '1e3', 0, '0', 4294967296, -5, 1.5, ' ' all 422;
      the UI input strips non-digits.
    - TC-PSM-16 PASS: 4294967295 saved.
    - TC-PSM-17 PASS: '0004000017' saved as 4000017.
  - **Uniqueness:**
    - TC-PSM-18 PASS: duplicate code → 409 `CODE_TAKEN`, inline in the UI, on create and edit.
    - TC-PSM-19 PASS: an inactive center's code still blocks.
    - TC-PSM-20 PASS: a pratham row with code 4000099 doesn't block Sunai's 4000099.
    - TC-PSM-21 PASS: case-insensitive duplicate name → 409 `NAME_TAKEN` (unit and head).
    - TC-PSM-22 PASS: `SHORT_NAME_TAKEN`.
    - TC-PSM-23 PASS: an inactive name can be reused.
  - **Edit and status:**
    - TC-PSM-24 PASS: edit via API and UI (modal prefilled).
    - TC-PSM-25 PASS: editing to a clashing name → 409.
    - TC-PSM-26 PASS: saving unchanged succeeds.
    - TC-PSM-27 PASS: deactivate/reactivate via API; deactivate via the UI toggle.
    - TC-PSM-28 PASS: reactivating behind a newer duplicate → 409, and the row stays inactive.
    - TC-PSM-29 PASS: no DELETE route (404).
  - **Search, paging, scoping:**
    - TC-PSM-30 PASS: search by name, by code (exact), by short name; Inactive/Active chips.
    - TC-PSM-31 PASS: limit/page honoured; limit 101 → 422. My first assertion wrongly expected
      at least 4 rows; the data was correct.
    - TC-PSM-32 PASS: missing id and pratham's id → 404 on PUT and PATCH; nothing changed.
    - TC-PSM-33 PASS: extra `partner_id` / `status` keys in the body are ignored.
  - **Timestamps:** TC-PSM-35 PASS. `created_at` / `updated_at` read back within 0 min of now
    (no 5h30m skew); `created_by` / `updated_by` are the caller; information_schema shows no
    column default on any of the 6 timestamp columns.
  - **Not run:**
    - TC-PSM-09: empty state. Not isolated, because Material and Expense Head already had 21
      local rows.
    - TC-PSM-34: needs a Hindi `label_text` row entered through the Language admin.
  - **Cleanup:** all 12 `zztest…` rows created by the checks were deleted (3 head, 5 center
    including the pratham one, 4 unit). The 21 pre-existing head rows were untouched.
  - **Noted, not changed:** the shared `MasterStatusToggle` confirm copy ("Deactivate",
    "Cancel", …) isn't wrapped in `t()`. That's existing component code used by every master.

- 2026-09-29: shipped. Commits: api `4e26226`, frontend `fe7f3cf`, parent `4ec6695`. The 35 §3
  rows were copied verbatim into `docs/testing/TEST_CASES.md` ("Partner Masters (Sunai-only)",
  numeric order). Status → shipped. **Before deploying the API to beta/prod, the user runs
  `apps/api/prisma/sql/2026-09-29-partner-sunai-masters.sql` there.**

## 6. Post-deploy

- 2026-09-30, user, change request after ship (verbatim):

  > i want you to add some validation for the master tables that we added recently
  > Material and Expense Head
  > Name*, Status*
  > Name - 1-100 ch
  >
  > Center Name
  > Center Name*, Center Code*, Status*
  > Center Name - 1-100 ch
  > Center code - numeric (1-99999)
  >
  > Quantity Unit
  > Unit Name*, Status*
  > Unit Name - 1-50 ch
  >
  > you can apply the validations for the name , center name ,center code etc in the application level

  - **Asked:** the Quantity Unit list doesn't mention Short Code. User: "Keep as is
    (Recommended)", so Short Code stays required, max 20 characters, unique among active units.
  - **Changed** (application level only; no DB change, the columns stay VARCHAR(255) / (100)
    and INT UNSIGNED):
    - Head Name 1..255 → **1..100**;
    - Center Name 1..255 → **1..100**;
    - Unit Name 1..100 → **1..50**;
    - Center Code 1..4294967295 → **1..99999**.

    The change is in the API (`partner-masters.sunai.schema.ts` constants) and mirrored in the
    frontend (`lib/partner-sunai-masters.ts`). The Center Code input's `maxLength` is now derived
    from `CODE_MAX` (5 digits). "Status\*" needs no change: status is always set (create =
    Active; the row toggle).
  - Existing local data was within the new limits: the 21 head rows have a longest name of 9
    characters; there were no center or unit rows.
  - **Test cases:** TC-PSM-14 and TC-PSM-16 are superseded by the new TC-PSM-36 and TC-PSM-37.
    TC-PSM-15 still holds (0 and 4294967296 stay rejected).
  - **Verified live:**
    - API: head 100 ok / 101 → 422; center name 100 ok / 101 → 422; code 99999 ok, 100000 and
      0 → 422 ("between 1 and 99999"), `00016` ok, `1e3` → 422, missing → 422; unit name 50 ok /
      51 → 422; Short Code still max 20 and required.
    - UI: the inputs stop at 100 / 100 / 5 digits / 50 / 20; code `00000` → inline "Center Code
      must be between 1 and 99999.".
    - API `tsc` clean; eslint on the changed frontend files clean. Test rows (`zzv…`) were
      deleted.
    - The PM2 servers had stopped again and were restarted. The first UI run hit a 404 while the
      dev server was compiling; it passed on retry.
    - **Re-verified after another VS Code crash (2026-09-30):** API 14/14 PASS (test rows
      deleted); the browser checks passed 6/6: name inputs stop at 100 / 100 / 50; the code input
      stops at 5 digits; code 0 → the inline 1–99999 message; blank head name → "Name is
      required."; frontend `tsc` is clean.
    - **Environment:** after that crash, every route more than one folder below `admin/` or
      `staff/` returned 404, including long-standing ones such as `staff/reports/global` and the
      Order Details page. A restart didn't help. The cause was a corrupted Next.js dev cache.
      Fixed by stopping niwasi-web, deleting `apps/frontend/.next` (4.2 GB, gitignored build
      output) and starting it again. No code change.

- 2026-09-30, user (with a screenshot of the Add Quantity Unit modal): "can you show the allowed
  character in the modal like we show for the reports that we just added".
  - **Done:** every text field in the Add/Edit modal shows a live counter under the input, right
    aligned, in the same style as the Daily Activity Report form (`n/max`): Head Name `/100`,
    Center Name `/100`, Unit Name `/50`, Short Code `/20`.
  - The numeric Center Code shows "Numbers only, 1–99999" instead of a counter.
  - An inline error, when present, sits on the left of the same row.
  - The text is wrapped in `t()`.
  - **File:** `components/partner/masters/SunaiMasterListView.tsx`.
  - **Checks:** eslint and `tsc` clean; browser 5/5 PASS: 0/50 and 0/20 → 8/50 and 2/20 while
    typing; Center 0/100 plus the code hint; the error and the hint show together; Head 0/100.
  - The one Kilogram/kg unit saved during the check was deleted.

- 2026-09-30, user: "can you also check the master tables too for that" (following the daily
  reports' "show blank instead of —" change).
  - `SunaiMasterListView.tsx`, the only placeholder in the three Sunai master pages: an empty
    list cell now renders blank instead of "—".
  - Every master field is required, so in practice no cell is empty; the change is for
    consistency.
  - Master Activity (a separate page) wasn't touched.
  - eslint and `tsc` are clean.

## 7. Cross-references

- SRS row: n/a
- TEST_CASES: TC-PSM-01..35 ✔ promoted on ship (2026-09-29)
- Page maps / API docs to update: `docs/frontend/partner-portal.md`, `docs/api/endpoints.md`,
  `docs/api/api-structure.md`
- Migration: `apps/api/prisma/sql/2026-09-29-partner-sunai-masters.sql` (user runs it)
- Related: `2026-09-25-partner-admin-orders.md` (same `requireSunaiOrg` gate); the Activity
  Category master (`partner.service.ts` ~L4640, `admin/masters/activity-category/page.tsx`), the
  reference for shape and UI
- Prototypes: `~/Downloads/Niwasi/niwasi-app/partner/{material-expense-head-master,center-name-master,quantity-unit}.html`
  (engine `daily-reports.js`)
