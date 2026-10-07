# Mitram website: changes after ship (batch of 5)

| Field | Value |
|---|---|
| Status | shipped |
| Started | 2026-10-06 |
| Shipped | 2026-10-06 (frontend `e8fb3cb`, root `cd437c4`, merged to `main` and pushed) |
| SRS row | — |
| Test cases | TC-MTC-01..20 |
| Prototype todo | — |
| Batch 3 (Home redesign) | in-progress. Built and verified (§2.2i), not committed. |
| Batch 2 (3 changes) | in-progress. Changes 1–3 (§2.2f–h) built and verified, not committed. |

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

### Batch 2 (2026-10-07)

> there are 3 new changes we need to make in the mitram site
> mention these in the already exiting changes planning file
> chage 1 is on this page
> http://mitram.niwasi.abhishek/catering
> section कैटरिंग पैकेज
> here we have veg/ non veg switch button
> so when we switch here to non veg the price and the icon changes but the description text remain same
> the prototype that client provided has something different text there
> check ss for both veg and non veg

_(Two screenshots of the "कैटरिंग पैकेज" section. **शाकाहारी** selected: green marks, ₹275 / ₹375 / ₹575 / ₹775, the veg contents (the current site text). **मांसाहारी** selected: red marks, ₹325 / ₹425 / ₹675 / ₹875, and different contents per package: chicken curry, egg curry, chicken butter masala, mutton curry, fish curry.)_

> ok next is this section  in the same page
> अपना खर्च जानें
> add the missing fields and  the see order button changes to same as ss and with the functionality to send the details to whatsapp

_(Screenshot of the client prototype's "अपना खर्च जानें": fields मेन्यू (select, "स्पेशल पैकेज (वेज) — ₹275"), मेहमानों की संख्या (a plain number box, 100) and आयोजन की तारीख (वैकल्पिक) (a date box). The result card shows "अनुमानित कुल खर्च", ₹27,500, "100 × ₹275", and a yellow button "WhatsApp पर यह ऑर्डर भेजें".)_

This is change 2, planned in §2.2g.

> next we have similar changes in these page forms missing fields and send to whatsapp button
> http://mitram.niwasi.abhishek/sammilit
> http://mitram.niwasi.abhishek/laddoo
> provided all the important ss

_(Three screenshots of the client prototypes:)_
- _**Sammilit:** step 3 "मेहमान और विवरण" (subtitle "तारीख, जगह और संपर्क — ऑर्डर संदेश में अपने आप जुड़ जाएगा।") with मेहमानों की संख्या, तारीख और समय, आपका नाम, मोबाइल नंबर, आयोजन का पता / मोहल्ला, दूरी, प्लेट पैकिंग and कुछ और बताना है?. The "ऑर्डर पर्ची" slip has a red "WhatsApp पर ऑर्डर भेजें" (with a small › circle), "ऑर्डर संदेश कॉपी करें", and 7070 819 777 "कॉल या WhatsApp करें"._
- _**Laddoo, twice:** the "आपका ऑर्डर" sheet with कुल रकम; कैसे लेंगे? (दुकान से लेंगे / होम डिलीवरी); नाम; कब चाहिए?; पता (होम डिलीवरी के लिए), shown only with होम डिलीवरी; a "WhatsApp पर ऑर्डर भेजें" button; the note "WhatsApp में आपका ऑर्डर संदेश तैयार खुलेगा, वहाँ से भेजें। दुकान से पुष्टि मिलने पर ही ऑर्डर पक्का माना जाएगा।"; and "या फ़ोन करें: 7070 819 777" with a "कॉपी" button._

This is change 3, planned in §2.2h. All three changes of batch 2 are now received.

### Batch 3 (2026-10-07)

> some new changes has been made to the home page
> check this prototype and update the changes file plan
> file:///home/triline27/Downloads/Mitram-Website(new)/Mitram-Website/index.html#Home
> then when i tell you to implement we will do it

**The new prototype:** `~/Downloads/Mitram-Website(new)/Mitram-Website/`, with a new layout: boards at the top level (no `design/canvas/`), images and videos in `assets/` (94 files), and an `index.html` shell with a page picker and a Desktop/Mobile switch.

**What changed, compared with the repo copy `docs/prototype/mitram/design/canvas/`:**
- **`Mitram-Home` / `Mitram-M-Home`:** a new page body. About 1,270 lines changed, plus a new stylesheet "Mitram home content (from uploaded design), scoped to `.mu`".
- **Every board's header** (the same 28 lines on all 18 boards):
  - "सुनई के बारे में" → "हमारे बारे में" and "सेवाएँ" → "हमारी सेवाएँ";
  - two new links after the सेवाएँ dropdown: "अनुभव और प्रतिबद्धताएँ" (→ Home `#work`) and "संपर्क" (→ Home `#contact`, the footer);
  - the same in the mobile drawer.
  - From another page these open Home and then scroll to the section (the board's `secVals()`).
- **No other content changes.** The client's Catering, Sammilit and Laddoo boards also lack this batch-2 work (changes 1–3), so they differ from the repo copy by those edits.

## 2. Plan
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

### 2.2f Batch 2, change 1: non-veg package contents (`/catering`, "कैटरिंग पैकेज")

**Now:** `CateringOrder.tsx` `PKGS` holds one description per package (the veg one). The शाकाहारी / मांसाहारी switch changes the mark and adds ₹50 to the price, but the text stays veg.

**Source of the new text:** the user's two screenshots, which come from the client-provided prototype. The user added mid-turn: "the ss are of client proided prototype and the prototype in this repo and the client provided are totally different … i have not shared the client prototype with you". So the repo's `docs/prototype/mitram/` is **not** the source; it has only the veg text.
- **Character check (open question Q8):** a local file, `~/Downloads/Mitram Services (2)/Mitram Services/Catering Mitram Kitchen.html`, has a non-veg package list that matches the screenshot word for word. It isn't confirmed to be the client prototype. The text below was copied from that file and checked against the screenshot.
- **Veg and prices:** the screenshot's veg text matches the site's current text. ~~Its non-veg prices match the site's veg + ₹50. Only the non-veg descriptions are new.~~ _**Corrected 2026-10-07, during the build:** that was wrong. The screenshot's non-veg prices are ₹325 / ₹425 / **₹675 / ₹875**, but the cards computed veg + ₹50, showing **₹625 / ₹825** for Premium and Ultimate. The site's own order-form list (`O`) already had ₹675 / ₹875, so the card and the form disagreed. The repo board had the same +₹50 formula._

Non-veg text:

| # | Package | Non-veg price | Non-veg contents |
|---|---|---|---|
| 01 | स्पेशल पैकेज | ₹325 | 1 नाश्ता/साइड डिश, मुख्य व्यंजन (1 चिकन करी, चावल, पूरी, हरी सलाद, पापड़, चटनी, बूंदी रायता), 1 मिठाई, 1 कॉफ़ी/चाय |
| 02 | डीलक्स पैकेज | ₹425 | 1 वेलकम ड्रिंक, 2 स्नैक्स/साइड डिश, मेन कोर्स (1 चिकन करी, 2 पीस अंडा करी, चावल, पूरी, ग्रीन सलाद, पापड़, चटनी, बूंदी रायता), 1 मिठाई, 1 कॉफ़ी/चाय |
| 03 | प्रीमियम पैकेज | ₹675 | 2 वेलकम ड्रिंक्स, 3 स्नैक्स/साइड डिश, मेन कोर्स (1 चिकन करी, 1 चिकन बटर मसाला, 1 मटन करी, चावल, पूरी, ग्रीन सलाद, पापड़, चटनी, बूंदी रायता), 2 डेज़र्ट, 1 कॉफ़ी/चाय |
| 04 | अल्टीमेट पैकेज | ₹875 | स्वागत पेय, 3 स्नैक्स/साइड डिश, मुख्य व्यंजन (चिकन करी, चिकन बटर मसाला, मटन करी, फिश करी, अंडा करी, वेज पुलाव, चावल, पूरी, हरी सलाद, पापड़, चटनी, बूंदी रायता), 3 मिठाई, 1 कॉफ़ी और चाय |

The client's wording isn't consistent between packages (नाश्ता vs स्नैक्स, मुख्य व्यंजन vs मेन कोर्स, हरी vs ग्रीन सलाद). It's kept exactly as given, not normalised.

**Code (one file, `CateringOrder.tsx`):**
- `PKGS` gets a second description: `d` → `dv` (veg, unchanged) and a new `dn` (non-veg, the table above).
- `CateringPackages` renders `dv === "n" ? p.dn : p.dv`.
- ~~Prices stay as computed now (veg + ₹50).~~ _Superseded by the correction above:_ each card reads its price from `O` (`<key>_v` / `<key>_n`), the list the order form already uses. That gives ₹675 / ₹875 as in the screenshot, and the card and form can no longer disagree. The `price` field and the +₹50 formula are removed from `PKGS`.
- The order form's package dropdown and the order pop-up show only package names and prices, so they don't change.

**Rules:** frontend only; no page added or removed, so `mitram-portal.md` isn't changed. Static Hindi, translation-exempt.

**Phones:** the same component renders at every width, so there is no separate mobile change.

### 2.2g Batch 2, change 2: "अपना खर्च जानें" fields and the WhatsApp button (`/catering`, `#calc`)

**Source:** the screenshot, plus the same client file as §2.2f (`Catering Mitram Kitchen.html`, section `#estimate` and its `estimate()` script). It shows how the fields behave.

**Site now vs the client prototype:**

| | Site now | Client prototype |
|---|---|---|
| मेन्यू | One flat list; every option shows a price; bhoj priced at one fixed rate (A ₹150, the "डिस्पोजेबल" column) | Grouped (`optgroup`): शाकाहारी पैकेज (प्रति व्यक्ति), मांसाहारी पैकेज (प्रति व्यक्ति), भोज (प्रति प्लेट, 80+ प्लेट), थाली. Bhoj options carry no price, since the price depends on the service |
| सेवा | — | Shown **only for a bhoj menu**: बिना प्लेट (हाफ कैटरिंग) / डिस्पोजेबल प्लेट के साथ / पूर्ण कैटरिंग (default). It picks the bhoj price column (e.g. A: ₹140 / ₹150 / ₹170, the same prices as the site's bhoj table) |
| मेहमानों की संख्या | −/+ stepper (steps of 10) | Plain number box, default 100 |
| आयोजन | Occasion select (linked to the occasion chips) | — |
| आयोजन की तारीख (वैकल्पिक) | — | Date box, optional |
| Breakdown | "100 × ₹275 · <occasion>" | "100 × ₹275", plus " — <service>" for bhoj |
| Warning | — | For bhoj under 80: "भोज की ये कीमतें 80 प्लेट या अधिक पर लागू हैं। कम प्लेट के लिए कीमत कॉल करके पूछें।" |
| Button | "ऑर्डर देखें" → the order pop-up (call to confirm) | "WhatsApp पर यह ऑर्डर भेजें", a link to `wa.me/917070819777?text=…` |

**Plan (each point maps to Q9–Q13 below):**
- **Fields added:** सेवा (bhoj only) and आयोजन की तारीख (वैकल्पिक).
- **Menu:** grouped like the client's. Bhoj options have no price in the label, and their price follows सेवा.
- **Kept from the site (Q9):** the guests stepper and the आयोजन select. They aren't in the client's screenshot, but the user asked to *add* the missing fields, not remove any.
- **Warning:** the 80-plate warning shows under the result for bhoj.
- **Button (Q10):** ~~"ऑर्डर देखें" and its pop-up are replaced by "WhatsApp पर यह ऑर्डर भेजें"~~ _Superseded by the Q10 answer "dont remove the see order button add the new button next to it"._ **Both buttons, side by side:**
  - **"WhatsApp पर यह ऑर्डर भेजें"** is new: yellow, as in the screenshot, with the same text and no icon. It comes first.
  - **"ऑर्डर देखें"** stays next to it, with its pop-up and the same behaviour. It changes from yellow to the outlined white style (`btn("light")`), so the two buttons don't look identical.
  - **The pop-up** also shows the new details: the line's name gets " (सेवा)" for bhoj, and its subtitle gets the date when one is set.
  - **Layout:** side by side, wrapping if needed; at ≤560px each is full width, stacked, with WhatsApp on top.
  - **The WhatsApp button** opens WhatsApp in a new tab with this message (the client's wording, plus the occasion when one is chosen):
  > नमस्ते मित्रम किचन, मुझे {मेन्यू}{ (सेवा) for bhoj} चाहिए, {N} लोगों के लिए{, तारीख DD-MM-YYYY}{, आयोजन: {occasion}}। अनुमानित खर्च ₹X। कृपया संपर्क करें।

  The package names in the message are "स्पेशल पैकेज (शाकाहारी)" / "(मांसाहारी)", as in the client's.
- **Validation (Q12), frontend only (no backend, so nothing to mirror):**
  - **Guests:** with 0 or empty guests the button doesn't open WhatsApp; it shows the toast "मेहमानों की संख्या डालें।", as the "ऑर्डर देखें" button does now.
  - **Date:** past dates can't be picked (`min` = today). If one is typed anyway, the toast is "आज या आगे की तारीख़ चुनें।", the Bulk form's wording.
- **Package "चुनें" buttons and thali picks:** they still set the menu and toast "… — ऊपर खर्च देखें।" (unchanged).
- **Colours (Q13):** the screenshot's dark page and rose card are the client prototype's styling. The site keeps its own colours (the maroon result card); only the fields and the button change.

**Code:**
- `CateringOrder.tsx`:
  - the menu list gets groups and the bhoj tier prices (`[half, disposable, full]`, the same numbers as `CateringBhoj`);
  - state gets `tier` and `date` (`om` stays for the pop-up);
  - `CateringCalc` gains the two fields, the warning and the WhatsApp link;
  - `OrderModal` stays on this page (Q10 answer).
- `WHATSAPP` from `ui.ts` gives the number.

**Prototype:** the repo boards `Mitram-Catering.dc.html` / `Mitram-M-Catering.dc.html` get the same fields, menu groups, warning and button, as was done for change 1.

**Docs:** the `mitram-portal.md` Catering row gains "cost estimate sent on WhatsApp". No page is added or removed.

**Phones:** the fields stack in one column at ≤900px (as now); the date box and the button are full width there.

### 2.2h Batch 2, change 3: Sammilit and Laddoo order forms (`/sammilit`, `/laddoo`)

**Source:** the screenshots, plus the client files `~/Downloads/Mitram Services (2)/Mitram Services/Sammilit Prayas Package/index.html` and `…/Mitram Rasoi Laddoo/index.html` (their form markup and scripts give the exact wording, the rules and the WhatsApp text).

**Same rule as change 2 (the Q10 answer):** the existing "ऑर्डर देखें" / "ऑर्डर पर्ची देखें" buttons and their pop-ups **stay**. The WhatsApp button is added next to them (Q14).

#### Laddoo (`LaddooOrder.tsx`, the "आपका ऑर्डर" sheet)

| | Site now | Client prototype → plan |
|---|---|---|
| Lines, कुल रकम, कैसे लेंगे?, सब हटाएँ | ✓ | Unchanged |
| नाम | — | **Add.** Placeholder "जैसे: सुनीता देवी"; **required** to send ("ऑर्डर भेजने के लिए अपना नाम लिखें।") |
| कब चाहिए? | — | **Add.** Date, `min` today; optional ("जल्द से जल्द" in the message when empty) |
| पता (होम डिलीवरी के लिए) | — | **Add.** Shown only with होम डिलीवरी; placeholder "मोहल्ला, लैंडमार्क"; **required** then ("होम डिलीवरी के लिए पता लिखें।") |
| Button | "ऑर्डर देखें" (maroon, full width) | **Add "WhatsApp पर ऑर्डर भेजें"** (maroon, full width, first); "ऑर्डर देखें" stays below it, as the outlined style |
| Note under the buttons | "ऑर्डर पक्का करने के लिए 7070 819 777 पर कॉल करें।" | **Replaced** by the client's note "WhatsApp में आपका ऑर्डर संदेश तैयार खुलेगा, वहाँ से भेजें। दुकान से पुष्टि मिलने पर ही ऑर्डर पक्का माना जाएगा।" and the row "या फ़ोन करें: **7070 819 777**" with a "कॉपी" button (copies 7070819777; the button reads "कॉपी हो गया" for 1.8s) (Q15) |
| Weight per laddoo | No limit | Max 50 किलो, as the client's (Q16) |

**WhatsApp text** (the client's, to 917070819777):
> नमस्ते मित्रम रसोई, मुझे यह ऑर्डर देना है:
> • मोतीचूर लड्डू – 1½ किलो = ₹390
> कुल: ₹390
> नाम: सुनीता देवी
> कब चाहिए: 14 अक्टूबर  _(or "जल्द से जल्द"; the browser's hi-IN month name, as the client's script)_
> कैसे: दुकान से लूँगा/लूँगी (Take Away)  _(or "होम डिलीवरी")_
> पता: …  _(home delivery only)_

**The pop-up** subtitle adds the name and date when set.

#### Sammilit (`SammilitBuilder.tsx`)

| | Site now | Client prototype → plan |
|---|---|---|
| Step 3 subtitle | "मेहमानों की संख्या और तारीख चुनें — कुल रकम पर्ची में दिखेगी।" | "तारीख, जगह और संपर्क — ऑर्डर संदेश में अपने आप जुड़ जाएगा।" |
| मेहमानों की संख्या, तारीख और समय, दूरी, प्लेट पैकिंग | ✓ | Unchanged |
| आपका नाम | — | **Add.** Placeholder "जैसे: रमेश कुमार"; optional, as the client's |
| मोबाइल नंबर | — | **Add.** Placeholder "10 अंकों का नंबर"; optional, as the client's. Digits only, at most 10, a pasted +91 dropped (the user's standing phone rule). If filled, it must be a valid number (`^[6-9]\d{9}$`, "सही 10 अंकों का मोबाइल नंबर डालें।"), as the Bulk form |
| आयोजन का पता / मोहल्ला | — | **Add**, full width. Placeholder "जैसे: कंकड़बाग, पटना"; optional |
| कुछ और बताना है? | — | **Add**, full width, 2-row text box. Placeholder "जैसे: बिना प्याज़-लहसुन, बच्चों के लिए कम तीखा"; optional |
| Field order | guests · date+time / दूरी · पैकिंग | The client's: guests · date+time / नाम · मोबाइल / पता (full) / दूरी · पैकिंग / note (full) |
| Slip buttons | "ऑर्डर पर्ची देखें", "ऑर्डर संदेश कॉपी करें" | **Add "WhatsApp पर ऑर्डर भेजें"** first: red, with the › circle, as the screenshot. "ऑर्डर पर्ची देखें" is kept but becomes outlined; "ऑर्डर संदेश कॉपी करें" is kept |
| Copied message | A short summary | The **same text as the WhatsApp message** (as the client's) |

**WhatsApp text** (the client's, to 917070819777; lines are left out when empty):
> नमस्ते मित्रम किचन,
> सम्मिलित प्रयास पैकेज के लिए ऑर्डर:
>
> आयोजन: सत्यनारायण पूजा
> मेहमान: 50
> तारीख: 14 अक्टूबर 2026 (दोपहर का भोजन)
>
> • भोज B — पूड़ी/रोटी, चावल, …: 50 प्लेट × ₹95, पनीर +₹50 = ₹7,250
> • प्लेट पैकिंग: 50 × ₹20 = ₹1,000
>
> अनुमानित कुल: ₹8,250
> डिलीवरी: 5 km के भीतर (मुफ़्त)  _(or "5 km से ज़्यादा" / "Take Away")_
> पता: …
> संपर्क: रमेश कुमार, 9876543210
> नोट: …

**Pop-up subtitle** adds the name when set.

#### Both pages
- **Sending is blocked** with a toast and a red field (the Bulk form's pattern, Q17) when:
  - nothing is chosen ("अभी कोई लड्डू नहीं चुना…" / "पहले कम से कम एक पैकेज जोड़ें।");
  - Sammilit has under 20 guests (the existing message);
  - a required field is empty;
  - the mobile number is invalid;
  - the date is in the past ("आज या आगे की तारीख़ चुनें।").
- **Validation scope:** frontend only (no backend, so nothing to mirror).
- **Prototype:** the repo boards `Mitram-Laddoo.dc.html`, `Mitram-M-Laddoo.dc.html`, `Mitram-Sammilit.dc.html` and `Mitram-M-Sammilit.dc.html` get the same fields, buttons, rules and text, as for changes 1–2.
- **Docs:** the `mitram-portal.md` rows for `/sammilit` and `/laddoo` gain "order sent on WhatsApp". No page is added or removed.
- **Phones:** the new fields stack in one column at ≤900px; the buttons are full width.
- **Not included:** the client prototypes' fixed bottom total bar on phones ("ऑर्डर पर्ची देखें" / "ऑर्डर देखें" bar), which the user didn't ask for (Q18).

### 2.2i Batch 3: Home page redesign, and the header's new links

**Source of truth:** the new `Mitram-Home.dc.html` (desktop) and `Mitram-M-Home.dc.html` (390px). All copy is ported **verbatim** from them, as before. Tailwind rewrite, static Hindi (translation-exempt), no backend.

**The new Home, top to bottom:**

| # | Section (board id) | Content |
|---|---|---|
| 1 | Hero (`#mu-top`, maroon band with a dot pattern) | Eyebrow "mitram.niwasi.in · पटना · हम-निवासी अभियान"; h1 "मित्रम / खाद्य सेवाएँ"; lead "यह एक रेस्टोरेंट नहीं है, बल्कि <mark>भोजन सुविधा उपलब्ध कराने के कई माध्यमों का समूह</mark> है।"; 8 service chips that scroll to the matching card in section 4 (₹48 भोजन, सम्मिलित प्रयास एवं कैटरिंग, मित्रम रसोई और किचन, Highway Side बलिया, मिठाइयाँ, मेस एवं टिफ़िन, मित्रम स्नैक्स, सोन्हा मटका दही). **Right side: a carousel** of 8 slides (7 photos + 1 video, "मित्रम कैटरिंग सेवा") with captions, prev/next arrows and 8 dots. It moves on every 4.5s and pauses on hover. On phones it sits below the text. |
| 2 | Figures row (overlapping the hero's bottom) | 4 cards: ₹48 "प्रति भोजन, घर-जैसा खाना" · 1 लाख "भोजन 9 माह में, बाज़ार समिति" · 400 तक "कुल टिफ़िन एवं मेस…" · 25 "कैटरिंग सम्मिलित प्रयास सेवा". 2 columns at ≤760px. |
| 3 | `#about` "हमारे बारे में / मित्रम की पृष्ठभूमि" | 3 paragraphs on Mitram, सुनई कंसल्टेंसी and the हम-निवासी programme (the programme name is blue). |
| 4 | `#services` "हमारी सेवाएँ / हर मौके के लिए अलग सेवा" | 8 cards in a grid of columns at least 248px wide, then the "कोई ख़ास मौक़ा?" card (maroon, WhatsApp). Each card's "देखें और ऑर्डर करें →" goes to: ₹48 → `/bulk`; सम्मिलित प्रयास एवं कैटरिंग (video) → `/sammilit`; मित्रम रसोई और किचन (video, address, the WhatsApp menu catalogue, facebook.com/Mitram.Kitchen, 7070 819 777) → WhatsApp; मित्रम रसोई बलिया (Highway Side, 70616 53559, "हॉल उपलब्ध") → `/rasoi`; मिठाइयाँ → `/laddoo`; मेस एवं टिफ़िन, स्नैक्स and मटका दही → WhatsApp. The ₹48 card is the red one ("घर जैसा" logo, big ₹48). |
| 5 | `#work` "अनुभव और प्रतिबद्धताएँ / हमारे काम" | A promise card ("सिर्फ़ ताज़ी सब्ज़ियाँ, चक्की में पिसा मसाला" and 2 lines), plus a 19-row log (number / what), e.g. "1,00,000 — मित्रम किचन, बाज़ार समिति में ग्राहकों को 9 माह में भोजन" through "13 — बिहार मैनेजमेंट एसोसिएशन…". |
| 6 | `#discount` (blush band) "साफ़ मोहल्ला, भोजन सही मूल्य पर और स्वादिष्ट घर जैसा" | "…उतनी ज़्यादा <छूट>", and a 6-row discount ledger: 5%, 7%, 10%, 10%, 20%, 20% (the last two yellow). |
| 7 | `#niwasi` "हम-निवासी कार्यक्रम / निवासी की परिभाषा" | The definition and 6 bullets in 2 columns (1 column at ≤600px). |
| 8 | `#ham-niwasi` (blush band) "मुख्य सन्देश: हम निवासी बनाते हैं — श्रेष्ठ समुदाय" | The method line, 2 paragraphs, "हम-निवासी कार्यक्रम के 5 क्रियाकलाप" (numbered cards), a yellow invite box, the 20%-of-income paragraph, facebook.com/hamniwasi, and a maroon CTA band "अपने मोहल्ले में हम-निवासी कार्यक्रम करने के लिए संपर्क करें · 903 101 101 9". |
| 9 | Order section (`.oc`, "अभी ऑर्डर करें") | **Unchanged** (the existing `OrderCallSection`). |
| 10 | Footer | Unchanged, except that it gets `id="contact"` so the header's "संपर्क" can scroll to it. |

**Removed from Home:**
- the 7-slide banner (`HomeBanner.tsx`, including its static Kitchen slide);
- the old services grid "हर मौके के लिए मित्रम" (with the static Kitchen card and its address, from batch 1);
- "सुनई कंसल्टेंसी और मित्रम" and "हमारी कहानी";
- "अभियान की मुख्य उपयोगिता";
- "हमारी इकाइयाँ";
- the "हमारी रसोइयाँ" locations.

**Kitchen hidden (batch 1, change 5):** the new Home has **no link to `/kitchen`**. Its "मित्रम रसोई और किचन" card goes to WhatsApp. `siteConfig.ts` stays as the switch for the menus, the Services page and the `/kitchen` 404; Home simply no longer has Kitchen-dependent parts.

**The header, on all pages (`MtHeader`), with the drawer and the dropdown unchanged otherwise:**
- "सुनई के बारे में" → "हमारे बारे में" and "सेवाएँ" → "हमारी सेवाएँ";
- "अनुभव और प्रतिबद्धताएँ" and "संपर्क" added after the dropdown, desktop and drawer.
- **Scrolling:** on Home they scroll smoothly to `#work` / `#contact`, with no hash added (as the existing logo / "हमारे बारे में" links do through `HomeLink`). From other pages they open Home at that section.
- **Width:** with 5 links the desktop nav is wider. The board's 1180px breakpoint (smaller nav padding) still applies, and ≤900px uses the drawer. To check: 901–1180px fits without wrapping.

**Building it:**
- **New page code:** `page.tsx` (Home) rewritten, with new section components in `_components/`:
  - `HomeHero`, containing the client-side carousel `HomeCarousel`;
  - `HomeServices`, `HomeWork` and `HomeNiwasi` (sections 6–8).
- **Removed code:** `HomeBanner.tsx` is deleted, as nothing else uses it (Q23).
- **Fonts (Q22):** the Home content uses 3 new Google fonts, Yatra One (headings), Baloo 2 (numbers) and Rajdhani (eyebrows and labels). They're loaded with `next/font` **on the Home page only**, so other pages don't download them.
- **Colours:** the Home's own tokens (`--band #5e1018`, `--cream #f6e1bf`, `--blush #fde4e4`, `--highlight #ffed00`, `--leaf`, `--call`…) are added to the Home wrapper, not to the site-wide `.theme`.
- **Media (Q21):**
  - **Videos:** 3 new ones (5.4, 1.4 and 2.7 MB) go to `public/mitram/videos/` (`home-catering.mp4`, `sammilit-intro.mp4`, `rasoi-kitchen.mp4`).
  - **Images:** the carousel photos and the inline (`data:`) card images are extracted to `_assets/` and imported statically.
- **Carousel behaviour:** the board autoplays its video slide. Plan: the video plays muted only while its slide is showing and pauses otherwise; it doesn't preload until shown. Under reduced motion the slides don't move on by themselves.
- **Page map:** `docs/frontend/mitram-portal.md` gets the Home row's new description and the header's new links.
- **Service-card WhatsApp text (Q25 answer, the alternative):** the four cards that go to WhatsApp open it with a pre-filled line instead of an empty message, using `waUrl()` from `ui.ts`:

  | Card | Pre-filled message |
  |---|---|
  | मित्रम रसोई और मित्रम किचन | नमस्ते मित्रम, मुझे मित्रम रसोई और मित्रम किचन के भोजन के बारे में जानना है। |
  | मेस एवं टिफ़िन सेवा | नमस्ते मित्रम, मुझे मेस एवं टिफ़िन सेवा के बारे में जानना है। |
  | मित्रम स्नैक्स | नमस्ते मित्रम, मुझे मित्रम स्नैक्स के बारे में जानना है। |
  | सोन्हा मटका दही | नमस्ते मित्रम, मुझे सोन्हा मटका दही के बारे में जानना है। |

  Unchanged links: the card's "मित्रम किचन मेन्यू कैटलॉग (WhatsApp)" link, and "कोई ख़ास मौक़ा? — WhatsApp पर बताएँ →", which stay as the prototype has them. The same change goes into the repo Home boards.

**Prototype copy (Q24):** the client's new folder isn't copied over `docs/prototype/mitram/` as a whole. That would drop the batch-2 work in Catering, Sammilit and Laddoo and change the folder layout. Instead:
- `Mitram-Home` and `Mitram-M-Home` are replaced by the new ones;
- the header change is applied to the other 16 boards;
- new media goes to `design/canvas/img/` (the paths in the boards are rewritten from `assets/`, and `*.mp4` stays gitignored).

### 2.3 Prototype copy
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
8. **Q8 (batch 2), source file for the non-veg text:** is `~/Downloads/Mitram Services (2)/Mitram Services/Catering Mitram Kitchen.html` the client prototype from the screenshots?
   - **Recommendation:** use the §2.2f text either way. It matches the screenshots word for word, and the file only supplies the exact characters (nuktas, punctuation).
9. **Q9 (batch 2), fields the client's screenshot doesn't have:** keep the guests −/+ stepper and the आयोजन select?
   - **Recommendation:** keep both. The request says "add the missing fields". The occasion still links to the chips above and goes into the WhatsApp message.
10. **Q10, the order pop-up:** "ऑर्डर देखें" opened a pop-up (a summary, "call to confirm", clear and undo). Should the WhatsApp button replace it entirely?
    - **Recommendation:** yes, as in the screenshot: one button straight to WhatsApp.
11. **Q11, सेवा in the calculator vs the bhoj table's segment:** should picking a service in the bhoj table's segment also change the calculator's सेवा?
    - **Recommendation:** keep them separate, as the client's prototype does. The calculator's सेवा defaults to पूर्ण कैटरिंग.
12. **Q12, validation:** should sending be blocked with 0 guests, and should past dates be blocked?
    - **Recommendation:** yes to both, with the toasts in the plan. The client's prototype sends anything, including 0 guests.
13. **Q13, colours:** the screenshot's dark background and rose card.
    - **Recommendation:** keep the site's colours; change only the fields and the button.
14. **Q14 (change 3), the existing order buttons:** keep "ऑर्डर देखें" / "ऑर्डर पर्ची देखें" and their pop-ups, and add WhatsApp next to them, as decided for Catering?
    - **Recommendation:** yes, the same rule as the Q10 answer.
15. **Q15, Laddoo's call line:** replace "ऑर्डर पक्का करने के लिए 7070 819 777 पर कॉल करें।" with the client's note plus the "या फ़ोन करें … कॉपी" row?
    - **Recommendation:** yes; it's what the screenshot shows.
16. **Q16, Laddoo weight limit:** cap each laddoo at 50 किलो, as the client's?
    - **Recommendation:** yes. Larger orders are bulk orders by phone.
17. **Q17, how a blocked send looks:** the client's Laddoo greys out the button and shows red text above it; its Sammilit doesn't check anything.
    - **Recommendation:** keep the button always clickable; on click show the site's toast and mark the field red, as Bulk and Catering do. It's consistent across the site and says exactly what's missing.
18. **Q18, the phones' fixed bottom total bar** in both client prototypes:
    - **Recommendation:** leave it out. It wasn't asked for and it covers content.
19. **Q19 (batch 3), the header on every page:** the new boards change the header site-wide ("हमारे बारे में", "हमारी सेवाएँ", plus "अनुभव और प्रतिबद्धताएँ" and "संपर्क"). Apply it to all pages, not just Home?
    - **Recommendation:** yes. It's on all 18 new boards, and the header is shared.
20. **Q20, the footer's "मित्रम" column** still says "सुनई के बारे में" in the new boards, while the header now says "हमारे बारे में".
    - **Recommendation:** keep it as the prototype has it (the client may not have meant to change the footer). The alternative is to rename it to match the header.
21. **Q21, the carousel's video:** the board autoplays a 5.4 MB video in the hero.
    - **Recommendation:** play it muted only while its slide is showing, load it only then, and pause it when the slide changes. Same look, much less data on page load, especially on phones.
22. **Q22, new fonts:** Yatra One, Baloo 2 and Rajdhani for the Home content.
    - **Recommendation:** load them on the Home page only (with `next/font`), not site-wide.
23. **Q23, the old Home code:** `HomeBanner.tsx` and the old Home sections become unused.
    - **Recommendation:** delete them; git history keeps them.
24. **Q24, the repo prototype copy:**
    - **Recommendation:** update only Home and the header in `docs/prototype/mitram/` (§2.2i), instead of replacing the folder with the client's new one, which lacks batch 2's work.
25. **Q25, WhatsApp links on the service cards:** the board's "देखें और ऑर्डर करें" for Rasoi & Kitchen, Tiffin, Snacks and Dahi opens WhatsApp with no message.
    - **Recommendation:** as the prototype. A pre-filled line like "नमस्ते, मुझे मेस एवं टिफ़िन सेवा के बारे में जानना है" is an option if wanted.

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

_Batch 2:_

| TC-ID | Title | Pre-condition | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| TC-MTC-21 | Non-veg package contents | — | Open `/catering` → "कैटरिंग पैकेज"; click मांसाहारी, then शाकाहारी (1440 and 390px) | मांसाहारी: red marks, ₹325 / ₹425 / ₹675 / ₹875, and each package shows its non-veg contents exactly as §2.2f (e.g. Special "1 नाश्ता/साइड डिश, मुख्य व्यंजन (1 चिकन करी, …"). शाकाहारी: green marks, ₹275 / ₹375 / ₹575 / ₹775 and the veg contents, unchanged. | H |
| TC-MTC-22 | Picking a non-veg package | मांसाहारी selected | Click "चुनें" on डीलक्स पैकेज | The order form selects "डीलक्स पैकेज (नॉन-वेज) — ₹425", as before this change | M |
| TC-MTC-23 | Calculator fields | — | Open `/catering` → "अपना खर्च जानें" (1440 and 390px) | Fields: मेन्यू (grouped: शाकाहारी पैकेज / मांसाहारी पैकेज / भोज / थाली), मेहमानों की संख्या (stepper), आयोजन, आयोजन की तारीख (वैकल्पिक). सेवा isn't shown for a package. | H |
| TC-MTC-24 | सेवा for bhoj | — | Choose "A. स्पेशल भोजन – 1 सब्जी के साथ", 100 guests; switch सेवा through all 3 | सेवा appears, defaulting to पूर्ण कैटरिंग: ₹17,000 "100 × ₹170 — पूर्ण कैटरिंग"; then ₹14,000 (बिना प्लेट) and ₹15,000 (डिस्पोजेबल). Choosing a package again hides सेवा. | H |
| TC-MTC-25 | 80-plate warning | Bhoj menu chosen | Set guests to 70, then 80 | At 70 the warning "भोज की ये कीमतें 80 प्लेट या अधिक पर लागू हैं। …" shows; at 80 it's gone. It never shows for a package or thali. | M |
| TC-MTC-26 | WhatsApp message | — | Choose डीलक्स पैकेज (मांसाहारी), 120 guests, date = a future date, occasion शादी-ब्याह; click "WhatsApp पर यह ऑर्डर भेजें" | A new tab opens `wa.me/917070819777` with the text "नमस्ते मित्रम किचन, मुझे डीलक्स पैकेज (मांसाहारी) चाहिए, 120 लोगों के लिए, तारीख DD-MM-YYYY, आयोजन: शादी-ब्याह। अनुमानित खर्च ₹51,000। कृपया संपर्क करें।". Without a date or occasion those parts are left out. | H |
| TC-MTC-27 | Sending blocked | — | Set guests to 0 and click the button; then type a past date and click | 0 guests: toast "मेहमानों की संख्या डालें।", no WhatsApp. Past date: the date picker doesn't offer it; a typed one gives the toast "आज या आगे की तारीख़ चुनें।" and no WhatsApp. | H |
| TC-MTC-29 | Both buttons | — | Look at the result card (1440 and 390px); with 100 guests click "ऑर्डर देखें" | "WhatsApp पर यह ऑर्डर भेजें" (yellow) and "ऑर्डर देखें" (outlined) side by side; stacked full width at 390px. The pop-up opens as before; for a bhoj its line reads e.g. "A. स्पेशल भोजन – 1 सब्जी के साथ (पूर्ण कैटरिंग)", and a chosen date shows in its subtitle. With 0 guests: toast "मेहमानों की संख्या डालें।". | H |
| TC-MTC-30 | Laddoo fields | — | Open `/laddoo` (1440 and 390px); look at "आपका ऑर्डर"; switch to होम डिलीवरी and back | नाम and कब चाहिए? always; पता (होम डिलीवरी के लिए) only with होम डिलीवरी. The client's note and "या फ़ोन करें: 7070 819 777" with "कॉपी" sit under the buttons. | H |
| TC-MTC-31 | Laddoo blocked sends | — | Click "WhatsApp पर ऑर्डर भेजें": with no laddoo; then with 1 किलो but no name; then होम डिलीवरी without पता; then a past date | Toasts in order: "अभी कोई लड्डू नहीं चुना। किसी भी लड्डू पर + दबाएँ।", "ऑर्डर भेजने के लिए अपना नाम लिखें।", "होम डिलीवरी के लिए पता लिखें।", "आज या आगे की तारीख़ चुनें।"; the field turns red; no WhatsApp tab. | H |
| TC-MTC-32 | Laddoo WhatsApp text | — | 1½ किलो मोतीचूर, name सुनीता देवी, date 14 Oct, दुकान से लेंगे; click send. Then without the date, with होम डिलीवरी and a पता | `wa.me/917070819777` opens with the §2.2h text (कुल ₹390, "कब चाहिए: 14 अक्टूबर", "कैसे: दुकान से लूँगा/लूँगी (Take Away)"). Without a date: "जल्द से जल्द"; with home delivery: "कैसे: होम डिलीवरी" and the पता line. | H |
| TC-MTC-33 | Laddoo buttons, copy, limit | — | Click "ऑर्डर देखें"; click "कॉपी"; press + on one laddoo past 50 किलो | The pop-up opens as before (its subtitle shows the name and date). "कॉपी" puts 7070819777 on the clipboard and reads "कॉपी हो गया" briefly. The weight stops at 50 किलो. | M |
| TC-MTC-34 | Sammilit fields | — | Open `/sammilit` step 3 (1440 and 390px) | The new subtitle and the client's field order: guests · date+time / आपका नाम · मोबाइल नंबर / आयोजन का पता (full) / दूरी · प्लेट पैकिंग / कुछ और बताना है? (full). One column on phones. | H |
| TC-MTC-35 | Sammilit mobile field | — | Type letters and 12 digits; paste "+91 98765 43210"; then "12345" and send | Digits only, at most 10; +91 dropped. "12345" gives the toast "सही 10 अंकों का मोबाइल नंबर डालें।" and a red field; empty is allowed. | H |
| TC-MTC-36 | Sammilit WhatsApp text and copy | Default slip (भोज B + भंडारा N) | Fill name, mobile, address, note, date; click "WhatsApp पर ऑर्डर भेजें", then "ऑर्डर संदेश कॉपी करें" | WhatsApp opens with the §2.2h multi-line text (each package line with qty × price and extras, packing, total, delivery, पता, संपर्क, नोट); the copied text is identical. Empty fields leave their lines out. | H |
| TC-MTC-37 | Sammilit blocked sends and buttons | — | Remove all packages and send; add one, set 10 guests and send; past date and send; then click "ऑर्डर पर्ची देखें" | Toasts: "पहले कम से कम एक पैकेज जोड़ें।", "सम्मिलित प्रयास पैकेज कम से कम 20 लोगों के लिए है।", "आज या आगे की तारीख़ चुनें।"; no WhatsApp tab. The red WhatsApp button comes first, then "ऑर्डर पर्ची देखें" (outlined; its pop-up works as before), then the copy button. | H |
| TC-MTC-38 | Header on every page | — | Open each page at 1440, 1000 and 390px; open the drawer | Desktop nav: होम · हमारे बारे में · हमारी सेवाएँ ▾ · अनुभव और प्रतिबद्धताएँ · संपर्क. It fits on one row at 1000px. The drawer has the same links. The dropdown's services are unchanged (Kitchen still hidden). | H |
| TC-MTC-39 | Header section links | — | On Home click हमारे बारे में / अनुभव और प्रतिबद्धताएँ / संपर्क; then do the same from `/bulk` and from the drawer | On Home: smooth scroll to `#about` / `#work` / the footer, with the heading clear of the sticky header and no hash in the URL. From another page: Home opens at that section. The drawer closes. | H |
| TC-MTC-40 | Hero | — | Open `/` (1440 and 390px); click each of the 8 chips | Eyebrow, "मित्रम / खाद्य सेवाएँ", the lead with the yellow highlight. Each chip scrolls to its card in "हर मौके के लिए अलग सेवा", which sits below the header. | H |
| TC-MTC-41 | Carousel | — | Watch for 10s; hover; press next/prev and a dot; reach slide 2 | 8 slides with captions; moves on every 4.5s and pauses while hovered; the arrows and dots work and the active dot is yellow. The video slide plays muted only while showing and pauses on leaving; it's not downloaded on page load. With reduced motion it doesn't move on by itself. | H |
| TC-MTC-42 | Figures and About | — | Look below the hero | 4 figure cards overlap the hero's bottom edge (2 columns at ≤760px); "मित्रम की पृष्ठभूमि" with its 3 paragraphs, verbatim. | M |
| TC-MTC-43 | Service cards | — | Check the 8 cards and "कोई ख़ास मौक़ा?"; click each "देखें और ऑर्डर करें" | Content verbatim; both card videos play on press. Links: ₹48 → /bulk, सम्मिलित → /sammilit, रसोई और किचन → WhatsApp, Highway Side → /rasoi, मिठाइयाँ → /laddoo, टिफ़िन / स्नैक्स / दही → WhatsApp. The four WhatsApp cards open `wa.me/917070819777` with their pre-filled line from §2.2i. **No link to /kitchen** anywhere on Home. | H |
| TC-MTC-44 | Work, discount, Niwasi sections | — | Scroll through "हमारे काम", "साफ़ मोहल्ला…", "निवासी की परिभाषा", "मुख्य सन्देश…" | The promise card and 19 log rows; 6 discount rows with the right percentages (the last two yellow); 6 definition bullets in 2 columns (1 column at ≤600px); 5 numbered activities, the yellow invite box and the CTA band with 903 101 101 9. All verbatim. | M |
| TC-MTC-45 | Unchanged tail, and phones | — | Scroll to the end at 1440 and 390px | "अभी ऑर्डर करें" and the footer are as before (the footer now has `id="contact"`). At 390px every section is a single column with no sideways scroll. | H |
| TC-MTC-46 | Fonts only on Home | — | Load `/bulk` with the network open | Yatra One, Baloo 2 and Rajdhani are not downloaded on pages other than Home. | L |
| TC-MTC-28 | Package pick still fills the calculator | — | In "कैटरिंग पैकेज" click मांसाहारी, then "चुनें" on प्रीमियम | The menu shows "प्रीमियम पैकेज (नॉन-वेज) — ₹675", total = guests × ₹675, toast "… — ऊपर खर्च देखें।" | M |

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

- **2026-10-06, shipped:** "i have pushed and merged the code with main".
  - Status set to `shipped` (frontend `e8fb3cb`, root `cd437c4`).
  - §3 rows TC-MTC-01..20 copied verbatim to `docs/testing/TEST_CASES.md`.
  - **Open item carried over:** the video `preload` question (Chrome fetches about 1 MB per video before play) is unanswered; it stays as built.

- **2026-10-07, batch 2:** 3 new changes announced, to be recorded in this file. Change 1 received (§1, Batch 2) and planned in §2.2f, with test cases TC-MTC-21..22. **Awaiting:** changes 2 and 3, then the user's review and go-ahead. No code yet.
- **2026-10-07, go-ahead for change 1:** "start implementing and make sure to update this in prototype too".
  - **Build now:** change 1 only. Changes 2 and 3 haven't been received.
  - **Q8:** not answered. The §2.2f text is used (it matches the screenshots).
  - **Prototype:** the repo boards `docs/prototype/mitram/design/canvas/Mitram-Catering.dc.html` and `Mitram-M-Catering.dc.html` also get the non-veg text. Each package's `<p>` becomes a `{{ pkD_<key> }}` value, and the board's package script (which already sets `pk_<key>` prices from `dv`) picks the veg or non-veg description.
  - **Batch 2 status:** in-progress.
- **2026-10-07:** change 2 received (§1, Batch 2) and planned in §2.2g, with questions Q9–Q13 and test cases TC-MTC-23..28. **Awaiting:** the user's review and go-ahead for change 2, and change 3. No code for change 2 yet.
- **2026-10-07, answers Q9–Q13:** "dont remove the see order button add the new button next to it rest as recommended".
  - **Q10:** **against the recommendation** to replace the pop-up. "ऑर्डर देखें" and its pop-up stay, and the WhatsApp button is added next to it (§2.2g). Built as asked.
  - **Q9:** keep the stepper and the आयोजन select.
  - **Q11:** सेवा stays separate from the bhoj table's segment.
  - **Q12:** block 0 guests and past dates.
  - **Q13:** keep the site's colours.
  - **Awaiting:** the go-ahead to implement change 2.
- **2026-10-07, go-ahead for change 2:** "start implementation".
- **2026-10-07:** change 3 received (§1, Batch 2) and planned in §2.2h, with questions Q14–Q18 and test cases TC-MTC-30..37. **Awaiting:** the user's review and go-ahead. No code for change 3 yet.
- **2026-10-07, answers Q14–Q18:** "all as recommended".
  - **Q14:** keep the existing order buttons and pop-ups; add WhatsApp next to them.
  - **Q15:** Laddoo's call line is replaced by the client's note and the "या फ़ोन करें … कॉपी" row.
  - **Q16:** a 50 किलो cap per laddoo.
  - **Q17:** the button stays clickable; a blocked send shows a toast and a red field.
  - **Q18:** no fixed bottom bar on phones.
  - **Awaiting:** the go-ahead to implement change 3.
- **2026-10-07, go-ahead for change 3:** "yes".

- **2026-10-07, batch 3 received:** the Home redesign and the header change (§1 Batch 3). Planned in §2.2i, with questions Q19–Q25 and test cases TC-MTC-38..46. The user: "then when i tell you to implement we will do it". **Waiting** for answers and the "implement" instruction. No code.
- **2026-10-07, answers Q19–Q25:** "all  as recommended except q25 alternative".
  - **Q19:** the header change goes on every page.
  - **Q20:** the footer keeps "सुनई के बारे में", as the prototype.
  - **Q21:** the carousel video plays muted and loads only while its slide is showing.
  - **Q22:** the 3 new fonts load on the Home page only.
  - **Q23:** the old Home code is deleted.
  - **Q24:** only Home and the header are updated in the repo prototype copy.
  - **Q25: the alternative, against the recommendation** to keep the prototype's empty WhatsApp links. The four service cards' "देखें और ऑर्डर करें" open WhatsApp with a pre-filled line naming the service (§2.2i). Built as asked.
  - **Waiting** for the "implement" instruction.
- **2026-10-07, go-ahead for batch 3:** "let them stay empty and start implementaion".
  - **"Them":** the two WhatsApp links that keep no pre-filled text (the menu-catalogue link and "कोई ख़ास मौक़ा?"), as planned.

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
- **2026-10-07, batch 2 change 1 built:**
  - **Code (`CateringOrder.tsx`):** `PKGS` has `dv` / `dn` descriptions; the card shows `dn` when मांसाहारी is on. The card price comes from `O`, which fixes Premium and Ultimate non-veg (₹625 → ₹675, ₹825 → ₹875).
  - **Boards (`Mitram-Catering.dc.html`, `Mitram-M-Catering.dc.html`):**
    - each package `<p>` is now `{{ pkD_<key> }}`, set in the package script from the veg or non-veg list;
    - the price line reads `O.find(x => x[0] === k + '_' + dv)[2]` instead of `+ 50`.
    - Edited with a one-off Node script kept in the session scratchpad, not added to the repo.
  - **Text source check:** all 4 non-veg strings in the code match `Catering Mitram Kitchen.html` character for character.
  - **Verified on :3016 (Playwright, 1440 and 390px):**
    - **TC-MTC-21:** शाकाहारी shows ₹275 / ₹375 / ₹575 / ₹775 with the veg text; मांसाहारी shows ₹325 / ₹425 / ₹675 / ₹875 with the non-veg text.
    - **TC-MTC-22:** non-veg डीलक्स "चुनें" selects "डीलक्स पैकेज (नॉन-वेज) — ₹425".
    - **Both boards** (opened as files) show the same text and prices for veg and non-veg, with no script errors.
  - **Checks:** `tsc` (whole frontend) and `eslint` clean.
  - **Docs:** no page added or removed, so `mitram-portal.md` is unchanged.
- **2026-10-07, batch 2 change 2 built:**
  - **Code (`CateringOrder.tsx`):**
    - `O`'s bhoj rows carry their 3 सेवा prices (the same numbers as `CateringBhoj`'s table);
    - `GROUPS` puts मेन्यू in the client's optgroups, with bhoj labels carrying no price;
    - `TIERS`, `waName()` and `todayIso()` are new;
    - state gets `tier` (default पूर्ण कैटरिंग) and `date`.
  - **`CateringCalc`:**
    - the सेवा select appears only for bhoj, and the date box is a third field in the grid;
    - the breakdown adds " — <सेवा>", and the 80-plate warning shows for bhoj under 80;
    - the yellow "WhatsApp पर यह ऑर्डर भेजें" link (new tab, `WHATSAPP?text=…`) sits beside "ऑर्डर देखें", which is now `btn("light")`. They stack full width at ≤560px;
    - the pop-up line adds " (सेवा)" and its subtitle adds the date.
  - **Date `min`:** set on focus rather than at render, so the server's date can't cause a hydration mismatch.
  - **Boards (`Mitram-Catering.dc.html`, `Mitram-M-Catering.dc.html`):** the same markup changes:
    - the menu optgroups, `<sc-if isBhoj>` सेवा and the date field;
    - `<sc-if bhojWarn>` for the warning, and a `.ct-btns` row with the WhatsApp link and the "ऑर्डर देखें" `btn-light`;
    - a few CSS rules, and the script values (`tier`, `date`, `waHref`, `waClick` with the two toasts, the pop-up subtitle).
    - Edited with a one-off Node script in the session scratchpad, not added to the repo.
  - **Verified on :3016 (Playwright, 1440 and 390px):**
    - **TC-MTC-23:** 4 groups (4 / 4 / 7 / 3 options), and सेवा is hidden for packages.
    - **TC-MTC-24:** A at 100 guests gives ₹17,000 (पूर्ण) / ₹14,000 / ₹15,000.
    - **TC-MTC-25:** the warning shows at 70 and not at 80.
    - **TC-MTC-26:** the exact message text, including the date (15-11-2026) and the occasion.
    - **TC-MTC-27:** 0 guests or a past date gives the toast and opens no tab; `min` = today.
    - **TC-MTC-28:** picking non-veg प्रीमियम gives ₹675 in the menu and total.
    - **TC-MTC-29:** the buttons sit side by side at 1440px and stack at 390px; the pop-up shows the सेवा and the date.
    - No console errors.
  - **Both boards** (opened as files) give the same results and have no script errors.
  - **Checks:** `tsc` (whole frontend) and `eslint` clean.
  - **Docs:** the `mitram-portal.md` `/catering` row now describes the estimate and the WhatsApp send.
- **2026-10-07, batch 2 change 3 built:**
  - **Shared helpers moved to `ui.ts`:** `waUrl()`, `todayIso()`, `hiDate()`, `digits10()`, `pastedMobile()` and `MOBILE_RE`.
    - `BulkCalc` and `CateringOrder` now import them instead of their local copies. Same behaviour; one copy of the phone rule.
  - **`LaddooOrder.tsx`:**
    - the नाम / कब चाहिए? fields, and पता for होम डिलीवरी only;
    - "WhatsApp पर ऑर्डर भेजें" (maroon, first), with "ऑर्डर देखें" kept below it as the outlined white style;
    - the client's note, and the "या फ़ोन करें … कॉपी" row;
    - a 50 किलो cap per laddoo;
    - the pop-up subtitle adds the name and date.
    - **Copy fallback:** the clipboard API exists only on HTTPS pages. Found in testing on the local http host, where the first version showed "कॉपी हो गया" without copying. Now: clipboard if available, else the number is selected and the button reads "चुन लिया" (the client prototype's own fallback).
  - **`SammilitBuilder.tsx`:**
    - the step 3 subtitle;
    - the आपका नाम / मोबाइल नंबर / आयोजन का पता (full width) / कुछ और बताना है? (full width) fields in the client's order;
    - the client's multi-line `msg`, used by both WhatsApp and "ऑर्डर संदेश कॉपी करें";
    - a red "WhatsApp पर ऑर्डर भेजें" with the › circle first, then "ऑर्डर पर्ची देखें" (outlined), then copy;
    - the pop-up subtitle adds the name.
    - The cook items' message line has no dish text. The client's script prints "undefined" there; that's a bug in their script, so it's not copied.
  - **Boards:** `Mitram-Laddoo`, `Mitram-M-Laddoo`, `Mitram-Sammilit` and `Mitram-M-Sammilit` (`.dc.html`) get the same:
    - fields (in the Sammilit board, the `span2` full-width ones);
    - buttons, the note and the copy row;
    - rules and messages (script values `waHref`, `waClick`, and the field setters and error classes).
    - Edited with a one-off Node script in the session scratchpad, not added to the repo.
  - **Verified on :3016 (Playwright, 1440 and 390px), clipboard stubbed:**
    - **TC-MTC-30:** the Laddoo fields; पता appears only with होम डिलीवरी.
    - **TC-MTC-31:** the 4 blocking toasts with red fields.
    - **TC-MTC-32:** the exact Laddoo messages (dated / "जल्द से जल्द", home / Take Away).
    - **TC-MTC-33:** the pop-up subtitle; "कॉपी" puts 7070819777 on the clipboard ("कॉपी हो गया"; "चुन लिया" plus the number selected on plain http); the 50 किलो cap.
    - **TC-MTC-34:** the Sammilit fields at the client's positions: full-width address and note at 1440px, one column at 390px.
    - **TC-MTC-35:** typed "abc98765432109" gives 9876543210; a pasted "+91 98765 43210" gives 9876543210; "12345" gives a toast and a red field.
    - **TC-MTC-36:** the full message, with copied text identical.
    - **TC-MTC-37:** the no-package / <20 / past-date toasts and the button order.
    - Blocked sends opened 0 WhatsApp tabs; no console errors.
  - **Both board pairs** (opened as files) give the same results and have no script errors.
  - **Checks:** `tsc` (whole frontend) and `eslint` clean.
  - **Docs:** the `mitram-portal.md` rows for `/sammilit` and `/laddoo` describe the WhatsApp ordering.
- **2026-10-07, change 2 follow-up:** "in the catering page the right side card that has see orders and send to whatsapp button / make its ui proper keep content properly centered" (screenshot: the maroon result card at 1440px, with its label, total, breakdown and the two buttons all left-aligned, and empty space on the right).
  - **Change:** the result card's content is centred horizontally: the label, total, breakdown, bhoj warning, and the two-button row (`justify-center`). It stays vertically centred as before. On phones the buttons stay stacked full width.
  - **Prototype:** the same in both Catering boards (`.ct-cr .est` centred, `.ct-btns` `justify-content:center`).
  - **Built and verified** (Playwright, 1440 and 390px): the label, total, breakdown and warning are centred in the card (offset 0px from its centre line). The two buttons are centred as a pair at 1440px and stacked full width at 390px. The board looks the same. `eslint` clean.
  - **Reverted, 2026-10-07:** "that is not looking good revert it back". The card is back to its earlier left-aligned layout, in the code and both boards. The centring is withdrawn.
  - **Instead, 2026-10-07:** "just do this give a bit of vertical gap between the buttons and the above text" (the label, total and breakdown). The button row gets an extra 8px top margin (`mt-2`), so the gap goes from 14px to 22px. The same in both boards (`.ct-btns{margin-top:8px}`). Nothing else changes.
- **2026-10-07, plan-file repair:** while change 3 was planned, a scripted edit pasted a second copy of this file's first ~345 lines into the §2.2h Sammilit table. The cause: a dollar sign followed by a backtick in the inserted text was treated by JavaScript's `replace()` as "insert the text before the match". Found while logging the build; the duplicate block was removed and the regex restored. No content was lost.
- **2026-10-07, batch 3 built:**
  - **Home (`page.tsx`):** rewritten from the new board, with the 9 sections of §2.2i and copy verbatim. New `home.module.css` (the `.mu` tokens) and `HomeCarousel.tsx` (client).
    - Yatra One, Baloo 2 and Rajdhani come from `next/font` in `page.tsx`.
    - The 15 images are in `_assets/home/` (7 carousel photos plus the 8 card images that were inline `data:` in the board).
    - The 3 videos are in `public/mitram/videos/` (`home-catering`, `sammilit-intro`, `rasoi-kitchen`).
    - The four WhatsApp cards use `waUrl()` with their pre-filled line (Q25); the catalogue link and "कोई ख़ास मौक़ा?" are left without one.
  - **Removed:** `HomeBanner.tsx`, and the old Home sections (they lived in `page.tsx`).
  - **Header (`MtHeader`):** "हमारे बारे में" and "हमारी सेवाएँ", plus "अनुभव और प्रतिबद्धताएँ" and "संपर्क" (desktop and drawer).
    - `HomeLink` takes `to: "work" | "contact"` as well.
    - `MtFooter` has `id="contact"` and a scroll offset.
  - **Fix during the build:** the "कोई ख़ास मौक़ा?" card rendered cream instead of maroon. Two competing background utilities were stacked (the base card's and the override); the ₹48 card only came out right by class order. Card layout and card colours are now separate (`CARD_BASE`), and the other `!` overrides (eyebrow on the band, ask-card h3, phone prices, the red card's order link) became their own class strings.
  - **Verified on :3016 (Playwright):**
    - **Layout:** page height 6,491px at 1440 (board 6,471) and 12,855px at 390 (board 12,839); no sideways scroll; no console errors. Screenshots match the board section by section, including the phone layout.
    - **TC-MTC-38:** the header at 1000 and 1180px is one row.
    - **TC-MTC-39:** on Home, about / work land 88px from the top (below the header) with no hash. From `/bulk`, "अनुभव और प्रतिबद्धताएँ" opens `/#work` at the section and "संपर्क" opens `/#contact` (the footer; the page bottom).
    - **TC-MTC-40:** a chip ("मिठाइयाँ") scrolls its card to 96px.
    - **TC-MTC-41:** the carousel moves 0→1 after 4.7s and pauses on hover; next and dot 8 work. The carousel video isn't requested on load; it plays on its slide and pauses on leaving. The two card videos load metadata only, as the board.
    - **TC-MTC-43:** links: ₹48 → /bulk, सम्मिलित → /sammilit, Highway → /rasoi, मिठाइयाँ → /laddoo, and four pre-filled WhatsApp links plus two empty ones. 0 links to /kitchen.
    - **TC-MTC-46:** loaded fonts are Rozha One, Mukta, Yatra One, Baloo 2 and Rajdhani on `/`, but only Rozha One and Mukta on `/bulk`.
  - **Prototype (Q24):**
    - `Mitram-Home` and `Mitram-M-Home` are replaced by the new boards (`assets/` → `img/`) plus the four pre-filled WhatsApp links.
    - The other 16 boards got the header patch: the nav line and the drawer line from the client's same board, the `secVals()` / `_rv0()` script and the viewer `postMessage` script. 10 of them are now byte-identical to the client's; the 6 batch-2 boards differ only by that work.
    - New media: 8 images and 3 videos in `design/canvas/img/` (`*.mp4` gitignored).
    - All 18 boards open without script errors and show the new header links.
  - **Checks:** `tsc` (whole frontend) and `eslint` clean.
  - **Docs:** `mitram-portal.md`: the header paragraph (new links) and the `/` row.
- **2026-10-07, videos reused (the user):** "i think the videos are already present because we already used these videos in the catering page".
  - **Checked:** the files differed by checksum, but by length, resolution and frames at 3s and 15s, the board's three videos are re-encodes of Catering's:
    - the carousel's `1ce0c…` (5.4 MB, 848×478, 28.5s) = `training-catering.mp4` (640×360, 28.6s);
    - the Sammilit card's `a7e9b…` (1.4 MB, 360×640, 54.8s) = `bsnl-catering.mp4` (540×960);
    - the Rasoi & Kitchen card's `6d325…` (2.7 MB, 640×360, 31.1s) = `school-thali.mp4`.
  - **Changed:** Home now uses the existing files. The cards also use Catering's posters from `_assets/videos/`.
  - **Removed:** the three copies I had added (`home-catering`, `sammilit-intro`, `rasoi-kitchen`, 9.5 MB) and my two poster images (unstaged). §2.2i's "3 new videos" no longer applies.
  - **Verified:** all three videos load on Home (no 4xx); the carousel's plays on slide 2; the cards show their posters. `tsc` and `eslint` clean.
  - The repo boards keep their own (gitignored) copies under `design/canvas/img/`, as the client's files.

## 6. Post-deploy

### 2026-10-06: Kitchen card address hidden on phones

> this adderess disappears in the mobile view can you make it so it doesnt meaning dont hide this address in the mobile screen
> SBI बैंक बाज़ार समिति ब्रांच के नज़दीक, बहादुरपुर, पटना

**Cause:** the Home services-grid cards hide their description at ≤900px. That's the boards' `.svc-card p` rule, and the static Kitchen card copied the same `[@media(max-width:900px)]:hidden`. Since the address replaced the description there, it disappeared on phones.

**Fix:** remove the ≤900px hide from the **static Kitchen card's** text only, so the address shows at every width. The other cards keep the board's mobile behaviour (descriptions hidden), and the Services page row already shows it.

This is a deliberate deviation from the board: the new board hides it on phones too. Requested by the user.

**Built:**
- **Code (`page.tsx`):** the static card's `<p>` no longer has `[@media(max-width:900px)]:hidden`. At ≤900px it's 13px (the size the board uses for small card text on phones, e.g. the CTA card), and 14.5px on desktop as before.
- **Verified on :3016:** at 390px the address shows (display block, 13px, card 216px tall, sitting well in the 2-column grid); the other cards' descriptions are still hidden on phones, as in the board. At 1440px it's unchanged (14.5px).
- **Checks:** `eslint` clean.

### 2026-10-06: Bulk booking pop-up buttons cut off on a phone

> ok this form looks like this in my phone
> it  button are overflowing out of the screen and there is no scroll

_(Screenshot from a real Android phone on https://mitram.niwasi.in/bulk: the "बल्क ऑर्डर बुक करें" pop-up fills the screen. The bottom bar with the call and "WhatsApp पर बुक करें" buttons is cut off at the bottom edge, and the pop-up doesn't scroll.)_

**Cause:** on phones the pop-up is full screen at `height: 100vh` (the board's own rule, ported as `h-screen`).
- **Why that's wrong on phones:** mobile browsers resolve `100vh` to the height with the address bar **hidden**. While the bar shows, the pop-up is taller than the visible area. Its bottom bar (the call and "WhatsApp पर बुक करें" buttons) sits below the screen edge, and since the form itself fits inside that too-tall box, there's nothing to scroll.
- **Not reproducible in headless Playwright,** which has no address bar (there `100vh` = the visible height). Checked at 390×640 and 360×560: the buttons were visible and the body scrolled.
- **First suspicion ruled out:** a missing `min-h-0` on the scrolling body. That wasn't it; an `overflow:auto` flex item can already shrink.

**Fix:**
- **`BulkCalc.tsx`:** the pop-up's ≤900px height is `h-dvh max-h-dvh` (100dvh, the *dynamic* viewport height, which tracks the address bar). Confirmed in the compiled CSS: `height: 100dvh; max-height: 100dvh`.
- **Same cause, fixed in the same change:**
  - `MtHeader`'s ≤900px drawer is `h-dvh` (was `h-screen`), so its last item, the call button, can't sit below the screen;
  - `OrderModal`'s ≤900px bottom-sheet cap is `max-h-[92dvh]` (was 92vh).
- **Left as they are:** the full-screen scrim (taller than visible is harmless), the desktop-only `calc(100vh-40px)` caps, the gallery lightbox image `70vh`, and the layout's `min-h-screen`.

**Verified on :3016:**
- **Regression check at 390×700 (mobile emulation):** the drawer is 700px with the call button in view; the Bulk pop-up is 700px with the WhatsApp button bottom at 686.
- **Checks:** `eslint` clean.
- **The real address-bar case needs the user's phone** to confirm: open `/bulk` → "WhatsApp पर ऑर्डर भेजें" and check the bottom buttons show.

## 7. Cross-references

- Parent feature: [2026-10-06-mitram-site.md](2026-10-06-mitram-site.md)
- TEST_CASES: TC-MTC-01..20, promoted from §3 on ship (2026-10-06)
- Config: `apps/frontend/app/(mitram)/mitram/_components/siteConfig.ts` (page on/off, routes, menus)
- Page maps: `docs/frontend/mitram-portal.md` (header brand, order section, Bulk booking form, Catering videos, Kitchen hidden, siteConfig note); no page added or removed; no API change
- Prototype: `docs/prototype/mitram/` (replaced with the new version; `*.mp4` gitignored there, committed once in `public/mitram/videos/`)
- Commits: frontend `e8fb3cb` "feat(mitram): apply 5 prototype changes — …"; root `cd437c4` "feat(mitram): bump frontend for the 5 Mitram changes; update prototype, page map and plan"
