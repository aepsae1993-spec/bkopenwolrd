# 45-Database

> สถานะ: Template

## วัตถุประสงค์
อธิบายระบบ 45-Database อย่างละเอียด

## เป้าหมาย
- กำหนดหลักการออกแบบ
- กำหนดกฎการทำงาน
- กำหนดสูตรคำนวณ
- กำหนด UI/UX
- กำหนดฐานข้อมูล
- กำหนด API (ถ้ามี)

## หัวข้อที่จะจัดทำ
1. ภาพรวม
2. รายละเอียดระบบ
3. Flow การทำงาน
4. กรณีใช้งาน
5. สูตรคำนวณ
6. Edge Cases
7. UI
8. Database
9. API
10. TODO

## 11. Online Core Implementation (2026-07-13)

Migration source: `supabase/migrations/202607130001_online_core.sql`.

### Tables

- `game_profiles`: one row per `auth.users.id`; stores home city, tile position, HP/MP, energy, currencies, gathering level, mount, inventory, combat lock, and Offline Guard.
- `game_world_tiles`: authoritative 31x31 world; stores terrain, zone, city, owner, resource state, depletion timer, last writer, and update time.

### Security

- Both tables have Row Level Security enabled.
- Authenticated users may read only their profile and may read the shared world.
- Browser clients cannot directly insert/update game rows.
- Mutations are exposed only through `security definer` RPCs, each requiring `auth.uid()`.
- The service-role key is never included in the browser bundle.

### RPC contract

- `game_bootstrap(name)`: creates/loads the profile, restores energy, refreshes due resources, and returns profile + world.
- `game_choose_city(city)`: validates city and moves the character to its center spawn.
- `game_move(x, y)`: validates mount range, energy, world bounds, and impassable water.
- `game_gather()`: locks the current tile, calculates server yield, updates inventory, and starts the 30-minute depletion timer.
- `game_claim()`: validates current position, PvP zone, ownership, and resource depletion before claiming.
- `game_save_preferences(offline_guard, mount_index)`: persists logout mode and active mount.
- `game_refresh_resources()`: lazily respawns due nodes and returns changed tiles.

The Vercel build runs the migration idempotently with `POSTGRES_URL_NON_POOLING` (falling back to `POSTGRES_URL`). Production should eventually move migrations to a dedicated CI release step.
