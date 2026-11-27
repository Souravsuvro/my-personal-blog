# Work to do — my-personal-blog

Updated 27 November 2026. Owner is Sourav unless noted. Pair with [PLANNING.md](./PLANNING.md).

## Now

- [x] Document the plan and this list in the repository.
- [x] Save every contact submission locally, and to Supabase when keys exist (`src/components/Contact.tsx`, `src/lib/storage.ts`).
- [ ] **You:** create one Supabase project (or reuse the portfolio project) and run `backend/sql/001_schema.sql` from [AI-Powered-Portfolio-Website](https://github.com/Souravsuvro/AI-Powered-Portfolio-Website). Not possible from this workspace: no Supabase account is connected, and the Vercel project `ai-powered-portfolio-website` has no environment variables to copy.
- [ ] **You:** in Vercel → `my-personal-blog` → Settings → Environment Variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production, Preview, and Development. Do not put the service-role key in a `VITE_` variable. Checked 27 November 2026: those keys are not set. EmailJS and Unsplash keys are already present.
- [ ] Redeploy `master` after the keys exist and send a test message. Confirm a row in `inquiries` with `meta.site = my-personal-blog`.

## Next

- [x] Close [PR #1](https://github.com/Souravsuvro/my-personal-blog/pull/1) instead of merging the stale draft. `@vercel/speed-insights` is on current `master` (`src/App.tsx`). Enable Speed Insights once in the Vercel dashboard if the project has not already turned it on — the package cannot flip that switch.
- [x] Make `npm run build` (`tsc && vite build`) pass.
- [x] Replace stub files in `src/assets/images` and `src/assets/videos`. Posters are frames from the existing project WebM files. The MP4s are short H.264 excerpts of those same recordings. Playback on the projects section still uses the full files in `public/videos`.

## Later

- [ ] Share one inquiry inbox with the AI portfolio (`meta.site` already distinguishes the source). Blocked on the Supabase project above.
- [x] Add downloadable case-study pages. Real screenshots already lived in `public/images/latestwork`. Routes: `/work/:slug`.
- [x] Decide whether Unsplash remains a runtime dependency or images are committed. **Decision: keep Unsplash optional.** `VITE_UNSPLASH_ACCESS_KEY` is already on the Vercel project. `src/utils/unsplashService.ts` falls back to fixed image URLs when the key is missing. Do not commit a second copy of every blog cover.

## Not doing

- Public read access to `inquiries`
- Merging the stale Speed Insights pull request without a rebase
