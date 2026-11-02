import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';

const target = new URL('../ongoing-development/index.html', import.meta.url);
const upstream = 'https://hydrotylerking.github.io/sbv-development/';
export function integrate(html, shell) {
  if (Buffer.byteLength(html) < 10000 || Buffer.byteLength(html) > 25000000) throw Error('Unexpected report size');
  // Fail closed when the upstream fragment contract changes; never import an error page.
  const match = html.match(/^<title>South Boise Village Projects<\/title>\s*(?:<meta[^>]*>\s*|<link[^>]*>\s*)*<style>([\s\S]*?)<\/style>\s*([\s\S]*?)\s*<script>([\s\S]*?)<\/script>\s*$/);
  if (!match) throw Error('Unexpected upstream report format');
  let [, css, body, script] = match;
  for (const marker of ['class="wrap"', 'class="mast"', 'class="sheet"', 'id="lightbox"', 'id="lb-close"', 'id="lb-img"']) {
    if (!body.includes(marker)) throw Error(`Missing report marker: ${marker}`);
  }
  if (/<(?:script|style|link|base|iframe)\b|\son\w+\s*=/i.test(body) || /@import|@scope|@font-face/i.test(css)) throw Error('Unexpected embedded resource or handler');
  new vm.Script(script); // Syntax validation only; do not execute downloaded code during import.
  const images = script.match(/const IMGS = (\{[\s\S]*?\});\s*document\./);
  if (!images) throw Error('Missing image registry');
  const registry = JSON.parse(images[1]);
  for (const ref of body.matchAll(/data-(?:ref|src)="([^"]+)"/g)) {
    if (!registry[ref[1]]?.src?.startsWith('data:image/')) throw Error(`Missing embedded drawing: ${ref[1]}`);
  }
  for (const marker of ["'.thumb'", "'.zoom'", 'showModal', "'lb-close'"]) {
    if (!script.includes(marker)) throw Error(`Missing image interaction: ${marker}`);
  }
  body = body.replace(/[ \t]+$/gm, '');
  body = body.replace(/<p class="homelink">[\s\S]*?<\/p>/g, '');
  if (/Back to (?:site|sbvna)/i.test(body)) throw Error('Unrecognized upstream back button');
  // Resolve future relative links against the published report, without changing local anchors.
  body = body.replace(/(?<![\w-])(href|src)="([^"]+)"/g, (all, attr, value) => {
    if (/^(?:#|data:|https?:|mailto:|tel:)/i.test(value)) return all;
    return `${attr}="${new URL(value.replaceAll('&amp;', '&'), upstream).href.replaceAll('&', '&amp;')}"`;
  });
  css = css.replace(/:root/g, ':scope').replace(/\bbody\s*\{/g, ':scope {');
  const head = shell.slice(0, shell.indexOf('</head>'));
  if (!head.includes('/ongoing-development/fonts.css') || !head.includes('localStorage')) throw Error('Missing local shell');
  return `${head}</head><body>\n<div id="site-header"></div>\n<script type="module" src="/src/static-header.jsx"></script>\n<div id="development-report">\n<style>\n@scope (#development-report) {\n${css}\n}\n</style>\n${body}\n</div>\n<script>\n// Mirror the shared theme into the isolated report scope.\nconst report = document.getElementById('development-report');\nconst syncReportTheme = () => {\n  const theme = document.documentElement.dataset.theme;\n  if (theme) report.dataset.theme = theme; else delete report.dataset.theme;\n};\nsyncReportTheme();\nnew MutationObserver(syncReportTheme).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});\n${script}\n</script>\n</body></html>\n`;
}

async function main() {
  const response = await fetch(upstream, {signal: AbortSignal.timeout(60000)});
  if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw Error(`Invalid report response: ${response.status}`);
  const previous = await readFile(target, 'utf8');
  const next = integrate(await response.text(), previous);
  if (next === previous) { console.log('Report unchanged.'); return; }
  // Vite must see the candidate at its real path. Restore exact original bytes on failure.
  const temporary = new URL('./index.html.importing', target);
  try {
    await writeFile(temporary, next);
    await rename(temporary, target);
    const build = spawnSync('npm', ['run', 'build'], {stdio: 'inherit', shell: process.platform === 'win32'});
    if (build.error || build.status !== 0) throw Error('Candidate build failed');
  } catch (error) {
    await writeFile(target, previous);
    await unlink(temporary).catch(() => {});
    throw error;
  }
  console.log('Validated report imported; ready for review/commit.');
}
if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}
