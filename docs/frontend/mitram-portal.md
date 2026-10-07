# Mitram Website (`mitram.niwasi.in`)

The public website of Mitram (मित्रम), Sunai Consultancy's food service: daily meals, bulk orders,
event packages, catering, Mitram Rasoi in Ballia, laddoos and Makar Sankranti specials. It's fully
static and all in Hindi. There's no login and no backend: an order is put together on the page and
then confirmed by phone (the order pop-up shows the summary and a call button; nothing is sent).

- **Code:** `apps/frontend/app/(mitram)/mitram/`
- **URLs:** `proxy.ts` rewrites `mitram.niwasi.in/<path>` (any `mitram.` host) onto the internal
  `/mitram/<path>`. The browser keeps showing `mitram.niwasi.in/<path>`. **The URLs below are what
  the user sees.** To find the file, prepend `app/(mitram)/mitram/`. The internal `/mitram` path
  can't be opened on `niwasi.in` (it redirects to `/`).
- **Source design:** the prototype boards in `docs/prototype/mitram/design/canvas/`.
- **Plan:** `docs/planning/features/2026-10-06-mitram-site.md`; later changes in `docs/planning/features/2026-10-06-mitram-site-changes.md`.
- **Pages on/off:** `_components/siteConfig.ts` is the one place that maps pages to routes and turns a page off. A disabled page returns 404, leaves every menu, and the cards that link to it render static.
- **Every page** is listed, with its count, in [All pages](#all-pages) at the end.

## Pages

Every page shares the same header (the text brand "मित्रम", होम, हमारे बारे में (`/#about`), the हमारी
सेवाएँ menu with the services, अनुभव और प्रतिबद्धताएँ (`/#work`), संपर्क (`/#contact`, the footer), the
call button; a slide-in menu on phones) and footer. On Home the section links scroll smoothly; from
other pages they open Home at that section. Home, Services, Bulk,
Catering, Laddoo and Sankranti also share the order section ("अभी ऑर्डर करें": the phone number, the
address, FSSAI, the 20% campaign banner, and the हम निवासी logo and QR code).

| URL | Page |
|---|---|
| `/` | Home (redesigned 2026-10-07): the "मित्रम खाद्य सेवाएँ" hero with service chips and an 8-slide photo/video carousel, 4 figures, about (`/#about`), the services as cards (`/#services`; order links to Bulk, Sammilit, Rasoi, Laddoo, or WhatsApp with a pre-filled line), past work (`/#work`), the clean-neighbourhood discount table, who is a निवासी, the हम-निवासी programme, and the order section. Its 3 extra fonts load on Home only |
| `/services` | All services, with filter chips (daily / event / sweets) |
| `/kitchen` | **Hidden for now: returns 404** (`siteConfig.ts`: `kitchen.enabled = false`). It's not in the menus, and the cards that point to it are static. When enabled: मित्रम किचन — रोज़ का भोजन: the full daily menu (thali, breakfast, non-veg, Chinese, monthly tiffin) with quantities, a cart and the order pop-up |
| `/bulk` | ₹48 भोजन — बल्क ऑर्डर: the bulk meal cost calculator (20 people or more: utensils, pickup or delivery, serving staff) with an estimated bill, and a booking form (name, mobile, date, people, address for delivery) that ends in a WhatsApp message. Nothing is sent by the site. |
| `/sammilit` | सम्मिलित प्रयास पैकेज: event meal packages (puja, bhandara, sabha, functions) that build an order slip. The guest details (name, mobile, address, note) and the slip are sent as a WhatsApp message ("WhatsApp पर ऑर्डर भेजें"), viewed in the order pop-up, or copied |
| `/catering` | मित्रम किचन कैटरिंग: catering packages (veg / non-veg contents and prices), menus, and the "अपना खर्च जानें" cost estimate (menu, सेवा for bhoj, guests, occasion, optional date). The estimate can be sent as a WhatsApp message ("WhatsApp पर यह ऑर्डर भेजें") or viewed in the order pop-up ("ऑर्डर देखें"), plus "हाल के आयोजन" with 4 event videos (served from `public/mitram/videos/`) and the photo gallery |
| `/rasoi` | मित्रम रसोई, बलिया: the vegetarian restaurant in Ballia, open 24×7, with its hall for 80–100 guests |
| `/laddoo` | मित्रम लड्डू: laddoo varieties by weight (½ kg steps, max 50 kg each), and an order sheet (pickup or home delivery, name, date, address) sent as a WhatsApp message ("WhatsApp पर ऑर्डर भेजें") or viewed in the order pop-up |
| `/sankranti` | दही-चूड़ा · मकर संक्रांति: curd, chura, tilkut and family gift packs, and order |

## All pages

The complete list: one row per `page.tsx` in `apps/frontend/app/(mitram)/mitram/`. Keep it in sync
by hand (see the docs rule in `AGENTS.md`).

9 pages.

| URL | Kind | File |
|---|---|---|
| `/` | Page | `app/(mitram)/mitram/page.tsx` |
| `/bulk` | Page | `app/(mitram)/mitram/bulk/page.tsx` |
| `/catering` | Page | `app/(mitram)/mitram/catering/page.tsx` |
| `/kitchen` | Page (disabled: 404) | `app/(mitram)/mitram/kitchen/page.tsx` |
| `/laddoo` | Page | `app/(mitram)/mitram/laddoo/page.tsx` |
| `/rasoi` | Page | `app/(mitram)/mitram/rasoi/page.tsx` |
| `/sammilit` | Page | `app/(mitram)/mitram/sammilit/page.tsx` |
| `/sankranti` | Page | `app/(mitram)/mitram/sankranti/page.tsx` |
| `/services` | Page | `app/(mitram)/mitram/services/page.tsx` |
