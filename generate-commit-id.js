const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const defaultContent = "export const COMMIT_ID = 'unknown';\n";
const srcDir = 'src';
const commitIdFile = path.join(srcDir, 'commit-id.ts');
try {
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }

  if (!fs.existsSync(commitIdFile)) {
    fs.mkdirSync(commitIdFile, defaultContent);
  }

  const git = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' });

  if (git.error) {
    throw git.error;
  }

  const commitId = git.stdout.trim();
  fs.writeFileSync(commitIdFile, `export const COMMIT_ID = '${commitId}';\n`);
  console.log('Generated commit-id.ts: ', commitId);
} catch (error) {
  console.error('Error generating commit-id.ts: ', error);
  fs.writeFileSync(commitIdFile, defaultContent);
}
