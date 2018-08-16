import { config } from 'dotenv';
import { isNil } from 'ramda';
config(); // load .env file
// Get an env value by key
export function Env<T extends string = any>(key: string, fallback: T): T {
  const val = process.env[key];
  return isNil(val) ? fallback : (val as T);
}
