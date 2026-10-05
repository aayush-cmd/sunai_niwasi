# Ham Niwasi site (`/ham-niwasi`)

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-10-01 |
| Shipped | |
| SRS row | — |
| Test cases | TC-HN-01..23 |
| Prototype todo | — |

## 1. Requirement (as given)

> in this page header and footer
> http://niwasi.abhishek/
> it will be added like this
> Ham Niwasi
> opens in new page
> url will be app /ham-niwasi
>
> there are some forms in the prototype but for now we are only focusing on the frontend so work only the frontend
> also add the prototype and assets in the
> /home/triline27/myproject/sunai_niwasi/docs/prototype
> new folder ham-niwasi
> prototype
> file:///home/triline27/Downloads/Niwasi/niwasi-app/public/ham-niwasi/index.html

**Screenshots shared (2026-10-01):**
- **Footer → PLATFORM column:** `› Home · › About Niwasi · › Niwasi Action · › Need & Help · › Ham Niwasi · › Contact Us`. Ham Niwasi sits between Need & Help and Contact Us.
- **Header main nav:** `Home · About Niwasi · Niwasi Resources ▾ · Niwasi Action · Need & Help · Extensions · Ham Niwasi · Contact us`. Ham Niwasi sits after "Extensions", before "Contact us". Today's nav has `… Need & Help · Event · Mitram Kitchen · MOOL · Contact`, and there is no "Extensions" item. See Q2.

The user also asked, before this requirement, to follow the Mitram Rasoi pattern: "we are going to build a new route in the similar patter". See [2026-09-24-mitram-rasoi-page.md](2026-09-24-mitram-rasoi-page.md).

**Prototype:** `/home/triline27/Downloads/Niwasi/niwasi-app/public/ham-niwasi/`. It was copied unchanged to `docs/prototype/ham-niwasi/` on 2026-10-01 (70 files, 41 MB). It's a **multi-page, all-Hindi static site**, not a single page:
- **Pages:** 27 HTML pages: `index.html` and 26 sub-pages. _(First counted as 29 / 28; corrected 2026-10-01 when writing the page map.)_
  - **Info pages:** impact, abhiyaan, mulya, niwasi-sabha, samajik-udyami, gallery, testimonials, faq, help, kaaryashala, hamniwasi-program, ethical-foundation, sunai-consultancy, mitram-kitchen-store, niwasi-sabha-champion, collaborating-donors, train-samajik-udyami, resident-application.
  - **Contact pages, each with a form:** contact-sabha, -neighborhood, -social, -training, -help, -business, -donate.
  - **Login:** `login.html`.
- **CSS:** Bootstrap 5.3 and Font Awesome 6/7 from CDNs, plus a 6,050-line `style.css` and heavy inline `style=""` (up to 95 per page).
- **JS:** a 520-line `script.js`, which drives:
  - the hero carousel (5 slides);
  - a sticky two-row navbar;
  - the "संपर्क करें" dropdown;
  - a top-sliding search overlay;
  - a side drawer;
  - 3 modal forms on index (participation, time suggestion, topic suggestion);
  - the registration form;
  - scroll-spy and scroll-to-top.
- **Assets:** 41 MB.
  - **Large PNGs:** about 20 between 0.5 and 3.8 MB, e.g. `bahar.png` 3.8 MB, `abhiyaan3.png` 3.5 MB, `Hero1.png` 2.9 MB.
  - **Videos:** `gallery/video4.mp4` (11.5 MB) and `video5.mp4` (3.8 MB).
- **Forms:** 9 pages, 11 forms in total (index has 3).

## 2. Plan

### 2.1 Rule-by-rule (AGENTS.md)

| Rule | Applies? | Notes |
|---|---|---|
| Frontend ↔ backend validation mirror | **Deferred** | Frontend only, by instruction. The forms render with the prototype's own field rules (`required`, `type="tel"`/`email`) and send nothing. When a backend is built later, its validation must mirror these, and a new plan covers that (Q5). |
| DB schema change → dated `.sql` | No | No DB and no endpoint. |
| New test cases up front | **Yes** | §3. |
| Page maps and API docs in sync | **Yes** | `docs/frontend/niwasi-portal.md` gets a §1 Public pages entry plus one All-pages row per ported page (count goes up by the number of routes built). Header and footer links are noted. No `docs/api/*` change. |
| Translation layer | **Exempt** | Fixed single-language (Hindi) static content, like `/mitram-rasoi`. Not wrapped in `t()`, pending Q6. The new "Ham Niwasi" label in the Niwasi Header and Footer is an English label. Neither component uses `t()` today (no existing nav label is wrapped), so it isn't wrapped either. |
| No AI-attribution trailers | Yes | |
| Sensitive files never in git | Yes | Only static images, TSX and the prototype copy. Stage by explicit path. |
| Reactivation discipline | Done | Grepped `docs/planning/features/` for "ham-niwasi"/"Ham Niwasi". The only hits are the partner-portal *Ham Niwasi daily report* plans (staff reports), which are unrelated. The Mitram Rasoi plan is the pattern to follow. |

### 2.2 Route and structure (Mitram Rasoi pattern)

- **Base URL:** `/ham-niwasi` on the main host. Folder `apps/frontend/app/(niwasi)/(public)/ham-niwasi/`, inside `(public)`, exactly like Mitram.
- **Standalone:** add `"/ham-niwasi"` to `STANDALONE_PATHS` in `components/layout/PublicChrome.tsx`.
  - The existing prefix match (`/ham-niwasi/…`) already covers sub-pages.
  - On these paths the Niwasi top bar, Header and Footer are not rendered; the prototype's own two-row navbar and footer are the shell.
  - This is the only change to `PublicChrome.tsx`.
- **Sub-pages (if Q1 = all pages):** one route folder per prototype page, without the `.html`: `/ham-niwasi/impact`, `/ham-niwasi/faq`, `/ham-niwasi/contact-sabha`, and so on. Every internal `*.html` link in the prototype maps to the matching route. `index.html` becomes `/ham-niwasi`, and `#anchors` stay as in-page anchors.
- **Folder tree (planned):**
  ```
  app/(niwasi)/(public)/ham-niwasi/
  ├── layout.tsx                # fonts, .theme class, lang="hi", shared navbar + footer + overlays
  ├── page.tsx                  # index (hero carousel, vision, discussion cards, appeal…)
  ├── ham-niwasi.module.css     # brand tokens only (.theme { --hn-*: … })
  ├── <sub-page>/page.tsx       # one folder per prototype page (Q1)
  ├── _components/              # MainNavbar, SecondNavbar (contact dropdown), SearchOverlay,
  │                             # SideDrawer, HeroCarousel, SessionCards, FormModal,
  │                             # ContactForm, HamFooter, ScrollToTop, icons.tsx, ui.ts
  └── _assets/                  # prototype images, statically imported
  ```
  - ~~**Shared shell in the layout:** unlike Mitram (one page), the navbar, drawer, search and footer are identical on every prototype page, so they live in `ham-niwasi/layout.tsx` once instead of being repeated in 29 pages.~~ _Superseded on build: the header differs per page, so it's rendered per page (§2.4b)._
  - **Client components:** everything stays a server component except the interactive pieces, which are `"use client"`: carousel, dropdown, drawer, search overlay, modals, forms and scroll-to-top.
- **Metadata:** each page exports `metadata` with the prototype's `<title>`. For example, index is `"हम निवासी - Niwasi"`.

### 2.3 Niwasi Header and Footer entries

- **Header (`components/layout/Header.tsx`):** a live "Ham Niwasi" link to `/ham-niwasi` with `target="_blank"` and `rel="noopener noreferrer"`, styled like `NavLink`.
  - **Desktop:** placed after the Phase 2 placeholders, right before "Contact".
  - **Mobile overlay:** the same position, with `onClick={() => setMobileOpen(false)}`.
  - **No active state:** it never matches, because Header isn't mounted on `/ham-niwasi`.
  - **Width:** check at 1024 and 1280px. Today's nav has 9 items plus the dropdown and fits; Mitram's 10th item needed a padding tweak. If it overflows, apply the same breakpoint-only padding tweak, not a layout change.
    - _As built:_ with the 10th item it did overflow. At 1024px "Contact" was cut off, "Niwasi Resources" and "Mitram Kitchen" wrapped, and the logo was squeezed.
    - **Fix:** a `NAV_ITEM_PAD` constant on every desktop nav item: `px-1 text-[14px]` below 1280px, `px-3 text-[15px]` from 1280px, and the original `px-4` from 1440px. Every item also gets `whitespace-nowrap`, and the logo gets `shrink-0`.
    - **Result:** one line, logo at full width (85px) at 1024 / 1180 / 1280 / 1440px. Nothing else in the header changed.
  - **Exact nav set and order:** Q2.
- **Footer (`components/layout/Footer.tsx`):** in PLATFORM, `› Ham Niwasi` between `› Need & Help` and `› Contact Us`, using the same classes. `target="_blank"` plus `rel`, as the user asked ("opens in new page").
- **Other pages:** every `(public)` page shows both entries, because they come from the shared Header and Footer. Nothing else in either component changes.

### 2.4 Porting the prototype

Faithful to the prototype's look and copy, in this codebase's style (same approach as Mitram §2.4):
- **No Bootstrap and no Font Awesome CDN.**
  - Layout and typography are rewritten as Tailwind v4 utilities.
  - Brand colours go in a colocated CSS module on `.theme` as `--hn-*` tokens: `#8d6663` brown, `#F97316` orange, `#fff8e1` / `#f5e6c8` creams, and so on.
  - The prototype's inline styles are folded into those utilities.
  - The FA icons in use (social, search, bars, chevron, link) become small inline SVGs in `icons.tsx`.
  - Why: Bootstrap's global CSS would leak onto every Niwasi page after navigation (Next 16 doesn't unload global CSS). It would also add two runtime CDN requests.
- **Fonts:** `next/font` in `ham-niwasi/layout.tsx`, matching the prototype's `style.css` families. This is route-scoped and self-hosted; nothing goes in the root layout.
- **Images:** statically imported from `_assets/`.
  - **Optimised, unlike Mitram (Q4):** the prototype's PNGs are 0.5 to 3.8 MB each, and serving the index unoptimised would ship about 15 MB. They therefore go through `next/image` optimisation (resized to the rendered width, WebP/AVIF).
  - **Exceptions:** `unoptimized` stays only for small logos and SVGs, and for any image where optimisation visibly degrades it. That was Mitram's lesson; check each one side by side.
- **Videos:** `next` can't statically import `.mp4`, so the 2 gallery videos go in `public/ham-niwasi/gallery/`. This is the one asset outside the route folder (Q4). They use `preload="metadata"`, so nothing downloads until play.
- **Breakpoints:** the prototype's `@media (max-width: …)` values are ported as `[@media(max-width:Npx)]:`, which is inclusive like the prototype.
- **Carousel:** a client component, with the same 5 slides, dot navigation and timing as `script.js`. It pauses under `prefers-reduced-motion`.
- **External links** (Facebook, Instagram, `niwasi.tlitech.net`) are kept as is, with `target="_blank" rel="noopener noreferrer"`.
- **Placeholder links:** prototype `href="#"` links (e.g. "गाँव मोहल्ला आधारित प्रोजेक्ट") stay inert, as in the prototype.
- ~~**Login:** `login.html` is not ported. Its links point to Niwasi's real `/login`, which opens in the same tab (Q3).~~ _Superseded 2026-10-01 (Q3 answer)._
- **Login:** `login.html` is ported as `/ham-niwasi/login`, frontend only like every other form (§2.5): it validates, then sends nothing. It has no link to or from Niwasi's real `/login`.

### 2.4b Porting conventions (as built, 2026-10-01)

These came from building the shared shell. Every page follows them.

- **The header is per page, not in the layout.** The prototype's 27 pages have five different header shapes, so each page renders `<HamNavbar variant=… secondNav? drawerCards=…/>` and `<HamFooter/>` itself. The layout holds only the fonts, the theme, the `<body>` equivalent (`pt-[120px]`, cream, brown, line-height 1.6) and `<ScrollToTop/>`, which is hidden on `/ham-niwasi/login`, as in the prototype.
  - **`variant`:** `"logo"` for the contact pages, `"links"` for impact / abhiyaan / mulya / niwasi-sabha / kaaryashala / train-samajik-udyami / help / testimonials, and `"full"` (search and drawer) for the rest.
  - **`secondNav`:** index and faq only.
  - **`drawerCards`:** `"linked"` for index, `"plain"` for faq, and `"none"` for the others. Those pages' drawers have no right panel, so there's no ✕; they close on Esc, a click on the logo, or the empty backdrop. The backdrop close is an addition, because the prototype never closed there.
- **Bootstrap baseline:** the module's `@layer base` restores Bootstrap's heading sizes and margins, `p` margins and list bullets inside `.theme`, behind `:where()`, so any utility overrides them. `ui.ts` has the Bootstrap `.container` / `.row` / `.btn` equivalents.
- **Mind the prototype's specificity:** style.css often has two rules for the same element, where the less specific one loses (e.g. `.quick-links a` beats `.quick-link-item`). Port what the browser actually computes, not the last rule read.
- **Fonts:** the prototype names Noto Sans Devanagari, Noto Serif Devanagari and Hind, but only `login.html` loads one of them. Its rendering on a machine without them is a system fallback. The port loads all three through `next/font`. For like-for-like screenshots, the comparison script injects them into the prototype.
- **Icons:** `_components/icons.tsx` (`Fa*`), generated from FA 6.4.0.
- **Links:** `ROUTES` in `ui.ts`. `foo.html` becomes `/ham-niwasi/foo`. Prototype `href="#"` and missing-target `#anchor` links stay as written.
- **Assets:** copied into `_assets/` keeping the prototype's sub-folders (`patner/`, `client/`, `gallery/`).
  - **Large photos:** `next/image` optimised, with `sizes` set to the rendered width.
  - **Small logos and SVGs:** `unoptimized`.
  - **Videos:** in `public/ham-niwasi/gallery/`.
- **Prototype bugs fixed toward the evident intent, each noted in a code comment:**
  - The index modals' "भेजें" button points at a form id that doesn't exist (`form="participationForm"`), so in the prototype it never submits. In the port it submits that modal's form.

### 2.4c Phone layouts (added 2026-10-01, user: "make proper phone layout")

This is a deliberate deviation from the prototype, at phone widths only. Desktop and tablet stay exactly as ported. Scope comes from a 375px audit of all 27 pages (overflow script plus screenshots); the pages not listed below were already fine on phones.

| Where | Prototype problem at ≤768px | Phone layout |
|---|---|---|
| `HamNavbar` "full" (index, faq, gallery and 9 more) | The social and search/menu icons wrap onto a second line below the 70px bar, over the page. | One row at ≤576px: the gap before the search/menu buttons shrinks (`ml-12` → `ml-3`) so logo, social and buttons fit within 70px. |
| `SecondNavbar` (index, faq) | Stacks to about 150px but stays `fixed` at 70px, so it overlaps the first bar's wrapped icons and covers the top of the page. The dropdown label wraps onto 2 lines. | At ≤768px it's in normal flow, directly under the fixed 70px bar, so it pushes the page down instead of covering it. Items don't wrap internally (`whitespace-nowrap`) and wrap as a centred row. |
| index hero carousel | The 45/55% halves stay side by side with a fixed height, so the text column is about 70px wide and runs behind the navbar. | At ≤768px: text stacked above the image, full width, auto height; the dots stay on the slide. |
| index `#todayQuestion` | 50/40% columns in a column flex, so cards are about 90px wide. | At ≤768px: heading block, then cards, both full width. |
| impact carousel | 60/40% columns side by side, text cramped. | At ≤768px: stacked, full width. |
| testimonials strip | Cards are as wide as their one-line caption, wider than the screen; the caption is clipped and the next arrow is off-screen. | Below 768px, one card per view at the strip's width, with the caption wrapping; the arrows sit inside the strip. Matches the prototype Swiper config's own intent (`breakpoints: {0: 1, 768: 2, 1024: 3}`) for phones only. |
| niwasi-sabha | A 15px overflow of the top text block. | Fixed only if it's a local change; otherwise left alone. |

- **Verification:** at 375 and 414px, no element sticks out of the viewport, and nothing in the main content is hidden under the fixed header. At 1440px the pages are unchanged; I check this by screenshot before and after.
- **New test case:** TC-HN-22 (§3).

### 2.5 Forms (frontend only)

- **What's ported:** every prototype form, on index and the 7 contact pages, with the same fields, labels, placeholders and `required` / `type` rules.
- **Submit:** it validates in the browser, then shows the prototype's own success behaviour (the `showSuccessMessage()` / modal-close equivalent) and resets the form. **No network request is made, and nothing is stored.**
  - This is called out in a code comment so nobody mistakes it for a working form.
- **Wiring later:** connecting the forms to an API is a separate future feature with its own plan (endpoint, table, validation mirror).
- **Search overlay:** UI only, as in the prototype; it doesn't search anything (Q5).

### 2.6 Files to touch

| File | Change |
|---|---|
| `apps/frontend/app/(niwasi)/(public)/ham-niwasi/layout.tsx` | **new**: fonts, theme, `lang="hi"`, shared navbar/drawer/search/footer |
| `.../ham-niwasi/page.tsx` | **new**: index |
| `.../ham-niwasi/<sub-page>/page.tsx` | **new**, one per ported page (Q1) |
| `.../ham-niwasi/ham-niwasi.module.css` | **new**: brand tokens only |
| `.../ham-niwasi/_components/*` | **new** |
| `.../ham-niwasi/_assets/*` | **new**: prototype images |
| `apps/frontend/public/ham-niwasi/gallery/*.mp4` | **new**: 2 videos (Q4) |
| `apps/frontend/components/layout/PublicChrome.tsx` | add `"/ham-niwasi"` to `STANDALONE_PATHS` |
| `apps/frontend/components/layout/Header.tsx` | "Ham Niwasi" link (desktop + mobile), new tab |
| `apps/frontend/components/layout/Footer.tsx` | "› Ham Niwasi" in PLATFORM, new tab |
| `docs/prototype/ham-niwasi/` | prototype copy, **done 2026-10-01** (Q7) |
| `docs/frontend/niwasi-portal.md` | §1 entry and All-pages rows plus count |
| `docs/testing/TEST_CASES.md` | §3 rows on ship |

Nothing changes in `apps/api`.

### 2.7 Security / performance

- **No user data leaves the browser** (forms are frontend only) and there are no API calls. The Niwasi Header's `/auth/me` isn't mounted on these paths.
- **No external runtime requests** except the outbound social links and anything inside a ported embed. Fonts are self-hosted, and no Bootstrap or FA CDN is loaded.
- **Weight:** image optimisation is the main lever (§2.4). Hero slides 2 to 5 load lazily; only slide 1 gets `priority`.
- **Repo size:** the prototype copy in `docs/` is 41 MB, including 15 MB of video. The `_assets/` copy roughly doubles the image weight in git (Q7).

### 2.8 Open questions (with recommendations)

1. **Q1: Scope. Only the index page, or all 27 pages?** The index links to every sub-page from its navbar, drawer and contact dropdown, so an index-only port leaves about 25 dead links. _(Counts corrected from 29 / 27.)_
   - *Recommendation:* port all pages as `/ham-niwasi/<page>`, building index plus the shared shell first, then the sub-pages in batches.
   - *Alternative:* index only, with sub-page links inert for now.
2. **Q2: Niwasi header nav.** The screenshot shows `… Need & Help · Extensions · Ham Niwasi · Contact us`, with no Event / Mitram Kitchen / MOOL and with an "Extensions" item that doesn't exist today.
   - *Recommendation:* only **add** "Ham Niwasi" before "Contact" and leave the rest unchanged (the placeholders stay, no "Extensions" item, "Contact" text unchanged), treating the screenshot as showing position only.
   - If you want the nav to match the screenshot exactly, say so, and say where "Extensions" should link (probably `/#extension` on the home page).
3. **Q3: `login.html`.**
   - *Recommendation:* don't port it; link to Niwasi's real `/login`.
   - **Decided 2026-10-01, against the recommendation:** "port login too just no backend yet". It's ported as `/ham-niwasi/login`, frontend only, and built as asked.
4. **Q4: Images and videos.**
   - *Recommendation:* optimise the large PNGs through `next/image`, and put the 2 videos in `public/ham-niwasi/gallery/` (the only asset outside the route folder).
5. **Q5: Form submit behaviour (frontend only).**
   - *Recommendation:* browser validation, then the prototype's success message plus reset, with no request. The search overlay is UI only.
6. **Q6: Translation.**
   - *Recommendation:* exempt, as for Mitram: static Hindi content.
7. **Q7: Prototype copy in git.** `docs/prototype/ham-niwasi/` is 41 MB, including two mp4s (15 MB).
   - *Recommendation:* commit the HTML/CSS/JS and images, but leave the 2 mp4s out of `docs/prototype/` (they live once in `public/`), so the video weight isn't in git twice.

## 3. Test cases (designed up front)

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-HN-01 | Header link present | Any `(public)` page | Look at desktop main nav | "Ham Niwasi" shown in the agreed position (Q2), styled like the other live links | H |
| TC-HN-02 | Header link opens new tab | Home page | Click "Ham Niwasi" | `/ham-niwasi` opens in a new tab; the Niwasi tab stays on its page | H |
| TC-HN-03 | Mobile nav link | Width < 1024px | Open ☰, tap "Ham Niwasi" | New tab with `/ham-niwasi`; overlay closes | M |
| TC-HN-04 | Footer link | Any `(public)` page | Footer → PLATFORM | "› Ham Niwasi" between "› Need & Help" and "› Contact Us"; opens `/ham-niwasi` in a new tab | H |
| TC-HN-05 | Nav fits | Home page at 1024, 1280, 1440px | Inspect nav | No wrap or overflow | M |
| TC-HN-06 | Standalone shell | — | Open `/ham-niwasi` | No Niwasi top bar, Header or Footer; the prototype's two-row navbar and footer render | H |
| TC-HN-07 | No auth call | — | Open `/ham-niwasi` with DevTools Network | No `/api/v1/auth/me` (or any `/api`) request | M |
| TC-HN-08 | Index fidelity | Prototype open side by side | Compare `/ham-niwasi` with `docs/prototype/ham-niwasi/index.html` at 1440, 1024, 768, 375px | Same sections, order, Hindi copy, colours, images, layout per breakpoint | H |
| TC-HN-09 | Hero carousel | — | Wait for auto-advance; click each dot | Slides advance on the prototype's timing; dots jump to the slide; with reduced-motion on, there's no auto-advance | M |
| TC-HN-10 | Contact dropdown | — | Click "संपर्क करें"; click outside | Menu opens with the 9 items; closes on outside click; each item goes to its contact page (or is inert where the prototype has `#`) | M |
| TC-HN-11 | Side drawer and search overlay | — | Open ☰ drawer, then 🔍; close each by ✕, backdrop and Esc | Each opens and closes like the prototype; body scroll locks while open | M |
| TC-HN-12 | Internal links (Q1 = all) | — | Click every navbar, drawer and in-page link to a sub-page | Each lands on `/ham-niwasi/<page>` (no `.html`, no 404); `#anchor` links scroll in-page | H |
| TC-HN-13 | Sub-page fidelity (Q1 = all) | — | Compare each sub-page with its prototype file at 1440 and 375px | Matches content and layout | H |
| TC-HN-14 | Form validation | Any ported form | Submit empty; then a bad email | Browser blocks submit on the `required` / `type` rules, as in the prototype | M |
| TC-HN-15 | Form sends nothing | Any ported form, DevTools Network | Fill validly and submit | Success message as in the prototype; form resets; **no network request** | H |
| TC-HN-16 | Discussion modals | `/ham-niwasi` | Click each of the 3 session buttons; close by ✕, backdrop and रद्द करें | The right modal opens and closes; submit behaves as in TC-HN-15 | M |
| ~~TC-HN-17~~ | ~~Login link~~ | | | ~~Goes to Niwasi `/login`~~ _Superseded 2026-10-01 by TC-HN-21 (Q3)._ | |
| TC-HN-22 | Phone layouts (§2.4c) | 375px and 414px wide | Open index, faq, gallery, impact, testimonials; open the drawer and search; swipe the testimonials | No horizontal overflow and nothing clipped. The header is one row (index and faq: the second bar sits below it without covering content). The hero and discussion stack. Testimonials shows one full card per view. At 1440px these pages are unchanged. | H |
| TC-HN-23 | Phone fields accept only 10 digits (§5, 2026-10-05) | — | On every phone field (7 contact pages, the 3 home-page discussion pop-ups, login), type letters and symbols, paste `+91 98765-43210 abc`, type 12 digits, then submit with 9 digits | Non-digits are dropped as typed or pasted (login keeps letters, for an email), and an 11th digit can't be entered. Submitting with fewer than 10 digits is blocked with "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें". Exactly 10 digits submits as before (nothing sent). | H |
| TC-HN-21 | Ham Niwasi login page | — | Click लॉगिन in the drawer; type a phone number, then an email; submit empty, then filled | Opens `/ham-niwasi/login` matching `login.html`. The password field appears only for input containing `@`. An empty submit is blocked. A filled submit makes no request and, as in the prototype's simulated login, goes to `/ham-niwasi`. Nobody is logged in. | M |
| TC-HN-18 | No CSS leak | `/ham-niwasi` loaded first in a tab | Navigate in the same tab to a Niwasi page (e.g. via `/login`) | Niwasi page looks unchanged: no Bootstrap or Ham Niwasi tokens applied | H |
| TC-HN-19 | Other public pages unchanged | — | Open `/`, `/aboutUs`, `/mitram-rasoi` | Unchanged apart from the new Header and Footer link (Mitram has neither) | H |
| TC-HN-20 | Other hosts | — | `partner.niwasi.abhishek/ham-niwasi`, `event.niwasi.abhishek/ham-niwasi` | Ham Niwasi is never served there (existing proxy behaviour, as TC-MR-17) | L |

## 4. Sign-off

- **2026-10-01:** requirement received (§1). The prototype was copied to `docs/prototype/ham-niwasi/` as instructed. The open questions Q1 to Q7 (§2.8) are with the user. No code written yet.
- **2026-10-01, follow-up answers (after the build):** "1 make proper phone layout / 2 explain this more / 3 can you give me the page link that does not have those images and similarly prototype file name".
  - **Open item 1 decided:** build proper phone layouts for the pages whose prototype mobile layout is broken. This is a deliberate deviation from "faithful to the prototype" on those breakpoints only; desktop stays identical. Scope in §2.4c.
  - **Item 2:** the testimonials arrows behaviour is to be explained; not decided yet.
  - **Item 3:** list the pages and prototype files that reference the missing images.
- **2026-10-01, item 3 answer:** "3 leave it for now". The two missing prototype images (`karyashala-banner.jpg`, `design-bg.png`) are deferred; the port keeps the empty banner slot and the plain-cream background. Item 2 is still open: the user asked which page the testimonials strip is on.
- **2026-10-01, item 2 decided:** "keep it". The testimonials arrows stay as built: one card per step on desktop and tablet with the prototype's content-width cards, one full card per view on phones, and a jump back to the first card after the last. No Swiper-style seamless loop. This was the recommendation.
- ~~**2026-10-01, improvement:**~~ _(the arrow choice is superseded by the next entry: keep the caret, not the chevron)_ "in this page check the ss sampark kare has 2 dropdown arrow icons i know the prototype had them too but we dont need two in the app". The "संपर्क करें" toggle in `SecondNavbar` (index, faq) keeps only the chevron icon. The Bootstrap `.dropdown-toggle` caret (`::after` triangle) the prototype also showed is removed. This is a deliberate deviation, by request.
- **2026-10-01, improvement:** "also check the responsiveness of the sidebar properly and fix it / also fix the responsiveness of the sampark kare drowpdown data" (with a 375px screenshot of the "संपर्क करें" dropdown squeezed to about 80px wide, its items wrapping a word per line). Scope:
  - the `SideDrawer` (both the with-cards and the no-cards variants) at phone and tablet widths;
  - the `SecondNavbar` contact dropdown at ≤768px.
  - Desktop stays as ported.
- **2026-10-01, arrow choice changed:** "instead of this down arrow the other one was better", with a screenshot of the chevron. The "संपर्क करें" toggle now keeps the **small Bootstrap caret (▾)** and drops the chevron icon. Still one arrow, as asked before; only which one changed.
- **2026-10-01, improvement:** "make login page correct http://niwasi.abhishek/ham-niwasi/login i dont want this upper part there make it fit in the 1 screen" (screenshot: the empty 120px cream band at the top). `/ham-niwasi/login` drops the layout's 120 / 110px navbar offset, since login has no navbar, and fits in one viewport with no page scroll. This is a deliberate deviation: the prototype's `body{padding-top:120px}` applied to login.html too.
- **2026-10-05, ship status:** "dont mark it shipped yet because the backend is yet to be created".
  - On 2026-10-05 the plan had been set to `shipped`, on the strength of the frontend commits (frontend `458461c`; root `110e690` / `dd8f3ac`), and the §3 rows had been copied into `TEST_CASES.md`. **Both are reverted:** status is back to `in-progress`, and the Ham Niwasi block was removed from `TEST_CASES.md`.
  - The phone-field fix moved from §6 (post-deploy) to §5.
  - **The feature ships only once its backend exists:** the forms' API, storage and the mirrored validation.
  - **On ship:** promote TC-HN-01..23 (minus the superseded TC-HN-17) to `TEST_CASES.md`.
- **2026-10-01, answers:** "all as recommended except 3 port login too just no backend yet".
  - Q1: all pages (27, corrected from 29), as `/ham-niwasi/<page>`.
  - Q2: only add "Ham Niwasi" before "Contact"; the rest of the nav is unchanged.
  - Q3: **login ported** as `/ham-niwasi/login`, frontend only. This reverses the recommendation and is built as asked (§2.4, TC-HN-21).
  - Q4: optimise the images through `next/image`; the videos go in `public/ham-niwasi/gallery/`.
  - Q5: forms validate, show the prototype's success message, and send nothing; search is UI only.
  - Q6: translation exempt.
  - Q7: the mp4s are excluded from the `docs/prototype/` commit.
  - Status set to in-progress.

## 5. Execution log

- **2026-10-01:** planning file created. The prototype was copied: 70 files, 41 MB (`cp -r` from Downloads, unchanged).
- **2026-10-01, shell built:**
  - **Route files:** `layout.tsx`, `ham-niwasi.module.css`, and in `_components/`: `ui.ts`, `icons.tsx`, `HamNavbar`, `SecondNavbar`, `SearchOverlay`, `SideDrawer`, `HamFooter`, `ScrollToTop`, `useOverlay`.
  - **Outside the route:** `"/ham-niwasi"` added to `STANDALONE_PATHS`; the Niwasi `Header.tsx` (desktop + mobile) and `Footer.tsx` links added, opening in a new tab.
  - **Check:** compared side by side with the prototype at 1440px (navbar, second navbar, drawer, search) and 375px. They match apart from the font difference noted in §2.4b. One specificity fix was made in the search quick links.
  - **Next:** the pages, dispatched in 5 parallel batches:
    - A: index, faq;
    - B: the 7 contact pages, login, help;
    - C: impact, abhiyaan, mulya, niwasi-sabha, kaaryashala, train-samajik-udyami, testimonials;
    - D: gallery, samajik-udyami, mitram-kitchen-store, hamniwasi-program;
    - E: ethical-foundation, sunai-consultancy, niwasi-sabha-champion, collaborating-donors, resident-application.
- **2026-10-01, TC-HN-01 / 02 / 04 / 05 PASS** (Playwright on `http://niwasi.abhishek/`):
  - the Header and Footer links have `target="_blank"` and `href="/ham-niwasi"`;
  - the footer link sits between "› Need & Help" and "› Contact Us";
  - the nav is one line at 1024 to 1440px after the padding fix (§2.3).
- **2026-10-01, batch A (index, faq) done:**
  - **New files:** `page.tsx`, `faq/page.tsx`, `_components/HomeHeroCarousel.tsx`, `_components/HomeDiscussion.tsx` (`#todayQuestion` + 3 modals), plus assets.
  - **Results:** fidelity PASS at 1440 and 375px. TC-HN-09 (carousel: 4s auto-advance, hover pause, dots, ← →, no auto-advance under reduced motion) PASS. TC-HN-14 / 15 / 16 (modals: required fields block submit; a valid submit shows the prototype's `alert` text verbatim, closes, and makes no network request) PASS.
  - **Faq:** the prototype's FAQ section is empty (comments only), so the page is the header plus the footer.
  - **Deviations:** "भेजें" now submits its modal's form (in the prototype it pointed at a missing form id). A backdrop click closes the modal (the prototype's listener removed a class that wasn't used). The carousel stays paused on a dot click while hovered. Accessibility labels added.
  - **Known: the prototype's own mobile layout is broken and was ported as-is.** At ≤768px, late `style.css` overrides keep the hero halves at 45/55%, so text runs behind the navbar. `#todayQuestion` keeps 50/40% columns, giving cards about 90px wide. Fixing this would be a deliberate deviation in `HomeHeroCarousel` / `HomeDiscussion`; it's offered to the user, not done.
  - **Shell fixes from A's report:**
    - the layout now reproduces the prototype body's `display:flex; flex-direction:column; min-height:100vh`, with `HamFooter` `mt-auto` (`body>footer{margin-top:auto}`);
    - the top offset drops to 110px at ≤768px (`style.css` l.1821);
    - faq's local footer-pinning wrapper was removed;
    - the running batches were told about the change.
- **2026-10-01, batch B (7 contact pages, login, help) done:**
  - **New files:** 9 `page.tsx` files, plus `_components/ContactFields.tsx` (shared server pieces), `ContactForm.tsx` (client), `ContactIcons.tsx` and `LoginForm.tsx`.
  - **Results:** all PASS at 1440 and 375px. TC-HN-14 / 15 / 21 PASS:
    - empty submits are blocked by `required`;
    - a valid contact submit shows script.js's button feedback ("REGISTRATION SUCCESSFUL!", green, reset after 2s, text restored at 3s), and cancel shows "FORM RESET!";
    - login shows the password field only for `@` input and, as the prototype does, routes to `/ham-niwasi`;
    - no non-GET request is sent.
  - **Deviation:** script.js's submit handler reads `#country`, `#state` and `#city`, which don't exist on the contact pages, so the prototype throws and shows nothing. The port shows the success state.
  - **Prototype quirk kept:** the hidden password input starts `required`, so text that is neither an email nor digits silently blocks submit.
- **2026-10-01, batch E (ethical-foundation, sunai-consultancy, niwasi-sabha-champion, collaborating-donors, resident-application) done:**
  - All PASS at 1440 and 375px. Hover effects are ported.
  - resident-application isn't a form: its "प्रिंट करें" opens the prototype's print popup with the image.
  - `_components/ResidentPrintButton.tsx` was added.
  - The `.section-bg` image (`design-bg.png`) doesn't exist in the prototype, so the background is plain cream.
- **2026-10-01, batch D (gallery, samajik-udyami, mitram-kitchen-store, hamniwasi-program) done:**
  - All PASS at 1440 and 375px.
  - **Gallery videos:** in `public/ham-niwasi/gallery/`. `GalleryVideo.tsx` sets `muted` and calls `play()` on mount, because React doesn't write `muted` into the server HTML and autoplay would be blocked.
  - **Images:** image7 (2.7 MB) is optimised; the 55–93 KB thumbnails are unoptimized.
  - **Prototype quirk kept:** gallery has an invalid `<ul>` inside a `<p>`, rebuilt the way the browser parses it.
- **2026-10-01, shell fixes from the batch reports:**
  - **Icons:** the prototype loads FA 7.0.1 last, whose icons are **fixed-width (1.25em box)**. `icons.tsx` (and `ContactIcons.tsx`) now draw a 1.25em box, which fixes the header's social-icon spacing and nav-link position on the "links" pages.
  - **Navbars:** both now `flex-wrap`, like Bootstrap `.navbar`, so at 375px content overflows downward and the logo is no longer clipped.
  - **Line height:** the shell uses `text-[1rem]`, not `text-base`, which also sets line-height 1.5; the prototype inherits 1.6. This also fixes the drawer item heights.
  - **Re-verified** at 1440 (help header), 375 (gallery header) and with the drawer open: they match.
- **2026-10-01, text-width finding (accepted, not fixed):** several batches saw port text render about 2–4% wider than the font-injected prototype.
  - **Diagnosis:** the font files are the same version (2.006) with identical advance widths. But the file next/font downloads lacks Google's `prep` hinting table, and Linux/FreeType's hinting then rounds glyph advances differently. Measured: "Hello World Niwasi" at 20px is 184px in the port and 176px in the prototype, with 177px expected from the metrics.
  - **Why it isn't fixed:** Windows and Mac browsers don't let this table change the advances, so users won't see it. It only causes a few extra line wraps in these Linux screenshots.
- **2026-10-01, batch C (impact, abhiyaan, mulya, niwasi-sabha, kaaryashala, train-samajik-udyami, testimonials) done:**
  - **Results:** all PASS at 1440 and 375px, re-taken after both shell updates.
  - **New files:** `ImpactCarousel.tsx`, `AbhiyaanCarousel.tsx`, `TestimonialsCarousel.tsx`.
  - **Deviations:**
    - **impact:** the prototype double-advances (Bootstrap `data-bs-ride` plus its own timer). The port has one 4s timer with Bootstrap's 0.6s slide.
    - **testimonials:** the prototype's Swiper never starts (its inline script redeclares `const scrollToTopBtn`, a SyntaxError), so its arrows are dead. The port keeps the look it actually shows (auto-width cards); the arrows and drag move one card and wrap at the ends.
    - **kaaryashala:** `image/karyashala-banner.jpg` is missing from the prototype, which shows a broken image. The port keeps the empty slot with the alt text.
  - **Prototype mobile bugs kept, like index:** cramped impact slides, a 15px overflow on niwasi-sabha, and the testimonials strip wider than the screen at 375px.
- **2026-10-01, integration check (coordinator):**
  - **Type check and lint:** `npx tsc --noEmit -p apps/frontend` exit 0 (whole frontend). `eslint` on `ham-niwasi/` plus `Header`, `Footer` and `PublicChrome` exit 0.
  - **No network code:** no `fetch` / `api.` / storage calls, and no `.html` hrefs, anywhere in `ham-niwasi/`.
  - **Crawl of all 27 pages** (Playwright, scrolled to load lazy images):
    - every page returns 200 with the prototype's `<title>`;
    - there are no console errors or warnings, no failed responses, no broken images, and no `/api` or third-party requests (TC-HN-07 PASS);
    - all 21 distinct internal links resolve to 200 (TC-HN-12 PASS).
  - **TC-HN-06 PASS:** the Niwasi top bar and Header are absent on `/ham-niwasi`, `/ham-niwasi/login` and `/mitram-rasoi`, and present on `/aboutUs`.
  - **TC-HN-18 PASS (by construction):**
    - the only stylesheet is `ham-niwasi.module.css`, and every compiled selector is scoped to the hashed `.ham-niwasi-module__…__theme` class;
    - `globals.css` and the root layout are untouched;
    - no Ham Niwasi page links to a Niwasi page in the same tab.
  - **TC-HN-19 PASS:** `/aboutUs` still has Poppins headings and Open Sans body on white, with the Niwasi header.
  - **TC-HN-20 PASS:** `event.*/ham-niwasi` returns 404. `partner.*/ham-niwasi` returns 200 with the partner `[slug]` page (existing behaviour, same as TC-MR-17), not Ham Niwasi.
  - **Open for the user (not done):**
    1. Fix the prototype's broken mobile layouts (index hero and discussion cards, impact, niwasi-sabha, testimonials), or keep them identical.
    2. testimonials: keep the arrows as they are now (one card, wrap), or make them a true Swiper-style loop.
    3. Two images missing from the prototype need supplying: `karyashala-banner.jpg` and `design-bg.png`.
- **2026-10-01, phone layouts built (§2.4c):**
  - **Header (`HamNavbar`):** at ≤576px the logo is 48px, padding `px-4`, the search/menu gap `ml-3`, and icon `mx-0`, so the "full" header is one row at 360–414px.
  - **`SecondNavbar`:** at ≤768px it's in normal flow under the fixed bar (`relative -mt-10`), with nowrap items wrapping as centred rows.
  - **index:** hero slides stack (text, then a 250px image, auto height). `#todayQuestion` columns go full width and the 3 spacer `<br>`s are hidden. The hero CTA now wraps when its column is too narrow; the prototype's `nowrap` clipped it at 800 and 1024px. Where it fits, nothing changes.
  - **impact:** 60/40 columns stack, slides have auto height instead of scrolling inside 800px, and section padding is `px-2` on phones.
  - **testimonials:** at ≤767px the strip column is full width and each card is the strip's width (one per view); arrows are inside the strip.
  - **niwasi-sabha:** no change needed; the overflow check finds nothing.
  - **Verification:**
    - **Phones:** the overflow and header audit (header row ≤70px, nothing past the viewport, nothing under the header, second bar at y=70) is clean at 360 / 375 / 414px on index, faq, gallery, impact, testimonials, niwasi-sabha and samajik-udyami. Screenshots checked by eye.
    - **Desktop:** 1440 and 1024px before/after diff is pixel-identical on index, faq, impact, testimonials and niwasi-sabha. Gallery differs only inside its 2 autoplaying videos and the Next dev "Compiling" badge. The one intended desktop change is the index CTA at 1024, which now wraps instead of being clipped.
    - **Checks:** `tsc` exit 0, `eslint` exit 0.
    - **TC-HN-22 PASS.**
  - **Note:** at 577–1024px the brand link box (60px logo + Bootstrap `.navbar-brand` padding) is 78px tall in a 70px bar. That's prototype behaviour and isn't visible, so it was left.
- **2026-10-01, drawer and dropdown phone fixes:**
  - **Root cause in `SideDrawer`:** its breakpoint classes were composed at runtime (`${BP_768}:w-[250px]`), and Tailwind only generates classes it finds written out in the source. None of the drawer's ≤768 / ≤640px rules existed, so on phones the cards were squeezed into a strip about 70px wide beside the menu. All are now literal, as non-overlapping ranges (tablet 641–768px, phone ≤640px). A grep found no other composed variants under `ham-niwasi/`.
  - **Drawer at ≤640px:**
    - with cards (index, faq): one scrolling column, menu then full-width cards;
    - no cards: an 85% / max 320px side panel;
    - both get a ✕ in the panel header, and the prototype's floating ✕ is hidden there.
  - **Drawer at 641–768px:** a 250px menu beside one column of cards; the no-cards drawer also gets the header ✕.
  - **`SecondNavbar` dropdown at ≤768px:** it hangs from the full-width first row (the button wrapper becomes `static`), so it spans the bar, with `max-h-[70vh]` and its own scroll. Items wrap normally.
  - **Desktop unchanged:** every new class is inside a ≤768px range.
  - **Verified:** screenshots at 375 / 640 / 768px for both drawer kinds, and the dropdown open at 375 / 768px. `tsc` exit 0, `eslint` exit 0.
- **2026-10-01, login fit:**
  - **Change:** `login/page.tsx` `<main>` uses `-mt-[120px]` (`-mt-[110px]` at ≤768px), cancelling the layout's navbar offset, and `min-h-dvh`.
  - **Measured:** page `scrollHeight` equals the viewport, and the card is centred, at 1440×900, 1366×650, 768×1024, 375×667 and 375×560. The card only grows past the screen if it's taller than the viewport itself.
  - **Checks:** `eslint` exit 0.
- **2026-10-01, docs:**
  - `docs/frontend/niwasi-portal.md`: a §1 row for `/ham-niwasi`, and 27 All-pages rows (count 212 → 239).
  - `docs/prototype/ham-niwasi/.gitignore` excludes the 2 gallery mp4s (Q7). The copy that was already staged still includes them, so they need unstaging before commit.

#### 2026-10-05: phone fields accept text and more than 10 digits (fix before ship)

> so in the hamniwasi site that we worked on recently
> there are phone number  fields it is accepting text number more than 10 digits can you fix these issues

**Cause:** the prototype's phone inputs are plain `type="tel"` with no `pattern` or `maxlength`, and the port copied them faithfully. `tel` doesn't restrict characters, so any text and any length passed.

**Fields (all of them):**
- **The 7 contact pages:** the mobile field in `ContactFields.tsx` (`ContactPersonRows`), plus contact-business's "सम्पर्क व्यक्ति मोबाइल नंबर".
- **The home page:** the 3 discussion pop-ups in `HomeDiscussion.tsx`.
- **Login:** "ईमेल या फ़ोन नंबर" in `LoginForm.tsx`.

**Rule:** the repo-wide convention, `/^\d{10}$/` (e.g. `components/public/SignupForm.tsx`, `CommunityUserForm.tsx`):
- **While typing:** non-digits are stripped on input and paste, and `maxLength=10` stops an 11th digit. `inputMode="numeric"` brings up the phone keypad.
- **On submit:** fewer than 10 digits is blocked with "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें" through the browser's validity bubble, like the existing `required` messages.
- **Message:** Hindi, matching this all-Hindi site, and not wrapped in `t()` (§2.1 exemption).

**Implementation:** one shared client component, `_components/PhoneInput.tsx`, used by all phone fields. It stays uncontrolled, so the forms' existing reset keeps working.

**Login, a choice made without asking (flagged to the user):** the field takes an email *or* a phone, so letters can't be stripped there.
- **All digits:** treated as a phone. It's capped at 10 digits and must be exactly 10.
- **Anything else:** must look like an email (contain `@`); otherwise the message is "कृपया सही ईमेल या 10 अंकों का मोबाइल नंबर दर्ज करें".
- **Prototype quirk fixed:** text that was neither email nor digits used to block submit silently (§5, batch B). It now shows that message.

**Backend:** none yet (frontend-only site). When these forms get an API, its validation must mirror this rule (AGENTS.md sync rule).

**Test case:** TC-HN-23 (§3).

**Built and verified 2026-10-05:**
- **New file:** `_components/PhoneInput.tsx`, used by `ContactInput` (`type="tel"`) on all 7 contact pages and by the 3 `HomeDiscussion` modals. `LoginForm` uses the same `toPhoneDigits` and `PHONE_MESSAGE`.
- **TC-HN-23 PASS (Playwright), on each of the 10 phone fields:**
  - typed `ab12cd34!@ 56` keeps `123456`;
  - 12 typed digits stop at `1234567890`;
  - a pasted `+91 98765-43210 abc` becomes `9876543210`;
  - 9 digits is invalid with "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें", and a real submit shows no success state and makes no non-GET request;
  - 10 digits is valid.
- **Login:**
  - `123456789012` becomes `1234567890` (valid);
  - `98765 43210` becomes `9876543210` (valid);
  - `987654321` shows the phone message;
  - `abc` shows the email-or-phone message;
  - `a@b.com` is valid;
  - 10 digits then submit goes to `/ham-niwasi`.
- **Checks:** `tsc` exit 0, `eslint` exit 0.
- **Shipping:** TC-HN-23 is promoted with the rest of §3 when the feature ships.

## 6. Post-deploy

_None yet._

## 7. Cross-references

- Pattern: [2026-09-24-mitram-rasoi-page.md](2026-09-24-mitram-rasoi-page.md) (§2.2 standalone, §2.4 porting, §2.4a colocation)
- TEST_CASES: TC-HN-01..20 (promote on ship)
- Page maps / API docs: `docs/frontend/niwasi-portal.md`; no API change
