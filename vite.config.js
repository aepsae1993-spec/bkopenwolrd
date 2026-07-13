import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const supabaseUrl = env.VITE_SUPABASE_URL
    || env.NEXT_PUBLIC_SUPABASE_URL
    || env.SUPABASE_URL
    || "";
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY
    || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || env.SUPABASE_ANON_KEY
    || "";

  return {
    define: {
      __SUPABASE_URL__: JSON.stringify(supabaseUrl),
      __SUPABASE_ANON_KEY__: JSON.stringify(supabaseAnonKey),
    },
  };
});
