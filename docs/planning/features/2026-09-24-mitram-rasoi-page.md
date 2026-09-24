# Mitram Rasoi — static page + Extensions card

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-09-24 |
| Shipped | |
| SRS row | — (no `docs/requirement/SRS.md` in this repo yet) |
| Test cases | TC-MR-01..29 (01, 02, 04, 05 superseded) |
| Prototype todo | — |

## 1. Requirement (as given)

> now in the http://niwasi.abhishek/
> the main page of niwasi we need to add a new tab Mitram Rasoi
> it's url will become
> app/ mitram-rasoi
> we have to add it after mitram kitchen look ss
> also this page will be completly static i have already shared the prototype and image assets to you
> now create a plan file for this task

> **2026-09-24: requirement changed (supersedes the nav tab above):**
> and the requirement has  changed
> we added the mitram rasoi in the header
> now it will not be added there instead it will be added in the extensions part of the http://niwasi.abhishek/
> look ss it will be added here and it should open in new tab when we clikc the mitram rasoi card
> also make these 4 by 4
>
> _(Screenshot: the home page's EXTENSIONS section, a single row of 6 faded logos: PARTNER, Project for Students, INFO, HELP, CBO, समुदाय वेबसाइट.)_

**Screenshot (main nav, desktop, as of 2026-09-24):**
`Home · About Niwasi · Niwasi Resources ▾ · Niwasi Action · Need & Help · Event · Mitram Kitchen · MOOL · Contact`
(Event, Mitram Kitchen and MOOL are greyed, non-clickable Phase 2 placeholders.)

**Prototype + assets (shared by the user):** `/home/triline27/Downloads/Mitram Rasoi/`

- `index.html`: a single-page, all-Hindi, fully static site. It has inline CSS, and its only JS is one `copyNum()` clipboard helper.
- `images/`: `logo-seal.png`, `badge-veg.png`, `dining-hall.jpg`, `photo-thali.jpg`, `photo-laddu.jpg`, `photo-namkeen.jpg` (213 KB total).

Prototype sections, in order:
1. Sticky maroon header (seal logo, in-page nav `मेन्यू / उत्सव व बैठक / संपर्क`, call pill).
2. Hero (name, tagline, address, 3 chips, 2 CTAs, dining-hall photo, "80–100 लोगों के लिए हॉल" chip).
3. `#services`: 4 service cards and a trust row.
4. `#menu`: 3 photo cards (थाली / मिठाई / नमकीन) and a bulk-order note.
5. `#events`: hall booking block with a 3-item checklist and a call CTA. The image slot holds the logo seal, not a photo.
6. `#contact` footer: address, hours, and 2 phone rows with copy buttons (70616 53559 restaurant, 7070 819 777 bookings).

Brand tokens come from the prototype's `:root` (maroon-900/950, mauve-400, cream-50/100, blush-100, green-400/600/900, yellow-400, red-600). Fonts are Yatra One (display), Hind (body) and Rajdhani (utility).

## 2. Plan

### 2.1 Rule-by-rule (AGENTS.md)

| Rule | Applies? | Notes |
|---|---|---|
| Frontend ↔ backend validation mirror | No | No form and no input: the page is static. |
| DB schema change → dated `.sql` | No | No DB access and no endpoint. The existing `mitram_daily_reports` table and the `is_mitram_daily_report` flag are unrelated and untouched. |
| New test cases up front | **Yes** | §3 below. `docs/testing/TEST_CASES.md` doesn't exist yet, so it gets created on ship with these rows. |
| No AI-attribution trailers | Yes | Applies to the commits for this feature. |
| Sensitive files never in git | Yes | Only static images and TSX are added. Stage by explicit path. |
| Reactivation discipline | Done | `docs/planning/features/` holds only `TEMPLATE.md`, so no prior plan touches the nav or Mitram. |

The frontend's `AGENTS.md` says this is Next.js 16.2 with breaking changes. Before coding, read the relevant guides in `apps/frontend/node_modules/next/dist/docs/` for route files, `metadata`, `next/font` and `next/image`.

### 2.2 Route

- ~~**File:** `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/page.tsx`, under `(public)` for the Niwasi `Header`/`Footer`.~~ _Superseded 2026-09-24 (Q1: standalone page)._
- ~~**File:** `apps/frontend/app/(niwasi)/mitram-rasoi/page.tsx`, moved **outside** `(public)` so `(public)/layout.tsx` doesn't wrap it (recommended).~~ _Superseded 2026-09-24: the user chose to keep it inside `(public)` and hide the chrome by path (option 2, §4)._
- **File:** `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/page.tsx`. It stays inside `(public)`.
- **Hiding the Niwasi chrome.** A nested layout can't remove its parent's output: `mitram-rasoi/layout.tsx` renders *inside* `(public)/layout.tsx`. So `(public)/layout.tsx` itself skips `Header` and `Footer` on this path:
  - New client component `components/layout/PublicChrome.tsx` (`"use client"`). It takes `header` and `footer` as React-node props plus `children`. It reads `usePathname()` and, when the path is `/mitram-rasoi` or starts with `/mitram-rasoi/`, renders `children` only, without the `header`/`footer` slots or the Niwasi wrapper styles. Otherwise it renders exactly today's markup.
  - `(public)/layout.tsx` stays a server component: `<PublicChrome header={<Header />} footer={<Footer />}>{children}</PublicChrome>`. `Footer` is passed as an already-rendered server-component slot, so it stays a server component. `Header` was already client.
  - The path list is a single constant, `STANDALONE_PATHS = ["/mitram-rasoi"]`, in `PublicChrome.tsx`, so another standalone page later means one entry, not a new special case.
  - Side effect: `Header` isn't mounted on the page, so its `GET /api/v1/auth/me` never fires there (TC-MR-18).
  - Known trade-off, accepted with option 2: this is the one change outside the route folder besides the nav tab. Every other `(public)` page's markup stays byte-identical (TC-MR-24).
- **URL:** `/mitram-rasoi` on the main host (`niwasi.abhishek` locally, `niwasi.in` in prod).
- **No way back to Niwasi on the page** (user's decision). There's no Niwasi logo link and no back button; the browser's back button is the only route back. _(A "Back to Niwasi" button was added and removed again on 2026-09-24, because it isn't in the client requirement (§4). This rule stands.)_
- `proxy.ts` needs no change. The main host passes through unchanged. On `partner.*` and `event.*` the path is rewritten to `/partner/mitram-rasoi` and `/event-host/mitram-rasoi`, which don't exist and so return 404. That's expected (TC-MR-17).
- Make it a **server component**. The only client code is the copy button (§2.5).
- ~~Add `metadata` with title `"Mitram Rasoi | Niwasi"`.~~ _Superseded on implementation: the title is `"Mitram Rasoi"` (§5)._

### 2.3a Extensions card (replaces §2.3, 2026-09-24)

The Mitram Rasoi entry point moved from the main nav to the home page's **Extensions** section (`app/(niwasi)/(public)/page.tsx`, `#extension`).
- **Header:** `components/layout/Header.tsx` is restored to its last-committed content. The tab, the `PHASE2_BEFORE_RASOI`/`PHASE2_AFTER_RASOI` split and the `NAV_ITEM_PAD` padding tweak are all gone; the padding tweak existed only to fit the 10th nav item. Nav: `… Need & Help · Event · Mitram Kitchen · MOOL · Contact`, desktop and mobile, as before this feature.
- **Card:** a 7th entry after समुदाय वेबसाइट. It's a `next/link` to `/mitram-rasoi` with `target="_blank"` and `rel="noopener noreferrer"`, the same new-tab pattern the page already uses. `aria-label` is "Mitram Rasoi (opens in a new tab)". Choices made without asking, flagged to the user:
  - **Image:** the logo seal, statically imported from `mitram-rasoi/_assets/logo-seal.png`, so the file exists once. It's the only Mitram logo asset. Shown at `h-28` inside the same 160×160 cell as the other logos.
  - **Not faded:** the section was a Phase 2 placeholder with `opacity-50` on the whole grid. The fade now sits on each of the six placeholder cells, so they look exactly as before, and the live Mitram card is at full opacity.
  - **Position:** last.
- **"4 by 4":** read as 4 per row. The grid changed from `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` to `grid-cols-2 md:grid-cols-4`, which gives 4 + 3 from 768px up and 2 per row below.
- Nothing about `/mitram-rasoi` itself changes: still standalone, no Niwasi chrome, no back button.

### 2.3 Main-nav tab ([Header.tsx](../../../apps/frontend/components/layout/Header.tsx)) — _superseded 2026-09-24 by §2.3a; kept for history_

Current code:
`const PHASE2_ITEMS = ["Event", "Mitram Kitchen", "MOOL"];` It's rendered twice, as greyed `<span>`s: once in the desktop nav and once in the mobile overlay.

Change it so the order becomes:
`… Need & Help · Event · Mitram Kitchen · **Mitram Rasoi** · MOOL · Contact`

- "Mitram Rasoi" is a **live** `NavLink` (`href="/mitram-rasoi"`), styled like the other live links, with the `text-primary` active state when on the page. It is not greyed.
- Event, Mitram Kitchen and MOOL stay greyed placeholders, unchanged.
- Because the new live item sits between two greyed ones, one `PHASE2_ITEMS.map` can't render it. Split the array, as `PHASE2_BEFORE = ["Event", "Mitram Kitchen"]` and `PHASE2_AFTER = ["MOOL"]` or similar, or turn the items into a typed list where each entry is either a placeholder or a link. Update the SRS §4.5 comment above it.
- **Mobile overlay:** add a matching `<Link href="/mitram-rasoi">` in the same position, with `onClick={() => setMobileOpen(false)}` like its siblings.
- **Width risk:** the desktop nav appears at `lg` (≥1024px) with `px-4` per item. A 9th item, "Mitram Rasoi" at about 120px, may overflow or wrap between 1024px and about 1200px. Check at 1024, 1180, 1280 and 1440px (TC-MR-04). If it overflows, tighten the padding for this breakpoint range only, for example `px-2.5 xl:px-4` on nav items. Don't remove items or change the breakpoint without asking.

### 2.4 Porting the prototype

Keep the prototype's look and content exactly, but in this codebase's style. **Everything the page needs lives inside the route folder `mitram-rasoi/`** (see §2.4a and §4, 2026-09-24 instruction). The only exceptions are the things that can't live there: the nav tab in the shared `Header.tsx`, the `PublicChrome` wrapper used by `(public)/layout.tsx` (§2.2), and the docs.

- ~~**Styling in Tailwind v4, not a CSS file.** Port the tokens into `app/globals.css` `@theme` as namespaced `--color-mitram-*` tokens, the same approach used for `--color-admin-*`.~~ _Superseded 2026-09-24 by the colocation instruction: tokens move into the route folder instead._
- **Styling:** use Tailwind v4 utilities for layout, spacing and type, as in the rest of the codebase. The **brand tokens** (the prototype's `:root` colours, radii and font stacks) go in a colocated CSS module, `mitram-rasoi/mitram-rasoi.module.css`, declared on a single `.theme` class, for example `.theme { --mr-maroon-900: #5e1018; … }`. `layout.tsx` applies that class to the page wrapper. Components use them through Tailwind v4's CSS-variable shorthand: `bg-(--mr-maroon-900)`, `text-(--mr-cream-50)`, `rounded-(--mr-radius-md)`.
  - Why a module and not a global `.css`: Next 16's CSS guide says a global stylesheet imported from a route **is not removed when navigating to another route**. A `:root { --… }` block imported here would stay loaded on every Niwasi page afterwards. The module's class is hashed and only applies inside this page's wrapper, so nothing leaks (TC-MR-15). This is the first `*.module.css` in the repo. It's used only for token declarations; all styling stays in Tailwind.
  - `app/globals.css` is **not touched**.
- **Fonts through `next/font/google`, defined in `mitram-rasoi/layout.tsx`.** Load Yatra One (400), Hind (400/500/600/700) and Rajdhani (500/600/700) with `subsets: ["latin", "devanagari"]` and `variable: "--mr-font-display"` / `"--mr-font-body"` / `"--mr-font-utility"`. The layout puts their `.variable` classes on the same wrapper. Nothing goes in the root layout, so the rest of the site never downloads them. This self-hosts the fonts: no runtime request to `fonts.googleapis.com`, unlike the prototype's `<link>`. Keep the prototype's fallback stack, adding `Noto Sans Devanagari`.
- ~~**Images:** copy the 6 files to `apps/frontend/public/images/mitram-rasoi/`.~~ _Superseded 2026-09-24: images move into the route folder._
- **Images:** copy the 6 files into `mitram-rasoi/_assets/`, keeping their names, and **statically import** them (`import diningHall from "../_assets/dining-hall.jpg"`). `next/image` then fills in width, height and `blurDataURL` automatically, so there's no hand-typed size to drift. The hero dining-hall image gets `priority`. Alt text is copied verbatim from the prototype. At build time Next copies them to `/_next/static/media/…` with a content hash, which gives long-lived caching for free.
- **Language:** `layout.tsx` wraps the page content in `<div lang="hi">`, on the same wrapper as the theme and font classes. The root `<html lang="en">` stays.
- ~~**Prototype header → in-page brand bar**, non-sticky, below the sticky Niwasi header.~~ _Superseded 2026-09-24 (Q1: standalone)._
- **Prototype header stays exactly as built:** a sticky maroon `<header>` with the seal, name, in-page nav and call pill. It's the page's only header.
- ~~**Anchor offset** for the 90px Niwasi header.~~ _Superseded._ **Anchor offset:** the sticky Mitram header is about 63px tall (a 40px logo, 10px padding each side, a 3px border). Give each anchor target a matching `scroll-mt` so its heading isn't hidden under the header (TC-MR-09).
- ~~**Prototype `<footer id="contact">`** becomes a `<section>`.~~ _Superseded._ **It stays a `<footer id="contact">`**, as in the prototype: it's the page's only footer.
- **Page background:** the prototype sets `body { background: cream-100 }`. `body` belongs to the root layout, so the page wrapper instead gets `min-h-screen` and the cream background, which covers the viewport the same way.
- **Keep content exactly:** all Hindi copy, both phone numbers (`tel:+917061653559`; the second number has no `tel:` link in the prototype, so keep it as copy-only), the section order, and the 800px, 720px and 640px responsive breakpoints (map them onto Tailwind `max-[800px]:` etc. or the nearest standard breakpoint).
- The `prefers-reduced-motion` hover lift maps to `motion-safe:` utilities.

### 2.4a Route-folder structure (colocation)

_Tree as built. Names were revised during implementation: `BrandBar` → `MitramHeader` and `ContactSection` → `MitramFooter`, after Q1 made them the page's real header and footer; `ui.ts` was added._

Added 2026-09-24 per the user's instruction: "include all its components layout in the route folder itself that is mitram-rasoi".

```
apps/frontend/app/(niwasi)/(public)/mitram-rasoi/
├── layout.tsx                 # fonts (next/font), theme class, lang="hi" wrapper
├── page.tsx                   # metadata + composes the sections in prototype order
├── mitram-rasoi.module.css    # brand tokens only (.theme { --mr-*: … })
├── _components/               # private folder: excluded from routing
│   ├── MitramHeader.tsx       # the prototype's sticky header (page's only <header>)
│   ├── Hero.tsx
│   ├── Services.tsx           # 4 service cards + trust row
│   ├── MenuPreview.tsx        # 3 photo cards + bulk-order note
│   ├── Events.tsx             # hall booking block
│   ├── MitramFooter.tsx       # #contact: address, hours, phone rows (page's only <footer>)
│   ├── CopyNumberButton.tsx   # "use client": the only client component
│   ├── icons.tsx              # the prototype's inline SVGs as small components
│   └── ui.ts                  # shared class strings (.wrap, .eyebrow, .btn, section head…)
└── _assets/                   # the 6 prototype images, statically imported
    ├── logo-seal.png  badge-veg.png  dining-hall.jpg
    └── photo-thali.jpg  photo-laddu.jpg  photo-namkeen.jpg
```

- **`_` prefix:** Next's "private folders" convention (Next 16 docs, *Project structure → Private folders*). `_components` and `_assets` and everything under them are opted out of routing, so `/mitram-rasoi/_components` is never a URL (TC-MR-21). This also stops a future file named `page.tsx`, `layout.tsx` etc. inside them from turning into a route by accident.
- **Nested layout:** `mitram-rasoi/layout.tsx` nests **inside** `(public)/layout.tsx`, so the Niwasi `Header` and `Footer` still wrap the page. It only adds the Mitram wrapper (theme, fonts, `lang`) around `{children}`, and has no `<html>`/`<body>`.
- **Server components:** every file except `CopyNumberButton.tsx` is a server component. It's the only `"use client"` file.
- **Nothing Mitram-specific outside this folder**, except the `Header.tsx` tab and the docs. There's no `components/mitram-rasoi/`, no `public/images/mitram-rasoi/`, and no `globals.css` change. Deleting the folder and the Header entry removes the feature completely.

### 2.5 Copy-number button

- ~~A small client component, `components/mitram-rasoi/CopyNumberButton.tsx`.~~ _Superseded 2026-09-24: it moves into the route folder._
- A small client component, `mitram-rasoi/_components/CopyNumberButton.tsx` with `"use client"`. It keeps the prototype's behaviour: the label changes to `कॉपी हो गया` on success or `नंबर चुनें` on failure, then goes back to `कॉपी करें` after 1.6s.
- Follow the existing pattern in `SabhaShareBar.tsx`: `try { await navigator.clipboard.writeText(num) } catch {}`, plus a guard for `navigator.clipboard` being undefined.
- ~~**Dev caveat:** on `http://niwasi.abhishek` the button always shows `नंबर चुनें`. This is expected; no `execCommand` fallback, matching the existing component.~~ _Superseded 2026-09-24: the user reported it as broken (§4)._
- **Fallback for non-secure contexts:** if `navigator.clipboard` is missing (plain http) or `writeText` rejects, copy through a hidden read-only `<textarea>` and `document.execCommand("copy")`. `execCommand` is deprecated but still supported by every current browser, and it works outside secure contexts. `नंबर चुनें` now shows only if both paths fail.

### 2.6 Files to touch

_Revised 2026-09-24 for colocation. The earlier rows for `components/mitram-rasoi/CopyNumberButton.tsx`, `public/images/mitram-rasoi/*` and the `app/globals.css` token change are superseded and dropped._

| File | Change |
|---|---|
| `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/layout.tsx` | **new**: fonts, theme class, `lang="hi"` wrapper, cream `min-h-screen` background |
| `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/page.tsx` | **new**: metadata, composes the sections |
| `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/mitram-rasoi.module.css` | **new**: brand tokens only |
| `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/_components/*.tsx` | **new**: 6 section components, `CopyNumberButton` (client), `icons` |
| `apps/frontend/app/(niwasi)/(public)/mitram-rasoi/_assets/*` | **new**: the 6 prototype images |
| ~~`apps/frontend/components/layout/Header.tsx`~~ | ~~live "Mitram Rasoi" tab~~ _Superseded 2026-09-24: restored to `HEAD`, no change (§2.3a)._ |
| `apps/frontend/app/(niwasi)/(public)/page.tsx` | Extensions: Mitram Rasoi card (new tab), 4-per-row grid, fade moved to the placeholder cells (§2.3a) |
| `apps/frontend/components/layout/PublicChrome.tsx` | **new**: client wrapper that skips Header/Footer on standalone paths (§2.2, option 2) |
| `apps/frontend/app/(niwasi)/(public)/layout.tsx` | render through `PublicChrome`, with Header and Footer passed as slots |
| `docs/frontend/niwasi-portal.md` | add `/mitram-rasoi` to §1 Public pages and to the All-pages table and count |
| `docs/testing/TEST_CASES.md` | **new on ship**: §3 rows copied verbatim |

Nothing changes in `apps/api`: no endpoint, no DB, no env var.

### 2.7 Security / performance

- Static content, no user input, no API call from the page itself. The `Header` still makes its existing `GET /api/v1/auth/me`.
- No external requests: fonts are self-hosted by `next/font`, and images are local.
- The images total about 213 KB before `next/image` optimisation. The page should stay light.

### 2.8 Open questions

See §4. The build can start on the stated defaults, and any answer gets recorded there.

## 3. Test cases (designed up front)

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| ~~TC-MR-01~~ | Tab position (desktop) | `niwasi-web` running; viewport ≥1280px | Open `http://niwasi.abhishek/` | Nav reads `Home · About Niwasi · Niwasi Resources ▾ · Niwasi Action · Need & Help · Event · Mitram Kitchen · Mitram Rasoi · MOOL · Contact`. | H _Superseded 2026-09-24: there's no nav tab anymore (§2.3a); see TC-MR-25..29._ |
| ~~TC-MR-02~~ | Tab is live, neighbours still greyed | as TC-MR-01 | Hover and click each of Event, Mitram Kitchen, Mitram Rasoi, MOOL | Only Mitram Rasoi has the normal link colour and hover, and it navigates to `/mitram-rasoi`. The other three stay grey, show a default cursor, and do nothing. | H _Superseded 2026-09-24: there's no nav tab anymore (§2.3a); see TC-MR-25..29._ |
| ~~TC-MR-03~~ | ~~Active state~~ | — | — | _Dropped 2026-09-24: the page is standalone (Q1), so the Niwasi nav, and its active state, isn't shown on `/mitram-rasoi`._ | — |
| ~~TC-MR-04~~ | Nav fits at desktop widths | — | Resize to 1024, 1180, 1280 and 1440px on `/` and `/mitram-rasoi` | All 10 items stay on one line inside the header, with no wrapping, clipping, horizontal scroll, or overlap with the logo. | H _Superseded 2026-09-24: there's no nav tab anymore (§2.3a); see TC-MR-25..29._ |
| ~~TC-MR-05~~ | Mobile overlay | Viewport <1024px | Tap ☰ | "Mitram Rasoi" is listed between "Mitram Kitchen" and "MOOL" as a live white link. Tapping it closes the overlay and opens `/mitram-rasoi`. | H _Superseded 2026-09-24: there's no nav tab anymore (§2.3a); see TC-MR-25..29._ |
| TC-MR-06 | Direct URL and refresh | — | Open `http://niwasi.abhishek/mitram-rasoi` directly, then refresh | Page renders standalone: the Mitram sticky header at the top, the Mitram footer at the bottom, and no Niwasi header, top bar or footer. HTTP 200, no login prompt. | H |
| TC-MR-07 | Content parity with prototype | Prototype open side by side | Compare section by section | Same sections in the same order, same Hindi text (character for character), same phone numbers, same chips, same checklist items. No lorem ipsum or English substitutions. | H |
| TC-MR-08 | All images load | DevTools → Network | Load the page | All 6 images load (no 404) directly from `/_next/static/media/…` (static imports from `_assets/`, served `unoptimized`, see §5). The hero image is not lazy-loaded. Every `<img>` has its prototype alt text. No layout shift as images load, since width and height come from the static import. | H |
| TC-MR-09 | In-page anchors clear the sticky header | Desktop | Click मेन्यू, उत्सव व बैठक, संपर्क in the Mitram header | Page scrolls to each section and its heading is fully visible below the sticky Mitram header, not hidden under it. The header stays pinned while scrolling. **मेन्यू:** the eyebrow "मेन्यू की झलक" lands about 16px below the header (per the 2026-09-24 request, §4). ~~**उत्सव व बैठक** / **हॉल बुक करें** land at the same spot as **संपर्क**.~~ _Reverted (§4); they use `ANCHOR` again._ **उत्सव व बैठक** / **हॉल बुक करें:** the "बुकिंग" eyebrow lands about 16px below the header, with no light strip between the header and the maroon section (§4). | M |
| TC-MR-10 | Call links | Phone, or desktop with a tel: handler | Tap the call pill and both "कॉल करें" buttons | Each opens the dialler with `+91 70616 53559`. | H |
| TC-MR-11 | Copy button, secure context | Open via `http://localhost:3016/mitram-rasoi` or prod HTTPS | Click "कॉपी करें" on each phone row, then paste | Clipboard holds `70616 53559` and `7070 819 777` respectively. The label shows `कॉपी हो गया` and goes back to `कॉपी करें` after about 1.6s. | M |
| TC-MR-12 | Copy button, insecure context | Open via `http://niwasi.abhishek/mitram-rasoi` | Click "कॉपी करें" on each phone row, then paste | Clipboard holds the right number (fallback path). The label shows `कॉपी हो गया` and goes back after about 1.6s, with no console error. _(Revised 2026-09-24: it previously expected `नंबर चुनें`.)_ | M |
| TC-MR-13 | Copy button spam | secure context | Click one copy button 10 times quickly | The label never gets stuck on the success or failure text. It ends on `कॉपी करें` about 1.6s after the last click, and nothing throws. | L |
| TC-MR-14 | Fonts self-hosted, Devanagari renders | DevTools → Network, filter "font" | Load the page | Headings are in Yatra One and body in Hind. No request to `fonts.googleapis.com` or `fonts.gstatic.com`. No tofu boxes, and conjuncts (त्र, श्र, ड्ड) render correctly. | M |
| TC-MR-15 | Fonts and theme don't leak site-wide | — | (a) Hard-load `/` and `/aboutUs` and check Network. (b) Open `/mitram-rasoi`, then use the nav to go client-side to `/`, `/aboutUs` and `/contact`. | (a) No Yatra One, Hind or Rajdhani font files are requested. (b) After leaving the page, the other pages look exactly as before: no maroon/cream colours, no Mitram fonts, and no `--mr-*` variables on `:root` or `body` (check with DevTools → Computed). | M |
| TC-MR-16 | Responsive layout | — | View at 375, 640, 800, 1080 and 1440px | ≤800px: hero and events stack to one column with the photo first. ≤720px: brand-bar nav hides and the contact grid is one column. ≤640px: menu grid is 2 columns with the first card full-width. No horizontal scroll at any width. | H |
| TC-MR-17 | Not reachable on partner/event hosts | — | Open `http://partner.niwasi.abhishek/mitram-rasoi` and `http://event.niwasi.abhishek/mitram-rasoi` | Neither shows the Mitram page. Event returns its 404. Partner returns 200 with its own `Partner of Niwasi` page, because the partner portal's `[slug]` route catches any single segment (`/some-random-slug` does the same); that's existing partner behaviour. _(Expected result corrected 2026-09-24 on first run; it said "both 404".)_ | L |
| TC-MR-18 | Same page for guest and logged-in, no API call | DevTools → Network (Fetch/XHR) | Load `/mitram-rasoi` logged out, then logged in | Page is identical in both states, with no Login/Dashboard UI. **Zero** requests to the API; in particular no `GET /api/v1/auth/me`, because the Niwasi Header isn't mounted. | M |
| TC-MR-19 | Keyboard and a11y | — | Tab through the page | Every link and button is reachable in visual order with a visible focus ring (yellow outline, as in the prototype). The page content has `lang="hi"`. There's exactly one `<header>` and one `<footer>` landmark, both Mitram's. | M |
| TC-MR-20 | Build, typecheck, lint, console clean | — | `npm run build` and `npm run lint` in `apps/frontend`; load the page with DevTools open | Build and lint pass with no new warnings. The build's route list shows `/mitram-rasoi` as static (○). No console errors or hydration warnings on the page. | H |
| TC-MR-25 | Header has no Mitram Rasoi tab | — | Open `/` at ≥1024px, then open the ☰ menu at <1024px | Nav reads `… Need & Help · Event · Mitram Kitchen · MOOL · Contact` in both, with no Mitram Rasoi. Spacing is the original `px-4`. | H |
| TC-MR-26 | Extensions shows the Mitram Rasoi card | — | Open `/` and scroll to EXTENSIONS | 7 cards: PARTNER, Project for Students, INFO, HELP, CBO, समुदाय वेबसाइट, Mitram Rasoi (seal logo). The Mitram card shows the caption "Home-cooked meals from local kitchens." under the seal, inside the card. The six placeholders are faded (opacity 0.5) exactly as before; Mitram Rasoi is at full opacity. | H |
| TC-MR-27 | 4 per row | — | View EXTENSIONS at 1797, 1280, 1024, 768, 767 and 375px | ≥768px: 4 columns, rows 4 + 3. <768px: 2 columns, rows 2 + 2 + 2 + 1. No horizontal scroll. | H |
| TC-MR-28 | Card opens in a new tab | — | Click the Mitram Rasoi card | A **new tab** opens at `/mitram-rasoi` (standalone page). The original tab stays on `/`. `window.opener` is `null` in the new tab (`rel="noopener noreferrer"`). | H |
| TC-MR-29 | Placeholders stay non-working | — | Click each of the six faded logos | Nothing happens: no navigation and no pointer cursor, as before. | M |
| TC-MR-21 | Private folders aren't routes | — | Open `/mitram-rasoi/_components`, `/mitram-rasoi/_components/Hero`, `/mitram-rasoi/_assets/logo-seal.png` | All three return the Niwasi 404. None renders a component or serves the raw image file. | M |
| TC-MR-22 | Feature is self-contained | Implementation done | `git diff --stat` against the base commit | The only changed paths outside `app/(niwasi)/(public)/mitram-rasoi/` are `components/layout/Header.tsx`, `components/layout/PublicChrome.tsx` (new), `app/(niwasi)/(public)/layout.tsx`, and docs. `globals.css` and `public/` are untouched. | L |
| TC-MR-23 | No route back on the page | On `/mitram-rasoi` | Look for any link to Niwasi, then press the browser's Back button | There's no Niwasi logo, link or back button anywhere on the page (the only links are in-page anchors and `tel:`). Browser Back returns to the previous page, e.g. `/` after arriving through the tab. _(Restored 2026-09-24 after the Back to Niwasi button was removed, §4.)_ | M |
| TC-MR-24 | Other public pages unaffected | — | Open `/`, `/aboutUs`, `/contact`, `/sabha`, `/login`, `/join`; also go client-side from `/mitram-rasoi` back to `/` with browser Back | Each shows the Niwasi top bar, header and footer exactly as before. After going Back from `/mitram-rasoi`, the header and footer reappear without a refresh, and the header's Login/Dashboard state loads correctly. Paths that only look similar, e.g. `/mitram-rasoi-x`, still get the Niwasi chrome (they 404 inside it). | H |

## 4. Sign-off

**2026-09-24: open questions.** The build proceeds on the defaults unless the user says otherwise.

- **Q1: Page chrome.** Keep the Niwasi `Header`/`Footer` and render the prototype's maroon header as a non-sticky brand bar at the top of the page (default)? Or should `/mitram-rasoi` be a standalone page without the Niwasi chrome, with its own sticky header as in the prototype? The standalone option means the new tab leads to a page with no way back to Niwasi except the browser's back button.
- **Q2: Tab label.** Should the tab read `Mitram Rasoi` in English, matching the other tabs (default), or `मित्रम रसोई`?
- **Q3: Events section image.** The prototype shows the logo seal where a hall photo would normally go. Keep it as in the prototype (default), or will a photo of the hall be supplied?
- **Q4: Mitram Kitchen placeholder.** Should "Mitram Kitchen" stay a greyed Phase 2 placeholder next to the new live "Mitram Rasoi" tab (default: yes, unchanged)?

_Answers:_ (pending)

**2026-09-24: instruction from the user (colocation).**

> i want you to include all its components layout in the route folder itself that is mitram-rasoi

What changed in the plan as a result:
- The page is split into a `layout.tsx`, a `page.tsx` and section components under `mitram-rasoi/_components/`. See the structure in §2.4a.
- `CopyNumberButton` moves from `components/mitram-rasoi/` into `mitram-rasoi/_components/`.
- The images move from `public/images/mitram-rasoi/` into `mitram-rasoi/_assets/` and are statically imported.
- The brand tokens move out of `app/globals.css` into `mitram-rasoi/mitram-rasoi.module.css`, a CSS module rather than a global stylesheet, because Next 16 keeps a route's global CSS loaded after navigating away.
- The earlier items are marked superseded in §2.4, §2.5 and §2.6.
- TC-MR-08 and TC-MR-15 are updated, and TC-MR-21 and TC-MR-22 are added.
- The `Header.tsx` tab and the docs stay where they are: the shared header can't live inside one route.

**2026-09-24: go-ahead.**

> alright now start the implementation

Q1–Q4 weren't answered. The build goes ahead on the stated defaults: keep the Niwasi chrome with a non-sticky brand bar, English tab label `Mitram Rasoi`, logo seal kept in the events slot, and Mitram Kitchen stays greyed. Any later answer gets recorded here and supersedes the matching default. _(Superseded the same day by the answers below; the user stopped the build before any code was written.)_

**2026-09-24: answers to Q1–Q4.**

First the user asked for the recommendations:

> and their recommeendation

The recommendation for every question was the default. For Q1, that meant keeping the Niwasi chrome so visitors have the nav to get back, and avoiding two stacked sticky headers.

> it will be a standalone page dont use the niwasi header/footer also the there will be no back button (only browser)
> 2nd yes your recommendation
> 3 keep exactly like prototype
> 4 yes
> now begin the implementation

- **Q1: standalone page, against the recommendation, built as asked.** It uses no Niwasi `Header`/`Footer` and adds no back-to-Niwasi link or button; the browser's back button is the only way back. Consequences for §2:
  - ~~The route moves out of `(public)` to `app/(niwasi)/mitram-rasoi/`.~~ _Superseded by the route-location decision below._
  - The prototype's header stays **sticky**, exactly as in the prototype, instead of becoming a non-sticky brand bar.
  - The prototype's `<footer id="contact">` stays a `<footer>`, since there's no Niwasi footer to clash with.
  - The page makes no API call at all, because the Niwasi `Header` and its `/auth/me` call aren't on it.
  - TC-MR-03 is dropped, TC-MR-09, TC-MR-18 and TC-MR-19 are revised, and TC-MR-23 is added.
- **Q2:** the tab label is `Mitram Rasoi` in English, as recommended.
- **Q3:** the events image slot keeps the logo seal, exactly like the prototype.
- **Q4:** Mitram Kitchen stays a greyed Phase 2 placeholder, unchanged.

**2026-09-24: fidelity re-check requested.**

> now check the prototype once again it is in docs in the sunai_niwasi and make sure everything properly matches font color images responsiveness everything properly once again

`docs/prototype/mitram-rasoi/index.html` is byte-for-byte identical to the Downloads copy the port was built from, but it has **no `images/` folder** next to it, so opened from `docs/` the prototype's images are broken. The comparison rendered the Downloads copy, which has the images. Findings and fixes are in §5.

**2026-09-24: menu anchor offset.**

> next when i click menu it should scroll slightly more down

Before, `#menu` used the shared `ANCHOR` (`scroll-mt-[68px]`): the whole section, including its 64px top padding, stopped below the 65px header, leaving the "मेन्यू की झलक" eyebrow about 77px under it. Now `#menu` alone uses `scroll-mt-[16px]`, so the eyebrow lands **24px** below the header at 1440px and 27px at 375px (the header is 63px there). `#events` and `#contact` keep `ANCHOR`, since only the menu was asked for. Follow-up the same day:

> a little more very slight

The offset went from `scroll-mt-[16px]` to `scroll-mt-[8px]`, so the eyebrow now lands about **16px** below the header (19px at 375px). This supersedes the 24px above. This is a deliberate deviation from both earlier builds. The raw prototype has no scroll offset at all and lands the eyebrow right at the header's edge.

**2026-09-24: events links land where संपर्क lands.** _(Reverted the same day, see below.)_

> that is perfact now next when i click उत्सव व बैठक/हॉल बुक करें then it should scroll same as contact

("that is perfact" confirms the 16px menu offset above.)

Measured before changing anything: `#contact` is the last block on the page, so संपर्क always ends up **at the page bottom**. The browser can't scroll the footer up to the header: it lands 430px below the header at 1670×850 and 480px at 1440×900. The request was ambiguous, so the user was asked to pick between three options: land the events eyebrow about 16px below the header like मेन्यू, land at the same spot as संपर्क, or fit the whole events block on screen.

> Same spot as संपर्क

**Built:** the header link "उत्सव व बैठक" and the hero button "हॉल बुक करें" now point to `#contact`. The section keeps `id="events"`. The header nav's React key changed from `href` to `label`, since two items now share `#contact`.
- Verified by clicking: all three links land on identical `scrollY` at 1670×850 (1980), 1440×900 (1930) and 375×812 (3922, hero button only; the header nav is hidden at ≤720px). No console warnings.
- **Side effect** (the page bottom is where the booking block and the phone numbers show together): on desktop, the events heading "उत्सव और बैठक" is partly under the header and the "बुकिंग" eyebrow is off screen. On a 375px phone, only the tail of the events block shows above the footer. Built as chosen.

**2026-09-24: reverted by the user.**

> no my bad in explaination i am reverting this code

The user reverted the code themselves: both links point to `#events` again and the nav key is back to `href`. The `#events` behaviour is back to `ANCHOR` (`scroll-mt-[68px]`): the section lands right under the header and the "बुकिंग" eyebrow sits about 66px below it. The request needs re-explaining; the intended behaviour is still open.

**2026-09-24: events offset, re-explained with a screenshot.**

> now when i click utsav wa baithak this white space remains so i want it to scroll slightly more down when i click that button and hall book button

The screenshot showed a thin light strip under the header. Cause: with `ANCHOR` (`scroll-mt-[68px]`) the maroon `#events` section stopped 3px below the 65px header, so the cream page background showed through. `#events` now has its own `scroll-mt-[18px]`, the same approach as `#menu`: the 64px top padding tucks under the header, and the "बुकिंग" eyebrow lands **16px** below it, the same gap as मेन्यू. Both triggers use `#events`: the header link "उत्सव व बैठक" and the hero button "हॉल बुक करें".
- Verified by clicking, at 1914×900 and 1440×900: the eyebrow lands 16px below the header for both links (मेन्यू: 16px), and no strip shows (the section top is 48px above the header's bottom edge).
- On a 375px phone, only the hero button is visible, since the header nav is hidden ≤720px. There, too, the section top is tucked under the header with no strip; the logo image comes first there, by the prototype's `order: -1`.
- `#contact` still uses `ANCHOR`. It's the page bottom, so the browser can't bring it up to the header anyway.

**2026-09-24: Back to Niwasi button (reverses Q1's "no back button").** _(Removed the same day, see below.)_

> can you add this back to niwasi button to in the header

A screenshot showed it after the call pill: the same green pill, a left arrow and the label "Back to Niwasi". Q1's "there will be no back button (only browser)" is superseded (§2.2 and TC-MR-23 are marked). The page itself stays standalone; there's still no Niwasi header or footer.

Built:
- a `next/link` to `/` in `MitramHeader.tsx`, after the call pill;
- shared `PILL` base (the prototype's `.call-pill` rules) in `ui.ts`, with `CALL_PILL = ml-auto + PILL`, unchanged;
- `BACK_PILL = ml-2 + PILL + the yellow focus ring`. `ml-2` plus the row's 16px gap gives the screenshot's 24px spacing. The call pill deliberately doesn't get the focus ring, because the prototype has none on it;
- a new `ArrowLeftIcon` in `icons.tsx`.

Responsive, found by scanning every width from 300 to 1100px:
- With the label hidden at ≤720px like the call pill's number, at 721–745px the full label pushed "उत्सव व बैठक" onto two lines and the header grew from 65px to 70px. So the label now hides at **≤760px**.
- At ≤332px the arrow-only pill ran into the right padding. So at **≤360px** it drops `ml-2` and uses 10px side padding.
- Result: no header height change and full 24px padding from 313px up. At 300–312px, narrower than current phones, it's still on screen, with no horizontal scroll.

Verified:
- The pill's computed style is identical to the call pill's at all widths; the call pill itself is still identical to the prototype's.
- Clicking lands on `/` with the Niwasi top bar, the header (with the Mitram Rasoi tab) and the footer.
- Keyboard focus gives a 3px solid `#ffed00` ring.
- With the back pill removed from the DOM, the structural diff against the prototype is still 0 unmatched, 0 box and 0 style differences, with identical heights at 1440, 800, 721, 720, 375 and 320px. So the pill is the page's only change.
- Lint and typecheck are clean.

**2026-09-24: Back to Niwasi button removed by the user.**

> i am removing the back to niwasi button because now it is not in the clien requirement

The user removed it themselves, and the code is fully back to its earlier state:
- no link to `/` in `MitramHeader.tsx` and no `next/link` import;
- `PILL`/`BACK_PILL` are gone and `CALL_PILL` is back to its original single definition;
- `ArrowLeftIcon` is gone.

**Q1 stands again as originally answered:** standalone page, and the browser's Back button is the only way back. The strike-through on §2.2's "No way back to Niwasi" is lifted (see §2.2), and TC-MR-23 is back to its original expectation.

Verified after the removal: lint and typecheck are clean, and the structural diff against the prototype shows 0 unmatched, 0 box and 0 style differences, with identical heights at 1440, 721, 375 and 320px.

**2026-09-24: requirement change: Extensions card instead of nav tab.**

The requirement is quoted verbatim in §1; the plan is in §2.3a. Built and verified (Playwright, system Chrome):
- **TC-MR-25:** the header nav has no Mitram Rasoi at any width and fits on one row at 1280px and above (it wraps at 1024px, as before this feature). The mobile overlay is back to `… Event | Mitram Kitchen | MOOL | Contact`. `Header.tsx` is byte-identical to `HEAD`. It still shows `MM` in git status because the user's staged copy contains the old tab; restage it.
- **TC-MR-26/27:** 4 columns with 4 + 3 at 1797, 1280, 1024 and 768px; 2 columns with 2 + 2 + 2 + 1 at 767 and 375px. Placeholders are at 0.5 opacity and Mitram at 1. The seal renders 112px tall and the text logos 160px, in the same 160×160 cell.
- **TC-MR-28:** clicking the card opens a second tab at `/mitram-rasoi` (h1 "मित्रम रसोई"); the original tab stays on `/`; `window.opener === null`.
- **TC-MR-29:** clicking each of the six faded logos does nothing: 0 links, default cursor, URL stays `/`, no new tab.
- Lint and typecheck are clean; `npm run build` passes, with `/` and `/mitram-rasoi` both static.
- Open for the user: the seal is a full-colour square next to faded text logos. It can be swapped for a text-style Mitram Rasoi logo if one exists.

**2026-09-24: caption under the Extensions card.**

> can you also add this text under that card
> Home-cooked meals from local kitchens.

Added as a `<span>` inside the card's link, under the seal, so the caption also opens the page in a new tab. It's styled like the subtitles baked into the other logo images: 12px italic `#666`, centred, `leading-tight`. The link became a `flex-col` with a 6px gap.
- Verified at 1797 and 375px: the caption wraps to 2 lines and stays inside the 160px card, and every Extensions cell is still 160px tall.
- Lint and typecheck are clean.

**2026-09-24: prototype image paths.**

> can you make the path correction in the prototype images so they load properly

In `docs/prototype/mitram-rasoi/index.html`, all 8 `src="images/…"` now point to `../../../apps/frontend/app/(niwasi)/(public)/mitram-rasoi/_assets/…`. Those are the port's own copies, verified byte-identical to the originals with `cmp`, so there's one set of images and no duplicate in `docs/`. That's the only change to the prototype HTML. Verified: all 8 images load from `docs/` with no failed requests, and the render is pixel-identical to the Downloads copy. This depends on the `apps/frontend` submodule being checked out.

**2026-09-24: bug report after the first build.**

> copy button is not working

The cause was the plan's own §2.5 choice. The page was opened over `http://niwasi.abhishek`, which isn't a secure context, so there's no Clipboard API and the button always showed `नंबर चुनें`. The prototype behaves the same way. Fixed by adding the `execCommand` fallback (§2.5 superseded), and TC-MR-12 was revised to expect a real copy.

**2026-09-24: route location for the standalone page.**

The build was paused while §2 was being updated to move the route out of `(public)`. The user asked:

> wait why does it move out of the public if we make a layout file in the mitram -rasoi route we wont need to moove it out keep it there only

The answer given was that Next layouts nest, so a child `mitram-rasoi/layout.tsx` renders inside `(public)/layout.tsx` and can't remove its Header or Footer. Three options were offered:
- (1) split `(public)` into a `(site)` sub-group holding the Header/Footer layout and move all 11 public pages into it;
- (2) have `(public)/layout.tsx` skip Header/Footer by pathname;
- recommended: move `mitram-rasoi/` beside `(public)` under the passthrough `(niwasi)` layout.

> yes 2nd

**Decided: option 2, against the recommendation, built as asked.** The route stays at `app/(niwasi)/(public)/mitram-rasoi/`, and a `PublicChrome` client wrapper in `(public)/layout.tsx` skips the Niwasi Header/Footer on `/mitram-rasoi`. Details are in §2.2, and TC-MR-24 was added.

## 5. Execution log

**2026-09-24: implementation.**

Files (frontend submodule, not committed):
- new route folder `app/(niwasi)/(public)/mitram-rasoi/`: `layout.tsx`, `page.tsx`, `mitram-rasoi.module.css`, `_components/` (8 files) and `_assets/` (6 images copied verbatim from the prototype);
- new `components/layout/PublicChrome.tsx`;
- edited `app/(niwasi)/(public)/layout.tsx` and `components/layout/Header.tsx`.

Docs: `docs/frontend/niwasi-portal.md` gained the §1 row and the All-pages row, and the count went from 211 to 212.

Decisions and findings during the build:
- **Title:** `metadata.title` is `"Mitram Rasoi"`, the prototype's own `<title>`. No sibling public page sets metadata, so there was no `… | Niwasi` pattern to follow, and the page is standalone. This supersedes the `"Mitram Rasoi | Niwasi"` suggestion in §2.2.
- **Font weights:** trimmed to what the prototype's CSS uses: Hind 400/600/700 and Rajdhani 600/700 (Yatra One 400). A grep of the prototype found only `font-weight:400/600/700`. Its `<link>` also asked for Hind 500 and Rajdhani 500, which nothing used. Font files on the page went from 26 to 22.
- **Anchor offset:** the sticky header measures 65px, not the estimated 63px, because the call pill sets the row height. `#events` landed 1px under it, so the offset went from `scroll-mt-16` to `scroll-mt-[68px]`.
- **Prototype bug copied as-is:** the veg badge (`badge-veg.png`, 240×58, with the text "शुद्ध शाकाहारी" inside it) is squeezed into 16×16 (hero chip) and 22×22 (trust row) with no `object-fit`, so it renders squashed. Kept exactly as the prototype; flagged to the user.
- **Button outline:** on the first render "हॉल बुक करें" had no outline, because the shared `border-transparent` beat the secondary button's border colour. `border-transparent` moved to the primary button only.
- **Nav width (§2.3):** measured by removing the new tab:
  - 1024px: it **already wrapped to two rows before this change** (needs 929px, has 929px). Still two rows; that's existing behaviour, and the breakpoint wasn't changed.
  - 1180px and 1280px: the new tab made it wrap (needs 1171px at `px-4`).
  - Fix: `NAV_ITEM_PAD = "px-2.5 min-[1300px]:px-4"` on the desktop items. At 1300px and above, spacing is the original `px-4`.
- **Known cost of option 2:** `Footer` is a server component passed as a slot, so its rendered tree is still serialised into the `/mitram-rasoi` RSC payload even though `PublicChrome` doesn't render it. It's invisible (roughly 1–2 KB gzipped of a 43 KB payload); for example `contact@niwasi.in` appears once in the page source. Accepted, not restructured.
- **Existing console errors:** on `/` the only console errors are 401s from the logged-out `GET /api/v1/auth/me`, which aren't caused by this change. `/mitram-rasoi` has zero console errors and zero API calls.

Verification. Build and route checks: `tsc --noEmit` OK, `eslint` OK, and `npm run build` OK with `/mitram-rasoi` static (○). Browser checks used Playwright with system Chrome against `http://niwasi.abhishek` (dev server, PM2 `niwasi-web`).

| TC | Result | Notes |
|---|---|---|
| TC-MR-01 | PASS | Order: Home · About Niwasi · Niwasi Resources · Niwasi Action · Need & Help · Event · Mitram Kitchen · Mitram Rasoi · MOOL · Contact |
| TC-MR-02 | PASS | Clicking the tab loads `/mitram-rasoi`. Neighbours are still greyed spans. |
| TC-MR-03 | n/a | Dropped (standalone page) |
| TC-MR-04 | PASS* | One row at 1180, 1280, 1366 and 1440px. *1024px wraps to 2 rows, as it did before this change. |
| TC-MR-05 | PASS | Mobile overlay: … Mitram Kitchen · Mitram Rasoi · MOOL …; tapping it closes the overlay and navigates. |
| TC-MR-06 | PASS | 200, one `<header>` and one `<footer>` (Mitram's), no Niwasi top bar or header |
| TC-MR-07 | PASS | Visual side-by-side at 1440 and 375px against the prototype; text copied verbatim |
| TC-MR-08 | PASS | 6 files / 8 `<img>` all load from `/_next/static/media`; hero and logo `priority`; alt text verbatim |
| TC-MR-09 | PASS | After the 68px fix, targets land at 68px under a 65px header |
| TC-MR-10 | PASS (markup) | All three call links are `tel:+917061653559`. Dialler not exercised. |
| TC-MR-11 | PASS | On `localhost:3016`: clipboard = `7070 819 777`, label resets. Re-run after the fallback change: both buttons paste the right number. |
| TC-MR-12 | ~~PASS~~ → re-run PASS | The first run "passed" against the old expectation (`नंबर चुनें`); the user reported that as broken. After the fallback, on `http://niwasi.abhishek` both buttons show `कॉपी हो गया` and paste `70616 53559` / `7070 819 777`; there's no console error, and the label resets. |
| TC-MR-13 | PASS | 11 rapid clicks, ends on `कॉपी करें` |
| TC-MR-14 | PASS | h1 in Yatra One, body in Hind, 0 requests to fonts.googleapis/gstatic. Conjuncts not inspected closely. |
| TC-MR-15 | PASS | `/aboutUs` loads no Mitram-only font files. After Back from the page, no `--mr-*` on `:root`/`body`, and main font and background are unchanged. |
| TC-MR-16 | PASS | No horizontal scroll at 375, 640, 800, 1080 or 1440px; stacking checked visually at 375px |
| TC-MR-17 | PASS | See the corrected expected result |
| TC-MR-18 | PASS | 0 API requests on the page (logged-out run only) |
| TC-MR-19 | partial | Landmarks and `lang="hi"` checked. Keyboard tab order not walked. |
| TC-MR-20 | PASS | tsc, eslint and build clean; 0 console errors on the page |
| TC-MR-21 | PASS | `/mitram-rasoi/_components`, `/_components/Hero` and `/_assets/logo-seal.png` all return 404 |
| TC-MR-22 | PASS | Outside the route folder: Header.tsx, PublicChrome.tsx (new), (public)/layout.tsx, docs |
| TC-MR-23 | PASS | No non-anchor, non-`tel:` links on the page; browser Back returns to `/` |
| TC-MR-24 | PASS | `/`, `/aboutUs`, `/contact`, `/sabha`, `/login` and `/join` return 200 with chrome. Back from the page restores header, footer and Login. `/mitram-rasoi-x` gets a 404 inside the Niwasi chrome. |

Still to do before `shipped`: the logged-in run of TC-MR-18, a keyboard walk for TC-MR-19, a real-phone `tel:` tap for TC-MR-10, commits (frontend submodule plus the parent repo's docs and submodule pointer), and promoting §3 into `docs/testing/TEST_CASES.md`.

**2026-09-24: fidelity pass (second check against the prototype).**

Method (scratchpad scripts, Playwright with system Chrome):
- **Structural diff:** every element with its own text, every `<img>` and every `id` in the prototype is paired with the port's element by tag and text. The script compares about 50 computed properties (colour, background, font family/size/weight, line-height, letter-spacing, spacing, borders, radius, shadow, grid, text-wrap, object-fit, …) plus the box (x/y/w/h, ±1px) at 13 widths: 1440, 1080, 801, 800, 799, 721, 720, 719, 641, 640, 639, 375 and 320px.
- **Pixel diff:** full-page screenshots of both at 1440, 800 and 375px.
- **States:** hover and focus-visible, with reduced motion on and off.

Differences found and fixed:
1. **Section eyebrows ("सेवाएं", "मेन्यू की झलक") were 13px; the prototype renders them at 16px.** It's a specificity quirk: `.section-head p` (0,1,1) outranks `.eyebrow` (0,1,0), so these eyebrows actually get 16px, `margin-top: 10px` and `max-width: 54ch`. `SECTION_EYEBROW` now reproduces that.
2. **Line-heights, 17 places:** Tailwind's named sizes (`text-xs/base/lg/xl`) carry their own line-heights (e.g. 24px, 28px), while the prototype inherits `1.55` (24.8px, 27.9px, 31px, 18.6px). Switched to arbitrary px sizes (`text-[16px]` etc.), which set only font-size.
3. **Copy buttons:** they need line-height `normal`, as in the prototype's UA default, but Tailwind's preflight makes buttons inherit. Added `leading-[normal]`.
4. **Breakpoints at exactly 640, 720 and 800px:** Tailwind's `max-[800px]:` compiles to `width < 800px`, but the prototype's `max-width: 800px` is inclusive, so at exactly 800, 720 and 640px the port showed the desktop layout. Replaced with `[@media(max-width:800px)]:` (and 720/640).
5. **Service card h3 wrapped differently:** the prototype's `h1,h2,h3 { text-wrap: balance }` also covers the body-font service h3s. Added `text-balance`.
6. **Images:** Next's optimizer resized and re-encoded them. The veg badge, which the prototype squeezes from 240×58 into 16×16 and 22×22, came out as a smear, and the JPEG photos changed slightly. All 6 `<Image>`s are now `unoptimized`, and the `sizes` props were dropped. The originals are 5–100 KB, so little is lost, and static imports still give hashed, cacheable URLs. _Supersedes the §2.4 "next/image optimisation" assumption._

Results after the fixes:
- **Structural diff:** at all 13 widths, 0 unmatched elements, 0 box differences, identical document heights (e.g. 2830/2830 at 1440px, 3632/3632 at 800px, 4918/4918 at 320px), and no horizontal scroll. The only remaining computed-style difference is `vertical-align: middle` on `img`/`svg`, from Tailwind preflight. It has no effect: all imgs are `display: block`, all SVGs are flex items, and the box diff is 0.
- **Pixel diff:** **0.000% of pixels differ** at 1440, 800 and 375px.
- **States:**
  - nav link hover colour, and focus outline (3px solid `#ffed00`, offset 2px): identical;
  - hover lift: both lift 1px over 0.12s (the prototype uses `transform`, Tailwind v4 uses the `translate` property); neither lifts under reduced motion.
- Build, typecheck and lint (changed files) are clean. The copy-button re-test passes on both http and localhost. Full-folder lint of `components/layout` reports 4 existing problems in untouched files (`CommunityHeader`, `CommunityNav`, `PortalSwitcher`, `ProfileAvatar`), none from this feature.

TC-MR-07 (content and visual parity) re-verified: PASS, now pixel-exact. TC-MR-16 (responsive): PASS at all 13 widths, including the exact breakpoints.

## 6. Post-deploy

_(none yet)_

## 7. Cross-references

- SRS row: none (`docs/requirement/SRS.md` doesn't exist). The Header's Phase 2 comment cites SRS §4.5.
- TEST_CASES: TC-MR-01..29 (promoted from §3 on ship; `docs/testing/TEST_CASES.md` gets created then).
- Page maps / API docs updated: `docs/frontend/niwasi-portal.md` (new public page). API docs: none, since no endpoint changes.
- Prototype source: `/home/triline27/Downloads/Mitram Rasoi/index.html` and `images/` (outside the repo; the images get copied into `mitram-rasoi/_assets/`).
- Related but out of scope: the `mitram_daily_reports` table, the `is_mitram_daily_report` facility flag, and the partner nav's greyed "Order From Mitram" / "Mitram Daily Reports" items.
- CHANGELOG bullet: none (no CHANGELOG in this repo).
- Production deploy notes: none. It's a standard frontend deploy with no env or DB steps.
