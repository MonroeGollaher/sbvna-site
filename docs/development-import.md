# Development report import

The importer downloads only https://hydrotylerking.github.io/sbv-development/.
It never runs Tyler's collection or analysis. Upstream workflow inspected:
https://github.com/HydroTylerKing/sbv-development/blob/main/.github/workflows/daily.yml
It schedules 12:55 UTC and a backup at 15:17 UTC, with a 45-minute job limit.
Our import is scheduled daily at 7:00 AM in `America/Boise`, automatically following
daylight saving time (13:00 UTC in summer, 14:00 UTC in winter). GitHub schedules
can be delayed. This is before the upstream backup and only five minutes after the
primary start in summer, so the latest report may not yet be published. In that
case we import the currently published report and pick up later changes the next
day; use Run workflow manually if an earlier refresh is needed.

## Local use

Use Node 22, then run from the repository root:

```sh
npm ci
node --test scripts/import-development.test.mjs
node scripts/import-development.mjs
npm run dev
```

Review `/ongoing-development/`, including thumbnails, enlarge/close/Escape,
project anchors, the Planning & Development menu and both themes.
The script does not commit, push or deploy locally. Repeated identical output is
unchanged; no retrieval timestamp is added. Changed output must build successfully
before the importer returns success. A failed build restores the original source
bytes. Build output in ignored `dist/` may be partial after failure; rebuild before
using preview. Avoid editing the development page concurrently with an import.

## Enable after review

Commit and push the implementation yourself to `main` (the default branch).
Enable GitHub Actions and allow checkout/setup-node actions. The import job requests
only `contents: write` using the temporary built-in GITHUB_TOKEN; no PAT or secret
is required. Repository rules must permit this bot to push to main. If protected
main prohibits bot pushes, the workflow will fail visibly; choose an approved bot
exception or adapt to a PR process rather than disabling protections broadly.

In Actions, select **Import development report → Run workflow → main** for a manual
import. The workflow checks out main, even if another dispatch branch is selected.
Changed reports alone are staged, committed and pushed; failed imports never reach
that step. Concurrent imports are serialized. Concurrent human pushes cause a safe
push rejection: rerun rather than force-push.

Netlify must remain connected to this GitHub repository with production branch
`main`, builds enabled, build command `npm run build`, publish directory `dist`,
and Node version **22** in its build settings (NODE_VERSION). Keep the Netlify GitHub
App authorized. Normal report commits contain no skip-deploy marker and should
trigger the existing Netlify Git integration. GITHUB_TOKEN pushes do not trigger
other GitHub push workflows; this importer builds directly before committing and
relies on Netlify's Git integration, not another Actions workflow. Verify the first
manual run produces a Netlify deploy; no deploy hook or Netlify token is used.

## Troubleshooting

Open the failed Actions run and inspect the import/build or push step. HTTP errors,
wrong content type, unexpected fragment structure, missing controls/drawing registry
and JavaScript syntax errors fail before replacement. Build failures restore the
previous source. Upstream layout changes deliberately require updating validation;
do not bypass it to import an error page. The downloaded script is preserved as
trusted upstream application code, not executed by Node during validation.
CSS is isolated with native `@scope` to the development report; this requires a
modern browser supporting CSS scope. The existing local font stylesheet, shared
navbar entry point, theme code and scrollbar spacing are retained. Theme selection
is mirrored into the scoped report. Upstream home buttons and Google font links
are omitted in favor of the site's existing controls and font loading.

The zoning page is independent and is never written by the importer. Scheduled
workflows on inactive public repositories may be disabled by GitHub; re-enable in
Actions if needed. If Tyler's generation fails but his previous valid report is
still published, importing that unchanged report correctly makes no commit.
