# Partner Portal (`partner.niwasi.in`)

The portal for partner organisations (NGOs, vendors, programme teams) and their field staff. It
covers surveys, campaigns, facility work, order placement and reports.

- **Code:** `apps/frontend/app/(partner)/partner/`
- **URLs:** `proxy.ts` rewrites `partner.niwasi.in/<path>` onto the internal `/partner/<path>`.
  The browser keeps showing `partner.niwasi.in/<path>`. **The URLs below are what the user sees.**
  To find the file, prepend `app/(partner)/partner/`.
- **Every page** is listed, with its count, in [All pages](#all-pages) at the end.

Most features use the same list / `new` / `[id]` / `[id]/edit` pattern, so the sections below describe
each feature once. The table at the end lists every page.

## How a partner user moves through the portal

1. They log in at `/login`.
2. If they belong to more than one organisation, `/select` asks which one. They can save a default
   so they skip this next time.
3. They land in that organisation's area, `/{slug}/...`, where `{slug}` is the organisation's URL
   name. Their designation decides where:
   - organisation admin → `/{slug}/admin`
   - staff → `/{slug}/staff`
   - facility staff → `/{slug}/facility`
   - a newly signed-up, not-yet-approved user → `/{slug}`, a "waiting for approval" page

## 1. Public site — `(site)/`

| URL | Page |
|---|---|
| `/` | Partner home / landing page |
| `/about`, `/contact` | About and contact |
| `/signup` | Register a partner account |
| `/login` | Partner login |
| `/forgot-password`, `/reset-password` | Password recovery |

## 2. Account (any logged-in partner user) — `(dash)/`

| URL | Page |
|---|---|
| `/select` | Choose which organisation to work in |
| `/account/profile` | The user's own profile |
| `/account/change-password` | Change password |
| `/{slug}` | "Waiting for approval" page for pending users |

## 3. Organisation admin — `/{slug}/admin/...`

| URL | Page |
|---|---|
| `/{slug}/admin` | Dashboard: staff head-count by designation, pending work requests |
| `/admin/users` | The organisation's staff accounts |
| `/admin/designations` | Staff designations |
| `/admin/projects`, `/admin/shared-projects` | The organisation's projects, and projects shared with it |
| `/admin/communities`, `/admin/wards` | Communities and wards the organisation works in |
| `/admin/work-requests` | Work requests sent to the organisation by communities |
| `/admin/masters/activity-category` | Activity categories |
| `/admin/profile` | Organisation profile |

## 4. Staff portal — `/{slug}/staff/...`

The day-to-day work area for field staff.

| Feature | URL | What it is |
|---|---|---|
| Dashboard | `/staff` | Welcome and staff counts |
| Team | `/staff/team`, `/team/[id]`, `/team/[id]/profile` | Colleagues and their profiles |
| Activity | `/staff/activity-summary` | Summary of staff activity |
| Set location | `/staff/set-location` | Pick the working ward (state → district → city/block → zone → ward). Surveys use it. |
| Communities | `/staff/community`, `/staff/community-info` | Communities the staff member serves |

### Surveys — `/staff/surveys/...`

| URL | Page |
|---|---|
| `/surveys/families` | Family survey, including its family members |
| `/surveys/businesses` | Business survey |
| `/surveys/land-mass` | Building / land survey (building, apartment, open field, unused, stall) |
| `/surveys/weighing-forms` | Weighing forms and their observations |
| `/staff/surveyor-mohallas` | Which surveyor covers which mohalla (neighbourhood) |

### Contacts and campaigns

| Feature | URL | What it is |
|---|---|---|
| Contacts | `/staff/contacts/persons`, `/organisations` | People and organisations the staff member deals with |
| | `/contacts/interaction`, `/assigned-interaction`, `/today` | Logged interactions, assigned follow-ups, today's list |
| | `/contacts/import-export`, `/contacts/sync` | CSV import/export. Pull resident profiles in as contacts. |
| IEC campaigns | `/staff/iec-campaigns/[type]` | Awareness campaigns (Information, Education & Communication), one page per target type |
| | `/staff/iec-campaigns/banner` | Banner campaigns |

### Facilities

| URL | Page |
|---|---|
| `/staff/facilities` | Facilities (centres, units) the organisation runs |
| `/staff/facility-assignments`, `/staff/facility-communities/[facilityId]` | Assign facilities to communities |
| `/staff/batches` | Training batches: candidates and teachers |
| `/{slug}/facility` | Facility staff dashboard: counts and quick links |

### Order placement — `/staff/order-placement/...`

Placing and tracking service orders for customers, such as home sample collection.

| URL | Page |
|---|---|
| `/order-placement/dashboard` | Order stats for this staff member |
| `/order-placement/place-order` | Place a new order |
| `/order-placement/order`, `/order/[group]/[id]` | Order list and order detail/edit |
| `/order-placement/customer`, `/customer/[id]` | Customers |
| `/order-placement/master/group`, `/category`, `/item` | Catalogue setup: item groups, categories, items and rates |

### Reports — `/staff/reports/...`

| URL | Page |
|---|---|
| `/reports/campaigner` | Campaigner report |
| `/reports/proposed-campaigner`, `/proposed-followup`, `/proposed-ns`, `/proposed-swachhata` | Proposed-activity reports (follow-up, NS, Swachhata/cleanliness) |
| `/reports/cpc/[masterReport]` | Jan Jagran CPC meeting reports, under a master report |
| `/reports/global` | Global report |
| `/reports/my-panchayat` | "My Panchayat My Thought" feedback report |
| `/staff/ham-niwasi-daily-report` | Ham Niwasi daily report |

### Other staff pages

| URL | Page |
|---|---|
| `/staff/service-requests` | Affiliator service requests |
| `/staff/work-requests` | Work requests from communities |
| `/staff/location/urban/locality`, `/mohalla` | Add localities and mohallas |
| `/staff/master/nala` | Drain (nala) master: public assets that produce garbage |
| `/staff/event-master` | Event types |

## 5. Programme areas

These areas are for partners running a specific programme.

| Area | URL | What it is |
|---|---|---|
| Pratham | `/{slug}/pratham/...` | Pratham programme: CLFs, VOs, CMs, CIMs, CIM-CLF links (the programme's field structure, from federations down to village organisations and field workers), role assignment, import/export, and three programme reports (`/reports/report1`–`report3`) |
| Samajik Udyami | `/{slug}/samajik-udyami/...` | Social-entrepreneur programme: volunteers and daily reports |

## 6. Events (managed by the partner) — `/{slug}/[pctype]/events/...`

The partner creates events, assigns people, uploads media and writes reports. `[pctype]` says who
owns the event: `1` community, `2` partner, `3` sub-group. There's a dashboard at
`/{slug}/[pctype]/event_module/dashboard`. The public side of each event is on the
[Event Portal](event-portal.md).

## 7. Partner system admin — `/system-admin/...`

The platform System Admin's partner-side tools.

| URL | Page |
|---|---|
| `/system-admin` | Dashboard |
| `/system-admin/partners` (+ create, [id], edit) | All partner organisations |
| `/system-admin/partner-heads` | Partner admin accounts |
| `/system-admin/masters/category-of-entity`, `/report-category` | Partner lookup lists |

## All pages

The complete list: one row per `page.tsx` in `apps/frontend/app/`. The sections above explain what each feature is; this table makes sure every page is listed. Keep it in sync by hand (see the docs rule in `AGENTS.md`).

207 pages. **URL** is what the user sees. **Kind** comes from the URL: Create = `new`/`create`/`add`, Edit = `edit`, Detail = ends in a `[param]`.

| URL | Kind | File |
|---|---|---|
| `/` | Page | `app/(partner)/partner/(site)/page.tsx` |
| `/[slug]` | Detail | `app/(partner)/partner/(dash)/[slug]/page.tsx` |
| `/[slug]/[pctype]/event_module/dashboard` | Page | `app/(partner)/partner/(dash)/[slug]/[pctype]/event_module/dashboard/page.tsx` |
| `/[slug]/[pctype]/events` | Page | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/page.tsx` |
| `/[slug]/[pctype]/events/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/page.tsx` |
| `/[slug]/[pctype]/events/[id]/assign` | Page | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/assign/page.tsx` |
| `/[slug]/[pctype]/events/[id]/assign/[assignId]` | Detail | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/assign/[assignId]/page.tsx` |
| `/[slug]/[pctype]/events/[id]/assign/[assignId]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/assign/[assignId]/edit/page.tsx` |
| `/[slug]/[pctype]/events/[id]/assign/create` | Create | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/assign/create/page.tsx` |
| `/[slug]/[pctype]/events/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/edit/page.tsx` |
| `/[slug]/[pctype]/events/[id]/media` | Page | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/media/page.tsx` |
| `/[slug]/[pctype]/events/[id]/report` | Page | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/report/page.tsx` |
| `/[slug]/[pctype]/events/[id]/report/[reportId]` | Detail | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/report/[reportId]/page.tsx` |
| `/[slug]/[pctype]/events/[id]/report/[reportId]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/report/[reportId]/edit/page.tsx` |
| `/[slug]/[pctype]/events/[id]/report/new` | Create | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/[id]/report/new/page.tsx` |
| `/[slug]/[pctype]/events/create` | Create | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/create/page.tsx` |
| `/[slug]/[pctype]/events/latest` | Page | `app/(partner)/partner/(dash)/[slug]/[pctype]/events/latest/page.tsx` |
| `/[slug]/admin` | Page | `app/(partner)/partner/(dash)/[slug]/admin/page.tsx` |
| `/[slug]/admin/communities` | Page | `app/(partner)/partner/(dash)/[slug]/admin/communities/page.tsx` |
| `/[slug]/admin/designations` | Page | `app/(partner)/partner/(dash)/[slug]/admin/designations/page.tsx` |
| `/[slug]/admin/masters/activity-category` | Page | `app/(partner)/partner/(dash)/[slug]/admin/masters/activity-category/page.tsx` |
| `/[slug]/admin/profile` | Page | `app/(partner)/partner/(dash)/[slug]/admin/profile/page.tsx` |
| `/[slug]/admin/projects` | Page | `app/(partner)/partner/(dash)/[slug]/admin/projects/page.tsx` |
| `/[slug]/admin/shared-projects` | Page | `app/(partner)/partner/(dash)/[slug]/admin/shared-projects/page.tsx` |
| `/[slug]/admin/users` | Page | `app/(partner)/partner/(dash)/[slug]/admin/users/page.tsx` |
| `/[slug]/admin/wards` | Page | `app/(partner)/partner/(dash)/[slug]/admin/wards/page.tsx` |
| `/[slug]/admin/work-requests` | Page | `app/(partner)/partner/(dash)/[slug]/admin/work-requests/page.tsx` |
| `/[slug]/admin/work-requests/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/admin/work-requests/[id]/page.tsx` |
| `/[slug]/facility` | Page | `app/(partner)/partner/(dash)/[slug]/facility/page.tsx` |
| `/[slug]/pratham` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/page.tsx` |
| `/[slug]/pratham/assign-role` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/assign-role/page.tsx` |
| `/[slug]/pratham/cim-clfs` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/cim-clfs/page.tsx` |
| `/[slug]/pratham/cim-clfs/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/cim-clfs/[id]/edit/page.tsx` |
| `/[slug]/pratham/cim-clfs/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/cim-clfs/new/page.tsx` |
| `/[slug]/pratham/cims` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/cims/page.tsx` |
| `/[slug]/pratham/cims/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/cims/[id]/page.tsx` |
| `/[slug]/pratham/cims/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/cims/[id]/edit/page.tsx` |
| `/[slug]/pratham/clfs` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/clfs/page.tsx` |
| `/[slug]/pratham/clfs/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/clfs/[id]/page.tsx` |
| `/[slug]/pratham/clfs/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/clfs/[id]/edit/page.tsx` |
| `/[slug]/pratham/clfs/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/clfs/new/page.tsx` |
| `/[slug]/pratham/cm-vos` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/cm-vos/page.tsx` |
| `/[slug]/pratham/cm-vos/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/cm-vos/[id]/page.tsx` |
| `/[slug]/pratham/cm-vos/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/cm-vos/[id]/edit/page.tsx` |
| `/[slug]/pratham/cm-vos/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/cm-vos/new/page.tsx` |
| `/[slug]/pratham/cms` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/cms/page.tsx` |
| `/[slug]/pratham/cms/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/cms/[id]/page.tsx` |
| `/[slug]/pratham/cms/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/cms/[id]/edit/page.tsx` |
| `/[slug]/pratham/import-export` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/import-export/page.tsx` |
| `/[slug]/pratham/reports/report1` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report1/page.tsx` |
| `/[slug]/pratham/reports/report1/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report1/[id]/page.tsx` |
| `/[slug]/pratham/reports/report1/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report1/[id]/edit/page.tsx` |
| `/[slug]/pratham/reports/report1/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report1/new/page.tsx` |
| `/[slug]/pratham/reports/report2` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report2/page.tsx` |
| `/[slug]/pratham/reports/report2/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report2/[id]/page.tsx` |
| `/[slug]/pratham/reports/report2/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report2/new/page.tsx` |
| `/[slug]/pratham/reports/report2/r2q1/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report2/r2q1/[id]/edit/page.tsx` |
| `/[slug]/pratham/reports/report3` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report3/page.tsx` |
| `/[slug]/pratham/reports/report3/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report3/[id]/page.tsx` |
| `/[slug]/pratham/reports/report3/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report3/[id]/edit/page.tsx` |
| `/[slug]/pratham/reports/report3/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/reports/report3/new/page.tsx` |
| `/[slug]/pratham/vos` | Page | `app/(partner)/partner/(dash)/[slug]/pratham/vos/page.tsx` |
| `/[slug]/pratham/vos/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/pratham/vos/[id]/page.tsx` |
| `/[slug]/pratham/vos/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/pratham/vos/[id]/edit/page.tsx` |
| `/[slug]/pratham/vos/new` | Create | `app/(partner)/partner/(dash)/[slug]/pratham/vos/new/page.tsx` |
| `/[slug]/samajik-udyami` | Page | `app/(partner)/partner/(dash)/[slug]/samajik-udyami/page.tsx` |
| `/[slug]/samajik-udyami/daily-report` | Page | `app/(partner)/partner/(dash)/[slug]/samajik-udyami/daily-report/page.tsx` |
| `/[slug]/samajik-udyami/daily-report/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/samajik-udyami/daily-report/[id]/page.tsx` |
| `/[slug]/samajik-udyami/daily-report/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/samajik-udyami/daily-report/[id]/edit/page.tsx` |
| `/[slug]/samajik-udyami/daily-report/new` | Create | `app/(partner)/partner/(dash)/[slug]/samajik-udyami/daily-report/new/page.tsx` |
| `/[slug]/staff` | Page | `app/(partner)/partner/(dash)/[slug]/staff/page.tsx` |
| `/[slug]/staff/activity-summary` | Page | `app/(partner)/partner/(dash)/[slug]/staff/activity-summary/page.tsx` |
| `/[slug]/staff/batches` | Page | `app/(partner)/partner/(dash)/[slug]/staff/batches/page.tsx` |
| `/[slug]/staff/batches/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/batches/[id]/page.tsx` |
| `/[slug]/staff/batches/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/batches/[id]/edit/page.tsx` |
| `/[slug]/staff/batches/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/batches/new/page.tsx` |
| `/[slug]/staff/community` | Page | `app/(partner)/partner/(dash)/[slug]/staff/community/page.tsx` |
| `/[slug]/staff/community-info` | Page | `app/(partner)/partner/(dash)/[slug]/staff/community-info/page.tsx` |
| `/[slug]/staff/contacts/assigned-interaction` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/assigned-interaction/page.tsx` |
| `/[slug]/staff/contacts/import-export` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/import-export/page.tsx` |
| `/[slug]/staff/contacts/interaction` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/interaction/page.tsx` |
| `/[slug]/staff/contacts/interaction/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/contacts/interaction/[id]/page.tsx` |
| `/[slug]/staff/contacts/interaction/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/contacts/interaction/[id]/edit/page.tsx` |
| `/[slug]/staff/contacts/interaction/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/contacts/interaction/new/page.tsx` |
| `/[slug]/staff/contacts/organisations` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/organisations/page.tsx` |
| `/[slug]/staff/contacts/organisations/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/contacts/organisations/[id]/page.tsx` |
| `/[slug]/staff/contacts/organisations/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/contacts/organisations/[id]/edit/page.tsx` |
| `/[slug]/staff/contacts/organisations/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/contacts/organisations/new/page.tsx` |
| `/[slug]/staff/contacts/persons` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/persons/page.tsx` |
| `/[slug]/staff/contacts/persons/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/contacts/persons/[id]/page.tsx` |
| `/[slug]/staff/contacts/persons/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/contacts/persons/[id]/edit/page.tsx` |
| `/[slug]/staff/contacts/persons/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/contacts/persons/new/page.tsx` |
| `/[slug]/staff/contacts/sync` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/sync/page.tsx` |
| `/[slug]/staff/contacts/today` | Page | `app/(partner)/partner/(dash)/[slug]/staff/contacts/today/page.tsx` |
| `/[slug]/staff/event-master` | Page | `app/(partner)/partner/(dash)/[slug]/staff/event-master/page.tsx` |
| `/[slug]/staff/facilities` | Page | `app/(partner)/partner/(dash)/[slug]/staff/facilities/page.tsx` |
| `/[slug]/staff/facilities/[idOrSlug]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/facilities/[idOrSlug]/page.tsx` |
| `/[slug]/staff/facilities/[idOrSlug]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/facilities/[idOrSlug]/edit/page.tsx` |
| `/[slug]/staff/facilities/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/facilities/new/page.tsx` |
| `/[slug]/staff/facility-assignments` | Page | `app/(partner)/partner/(dash)/[slug]/staff/facility-assignments/page.tsx` |
| `/[slug]/staff/facility-assignments/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/facility-assignments/new/page.tsx` |
| `/[slug]/staff/facility-communities/[facilityId]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/facility-communities/[facilityId]/page.tsx` |
| `/[slug]/staff/ham-niwasi-daily-report` | Page | `app/(partner)/partner/(dash)/[slug]/staff/ham-niwasi-daily-report/page.tsx` |
| `/[slug]/staff/ham-niwasi-daily-report/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/ham-niwasi-daily-report/[id]/page.tsx` |
| `/[slug]/staff/ham-niwasi-daily-report/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/ham-niwasi-daily-report/[id]/edit/page.tsx` |
| `/[slug]/staff/ham-niwasi-daily-report/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/ham-niwasi-daily-report/new/page.tsx` |
| `/[slug]/staff/iec-campaigns/[type]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/iec-campaigns/[type]/page.tsx` |
| `/[slug]/staff/iec-campaigns/[type]/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/iec-campaigns/[type]/[id]/edit/page.tsx` |
| `/[slug]/staff/iec-campaigns/[type]/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/iec-campaigns/[type]/new/page.tsx` |
| `/[slug]/staff/iec-campaigns/banner` | Page | `app/(partner)/partner/(dash)/[slug]/staff/iec-campaigns/banner/page.tsx` |
| `/[slug]/staff/iec-campaigns/banner/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/iec-campaigns/banner/[id]/edit/page.tsx` |
| `/[slug]/staff/iec-campaigns/banner/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/iec-campaigns/banner/new/page.tsx` |
| `/[slug]/staff/location/urban/locality` | Page | `app/(partner)/partner/(dash)/[slug]/staff/location/urban/locality/page.tsx` |
| `/[slug]/staff/location/urban/locality/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/location/urban/locality/[id]/edit/page.tsx` |
| `/[slug]/staff/location/urban/locality/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/location/urban/locality/new/page.tsx` |
| `/[slug]/staff/location/urban/mohalla` | Page | `app/(partner)/partner/(dash)/[slug]/staff/location/urban/mohalla/page.tsx` |
| `/[slug]/staff/location/urban/mohalla/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/location/urban/mohalla/[id]/edit/page.tsx` |
| `/[slug]/staff/location/urban/mohalla/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/location/urban/mohalla/new/page.tsx` |
| `/[slug]/staff/master/nala` | Page | `app/(partner)/partner/(dash)/[slug]/staff/master/nala/page.tsx` |
| `/[slug]/staff/master/nala/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/master/nala/[id]/edit/page.tsx` |
| `/[slug]/staff/master/nala/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/master/nala/new/page.tsx` |
| `/[slug]/staff/order-placement/customer` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/customer/page.tsx` |
| `/[slug]/staff/order-placement/customer/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/customer/[id]/page.tsx` |
| `/[slug]/staff/order-placement/dashboard` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/dashboard/page.tsx` |
| `/[slug]/staff/order-placement/master/category` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/master/category/page.tsx` |
| `/[slug]/staff/order-placement/master/group` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/master/group/page.tsx` |
| `/[slug]/staff/order-placement/master/item` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/master/item/page.tsx` |
| `/[slug]/staff/order-placement/order` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/order/page.tsx` |
| `/[slug]/staff/order-placement/order/[group]/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/order/[group]/[id]/page.tsx` |
| `/[slug]/staff/order-placement/place-order` | Page | `app/(partner)/partner/(dash)/[slug]/staff/order-placement/place-order/page.tsx` |
| `/[slug]/staff/reports/campaigner` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/campaigner/page.tsx` |
| `/[slug]/staff/reports/campaigner/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/campaigner/[id]/page.tsx` |
| `/[slug]/staff/reports/campaigner/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/reports/campaigner/[id]/edit/page.tsx` |
| `/[slug]/staff/reports/campaigner/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/campaigner/new/page.tsx` |
| `/[slug]/staff/reports/cpc/[masterReport]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/cpc/[masterReport]/page.tsx` |
| `/[slug]/staff/reports/cpc/[masterReport]/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/cpc/[masterReport]/[id]/page.tsx` |
| `/[slug]/staff/reports/cpc/[masterReport]/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/reports/cpc/[masterReport]/[id]/edit/page.tsx` |
| `/[slug]/staff/reports/cpc/[masterReport]/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/cpc/[masterReport]/new/page.tsx` |
| `/[slug]/staff/reports/global` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/global/page.tsx` |
| `/[slug]/staff/reports/global/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/global/[id]/page.tsx` |
| `/[slug]/staff/reports/global/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/reports/global/[id]/edit/page.tsx` |
| `/[slug]/staff/reports/global/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/global/new/page.tsx` |
| `/[slug]/staff/reports/my-panchayat` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/my-panchayat/page.tsx` |
| `/[slug]/staff/reports/my-panchayat/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/my-panchayat/new/page.tsx` |
| `/[slug]/staff/reports/proposed-campaigner` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-campaigner/page.tsx` |
| `/[slug]/staff/reports/proposed-campaigner/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-campaigner/[id]/page.tsx` |
| `/[slug]/staff/reports/proposed-campaigner/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-campaigner/new/page.tsx` |
| `/[slug]/staff/reports/proposed-followup` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-followup/page.tsx` |
| `/[slug]/staff/reports/proposed-followup/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-followup/[id]/page.tsx` |
| `/[slug]/staff/reports/proposed-followup/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-followup/[id]/edit/page.tsx` |
| `/[slug]/staff/reports/proposed-followup/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-followup/new/page.tsx` |
| `/[slug]/staff/reports/proposed-ns` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-ns/page.tsx` |
| `/[slug]/staff/reports/proposed-ns/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-ns/[id]/page.tsx` |
| `/[slug]/staff/reports/proposed-ns/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-ns/[id]/edit/page.tsx` |
| `/[slug]/staff/reports/proposed-ns/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-ns/new/page.tsx` |
| `/[slug]/staff/reports/proposed-swachhata` | Page | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-swachhata/page.tsx` |
| `/[slug]/staff/reports/proposed-swachhata/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-swachhata/[id]/page.tsx` |
| `/[slug]/staff/reports/proposed-swachhata/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-swachhata/[id]/edit/page.tsx` |
| `/[slug]/staff/reports/proposed-swachhata/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/reports/proposed-swachhata/new/page.tsx` |
| `/[slug]/staff/service-requests` | Page | `app/(partner)/partner/(dash)/[slug]/staff/service-requests/page.tsx` |
| `/[slug]/staff/service-requests/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/service-requests/[id]/page.tsx` |
| `/[slug]/staff/service-requests/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/service-requests/new/page.tsx` |
| `/[slug]/staff/set-location` | Page | `app/(partner)/partner/(dash)/[slug]/staff/set-location/page.tsx` |
| `/[slug]/staff/surveyor-mohallas` | Page | `app/(partner)/partner/(dash)/[slug]/staff/surveyor-mohallas/page.tsx` |
| `/[slug]/staff/surveyor-mohallas/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveyor-mohallas/[id]/edit/page.tsx` |
| `/[slug]/staff/surveyor-mohallas/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveyor-mohallas/new/page.tsx` |
| `/[slug]/staff/surveys/businesses` | Page | `app/(partner)/partner/(dash)/[slug]/staff/surveys/businesses/page.tsx` |
| `/[slug]/staff/surveys/businesses/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveys/businesses/[id]/edit/page.tsx` |
| `/[slug]/staff/surveys/businesses/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveys/businesses/new/page.tsx` |
| `/[slug]/staff/surveys/families` | Page | `app/(partner)/partner/(dash)/[slug]/staff/surveys/families/page.tsx` |
| `/[slug]/staff/surveys/families/[familyId]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/surveys/families/[familyId]/page.tsx` |
| `/[slug]/staff/surveys/families/[familyId]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveys/families/[familyId]/edit/page.tsx` |
| `/[slug]/staff/surveys/families/[familyId]/members/[memberId]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveys/families/[familyId]/members/[memberId]/edit/page.tsx` |
| `/[slug]/staff/surveys/families/[familyId]/members/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveys/families/[familyId]/members/new/page.tsx` |
| `/[slug]/staff/surveys/families/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveys/families/new/page.tsx` |
| `/[slug]/staff/surveys/land-mass` | Page | `app/(partner)/partner/(dash)/[slug]/staff/surveys/land-mass/page.tsx` |
| `/[slug]/staff/surveys/land-mass/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveys/land-mass/[id]/edit/page.tsx` |
| `/[slug]/staff/surveys/land-mass/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveys/land-mass/new/page.tsx` |
| `/[slug]/staff/surveys/weighing-forms` | Page | `app/(partner)/partner/(dash)/[slug]/staff/surveys/weighing-forms/page.tsx` |
| `/[slug]/staff/surveys/weighing-forms/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/surveys/weighing-forms/[id]/page.tsx` |
| `/[slug]/staff/surveys/weighing-forms/[id]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveys/weighing-forms/[id]/edit/page.tsx` |
| `/[slug]/staff/surveys/weighing-forms/[id]/observations/[obsId]/edit` | Edit | `app/(partner)/partner/(dash)/[slug]/staff/surveys/weighing-forms/[id]/observations/[obsId]/edit/page.tsx` |
| `/[slug]/staff/surveys/weighing-forms/[id]/observations/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveys/weighing-forms/[id]/observations/new/page.tsx` |
| `/[slug]/staff/surveys/weighing-forms/new` | Create | `app/(partner)/partner/(dash)/[slug]/staff/surveys/weighing-forms/new/page.tsx` |
| `/[slug]/staff/team` | Page | `app/(partner)/partner/(dash)/[slug]/staff/team/page.tsx` |
| `/[slug]/staff/team/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/team/[id]/page.tsx` |
| `/[slug]/staff/team/[id]/profile` | Page | `app/(partner)/partner/(dash)/[slug]/staff/team/[id]/profile/page.tsx` |
| `/[slug]/staff/team/[id]/profile/edit/[profileId]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/team/[id]/profile/edit/[profileId]/page.tsx` |
| `/[slug]/staff/work-requests` | Page | `app/(partner)/partner/(dash)/[slug]/staff/work-requests/page.tsx` |
| `/[slug]/staff/work-requests/[id]` | Detail | `app/(partner)/partner/(dash)/[slug]/staff/work-requests/[id]/page.tsx` |
| `/about` | Page | `app/(partner)/partner/(site)/about/page.tsx` |
| `/account/change-password` | Page | `app/(partner)/partner/(dash)/account/change-password/page.tsx` |
| `/account/profile` | Page | `app/(partner)/partner/(dash)/account/profile/page.tsx` |
| `/contact` | Page | `app/(partner)/partner/(site)/contact/page.tsx` |
| `/forgot-password` | Page | `app/(partner)/partner/(site)/forgot-password/page.tsx` |
| `/login` | Page | `app/(partner)/partner/(site)/login/page.tsx` |
| `/reset-password` | Page | `app/(partner)/partner/(site)/reset-password/page.tsx` |
| `/select` | Page | `app/(partner)/partner/(dash)/select/page.tsx` |
| `/signup` | Page | `app/(partner)/partner/(site)/signup/page.tsx` |
| `/system-admin` | Page | `app/(partner)/partner/(dash)/system-admin/page.tsx` |
| `/system-admin/masters/category-of-entity` | Page | `app/(partner)/partner/(dash)/system-admin/masters/category-of-entity/page.tsx` |
| `/system-admin/masters/report-category` | Page | `app/(partner)/partner/(dash)/system-admin/masters/report-category/page.tsx` |
| `/system-admin/partner-heads` | Page | `app/(partner)/partner/(dash)/system-admin/partner-heads/page.tsx` |
| `/system-admin/partners` | Page | `app/(partner)/partner/(dash)/system-admin/partners/page.tsx` |
| `/system-admin/partners/[id]` | Detail | `app/(partner)/partner/(dash)/system-admin/partners/[id]/page.tsx` |
| `/system-admin/partners/[id]/edit` | Edit | `app/(partner)/partner/(dash)/system-admin/partners/[id]/edit/page.tsx` |
| `/system-admin/partners/create` | Create | `app/(partner)/partner/(dash)/system-admin/partners/create/page.tsx` |
