import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

export const DEFAULT_DATA_ACCESS = 'activeRecord';
export const QUARKUS_VERSION = '3.8.3';

export const CACHE_MAXIMUM_SIZE = 100;
export const CACHE_EXPIRE_AFTER_WRITE = '3600S';

export const packageJson = JSON.parse(readFileSync(join(fileURLToPath(import.meta.url), '../../package.json')));
