import 'server-only';
import postgres from 'postgres';

export const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });