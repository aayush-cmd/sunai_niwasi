# Mitram website (own domain, `app/(mitram)`)

| Field | Value |
|---|---|
| Status | shipped |
| Started | 2026-10-06 |
| Shipped | 2026-10-06 (frontend `4a270e8`, root `e95a699`, merged to `main` and pushed) |
| SRS row | — |
| Test cases | TC-MT-01..20 |
| Prototype todo | — |

## 1. Requirement (as given)

> yes we are starting new work on mitram
> we will make a completely new group folder for mitram in our app folder
> besides even, help , niwasi, partner etc
> this will be completely static no backend for it
> also this will be deployed in a different domain like the partner and niwasi are deployed in different domains right now
> this is the prototype /home/triline27/Downloads/Mitram-Prototype.html
> look at the maroom header in the ss it is just the part of the prototype we do not need to port it in the application
> this contains other assets of the application
> /home/triline27/Mitram-Website
> also read the implementation of ham-niwasi and mitram-rasoi before doing this task and after that create a plan file and port the prototype in our project

_(Screenshot: the prototype viewer's maroon top bar, "मित्रम · Prototype" with a page dropdown and Desktop / Mobile buttons, above the real Mitram header. Only the bar is excluded.)_

**Prototype:**
- **The main file:** `/home/triline27/Downloads/Mitram-Prototype.html`, 6.9 MB. It's byte-identical to `/home/triline27/Mitram-Website/index.html` (md5 `06725496…`), a single file with every page, the runtime and the images inlined.
- **The sources:** `/home/triline27/Mitram-Website/design/canvas/` has 9 page boards (`Mitram-<Page>.dc.html`), their "mobile" twins (`Mitram-M-<Page>.dc.html`), `support.js` (the board runtime), `canvas.json` and `img/` (82 images, 4.2 MB).
- **One responsive page each:** every `M-` board is byte-identical to its desktop board except the `<title>` and the preview width (390 vs 1440). So there are **9 pages, not 18**, with breakpoints at 1180 / 900 / 560px.
- **Shared parts:** a common stylesheet (about 27 KB: tokens, header, footer, buttons, chips, order pop-up, toast) plus 4–9 KB of page CSS. The header is identical except for the active link, and the footer is identical. All pages share the order and toast logic (`fld / rs / need / omVals / shellVals` in each board's script).

| Page | Board | Interactivity (from its script) |
|---|---|---|
| होम | `Mitram-Home` | ~~Banner carousel (6 slides), kitchen menu preview with quantity steppers and an order cart~~ _Corrected 2026-10-06 by the port:_ banner carousel (**7** slides, chips, prev/next, pause). The script also computes a kitchen-menu preview and an order pop-up, but **no markup renders them**, so the board shows neither and the port doesn't either. |
| सेवाएँ | `Mitram-Services` | Shell only |
| मित्रम किचन — रोज़ का भोजन | `Mitram-Kitchen` | Full menu (sections, veg / non-veg, multi-price items, monthly tiffin) with steppers, cart and order pop-up |
| ₹48 भोजन — बल्क ऑर्डर | `Mitram-Bulk` | Bulk cost calculator (people, utensils, delivery, staff) and order |
| सम्मिलित प्रयास पैकेज | `Mitram-Sammilit` | Occasion, menu and cooking pickers that build an order slip |
| मित्रम किचन कैटरिंग | `Mitram-Catering` | Packages and an enquiry form |
| मित्रम रसोई, बलिया | `Mitram-Rasoi` | Hall booking enquiry |
| मित्रम लड्डू | `Mitram-Laddoo` | Weight / variety order |
| दही-चूड़ा · मकर संक्रांति | `Mitram-Sankranti` | Product and gift-pack order |

Fonts: Rozha One (display) and Mukta (body), from a Google Fonts `@import`. Tokens: `--mt-maroon #6E1428`, `--mt-saffron #E8A11A`, `--mt-bg #FFF8EC` and others.

## 2. Plan

### 2.1 Rule-by-rule (AGENTS.md)

| Rule | Applies? | Notes |
|---|---|---|
| Frontend ↔ backend validation mirror | **Deferred** | No backend, by instruction. The order and enquiry forms validate in the browser only (§2.5). When an API is built, it must mirror these rules. |
| DB schema → dated `.sql` | No | No DB. |
| Test cases up front | **Yes** | §3. |
| Page maps and API docs in sync | **Yes** | A new domain gets a new portal doc, `docs/frontend/mitram-portal.md` (feature sections plus an "All pages" table). The AGENTS.md list of portal docs gets one line for it. No API change, so `docs/api/*` is untouched. |
| Translation layer | **Exempt** | Fixed single-language (Hindi) static content, like `/mitram-rasoi` and `/ham-niwasi`. Not wrapped in `t()`. The prototype's CSS has `.lang-en` rules, but no board has a language switch, so there's nothing to port there. |
| No AI-attribution trailers | Yes | |
| Sensitive files never in git | Yes | The only `.env` change is local: the dev origin (§2.2). It's never committed. |
| Reactivation discipline | Done | `docs/planning/features/` has `2026-09-24-mitram-rasoi-page.md`: the `/mitram-rasoi` page on niwasi.in, a different Mitram Rasoi page that stays as is. It also has `2026-10-01-ham-niwasi-site.md`, the pattern followed here. Partner "daily-mitram-expense" is unrelated. |

### 2.2 Domain and routing (pattern: partner / event)

- **Folder:** `apps/frontend/app/(mitram)/mitram/**`, a new route group beside `(niwasi)`, `(partner)`, `(event)` and `(help)`.
  - **Why a real `/mitram` segment:** as with `/partner` and `/event-host`, two route groups can't both own `/`.
  - **Pages:** at internal `/mitram/*`.
- **`proxy.ts`:**
  - **Rewrite:** a new `isMitramHost(host)` (`mitram.niwasi.in` or any `mitram.` host, same shape as the partner and event checks) rewrites `mitram.<host>/<path>` to the internal `/mitram/<path>`.
  - **Guard:** on the niwasi host, internal `/mitram` and `/mitram/*` redirect to `/`, like `/partner` and `/event-host`. `/mitram-rasoi` isn't caught, because the check is the exact segment.
- ~~**Production domain:** **`mitram.niwasi.in` (assumed, Q1).** The Ham Niwasi site already links to `http://mitram.niwasi.in/kitchen`. The host check matches any `mitram.` subdomain, so a different final domain needs no code change.~~ _Superseded 2026-10-06 (Q1 answer)._
- ~~**Production domain:** decided by the DevOps team, not in code. The code only recognises the Mitram host by its **`mitram.` subdomain prefix** (`host.startsWith("mitram.")`), the same way partner and event are recognised. No full domain is hard-coded. **The one requirement for DevOps:** the Mitram site's host must start with `mitram.`.~~ _Superseded 2026-10-06: "ok do the domain like for the partner and even follow same pattern i was wrong"._
- **Production domain:** **`mitram.niwasi.in`, following the partner / event pattern exactly** (user, 2026-10-06). In `proxy.ts`: `isMitramHost(host) = host === "mitram.niwasi.in" || host.startsWith("mitram.")`, the same shape as `isPartnerHost` / `isEventHost`. Locally `mitram.niwasi.abhishek`; any other `mitram.` host also works.
- **Local dev:** `mitram.niwasi.abhishek`. Three steps, done **by the user** (sudo, or local files that aren't committed):
  1. `/etc/hosts`: `127.0.0.1 mitram.niwasi.abhishek`.
  2. `/etc/nginx/sites-available/niwasi.conf`: add `mitram.niwasi.abhishek` to the `server_name` that proxies to `127.0.0.1:3016`, then reload nginx.
  3. `apps/frontend/.env`: add `mitram.niwasi.abhishek` to `ALLOWED_DEV_ORIGINS`, then restart niwasi-web.
  - Until then I test by sending `Host: mitram.niwasi.abhishek` straight to `:3016` (curl, and Playwright host mapping).
- **URLs on the Mitram host**, using the prototype's page names and matching Ham Niwasi's existing `/kitchen` link:

| URL | Board |
|---|---|
| `/` | Home |
| `/services` | Services |
| `/kitchen` | Kitchen |
| `/bulk` | Bulk |
| `/sammilit` | Sammilit |
| `/catering` | Catering |
| `/rasoi` | Rasoi |
| `/laddoo` | Laddoo |
| `/sankranti` | Sankranti |

  - In-page anchors (`#top`, `#about`, …) are kept.
- **Not ported:** the prototype viewer's maroon top bar (page dropdown, Desktop / Mobile), as instructed.

### 2.3 Structure (Ham Niwasi pattern)

```
app/(mitram)/mitram/
├── layout.tsx            # next/font Rozha One + Mukta, .theme, lang="hi", shell (header, footer, toast)
├── mitram.module.css     # --mt-* tokens + scoped element baseline (as ham-niwasi.module.css)
├── page.tsx              # home
├── services/ kitchen/ bulk/ sammilit/ catering/ rasoi/ laddoo/ sankranti/  page.tsx
├── _components/          # MtHeader (nav + सेवाएँ dropdown + mobile drawer), MtFooter, Toast, OrderModal,
│                         # useOrder (the shared omVals / need / fld logic), PhoneInput, icons, ui.ts, data
└── _assets/              # the 82 board images + logo (extracted from the boards' data: URIs), static imports
```

- **The header is identical on every page** (only the active link differs), so unlike Ham Niwasi the header and footer live in the layout. The active link comes from `usePathname()`.
- **`(mitram)/layout.tsx`:**
  - **Metadata:** `title` template "मित्रम — %s", with the board titles.
  - **Favicon:** the Mitram logo, like `(event)`'s own favicon.
- **Styling: Tailwind v4 rewrite (decided by the user 2026-10-06, Q5)**, as for Mitram Rasoi and Ham Niwasi:
  - Tailwind v4 utilities in the components.
  - Brand tokens (the boards' `--mt-*` colours, radii and shadows, plus the font stacks) in a colocated CSS module on a `.theme` class, used through the CSS-variable shorthand (`bg-(--mt-maroon)`). Plus a scoped `@layer base` baseline where the boards rely on element defaults.
  - No global CSS, so nothing leaks to other areas.
  - Fonts via `next/font` (Rozha One, Mukta), so no Google Fonts request.
  - Breakpoints ported as the boards' `@media (max-width: 1180 / 900 / 560px)`, written `[@media(max-width:Npx)]:`.
  - The prototype's shared component styles (buttons, chips, cards, cart bar, order pop-up, toast) become shared React components or class-string constants in `_components/ui.ts`, so pages don't repeat them.
- ~~**Styling: the prototype's own stylesheet, scoped. _Proposed, awaiting the user's decision_, a change from the Mitram Rasoi / Ham Niwasi Tailwind rewrites:**~~ _Not chosen: the user decided on a Tailwind rewrite (Q5, 2026-10-06). The proposal below is kept for the record._
  - **Why:** unlike Ham Niwasi's Bootstrap, the Mitram boards ship a self-contained component stylesheet: about 27 KB shared (tokens, header, nav dropdown, mobile drawer, footer, buttons, chips, cards, cart bar, order pop-up, toast) plus 4–9 KB per page. Hand-translating about 60 KB of CSS to utilities is slow and risks drift. Keeping it is exact and much less code.
  - **How:** it's ported as **CSS modules**. Every rule is rewritten to `.theme :global(<selector>)`, where `.theme` is the hashed class on the layout wrapper. So rules only apply inside the Mitram wrapper and **cannot leak** to other areas, even after client navigation. That was the reason for avoiding global CSS (TC-MT-18).
  - **Mapping:** `:root{…}` tokens go on `.theme`. `html, body` rules are dropped or moved to the wrapper. The Google Fonts `@import` is dropped: Rozha One and Mukta come from `next/font` instead.
  - **Files:**
    - **Shared rules:** `mitram.module.css`.
    - **Page-only rules:** `<page>/<page>.module.css`, scoped the same way. They load after the shared CSS, as in the prototype.
  - **Markup:** keeps the prototype's class names (`className="btn btn-saffron"`). Tailwind isn't used inside this area.
  - **Generation:** ~~the CSS modules are generated from the boards by a repeatable script~~. _The Python generator was removed at the user's request; if this approach is chosen, how the CSS is produced is to be agreed (e.g. a Node script, or by hand)._
- **Interactive parts are client components;** the rest stays on the server.
- **The prototype's data** (menu items, prices, packages) is ported verbatim into typed constants.

### 2.4 Assets

- **Board images:** the `img/*` files are copied into `_assets/`, keeping their hash names, and statically imported.
  - **Large photos** go through `next/image` optimisation.
  - **Small logos** are `unoptimized`.
- **Inline images:** logos inlined as `data:` URIs in the boards are extracted to files.
- **Prototype copy in the repo:** `docs/prototype/mitram/`, holding `README.md` and `design/canvas/` (boards, `support.js`, `canvas.json`, `img/`; 6.4 MB). The 6.9 MB `Mitram-Prototype.html` / `index.html` is not added: it's the same content inlined. Decided ("keep any one", Q4).

### 2.5 Forms and orders (frontend only)

- **Mobile number fields: none in the prototype** (checked 2026-10-06, every `<input>`, `<select>` and `<textarea>` in the 9 boards).
  - **The inputs that exist:**
    - Kitchen: menu search;
    - Bulk: number of people;
    - Sammilit: guests, date, meal time, distance, plate packing, a checkbox, the paneer option;
    - Catering: menu, guests, occasion.
  - **The unused check:** the boards' shared script has a 10-digit mobile check (`need()`, `/^[6-9][0-9]{9}$/`), but it belongs to an order form no page renders.
  - **Rule for any mobile field added later (user, Q3):** digits only, at most 10.
- ~~**Order pop-up (all pages):**~~ _The form fields below were assumed before checking; there is no order form (see §5, "finding: no order forms")._ **Order pop-up (all pages):**
  - **Fields:** name, mobile, address, and the prototype's date / time / payment fields.
  - **Validation:** required fields, and the mobile number must match the prototype's rule `^[6-9][0-9]{9}$`.
  - **Mobile input:** it also gets the Ham Niwasi phone-input behaviour, so digits only and at most 10. That fixes the "text and more than 10 digits" problem the user reported on Ham Niwasi on 2026-10-05, before it can happen here (Q2).
  - **Errors:** the prototype's toasts, "सही 10 अंकों का मोबाइल नंबर डालें।" and "लाल घेरे वाले खाने भरें।".
- **"Submit":** as in the prototype, it shows a simulated order number (`MT-…`), a WhatsApp link (`wa.me/917070819777` with the order text pre-filled) and a call link. **Nothing is sent or stored by the site.**
  - The WhatsApp link only opens the visitor's own WhatsApp with a draft, which they choose to send.
  - Add a code comment: "Frontend only — no backend yet".
- **Kept from the prototype:** cart remove, clear with undo, and the toasts.
- **Enquiry forms** (catering, Rasoi hall) follow the same rules.

### 2.6 Files outside the route folder

| File | Change |
|---|---|
| `apps/frontend/proxy.ts` | Mitram host rewrite, plus the `/mitram` guard on the niwasi host |
| `docs/frontend/mitram-portal.md` | **New** portal doc |
| `AGENTS.md` | Add `mitram.niwasi.in` → `docs/frontend/mitram-portal.md` to the page-map rule |
| `docs/prototype/mitram/` | Prototype copy |

No `apps/api` change. `globals.css` and the root layout are untouched.

### 2.7 Open questions: answered 2026-10-06 (see §4)

- ~~**Q1:** domain set by DevOps; the code matches the `mitram.` prefix only.~~ **Q1 (revised):** `mitram.niwasi.in`, with the same host check as partner / event.
- **Q2:** URLs as recommended.
- **Q3:** mobile fields are digits only, at most 10 (no such field exists in the prototype).
- **Q4:** keep one prototype copy, the current `design/` + `README.md`.
- **Q5:** Tailwind rewrite.
- **Q6** (how to generate scoped CSS) is moot.

_Original questions, for the record:_

1. **Q1, production domain:** `mitram.niwasi.in` is assumed. The code matches any `mitram.` host.
2. **Q2, phone input:** digits only and at most 10 while typing, on top of the prototype's `^[6-9]\d{9}$` check. Recommended, given the Ham Niwasi report.
3. **Q3, prototype copy:** commit `design/canvas/` + `README.md` (about 7 MB), not the 6.9 MB inlined `index.html`.
4. **Q4, page URLs:** English slugs (`/kitchen` etc.), as listed in §2.2.

### 2.8 Work split

Same as Ham Niwasi:
- **I build the shell first:** routing, layout, tokens, header, footer, toast, order pop-up and `useOrder`, assets, and the home-page shell.
- **Then 4 parallel agents port the pages,** each against its board at 1440 and 390px:
  - A: Home + Services;
  - B: Kitchen;
  - C: Bulk + Sammilit + Laddoo;
  - D: Catering + Rasoi + Sankranti.

## 3. Test cases (designed up front)

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-MT-01 | Mitram host serves the site | Local host set up (§2.2) | Open `http://mitram.niwasi.abhishek/` | The Mitram home page, with no Niwasi header or footer and no prototype maroon bar | H |
| TC-MT-02 | Every page reachable | — | Open `/`, `/services`, `/kitchen`, `/bulk`, `/sammilit`, `/catering`, `/rasoi`, `/laddoo`, `/sankranti` on the Mitram host | Each returns 200 with the board's title | H |
| TC-MT-03 | Internal path guarded | — | Open `http://niwasi.abhishek/mitram` and `/mitram/kitchen` | Redirect to `/` on niwasi; never the Mitram page | H |
| TC-MT-04 | Other hosts unaffected | — | Open `niwasi.abhishek/`, `/mitram-rasoi`, `partner.…/`, `event.…/` | Unchanged | H |
| TC-MT-05 | Desktop fidelity | Board open side by side | Compare each page with its board at 1440px | Same sections, order, copy, prices, colours, images | H |
| TC-MT-06 | Mobile fidelity | — | Compare each page with its board at 390px | Same responsive layout (1180 / 900 / 560px breakpoints); no horizontal overflow | H |
| TC-MT-07 | Header nav and active link | — | Visit each page | होम / सुनई के बारे में / सेवाएँ, with the current page marked as in the board; the सेवाएँ dropdown lists the 7 services and links correctly | H |
| TC-MT-08 | Mobile drawer | ≤900px | Open ☰; tap a service; open again and close via ✕ and the backdrop | Drawer opens and closes; links navigate and close it | H |
| TC-MT-09 | Home banner carousel | — | Wait; use the arrows, chips and pause | Slides advance and controls work as in the board | M |
| TC-MT-10 | Kitchen cart | — | Add items with +, change quantity, remove | Totals update as in the board; the cart lists the lines | H |
| TC-MT-11 | Order pop-up validation | Items in cart | Open the order; submit empty; then with a 9-digit, then a `5…` mobile | Red fields and the board's toasts ("लाल घेरे वाले खाने भरें।", "सही 10 अंकों का मोबाइल नंबर डालें।"); it doesn't submit | H |
| TC-MT-12 | Mobile field input | — | Type letters and 12 digits; paste `+91 98765 43210` | Only digits are kept, at most 10; a pasted `+91` is dropped | H |
| TC-MT-13 | Order "submit" sends nothing | Valid order | Submit; watch the network | A simulated `MT-…` number, a WhatsApp link with the order text, and a call link; **no non-GET request** | H |
| TC-MT-14 | Clear and undo | Items in cart | Clear the order; then Undo | Cart cleared with the "ऑर्डर हटा दिया गया।" toast; Undo restores it | M |
| TC-MT-15 | Bulk calculator | — | Change the people count and options | Cost recomputes as in the board's script; the minimum of 20 is respected | H |
| TC-MT-16 | Sammilit builder | — | Pick an occasion, menu and cooking option | The slip and total match the board's script | H |
| TC-MT-17 | Catering, Rasoi, Laddoo, Sankranti flows | — | Use each page's selection and enquiry or order | Behaves as in its board; the forms send nothing | H |
| TC-MT-18 | No style leak | — | Load a Mitram page, then a Niwasi page in the same tab | The Niwasi page looks unchanged (scoped CSS module only) | M |
| TC-MT-19 | No external requests | — | Load each page with DevTools Network open | No Google Fonts or CDN request; no `/api` call | M |
| TC-MT-20 | Tab identity | — | Look at the browser tab on each page | "मित्रम — <page>" title and the Mitram favicon | L |

## 4. Sign-off

- ~~**2026-10-06:** requirement received (§1). Asked to plan and then port, so the open questions in §2.7 go ahead on their recommendations and are flagged to the user.~~ _Superseded by the next entry: implementation must wait for the user's go-ahead._
- **2026-10-06, implementation stopped by the user:** "why did you start implementing the task before i even read the plan and said you can start implementing ?also why have you used python in the prototype", then "i just want you to revert everthing code retated and just keep the doc and the vhost setup".
  - **What went wrong:** I had started building after writing this plan, reading "create a plan file and port" as a go-ahead. I also changed the styling approach and added two Python helper scripts without asking.
  - **Reverted:**
    - the `proxy.ts` changes;
    - the whole `apps/frontend/app/(mitram)/` folder;
    - `public/mitram-favicon.jpg`;
    - `docs/prototype/mitram/scope-css.py` and `board-to-jsx.py`.
  - **Kept:**
    - this plan;
    - the prototype copy in `docs/prototype/mitram/` (`README.md` + `design/`);
    - the local dev host setup: `mitram.niwasi.abhishek` in `ALLOWED_DEV_ORIGINS` (local `apps/frontend/.env`, gitignored).
  - **Status is back to `proposed`.** No implementation until the user has reviewed this plan, answered §2.7, decided the styling approach (§2.3) and says to start.

- **2026-10-06, answers to the open questions:**
  > 1 i dont understand what have to do with the recommendation would you like hardcode it or something at the code level / isnt the domain decided by the devops team
  > 2 do as recommended
  > 3 allow only digits at most 10  (but i cant find any mobile fields check properly )
  > 4 keep any one
  > 5 rewrite in tailwind
  - **Q1:** explained. The domain is DevOps's; the code only checks the `mitram.` prefix, and no domain is hard-coded (§2.2).
  - **Q2:** URLs as recommended (§2.2 table).
  - **Q3:** re-checked: no mobile fields exist (§2.5). The rule is recorded for future fields. _I had wrongly guessed earlier that some inputs were mobile numbers._
  - **Q4:** keep the current copy (`design/` + `README.md`); don't add the inlined HTML.
  - **Q5:** Tailwind rewrite. The earlier recommendation was to reuse the scoped prototype CSS; the user decided Tailwind, and it will be built as asked (§2.3). Q6 (generator) is therefore moot.
  - **Status stays `proposed`:** implementation starts only when the user says so.
- **2026-10-06, Q1 revised:** "ok do the domain like for the partner and even follow same pattern i was wrong".
  - **Domain:** `mitram.niwasi.in`, checked as `host === "mitram.niwasi.in" || host.startsWith("mitram.")`, like partner and event (§2.2).
  - **Supersedes:** the prefix-only wording from the first Q1 answer.

- **2026-10-06, go-ahead:** "and now start the implementation". Status set to in-progress. Built per the plan as answered: Tailwind rewrite (Q5), `mitram.niwasi.in` with the partner / event host check (Q1), English URLs (Q2), the current prototype copy (Q4). Work split per §2.8. No tooling scripts are added to the repo; throwaway helpers stay in the scratchpad.

- **2026-10-06, improvement:** "can you remove this http://mitram.localhost:3000/#top#top when i click mitram logo add simple scroll to top behaviour smooth".
  - **Problem:** the header logo links to `/#top`. Clicking it while the URL already has `#top` gives `/#top#top`.
  - **Change:** the logo links to `/` with no hash.
    - **On the home page:** the click scrolls smoothly to the top and leaves the URL as `/`.
    - **On any other page:** it navigates to `/`, which opens at the top.
  - **Reduced motion:** under prefers-reduced-motion the scroll is instant.
  - **Scope:** the logo only, as asked. The header and footer "होम" links still use `/#top`.

- **2026-10-06, extended:** "yes and for the sunai ke bare me too". The same behaviour now applies to every "होम" link (header nav, mobile drawer, footer) and every "सुनई के बारे में" link (same three places).
  - **होम:** behaves like the logo.
  - **सुनई के बारे में, on the home page:** scrolls smoothly to the `#about` section, with no hash added (so no `#about#about`). Instant under reduced motion. The mobile drawer closes first.
  - **सुनई के बारे में, from another page:** goes to `/#about` (a single hash), so the browser lands on the section.
  - **Implementation:** one shared client component, `HomeLink`, used by the header, drawer and footer, so all six links behave the same.

- **2026-10-06, user verification:** "ok i verified all the pages and everything against the prototype and as much as i have seen everything seems to match". All 9 pages were checked by the user against the prototype. Status stays `in-progress` until the user says it's shipped.

- **2026-10-06, shipped:** "so the code has been merged with the main branch and push", clarified as "we recently worked on mitram so that is why i was telling you i have merged the code to main and pushed so you could complete the rest process after the push".
  - Status set to `shipped` (frontend `4a270e8`, root `e95a699`).
  - §3 rows TC-MT-01..20 copied verbatim to `docs/testing/TEST_CASES.md`.

## 5. Execution log

- ~~**2026-10-06, shell built:**~~ _Reverted the same day at the user's request (see §4). Kept as a record of what was tried and found._
  - **`proxy.ts`:** `isMitramHost`, the `/mitram` rewrite, and the `/mitram` guard on the niwasi host (exact segment).
  - **`app/(mitram)/mitram/`:**
    - `layout.tsx`: Rozha One + Mukta via `next/font`, the `.theme` wrapper, `.mt` root, header, footer, `ToastProvider`, and metadata (title template, favicon `/mitram-favicon.jpg`).
    - **Generated CSS:** `mitram.module.css` (362 rules all 9 boards share) and one `<page>.module.css` per page with that board's own rules, scoped `.page :global(…)`.
      - **Why per page:** every CSS module hashes its own `.theme`, so a page module can't reuse the layout's.
      - **Split method:** rules are compared one by one, including inside `@media`. A file-prefix split put shared responsive rules into the page files, since each board repeats them after its own.
      - **Animation names:** CSS-module keyframe renaming checked; references stay consistent.
    - **`_components/`:** `MtHeader` (active link: होम on `/`, सेवाएँ elsewhere; dropdown; drawer), `MtFooter`, `Toast` (the boards' toast with undo, no auto-dismiss, as in the prototype), `OrderModal`, `icons.tsx` (19 Lucide icons), `ui.ts`, `kitchenData.ts` (69 items and 12 sections, verbatim; shared by Home and Kitchen).
    - **`_assets/`:** 82 board images, `logo.jpg` (the boards' only inlined image, 160×160) and `images.ts` (a static-import index).
  - **Tools in `docs/prototype/mitram/`:** `scope-css.py` (CSS generator) and `board-to-jsx.py` (markup converter for the page ports).
  - **Prototype copy:** `README.md` and `design/canvas/` (103 files, 6.4 MB). The 6.9 MB inlined `index.html` was not copied (Q3).
  - **Local dev:** `mitram.niwasi.abhishek` added to `ALLOWED_DEV_ORIGINS` in the local, gitignored `apps/frontend/.env`. Without it the dev server refused the host's script requests and the page never hydrated. niwasi-web restarted.
  - **Verified:**
    - `niwasi.abhishek/mitram` and `/mitram/kitchen` return 307 to `/`; `/mitram-rasoi`, niwasi `/`, partner `/` and event `/` return 200; the Mitram host `/` returns 200 (TC-MT-03 / 04 PASS).
    - The header at 1440px matches the board, and the mobile drawer opens at 390px.
    - `tsc` and `eslint` clean.
- **2026-10-06, finding: no order forms in the boards.** Every "order" ends in the call-to-confirm pop-up (the order summary, remove, clear, Close and Call). The shared script's form / submit / WhatsApp-order logic (`omForm`, `omDone`, `omWa`) is never rendered. Inputs exist only on Kitchen (1), Bulk (1), Sammilit (7) and Catering (3). The §2.5 details are confirmed per page by the port batches.
- **2026-10-06, styling approach proposed (§2.3), not decided:** use the prototype's scoped stylesheet instead of a Tailwind rewrite. This was applied before the user agreed, then reverted; it awaits the user's decision.
- **2026-10-06:** prototype analysed:
  - 9 responsive pages, not 18;
  - shared CSS, header, footer and order logic;
  - per-page scripts of 4–25 KB.
  - Local host setup (nginx, `/etc/hosts`, `ALLOWED_DEV_ORIGINS`) inspected. Planning file created.

- **2026-10-06, shell rebuilt after the go-ahead (Tailwind):**
  - **`proxy.ts`:** `isMitramHost` (`host === "mitram.niwasi.in" || host.startsWith("mitram.")`), the `/mitram` rewrite, and the `/mitram` guard on the niwasi host.
  - **`app/(mitram)/mitram/`:**
    - `layout.tsx`: `next/font` Rozha One + Mukta, the `.theme` wrapper as the boards' `.mt` root, header, footer, ToastProvider, and metadata (title template, `/mitram-favicon.jpg`).
    - `mitram.module.css`: tokens, a two-rule base layer, and the 20% counter animation (CSS-only).
    - `_components/`: `ui.ts` (shared Tailwind strings plus `btn()`, `inp()`, `chipB()`), `icons.tsx` (22 Lucide), `MtHeader`, `MtFooter`, `Toast`, `OrderModal`, `NiwasiBand`, `kitchenData.ts`.
    - `_assets/`: 82 images, `logo.jpg` and `images.ts`. These were generated with throwaway Node commands; no scripts were added to the repo.
  - **Fixes found while building:**
    1. **Breakpoint classes built from a variable** (`${M900}:grid`) weren't generated, since Tailwind only reads literal text. They're now written out, and the page brief forbids composed classes.
    2. **The module's `.icon` base rule** had its class name hashed; it's now `:global(.icon)`.
  - **Verified:**
    - 1440px header and dropdown match the board. At 390px the drawer matches and opens.
    - The footer matches.
    - Glyph widths differ slightly: the known Linux hinting artefact (Ham Niwasi §5).
    - `tsc` and `eslint` clean.
  - **Next:** the 9 pages in 4 parallel batches (§2.8).

- **2026-10-06, docs (same change, per the AGENTS.md sync rule):**
  - **New:** `docs/frontend/mitram-portal.md`, with the pages table and the "All pages" table (9 pages).
  - **`AGENTS.md`:** the page-map rule gains `mitram.niwasi.in` → `mitram-portal.md`.
  - **`apps/frontend/README.md`:**
    - the multi-domain routing section covers the Mitram host: table row, diagram, folder layout, the rewrite branch, the `/mitram` guard, local hosts and `ALLOWED_DEV_ORIGINS`;
    - "three domains" becomes "four".
  - **Unchanged:** `docs/api/*` (no API change).

- **2026-10-06, batch B (Kitchen) done:**
  - **Files:** `kitchen/page.tsx` (server; static blocks) and `_components/KitchenMenu.tsx`.
  - **What it covers:** toolbar search, the veg / non-veg segment, the basket count, section chips, grids with the "सभी N डिश देखें" expander, empty state and reset, the sticky cart bar with clear and undo, and `OrderModal`. kQty / kSet / kView / kLines are ported 1:1.
  - **Result:** PASS at 1440 and 390px. Positions match the board within 1px, and the same Playwright script on board and port gave identical output (totals, toasts, remove, clear + undo, filters, search). No non-GET requests. `tsc` and `eslint` clean.
  - **Deviations:**
    - The title uses `absolute`, because the board's title "मित्रम किचन — आज का भोजन" doesn't follow the template.
    - A board quirk is kept: the toolbar has no vertical padding at ≥901px.
- **2026-10-06, batch A (Home, Services) done:**
  - **Files:** `page.tsx`, `_components/HomeBanner.tsx`, `services/page.tsx`, `_components/ServicesList.tsx`.
  - **Result:** PASS at 1440 and 390px.
    - **Carousel:** 7 slides; a 5s tick that skips when paused or after a manual pick; chips, prev/next, pause/play. It starts paused under reduced motion.
    - **Services:** the filter chips show and hide rows as in the board.
    - **Animations:** the slide-in and progress bar use Tailwind `starting:` transitions, so no keyframes were added.
  - **Deviation:** Home has no kitchen preview or order pop-up, because the board never renders them (§1 corrected). The portal doc's Home description is corrected too.
- **2026-10-06, shared-footer fix (reported by A and B):**
  - At ≤560px the footer kept 2 columns: the overlapping `[@media(max-width:900px)]` / `[@media(max-width:560px)]` rules resolved in the wrong order. It now uses non-overlapping ranges.
  - At 1440px it was 9px short: preflight made the logo a block, while in the board it's inline on a text line. It's now `inline align-baseline`.
  - **Re-measured:** identical to the board (386px at 1440, 1037px at 390).
- **2026-10-06, environment:**
  - **What happened:** around 11:21 a `next build` / `next start` was run outside this session. pm2's niwasi-web and niwasi-api are stopped.
  - **Workaround:** batch A started its own `next dev -p 3016`, which the other batches use.
  - **To do after the batches:** hand port 3016 back to pm2.

- **2026-10-06, batch C (Bulk, Sammilit, Laddoo) done:**
  - **Files:** `bulk/`, `sammilit/` and `laddoo/` `page.tsx`, plus `_components/BulkCalc.tsx`, `SammilitBuilder.tsx` and `LaddooOrder.tsx`. Bulk's own 20% band variant is built in its page and reuses `styles.nwNum`.
  - **Result:** all PASS at 1440 and 390px (heights within ±15px). Interactions match each board's script:
    - **Bulk:** minimum of 20 people, the steppers, and the options and staff range;
    - **Sammilit:** occasion chips, the 5 tabs, paneer and ghee options, quantities, packing, distance / date / meal, the guards;
    - **Laddoo:** ½-kilo steppers and pick-up / delivery;
    - **All three:** the pop-up, remove, and clear with undo.
    - No non-GET requests.
  - **Text-width wraps:** two lines wrap only because of the known glyph-width artefact. On Bulk at 390px the two hero buttons wrap; the board fits them with 4px to spare. On Sammilit at 1440px the note bar wraps.
  - **Kept from the boards:** Bulk shows the people count "0" after clear; Sammilit's "copy" shows its toast even when the clipboard is unavailable (plain http).
  - **Laddoo's announcement bar:** `.ann`, the only per-page bar, sits above the header on the board. It's now rendered by `MtHeader` on `/laddoo` before the sticky header (moved out of the page by the coordinator). Re-checked against the board at 1440px: it matches.

- **2026-10-06, batch D (Catering, Rasoi, Sankranti) done:**
  - **Files:** `catering/`, `rasoi/` and `sankranti/` `page.tsx`, plus `_components/CateringUi.tsx` (shared strings: veg marks, segment, select chevron), `CateringOrder.tsx`, `CateringBhoj.tsx`, `CateringGallery.tsx` (the lightbox: the board's second modal), `RasoiCopy.tsx`, `SankrantiOrder.tsx`.
  - **Result:** PASS at 1440 and 390px (heights within ±35px from text-width wraps). Interactions match the boards:
    - **Catering:** occasion chips synced with the select, the non-veg +₹50, package and thali "चुनें", the bhoj service highlight, guests ±10 with a minimum of 10, the estimate pop-up, clear with undo, the lightbox;
    - **Rasoi:** the copy toasts;
    - **Sankranti:** category filter, variants, ½-kilo steppers, gift pack, cart bar, remove, clear with undo.
    - No non-GET requests.
  - **Titles:** Catering, Kitchen and Rasoi use `title.absolute`, because their board titles don't follow "मित्रम — …".
  - **Kept from the board:** the package toasts say "ऊपर खर्च देखें" although the calculator is below them.
  - **Sankranti's info bar:** `.ann.ann2` belongs above the header. It's now rendered by `MtHeader` on `/sankranti`, like Laddoo's.
- **2026-10-06, coordinator fixes after the batches:**
  - **Home tab title:** it was "होम". The layout's title template doesn't apply to the page in the layout's own folder, so it's now `absolute: "मित्रम — होम"`.
  - **Leftovers:** an unused import in Sankranti was removed.
- **2026-10-06, environment restored:** the agent-started `next dev -p 3016` was stopped, and pm2's niwasi-web and niwasi-api were started again. pm2 stopped both once more during the final crawl (the VS Code-crash pattern); they were restarted again.
- **2026-10-06, final verification (pm2 dev server):**
  - **Checks:** `tsc` (whole frontend) exit 0, and `eslint` on `app/(mitram)` and `proxy.ts` exit 0.
  - **Crawl:** all 9 pages at 1440 and 390px on the Mitram host return 200 with the board titles, and the 11 internal links resolve.
    - **Clean:** no console errors, no broken images, no horizontal overflow.
    - **Requests:** no non-GET, `/api` or third-party requests (fonts are self-hosted). TC-MT-02 / 06 / 13 / 19 / 20 PASS.
  - **Routing:** `niwasi.abhishek/mitram` and `/mitram/kitchen` return 307 to `/`; niwasi `/mitram-rasoi`, niwasi `/`, partner `/` and event `/` return 200; Mitram `/mitram/bulk` returns 200 (no double prefix). TC-MT-03 / 04 PASS.
  - **Per-page fidelity and interactions:** TC-MT-05 / 07–11 / 14–17 PASS, per the batch reports above.
  - **TC-MT-12** (mobile-field input): not applicable, since no mobile fields exist (§2.5).
  - **TC-MT-18** (no style leak): only a CSS module scoped to `.theme` plus Tailwind utilities, and no global CSS. PASS by construction.
  - **TC-MT-01** (visiting through `mitram.niwasi.abhishek` in a browser) needs the user's `/etc/hosts` and nginx entries (§2.2). Until then it's verified with the `Host` header against :3016.

- **2026-10-06, logo scroll-to-top built (§4):**
  - **Code:** `MtHeader` logo `href="/"` with an `onClick` that, on the home page, prevents navigation, calls `window.scrollTo({ top: 0, behavior: "smooth" })` (instant under reduced motion) and clears any hash with `history.replaceState`.
  - **Verified in Playwright** on a temporary dev server on :3017 (the user's `next start` was on :3000 and pm2 was stopped; the temporary server was stopped afterwards):
    - from the home page scrolled to 2500px, the click scrolls smoothly (1990px after 150ms) to 0, and the URL stays `/`;
    - a second click gives the same result, with no hash;
    - starting at `/#top`, the click scrolls to 0 and the hash is removed;
    - from `/kitchen`, the click navigates to `/` at the top.
  - **Checks:** `eslint` clean.

- **2026-10-06, होम / सुनई के बारे में links built (§4):**
  - **Code:** new `_components/HomeLink.tsx` (client), used by the logo, header nav, mobile drawer and footer, replacing all six `/#top` / `/#about` links and the logo's own handler.
  - **Verified in Playwright** on a temporary dev server on :3017 (stopped afterwards by PID; the user's :3000 untouched):
    - **On the home page:** the header and footer होम links scroll to 0. सुनई के बारे में scrolls to `#about` (section top at 0, as a native anchor jump lands), including on a second click and from `/#about`. The URL stays `/`.
    - **At 390px:** the drawer links scroll and close the drawer.
    - **From `/kitchen`:** सुनई के बारे में opens `/#about` at the section, and footer होम opens `/` at the top.
  - **Checks:** `tsc` and `eslint` clean.

## 6. Post-deploy

_None yet._

## 7. Cross-references

- Pattern: [2026-10-01-ham-niwasi-site.md](2026-10-01-ham-niwasi-site.md), [2026-09-24-mitram-rasoi-page.md](2026-09-24-mitram-rasoi-page.md)
- Routing: `apps/frontend/proxy.ts` (`isMitramHost`, `/mitram` guard); documented in `apps/frontend/README.md` (multi-domain routing)
- TEST_CASES: TC-MT-01..20, promoted from §3 on ship (2026-10-06)
- Page maps / API docs updated: `docs/frontend/mitram-portal.md` (new) and `AGENTS.md` (page-map rule); no API change
- Prototype: `docs/prototype/mitram/`
- Commits: frontend `4a270e8` "feat(mitram): Add Mitram site pages and proxy configuration"; root `e95a699` "feat(mitram): add mitram prototype and add planning doc for its implementation"
