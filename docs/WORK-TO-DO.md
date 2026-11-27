# Work to do — my-personal-blog

Updated 27 November 2026. Owner is Sourav unless noted. Pair with [PLANNING.md](./PLANNING.md).

## Now

- [x] Document the plan and this list in the repository.
- [x] Save every contact submission locally, and to Supabase when keys exist (`src/components/Contact.tsx`, `src/lib/storage.ts`).
- [ ] **You:** create one Supabase project (or reuse the portfolio project) and run `backend/sql/001_schema.sql` from [AI-Powered-Portfolio-Website](https://github.com/Souravsuvro/AI-Powered-Portfolio-Website).
- [ ] **You:** in Vercel → `my-personal-blog` → Settings → Environment Variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production, Preview, and Development. Do not put the service-role key in a `VITE_` variable.
- [ ] Redeploy `master` after the keys exist and send a test message. Confirm a row in `inquiries` with `meta.site = my-personal-blog`.

## Next

- [ ] Close or rebase [PR #1](https://github.com/Souravsuvro/my-personal-blog/pull/1) (Speed Insights). The draft does not include the November games work. If Speed Insights is still wanted, add `@vercel/speed-insights` on current `master` and enable it in the Vercel dashboard.
- [ ] Make `npm run build` (`tsc && vite build`) pass. Known historical errors: `src/components/Navbar.tsx`, `src/pages/BrainGames.tsx`.
- [ ] Replace stub files in `src/assets/images` and `src/assets/videos` (they are ~30 bytes).
- [x] Fix the broken portfolio link markup in `README.md`.

## Later

- [ ] Share one inquiry inbox with the AI portfolio (`meta.site` already distinguishes the source).
- [ ] Add downloadable case-study pages only when real project photos exist.
- [ ] Decide whether Unsplash remains a runtime dependency or images are committed.

## Not doing

- Public read access to `inquiries`
- Merging the stale Speed Insights pull request without a rebase
