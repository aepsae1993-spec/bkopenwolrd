# EduQuest Online

Browser MMORPG world-map prototype with a Supabase-backed online core.

## Vercel + Supabase deployment

1. Connect the Supabase integration to the Vercel project.
2. In Supabase Dashboard, open Authentication > Providers > Anonymous Sign-Ins and enable it.
3. Redeploy from Vercel. `npm run build` applies the idempotent SQL migration using `POSTGRES_URL_NON_POOLING`, then Vite builds the client.
4. Open the deployment in two browser profiles to verify Realtime Presence.

The integration-provided `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `POSTGRES_URL_NON_POOLING` variables are supported automatically. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## Local development

```powershell
Copy-Item .env.example .env
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` for online mode. Without them, the game intentionally starts in Local Mode.

Useful commands:

```powershell
npm run dev
npm run build:local
npm run build
npm run preview
```

## Online core scope

- Anonymous Supabase Auth session with persistent browser identity
- Persistent character, city, position, energy, currencies, inventory, mount, and Offline Guard
- Server-authoritative city selection, movement, gathering, resource respawn, and tile claim through Postgres RPCs
- Shared world-tile state through Supabase Realtime Postgres Changes
- Live online-player markers through Supabase Realtime Presence
- Local fallback when Supabase configuration is unavailable

Combat, monster authority, quiz validation, equipment, crafting, pets, guilds, and economy expansion build on this core and are not yet server-authoritative.
