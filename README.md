# Sunai Niwasi

Development workspace for the **Niwasi** platform — a multi-portal resident/community-welfare
system. This repo itself ships no code; it exists to check out the frontend and the API
side-by-side at matching commits, plus hold cross-cutting docs (`AGENTS.md`, feature planning).

Niwasi serves three portals off one frontend deployment, split by host:

- **`niwasi.in`** — main portal: communities, sabha meetings, sub-groups/SHGs, family members,
  work requests, property & society fees, public pages, system-admin, and the `/help` needy/child
  welfare section.
- **`partner.niwasi.in`** — partner/NGO staff portal: surveys, facility assignment, campaigns,
  order placement (home sample collection), reports.
- **`event.niwasi.in`** — public event hosting: registration, attendance, assignment.

## Repo layout

| Path | Repo | What it is |
|---|---|---|
| `apps/frontend` | [`Niwashi_frontend`](https://github.com/TrilineInfotech/Niwashi_frontend) | Next.js app serving all three portals |
| `apps/api` | [`Niwasi_backend`](https://github.com/TrilineInfotech/Niwasi_backend) | Express/Prisma API |

Both are git **submodules** — independent repositories with their own history, their own remote,
and their own CI/deploy pipeline (each has its own Jenkins job that pulls straight from its own
repo and restarts its own `pm2` process on the server). Neither submodule references this parent
repo; this repo is a dev-time convenience only, not a deploy target.

## Clone

```sh
git clone --recurse-submodules git@github.com:aayush-cmd/sunai_niwasi.git
```

Already cloned without `--recurse-submodules`?

```sh
git submodule update --init --recursive
```

## Working in the submodules

Each app is developed and committed inside its own folder like an ordinary standalone repo — see
its own README (`apps/frontend/README.md`, `apps/api/README.md`) for its dev setup, env vars, and
project structure.

After committing inside `apps/api` or `apps/frontend` and pushing to its own remote, bump the
pointer here so the parent tracks the new commit:

```sh
# from the repo root
git add apps/api      # or apps/frontend
git commit -m "Bump api"
git push
```

## Docs

- [`AGENTS.md`](AGENTS.md) — working rules for any agent/contributor across this workspace
  (sync discipline, DB conventions, feature planning file convention).
- `docs/planning/features/` — one dated planning file per feature/significant change, started
  from `TEMPLATE.md` before any code is written.
