# Test cases

The registry of shipped test cases. A feature's cases are designed in its planning file
(`docs/planning/features/<date>-<slug>.md` §3) before implementation and copied here verbatim
when it ships (see "Working Rules" in `AGENTS.md`). Superseded or dropped cases stay in the
planning file only, as history.

## Mitram Rasoi

Standalone static page at `/mitram-rasoi`, linked from the home page's Extensions section.
Source: [2026-09-24-mitram-rasoi-page.md](../planning/features/2026-09-24-mitram-rasoi-page.md) §3,
shipped 2026-09-24. TC-MR-01..05 were superseded or dropped before ship (they covered a removed
nav tab) and are only in the planning file.

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-MR-06 | Direct URL and refresh | — | Open `http://niwasi.abhishek/mitram-rasoi` directly, then refresh | Page renders standalone: the Mitram sticky header at the top, the Mitram footer at the bottom, and no Niwasi header, top bar or footer. HTTP 200, no login prompt. | H |
| TC-MR-07 | Content parity with prototype | Prototype open side by side | Compare section by section | Same sections in the same order, same Hindi text (character for character), same phone numbers, same chips, same checklist items. No lorem ipsum or English substitutions. **One exception:** the prototype's last footer line ("मित्रम रसोई — शुद्ध शाकाहारी रसोई, NH 31, बलिया। रंग व चिह्न मित्रम रसोई के डिज़ाइन सिस्टम से।") and its divider are removed, by request (plan §6, 2026-09-25). | H |
| TC-MR-08 | All images load | DevTools → Network | Load the page | All 6 images load (no 404) directly from `/_next/static/media/…` (static imports from `_assets/`, served `unoptimized`, see §5). The hero image is not lazy-loaded. Every `<img>` has its prototype alt text. No layout shift as images load, since width and height come from the static import. | H |
| TC-MR-09 | In-page anchors clear the sticky header | Desktop | Click मेन्यू, उत्सव व बैठक, संपर्क in the Mitram header, and हॉल बुक करें in the hero | The header stays pinned while scrolling, and no heading is hidden under it. **मेन्यू:** the eyebrow "मेन्यू की झलक" lands about 16px below the header. **उत्सव व बैठक / हॉल बुक करें:** the eyebrow "बुकिंग" lands about 16px below the header, with no light strip between the header and the maroon section. **संपर्क:** scrolls to the page bottom (it's the last block). _(Offsets revised on request, 2026-09-24; see §4. An interim "events land where संपर्क lands" build was reverted.)_ | M |
| TC-MR-10 | Call links | Phone, or desktop with a tel: handler | Tap the call pill and both "कॉल करें" buttons | Each opens the dialler with `+91 70616 53559`. | H |
| TC-MR-11 | Copy button, secure context | Open via `http://localhost:3016/mitram-rasoi` or prod HTTPS | Click "कॉपी करें" on each phone row, then paste | Clipboard holds `70616 53559` and `7070 819 777` respectively. The label shows `कॉपी हो गया` and goes back to `कॉपी करें` after about 1.6s. | M |
| TC-MR-12 | Copy button, insecure context | Open via `http://niwasi.abhishek/mitram-rasoi` | Click "कॉपी करें" on each phone row, then paste | Clipboard holds the right number (fallback path). The label shows `कॉपी हो गया` and goes back after about 1.6s, with no console error. _(Revised 2026-09-24: it previously expected `नंबर चुनें`.)_ | M |
| TC-MR-13 | Copy button spam | secure context | Click one copy button 10 times quickly | The label never gets stuck on the success or failure text. It ends on `कॉपी करें` about 1.6s after the last click, and nothing throws. | L |
| TC-MR-14 | Fonts self-hosted, Devanagari renders | DevTools → Network, filter "font" | Load the page | Headings are in Yatra One and body in Hind. No request to `fonts.googleapis.com` or `fonts.gstatic.com`. No tofu boxes, and conjuncts (त्र, श्र, ड्ड) render correctly. | M |
| TC-MR-15 | Fonts and theme don't leak site-wide | — | (a) Hard-load `/` and `/aboutUs` and check Network. (b) In one tab, open `/` then `/mitram-rasoi`, press Back, and from `/` use the nav to go client-side to `/aboutUs` and `/contact`. | (a) No Yatra One, Hind or Rajdhani font files are requested. (b) After leaving the page, the other pages look exactly as before: no maroon/cream colours, no Mitram fonts, and no `--mr-*` variables on `:root` or `body` (check with DevTools → Computed). _(Step (b) reworded on ship: the page has no links out, and the Extensions card opens a new tab, so Back in the same tab is the only way to leave it client-side.)_ | M |
| TC-MR-16 | Responsive layout | — | View at 375, 640, 800, 1080 and 1440px | ≤800px: hero and events stack to one column with the photo first. ≤720px: the header nav hides, the call pill shows only its icon, and the contact grid is one column. ≤640px: menu grid is 1 column, every card full width (revised 2026-09-24; it was 2 columns with the first card spanning both). No horizontal scroll at any width. | H |
| TC-MR-17 | Not reachable on partner/event hosts | — | Open `http://partner.niwasi.abhishek/mitram-rasoi` and `http://event.niwasi.abhishek/mitram-rasoi` | Neither shows the Mitram page. Event returns its 404. Partner returns 200 with its own `Partner of Niwasi` page, because the partner portal's `[slug]` route catches any single segment (`/some-random-slug` does the same); that's existing partner behaviour. _(Expected result corrected 2026-09-24 on first run; it said "both 404".)_ | L |
| TC-MR-18 | Same page for guest and logged-in, no API call | DevTools → Network (Fetch/XHR) | Load `/mitram-rasoi` logged out, then logged in | Page is identical in both states, with no Login/Dashboard UI. **Zero** requests to the API; in particular no `GET /api/v1/auth/me`, because the Niwasi Header isn't mounted. | M |
| TC-MR-19 | Keyboard and a11y | — | Tab through the page | Same 10 focus stops as the prototype, in visual order: logo link, the 3 header links, call pill, the 3 CTA buttons, the 2 copy buttons. Focus styles match the prototype: the browser's default ring on the header links and call pill (the prototype has no rule for them), and a 3px solid yellow `#ffed00` ring with a 2px offset on the CTA and copy buttons. The page content has `lang="hi"`. There's exactly one `<header>` and one `<footer>` landmark, both Mitram's. _(Expected result made precise on ship.)_ | M |
| TC-MR-20 | Build, typecheck, lint, console clean | — | `npm run build`, and `eslint` on the changed files, in `apps/frontend`; load the page with DevTools open | Build passes, and lint reports nothing for this feature's files. A full `npm run lint` fails on 4 existing problems in files this feature doesn't touch. The build's route list shows `/mitram-rasoi` as static (○). No console errors or hydration warnings on the page. | H |
| TC-MR-21 | Private folders aren't routes | — | Open `/mitram-rasoi/_components`, `/mitram-rasoi/_components/Hero`, `/mitram-rasoi/_assets/logo-seal.png` | All three return the Niwasi 404. None renders a component or serves the raw image file. | M |
| TC-MR-22 | Feature is self-contained | Implementation done | `git diff --stat 8f7a9d2..HEAD` in `apps/frontend` | The only changed paths outside `app/(niwasi)/(public)/mitram-rasoi/` are `app/(niwasi)/(public)/page.tsx` (Extensions card), `app/(niwasi)/(public)/layout.tsx` and `components/layout/PublicChrome.tsx` (new). `components/layout/Header.tsx`, `globals.css` and `public/` are untouched. _(Revised on ship: the nav tab in `Header.tsx` was replaced by the Extensions card.)_ | L |
| TC-MR-23 | No route back on the page | On `/mitram-rasoi` | Look for any link to Niwasi. Then (a) open the page from the Extensions card, and (b) open `/` then `/mitram-rasoi` in the same tab and press Back | There's no Niwasi logo, link or back button anywhere on the page (the only links are in-page anchors and `tel:`). (a) The card opens a new tab with no history, so Back is disabled there, and the Niwasi tab is still open behind it. (b) Back returns to `/`. _(Restored 2026-09-24 after the Back to Niwasi button was removed, §4; (a) added on ship because the entry point moved to the new-tab card.)_ | M |
| TC-MR-24 | Other public pages unaffected | — | Open `/`, `/aboutUs`, `/contact`, `/sabha`, `/login`, `/join`; also go client-side from `/mitram-rasoi` back to `/` with browser Back | Each shows the Niwasi top bar, header and footer exactly as before. After going Back from `/mitram-rasoi`, the header and footer reappear without a refresh, and the header's Login/Dashboard state loads correctly. Paths that only look similar, e.g. `/mitram-rasoi-x`, still get the Niwasi chrome (they 404 inside it). | H |
| TC-MR-25 | Header has no Mitram Rasoi tab | — | Open `/` at ≥1024px, then open the ☰ menu at <1024px | Nav reads `… Need & Help · Event · Mitram Kitchen · MOOL · Contact` in both, with no Mitram Rasoi. Spacing is the original `px-4`. | H |
| TC-MR-26 | Extensions shows the Mitram Rasoi card | — | Open `/` and scroll to EXTENSIONS | 7 cards: PARTNER, Project for Students, INFO, HELP, CBO, समुदाय वेबसाइट, Mitram Rasoi (seal logo). The Mitram card shows the caption "Home-cooked meals from local kitchens." under the seal, inside the card. The six placeholders are faded (opacity 0.5) exactly as before; Mitram Rasoi is at full opacity. | H |
| TC-MR-27 | 4 per row | — | View EXTENSIONS at 1797, 1280, 1024, 768, 767 and 375px | ≥768px: 4 columns, rows 4 + 3. <768px: 2 columns, rows 2 + 2 + 2 + 1. No horizontal scroll. | H |
| TC-MR-28 | Card opens in a new tab | — | Click the Mitram Rasoi card | A **new tab** opens at `/mitram-rasoi` (standalone page). The original tab stays on `/`. `window.opener` is `null` in the new tab (`rel="noopener noreferrer"`). | H |
| TC-MR-29 | Placeholders stay non-working | — | Click each of the six faded logos | Nothing happens: no navigation and no pointer cursor, as before. | M |

## Partner Admin Orders

Sunai-only Partner Admin **Orders** tab (every staff member's Order Placement orders), the Order Details page, ✏ status edit and filter-dependent CSV. Also covers the Sunai-only lock on the staff Order Placement module.
Source: [2026-09-25-partner-admin-orders.md](../planning/features/2026-09-25-partner-admin-orders.md) §3, shipped 2026-09-25 (recorded 2026-09-28).
TC-PAO-16 (the old 👁 modal) was superseded before ship and is only in the planning file.

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

## Partner Masters (Sunai-only)

Sunai-only partner masters under Master: **Material and Expense Head**, **Center Name** and **Quantity Unit** (list, Add/Edit, Activate/Deactivate, no delete).
Source: [2026-09-29-partner-sunai-masters.md](../planning/features/2026-09-29-partner-sunai-masters.md) §3, shipped 2026-09-29.
Validation limits changed 2026-09-30 (plan §6): TC-PSM-14 and TC-PSM-16 are superseded by TC-PSM-36 and TC-PSM-37 (kept in the planning file only).
`<M>` means the case is run for each of the three masters. The 404 cases apply to the page URL

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
| TC-PSM-15 | Center code must be a whole number | Add Center | Enter `abc`, `-5`, `1.5`, `1e3`, `0`, `4294967296` | Each rejected inline; API 422 for each | H |
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
| TC-PSM-34 | Translation wrapped | `NEXT_PUBLIC_I18N_ENABLED` on; a Hindi `label_text` row added via the Language admin for "Center Name" | Switch to हिं | That label shows in Hindi; strings without a row stay English; master data values unchanged | L |
| TC-PSM-35 | Timestamps set on create/edit | Sunai admin | Create a row, then edit it; check the DB | API sets both on create, and only `updated_at` on edit / toggle; the values match the real time (not 5h30m off); the columns have no DB default | L |
| TC-PSM-36 | Name length limits (2026-09-30) | Add / Edit modal, per master | Head Name 100 / 101 chars; Center Name 100 / 101; Unit Name 50 / 51; Short Code 20 / 21 | 100 / 100 / 50 / 20 saved; the inputs stop at those lengths; 101 / 101 / 51 / 21 sent to the API → 422 on that field | H |
| TC-PSM-37 | Center Code range 1–99999 (2026-09-30) | Add Center | Code 99999; 100000; 0 / 00000; `00016` | 99999 saved; 100000 and 0 → inline "Center Code must be between 1 and 99999." and API 422; the input stops at 5 digits; `00016` saved as 16 | H |

## Daily Activity Report (Sunai-only)

Sunai staff **Daily Activity Report** (Reports and Tracking → Daily Reports; own reports: add, view, edit, no delete) and the Partner Admin **Reports → Daily Activity Report** tab (every staff member's reports, read-only, filter-dependent CSV).
Source: [2026-09-30-daily-activity-report.md](../planning/features/2026-09-30-daily-activity-report.md) §3, shipped 2026-09-30.
The staff menu is shown only to designations with `reports.view` (a known limitation the user chose to leave); the page itself is open to any active Sunai member.
"Staff" means an approved Sunai staff member (not the Partner Admin). The 404 cases apply to

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
| TC-DAR-12 | Only required fields | Staff | Date only (everything else blank) → Save | Saved; empty columns are blank (was "—", changed 2026-09-30) | H |
| TC-DAR-13 | Date required | Add form | Clear the Date → Save | Inline "Date is required."; API 422 on `report_date` | H |
| TC-DAR-14 | Date defaults to today | Staff | Open Add Report | Date is prefilled with today's date (IST); it can be changed | H |
| TC-DAR-15 | Past and future dates allowed | Add form / edit form | Save with a date last month, then with a date next month; edit a report's date | All saved; the edited date is kept | H |
| TC-DAR-16 | Invalid date | API | `report_date` "2026-02-30" / "30-09-2026" / "abc" | 422 | M |
| TC-DAR-17 | End before start | Add form | Start 16:00, End 08:00 (and End = Start) | Inline "End time must be after the start time."; API 422 on `work_end_time` | H |
| TC-DAR-18 | Only one time given | Add form | Start 08:00, End blank | Saved | M |
| TC-DAR-19 | Invalid time | API | `work_start_time` "24:00" / "8:5" / "08:60" | 422 | M |
| TC-DAR-20 | Text max length | Add form / API | Work Done / Next Plan / Items Sold with 151 characters (and exactly 150) | 151: inputs stop at 150; API 422 if sent directly. 150: saved | M |
| TC-DAR-21 | Whitespace handling | Staff | Next Plan "   " → Save; reopen | Stored as empty (NULL); view shows a blank value (was "—", changed 2026-09-30) | L |
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

## Daily Mitram Expense (Sunai-only)

Sunai staff **Daily Mitram Expense** (Reports and Tracking → Daily Reports; own reports with item rows: add, view, edit, no delete) and the Partner Admin **Reports → Daily Mitram Expense** tab (every staff member's reports, read-only, CSV with one row per item). Only master ids are stored, so reports show the masters' current names.
Source: [2026-09-30-daily-mitram-expense.md](../planning/features/2026-09-30-daily-mitram-expense.md) §3, shipped 2026-09-30.
"Staff" means an approved Sunai staff member. The pre-condition for the form cases is at least

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
| ~~TC-DME-11~~ | **Superseded 2026-09-30** (warning removed). Empty master | No active centers | Open Add Expense | The "No active centers…" message; can't save | M |
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
| TC-DME-49 | Inactive master shown as "(inactive)" (2026-09-30) | A report whose material / unit / center was deactivated after saving | Open the staff and admin lists, both view pages, and the CSV | The name shows with " (inactive)" in the Items summary, the Center Name column, the view page and the CSV Material / Quantity Unit / Center Name columns; the center code stays a plain number; nothing is hidden | M |

## Report status + soft delete (Sunai daily reports)

The `status` column (1 active / -1 soft-deleted) on the Daily Activity Report, Daily Mitram Expense and expense-item tables; every read is limited to status 1. The Daily Mitram Expense edit ✕ soft-deletes an item instead of deleting it.
Source: [2026-09-30-report-status-soft-delete.md](../planning/features/2026-09-30-report-status-soft-delete.md) §3, shipped 2026-09-30.

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

## Daily Meal and Income Report (Sunai-only)

Sunai staff **Daily Meal and Income Report** (Reports and Tracking → Daily Reports; own reports in six sections: add, view, edit, no delete) and the Partner Admin **Reports → Daily Meal and Income Report** tab (every staff member's reports, read-only, CSV with all 17 fields).
Source: [2026-09-30-daily-meal-income-report.md](../planning/features/2026-09-30-daily-meal-income-report.md) §3, shipped 2026-09-30.
"Staff" means an approved Sunai staff member. The 404 cases apply to the page (not-found) and

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
| TC-DMI-12 | Date only | Staff | Only the Date → Save | Saved; empty columns are blank (was "—", changed 2026-09-30) | H |
| TC-DMI-13 | Date defaults to today | Staff | Open Add Report | Date = IST today, editable | H |
| TC-DMI-14 | Date required / invalid | Form / API | Clear the date; API `2026-02-30`, `30-09-2026` | Inline "Date is required."; API 422 | H |
| TC-DMI-15 | Past / future dates | Staff | Save last month and next month; edit the date | All saved | M |
| TC-DMI-16 | Count range | Form / API | Morning Tiffin = 0, 99999, 100000, -1 | 0 and 99999 saved; 100000 and -1 → inline error / 422 on that field | H |
| TC-DMI-17 | Counts are whole numbers | Form / API | Evening Mess = 2.5 | Rejected ("whole number"); the input accepts digits only | H |
| TC-DMI-18 | Money range and decimals | Form / API | Cash Payment = 0, 99999, 99999.99, 100000, 12.5, 12.345, 1e3, abc | 0, 99999 and 12.5 saved; 99999.99 → rejected (above 99999); 100000, 12.345 (3 decimals), 1e3 and abc → rejected | H |
| TC-DMI-19 | Decimal round-trip | Staff | Online Payment 850.50 | Reads back 850.5 in the view, edit and CSV | M |
| TC-DMI-20 | Text max 150 | Form / API | Each text field at 150, then 151 | 150 saved; the input stops at 150 with an `n/150` counter; 151 via the API → 422 on that field | M |
| TC-DMI-21 | Blank → empty | Staff | Numbers left empty, text of only spaces | Stored NULL; shown blank, not 0 (was "—", changed 2026-09-30) | M |
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
