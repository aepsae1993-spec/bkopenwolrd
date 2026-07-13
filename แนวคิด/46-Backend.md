# 46-Backend

> สถานะ: Template

## วัตถุประสงค์
อธิบายระบบ 46-Backend อย่างละเอียด

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

The first online backend uses Supabase Auth + Postgres RPCs. The browser is a presentation client; it proposes actions and renders accepted server state.

### Action flow

1. The client restores or creates an anonymous Auth session.
2. `game_bootstrap` loads the authoritative profile and 31x31 world snapshot.
3. For movement, gathering, city selection, claim, mount, or logout settings, the client calls the matching RPC.
4. Postgres validates the rule and updates rows transactionally.
5. The RPC returns the accepted profile/tile state; the UI updates only from this response.
6. Shared tile changes fan out through Realtime Postgres Changes.

### Failure behavior

- Missing Vercel/Supabase public configuration starts Local Mode for development.
- Authentication or RPC failure leaves the previous accepted state intact and writes a visible event-log message.
- Anonymous Sign-In must be enabled in Supabase Authentication settings.
- Movement requests cannot choose their own range; the RPC derives range from the persisted mount index.
- Gathering and claiming use row locks to prevent simultaneous double collection or double claim.

### Next server-authoritative modules

- quiz answer verification and movement charge
- monster state, leash, HP, respawn, and loot
- PvP targeting, damage, Combat Lock, death, and city respawn
- equipment, skills, crafting, pets, economy, guilds, and chat
