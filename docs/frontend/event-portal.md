# Event Portal (`event.niwasi.in`)

The public-facing side of events. Anyone can browse published events and register. Event hosts
use it to run the event on the day: registrations, attendance, assignments, comments and reports.

- **Code:** `apps/frontend/app/(event)/event-host/`
- **URLs:** `proxy.ts` rewrites `event.niwasi.in/<path>` onto the internal `/event-host/<path>`.
  The browser keeps showing `event.niwasi.in/<path>`. **The URLs below are what the user sees.**
  To find the file, prepend `app/(event)/event-host/`.
- **Every page** is listed, with its count, in [All pages](#all-pages) at the end.

> **Where events are created.** Events aren't created here. A community creates them at
> `niwasi.in/community/[slug]/events` (see the [Niwasi Portal](niwasi-portal.md)), and a partner
> at `partner.niwasi.in/{slug}/[pctype]/events` (see the [Partner Portal](partner-portal.md)).
> Once an event is published, it shows up on this portal.

## Pages

`{slug}` below is the event's URL name.

### Public

| URL | Page |
|---|---|
| `/` | Landing page: a card for each published event, linking to its dashboard |
| `/event/home` | Event home |
| `/event/login` | Login |
| `/event/SignUp` | Register an account |
| `/event/profile/[id]` | A user's event profile |

### One event — `/event/{slug}/...`

| URL | Page |
|---|---|
| `/event/{slug}/dashboard` | The event's main page: details, stats and a WhatsApp share button |
| `/event/{slug}/registration` | Registrations list |
| `/event/{slug}/registration/create` | Register for the event |
| `/event/{slug}/registration/[regId]`, `/[regId]/edit` | View or edit a registration |
| `/event/{slug}/mark-attendance` | Mark who attended |
| `/event/{slug}/assign` (+ create, [assignId], edit) | Assign people to event roles or tasks |
| `/event/{slug}/comment` | Comments on the event |
| `/event/{slug}/report` (+ new, [reportId], edit) | Post-event reports |

## Why the internal folder is `event-host`, not `event`

The event portal's old URLs already start with `event/`, e.g. `event.niwasi.in/event/login`. If
the internal folder were also called `event`, the rewrite would produce `/event/event/login`. The
separate `event-host` name keeps the old URL shape working. See the "Multi-domain routing" section
of `apps/frontend/README.md` for the full routing logic.

## All pages

The complete list: one row per `page.tsx` in `apps/frontend/app/`. The sections above explain what each feature is; this table makes sure every page is listed. Keep it in sync by hand (see the docs rule in `AGENTS.md`).

20 pages. **URL** is what the user sees. **Kind** comes from the URL: Create = `new`/`create`/`add`, Edit = `edit`, Detail = ends in a `[param]`.

| URL | Kind | File |
|---|---|---|
| `/` | Page | `app/(event)/event-host/page.tsx` |
| `/event/[event_slug]/assign` | Page | `app/(event)/event-host/event/[event_slug]/assign/page.tsx` |
| `/event/[event_slug]/assign/[assignId]` | Detail | `app/(event)/event-host/event/[event_slug]/assign/[assignId]/page.tsx` |
| `/event/[event_slug]/assign/[assignId]/edit` | Edit | `app/(event)/event-host/event/[event_slug]/assign/[assignId]/edit/page.tsx` |
| `/event/[event_slug]/assign/create` | Create | `app/(event)/event-host/event/[event_slug]/assign/create/page.tsx` |
| `/event/[event_slug]/comment` | Page | `app/(event)/event-host/event/[event_slug]/comment/page.tsx` |
| `/event/[event_slug]/dashboard` | Page | `app/(event)/event-host/event/[event_slug]/dashboard/page.tsx` |
| `/event/[event_slug]/mark-attendance` | Page | `app/(event)/event-host/event/[event_slug]/mark-attendance/page.tsx` |
| `/event/[event_slug]/registration` | Page | `app/(event)/event-host/event/[event_slug]/registration/page.tsx` |
| `/event/[event_slug]/registration/[regId]` | Detail | `app/(event)/event-host/event/[event_slug]/registration/[regId]/page.tsx` |
| `/event/[event_slug]/registration/[regId]/edit` | Edit | `app/(event)/event-host/event/[event_slug]/registration/[regId]/edit/page.tsx` |
| `/event/[event_slug]/registration/create` | Create | `app/(event)/event-host/event/[event_slug]/registration/create/page.tsx` |
| `/event/[event_slug]/report` | Page | `app/(event)/event-host/event/[event_slug]/report/page.tsx` |
| `/event/[event_slug]/report/[reportId]` | Detail | `app/(event)/event-host/event/[event_slug]/report/[reportId]/page.tsx` |
| `/event/[event_slug]/report/[reportId]/edit` | Edit | `app/(event)/event-host/event/[event_slug]/report/[reportId]/edit/page.tsx` |
| `/event/[event_slug]/report/new` | Create | `app/(event)/event-host/event/[event_slug]/report/new/page.tsx` |
| `/event/home` | Page | `app/(event)/event-host/event/home/page.tsx` |
| `/event/login` | Page | `app/(event)/event-host/event/login/page.tsx` |
| `/event/profile/[id]` | Detail | `app/(event)/event-host/event/profile/[id]/page.tsx` |
| `/event/SignUp` | Page | `app/(event)/event-host/event/SignUp/page.tsx` |
