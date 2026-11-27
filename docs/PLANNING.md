# Planning — my-personal-blog

Updated 27 November 2026. This is the working plan for the live portfolio blog. The companion checklist is [WORK-TO-DO.md](./WORK-TO-DO.md).

## What this site is

Public portfolio and writing home for Sourav Sarker Suvra.

- Live: https://my-personal-blog-ivory.vercel.app
- Repository: https://github.com/Souravsuvro/my-personal-blog (`master`)
- Vercel project: `my-personal-blog` (team `sourav-sarker-suvras-projects`)
- Stack: React 18, TypeScript, Vite, Tailwind, React Router, EmailJS, optional Supabase dual-write, Vercel Speed Insights

## Decisions already made

1. **EmailJS stays the visitor-facing send path.** Production already has `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.
2. **Supabase is optional durability, not a rewrite.** Contact submissions always land in `localStorage`. When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set, the same row is inserted into `public.inquiries`.
3. **The schema lives in the portfolio repo**, not here: `Souravsuvro/AI-Powered-Portfolio-Website` → `backend/sql/001_schema.sql`. Both sites should share one Supabase project so leads are not split.
4. **Do not merge pull request #1 as-is.** “Install and Configure Vercel Speed Insights” is a Vercel Agent draft whose base is the August 2026 commit, before the November Brain Games updates. Speed Insights was added on current `master` instead, and the draft should be closed.
5. **Auth stays off.** There is no member area. Inquiries are insert-only for the public anon key. Do not add a public `SELECT` policy — that would expose names and emails.
6. **Unsplash stays a runtime dependency, optional.** The access key is already a Vercel environment variable. Blog covers fall back to fixed URLs when the key is absent. Covers are not duplicated into the repo.
7. **Case studies use photos already in the repo.** `/work/:slug` reads `public/images/latestwork`. Each page can download that screenshot. No invented metrics.

## What shipped on 27 November 2026

- Planning docs (this file and the work list).
- Contact form dual-write via `src/lib/storage.ts`.
- `.env.example` now lists the Supabase variables.
- Speed Insights component on current `master`.
- Real poster frames and short MP4 excerpts in place of the 30-byte stubs.
- Downloadable case-study pages for the seven latest works.
- `npm run build` is green.

Brain Games (memory, reaction, math, Simon, haptics, Web Audio, share) and the template catalog were already on `master` from 23–26 November 2026.

## Milestones

| Milestone | Outcome | Status |
|-----------|---------|--------|
| M1 Content | Games, templates, blog, contact, SEO shell | Done |
| M2 Durable leads | One Supabase project, schema applied, both Vercel projects have the anon key | Blocked — no Supabase credentials in this workspace, and `ai-powered-portfolio-website` has no env vars to reuse |
| M3 Speed | Speed Insights package on current `master` | Done in code. Confirm the Vercel toggle if metrics do not appear after deploy |
| M4 Content refresh | Replace 30-byte placeholder thumbnails and empty project videos | Done |
| M5 Case studies | A page per real project photo, with a download | Done |

## Risks

- **Supabase is not a connected account in this workspace.** Keys cannot be created or pasted from here. Until they are added in Vercel, a cleared browser loses the local copy of a lead. EmailJS still sends when those keys are present.
- Speed Insights only records visits after the Vercel project setting is enabled and a production deploy that includes the component is live.

## Out of scope unless asked

- Accounts, comments, or a public CMS
- Replacing EmailJS
- Publishing private client sites from this repository
