import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, chmod, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { integrate } from './import-development.mjs';
const shell = await readFile(new URL('../ongoing-development/index.html', import.meta.url), 'utf8');
// Reconstruct the validated upstream fragment from the checked-in snapshot, avoiding network tests.
const css = shell.match(/@scope \(#development-report\) \{\n([\s\S]*?)\n\}\n<\/style>/)[1].replaceAll(':scope', ':root');
const body = shell.slice(shell.indexOf('\n}\n</style>') + '\n}\n</style>\n'.length).split('\n</div>\n<script>')[0];
const script = shell.slice(shell.indexOf('const IMGS = '), shell.lastIndexOf('</script>'));
const fixture = `<title>South Boise Village Projects</title><style>${css}</style>${body}<script>${script}</script>`;
test('stable import, preserved drawing keys, rejected format and broken images', () => {
  const result = integrate(fixture, shell);
  assert.equal(integrate(fixture, result), result);
  assert.ok(!/data-src="https:/.test(result));
  assert.throws(() => integrate('<html>Error</html>', shell));
  assert.throws(() => integrate(fixture.replace('id="lightbox"', 'id="missing"'), shell));
  assert.throws(() => integrate(fixture.replace(/data-ref="[^"]+"/, 'data-ref="missing"'), shell));
});
test('download failure, invalid format and build failure preserve exact original file', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'sbv-import-'));
  try {
    await mkdir(join(dir, 'scripts')); await mkdir(join(dir, 'ongoing-development')); await mkdir(join(dir, 'bin'));
    await cp(new URL('./import-development.mjs', import.meta.url), join(dir, 'scripts/import-development.mjs'));
    await writeFile(join(dir, 'ongoing-development/index.html'), shell);
    await writeFile(join(dir, 'fixture.html'), fixture.replace('Updated Nov', 'Updated changed Nov'));
    await writeFile(join(dir, 'mock.mjs'), `import {readFileSync} from 'node:fs'; globalThis.fetch = async () => { if(process.env.MODE==='download') throw Error('offline'); return {ok:true,headers:{get:()=> 'text/html'},text:async()=>process.env.MODE==='format'?'invalid':readFileSync('fixture.html','utf8')}; };`);
    await writeFile(join(dir, 'bin/npm'), '#!/bin/sh\nexit 1\n'); await chmod(join(dir, 'bin/npm'), 0o755);
    for (const mode of ['download', 'format', 'build']) {
      const run = spawnSync(process.execPath, ['--import', './mock.mjs', 'scripts/import-development.mjs'], {cwd:dir,env:{...process.env,MODE:mode,PATH:join(dir,'bin')+':'+process.env.PATH}});
      assert.equal(run.status, 1, mode);
      if (mode === 'build') assert.match(run.stderr.toString(), /Candidate build failed/);
      assert.equal(await readFile(join(dir,'ongoing-development/index.html'),'utf8'), shell, mode);
    }
  } finally { await rm(dir, {recursive:true,force:true}); }
});
