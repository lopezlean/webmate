import console from 'console';
import fs from 'fs/promises';
import { dirname, join } from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const thisDir = dirname(fileURLToPath(import.meta.url));

const getNpmVersion = async () => {
  const path = join(thisDir, '..', 'package.json');
  console.log('Reading version from', path);
  const data = await fs.readFile(path, 'utf8');
  const parsed = JSON.parse(data);
  return parsed.version;
};

const newVersionModuleCode = `// DO NOT UPDATE MANUALLY.

// This file is automatically generated by scripts/update-version.js
export const VERSION = '${await getNpmVersion()}';
`;

const versionModulePath = join(thisDir, '..', 'packages', 'core', 'src', 'version.ts');
const oldVersionModuleCode = await fs.readFile(versionModulePath, 'utf8');
if (oldVersionModuleCode !== newVersionModuleCode) {
  await fs.writeFile(versionModulePath, newVersionModuleCode, 'utf8');
  console.log('Updated packages/core/src/version.ts, please commit this change and rebuild.');
  // Fail to help the publisher remember to commit.
  process.exit(1);
} else {
  console.log('src/shared/version.ts already up to date.');
}
