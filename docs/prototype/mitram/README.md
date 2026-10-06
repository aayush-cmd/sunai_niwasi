# Mitram Website — Prototype

Clickable prototype of the **Mitram website** (मित्रम), with every page in a desktop (1440px) and a mobile (390px) design. The screens are the live boards from the Claude Design canvas, so menus, the order cart, the clear/remove order controls and the catering enquiry work as on the canvas.

## Run it

No build step and no internet needed.

- **Quickest:** open `index.html` in Chrome or Edge.
- **Local server:** `npx serve .` or `python3 -m http.server 8080`, then open the printed URL.

Use the **Page** dropdown to jump between pages and **Desktop / Mobile** to switch the frame.

## Pages

| Page | Desktop board | Mobile board |
|---|---|---|
| होम | `Mitram-Home.dc.html` | `Mitram-M-Home.dc.html` |
| सेवाएँ | `Mitram-Services.dc.html` | `Mitram-M-Services.dc.html` |
| मित्रम किचन — रोज़ का भोजन | `Mitram-Kitchen.dc.html` | `Mitram-M-Kitchen.dc.html` |
| ₹48 भोजन — बल्क ऑर्डर | `Mitram-Bulk.dc.html` | `Mitram-M-Bulk.dc.html` |
| सम्मिलित प्रयास पैकेज | `Mitram-Sammilit.dc.html` | `Mitram-M-Sammilit.dc.html` |
| मित्रम कैटरिंग | `Mitram-Catering.dc.html` | `Mitram-M-Catering.dc.html` |
| मित्रम रसोई, बलिया | `Mitram-Rasoi.dc.html` | `Mitram-M-Rasoi.dc.html` |
| मित्रम लड्डू | `Mitram-Laddoo.dc.html` | `Mitram-M-Laddoo.dc.html` |
| दही-चूड़ा · मकर संक्रांति | `Mitram-Sankranti.dc.html` | `Mitram-M-Sankranti.dc.html` |

## What's inside

| Path | What it is |
|---|---|
| `index.html` | The full prototype (single file; pages, runtime and images inlined) |
| `design/canvas/*.dc.html` | Source boards from the Claude Design canvas (9 desktop + 9 mobile) |
| `design/canvas/canvas.json` | Canvas layout for the Mitram page (board names, sizes, order) |
| `design/canvas/support.js` | Runtime that renders the `.dc.html` boards |
| `design/canvas/img/` | Food, logo and banner images and the catering videos used by the boards (86 files). Keep this folder next to `index.html`: the catering videos play from here. |

Data in the prototype is sample data; orders and enquiries are not saved.

The **canvas is the design source**; this folder is a shared, runnable copy of it.
