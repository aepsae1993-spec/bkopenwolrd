# 48-Network

> สถานะ: Template

## วัตถุประสงค์
อธิบายระบบ 48-Network อย่างละเอียด

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

### Channels

- Presence channel `eduquest-world`: publishes user id, display name, city, x/y, HP, and update time.
- Database channel `eduquest-world-tiles`: receives `UPDATE` events from `game_world_tiles`.

### Rules

- Presence is visual/ephemeral and never authorizes movement, combat, gathering, or ownership.
- Persistent state comes from Postgres RPC responses and database changes.
- The local player is excluded from remote presence markers.
- Join/leave/sync events rebuild the visible online-player map and update the HUD online count.
- Resource refresh is checked every 30 seconds; resulting tile updates are broadcast through Postgres Changes.
- Supabase Auth persists the anonymous session in browser storage and refreshes its token automatically.

### Reconnect requirements

- On a full reload, call `game_bootstrap` again rather than trusting cached game state.
- On Realtime reconnect, publish the latest accepted player position through Presence.
- Future combat broadcasts must be treated as animation hints only; authoritative damage must come from Postgres/Edge Functions.
