import * as path from 'path';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

/**
 * This function will resolve the path relative to the project root
 * @param paths The path segments to resolve
 * */
export const getProjectPath = (...paths: string[]): string => {
  // Check if running in a packaged environment (e.g., after build)
  if (process.env.NODE_ENV === 'production') {
    // In production, the current working directory is the project root
    return path.join(process.cwd(), ...paths);
  } else {
    // In development, resolve relative to the current file
    return path.join(__dirname, '..', ...paths); // Go up one directory from config
  }
};

/**
 * The paths for the drizzle config
 * @path
 * */
export const paths = {
  drizzleOut: getProjectPath('src', 'drizzle', 'dist'),
  schema: './src/drizzle/schema/schema.ts',
};

/**
 * The drizzle config
 * @type {Object}
 * */
export default defineConfig({
  schema: './src/drizzle/schema/schema.ts',
  out: './src/drizzle/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
