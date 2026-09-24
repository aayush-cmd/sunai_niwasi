# Niwasi Portal (`niwasi.in`)

The main portal, for residents, community committees and the platform's system admin.

- **Code:** `apps/frontend/app/(niwasi)/`
- **URLs:** served as-is, with no rewrite. The folder path is the URL. Folders in brackets such as
  `(public)` are route groups and don't appear in the URL.
- **Every page** is listed, with its count, in [All pages](#all-pages) at the end.

Most features follow the same page pattern, so the sections below describe each feature once (the table at the end lists every page):

| URL ends in | Page |
|---|---|
| `/thing` | List |
| `/thing/new` or `/thing/create` or `/thing/add` | Create form |
| `/thing/[id]` | Detail view |
| `/thing/[id]/edit` | Edit form |

## 1. Public pages — `app/(niwasi)/(public)/`

No login needed.

| URL | Page |
|---|---|
| `/` | Home / landing page |
| `/aboutUs` | About Niwasi |
| `/contact` | Contact form |
| `/modules` | Overview of the platform's modules |
| `/uses` | "Uses & Users": who Niwasi is for |
| `/sabha` | Explains how a Niwasi Sabha (community meeting) works |
| `/niwasi-video` | Intro video |
| `/mitram-rasoi` | Mitram Rasoi: a standalone, static Hindi page for the restaurant. It has no Niwasi header or footer (`PublicChrome` skips them on this path). It's reached from the Mitram Rasoi card in the home page's **Extensions** section, which opens it in a new tab. It isn't in the main nav. |
| `/login` | Resident login |
| `/forgot-password`, `/reset-password` | Password recovery |

### Joining a community — `/join`

| URL | Page |
|---|---|
| `/join` | Pick how to join. Option A, joining by community code, is on this page. |
| `/join/select` | Option B: search for and select an existing community |
| `/join/create` | Option C: create a new community |
| `/join/enlist-locality`, `/join/enlist-sub-locality` | Add a missing locality or sub-locality while creating one |
| `/join/global` | Option D: join the global community |

## 2. Community area — `/community/[slug]/...`

Everything a logged-in resident does inside one community. `[slug]` is the community's URL name.
What each person can see depends on their role in that community (Community Admin, Secretary,
member, etc.).

| Feature | URL | What it is |
|---|---|---|
| Dashboard | `/community/[slug]` | Welcome banner, stat cards, quick actions |
| My Community | `/my-community` | Read-only view of the user's community |
| Members | `/members`, `/pending-members`, `/inactive-users` | Member list, join requests awaiting approval, deactivated members |
| Users | `/users`, `/users/add`, `/users/[userId]/edit` | Admin management of community users and roles |
| Designations | `/designations` | Committee posts (Secretary, Treasurer, …) |
| Family | `/family-members`, `/family-child` | A family head's own family members and children |
| Business members | `/business-members` | A business head's own staff |
| Profile | `/profile`, `/profile/education`, `/profile/achievements`, `/change-password` | The user's own profile, shared across all communities |
| Community profile | `/community-profile`, `/summary`, `/gallery` | The community's public profile and photo gallery |
| Announcements | `/announcements` (+ new / [id] / edit) | Notice board |
| Notifications | `/notifications`, `/notifications/[id]` | The user's notifications |
| Contacts | `/contacts`, `/contacts/persons` | Community contact directory |

### Sabha (community meetings) — `/community/[slug]/sabha/...`

| URL | Page |
|---|---|
| `/sabha` | List of meetings |
| `/sabha/create`, `/sabha/[id]`, `/sabha/[id]/edit` | Schedule, view or edit a meeting |
| `/sabha/agenda` | Agenda items for meetings |
| `/sabha/proposal` | Proposals raised by members |
| `/sabha/decision` | Decisions recorded at meetings |
| `/sabha/attendance` | Meeting attendance |
| `/sabha/urgent` | Urgent (unscheduled) meetings |

### Sub-groups — `/community/[slug]/sub-groups/...`

Smaller groups inside a community, such as a self-help group (SHG) or a committee. Each sub-group
has its own copy of the main community features:

| URL (under `/sub-groups/[id]`) | Page |
|---|---|
| `/sub-groups`, `/sub-groups/create` | List and create sub-groups |
| `/[id]`, `/[id]/edit` | Sub-group details |
| `/members`, `/committee-users`, `/inactive-committee-users` | Members and committee |
| `/access` | What the sub-group is allowed to use |
| `/announcements`, `/announcement-category` | The sub-group's notice board |
| `/contacts`, `/contacts/persons` | The sub-group's contacts |
| `/sabha/...` | The sub-group's meetings (same pages as the community Sabha) |
| `/meeting-venue`, `/event-master`, `/populate` | Venues, event types, bulk data |

### Property and money

| Feature | URL | What it is |
|---|---|---|
| Property | `/property`, `/property/create`, `/property/[id]`, `/property-owners` | Houses/plots in the community and their owners |
| Society fee | `/society-fee` | Maintenance-fee billing |
| | `/society-fee/new`, `/bills`, `/dues` | Create bills, bill list, outstanding dues |
| | `/society-fee/properties/[propertyId]/...` | Per property: current bill, generated bills, paid bills, pay, summary |
| | `/received-payments`, `/transaction-details`, `/payment-confirmation`, `/receipt/[paymentId]` | Payments and receipts |
| Payment | `/payment`, `/payment/add`, `/payment/methods`, `/payment/tariff-rates`, `/payment/details/[id]` | Payment records, accepted methods, tariff rates |

### Services and work

| Feature | URL | What it is |
|---|---|---|
| Work requests | `/work-requests`, `/work-requests/raise`, `/work-requests/[id]` | Raise and track work requests (repairs, civic issues) |
| Service providers | `/service-providers`, `/service-providers/register` | Local service providers |
| Service needs | `/community-service-needs` | Services the community has said it needs |
| Service access | `/service-access` | Let partner organisations serve this community |

### Help (inside a community) — `/community/[slug]/help/...`

Welfare support between residents and communities.

| URL | Page |
|---|---|
| `/help/needies` | People in need (list, add, view, edit) |
| `/help/request/self`, `/help/request/recommend` | Ask for help for yourself, or recommend someone |
| `/help/requests`, `/help/requests/recommended` | Help requests, and ones you recommended |
| `/help/donate`, `/help/donations`, `/help/donations/other-communities` | Make and view donations |
| `/help/my-help`, `/help/offered-to-me`, `/help/helping-persons` | The user's own help activity |

### Community data and setup

| Feature | URL | What it is |
|---|---|---|
| Information | `/information/panchayat`, `/village`, `/ward` | Local-government information |
| Panchayat data | `/panchayat-data/[leaf]` | One page for 6 data types: animal, plant, scheme, facility, service, work place |
| Structures | `/structures/[category]`, `/structures/all-entities` | Buildings and facilities in the area, by category |
| Masters | `/masters/[catalog]` | One page for 8 community lookup lists (person, meeting venue, animal, facility, plant, scheme, service, work place) |
| Populate | `/populate`, `/populate/csv`, `/populate/dummy` | Bulk-load data from CSV, or create dummy data |
| Event master | `/event-master` | Event types |

### Events (managed by the community)

`/community/[slug]/events/...`, with a dashboard at `/community/[slug]/event_module/dashboard`.
The community creates events here, then assigns people, uploads media and writes reports. The
public side of each event is on the [Event Portal](event-portal.md).

## 3. Public help section — `/help`

A path on the main site, not its own domain. No login needed to browse.

| URL | Page |
|---|---|
| `/help` | Browse people who need help, across public communities |
| `/help/needy/[id]` | One needy person. Only safe fields are shown; no ID number, phone or date of birth. |
| `/help/child-report` | Child reading/maths report ("coming soon" placeholder) |

## 4. System admin — `/system-admin/...`

Platform-wide administration. Only the System Admin can open it.

| Feature | URL | What it is |
|---|---|---|
| Dashboard | `/system-admin` | Admin home |
| Communities | `/communities` (+ create, [id], edit), `/communities/create-by-ward`, `/create-by-zone` | Manage all communities. Bulk-create by ward or zone. |
| Users | `/users` | All platform users |
| Locations | `/location/countries`, `/states`, `/districts` | Location hierarchy, top levels |
| | `/location/urban/cities`, `/city-zones`, `/wards`, `/localities`, `/sub-localities` | Urban hierarchy |
| | `/location/rural/blocks`, `/gram-panchayats`, `/wards`, `/village-habitations`, `/tolas` | Rural hierarchy |
| | `/location/enlist` | Review localities added by users |
| Masters | `/masters/[group]/[master]` | One page for all 42 platform lookup lists |
| Access | `/menu-access`, `/service-access` | Partner permission grants, and partner service offers awaiting accept/reject |
| Populate | `/populate/family-head-member`, `/make-user-family-head`, `/subgroup-shg` | Bulk data fixes |
| Upload / download | `/upload-download/language` (+ add, import-export), `/ward`, `/village`, `/tola`, `/city-zone-panchayat`, `/data-export` | CSV import/export of translations and locations, data export |
| Help admin | `/help`, `/help/mails` | Manage the help section and its emails |
| Contact us | `/contact-us-list` | Messages sent from the public contact form |

## All pages

The complete list: one row per `page.tsx` in `apps/frontend/app/`. The sections above explain what each feature is; this table makes sure every page is listed. Keep it in sync by hand (see the docs rule in `AGENTS.md`).

212 pages. **URL** is what the user sees. **Kind** comes from the URL: Create = `new`/`create`/`add`, Edit = `edit`, Detail = ends in a `[param]`.

| URL | Kind | File |
|---|---|---|
| `/` | Page | `app/(niwasi)/(public)/page.tsx` |
| `/aboutUs` | Page | `app/(niwasi)/(public)/aboutUs/page.tsx` |
| `/community/[slug]` | Detail | `app/(niwasi)/community/[slug]/page.tsx` |
| `/community/[slug]/announcements` | Page | `app/(niwasi)/community/[slug]/announcements/page.tsx` |
| `/community/[slug]/announcements/[id]` | Detail | `app/(niwasi)/community/[slug]/announcements/[id]/page.tsx` |
| `/community/[slug]/announcements/[id]/edit` | Edit | `app/(niwasi)/community/[slug]/announcements/[id]/edit/page.tsx` |
| `/community/[slug]/announcements/new` | Create | `app/(niwasi)/community/[slug]/announcements/new/page.tsx` |
| `/community/[slug]/business-members` | Page | `app/(niwasi)/community/[slug]/business-members/page.tsx` |
| `/community/[slug]/change-password` | Page | `app/(niwasi)/community/[slug]/change-password/page.tsx` |
| `/community/[slug]/community-profile` | Page | `app/(niwasi)/community/[slug]/community-profile/page.tsx` |
| `/community/[slug]/community-profile/gallery` | Page | `app/(niwasi)/community/[slug]/community-profile/gallery/page.tsx` |
| `/community/[slug]/community-profile/summary` | Page | `app/(niwasi)/community/[slug]/community-profile/summary/page.tsx` |
| `/community/[slug]/community-service-needs` | Page | `app/(niwasi)/community/[slug]/community-service-needs/page.tsx` |
| `/community/[slug]/contacts` | Page | `app/(niwasi)/community/[slug]/contacts/page.tsx` |
| `/community/[slug]/contacts/persons` | Page | `app/(niwasi)/community/[slug]/contacts/persons/page.tsx` |
| `/community/[slug]/designations` | Page | `app/(niwasi)/community/[slug]/designations/page.tsx` |
| `/community/[slug]/event_module/dashboard` | Page | `app/(niwasi)/community/(event)/[slug]/event_module/dashboard/page.tsx` |
| `/community/[slug]/event-master` | Page | `app/(niwasi)/community/[slug]/event-master/page.tsx` |
| `/community/[slug]/events` | Page | `app/(niwasi)/community/(event)/[slug]/events/page.tsx` |
| `/community/[slug]/events/[id]` | Detail | `app/(niwasi)/community/(event)/[slug]/events/[id]/page.tsx` |
| `/community/[slug]/events/[id]/assign` | Page | `app/(niwasi)/community/(event)/[slug]/events/[id]/assign/page.tsx` |
| `/community/[slug]/events/[id]/assign/[assignId]` | Detail | `app/(niwasi)/community/(event)/[slug]/events/[id]/assign/[assignId]/page.tsx` |
| `/community/[slug]/events/[id]/assign/[assignId]/edit` | Edit | `app/(niwasi)/community/(event)/[slug]/events/[id]/assign/[assignId]/edit/page.tsx` |
| `/community/[slug]/events/[id]/assign/create` | Create | `app/(niwasi)/community/(event)/[slug]/events/[id]/assign/create/page.tsx` |
| `/community/[slug]/events/[id]/edit` | Edit | `app/(niwasi)/community/(event)/[slug]/events/[id]/edit/page.tsx` |
| `/community/[slug]/events/[id]/media` | Page | `app/(niwasi)/community/(event)/[slug]/events/[id]/media/page.tsx` |
| `/community/[slug]/events/[id]/report` | Page | `app/(niwasi)/community/(event)/[slug]/events/[id]/report/page.tsx` |
| `/community/[slug]/events/[id]/report/[reportId]` | Detail | `app/(niwasi)/community/(event)/[slug]/events/[id]/report/[reportId]/page.tsx` |
| `/community/[slug]/events/[id]/report/[reportId]/edit` | Edit | `app/(niwasi)/community/(event)/[slug]/events/[id]/report/[reportId]/edit/page.tsx` |
| `/community/[slug]/events/[id]/report/new` | Create | `app/(niwasi)/community/(event)/[slug]/events/[id]/report/new/page.tsx` |
| `/community/[slug]/events/create` | Create | `app/(niwasi)/community/(event)/[slug]/events/create/page.tsx` |
| `/community/[slug]/family-child` | Page | `app/(niwasi)/community/[slug]/family-child/page.tsx` |
| `/community/[slug]/family-members` | Page | `app/(niwasi)/community/[slug]/family-members/page.tsx` |
| `/community/[slug]/help/donate` | Page | `app/(niwasi)/community/[slug]/help/donate/page.tsx` |
| `/community/[slug]/help/donations` | Page | `app/(niwasi)/community/[slug]/help/donations/page.tsx` |
| `/community/[slug]/help/donations/[id]` | Detail | `app/(niwasi)/community/[slug]/help/donations/[id]/page.tsx` |
| `/community/[slug]/help/donations/other-communities` | Page | `app/(niwasi)/community/[slug]/help/donations/other-communities/page.tsx` |
| `/community/[slug]/help/helping-persons` | Page | `app/(niwasi)/community/[slug]/help/helping-persons/page.tsx` |
| `/community/[slug]/help/my-help` | Page | `app/(niwasi)/community/[slug]/help/my-help/page.tsx` |
| `/community/[slug]/help/needies` | Page | `app/(niwasi)/community/[slug]/help/needies/page.tsx` |
| `/community/[slug]/help/needies/[id]` | Detail | `app/(niwasi)/community/[slug]/help/needies/[id]/page.tsx` |
| `/community/[slug]/help/needies/[id]/edit` | Edit | `app/(niwasi)/community/[slug]/help/needies/[id]/edit/page.tsx` |
| `/community/[slug]/help/needies/new` | Create | `app/(niwasi)/community/[slug]/help/needies/new/page.tsx` |
| `/community/[slug]/help/offered-to-me` | Page | `app/(niwasi)/community/[slug]/help/offered-to-me/page.tsx` |
| `/community/[slug]/help/request/recommend` | Page | `app/(niwasi)/community/[slug]/help/request/recommend/page.tsx` |
| `/community/[slug]/help/request/self` | Page | `app/(niwasi)/community/[slug]/help/request/self/page.tsx` |
| `/community/[slug]/help/requests` | Page | `app/(niwasi)/community/[slug]/help/requests/page.tsx` |
| `/community/[slug]/help/requests/[id]` | Detail | `app/(niwasi)/community/[slug]/help/requests/[id]/page.tsx` |
| `/community/[slug]/help/requests/[id]/edit` | Edit | `app/(niwasi)/community/[slug]/help/requests/[id]/edit/page.tsx` |
| `/community/[slug]/help/requests/recommended` | Page | `app/(niwasi)/community/[slug]/help/requests/recommended/page.tsx` |
| `/community/[slug]/inactive-users` | Page | `app/(niwasi)/community/[slug]/inactive-users/page.tsx` |
| `/community/[slug]/information/panchayat` | Page | `app/(niwasi)/community/[slug]/information/panchayat/page.tsx` |
| `/community/[slug]/information/village` | Page | `app/(niwasi)/community/[slug]/information/village/page.tsx` |
| `/community/[slug]/information/ward` | Page | `app/(niwasi)/community/[slug]/information/ward/page.tsx` |
| `/community/[slug]/masters/[catalog]` | Detail | `app/(niwasi)/community/[slug]/masters/[catalog]/page.tsx` |
| `/community/[slug]/members` | Page | `app/(niwasi)/community/[slug]/members/page.tsx` |
| `/community/[slug]/my-community` | Page | `app/(niwasi)/community/[slug]/my-community/page.tsx` |
| `/community/[slug]/notifications` | Page | `app/(niwasi)/community/[slug]/notifications/page.tsx` |
| `/community/[slug]/notifications/[id]` | Detail | `app/(niwasi)/community/[slug]/notifications/[id]/page.tsx` |
| `/community/[slug]/panchayat-data/[leaf]` | Detail | `app/(niwasi)/community/[slug]/panchayat-data/[leaf]/page.tsx` |
| `/community/[slug]/payment` | Page | `app/(niwasi)/community/[slug]/payment/page.tsx` |
| `/community/[slug]/payment/add` | Create | `app/(niwasi)/community/[slug]/payment/add/page.tsx` |
| `/community/[slug]/payment/details/[id]` | Detail | `app/(niwasi)/community/[slug]/payment/details/[id]/page.tsx` |
| `/community/[slug]/payment/methods` | Page | `app/(niwasi)/community/[slug]/payment/methods/page.tsx` |
| `/community/[slug]/payment/tariff-rates` | Page | `app/(niwasi)/community/[slug]/payment/tariff-rates/page.tsx` |
| `/community/[slug]/pending-members` | Page | `app/(niwasi)/community/[slug]/pending-members/page.tsx` |
| `/community/[slug]/populate` | Page | `app/(niwasi)/community/[slug]/populate/page.tsx` |
| `/community/[slug]/populate/csv` | Page | `app/(niwasi)/community/[slug]/populate/csv/page.tsx` |
| `/community/[slug]/populate/dummy` | Page | `app/(niwasi)/community/[slug]/populate/dummy/page.tsx` |
| `/community/[slug]/profile` | Page | `app/(niwasi)/community/[slug]/profile/page.tsx` |
| `/community/[slug]/profile/achievements` | Page | `app/(niwasi)/community/[slug]/profile/achievements/page.tsx` |
| `/community/[slug]/profile/education` | Page | `app/(niwasi)/community/[slug]/profile/education/page.tsx` |
| `/community/[slug]/property` | Page | `app/(niwasi)/community/[slug]/property/page.tsx` |
| `/community/[slug]/property-owners` | Page | `app/(niwasi)/community/[slug]/property-owners/page.tsx` |
| `/community/[slug]/property/[id]` | Detail | `app/(niwasi)/community/[slug]/property/[id]/page.tsx` |
| `/community/[slug]/property/create` | Create | `app/(niwasi)/community/[slug]/property/create/page.tsx` |
| `/community/[slug]/sabha` | Page | `app/(niwasi)/community/[slug]/sabha/page.tsx` |
| `/community/[slug]/sabha/[id]` | Detail | `app/(niwasi)/community/[slug]/sabha/[id]/page.tsx` |
| `/community/[slug]/sabha/[id]/edit` | Edit | `app/(niwasi)/community/[slug]/sabha/[id]/edit/page.tsx` |
| `/community/[slug]/sabha/agenda` | Page | `app/(niwasi)/community/[slug]/sabha/agenda/page.tsx` |
| `/community/[slug]/sabha/agenda/[agendaId]` | Detail | `app/(niwasi)/community/[slug]/sabha/agenda/[agendaId]/page.tsx` |
| `/community/[slug]/sabha/agenda/[agendaId]/edit` | Edit | `app/(niwasi)/community/[slug]/sabha/agenda/[agendaId]/edit/page.tsx` |
| `/community/[slug]/sabha/agenda/add` | Create | `app/(niwasi)/community/[slug]/sabha/agenda/add/page.tsx` |
| `/community/[slug]/sabha/attendance` | Page | `app/(niwasi)/community/[slug]/sabha/attendance/page.tsx` |
| `/community/[slug]/sabha/create` | Create | `app/(niwasi)/community/[slug]/sabha/create/page.tsx` |
| `/community/[slug]/sabha/decision` | Page | `app/(niwasi)/community/[slug]/sabha/decision/page.tsx` |
| `/community/[slug]/sabha/decision/[id]` | Detail | `app/(niwasi)/community/[slug]/sabha/decision/[id]/page.tsx` |
| `/community/[slug]/sabha/proposal` | Page | `app/(niwasi)/community/[slug]/sabha/proposal/page.tsx` |
| `/community/[slug]/sabha/proposal/[proposalId]` | Detail | `app/(niwasi)/community/[slug]/sabha/proposal/[proposalId]/page.tsx` |
| `/community/[slug]/sabha/proposal/[proposalId]/edit` | Edit | `app/(niwasi)/community/[slug]/sabha/proposal/[proposalId]/edit/page.tsx` |
| `/community/[slug]/sabha/proposal/add` | Create | `app/(niwasi)/community/[slug]/sabha/proposal/add/page.tsx` |
| `/community/[slug]/sabha/urgent` | Page | `app/(niwasi)/community/[slug]/sabha/urgent/page.tsx` |
| `/community/[slug]/sabha/urgent/[id]` | Detail | `app/(niwasi)/community/[slug]/sabha/urgent/[id]/page.tsx` |
| `/community/[slug]/sabha/urgent/add` | Create | `app/(niwasi)/community/[slug]/sabha/urgent/add/page.tsx` |
| `/community/[slug]/service-access` | Page | `app/(niwasi)/community/[slug]/service-access/page.tsx` |
| `/community/[slug]/service-providers` | Page | `app/(niwasi)/community/[slug]/service-providers/page.tsx` |
| `/community/[slug]/service-providers/register` | Page | `app/(niwasi)/community/[slug]/service-providers/register/page.tsx` |
| `/community/[slug]/society-fee` | Page | `app/(niwasi)/community/[slug]/society-fee/page.tsx` |
| `/community/[slug]/society-fee/bills` | Page | `app/(niwasi)/community/[slug]/society-fee/bills/page.tsx` |
| `/community/[slug]/society-fee/bills/[id]` | Detail | `app/(niwasi)/community/[slug]/society-fee/bills/[id]/page.tsx` |
| `/community/[slug]/society-fee/dues` | Page | `app/(niwasi)/community/[slug]/society-fee/dues/page.tsx` |
| `/community/[slug]/society-fee/new` | Create | `app/(niwasi)/community/[slug]/society-fee/new/page.tsx` |
| `/community/[slug]/society-fee/payment-confirmation` | Page | `app/(niwasi)/community/[slug]/society-fee/payment-confirmation/page.tsx` |
| `/community/[slug]/society-fee/properties/[propertyId]/current-bill` | Page | `app/(niwasi)/community/[slug]/society-fee/properties/[propertyId]/current-bill/page.tsx` |
| `/community/[slug]/society-fee/properties/[propertyId]/generated-bills` | Page | `app/(niwasi)/community/[slug]/society-fee/properties/[propertyId]/generated-bills/page.tsx` |
| `/community/[slug]/society-fee/properties/[propertyId]/paid-bills` | Page | `app/(niwasi)/community/[slug]/society-fee/properties/[propertyId]/paid-bills/page.tsx` |
| `/community/[slug]/society-fee/properties/[propertyId]/pay` | Page | `app/(niwasi)/community/[slug]/society-fee/properties/[propertyId]/pay/page.tsx` |
| `/community/[slug]/society-fee/properties/[propertyId]/summary` | Page | `app/(niwasi)/community/[slug]/society-fee/properties/[propertyId]/summary/page.tsx` |
| `/community/[slug]/society-fee/receipt/[paymentId]` | Detail | `app/(niwasi)/community/[slug]/society-fee/receipt/[paymentId]/page.tsx` |
| `/community/[slug]/society-fee/received-payments` | Page | `app/(niwasi)/community/[slug]/society-fee/received-payments/page.tsx` |
| `/community/[slug]/society-fee/transaction-details` | Page | `app/(niwasi)/community/[slug]/society-fee/transaction-details/page.tsx` |
| `/community/[slug]/structures/[category]` | Detail | `app/(niwasi)/community/[slug]/structures/[category]/page.tsx` |
| `/community/[slug]/structures/all-entities` | Page | `app/(niwasi)/community/[slug]/structures/all-entities/page.tsx` |
| `/community/[slug]/sub-groups` | Page | `app/(niwasi)/community/[slug]/sub-groups/page.tsx` |
| `/community/[slug]/sub-groups/[id]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/access` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/access/page.tsx` |
| `/community/[slug]/sub-groups/[id]/announcement-category` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/announcement-category/page.tsx` |
| `/community/[slug]/sub-groups/[id]/announcements` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/announcements/page.tsx` |
| `/community/[slug]/sub-groups/[id]/announcements/[annId]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/announcements/[annId]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/announcements/[annId]/edit` | Edit | `app/(niwasi)/community/[slug]/sub-groups/[id]/announcements/[annId]/edit/page.tsx` |
| `/community/[slug]/sub-groups/[id]/announcements/new` | Create | `app/(niwasi)/community/[slug]/sub-groups/[id]/announcements/new/page.tsx` |
| `/community/[slug]/sub-groups/[id]/committee-users` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/committee-users/page.tsx` |
| `/community/[slug]/sub-groups/[id]/contacts` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/contacts/page.tsx` |
| `/community/[slug]/sub-groups/[id]/contacts/persons` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/contacts/persons/page.tsx` |
| `/community/[slug]/sub-groups/[id]/edit` | Edit | `app/(niwasi)/community/[slug]/sub-groups/[id]/edit/page.tsx` |
| `/community/[slug]/sub-groups/[id]/event-master` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/event-master/page.tsx` |
| `/community/[slug]/sub-groups/[id]/inactive-committee-users` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/inactive-committee-users/page.tsx` |
| `/community/[slug]/sub-groups/[id]/meeting-venue` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/meeting-venue/page.tsx` |
| `/community/[slug]/sub-groups/[id]/members` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/members/page.tsx` |
| `/community/[slug]/sub-groups/[id]/populate` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/populate/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/[sabhaId]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/[sabhaId]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/[sabhaId]/edit` | Edit | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/[sabhaId]/edit/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/agenda` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/agenda/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/agenda/[agendaId]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/agenda/[agendaId]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/agenda/[agendaId]/edit` | Edit | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/agenda/[agendaId]/edit/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/agenda/add` | Create | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/agenda/add/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/attendance` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/attendance/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/create` | Create | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/create/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/decision` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/decision/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/decision/[decisionId]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/decision/[decisionId]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/proposal` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/proposal/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/proposal/[proposalId]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/proposal/[proposalId]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/proposal/[proposalId]/edit` | Edit | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/proposal/[proposalId]/edit/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/proposal/add` | Create | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/proposal/add/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/urgent` | Page | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/urgent/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/urgent/[urgentId]` | Detail | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/urgent/[urgentId]/page.tsx` |
| `/community/[slug]/sub-groups/[id]/sabha/urgent/add` | Create | `app/(niwasi)/community/[slug]/sub-groups/[id]/sabha/urgent/add/page.tsx` |
| `/community/[slug]/sub-groups/create` | Create | `app/(niwasi)/community/[slug]/sub-groups/create/page.tsx` |
| `/community/[slug]/users` | Page | `app/(niwasi)/community/[slug]/users/page.tsx` |
| `/community/[slug]/users/[userId]/edit` | Edit | `app/(niwasi)/community/[slug]/users/[userId]/edit/page.tsx` |
| `/community/[slug]/users/add` | Create | `app/(niwasi)/community/[slug]/users/add/page.tsx` |
| `/community/[slug]/work-requests` | Page | `app/(niwasi)/community/[slug]/work-requests/page.tsx` |
| `/community/[slug]/work-requests/[id]` | Detail | `app/(niwasi)/community/[slug]/work-requests/[id]/page.tsx` |
| `/community/[slug]/work-requests/raise` | Page | `app/(niwasi)/community/[slug]/work-requests/raise/page.tsx` |
| `/contact` | Page | `app/(niwasi)/(public)/contact/page.tsx` |
| `/forgot-password` | Page | `app/(niwasi)/(public)/forgot-password/page.tsx` |
| `/help` | Page | `app/(niwasi)/help/page.tsx` |
| `/help/child-report` | Page | `app/(niwasi)/help/child-report/page.tsx` |
| `/help/needy/[id]` | Detail | `app/(niwasi)/help/needy/[id]/page.tsx` |
| `/join` | Page | `app/(niwasi)/(public)/join/page.tsx` |
| `/join/create` | Create | `app/(niwasi)/(public)/join/create/page.tsx` |
| `/join/enlist-locality` | Page | `app/(niwasi)/(public)/join/enlist-locality/page.tsx` |
| `/join/enlist-sub-locality` | Page | `app/(niwasi)/(public)/join/enlist-sub-locality/page.tsx` |
| `/join/global` | Page | `app/(niwasi)/(public)/join/global/page.tsx` |
| `/join/select` | Page | `app/(niwasi)/(public)/join/select/page.tsx` |
| `/login` | Page | `app/(niwasi)/(public)/login/page.tsx` |
| `/mitram-rasoi` | Page | `app/(niwasi)/(public)/mitram-rasoi/page.tsx` |
| `/modules` | Page | `app/(niwasi)/(public)/modules/page.tsx` |
| `/niwasi-video` | Page | `app/(niwasi)/(public)/niwasi-video/page.tsx` |
| `/reset-password` | Page | `app/(niwasi)/(public)/reset-password/page.tsx` |
| `/sabha` | Page | `app/(niwasi)/(public)/sabha/page.tsx` |
| `/system-admin` | Page | `app/(niwasi)/(system-admin)/system-admin/page.tsx` |
| `/system-admin/communities` | Page | `app/(niwasi)/(system-admin)/system-admin/communities/page.tsx` |
| `/system-admin/communities/[id]` | Detail | `app/(niwasi)/(system-admin)/system-admin/communities/[id]/page.tsx` |
| `/system-admin/communities/[id]/edit` | Edit | `app/(niwasi)/(system-admin)/system-admin/communities/[id]/edit/page.tsx` |
| `/system-admin/communities/create` | Create | `app/(niwasi)/(system-admin)/system-admin/communities/create/page.tsx` |
| `/system-admin/communities/create-by-ward` | Page | `app/(niwasi)/(system-admin)/system-admin/communities/create-by-ward/page.tsx` |
| `/system-admin/communities/create-by-zone` | Page | `app/(niwasi)/(system-admin)/system-admin/communities/create-by-zone/page.tsx` |
| `/system-admin/contact-us-list` | Page | `app/(niwasi)/(system-admin)/system-admin/contact-us-list/page.tsx` |
| `/system-admin/data-export` | Page | `app/(niwasi)/(system-admin)/system-admin/data-export/page.tsx` |
| `/system-admin/help` | Page | `app/(niwasi)/(system-admin)/system-admin/help/page.tsx` |
| `/system-admin/help/mails` | Page | `app/(niwasi)/(system-admin)/system-admin/help/mails/page.tsx` |
| `/system-admin/location/countries` | Page | `app/(niwasi)/(system-admin)/system-admin/location/countries/page.tsx` |
| `/system-admin/location/districts` | Page | `app/(niwasi)/(system-admin)/system-admin/location/districts/page.tsx` |
| `/system-admin/location/enlist` | Page | `app/(niwasi)/(system-admin)/system-admin/location/enlist/page.tsx` |
| `/system-admin/location/rural/blocks` | Page | `app/(niwasi)/(system-admin)/system-admin/location/rural/blocks/page.tsx` |
| `/system-admin/location/rural/gram-panchayats` | Page | `app/(niwasi)/(system-admin)/system-admin/location/rural/gram-panchayats/page.tsx` |
| `/system-admin/location/rural/tolas` | Page | `app/(niwasi)/(system-admin)/system-admin/location/rural/tolas/page.tsx` |
| `/system-admin/location/rural/village-habitations` | Page | `app/(niwasi)/(system-admin)/system-admin/location/rural/village-habitations/page.tsx` |
| `/system-admin/location/rural/wards` | Page | `app/(niwasi)/(system-admin)/system-admin/location/rural/wards/page.tsx` |
| `/system-admin/location/states` | Page | `app/(niwasi)/(system-admin)/system-admin/location/states/page.tsx` |
| `/system-admin/location/urban/cities` | Page | `app/(niwasi)/(system-admin)/system-admin/location/urban/cities/page.tsx` |
| `/system-admin/location/urban/city-zones` | Page | `app/(niwasi)/(system-admin)/system-admin/location/urban/city-zones/page.tsx` |
| `/system-admin/location/urban/localities` | Page | `app/(niwasi)/(system-admin)/system-admin/location/urban/localities/page.tsx` |
| `/system-admin/location/urban/sub-localities` | Page | `app/(niwasi)/(system-admin)/system-admin/location/urban/sub-localities/page.tsx` |
| `/system-admin/location/urban/wards` | Page | `app/(niwasi)/(system-admin)/system-admin/location/urban/wards/page.tsx` |
| `/system-admin/masters/[group]/[master]` | Detail | `app/(niwasi)/(system-admin)/system-admin/masters/[group]/[master]/page.tsx` |
| `/system-admin/menu-access` | Page | `app/(niwasi)/(system-admin)/system-admin/menu-access/page.tsx` |
| `/system-admin/populate/family-head-member` | Page | `app/(niwasi)/(system-admin)/system-admin/populate/family-head-member/page.tsx` |
| `/system-admin/populate/make-user-family-head` | Page | `app/(niwasi)/(system-admin)/system-admin/populate/make-user-family-head/page.tsx` |
| `/system-admin/populate/subgroup-shg` | Page | `app/(niwasi)/(system-admin)/system-admin/populate/subgroup-shg/page.tsx` |
| `/system-admin/service-access` | Page | `app/(niwasi)/(system-admin)/system-admin/service-access/page.tsx` |
| `/system-admin/upload-download/city-zone-panchayat` | Page | `app/(niwasi)/(system-admin)/system-admin/upload-download/city-zone-panchayat/page.tsx` |
| `/system-admin/upload-download/language` | Page | `app/(niwasi)/(system-admin)/system-admin/upload-download/language/page.tsx` |
| `/system-admin/upload-download/language/add` | Create | `app/(niwasi)/(system-admin)/system-admin/upload-download/language/add/page.tsx` |
| `/system-admin/upload-download/language/import-export` | Page | `app/(niwasi)/(system-admin)/system-admin/upload-download/language/import-export/page.tsx` |
| `/system-admin/upload-download/tola` | Page | `app/(niwasi)/(system-admin)/system-admin/upload-download/tola/page.tsx` |
| `/system-admin/upload-download/village` | Page | `app/(niwasi)/(system-admin)/system-admin/upload-download/village/page.tsx` |
| `/system-admin/upload-download/ward` | Page | `app/(niwasi)/(system-admin)/system-admin/upload-download/ward/page.tsx` |
| `/system-admin/users` | Page | `app/(niwasi)/(system-admin)/system-admin/users/page.tsx` |
| `/uses` | Page | `app/(niwasi)/(public)/uses/page.tsx` |
