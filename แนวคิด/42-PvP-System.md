# 42-PvP-System

> สถานะ: Draft v1

## 1. ภาพรวม

PvP System คือระบบต่อสู้ระหว่างผู้เล่นบน world map แบบช่องตาราง PvP ของ EduQuest Online ไม่ใช่แค่โหมดประลอง แต่เป็นหัวใจของสงครามยึดพื้นที่ ผู้เล่นต่างเมืองต้องต่อสู้เพื่อป้องกัน tile เปิดทางให้ทีม claim ขัดขวางศัตรู และควบคุมเส้นทางเข้าสู่ศูนย์กลางแผนที่

แกน PvP:

> เห็นศัตรูบนตาราง -> เลือกตำแหน่ง -> ใช้สกิลตามระยะช่อง -> ติด Combat Lock -> ฆ่า/ไล่ศัตรูออกจาก tile -> ยึดหรือป้องกันพื้นที่

## 2. เป้าหมายของระบบ

- ทำให้ PvP อ่านง่ายจากตำแหน่งบนตาราง
- ทำให้ class, skill, stat และ equipment มีความหมาย
- ป้องกันการตีแล้วหนีทันทีด้วย Combat Lock
- รองรับ browser disconnect และการปิดเว็บกลางคัน
- รองรับ Offline Guard
- เชื่อมกับ territory claim และ city contribution
- ลดการ grief ผู้เล่นใหม่และการปั๊ม reward

## 3. PvP Zone

### 3.1 Safe Zone

พื้นที่เมืองเกิดและจุดเริ่มต้น

กฎ:

- ห้าม PvP
- safe logout ได้
- mount ใช้ได้ตามปกติ
- เหมาะกับผู้เล่นใหม่ ร้านค้า crafting storage

### 3.2 Farm Zone

พื้นที่ฟาร์มรอบเมือง

กฎ:

- PvP ปิดหรือจำกัดมาก
- อาจมี duel/training เท่านั้น
- ใช้ป้องกันผู้เล่นใหม่จากการโดนดักตี

### 3.3 Frontier Zone

พื้นที่ระหว่าง farm zone กับ contested zone

กฎ:

- PvP เปิดบางส่วนหรือมี warning
- อาจมี protection ผู้เล่นใหม่
- ใช้สอนความเสี่ยงก่อนเข้าสงครามจริง

### 3.4 Contested Zone

พื้นที่แย่งชิงหลัก

กฎ:

- PvP เปิดเต็ม
- ผู้เล่นต่างเมืองโจมตีกันได้
- ใช้ territory claim/defense ได้เต็มระบบ
- Offline Guard ทำงานได้

### 3.5 Center Zone

พื้นที่กลางแผนที่ รางวัลสูง ความเสี่ยงสูง

กฎ:

- PvP เปิดเต็ม
- reward/contribution สูงกว่า
- world boss, rare resource, event และ city objective อยู่ที่นี่

## 4. Target และ Faction Rule

กฎการโจมตี:

- ผู้เล่นต่างเมืองตีได้ใน PvP zone
- ผู้เล่นเมืองเดียวกันตีไม่ได้ ยกเว้น duel/training mode
- party/guild ไม่ควร override เมืองใน territory war
- Offline Guard ของเมืองศัตรูถือเป็น target ได้
- NPC/monster ใช้ combat rule แยกใน `16-Combat-System.md`

ข้อแนะนำ:

- เมืองเกิดควรสำคัญกว่า guild ในสงครามยึดพื้นที่
- ถ้าผู้เล่นต่างเมืองอยู่ guild เดียวกัน ยังควรเป็นศัตรูใน contested/center zone เพื่อไม่ทำลายระบบ 4 เมือง

## 5. Grid PvP Flow

ขั้นตอน PvP:

1. ผู้เล่นเห็นศัตรูใน Vision Range
2. เลือก skill หรือ basic attack
3. UI highlight ช่องที่ใช้สกิลได้
4. Server เช็ก zone, faction, range, Line of Sight, cooldown, resource
5. ถ้าถูกต้อง สกิลเริ่มทำงาน
6. ผู้ใช้และเป้าหมายติด Combat Lock 20 วินาที
7. ถ้ามี cast time เป้าหมายอาจขยับหรือใช้สกิลสวน
8. สกิล resolve และคำนวณ hit/damage/effect
9. ทั้งสองฝ่ายใช้สกิล เดิน ถอย หรือป้องกันต่อ
10. ถ้า HP เหลือ 0 ตายและ respawn กลับเมืองเกิด
11. ฝ่ายที่ชนะสามารถ claim/defend tile ต่อได้

## 6. Combat Lock

Combat Lock คือสถานะกันตีแล้วหนี

Trigger:

- โจมตีผู้เล่น
- โดนผู้เล่นโจมตี
- ใช้ hostile skill
- ใช้ territory combat skill
- โจมตี Offline Guard
- Offline Guard สวนกลับ

ค่าเริ่มต้น:

```text
Combat Lock = 20 วินาที
```

กฎ:

- timer refresh ทุกครั้งที่มี combat action ใหม่
- Safe Logout ไม่ได้
- ขึ้น mount ไม่ได้ หรือ mount ถูกยกเลิก
- ปิดเว็บแล้วตัวละครไม่หาย
- เข้า safe zone แล้วอาจยังติด combat lock จนครบเวลา
- ถ้าไม่มี combat action ครบ 20 วินาที จึงหลุด combat

## 7. Cooldown และ Action Timing

ไม่ควรให้ทุกการโจมตี cooldown 20 วินาที เพราะ PvP จะช้าเกินไป ให้ใช้ Combat Lock 20 วินาทีแทน

ค่าแนะนำ:

| Action | Cooldown |
| --- | --- |
| Basic Attack | 2 วินาที |
| Light Skill | 5-8 วินาที |
| Heavy Skill | 12-20 วินาที |
| Mobility Skill | 15-25 วินาที |
| Territory Skill | 20-60 วินาที |
| Ultimate | 60-180 วินาที |

Movement Delay หลังโจมตี:

- สกิลเบา: 0.5-1 วินาที
- สกิลหนัก: 1-2 วินาที
- สกิลร่าย: ขยับไม่ได้ระหว่าง cast

## 8. Movement และ Disengage

นอก combat:

- เดินตาม Energy และ movement range ปกติ
- mount ใช้ได้ถ้า zone อนุญาต

ระหว่าง Combat Lock:

- ยังเดินได้ แต่ safe logout/mount ถูกจำกัด
- ถ้าโดนประชิด ต้องใช้กฎ Zone of Control

Zone of Control:

- ถ้าศัตรูอยู่ช่องติดกัน 1 ช่อง ถือว่าโดนประชิด
- การถอยออกอาจใช้ Energy เพิ่ม
- ถ้าไม่มีสกิล disengage อาจโดน Opportunity Attack

ตัวอย่าง:

- Archer ถูกประชิด ถอยออกยากขึ้น
- Knight ทำให้ศัตรูออกจาก Guard Zone ยากขึ้น
- Assassin/Mage มี mobility skill เพื่อหลุดตำแหน่ง

## 9. Range และ Line of Sight

ทุกสกิลต้องตรวจ:

- range
- target pattern
- Line of Sight
- blocked tile
- safe/protected boundary

ตัวอย่าง:

- Melee: 1 ช่อง
- Archer: 3 ช่อง ต้องมี Line of Sight
- Mage: 2-3 ช่อง หรือ AoE 3x3
- Priest: heal/buff 3 ช่อง
- Engineer: device/trap ช่องติดกัน

## 10. Quiz Bonus ใน PvP

Quiz เป็น bonus ไม่ใช่ตัวตัดสินทั้งหมด

ตัวอย่าง:

- damage +5-10%
- accuracy เพิ่มเล็กน้อย
- heal/shield เพิ่ม
- claim/defense progress เพิ่ม
- cooldown ลดเล็กน้อยในบางสกิล

กฎ:

- PvP quiz bonus ควรเบากว่า PvE
- ตอบผิดยังใช้สกิลได้ แต่ไม่ได้ bonus หรือผลลดเล็กน้อย
- bonus ต้องมี cap ตาม `13-Stat-System.md`
- ห้ามทำให้ผู้เล่นที่ตอบคำถามเก่งชนะ PvP โดยไม่ต้องสนตำแหน่ง/stat/skill

## 11. Browser Disconnect และปิดเว็บกลางคัน

เกมเล่นบน browser จึงต้องรองรับ:

- ปิดแท็บ
- ปิดเว็บ
- refresh
- browser crash
- เน็ตหลุด
- มือถือปัดปิดแอป

กฎ:

- ถ้าติด Combat Lock ตัวละครยังอยู่ในโลก
- server ใช้ Default Logout Mode + combat state ตัดสิน
- reconnect ภายใน Reconnect Window กลับมาคุมตัวเดิม
- ถ้าตายระหว่างหลุด กลับมาแล้วอยู่เมืองเกิด
- ถ้าไม่ติด combat และอยู่ safe zone สามารถ safe logout ได้

ค่าแนะนำ:

```text
Reconnect Window = 60 วินาที
Safe Logout Delay นอก safe zone = 10-30 วินาที
Combat Lock Logout = อยู่ในโลกอย่างน้อย 20 วินาที และจนกว่า combat lock หมด
```

## 12. Offline Guard ใน PvP

Offline Guard คือผู้เล่นออกเกมแต่เลือกให้ตัวละครยังยืนบน tile เดิม

กฎ:

- ตัวละครยังเห็นบน map
- โดนโจมตีได้
- ใช้สกิลสวนกลับตาม Offline Skill Loadout
- ใช้ Energy/MP/material/cooldown จริง
- ไม่เดินไล่ศัตรูข้าม tile
- ไม่เริ่ม claim ใหม่
- ถ้าตาย respawn กลับเมืองเกิด
- reward/contribution มี cap

Balance:

- offline damage อาจเหลือ 70-85% ของ online
- offline cooldown อาจยาวขึ้น
- CC จาก offline guard ควรสั้นกว่า online
- คนเล่น online ควรได้เปรียบเสมอ

## 13. Death และ Respawn

เมื่อตายใน PvP:

1. HP เหลือ 0
2. combat และ claim action ถูกยกเลิก
3. ตัวละครเข้าสถานะ dead
4. แสดง death summary
5. respawn กลับเมืองเกิด
6. ได้ spawn protection ชั่วคราว

Penalty ที่เป็นไปได้:

- durability ลด
- Energy ลดบางส่วน
- resource บางชนิดตกใน contested/center zone
- respawn cooldown สั้น ๆ

ไม่ควร:

- เสีย equipment ถาวรใน MVP
- เสีย progress หนักเกินจนไม่กล้า PvP

## 14. Territory PvP

PvP เชื่อมกับการยึดพื้นที่โดยตรง

กรณีบุก tile:

1. ผู้เล่นเมือง A เดินเข้าพื้นที่เมือง B
2. ถ้ามีผู้เล่น B ยืนป้องกัน ต้องสู้ก่อน
3. ถ้าผู้เล่น B ตายหรือถอยออก ผู้เล่น A เริ่ม claim ได้
4. ระหว่าง claim ถ้ามีศัตรูกลับมาโจมตี claim ถูกขัดจังหวะ
5. เมื่อ claim progress เต็ม tile เปลี่ยน ownership

บทบาท class:

- Knight: ป้องกัน tile
- Engineer: เร่ง claim/ซ่อม
- Assassin: ขัด claim
- Archer: ยิงคน claim จากระยะ
- Mage: AoE ขัดกลุ่ม
- Priest: ยื้อแนวหน้า
- Druid: slow/root พื้นที่
- Warrior: เปิดทางและฆ่าคนกัน tile

## 15. Reward และ Contribution

แหล่ง reward:

- ฆ่าผู้เล่นศัตรู
- assist
- ป้องกัน tile สำเร็จ
- ขัด claim
- ยึด tile สำเร็จ
- ชนะใกล้ Center Zone
- ทำ city mission

Reward:

- territory contribution
- city influence
- EXP
- gold/resource บางส่วน
- ranking point
- title progress

ข้อจำกัด:

- ฆ่าคนเดิมซ้ำ reward ลด
- level difference สูงเกิน reward ลด
- offline guard reward น้อยกว่า online
- PvP reward ต้องไม่กลายเป็นวิธีปั๊ม EXP หลัก

## 16. Anti-Abuse

ต้องป้องกัน:

- ฆ่ากันเองปั๊ม reward
- account/IP/device เดิมช่วยปั๊ม
- spawn camping
- ตีแล้ววิ่งเข้า safe zone ทันที
- ปิดเว็บหนีตาย
- ใช้ offline guard หลายตัว block choke point
- ใช้ mount หนีหลังเปิดไฟต์
- level สูงไล่ฆ่าผู้เล่นใหม่
- CC lock จนขยับไม่ได้ตลอด

กฎแนะนำ:

- repeat kill diminishing reward
- spawn protection หลังเกิด
- safe zone boundary combat rule
- Combat Lock 20 วินาที
- Mount Lock 20 วินาที
- offline guard duration/cap
- crowd control diminishing return
- new player protection ใน farm/frontier zone

## 17. PvP UI/UX

ควรแสดง:

- PvP zone warning
- enemy city color
- range highlight
- Line of Sight
- invalid target reason
- Combat Lock timer
- Mount Lock
- Safe Logout Lock
- HP/MP/Energy
- skill cooldown
- debuff/buff
- death recap
- reconnect status
- offline guard icon

ข้อความตัวอย่าง:

- You are in a PvP zone.
- Combat locked: 18s
- Cannot mount during combat.
- Safe logout unavailable during combat.
- Enemy out of range.
- Line of sight blocked.

## 18. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- pvp_sessions
- pvp_events
- pvp_damage_logs
- pvp_kill_logs
- pvp_assists
- combat_locks
- pvp_death_logs
- pvp_rewards
- pvp_anti_abuse_flags
- offline_guard_pvp_logs
- disconnect_sessions
- reconnect_sessions

## 19. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /pvp/status`
- `GET /pvp/rules`
- `POST /pvp/attack`
- `POST /pvp/use-skill`
- `POST /pvp/respawn`
- `GET /pvp/death-recap`
- `POST /pvp/reconnect`

Realtime Events:

- `pvp:entered_zone`
- `pvp:left_zone`
- `pvp:started`
- `pvp:ended`
- `pvp:attack_validated`
- `pvp:damage_applied`
- `pvp:player_killed`
- `pvp:assist_granted`
- `combat_lock:started`
- `combat_lock:refreshed`
- `combat_lock:ended`
- `mount_lock:started`
- `safe_logout:blocked`
- `player:disconnected`
- `player:reconnected`
- `offline_guard:attacked`
- `offline_guard:defended`

## 20. Edge Cases

- ผู้เล่นปิดเว็บทันทีหลังโจมตี
- ผู้เล่น reconnect ตอน HP เหลือน้อยหรือกำลังตาย
- ผู้เล่นโดนฆ่าระหว่าง disconnect
- ผู้เล่นวิ่งเข้า safe zone ขณะติด combat lock
- Archer ยิงเป้าหมายที่ขยับออกจาก range
- Mage วาง AoE ตอน tile ownership เปลี่ยน
- Offline Guard ฆ่าผู้เล่น online
- ผู้เล่นหลายคน claim/defend tile เดียวกัน
- combat lock timer ไม่ sync client/server
- reward จาก kill เข้า player ผิดคน
- level สูงฆ่าผู้เล่นใหม่ซ้ำ

## 21. TODO

- กำหนด PvP zone จริงบน world map
- กำหนด safe zone boundary rule
- กำหนด PvP damage modifier
- กำหนด death penalty ต่อ zone
- กำหนด reward/contribution table
- กำหนด repeat kill anti-farm rule
- กำหนด Offline Guard PvP modifier
- ทำ prototype PvP 1v1 บน grid พร้อม Combat Lock
