# API Structure

How the backend (`apps/api`) is organised and how a request moves through it. It covers the
folder layout, the request pipeline, auth, responses, the database and how to add an endpoint.

- **Stack:** Node.js, Express 5, TypeScript, Prisma over MySQL/MariaDB, Zod for validation
- **Entry point:** `apps/api/src/index.ts`
- **Every endpoint**, with its full URL, guards and source line, is listed in
  [endpoints.md](endpoints.md).

## 1. Folder layout

```
apps/api/
  src/
    index.ts              # creates the app: CORS, cookies, host detection, mounts every router
    lib/                  # shared helpers, no business logic
      prisma.ts           #   the single Prisma client
      session.ts          #   read / set / clear the login cookie
      jwt.ts              #   sign / verify tokens
      storage.ts          #   file uploads (multer): size limits, allowed file types
      mailer.ts           #   outgoing email
      csv.ts              #   CSV parse / build / send
      locale.ts           #   English / Hindi label picking
    middleware/
      auth.ts             #   requireAuth, optionalAuth, requireSystemAdmin
      rbac.ts             #   community role checks (requireCommunityPermission, …)
      validate.ts         #   Zod checks for body / query / params
      hostArea.ts         #   tags each request as niwasi / partner / help, from the host
      error.ts            #   global error handler (the last middleware)
    modules/              # one folder per feature area (see §3)
    schemas/              # Zod request schemas, one file per feature
    generated/prisma/     # generated Prisma client (build output, gitignored)
  prisma/
    schema.prisma         # database schema
    sql/                  # dated .sql migration files, run by hand
  scripts/                # one-off maintenance and build scripts
  uploads/                # uploaded files (STORAGE_PATH)
```

## 2. How a request flows

```
Browser (niwasi.in / partner.niwasi.in / event.niwasi.in)
   │   fetch with credentials: 'include'  → sends the login cookie
   ▼
index.ts
   ├─ cors()          allow only our own domains (see §5)
   ├─ express.json()  parse JSON body
   ├─ cookieParser()  read cookies
   └─ detectArea      req.portalArea = 'niwasi' | 'partner' | 'help'
   ▼
Router  (modules/<area>/<feature>.routes.ts)
   ├─ requireAuth              who is calling?          → 401 if not logged in
   ├─ permission check         are they allowed?         → 403 if not
   ├─ validate(Schema)         is the input valid?       → 422 if not
   ▼
Controller  (<feature>.controller.ts)
   │   reads req, calls the service, sends { success, data }
   ▼
Service  (<feature>.service.ts)
   │   business rules + Prisma queries
   ▼
MySQL
   │
   └─ any thrown error → error.ts → clean JSON error response
```

Every route is declared in the same order: **auth → validation → controller**. Example from
`modules/profile/profile.routes.ts`:

```ts
router.use(requireAuth);                                   // whole router needs login
router.put('/', validate(UpdateProfileSchema), profileController.updateProfile);
router.delete('/education/:id', validateParams(IdParamSchema), profileController.deleteEducation);
```

### The three layers

| Layer | File | Does | Doesn't |
|---|---|---|---|
| Routes | `*.routes.ts` | Maps URL + method to a controller. Attaches auth, permission and validation middleware. | Business logic |
| Controller | `*.controller.ts` | Reads `req` (user id, params, body), calls the service, sends the response | Database queries |
| Service | `*.service.ts` | Business rules and all Prisma queries. Throws errors with a status code. | Touch `req`/`res` |

Some features have extra files: `*.schema.ts` (Zod schemas kept inside the module),
`*.config.ts` (config that drives one generic page, e.g. all 42 masters), `*.access.ts`
(access checks for one feature) and `*.jobs.ts` (background jobs).

## 3. Modules and URLs

All routes live under `/api/v1/`. This table is the map; [endpoints.md](endpoints.md) lists every
single endpoint.

| Mount | Module folder | Serves | Who can call |
|---|---|---|---|
| `/auth` | `modules/auth/` | Login, logout, `me`, register (resident / community / event), forgot and reset password | Public |
| `/i18n` | `modules/i18n/` | English → Hindi label dictionary | Public |
| `/contact`, `/locations`, `/communities` | `modules/niwasi/` | Public contact form, location lookups (state → ward), community search | Public |
| `/community/:slug/...` | `modules/community/` | Everything inside one community: members, sabha, sub-groups, announcements, property, society fee, payment, help, work requests, services, masters, populate, … | Logged-in members, by community role |
| `/profile` | `modules/profile/` | The user's own profile, the same across all communities | Logged in |
| `/admin/...` | `modules/admin/` | System admin: communities, users, locations, masters, service access, populate, upload/download | System Admin only |
| `/help/...` | `modules/help/` | Public needy browsing, help actions, and help admin under `/help/admin` | Mixed: public, logged in, admin |
| `/partner/...` | `modules/partner/` | Partner portal. Org-scoped routes are `/partner/orgs/:slug/...`: surveys, campaigns, contacts, facilities, order placement, reports, Pratham, Samajik Udyami, … | Logged-in partner users, by org and designation |
| `/event/:slug/:pctype/...` | `modules/event/` | Managing events: create/edit, assign, media, reports. `pctype`: `1` community, `2` partner, `3` sub-group. | Logged in, by owner's role |
| `/event-host/...` | `modules/event/` (`event-host.*`) | Public event portal: published event list, event dashboard, registration | Public (login optional) |

Several routers can share one mount. For example, `/api/v1/community` is served by
`community-portal`, `community-home` and `my-community` together. Express runs them in order.

Shared helpers used across modules are in `modules/services/` (service-access logic) and
`modules/dashboards/`.

## 4. Login and permissions

### One login cookie for every portal

- Logging in sets **one** httpOnly cookie, `niwasi_session`, holding a JWT with just
  `{ userId }` (`lib/session.ts`).
- The cookie is set on the parent domain (`COOKIE_DOMAIN`, i.e. `.niwasi.in`), so the browser
  sends it to `niwasi.in`, `partner.niwasi.in` and `event.niwasi.in`. One login works on every
  portal.
- **The cookie only says who the user is, never what they can do.** Each portal looks up the
  user's access in the database on every request, so sharing the cookie can never grant extra
  rights.
- The older per-portal cookies `niwasi_token` and `partner_token` are still accepted as a
  fallback until existing sessions expire. Only `niwasi_session` is written now, and logout clears
  all three.

### The auth middleware

| Middleware | File | Meaning |
|---|---|---|
| `requireAuth` | `middleware/auth.ts` | Must be logged in → otherwise 401 |
| `optionalAuth` | `middleware/auth.ts` | Login optional; sets `req.user` if present (public event pages) |
| `requireSystemAdmin` | `middleware/auth.ts` | Must be the System Admin (user id `1`) → otherwise 403 |
| `requireCommunityMembership()` | `middleware/rbac.ts` | Must belong to the `:slug` community |
| `requireCommunityPermission(key)` | `middleware/rbac.ts` | Must hold a community role allowed for that permission key (see the `PERMISSIONS` map in `rbac.ts`) |
| `requirePartnerAuth` | `modules/partner/partner.auth.ts` | Partner-portal login check |
| `requireOrgMember()` / `requireOrgAccess()` / `requirePartnerPermission(key)` | `modules/partner/permissions.ts` | Must belong to the `:slug` partner org, with the right designation |

Roles are **per community**: someone can be Community Admin in one community and an ordinary
member in another. Handlers always use the user id from the session (`req.user!.userId`), never
a user id sent by the client.

## 5. Responses and errors

Every endpoint returns the same shape:

```jsonc
// success
{ "success": true,  "data": { ... } }

// failure
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid input", "details": { ... } } }
```

| Status | `code` | When |
|---|---|---|
| 401 | `UNAUTHENTICATED` | Not logged in |
| 403 | `FORBIDDEN` | Logged in but not allowed |
| 404 | `NOT_FOUND` | Unknown route, or record not found (also Prisma `P2025`) |
| 409 | `CONFLICT` | Duplicate value (Prisma `P2002` unique constraint) |
| 422 | `VALIDATION_ERROR` | Zod check failed. `details.fieldErrors` holds the error for each field. |
| 500 | — | Anything unexpected. The raw error is logged but never sent to the client. |

On the frontend, `apps/frontend/lib/api.ts` → `apiFetch()` always returns this same shape, even
for network failures (`NETWORK_ERROR`). Callers only need to check `res.success`.

**CORS** (`index.ts`): only our own domains may call the API with cookies. That means
`FRONTEND_URL`, `PARTNER_FRONTEND_URL`, `EVENT_FRONTEND_URL`, and any subdomain of
`COOKIE_DOMAIN`. In development, `localhost:3000` and its `partner.` / `event.` subdomains are
also allowed.

## 6. Database

- **Schema:** `prisma/schema.prisma`. The client is generated into `src/generated/prisma/` by
  `npm run build`; never edit it by hand.
- **Migrations:** a schema change ships as a dated `.sql` file in `prisma/sql/`, and a person
  runs it against the database by hand. Nothing applies schema changes automatically.
- **Conventions:** `snake_case` column names in the database, `camelCase` in TypeScript. No
  foreign-key constraints: columns that point to another table (e.g. `user_id`, `created_by`) get
  an index instead, and the code enforces the relationship.
- **Soft delete:** many tables mark rows inactive (`status = 0`, or `deleted_at` set) instead of
  deleting them. Prisma doesn't filter these out automatically, so every query must.
- **BigInt:** some ID and phone columns are `BigInt`, which `res.json` can't serialise. Convert
  them to numbers before responding.
- **`scripts/patch-prisma-schema.mjs`** runs before `prisma generate`. Some MySQL `tinyint(1)`
  columns hold values of 2 or more, but Prisma would read them as `Boolean`. The script switches
  those specific fields back to `Int`.

## 7. Tests

There's no test runner (no jest/vitest). Each module's `__tests__/` folder holds plain scripts
that use Node's built-in `assert`:

- `*.regression.ts`: guards known-risky behaviour (permissions, access scoping, lifecycles)
- `*.verify.ts`: end-to-end checks of one feature (mostly events)

They run against the **real database** and clean up their own rows. Run one with:

```sh
cd apps/api
npx ts-node --transpile-only \
  --compiler-options '{"module":"commonjs","moduleResolution":"node","ignoreDeprecations":"6.0"}' \
  -r dotenv/config src/modules/auth/__tests__/auth-rbac.regression.ts
```

The frontend has Playwright end-to-end tests in `apps/frontend/e2e/` (`npm run test:e2e`).

## 8. Adding an endpoint

1. **Schema:** add a Zod schema in `src/schemas/<feature>.schema.ts`, or the module's
   `*.schema.ts`.
2. **Service:** write the logic and Prisma queries in `modules/<area>/<feature>.service.ts`.
   Scope every query to the caller (their user id, community or org).
3. **Controller:** add a thin handler in `<feature>.controller.ts` that calls the service and
   returns `{ success: true, data }`.
4. **Route:** register it in `<feature>.routes.ts` in the order auth → permission → `validate(...)`
   → controller.
5. **Mount:** if it's a new router, mount it in `index.ts` or in the area's parent router (e.g.
   `partner.routes.ts`).
6. **Frontend:** mirror the same validation rules in the frontend form (see "Frontend validation
   must mirror backend validation" in `AGENTS.md`).
7. **Schema change?** Add a dated `.sql` file in `prisma/sql/` and have it run by hand.
8. **Docs:** add the endpoint's row to [endpoints.md](endpoints.md) (method, full URL, guards,
   source line). If it's a new module, mount or middleware, update §3 or §4 here too.
