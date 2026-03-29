import { readFileSync } from 'fs';
import { join } from 'path';

export const DEFAULT_DATA_ACCESS = 'activeRecord';

export const CACHE_MAXIMUM_SIZE = 100;
export const CACHE_EXPIRE_AFTER_WRITE = '3600S';

export const packageJson = JSON.parse(readFileSync(join(import.meta.dirname, '../package.json')));
