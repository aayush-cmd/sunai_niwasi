# Mitram website: changes after ship (batch of 5)

| Field | Value |
|---|---|
| Status | in-progress |
| Started | 2026-10-06 |
| Shipped | |
| SRS row | — |
| Test cases | TC-MTC-01..20 |
| Prototype todo | — |

Follows the shipped [2026-10-06-mitram-site.md](2026-10-06-mitram-site.md). Same pattern: Tailwind, the `app/(mitram)/mitram/` route group, frontend only, translation-exempt static Hindi.

## 1. Requirement (as given)

> we have got 5 new changes in the mitram subdomain
> 1st  Mitram logo change to only text in Hindi.
> check this prototype
> file:///home/triline27/Downloads/Mitram-Website%20(1)/Mitram-Website/index.html#Mitram-Home

_(Screenshot: the site header with "मित्रम" as text only, no logo image or tagline, then होम / सुनई के बारे में / सेवाएँ and the call button.)_

**Updated prototype:** `/home/triline27/Downloads/Mitram-Website (1)/Mitram-Website/`, with the same layout as before (`index.html`, `README.md`, `design/canvas/*.dc.html`, `img/`).
- **Every board has changed size** against the shipped copy in `docs/prototype/mitram/`. For example, Home went from 179 KB to 377 KB and Catering from 148 KB to 593 KB. So it carries more than change 1.
- **Not acted on:** other differences not yet asked for. One example is the सेवाएँ dropdown order, which now starts with "₹48 भोजन". They wait for changes 2–5.

> change 2 and 3
> Update - bulk  page as  shared prototype page
> file:///home/triline27/Downloads/Mitram-Website%20(1)/Mitram-Website/index.html#Mitram-Bulk
>
> also check ss this 20% section has been updated check the ui in the shared prototype and correct this section where ever we use it in the ui

_(Screenshot: the current maroon band, a big yellow "20%" with "आमदनी का 20% हम निवासी अभियान के लिए" and its paragraph.)_

> ok next 2 changes are
> Include a video section in Mitram catering.
> file:///home/triline27/Downloads/Mitram-Website%20(1)/Mitram-Website/index.html#Mitram-Catering
>
> and the last is
> we have to hide the mitram kitchen page for now and also disable it from indirect routing
> make a seperate file for the menu and route mapping if not already and make al this configuration there
> also when we hide the kitchen from the menu
> it is also avaiable in some other pages like home and services page
> comment out the see and order button from the kichen card and also disable its hover aimation for now

_(Screenshot: the Home services grid. The "मित्रम किचन — रोज़ का भोजन" card has no "देखें और ऑर्डर करें" link and its text is the address "SBI बैंक बाज़ार समिति ब्रांच के नज़दीक, बहादुरपुर, पटना"; the other cards keep their link.)_

## 2. Plan

### 2.1 Rule-by-rule

| Rule | Applies? | Notes |
|---|---|---|
| Validation mirror / DB `.sql` | No | Static site, no backend. |
| Test cases up front | Yes | §3. |
| Page maps in sync | Per change | Change 1 adds and removes no page. `docs/frontend/mitram-portal.md` changes only if a later change touches pages. |
| Translation | Exempt | Static Hindi, as in the parent plan. |
| Reactivation | Done | The parent plan is shipped; this file holds the follow-up changes. |

### 2.2 Change 1: header logo becomes text only

The new boards' markup:
- **Header:** `<a class="brand" href="…#top"><b>मित्रम</b></a>`, with no `<img>` and no `<small>घर जैसा भोजन</small>`.
- **Mobile drawer:** `<span class="brand"><b>मित्रम</b></span>`, with no `<img>`.
- **Footer:** unchanged; it keeps the logo image.

The brand CSS is unchanged, so the text keeps its current styling:
- the display font (Rozha One);
- maroon colour;
- 30px desktop, 24px at ≤900px, 22px in the drawer.

**Code, `_components/MtHeader.tsx` only:**
1. **Header brand:** remove the logo `<Image>` and the tagline `<small>`; keep `<b>मित्रम</b>` inside the existing `HomeLink` (scroll-to-top behaviour unchanged).
2. **Drawer brand (`mnav-h`):** remove the logo `<Image>`; keep `<b>मित्रम</b>`.
3. **Imports:** drop the `logo` import from `MtHeader` if nothing else there uses it. The footer still uses `_assets/logo.jpg`, and the favicon (`public/mitram-favicon.jpg`) stays.

### 2.2b Change 2: Bulk page redesigned (`/bulk`, board `Mitram-Bulk.dc.html`)

The new board's outline is hero → `bk-main` → the new order section (change 3) → footer.
- **Removed:** the old cream menu-card section, the 5 services, and the separate `#calc` section with its side bill and order pop-up.

**Hero (`.bk-hero`), revised:**
- **Copy:** eyebrow "मित्रम किचन की ओर से"; h1 "सबसे अच्छा, सबसे सही दाम पे भोजन"; new lead text.
- **Buttons:** two new styles: "अभी ऑर्डर करें" (`btn-white`, links to `#calc`) and "WhatsApp पर पूछें" (`btn-wline`, wa.me).
- **Card (`bk-card`):** "सम्मिलित प्रयास पैकेज", a "कम से कम 20 आर्डर" pill, ₹48 / भोजन, the 4 items, and a take-away note.

**`bk-main`:**
- **₹48 block (`bk-big`):** ₹48 प्रति भोजन, with the items listed.
- **Calculator (`#calc`, `bk-calc`), left side:**
  - people stepper (±5, minimum 20, typing allowed);
  - utensils pills ("अपने बर्तन · मुफ़्त" / "बर्तन हमारे · ₹3");
  - pickup pills ("ख़ुद ले जाएँगे" / "पहुँचा दें · ₹5 + टेम्पू भाड़ा");
  - serving-staff stepper (₹700–1000 each).
- **Calculator, right side (`bk-bill`):** the estimated bill lines, total and a note (under 20 people, or delivery fare), then "WhatsApp पर ऑर्डर भेजें" and "या कॉल करें".

**New: a booking form pop-up (`bk-modal`).** This is the first real form on the site.
- **Fields:**
  - नाम (required);
  - **मोबाइल नंबर** (required, `/^[6-9][0-9]{9}$/`);
  - तारीख़ (required, today or later);
  - कितने लोग (required, ≥ 20);
  - pickup segment;
  - पता (required only for delivery).
- **Validation:** the board's own error toasts, verbatim: "सही 10 अंकों का मोबाइल नंबर डालें।", "आज या आगे की तारीख़ चुनें।", "कम से कम 20 लोग चुनें।" and "लाल घेरे वाले खाने भरें।". Invalid fields get the red `is-err` state.
- **Valid submit:** shows "बुकिंग तैयार है" with a simulated number `BK-…`, the summary and the total, then "WhatsApp पर भेजें", a wa.me link with the booking text pre-filled.
- **Nothing is sent by the site.** It only opens the visitor's own WhatsApp.
- **Opening it with fewer than 20 people** gives the toast "कम से कम 20 लोगों का ऑर्डर चुनें।".
- **The mobile field** also follows the user's standing rule (parent plan Q3): **digits only, at most 10** while typing, on top of the board's check.

**Script:** the new board's `renderVals` is the reference: food n×48, utensils n×3, delivery n×5, staff as a range of srv×700 to srv×1000, and the total as a range when staff are added.
- **Code:** rewrite `bulk/page.tsx` and `_components/BulkCalc.tsx` to the new board; the old pop-up/side-bill code goes.
- **New pieces:** `btn-white` / `btn-wline` and any other new classes are ported as Tailwind from the new board's CSS.

### 2.2c Change 3: the 20% band becomes the new "order" section (`.oc`)

**The old band is gone.** In the new boards the maroon `section.niwasi` (big "20%", heading, paragraph) is gone from every page. In its place is a new light section, `<section class="oc">`, **identical on all 6 pages that have it** (same markup hash).

**Left column:**
- "अभी ऑर्डर करें";
- a large yellow phone pill "7070 <u>819</u> 777" (`tel:`);
- the address (SBI बैंक बाज़ार समिति ब्रांच के नजदीक, बहादुरपुर, पटना);
- "FSSAI लाइसेंस नंबर: **10425000002048**".

**Right column**, with a left border in #B9853A:
- a banner **image** "आमदनी का 20% अभियान के लिए" (the 20% message is now artwork);
- the line "क्योंकि हम लोग घर से ज्यादा, घर के बाहर समय बिताते हैं।";
- a row with the **हम निवासी** logo image and a **QR code** image captioned "स्कैन करें".

**Images:** all 3 are inlined in the board as `data:` URIs, and will be extracted to `_assets/`.

**Pages, old band → new section:**

| Page | Before | After |
|---|---|---|
| Home | NiwasiBand | new section |
| Services | NiwasiBand | new section |
| Bulk | Bulk's own band variant | new section (with change 2) |
| Catering | NiwasiBand | new section |
| Laddoo | NiwasiBand | new section |
| **Sankranti** | none | **new section** (the new board adds it; Q2) |
| Kitchen, Sammilit, Rasoi | none | none |

**Code:**
- **New shared server component** `_components/OrderCallSection.tsx` (Tailwind, from the board's `.oc` CSS, including its ≤900px rules).
- **The 6 pages** use it.
- **Removed:**
  - `NiwasiBand.tsx`;
  - Bulk's inline band variant;
  - the `nwNum` counter animation in `mitram.module.css` (nothing else uses it).

### 2.2d Change 4: videos in Catering (`/catering`, board `Mitram-Catering.dc.html`)

**Where:** the new board keeps the same sections. Its "हाल के आयोजन" section (eyebrow "हमारा काम देखें") now opens with a **video grid** (`.vds`) above the existing photo gallery. The gallery gets a small heading: `h3.gh` "तस्वीरें", with `<small>`"बड़ी फोटो देखने के लिए उस पर टैप करें।".

**The 4 videos:**
- `<figure class="vd vd-tall|vd-wide"><video controls playsinline preload="metadata" poster=…>` plus a figcaption (bold title and a muted line).
- Order: BSNL कैटरिंग (tall), ट्रेनिंग कार्यक्रम में कैटरिंग (wide), पूरी-सब्जी प्लेट (tall), स्कूल कार्यक्रम में थाली (wide).

**Layout:**
- **Desktop:** two columns, `0.62fr / 1.38fr`, gap 24px / 28px.
- **Tall videos:** 9:16, `object-cover`, max-height 620px.
- **Wide videos:** 16:9.
- **≤900px:** one column, gap 20px; tall videos max 300px wide.

**Files:**
- **Videos:** `img/*.mp4`, 9.5 MB in total (1.3, 2.0, 2.2 and 4.1 MB). Next can't statically import `.mp4`, so they go to `apps/frontend/public/mitram/videos/`, served as `/mitram/videos/<name>.mp4` (same approach as the Ham Niwasi gallery videos). The proxy matcher skips dotted paths, so these URLs aren't rewritten to `/mitram/mitram/…`.
- **Posters:** inlined `data:` JPEGs in the board. They're extracted to `_assets/videos/` and used through their static-import URL.
- **Playback:** `preload="metadata"`, so nothing downloads until play.

**Code:** a new `_components/CateringVideos.tsx` (server; the native `<video controls>` needs no JS), rendered in the "हाल के आयोजन" section before the gallery, plus the gallery's new `h3`.

### 2.2e Change 5: hide the Mitram Kitchen page, configured in one file

**New config file:** `_components/siteConfig.ts`, the single place for the site's pages, menus and route switches. Per the user: "make a seperate file for the menu and route mapping … and make al this configuration there".
- **What it holds:**
  - a `PAGES` registry: key → path, title, menu subtitle, icon key and `enabled`;
  - the ordered service list used by every menu;
  - helpers `isEnabled(key)` and `enabledServices()`.
- **Kitchen:** `kitchen: { enabled: false }`. Flipping it to `true` restores everything below.
- **`ui.ts`:** `ROUTES` and `SERVICES` move into this file, and `ui.ts` re-exports them so existing imports keep working.

**When Kitchen is disabled:**

| Place | Behaviour |
|---|---|
| `/kitchen` (direct URL) | **404** (`notFound()` from the config). The page code stays in place. |
| Header सेवाएँ dropdown, mobile drawer, footer "सेवाएँ" list | Kitchen not listed (the new prototype does the same) |
| Home banner | ~~The Kitchen slide (its CTAs and card link to `/kitchen`) is not shown (Q3)~~ _Superseded by the Q3 answer "same as prototype"._ ~~6 slides; the first is "आज का भोजन…" pointing to `/bulk`…~~ _**Corrected 2026-10-06:** that description of the prototype was my misreading (a parse that skipped the Kitchen slide's non-link button). The new prototype **keeps all 7 slides**; the Kitchen slide is made **static**: its "मेनू देखें" is a non-clickable `span.btn.is-static` (`aria-disabled`), and its card is a plain `div.bn-card.is-static` with no link, no "मेनू देखें" line and no hover lift._ **Built as in the prototype:** the Kitchen slide is static while `kitchen` is disabled (config-driven), and the other 6 slides are unchanged. |
| Home services grid card | The card stays, as in the user's screenshot, but is **static**: not a link, **no "देखें और ऑर्डर करें"**, **no hover lift or shadow**. Its text is **the prototype's: "SBI बैंक बाज़ार समिति ब्रांच के नज़दीक, बहादुरपुर, पटना", always** (Q4 answer: "same as prototype"). |
| Services page row (`.srow`) | The same treatment: static, no "देखें" button, no hover. "थाली ₹45 से" stays (Q4). |
| Home "हमारी इकाइयाँ" unit card "मित्रम किचन, पटना" | Static: not a link, no "देखें" (Q5) |
| Home locations: the "मेनू देखें" button on मित्रम किचन, पटना | Hidden. The phone button stays (Q5). |

**How "comment out" is done (Q6):** rather than commenting the JSX out by hand, each of these spots checks `isEnabled("kitchen")`. The hidden button and link code stays in the file, behind that flag, so there's one switch to bring them all back. Each spot gets a one-line code comment saying it's hidden while Kitchen is disabled.

### 2.3 Prototype copy

Replace `docs/prototype/mitram/` with the updated prototype (`README.md` + `design/`, without the inlined `index.html`, as decided in the parent plan Q4), so the repo copy matches what's being ported. _Open question Q1 below._

### 2.4 Open questions

1. **Q1:** should `docs/prototype/mitram/` be replaced with the updated prototype now, or once all 5 changes are known?
   - **Recommendation:** replace it now. The repo then keeps the design that is current; git history keeps the old one.
2. **Q2:** the new prototype also adds the new order section to **Sankranti**, which had no 20% band before. Should Sankranti get it?
   - **Recommendation:** yes, follow the prototype. The request says to correct the section "where ever we use it", and the new design uses it there.
3. **Q3, home banner:** the new prototype drops the Kitchen slide and moves the headline "आज का भोजन, घर जैसा स्वाद" onto the Bulk slide (6 slides; the old Bulk headline "सबसे अच्छा, सबसे सही दाम पे भोजन" is gone).
   - **Recommendation:** hide the Kitchen slide through the config and keep the other 6 slides as they are. Re-enabling Kitchen then restores the slide exactly; the prototype's re-wording of the Bulk slide wasn't asked for.
   - **Alternative:** copy the prototype's 6 slides exactly.
4. **Q4, Kitchen card text:** the new prototype changes the Home card's description to the kitchen's address (your screenshot shows this).
   - **Recommendation:** use the address while Kitchen is disabled, and the original text when it's enabled. The Services row already has the address in the new board.
5. **Q5, other Kitchen links the prototype still has** (the Home "units" card, the Home "मेनू देखें" button, the Services row): they'd lead to the hidden page.
   - **Recommendation:** make them static or hidden while Kitchen is disabled, as in the §2.2e table.
6. **Q6, "comment out":** a config flag (one switch, the code kept in place) instead of literal JSX comments.
   - **Recommendation:** the flag.
7. **Q7, video files in git:** the 9.5 MB of `.mp4` would sit both in `public/` and in the `docs/prototype/mitram/` copy.
   - **Recommendation:** add a `docs/prototype/mitram/.gitignore` for `*.mp4`, as done for Ham Niwasi, so they're committed once (in `public/`).

## 3. Test cases (designed up front)

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-MTC-01 | Header brand is text only | — | Open any page at 1440px | The header shows only "मित्रम" (display font, maroon, 30px): no logo image and no "घर जैसा भोजन". Matches the new board. | H |
| TC-MTC-02 | Header brand on phones | ≤900px | Open any page at 390px | Only "मित्रम" at 24px. The header row is otherwise unchanged (menu and call buttons). | H |
| TC-MTC-03 | Drawer brand | ≤900px | Open ☰ | The drawer header shows only "मित्रम" and the ✕ button, with no logo image. | M |
| TC-MTC-04 | Brand still scrolls to top | — | On the home page, scroll down and click "मित्रम"; then click it from `/kitchen` | Smooth scroll to top with no hash; from Kitchen it goes to `/` (unchanged behaviour). | M |
| TC-MTC-05 | Footer and favicon unchanged | — | Look at the footer and the browser tab | The footer still shows the logo image; the tab still shows the Mitram favicon. | L |

| TC-MTC-06 | New order section replaces the 20% band | — | Open `/`, `/services`, `/bulk`, `/catering`, `/laddoo`, `/sankranti` at 1440 and 390px | Each shows the new section exactly as the board: "अभी ऑर्डर करें", the yellow phone pill (tel: link), address, FSSAI, the 20% banner image, the line of text, the Ham Niwasi logo and the QR with "स्कैन करें". No maroon 20% band anywhere. | H |
| TC-MTC-07 | Pages without the section | — | Open `/kitchen`, `/sammilit`, `/rasoi` | No order section and no 20% band (as in the boards) | M |
| TC-MTC-08 | Bulk page layout | — | Compare `/bulk` with the new board at 1440 and 390px | Hero (new copy, white and WhatsApp-outline buttons, card), the ₹48 block, the calculator and bill, then the order section. The old menu cards and services section are gone. | H |
| TC-MTC-09 | Bulk calculator | — | People 20 → +5 → −5 (floor 20), type 15; switch utensils and pickup; staff 0 → 2 | Bill lines and total exactly as the board's script (e.g. 25 people, our utensils, delivery, 2 staff: food ₹1,200, utensils ₹75, delivery ₹125, staff ₹1,400–2,000, total as a range). The under-20 note and the delivery-fare note show as on the board. | H |
| TC-MTC-10 | Booking pop-up opens | — | With 15 people click "WhatsApp पर ऑर्डर भेजें"; then with 20 | Under 20: red toast "कम से कम 20 लोगों का ऑर्डर चुनें।" and no pop-up. At 20: the pop-up "बल्क ऑर्डर बुक करें" opens. | H |
| TC-MTC-11 | Booking validation | Pop-up open | Submit empty; then only the mobile wrong; then a past date | Red fields plus the board's toasts ("लाल घेरे वाले खाने भरें।", "सही 10 अंकों का मोबाइल नंबर डालें।", "आज या आगे की तारीख़ चुनें।"). With delivery chosen, पता is required. | H |
| TC-MTC-12 | Mobile field input | Pop-up open | Type letters and 12 digits; paste "+91 98765 43210" | Only digits, at most 10; a pasted +91 is dropped (user's standing rule) | H |
| TC-MTC-13 | Booking done, nothing sent | Valid form | Submit; watch the network; click "WhatsApp पर भेजें" | "बुकिंग तैयार है" with a `BK-…` number, the summary and total; the WhatsApp link opens wa.me with the booking text; **no non-GET request** from the site | H |

| TC-MTC-14 | Catering videos | — | Open `/catering` at 1440 and 390px; scroll to "हाल के आयोजन" | 4 videos with posters and captions, in the board's tall/wide layout (two columns on desktop, one on phones, tall ones max 300px wide), then "तस्वीरें" and the photo gallery | H |
| TC-MTC-15 | Videos play, nothing preloaded | — | Load `/catering` (network open); press play on each | Only metadata loads before play; each video plays with native controls; `playsinline` on phones | M |
| TC-MTC-16 | Kitchen page hidden | Kitchen disabled | Open `/kitchen` directly | 404 (no Mitram Kitchen page) | H |
| TC-MTC-17 | Kitchen gone from the menus | Kitchen disabled | Open the सेवाएँ dropdown, the mobile drawer and the footer | Kitchen isn't listed; the other 6 services are, in the same order | H |
| TC-MTC-18 | No links lead to Kitchen | Kitchen disabled | Crawl every page; collect hrefs | No link to `/kitchen` anywhere (banner, cards, units, locations, services) | H |
| TC-MTC-19 | Static Kitchen cards | Kitchen disabled | Home services grid and the Services page; hover and click the Kitchen card/row | Not a link, no "देखें और ऑर्डर करें" / "देखें", no hover lift or shadow; the other cards keep their link and hover | H |
| TC-MTC-20 | One switch restores Kitchen | Set `kitchen.enabled = true` in `siteConfig.ts` | Repeat TC-MTC-16..19 | Everything is back as it was before this change | M |

## 4. Sign-off

- **2026-10-06:** change 1 received (§1). Plan written; awaiting the user's review, the answer to Q1, and changes 2–5 before implementation.
- **2026-10-06:** changes 2 and 3 received (§1). Planned in §2.2b and §2.2c; new question Q2 (Sankranti). Still awaiting review, the answers to Q1 and Q2, and changes 4–5.
- **2026-10-06, answers and go-ahead:** "all as recommended and first implement this much then i share other two changes".
  - **Q1:** replace `docs/prototype/mitram/` with the updated prototype now.
  - **Q2:** Sankranti gets the new order section.
  - **Build now:** changes 1–3. Changes 4–5 come later, in this same file.
  - **Status:** in-progress.

- **2026-10-06, small addition:** "when i click the order now button in the bulk page can you add the scroll behaviour to be smooth".
  - **The button:** the Bulk hero's "अभी ऑर्डर करें" links to `#calc` and jumps there instantly.
  - **Change:** it scrolls smoothly to the calculator, with no `#calc` added to the URL, like the logo / होम links. Instant under reduced motion.
  - **Code:** a small client component `SmoothAnchor` (a scroll target by id) used for that button.

- **2026-10-06, decided:** "make it srop just below the header".
  - **Change:** the Bulk calculator (`#calc`) gets a scroll offset equal to the sticky header's height: 80px, or 64px at ≤900px. "अभी ऑर्डर करें" now stops with the calculator just below the header.
  - **A deliberate deviation from the board:** the board has no offset, so its heading sits behind the header.

- **2026-10-06:** changes 4 and 5 received (§1). Planned in §2.2d and §2.2e, with questions Q3–Q7. Awaiting the user's review and go-ahead.

- **2026-10-06, answers Q3–Q7:** "1 same as prototype / 2 same as prototype / 3 as recommended / 4 as recommended / 5 as recommended" (numbered as in the chat, which map to Q3–Q7).
  - **Q3, banner:** same as the prototype. This was **against the recommendation** to config-hide only the Kitchen slide; it's built as asked.
    - _Correction, during the build:_ my question described the prototype wrongly (I said it drops the Kitchen slide). It actually keeps the slide but makes it static. "Same as prototype" is therefore built as: a static Kitchen slide, the other slides unchanged, and still driven by the flag. The user is told.
  - **Q4, card text:** same as the prototype, so the address always. Also **against the recommendation** (switch the text with the flag); built as asked.
  - **Q5:** the other Kitchen links are static or hidden while disabled.
  - **Q6:** a config flag rather than literal comments.
  - **Q7:** `docs/prototype/mitram/.gitignore` for `*.mp4`.
  - **Awaiting:** the user's explicit go-ahead to implement changes 4–5.
- **2026-10-06, go-ahead for changes 4–5:** "yes".

## 5. Execution log

- **2026-10-06:** the new prototype was compared with the shipped copy. The header and drawer brand markup changed (text only); the footer brand didn't. Planning file created.
- **2026-10-06, changes 2–3 analysed (no code):**
  - **Bulk:** the board outline went from hero / cream menu / `#calc` + side bill / niwasi to hero / `bk-main` / `oc`.
  - **New Bulk script:** a booking form with a mobile field and a `BK-…` simulated number.
  - **20% band:** `.niwasi` is removed from every new board; `.oc` is identical (md5 d24628) on Home, Services, Bulk, Catering, Laddoo and Sankranti, and absent from Kitchen, Sammilit and Rasoi.

- **2026-10-06, changes 1–3 built:**
  - **Prototype copy:** `docs/prototype/mitram/` replaced with the new prototype (`README.md` + `design/`, 107 files, 19 MB). It brings 4 `.mp4` files that changes 1–3 don't use.
  - **Change 1:** `MtHeader`'s header and drawer brand are text only. The logo `<Image>`, the tagline and the `logo` import are removed. The footer and favicon are unchanged.
  - **Change 3:**
    - **New `_components/OrderCallSection.tsx`:** the board's `.oc`, ported from its CSS including the ≤900px rules. Its three images were extracted from the board's data URIs to `_assets/oc-banner-20.png`, `ham-niwasi-logo.jpg` and `ham-niwasi-qr.jpg`, served unoptimized so the QR stays exact.
    - **Pages:** used on Home, Services, Catering, Laddoo and Sankranti in place of `NiwasiBand`. On **Sankranti** it replaces the old campaign block (`.dc-nw`, Sankranti's own 20% section), as in the new board (Q2).
    - **Removed:** `NiwasiBand.tsx` and the `nwNum` counter CSS.
  - **Change 2 (Bulk, by an agent):** `bulk/page.tsx` and `_components/BulkCalc.tsx` rewritten to the new board. TC-MTC-08..13 all PASS at 1440 and 390px (27 Playwright checks):
    - calculator values and notes, the under-20 guard toast, validation toasts and red fields;
    - mobile: typing and paste give digits only, at most 10;
    - the done state's `BK-…` number and the wa.me text are identical to the board's `bkWa`;
    - zero non-GET requests.
  - **Toast fix in `Toast.tsx`, reported by the agent:** the Bulk board raises the toast at ≤900px (`bottom:96px; z-index:95`). Without that it covered the booking pop-up's submit button. Applied on `/bulk` only.
  - **Verified (coordinator), on pm2's dev server :3016:**
    - Services at 1440 and 390px vs the new board: the text-only header, the drawer (390px) and the order section match. Images load once scrolled into view. Only the known glyph-width line wraps differ.
    - TC-MTC-01 / 02 / 03 / 06 PASS. TC-MTC-04: the brand is still the same `HomeLink`.
    - `tsc` (whole frontend) and `eslint` on `app/(mitram)` clean.
  - **Docs:** `docs/frontend/mitram-portal.md` updated: the header brand, the shared order section, and the Bulk booking form. No page added or removed.
  - **Not done (outside changes 1–3):** the new prototype also reorders the सेवाएँ dropdown and the footer services list (₹48 बल्क first). Left as it is, pending the user's changes 4–5.

- **2026-10-06, Bulk order-now smooth scroll built:**
  - **Code:** new `_components/SmoothAnchor.tsx` (client; falls back to a plain `#id` link without JS). It's used for the Bulk hero's "अभी ऑर्डर करें", which links to `#calc`.
  - **Verified on :3016:** at 1440px it's mid-scroll at 293px after 120ms and ends with `#calc` at the viewport top; at 390px the same. The URL stays `/bulk`.
  - **Checks:** `eslint` clean.
  - **Noted, not changed:** like the board (no `scroll-margin` there), the calculator ends at the top edge, under the 80px / 64px sticky header, so its heading sits behind the header. An offset would be a small deviation; offered to the user.

- **2026-10-06, scroll offset built:**
  - **Code:** `#calc` in `BulkCalc.tsx` gets `scroll-mt-[81px]`, and `scroll-mt-[65px]` at ≤900px. That's the sticky header's height plus its 1px bottom border; a first try with exactly 80 / 64px left the calculator 1px under the border.
  - **Verified on :3016:** after "अभी ऑर्डर करें", the calculator top = the header bottom (81px at 1440, 65px at 390). The heading is fully visible (top at 110 / 86px). It still scrolls smoothly and the URL stays `/bulk`.
  - **Checks:** `eslint` clean.

- **2026-10-06, changes 4–5 analysed (no code):**
  - **Catering:** the "हाल के आयोजन" section gains a 4-video grid (`.vds`; posters inlined; mp4s in `img/`, 9.5 MB) above the photo gallery, plus the gallery heading "तस्वीरें".
  - **Kitchen in the new boards:**
    - removed from the dropdown, drawer and footer, and from the links on Bulk, Sammilit, Catering, Rasoi, Laddoo and Sankranti;
    - Home banner 7 → 6 slides;
    - the Home services card is static (`svc-card is-static`, address text, no link);
    - still linked from the Home unit card, the Home "मेनू देखें" button and the Services row.
  - **Our code links Kitchen from:** `SERVICES` (header, drawer, footer), `HomeBanner` slide 0, the Home services grid, the Home units and locations, and `ServicesList`.

- **2026-10-06, changes 4–5 built:**
  - **Change 4, Catering videos:**
    - **Files:** `docs/prototype/mitram/.gitignore` (`*.mp4`, Q7); the 4 videos in `public/mitram/videos/` (bsnl-catering, training-catering, puri-sabzi-plates, school-thali; 9.5 MB); the posters extracted to `_assets/videos/`.
    - **New `_components/CateringVideos.tsx`.**
    - **Correction to §2.2d:** the videos **replace the 4 photo cards** (`.wks`) of the old board, and the "तस्वीरें" heading already existed.
    - **Gallery:** the new board also moves "दही-चूड़ा का आनंद" (a former card) to the front of the photo gallery, so `CateringGallery` was updated to 11 photos. The unused `WORKS` list was removed.
  - **Change 5, Kitchen hidden:**
    - **New `_components/siteConfig.ts`:** `PAGES` (with `enabled`), `ROUTES`, `SERVICES` (with keys), `MENU_SERVICES`, `isEnabled`, `requireEnabled`. `ui.ts` re-exports them.
    - **`kitchen/page.tsx`:** calls `requireEnabled("kitchen")`, giving a 404.
    - **Menus:** `MtHeader` (dropdown and drawer; icons keyed by service) and `MtFooter` use `MENU_SERVICES`.
    - **`HomeBanner`:** each slide has a `page` key. A disabled page's slide is the board's static version: the "मेनू देखें" `span` (aria-disabled) and a non-link card without the go line.
    - **Home page:** the services card is static (no link, hover, price pill or go; the address text, per "same as prototype"). The units card is static without "देखें". The locations "मेनू देखें" is hidden.
    - **`ServicesList`:** the row is static, without the "देखें" button; its text is the board's address.
  - **Correction to Q3, also recorded in §2.2e:** the prototype keeps 7 banner slides with a static Kitchen slide. It was built that way.
  - **Verified on :3016 (Playwright):**
    - **TC-MTC-16:** `/kitchen` gives 404.
    - **TC-MTC-17:** the dropdown and footer show 6 services on every page.
    - **TC-MTC-18:** 0 `/kitchen` links on the 8 other pages.
    - **TC-MTC-19:** the static card is a DIV whose transform, shadow, border and cursor don't change on hover, while the Bulk card does change; the row, unit card and banner slide are static.
    - **TC-MTC-20:** with `enabled: true`, `/kitchen` returns 200, home has 8 links, Services 4, the menu 7. Then reverted to `false`.
    - **TC-MTC-14:** the 4 videos with posters at the board sizes (tall 368×620, wide 820×461 at 1440px); playback works.
    - **TC-MTC-15:** partial. With `preload="metadata"`, Chrome still fetched the first 1 MB of each video (about 4 MB) before play. That's the browser's media loader, and the board has the same attribute. `preload="none"` would avoid it; offered to the user.
  - **Known:** the 404 page under the Mitram layout shows the layout's default title "मित्रम — होम", since there's no Mitram-specific not-found page.
  - **Checks:** `tsc` (whole frontend) and `eslint` clean.
  - **Docs:** `mitram-portal.md` updated: Kitchen hidden, Catering videos, and the `siteConfig.ts` note.

## 6. Post-deploy

_None yet._

## 7. Cross-references

- Parent feature: [2026-10-06-mitram-site.md](2026-10-06-mitram-site.md)
- TEST_CASES: TC-MTC-* (promote on ship)
- Page maps: none for changes 1–3 (no page added or removed). `docs/frontend/mitram-portal.md` descriptions get updated for Bulk (booking form) and for the pages with the new order section.
