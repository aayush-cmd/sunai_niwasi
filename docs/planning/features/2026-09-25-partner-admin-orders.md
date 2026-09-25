# Partner Admin — Orders list (all staff orders)

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-09-25 |
| Shipped | |
| SRS row | — (no `docs/requirement/SRS.md` in this repo yet) |
| Test cases | TC-PAO-01..38 |
| Prototype todo | — |

## 1. Requirement (as given)

> now as each staff member of a partner has orders list now we also want to show an order list to the admin (partner admin) so we will create a new tab after (check ss) feedback form it will be named orders and this new page will show all the order list of all the staff members under that partner and it will look like this (check ss) now create a plan for this task

**Screenshot 1:** the current Partner Admin nav on `partner.niwasi.abhishek/Sunai/admin`:
`Dashboard · Projects ▾ · Community Management ▾ · Master ▾ · Users & Report Management ▾ · Proposal & Quotation · Wards · Feedback Form ▾ · Staff Dashboard · MOOL / Facility Dashboard`.
The new **Orders** tab goes directly after **Feedback Form**.

**Screenshot 2:** the target page (a prototype, "Orders" active in its nav):

- **Title:** "Orders", with the subtitle "All orders across Medical, Meals and Zero waste".
- **Top right:** a **Download CSV** button.
- **Filter card:** CUSTOMER / MOBILE (text), STAFF (select, "All"), SERVICE GROUP (select), STATUS (select), DATE FROM and DATE TO (dd/mm/yyyy), plus **Search** and **Clear**.
- **Count line:** "Showing **42** orders".
- **Table columns:** S.NO · DATE ("16 Sep 2026", bold) · SERVICE GROUP (coloured badge: Zero waste green, Medical blue, Meals amber) · SERVICE (label, e.g. "Dry waste", "Home Care Service") · CUSTOMER · MOBILE · **STAFF** (who placed it) · CITY / AREA ("Kankarbagh, Patna") · STATUS (plain text) · AMOUNT ("₹102"; blank for Medical) · ACTION (a single 👁 view button).

**Screenshot 3 (2026-09-25, CSV format):** one sample row with these column headers, in this order:
`S.No · Order ID · Date · Service Group · Service · Details · Customer · Mobile · Staff · City / Area · Status · Amount`

Sample values: `1 · k1 · 16 Sep 2026 · Zero waste · Dry waste · Paper & cardboard › Newspaper · 8.5 kg · ₹102 · Priya Singh · 9876543210 · Staff1 · Kankarbagh · Collected · 102`. ~~The Amount is a plain number with no ₹; Details is the stored details string.~~ _Superseded 2026-09-25: the user said the data row is only an example and only the headers count (§4). The value formats are set in §2.2._

**Screenshots 6–8 (2026-09-25, Order Details page):** a full page titled **"Order Details"**, with a **← Back** button top-right, one white card of read-only field boxes in a 4-column grid, a divider, and a **✕ Close** button bottom-right. An empty value shows as grey italic **"Null"**. Fields (the sample values are examples only):

| Group | Fields, in order |
|---|---|
| **Zero waste** (screenshot 6) | Order ID · Mobile Number · Full Name · City · Order Date · Service Group · Help Needed · Status · Staff · Category · Item · Weight (kg) · Rate per kg (₹) · Amount · Attach photo of waste |
| **Medical, care** (screenshot 7) | Order ID · Mobile Number · Full Name · City · Order Date · Service Group · Help Needed · Status · Staff · What kind of medical care is needed? · Attach reports |
| **Meals** (screenshot 8) | Order ID · Mobile Number · Full Name · City · Order Date · Service Group · Help Needed · Status · Staff · Number of items · Attach menu / list |

## 2. Plan

### 2.0 Context and prior decisions (reactivation)

- No planning file covers Order Placement. `docs/planning/features/` has only the Mitram Rasoi plan.
  - The design doc the code cites everywhere, `docs/order-placement-rebuild-plan.md`, **isn't in the repo**, so the code is the reference.
- **Prior decision being partly reversed:** on **2026-09-19** Order Placement was removed from the admin nav and made staff-only. The code records it as "Admin fully blocked, staff only":
  - comment in `PartnerOrgNav.tsx`;
  - `requireOrgStaffOnly()` on every `/order-placement` route;
  - the "Access denied" panel in `staff/order-placement/layout.tsx`.

  This task gives the Partner Admin a **view of every staff member's orders, plus status editing** (Q2 answer, §4). Everything else stays read-only.

  **Design choice:** the staff module stays exactly as it is, still staff-only for all writes, and the admin gets **new, separate read-only endpoints** under an admin path. This avoids loosening `requireOrgStaffOnly()`. Recorded as a deliberate partial reversal (§4, Q2). The admin's one write, status change, goes through its **own** admin endpoint, so the staff routes' `requireOrgStaffOnly()` is untouched.
- **How staff scoping works today:** every staff read filters `created_by = me` (`order-placement.order.service.ts:237`, `:280`; the dashboard and customers work the same way). The admin view drops that filter and keeps only `partner_id = this org`.

### 2.1 Rule-by-rule (AGENTS.md)

| Rule | Applies? | Notes |
|---|---|---|
| Frontend ↔ backend validation mirror | **Yes** (filters) | Every filter rule exists on both sides. The Zod query schema checks: date format; `from ≤ to`; `q` ≤ 150 characters; `staff_id` a positive int; `group` and `status` from fixed lists. The page applies the same checks before searching and shows the backend's message on a 422. **Status edit:** the value must be one of that order's group statuses (Medical/Meals: Pending, In Progress, Completed, Cancelled; Waste: Not collected, Collected, Taken by someone else), on both sides. The dropdown only offers that group's statuses, and the API rejects anything else with a 422. |
| DB schema change → dated `.sql` | **No** | Read-only over existing tables; no columns or indexes change. See §2.7 for an existing gap in this module's migrations, which is out of scope. |
| New test cases up front | **Yes** | §3. |
| Page maps + API docs in sync | **Yes** | New page → `docs/frontend/partner-portal.md` (§3 Org admin row + All-pages row, count 207 → 208). The 5 new endpoints → `docs/api/endpoints.md` rows under the partner order-placement section. No new module, mount or middleware, so `api-structure.md` is unchanged. |
| No AI-attribution trailers | Yes | — |
| Sensitive files never in git | Yes | Stage by explicit path. |

### 2.2 Backend: new read-only admin endpoints

All endpoints go under `/api/v1/partner/orgs/:slug/admin/orders`. They're added to `order-placement.routes.ts` in their own clearly labelled block, since they share that module's services.

**Gate:** `requirePartnerAuth → validateParams → requireOrgAccess()`. This is the same gate as the admin dashboard and the admin layout. It admits **System Admin + this org's Partner Admin** only, so staff get a 403. Vendor Admin is **not** admitted (Q1 answer).

| Method | Path | Purpose |
|---|---|---|
| GET | `/orgs/:slug/admin/orders` | Paginated list with every filter (§2.3) |
| GET | `/orgs/:slug/admin/orders/staff-options` | Staff dropdown: `{id, name}` for every staff member who has placed at least one order in this org (distinct `created_by`, names from `users`), sorted by name. See Q4. |
| GET | `/orgs/:slug/admin/orders/export` | CSV of **all** rows matching the current filters (filter-dependent, not just the current page; Q5 answer), capped at 10,000 rows. The columns are exactly screenshot 3's, in order: `S.No, Order ID, Date, Service Group, Service, Details, Customer, Mobile, Staff, City / Area, Status, Amount`. **Only the headers and their order are fixed by the user.** Value formats, chosen here and not taken from the sample row:
  - Order ID: `MED-<id>`, `MEAL-<id>` or `WST-<id>`, because ids are only unique within a group;
  - Date: `DD Mon YYYY` in IST, the same as the table;
  - Amount: a plain number, blank when null, so it sums in Excel;
  - Details: the stored `details` string;
  - every other value: as shown in the table. Uses `toCsv` + `sendCsv` (`lib/csv.ts`), like `contacts-extras.controller.ts:106`. Filename `orders_YYYY-MM-DD.csv`. |
| GET | `/orgs/:slug/admin/orders/:group/:id` | Detail for the view modal: the same payload shape as the staff `getOrder`, plus `staff_name`, **without** the `created_by = me` filter. |
| PATCH | `/orgs/:slug/admin/orders/:group/:id/status` | **The admin's only write** (Q2). Body `{ status }`, validated against **that group's** status list (see §2.1; the staff PATCH accepts any string). The lookup is scoped to `partner_id` only. It writes `status`, `updated_by = admin`, `updated_at`, and returns the updated order. Every other field stays read-only. |

Static paths (`staff-options`, `export`) are registered before `/:group/:id`. The service gets `updateAdminOrderStatus(partnerId, adminId, group, id, status)`. The staff `updateOrderStatus` stays unchanged.

~~**Service refactor, so staff and admin share one query:**~~ _Superseded 2026-09-25 (§4, "does not affect the other working code"): the staff `listOrders` is **not** refactored. The admin feature gets its own `order-placement.admin.service.ts` with its own `UNION ALL` query (the same three tables and the same `partner_id` / `deleted_at` rules). No staff code path changes. The notes below still describe what the admin query does._

**Admin query (was: service refactor):** turn the body of `listOrders` (`order-placement.order.service.ts:212-277`) into a shared `queryUnifiedOrders(partnerId, scope, filters)`.

- **`scope`:** `{ createdBy: bigint }` for staff (today's behaviour, unchanged), `{ staffId?: bigint }` for admin.
- **Customer join:** the `UNION ALL` gains a `JOIN order_placement_customers c ON c.id = u.customer_id`. This gives the customer name for display, and lets "Customer / Mobile" search match **customer name or mobile**. It also removes the second name-lookup query.
- **Staff names:** one `users` lookup by `created_by` returns `staff_name`.
- **Service label:** returns `service_label` from the existing `MEDICAL_SERVICE_INFO` / `MEAL_TYPE_INFO` / `WASTE_TYPE_INFO` maps in `order-placement.shared.ts`. Today the list returns only the raw key (`medicine`, `tiffin`, `dry`).
- **Staff list unchanged:** the staff `listOrders` keeps its current response. The added fields (`service_label`, `staff_name`) are additive, and the staff page is not otherwise touched.

**Admin list response (per row):** `uid, group, id, created_at, service_label, customer_id, customer_name, mobile, staff_id, staff_name, city, area_locality, status, amount`.
- `amount` is null for Medical, which has no amount column, and is often null for Meals.

**Pagination:** `page`, with `limit` fixed at **10 per page** (Q3 answer; the schema allows 1–100, and the page always sends 10). Newest first (`created_at DESC, grp, id DESC`, as today).

### 2.3 Filters (backend `AdminOrderListQuery` Zod schema, mirrored on the page)

| Filter | Param | Rule |
|---|---|---|
| Customer / Mobile | `q` | trim, ≤ 150 characters; `LIKE %q%` on `c.full_name` OR `u.mobile` |
| Staff | `staff_id` | positive int; must be a user who has orders in this org, otherwise the result is simply empty (no error) |
| Service group | `group` | `medical` / `meals` / `waste` |
| Status | `status` | `open`, or one of the 7 real statuses (`Pending`, `In Progress`, `Completed`, `Cancelled`, `Not collected`, `Collected`, `Taken by someone else`). A strict enum here, unlike the staff list's free string. |
| Date from / to | `from`, `to` | `YYYY-MM-DD`, with `from ≤ to` (refine → 422). **Interpreted as IST days:** `from` → `${from}T00:00:00+05:30`, and `to` → the next day at 00:00 +05:30, exclusive. |

- **Why the explicit IST offset:** the staff list parses dates in server-local time (`order-placement.order.service.ts:217-218`), which only works because the server happens to run in IST. The admin query makes the time zone explicit.
- **Service-group + status combinations** that can't match (e.g. Medical + "Collected") are allowed and just return 0 rows. The status dropdown doesn't narrow by group; see TC-PAO-12.

### 2.4 Frontend

**Nav** (`components/partner/PartnerOrgNav.tsx`): insert `{ kind: "link", label: "Orders", icon: "shopping_cart", href: `${base}/orders` }` directly after the **Feedback Form** dropdown, before Staff Dashboard. Also update the "Order Placement REMOVED from the Admin nav" comment there so it reflects the read-only admin list.

**Page:** `app/(partner)/partner/(dash)/[slug]/admin/orders/page.tsx`, a client page under the existing admin layout. That layout already guards with `GET /orgs/:slug/dashboard` (`requireOrgAccess`) and renders `PartnerOrgHeader` / `PartnerOrgNav`.

- **Layout, following screenshot 2:**
  - Breadcrumb `Dashboard › Orders`; title + subtitle; a **Download CSV** button on the right of the heading row.
  - The filter card: Customer/Mobile, Staff, Service group, Status, Date from, Date to, **Search**, **Clear**.
  - "Showing **N** orders", where N is the total matching the filters, not the page count.
  - The table with the 11 columns listed in §1.
- **Cells:**
  - **Date:** `16 Sep 2026` in `Asia/Kolkata`, formatted with `Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })`. This avoids the staff page's UTC-slice / MM-DD-YYYY problem.
  - **Service group:** a coloured pill. Zero waste is green (emerald), Medical is blue (sky), Meals is amber, following the screenshot.
  - **City / Area:** `area_locality, city`, joined with ", " when both are present, else whichever exists, else "—".
  - **Status:** plain text, as in the screenshot (no badge).
  - **Amount:** `₹{amount}` when not null, else blank.
- **Filters:** synced to the URL query string, so a filtered view can be shared or reloaded, as the staff Orders page does. Search runs on Search or Enter. Clear resets the fields and the URL. The page's `from ≤ to` check mirrors the backend and shows an inline message.
- **Staff dropdown:** loaded once from `/staff-options`; "All" is the default. It lists only staff who have placed at least one order (Q4 answer).
- ~~**View (👁):** the table keeps a single 👁 action, as in screenshot 2.~~ _Superseded 2026-09-25 (§4, "edit status button"): the Action column has **👁 View** (read-only details) and **✏ Edit status**, which opens its own dialog (screenshots 4–5)._
- **Was:** the table keeps a single 👁 action, as in screenshot 2. It opens the order-details modal (`GET …/admin/orders/:group/:id`), which has **one editable control, Status** (Q2). The modal footer has a status dropdown listing only that order's group statuses, plus **Save status**. Saving calls the admin PATCH and shows a success or error message, and the table row refreshes. There's no "Correct details" and no other editable field.
  - ~~Extract the staff page's `detailRows()` + `OrderDetailModal` into a shared component.~~ _Superseded 2026-09-25: the staff page is left untouched. The admin gets its own `components/partner/admin-orders/AdminOrderDetailModal.tsx`, which reuses the existing `OrderModal` shell (`op-order-modal.tsx`) unchanged._
  - The admin version hides the "Correct details" button, adds a **Placed by (staff)** row and the status control, and shows an error message if loading fails (the staff version currently renders nothing).
- **Download CSV:** `fetch(resolveApiBase() + …/export?<current filters>, { credentials: "include" })` → blob → save. This is the same approach as `lib/partner-contacts-extras.ts:328`. Using `resolveApiBase()` rather than the raw base keeps the session cookie working on `partner.localhost`. The button shows a spinner while downloading, and an error message on failure.
- **Library:** add `listAdminOrders`, `getAdminOrder`, `updateAdminOrderStatus`, `listAdminOrderStaff` and `downloadAdminOrdersCsv` to `lib/partner-order-placement.ts`, typed as in §2.2.
- **Translations:** all labels go through `useT()`. Hindi text appears only where `label_text` already has the English key; otherwise the English shows. Adding Hindi rows would be a separate data task.
- **No links into the staff module.** The staff `/order-placement` layout still blocks Partner Admin.
- **Service labels:** use the current services only (Q6 answer). The screenshot's "Lunch" isn't a meal type, so meals show the existing labels.
- **Status filter:** "Open" plus the 7 statuses, as on the staff page (Q7 answer).

#- **Order Details page (👁), added 2026-09-25, replacing the 👁 modal:** `app/(partner)/partner/(dash)/[slug]/admin/orders/[group]/[id]/page.tsx`, laid out as screenshots 6–8, under the existing admin layout and guard.
  - **Every group** starts with the same 9 fields: Order ID (`MED-` / `MEAL-` / `WST-<id>`), Mobile Number, Full Name (the customer), City (`area, city`), Order Date (`DD Mon YYYY`, IST), Service Group, Help Needed (the service label), Status, Staff.
  - **Then the group's own fields:**
    - **Zero waste:** Category, Item, Weight (kg), Rate per kg (₹), Amount (₹…), Attach photo of waste.
    - **Medical, care:** What kind of medical care is needed? (the care description), Attach reports.
    - **Medical, medicine** (no screenshot; labels from the staff `MedicineForm`): Medicines (`name (quantity)`, one per line), Prescription (attachments, including per-medicine photos).
    - **Medical, sample** (no screenshot; labels from `SampleForm`): Patient age, Patient gender, Tests (one per line), Prescription.
    - **Meals:** Number of items (quantity), Attach menu / list.
  - **Formatting:** empty values show grey italic **Null**. Attachments are listed by filename as links. The page is **read-only**; status is still changed from the list's ✏.
  - **Buttons:** **Back** and **Close** both return to the Orders list **with the filters and page the admin came from**. The list link carries `?back=<list query>`, and the detail page builds `/{slug}/admin/orders?<back>` from it (always the fixed list path).
  - **Errors:** an unknown group or id shows an "Order not found" message with a Back link.
  - **Row action:** 👁 becomes a real link (`<a>`, so a new tab / middle-click works). The 👁 modal (`AdminOrderDetailModal.tsx`) is removed.
- **Admin attachment download, added 2026-09-25:** `GET /orgs/:slug/admin/orders/:group/:id/attachments/:filename`, behind `requireOrgAccess()`.
  - It serves a file **only if that filename is one of this order's own attachments**: `prescription_file` / `attachment_file` / `photo_file`, plus per-medicine `photo_file` in `items_json`. The order must belong to this org, so no other file in the shared upload folder can be fetched.
  - Filenames are checked with `basename` and the resolved path must stay inside the upload folder. Content type comes from the existing `ATTACHMENT_CONTENT_TYPE_BY_EXT` allowlist.
  - The staff `/order-placement/attachments/:filename` route stays staff-only and untouched.
- **Edit status (✏), added 2026-09-25:** a separate `AdminOrderStatusModal`, following screenshot 5:
  - title `Edit Status — {customer} · {service label}`, a ✕ close button, and Escape / backdrop to close;
  - a **STATUS** select listing **only the statuses of that order's service group** (Medical/Meals: Pending, In Progress, Completed, Cancelled; Zero waste: Not collected, Collected, Taken by someone else);
  - footer: **Cancel** (✕ icon) and **Save** (save icon). Save calls the admin PATCH, updates the row's Status cell and closes. An error keeps the dialog open with the message. Saving an unchanged value just closes it.

  The 👁 details modal becomes **read-only**, and its status control is removed.

### 2.4b Sunai-only (added 2026-09-25)

Both the admin **Orders** feature and the staff **Order Placement** module exist **only for the Sunai partner org**. This follows the Pratham precedent (`pratham.routes.ts` `PRATHAM` gate + `pratham/layout.tsx` `notFound()`): a hard org-lock enforced on the backend, with the frontend hiding the menu and showing not-found. Hiding the menu alone would still leave the pages and API reachable by URL.

- **Identify Sunai by slug (`Sunai`), compared case-insensitively.** Not by `partners.id`, which can differ across local, beta and prod. This is the same reasoning as the Pratham gate's comment.
- **Backend:** a new shared helper `sunai-org.ts` (`isSunaiSlug`, `requireSunaiOrg`). Each router gets **one** `router.use(<base path>, requireSunaiOrg)` line:
  - `order-placement.admin.routes.ts` (`/orgs/:slug/admin/orders`);
  - `order-placement.routes.ts` (`/orgs/:slug/order-placement`; the only edit to that staff file).

  Any other org's slug gets **404** for **everyone, including the System Admin**, like Pratham. The route definitions and the existing gates (`requireOrgStaffOnly` / `requireOrgAccess`) are unchanged and still run for Sunai.
- **Frontend:** a new `lib/sunai-org.ts` (`isSunaiSlug`).
  - `PartnerOrgNav.tsx`: the Orders tab only when `isSunaiSlug(slug)`.
  - `PartnerStaffNav.tsx`: Order Placement only when `!isPartnerAdmin && isSunaiSlug(slug)`.
  - A new `admin/orders/layout.tsx`: `notFound()` for a non-Sunai slug.
  - `staff/order-placement/layout.tsx`: `notFound()` for a non-Sunai slug, placed so it doesn't add to that file's existing early-return hook problem.
- **Who sees what after this:**
  - Sunai Partner Admin: the Orders tab. System Admin: the Orders tab when viewing Sunai.
  - Sunai staff: Order Placement. The Sunai Partner Admin still gets "Access denied" there, as before.
  - Every other org: neither feature, for anyone.

### 2.5 Files to touch

_Revised 2026-09-25 for the "don't affect other working code" instruction. The admin feature lives in **new files**. The only edits to existing files are additive: one mount line, one nav entry, and docs. The staff service, controller, routes, schema, lib and pages are **not modified**._

| File | Change |
|---|---|
| `apps/api/src/modules/partner/order-placement.admin.schema.ts` | **new**: `AdminOrderListQuery` (`from ≤ to` refine), params, `AdminOrderStatusBody` |
| `apps/api/src/modules/partner/order-placement.admin.service.ts` | **new**: list / staff options / export rows / detail / status update |
| `apps/api/src/modules/partner/order-placement.admin.controller.ts` | **new**: 5 handlers (CSV via `toCsv` / `sendCsv`) |
| `apps/api/src/modules/partner/order-placement.admin.routes.ts` | **new**: the 5 routes behind `requireOrgAccess()` |
| `apps/api/src/modules/partner/partner.routes.ts` | **+1 line**: `router.use(orderPlacementAdminRouter)`, next to the existing order-placement mount |
| `apps/frontend/lib/partner-admin-orders.ts` | **new**: typed client (imports the existing label maps and statuses read-only) |
| ~~`apps/frontend/components/partner/admin-orders/AdminOrderDetailModal.tsx`~~ | ~~read-only detail modal~~ _Removed 2026-09-25: replaced by the Order Details page._ |
| `apps/frontend/app/(partner)/partner/(dash)/[slug]/admin/orders/[group]/[id]/page.tsx` | **new**: the Order Details page (screenshots 6–8) |
| `apps/api/src/modules/partner/order-placement.admin.{routes,controller,service}.ts` | + the attachment route (6th admin route) |
| `apps/frontend/components/partner/admin-orders/AdminOrderStatusModal.tsx` | **new**: the ✏ Edit Status dialog (screenshot 5) |
| `apps/frontend/app/(partner)/partner/(dash)/[slug]/admin/orders/page.tsx` | **new**: the admin Orders page |
| `apps/frontend/components/partner/PartnerOrgNav.tsx` | **+1 nav entry** (Orders, after Feedback Form) and a comment update |
| `docs/frontend/partner-portal.md` | §3 rows + All-pages rows for `/admin/orders` and `/admin/orders/[group]/[id]`, 207 → 209 |
| `docs/api/endpoints.md` | 6 rows |

### 2.6 Security and performance

- **Org isolation:** every admin query is fixed to `partner_id` from the gate, and the `:group/:id` detail re-checks `partner_id`, so another org's order id returns 404. The Partner Admin of org A can't read org B (TC-PAO-18).
- **Staff can't use the admin endpoints:** `requireOrgAccess()` rejects them with a 403 (TC-PAO-17). This includes the status PATCH.
- **Status write:** the only field the admin can change. It's checked against the group's status list, scoped to the org (another org's id returns 404), and stamped with `updated_by`, so the change can be traced to the admin.
- **Personal data in the CSV:** the export contains names and mobile numbers, so it's behind the same gate as the list, and capped at 10,000 rows.
- **Query cost:** the `UNION ALL` is limited to one partner by the existing `(partner_id, deleted_at)` indexes on all three tables, and the customer join uses the primary key. Row counts are small (46 orders locally). No new index is needed now; revisit if one partner passes ~50k orders.
- **Attachments:** the admin view lists attachment filenames as text only, as the staff modal does. It doesn't add an admin route for serving files, so admins get no new file access.

### 2.7 Out of scope, flagged

These are existing problems in the module, not part of this task. Each is a separate follow-up.

- **Migration gap.** Commit `37be80a` added `order_placement_customers.copied_from_customer_id` and changed the unique key to `(partner_id, mobile, created_by)` (`opc_partner_mobile_creator_uq`), but **no dated `.sql` file** was written. Only `apps/api/prisma/sql/2026-order-placement.sql` exists. The local database has both, applied by hand. Any environment built from the `.sql` files would fail on customer create. This needs its own catch-up `.sql`, run by the user.
- **Staff Orders page problems:**
  - the date shows MM/DD/YYYY from a UTC slice;
  - the Service column shows raw keys;
  - search doesn't match its placeholder (no name or service search);
  - `PATCH …/status` accepts any string;
  - edit-modal validation doesn't match the backend.
  - The shared refactor in §2.2 makes `service_label` and name search available to the staff list too, but the staff page UI is not changed in this task.

### 2.8 Open questions

Q1–Q7 were answered 2026-09-25; see §4. The strike-through marks the original question.

- ~~**Q1 Access.** Only System Admin + this org's Partner Admin (default; same as the admin area)? Or also **Vendor Admin**, who can open other admin pages such as Users and Designations?~~ _Answered, see §4._
- ~~**Q2 Read-only?** View-only, as the screenshot has only 👁 (default)? Or should the admin also be able to change status or correct details, which would reverse more of the 2026-09-19 "admin fully blocked" decision?~~ _Answered, see §4._
- ~~**Q3 Pagination.** The screenshot shows "Showing 42 orders" with no pager visible. Page the list at 20 per page with a pager under the table (default)? Or load every order on one page?~~ _Answered, see §4._
- ~~**Q4 Staff dropdown.** List only staff who have placed orders (default)? Or every staff member in the org, including those with none?~~ _Answered, see §4._
- ~~**Q5 CSV contents.** The table's columns, with the table's labels, plus **Order ID** and **Details**, for all rows matching the current filters (default)? Or exactly the visible columns only?~~ _Answered, see §4._
- ~~**Q6 "Lunch" in the screenshot.** It isn't a current meal type (the types are Daily Tiffin / Event Catering / Dinner / Special Diet). Show the existing labels (default)? Or is a new "Lunch" meal type wanted? That would be a change to the staff Place Order flow, so a separate task.~~ _Answered, see §4._
- ~~**Q7 Status filter.** Offer "Open" plus the 7 real statuses, as on the staff page (default)?~~ _Answered, see §4._

- ~~**Q8 (new) Order ID format in the CSV.** Screenshot 3 shows `k1`. Order ids are only unique **within** a group (medical, meals and waste each start at 1), so the Order ID needs a group prefix. Default: `MED-<id>`, `MEAL-<id>`, `WST-<id>`. Or is there a specific format behind `k1` (e.g. `m1` / `f1` / `k1` for medical / food / kabaad)?~~ _Resolved 2026-09-25: the sample row doesn't count, so the default `MED-` / `MEAL-` / `WST-` prefix is used (§4)._

## 3. Test cases (designed up front)

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-PAO-01 | Tab position | Logged in as the Partner Admin of Sunai | Open `/Sunai/admin` | Nav reads `… Wards · Feedback Form ▾ · Orders · Staff Dashboard · MOOL / Facility Dashboard`. Orders is a live link with the `shopping_cart` icon. | H |
| TC-PAO-02 | Tab navigates and highlights | as TC-PAO-01 | Click **Orders** | Opens `/Sunai/admin/orders`, and Orders shows as the active tab. | H |
| TC-PAO-03 | All staff orders appear | Orders exist from 2+ staff (e.g. Staff1, Staff2) | Open the page with no filters | Every non-deleted order of **every** staff member in this org appears. "Showing N orders" equals the sum of the staff members' own counts. The Staff column shows each placer's name. | H |
| TC-PAO-04 | Other orgs' orders never appear | An order exists in another partner org | Open the page | That order is absent from the list, the count and the CSV. | H |
| TC-PAO-05 | Columns and formatting | — | Inspect the rows | Date shows as `DD Mon YYYY` in IST. The group pill colours are Zero waste green, Medical blue, Meals amber. Service shows the label ("Home Care Service", "Dry waste"…), never a raw key. City/Area shows as `area, city`. Status is plain text. Amount shows `₹…` for meals/waste with an amount, and blank for Medical. | H |
| TC-PAO-06 | IST day boundary | An order created at 00:30 IST (19:00 UTC the previous day) | View the list; filter Date from = Date to = that IST day | The row shows the IST date and is included by that one-day filter. | M |
| TC-PAO-07 | Newest first | — | Compare the dates top to bottom | Descending by creation time across all three groups. | M |
| TC-PAO-08 | Customer/Mobile search | — | Search part of a customer's name, then part of a mobile number | Each returns only matching rows. Name search matches **customer name**. | H |
| TC-PAO-09 | Staff filter | — | Pick Staff1 | Only Staff1's orders. The count updates, and the dropdown lists only staff with orders, sorted by name. | H |
| TC-PAO-10 | Group filter | — | Pick each group | Only that group's rows. | M |
| TC-PAO-11 | Status filter incl. Open | — | Pick "Open", then each real status | "Open" = Pending, In Progress, Not collected and Taken by someone else across all groups. Each real status matches exactly. | M |
| TC-PAO-12 | Impossible combination | — | Group Medical + Status Collected | 0 rows, with the "no orders match" message and no error. | L |
| TC-PAO-13 | Date range validation (mirror) | — | Set Date from after Date to, then Search; also call the API directly with that range | The page shows an inline message and doesn't search. The API returns 422 with a field error. | H |
| TC-PAO-14 | Combined filters and URL sync | — | Apply 4 filters, reload the page, then copy the URL into a new tab | The filters and results survive the reload and the new tab. **Clear** empties the fields, the URL and the filters. | M |
| TC-PAO-15 | Pagination (10 per page) | More than 10 matching orders | Page through the list | **10 per page**; S.No keeps counting across pages (11, 12…); the count shows the total. The last page is correct. The page resets to 1 on a new search. | M |
| ~~TC-PAO-16~~ | ~~View modal (read-only)~~ | — | — | _Superseded 2026-09-25: 👁 opens the Order Details page instead (TC-PAO-31–35)._ | — |
| TC-PAO-17 | Staff can't use admin endpoints | Logged in as staff | Call `GET /orgs/Sunai/admin/orders` (list, detail and export); open `/Sunai/admin/orders` | API 403 in every case. The page is blocked by the admin layout, which redirects. | H |
| TC-PAO-18 | Cross-org admin | Partner Admin of org A | Call org B's `/admin/orders` and a known org-B `:group/:id` | 403 for org B's slug. An org-B order id under org A's slug returns 404. | H |
| TC-PAO-19 | System Admin access | Logged in as System Admin | Open `/Sunai/admin/orders` | The full Sunai list is visible. | M |
| TC-PAO-20 | Staff module unchanged | Logged in as staff | Use the staff Orders page: list, view, edit, status | Behaves exactly as before; still only the staff member's own orders. A status the admin set shows up in the staff member's list. A Partner Admin still gets "Access denied" on `/staff/order-placement/*`. | H |
| TC-PAO-21 | CSV export follows filters and format | — | Apply filters (e.g. Staff1 + Meals), click **Download CSV** | `orders_YYYY-MM-DD.csv` downloads. It contains **all** matching rows across every page, not just the current page. The columns are exactly `S.No, Order ID, Date, Service Group, Service, Details, Customer, Mobile, Staff, City / Area, Status, Amount`, in that order. Date is `16 Sep 2026`, Amount is a plain number (blank when there's none), and the Order ID is `MED-`, `MEAL-` or `WST-` + id. Only the headers are from the user; the value formats are the plan's (§2.2). Every field is quoted, so a value containing `;` (e.g. MED-21 `rtyjukl;`) never splits into an extra column, even in a spreadsheet that splits on `;`. It opens cleanly in Excel, with Hindi and › · ₹ in Details intact. With no filters, the CSV holds every org order. | H |
| TC-PAO-22 | CSV auth and dev host | On `partner.niwasi.abhishek` | Download CSV; log out in another tab, then download again | The first download succeeds with the cookie sent. After logout, an error message is shown, not an HTML/JSON file saved as CSV. | M |
| TC-PAO-23 | Empty org | Org with no orders | Open the page and click Download CSV | "No orders yet"; the staff dropdown is empty apart from "All"; the CSV has only the header row. | L |
| TC-PAO-24 | Deleted orders hidden | An order with `deleted_at` set | Open the page and the CSV | That order is absent from both. | M |
| TC-PAO-25 | Input limits | — | Search with 151+ characters, a `staff_id` of `abc`, `status=Foo`, `group=x` (via the URL or API) | 422 from the API with clear messages. The page stays usable. | L |
| TC-PAO-26 | Build, lint and docs | — | `tsc`, `eslint` on the changed files, `npm run build`; check the docs | Clean. `/admin/orders` is in `partner-portal.md` (feature row + All-pages row, 208), and the 4 endpoints are in `endpoints.md`. | H |
| TC-PAO-27 | Admin changes status | Partner Admin; a Pending medical order and a Not collected waste order | Click ✏ on each, set the medical order to In Progress and the waste order to Collected, then Save | The dialog closes and the row's Status shows the new value. The row's `updated_by` is the admin. The dropdown offers only Pending / In Progress / Completed / Cancelled for medical and meals, and only Not collected / Collected / Taken by someone else for waste. | H |
| TC-PAO-28 | Status validation (mirror) | — | Call the admin PATCH with `Completed` on a waste order, an empty status, and `Foo` | 422 each time with a clear message, and the order is unchanged. The UI can't produce these values. | H |
| TC-PAO-29 | Status write is org-scoped and admin-only | Partner Admin of org A; staff of org A | Admin of org A PATCHes an org-B order id under A's slug; staff calls the admin PATCH | 404 for the org-B id; 403 for staff. Neither order changes. | H |
| TC-PAO-30 | Edit Status dialog | — | Click ✏ on any row; try ✕, Cancel, Escape and a backdrop click; reopen and Save; then force a failure (e.g. log out) and Save | Every row has 👁 and ✏. The title reads `Edit Status — {customer} · {service}`, with the current status pre-selected. ✕, Cancel, Escape and the backdrop all close without saving. Save updates the row. A failed save keeps the dialog open with an error message. | H |
| TC-PAO-31 | 👁 opens the Order Details page | Admin on the Orders list with filters and page 2 | Click 👁 | Navigates to `/{slug}/admin/orders/{group}/{id}`. The title "Order Details" and a ← Back button show. It's a real link: middle-click opens a new tab. | H |
| TC-PAO-32 | Fields per service group | One zero-waste, one medical care, one medicine, one sample and one meals order | Open each | The common 9 fields (Order ID … Staff) appear in order, then **only** that group/type's fields, exactly as in §1 screenshots 6–8 (medicine/sample per §2.4). Empty values show grey italic "Null". The values match the list row (date, city, status, staff, amount). | H |
| TC-PAO-33 | Back and Close keep the list state | as TC-PAO-31 | Click Back; reopen and click Close | Both return to the list with the same filters and page 2, not a reset list. Opened directly with no `back` parameter, they go to the plain list. | M |
| TC-PAO-34 | Attachments | An order with an attachment; another org's file name; a random existing upload name | Click the attachment link; call the admin attachment URL with a filename that isn't this order's; call it as staff | The order's own file downloads. A foreign or other filename → 404. Staff → 403. Path tricks (`../x`) → 404. | H |
| TC-PAO-35 | Not found and access | — | Open `/{slug}/admin/orders/waste/999999`, `/{slug}/admin/orders/foo/1`; open a valid details URL as staff | "Order not found" with Back for the first two. Staff are redirected by the admin layout. | M |
| TC-PAO-36 | Orders tab only on Sunai | Partner Admin of Sunai; Partner Admin of another org (e.g. pratham); System Admin | Open each org's admin area | Sunai PA and SA-on-Sunai see **Orders** after Feedback Form. The other org's PA sees no Orders tab, and SA viewing another org sees no Orders tab. | H |
| TC-PAO-37 | Order Placement menu only for Sunai staff | Sunai staff; another org's staff | Open each staff dashboard | Sunai staff see Order Placement; the other org's staff don't. The Sunai Partner Admin still doesn't see it (unchanged). | H |
| TC-PAO-38 | Direct URL / API on another org → not found | Other-org PA / staff; System Admin | Open `/{other}/admin/orders`, `/{other}/admin/orders/waste/1`, `/{other}/staff/order-placement/order`; call `/api/v1/partner/orgs/{other}/admin/orders` and `/orgs/{other}/order-placement/orders` | Pages show not-found. The API returns **404** for everyone including SA. Sunai's pages and API behave exactly as before (TC-PAO-03, TC-PAO-20 still pass). | H |

## 4. Sign-off

**2026-09-25: plan written.** Open questions Q1–Q7 in §2.8 are awaiting answers. The defaults are:
- SA + Partner Admin only;
- read-only;
- 20 per page;
- staff who have placed orders;
- CSV = table columns + Order ID + Details, all filtered rows;
- existing meal labels;
- Open + the 7 statuses.

**Prior decision this touches:** 2026-09-19, "Admin fully blocked, staff only" (`PartnerOrgNav.tsx`, `requireOrgStaffOnly()`). This plan keeps that rule for the staff module and all writes, and adds a separate read-only admin view, as the user asked on 2026-09-25.

_Answers:_ see below.

**2026-09-25: answers from the user.**

> 1. only system admin and partner admin
> 2. it is mostly view only but the status should also be editable
> 3. 10 per page
> 4. only staff who have placed orders
> 5. for csv look ss also the csv is filter dependent
> 6. keep what service we have currently
> 7 same

_(Screenshot 3 attached to answer 5, the CSV column format; quoted in §1.)_

What each answer means for the plan:
- **Q1:** SA + Partner Admin via `requireOrgAccess()`. Vendor Admin is excluded, **as the default proposed**.
- **Q2:** view-only, **except Status, which is editable**. This **differs from the default** (read-only). Added:
  - `PATCH …/admin/orders/:group/:id/status`, validated per group;
  - a status control inside the view modal;
  - TC-PAO-27–29.

  This reverses a little more of the 2026-09-19 "admin fully blocked" decision than proposed, and is built as asked. Staff write routes are still untouched.
- **Q3:** **10 per page**. This **differs from the default** of 20.
- **Q4:** only staff who have placed orders, **as the default proposed**.
- **Q5:** CSV columns exactly as screenshot 3, and the export follows the current filters. This **replaces the proposed default**. The difference is that Details is included but not as the last column, and Amount is a plain number. A new **Q8** covers the Order ID format.
- **Q6:** current services only; no "Lunch". **As the default proposed.**
- **Q7:** "Open" plus the 7 statuses. **As the default proposed.**

**2026-09-25: go-ahead with a constraint.**

> yes and make sure you build it in a way that it does not afect the other working code meaning just do it properly

Consequences for §2:
- the shared-query refactor of the staff `listOrders` is dropped;
- the staff detail-modal extraction is dropped;
- the admin feature is built in new files (§2.5 revised), and existing files get additive edits only.

Verification includes a regression check that the staff Orders module behaves exactly as before (TC-PAO-20).

**2026-09-25: feedback after the first build: separate edit-status button.**

> you have not added the edit status button also status button is dependent on the service group

_(Screenshot 4: the Action column with 👁 and ✏ on every row. Screenshot 5: an "Edit Status — Priya Singh · Dry waste" dialog with ✕, a STATUS select showing "Collected", and Cancel / Save.)_

- The first build had put the status control inside the 👁 modal and had no ✏ button. It now has a ✏ **Edit status** button and its own dialog (§2.4).
- "Dependent on the service group": the dialog's options are that order's group statuses only. The backend already enforces this (TC-PAO-28).
- The 👁 modal becomes read-only, so status is edited in one place.
- TC-PAO-16 and TC-PAO-27 are revised, and TC-PAO-30 is added.

**2026-09-25: Order Details page instead of the 👁 modal.**

> for the view button we will have a different page order-details this will look like this
>
> and it is also dependent on the service group

_(Screenshots 6–8 in §1: zero-waste, medical-care and meals variants.)_

- 👁 now opens a dedicated **Order Details page** (§2.4) whose fields depend on the service group. The 👁 modal is removed. TC-PAO-16 is superseded by TC-PAO-31–35.
- The screenshots only show the *care* type of medical order. The *medicine* and *sample* types show their own fields, using the staff Place Order form labels (§2.4). This is a choice made here, flagged to the user.
- Order IDs keep the plan's `MED-` / `MEAL-` / `WST-<id>` format (the screenshots' `k1` / `o1` / `ml1` are example data, per the earlier "focus on the headers" clarification).
- New endpoint: an admin-only attachment download limited to the order's own files (§2.4), because the staff file route is staff-only.

**2026-09-25: medical-type layouts confirmed.**

The user flagged a difference against the prototype (a Home Care Service order). They were asked whether all medical orders should use that one layout, whether to keep the per-type fields, or whether only the breadcrumb should change, and answered:

> oh my bad for not seeing that do nothing

and then:

> we have slight different in our implementation

_(Screenshot: MED-27, a medicine order, showing Medicines, Prescription and Photo of medicine.)_

**Decision:** no change. The per-type medical fields stay (care as in the prototype; medicine and sample with their own fields, §2.4). The breadcrumb stays as-is. The difference from the prototype is known and accepted.

**2026-09-25: Sunai-only restriction.**

> now some new changes we have
> now the orders tab that we added will only be visible to the sunai partner admin and superadmin only
> not any other partners
> and same goes for the
> The Order Placement menu should be visible only to Sunai Partner staff dashboard users. It should not be visible to any other partner.

- Implemented as a **hard org-lock**, following the existing Pratham precedent (§2.4b): menus hidden, pages not-found, and the API returns 404 on any non-Sunai slug.
- The request said "visible". Enforcing on the backend too is a choice made here, flagged to the user: hiding the menu alone would leave the pages and endpoints reachable by URL.
- "Superadmin" reading: the System Admin sees Orders **on Sunai**. On other orgs the feature doesn't exist for anyone, including the System Admin, as with Pratham. Flagged.
- This also restricts the existing staff Order Placement module, a change outside this plan's original scope, so it's recorded here as part of the same change set. The only edit to `order-placement.routes.ts` is one `router.use` line.

**2026-09-25: CSV row shifted a column.**

> also can you check why the sr no 14 data starting form customer column shifting a column ahead

_(Screenshot: the downloaded CSV opened in a spreadsheet; in row 14 (MED-21), every value from Customer onwards sits one column to the right.)_

- **Cause:** MED-21's details are `rtyjukl;`, ending in a semicolon. The CSV was valid (`…,rtyjukl;,Bunty Kumar,…`), but the spreadsheet was set to split on `;` as well as `,` (LibreOffice's import dialog, or Excel in locales with `;` as the list separator). It split that cell, and the rest of the row moved right.
- **Fix:** the admin export now quotes **every** field (`csv-stringify` with `quoted: true, quoted_empty: true`), in `order-placement.admin.controller.ts` only. The shared `toCsv` helper is unchanged, so other exports aren't affected. Headers, column order, value formats and the BOM are unchanged.
- **Verified:** the MED-21 line is now `"7","MED-21",…,"rtyjukl;","Bunty Kumar",…`. All 27 medical rows have exactly 12 columns even when split on both `,` and `;`. The API `tsc` passes. Only a single request was run (the user asked to keep system load low).

**2026-09-25: CSV clarification.**

> the csv data rows were just example dont consider it focus on the headers

- Only screenshot 3's **header row** (names and order) is a requirement.
- The sample values (`k1`, the ₹-less `102`, `Kankarbagh` without a city) are not.
- Q8 is closed with the default Order ID `MED-` / `MEAL-` / `WST-<id>`, and the other value formats are the plan's (§2.2). The §1 note is marked superseded.

## 5. Execution log

**2026-09-25: implementation (uncommitted).**

Files. New:
- API: `order-placement.admin.{schema,service,controller,routes}.ts`;
- frontend: `app/(partner)/partner/(dash)/[slug]/admin/orders/page.tsx`, `components/partner/admin-orders/AdminOrderDetailModal.tsx`, `lib/partner-admin-orders.ts`.

Edits to existing files, **additive only**:
- `partner.routes.ts`: +1 import, +1 `router.use` with a comment (+8 lines, nothing removed);
- `PartnerOrgNav.tsx`: the Orders entry, and the "Order Placement removed" comment updated.

The staff Order Placement service, controller, routes, schema, lib and pages are **unmodified**. `git diff` shows only these two edits among existing files.

Docs updated, per the page-map rule:
- `docs/frontend/partner-portal.md`: §3 row + All-pages row, 207 → 208;
- `docs/api/endpoints.md`: 5 rows (`order-placement.admin.routes.ts:25–29`), counts 383 → 388 and 893 → 898;
- `docs/api/api-structure.md`: the partner modules-row mentions the admin Orders view, since this is a new sub-router mount.

Decisions and findings during the build:
- **Month name:** ICU renders September as `Sept` in `month: 'short'`, even for `en-GB`, and the first CSV came out as "22 Sept 2026". Both the API (CSV) and the page now format `DD Mon YYYY` from numeric IST parts plus a fixed month list.
- **CSV filename:** `Content-Disposition` isn't readable by the browser, because the API is cross-origin and the header isn't CORS-exposed, so the first download saved as `orders.csv`. The page now names the file `orders_YYYY-MM-DD.csv` (IST) itself. The global CORS config was left alone to avoid affecting other code.
- **Excel:** the CSV starts with a UTF-8 BOM (`EF BB BF`, checked on the raw bytes), added in the admin controller only; the shared `sendCsv` is unchanged. This keeps Hindi and ₹ intact in Excel.
- **Date-range check:** the browser's own `min` validation on Date To blocked submit before the page's check ran, so users would have seen a browser tooltip instead of the message that matches the API. Added `noValidate` to the filter form; `min` still guides the picker.
- **React lint rule (`set-state-in-effect`):**
  - the form re-syncs from the URL with React's adjust-state-during-render pattern;
  - the list stores `{key, rows}`, so loading = the result is for a stale key;
  - no `any` types.
- **Nav width:** measured with and without the Orders tab. The admin nav **already wrapped to 2 rows at ≤1600px before this change**. The new tab causes a wrap only in the ~1680px band; it's one row from 1778px up. Not changed, since changing nav spacing would affect every admin page; flagged to the user.
- **Environment:** the VS Code crash stopped PM2's `niwasi-api` and `niwasi-web`. They were restarted with `pm2 start ecosystem.config.js --only niwasi-api,niwasi-web`.
- **Test data:** the status-edit tests changed real local orders and restored them. The status counts per group afterwards are identical to the pre-test snapshot. Only `updated_at` / `updated_by` on the touched rows changed.

Verification:
- `tsc` passes for the API and the frontend; `eslint` passes on the changed frontend files (the API has no lint config); `npm run build` (frontend) compiles, and `/partner/[slug]/admin/orders` is in the route list.
- API suite: 46/46 checks against `http://api.niwasi.abhishek`, with locally signed session tokens for Sunai's Partner Admin (111454), a staff member (147005), System Admin (1), and another org's Partner Admin (pratham, 3556).
- Browser suite: 34/34 checks (Playwright + system Chrome) against `http://partner.niwasi.abhishek`, at 1600px and 390px.

| TC | Result | Notes |
|---|---|---|
| TC-PAO-01 | PASS | Nav order: … Feedback Form ▾ · **Orders** · Staff Dashboard · MOOL … |
| TC-PAO-02 | PASS | Opens `/Sunai/admin/orders`; tab shows active |
| TC-PAO-03 | PASS | 46 orders = 12 + 20 + 8 + 3 + 3 across the 5 creators; the Staff column is filled |
| TC-PAO-04 | PASS | Another org's admin sees 0 Sunai orders (only Sunai has orders locally) |
| TC-PAO-05 | PASS | `23 Sep 2026`; labels not keys; coloured pills; `area, city`; plain status; Medical amount blank |
| TC-PAO-06 | partial | A one-day IST range returns exactly that day's orders. There's no local order between 00:00 and 05:30 IST to exercise the boundary directly; the query anchors at `+05:30` explicitly. |
| TC-PAO-07 | PASS | Newest first |
| TC-PAO-08 | PASS | Name ("Pran") and mobile fragment both match |
| TC-PAO-09 | PASS | Staff filter; dropdown = All + 5 staff, sorted |
| TC-PAO-10 | PASS | Meals = 14 |
| TC-PAO-11 | PASS | Open = 36, all in the open set |
| TC-PAO-12 | PASS | Medical + Collected returns 0 with 200 |
| TC-PAO-13 | PASS | Inline message with no request; the API returns 422 `to: Date to must be on or after Date from` |
| TC-PAO-14 | PASS | Filters in the URL survive reload; Clear resets the fields, the URL and the list |
| TC-PAO-15 | PASS | 10/page; page 5 = S.No 41–46 |
| TC-PAO-16 | PASS | Placed by + `WST-n`; no "Correct details"; only Status editable |
| TC-PAO-17 | PASS | Staff get 403 on list, export, detail and PATCH; the page redirects them to `/Sunai/staff` |
| TC-PAO-18 | PASS | Other admin: 403 on Sunai's slug; 404 for a Sunai id under their own slug (GET and PATCH) |
| TC-PAO-19 | PASS (API) | System Admin gets 200. The UI wasn't opened as System Admin. |
| TC-PAO-20 | PASS | Staff Orders page shows "1–10 of 20" and its modal (with Correct details) still opens; Partner Admin still gets "Access denied"; API: staff list = 20, admin gets 403 on the staff module |
| TC-PAO-21 | PASS | `orders_2026-09-25.csv`; headers exact; Staff + Meals = 8 rows matching the table; no filters = 46 rows; BOM present |
| TC-PAO-22 | partial | The download works on the dev host with the cookie. The logged-out download case wasn't run; the error path is covered by the API's 401 JSON handling in `downloadAdminOrdersCsv`. |
| TC-PAO-23 | partial | Checked via the API only: the other org's list total is 0. The empty-org page and the header-only CSV weren't opened in the UI. |
| TC-PAO-24 | not run | There are no soft-deleted orders locally. Every query filters `deleted_at IS NULL`. |
| TC-PAO-25 | PASS | `staff_id=abc`, `status=Foo`, `group=x`, 151-character `q`, `limit=500` all return 422 |
| TC-PAO-26 | PASS | tsc, eslint, build and docs |
| TC-PAO-27 | PASS | Waste Not collected → Collected → restored; the dropdown lists only waste statuses; Save is disabled until the value changes |
| TC-PAO-28 | PASS | Waste → Completed, medical → Collected, empty, `Foo`, missing, extra field: all 422, and the order is unchanged |
| TC-PAO-29 | PASS | Staff PATCH gets 403; a cross-org id gets 404 |

**2026-09-25: edit-status button (after user feedback, §4).**

Changes:
- New `components/partner/admin-orders/AdminOrderStatusModal.tsx`, following screenshot 5:
  - title `Edit Status — {customer} · {service label}`, ✕ close, STATUS select, Cancel (✕) and Save (💾) buttons;
  - Escape and backdrop click close it;
  - the select lists only the order's group statuses; saving an unchanged value just closes.
- The page's Action column now has 👁 + ✏.
- `AdminOrderDetailModal` is **read-only**: its status control and save logic are removed, and Status is shown as a detail row.
- No backend change: the PATCH already enforced the per-group statuses.

Verification:
- frontend `tsc` passes, `eslint` passes, `npm run build` compiles;
- browser suite **42/42**. Status counts per group afterwards are identical to the pre-test snapshot, since every status change was restored.

| TC | Result | Notes |
|---|---|---|
| TC-PAO-16 (revised) | PASS | The 👁 modal shows Placed by, Order ID and a Status row; no select, no Save, no Correct details |
| TC-PAO-27 (revised) | PASS | ✏ on a waste order: Not collected → Collected (restored after). Waste lists only waste statuses; meals lists only Pending / In Progress / Completed / Cancelled |
| TC-PAO-30 | PASS | Every row has 👁 + ✏. Title `Edit Status — Deepak Pandey · Dry waste` with the current status pre-selected. ✕, Cancel, Escape and backdrop each close without saving (the row is unchanged). A simulated 422 keeps the dialog open with the message. Save updates the row and closes. |

**2026-09-25: Order Details page (after user feedback, §4).**

Changes:
- **New page** `app/(partner)/partner/(dash)/[slug]/admin/orders/[group]/[id]/page.tsx`, following screenshots 6–8:
  - 4-column read-only field grid; grey italic "Null" for empty values; attachments listed as links;
  - Back (top) and Close (bottom) return to `/admin/orders?<back>`;
  - "Order not found" for an unknown id or group.
- **List:** 👁 is now a `<Link>` carrying `?back=<list query>`.
- **Removed:** `AdminOrderDetailModal.tsx` (it had been staged; restage the deletion).
- **Nav:** the Orders entry got `activePrefix`, so it stays highlighted on the details pages. This uses an existing nav option and affects only that entry.
- **API:** new `GET /orgs/:slug/admin/orders/:group/:id/attachments/:filename` (`order-placement.admin.routes.ts:29`; the status PATCH moved to `:30`). It serves a file only if it is one of that order's own attachments.
- **Docs:** `partner-portal.md` has the details-page row and All-pages row (209); `endpoints.md` has the attachment row, with counts 389 / 899.

**Bug found and fixed during testing:** older medicine rows store each medicine's `photo_file` in `items_json` as a **bare filename string**, not a list. The first version of both the attachment check and the "Photo of medicine" field only handled lists, so those photos were missing from the page and returned 404 from the route. Both now accept either form.

Verification:
- `tsc` passes (API and frontend), `eslint` passes, `npm run build` compiles (both `/admin/orders` and `/admin/orders/[group]/[id]` are in the route list);
- API suite 46/46; browser suite **56/56**;
- status counts are identical to the pre-test snapshot.

**Attachment access tests.** The local upload folder has none of these orders' files, so two throwaway files were created in it and deleted afterwards (the folder is back to its 1 original entry):
- order 13's own per-medicine photo → **200 image/png** with `Content-Disposition: attachment`;
- order 2's file that isn't on disk → 404;
- order 13's photo requested via order 2 → 404;
- an unrelated upload → 404;
- `../../etc/passwd` → 404;
- wrong group → 404;
- staff → 403; another org's admin → 403; no cookie → 401.

| TC | Result | Notes |
|---|---|---|
| TC-PAO-31 | PASS | 👁 is a link to `/Sunai/admin/orders/waste/5?back=group%3Dwaste`; the page shows "Order Details" and Back; the Orders tab stays highlighted |
| TC-PAO-32 | PASS | Field order is exact for zero waste (screenshot 6), medical care (7) and meals (8), plus medicine (Medicines / Prescription / Photo of medicine) and sample (Patient age / Patient gender / Tests / Prescription). Values: `WST-5`, `22 Sep 2026`; an empty attachment shows "Null" |
| TC-PAO-33 | PASS | Back → `?group=waste` restored; Close from page 2 → `?page=2`; with no `back`, Back goes to `/Sunai/admin/orders` |
| TC-PAO-34 | PASS | Medicine order 13: prescription + per-medicine photo links point at the admin route; access rules as listed above |
| TC-PAO-35 | PASS | `waste/999999` and `foo/1` show "Order not found"; staff opening `/Sunai/admin/orders/waste/5` are redirected to `/Sunai/staff` |

**2026-09-25: Order Details page + admin attachment route (after user feedback, §4).**

Changes:
- **New page** `app/(partner)/partner/(dash)/[slug]/admin/orders/[group]/[id]/page.tsx`, following screenshots 6–8:
  - the common 9 fields, then the group's own fields;
  - Medical splits into care / medicine / sample (§2.4);
  - empty values show grey italic "Null"; attachments are links;
  - Back and Close go to `/{slug}/admin/orders?<back>`;
  - an unknown group or id shows "Order not found".
- **List:** 👁 is now a `<Link>` that carries the list query as `?back=`. `AdminOrderDetailModal.tsx` is **deleted**; nothing else used it.
- **Nav:** the Orders entry gained `activePrefix`, so the tab stays highlighted on details pages. This is only on that entry, so no other nav item's behaviour changed.
- **API:** `GET …/admin/orders/:group/:id/attachments/:filename` (`order-placement.admin.routes.ts:29`; the status PATCH moved to `:30`). It serves a file only if it's one of that order's own attachments, looked up within the org.
- **Bug found and fixed during testing:** older medicine rows store each medicine's `photo_file` as a **bare filename string**, not a list. The first build ignored it, so the resolver returned 404 and the page hid the photo. Both the API (`orderFiles`) and the page now accept either form.
- **Docs:**
  - `partner-portal.md`: the `/admin/orders/[group]/[id]` feature row + All-pages row, 208 → 209;
  - `endpoints.md`: the attachment row, the PATCH line updated to `:30`, counts 388 → 389 and 898 → 899.

Verification:
- API and frontend `tsc` pass; `eslint` passes on the changed frontend files; `npm run build` compiles, with `/partner/[slug]/admin/orders/[group]/[id]` in the route list.
- API suite 46/46. Attachment rules, tested with two **temporary** files that were deleted afterwards (the upload folder is back to its one original entry):
  - the order's own per-medicine photo returns 200 `image/png` with `Content-Disposition: attachment`;
  - another order's file, an unrelated upload, `../` traversal and the wrong group all return 404;
  - staff and another org's admin get 403; no cookie gets 401.
- Browser suite 56/56.
- Status counts per group are identical to the pre-test snapshot.

| TC | Result | Notes |
|---|---|---|
| TC-PAO-31 | PASS | 👁 href `/Sunai/admin/orders/waste/5?back=group%3Dwaste`; the page shows "Order Details" and Back; the Orders tab is highlighted |
| TC-PAO-32 | PASS | Field labels, in order, match screenshot 6 (waste), 7 (care) and 8 (meals) exactly. Medicine = common + Medicines, Prescription, Photo of medicine. Sample = common + Patient age, Patient gender, Tests, Prescription. `WST-5`, `22 Sep 2026`; an empty Attach reports shows "Null". |
| TC-PAO-33 | PASS | Back returns to `?group=waste` with the filter set; Close from page 2 returns to `?page=2`; without `?back` the link is `/Sunai/admin/orders` |
| TC-PAO-34 | PASS | See the attachment rules above; the medicine page shows 2 attachment links, both on the admin route |
| TC-PAO-35 | PASS | `waste/999999` and `foo/1` show "Order not found"; staff opening a details URL are redirected to `/Sunai/staff` |

**Environment note:** a second system crash stopped PM2's `niwasi-api` and `niwasi-web` mid-session. They were restarted once for testing, then left running. At the user's request, no further heavy runs (builds, browser suites) were done after the crash.

**2026-09-25: Sunai-only restriction (§2.4b).**

Changes:
- **API:**
  - new `sunai-org.ts` (`isSunaiSlug`, `requireSunaiOrg`);
  - **+1 `router.use(BASE, requireSunaiOrg)`** in `order-placement.routes.ts` (with an import and a comment, +5 lines, no other change) and in `order-placement.admin.routes.ts`.
- **Frontend:**
  - new `lib/sunai-org.ts`;
  - `PartnerOrgNav.tsx`: the Orders entry is wrapped in `isSunaiSlug(slug)`;
  - `PartnerStaffNav.tsx`: the Order Placement condition becomes `!isPartnerAdmin && isSunaiSlug(slug)`;
  - new `admin/orders/layout.tsx` (server): `notFound()` for other slugs;
  - `staff/order-placement/layout.tsx`: +`notFound()` for other slugs.
- **Docs:**
  - `endpoints.md`: `requireSunaiOrg` added to the Guards of all 38 affected rows (32 Order Placement + 6 admin Orders), with source line numbers recomputed from the route files;
  - `api-structure.md`: a middleware-table row;
  - `partner-portal.md`: "Sunai only" noted on the Order Placement section and the `/admin/orders` row.

Verification (kept light at the user's request: typecheck, lint on changed files, curl; **no build and no browser run**):
- API and frontend `tsc` pass.
- `eslint` passes on the new and changed files. The only findings are in `staff/order-placement/layout.tsx`: the **4 pre-existing** rules-of-hooks errors (Partner Admin early return), identical in the committed version. The added `notFound()` introduces none.
- curl results:

| Caller → route | Expected | Got |
|---|---|---|
| Sunai PA / SA → `Sunai/admin/orders` (also lowercase `sunai`) | 200 | 200 |
| pratham PA / SA → `pratham/admin/orders`, `/export` | 404 | 404 |
| Sunai staff → `Sunai/order-placement/orders`, `/dashboard` | 200 | 200 |
| SA / pratham PA → `pratham/order-placement/*` | 404 | 404 |
| Sunai PA → `Sunai/order-placement` (unchanged rule) | 403 | 403 |
| staff → `Sunai/admin/orders` (unchanged rule) | 403 | 403 |
| unrelated: `Sunai/staff-portal`, `pratham/dashboard` | 200 | 200 |

TC-PAO-38 (API part): PASS. TC-PAO-36, TC-PAO-37 and the page part of TC-PAO-38 are **not run** (no browser run, to keep load low); the code paths are in place.

Still to do before `shipped`:
- the partial / not-run rows above (06, 19 in the UI, 22 logged-out, 23 in the UI, 24);
- commits in both submodules and the parent (plan + docs + submodule pointers);
- promoting §3 to `docs/testing/TEST_CASES.md`.

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- SRS row: none.
- TEST_CASES: TC-PAO-01..26, to be promoted to `docs/testing/TEST_CASES.md` on ship.
- Page maps / API docs to update: `docs/frontend/partner-portal.md`, `docs/api/endpoints.md`.
- Related code: `apps/api/src/modules/partner/order-placement.*`, `apps/frontend/app/(partner)/partner/(dash)/[slug]/staff/order-placement/**`, `apps/frontend/lib/partner-order-placement.ts`.
- Missing design doc cited by the code: `docs/order-placement-rebuild-plan.md` (not in the repo).
- Follow-up tasks (§2.7): the catch-up migration for `copied_from_customer_id` + `opc_partner_mobile_creator_uq`, and the staff Orders page fixes.
