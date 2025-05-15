import { createClient } from "@libsql/client/web";

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

export const turso = createClient({
  url: TURSO_DATABASE_URL as string,
  authToken: TURSO_AUTH_TOKEN,
});