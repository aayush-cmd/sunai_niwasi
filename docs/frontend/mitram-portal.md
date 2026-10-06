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
- **Plan:** `docs/planning/features/2026-10-06-mitram-site.md`.
- **Every page** is listed, with its count, in [All pages](#all-pages) at the end.

## Pages

Every page shares the same header (होम, सुनई के बारे में, the सेवाएँ menu with the 7 services, the
call button; a slide-in menu on phones) and footer.

| URL | Page |
|---|---|
| `/` | Home: the 7-slide banner carousel, the services, about Sunai (`/#about`) and the Ham Niwasi campaign, Mitram's units, the 20% Ham Niwasi band, the two kitchens' locations |
| `/services` | All services, with filter chips (daily / event / sweets) |
| `/kitchen` | मित्रम किचन — रोज़ का भोजन: the full daily menu (thali, breakfast, non-veg, Chinese, monthly tiffin) with quantities, a cart and the order pop-up |
| `/bulk` | ₹48 भोजन — बल्क ऑर्डर: the bulk meal cost calculator (20 people or more) and order |
| `/sammilit` | सम्मिलित प्रयास पैकेज: event meal packages (puja, bhandara, sabha, functions) that build an order slip |
| `/catering` | मित्रम किचन कैटरिंग: catering packages, menus and order |
| `/rasoi` | मित्रम रसोई, बलिया: the vegetarian restaurant in Ballia, open 24×7, with its hall for 80–100 guests |
| `/laddoo` | मित्रम लड्डू: laddoo varieties by weight, and order |
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
| `/kitchen` | Page | `app/(mitram)/mitram/kitchen/page.tsx` |
| `/laddoo` | Page | `app/(mitram)/mitram/laddoo/page.tsx` |
| `/rasoi` | Page | `app/(mitram)/mitram/rasoi/page.tsx` |
| `/sammilit` | Page | `app/(mitram)/mitram/sammilit/page.tsx` |
| `/sankranti` | Page | `app/(mitram)/mitram/sankranti/page.tsx` |
| `/services` | Page | `app/(mitram)/mitram/services/page.tsx` |
