import { readFile } from "node:fs/promises";
import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!connectionString) {
  console.log("Supabase migration skipped: no POSTGRES_URL is available in this environment.");
} else {
  const migrationUrl = new URL("../supabase/migrations/202607130001_online_core.sql", import.meta.url);
  const migration = await readFile(migrationUrl, "utf8");
  const sql = postgres(connectionString, {
    max: 1,
    prepare: false,
    ssl: "require",
  });

  try {
    await sql.unsafe(migration);
    console.log("Supabase online-core migration applied.");
  } finally {
    await sql.end();
  }
}
