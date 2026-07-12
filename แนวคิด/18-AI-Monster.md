# 18-AI-Monster

> สถานะ: Draft v1

## 1. ภาพรวม

Monster AI ของ EduQuest Online ต้องทำงานบน world map แบบช่องตาราง มอนสเตอร์มีจุดเกิดประจำหรือ Spawn Anchor และไม่ควรถูกลากออกจากพื้นที่ตัวเองไกลเกินไป เพื่อกันการ kite, การลากมอนไปฆ่าผู้เล่นอื่น, การลากมอนไปเมืองเกิด และการทำให้พื้นที่ฟาร์มเสียสมดุล

กฎหลัก:

> มอนมีจุดเกิด และเดินห่างจากจุดเกิดได้ไม่เกิน 3 ช่อง ถ้าตามผู้เล่นไปถึงช่องที่ 4 มอนจะเลิกไล่ กลับจุดเกิด และรี HP เต็ม

## 2. Monster State

สถานะพื้นฐาน:

- Idle: ยืน/เดินวนใกล้จุดเกิด
- Aggro: เจอผู้เล่นและเริ่มไล่
- Combat: อยู่ใน combat
- Leashing: กำลังกลับจุดเกิด
- Resetting: รีสถานะและ HP
- Dead: ตาย รอ respawn

## 3. Spawn Anchor

มอนทุกตัวต้องมี:

- spawn_tile_x
- spawn_tile_y
- spawn_zone_id
- leash_radius
- respawn_time
- patrol_pattern ถ้ามี

ค่าเริ่มต้น:

```text
leash_radius = 3 tiles
reset_distance = 4 tiles
```

## 4. Leash Rule

กฎ:

1. มอนเกิดที่ Spawn Anchor
2. มอนเดินหรือไล่ผู้เล่นได้ในระยะไม่เกิน 3 ช่องจากจุดเกิด
3. ถ้ามอนกำลังจะเดินตามผู้เล่นออกไปช่องที่ 4 ให้หยุดไล่
4. มอนเข้าสถานะ Leashing
5. มอนเดินกลับจุดเกิด
6. เมื่อถึงจุดเกิดหรือเข้าใกล้จุดเกิด รี HP เต็มและล้าง debuff
7. มอนกลับสู่สถานะ Idle

## 5. Aggro Rule

มอนเริ่มสนใจผู้เล่นเมื่อ:

- ผู้เล่นเดินเข้า aggro range
- ผู้เล่นโจมตีก่อน
- ผู้เล่นเก็บ resource/chest ที่มอนเฝ้า
- ผู้เล่นยืนบน tile ที่มอน guard

ค่าเริ่มต้น:

- passive monster: ไม่โจมตีก่อน
- aggressive monster: aggro range 2-3 ช่อง
- guard monster: aggro เมื่อผู้เล่นเข้าใกล้ resource/chest
- ranged monster: อาจ aggro ที่ 3-4 ช่อง แต่ยังติด leash radius 3 จากจุดเกิด

## 6. Movement บนตาราง

มอนเดินทีละช่องตาม pathfinding ที่ server ควบคุม

หลักการ:

- มอนเดินเข้าหาผู้เล่นถ้าอยู่ใน leash radius
- มอนหลีกเลี่ยง blocked tile
- มอนไม่ควรเดินเข้า safe zone
- มอนที่กำลัง Leashing ไม่ควรโดนลากซ้ำจนกว่าจะกลับถึงพื้นที่
- ถ้าทางกลับถูก block ระบบควร teleport กลับจุดเกิดหลังเวลาหนึ่ง

## 7. Combat Behavior

มอนแต่ละประเภท:

- Melee: เดินเข้าระยะ 1 ช่องแล้วโจมตี
- Ranged: รักษาระยะ 2-3 ช่อง
- Caster: ใช้สกิลพื้นที่หรือ debuff
- Guard: ไม่ไล่ไกล เน้นป้องกัน tile/resource
- Elite/Boss: มี pattern เพิ่ม แต่ยังควรมีกฎ leash เฉพาะ

## 8. Reset Rule

เมื่อมอน reset:

- HP กลับเต็ม
- MP/skill charge กลับค่าเริ่มต้น
- ล้าง debuff
- ล้าง aggro target
- ยกเลิก reward contribution ของ combat ที่ยังไม่ชนะ
- กลับตำแหน่ง spawn หรือ patrol

ข้อควรระวัง:

- ถ้าผู้เล่นตีมอนแล้วลากออก leash เพื่อรี HP ซ้ำ ระบบต้องไม่นับเป็น exploit reward
- ถ้ามอน reset ไม่ควร drop item หรือ EXP

## 9. Quiz กับมอน

Quiz ใช้เป็น bonus ใน PvE ได้บ่อยกว่า PvP

ตัวอย่าง:

- ตอบถูกตอนโจมตี: damage +5-15%
- ตอบถูกตอน dodge mechanic: ลด damage
- ตอบถูกตอน resource guard: เพิ่ม drop/resource
- ตอบผิด: สกิลยังทำงาน แต่ไม่มี bonus หรือผลลดลงเล็กน้อย

## 10. UI/UX

ควรแสดง:

- HP bar มอน
- ระยะ aggro ถ้าจำเป็น
- สถานะมอนกำลัง reset/leashing
- warning เมื่อมอนกำลังจะกลับจุดเกิด
- เส้นหรือ icon จุดเกิดเฉพาะ debug/dev mode

ข้อความตัวอย่าง:

- Monster is returning to its spawn.
- Monster reset. HP restored.

## 11. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- monster_spawns
- monster_instances
- monster_ai_states
- monster_aggro_targets
- monster_leash_logs
- monster_respawn_timers
- monster_drop_tables

## 12. API/Event ที่เกี่ยวข้อง

Realtime Events:

- `monster:spawned`
- `monster:aggro_started`
- `monster:moved`
- `monster:attacked`
- `monster:leash_started`
- `monster:reset`
- `monster:died`
- `monster:respawned`

Server/Internal:

- `updateMonsterAI(monsterId)`
- `checkLeashDistance(monsterId)`
- `resetMonster(monsterId)`
- `calculateAggro(monsterId)`

## 13. Edge Cases

- ผู้เล่นลากมอนไปช่องที่ 4 แล้วกลับเข้ามาตีใหม่ซ้ำ
- จุดเกิดถูกผู้เล่นหรือสิ่งกีดขวาง block
- มอน ranged ยิงผู้เล่นที่อยู่นอก leash radius
- ผู้เล่นหลายคนตีมอนจากคนละทิศ
- มอน reset ระหว่างผู้เล่นกำลัง cast skill
- มอนตายในจังหวะเดียวกับที่กำลัง reset
- server lag ทำให้ตำแหน่งมอนเกิน 3 ช่อง

## 14. TODO

- กำหนด aggro range แยกตามมอนแต่ละชนิด
- กำหนด leash radius ว่า default 3 ช่องใช้กับทุกมอนหรือไม่
- กำหนด boss leash rule แยก
- ทำ prototype มอนไล่ผู้เล่นและกลับจุดเกิดเมื่อเกิน 3 ช่อง
