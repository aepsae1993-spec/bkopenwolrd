# 12-Level-System

> สถานะ: Draft v1

## 1. ภาพรวม

Level System คือระบบเติบโตหลักของตัวละคร ทำให้ผู้เล่นรู้สึกว่าเล่นแล้วแข็งแกร่งขึ้น เปิดระบบใหม่ได้ และไปพื้นที่ที่ยากขึ้นได้ ใน EduQuest Online เลเวลต้องรองรับทั้ง RPG combat และ world map territory war

เลเวลไม่ควรได้จากการตีมอนอย่างเดียว แต่ควรมาจากการเล่นหลายแบบ:

- ต่อสู้กับมอนสเตอร์
- ทำ quest
- ฟาร์มทรัพยากร
- คราฟของ
- ยึดพื้นที่
- ป้องกันพื้นที่
- เข้าร่วม PvP/city mission
- ตอบคำถามถูกใน action สำคัญ

## 2. เป้าหมายของระบบ

- ให้ progression ระยะสั้นและระยะยาว
- ทำให้ผู้เล่นใหม่รู้สึกโตเร็วในช่วงแรก
- เปิดระบบหลักตามเลเวลอย่างเป็นธรรมชาติ
- รองรับผู้เล่นหลายสาย เช่น combat, gather, craft, territory, PvP
- ลดปัญหาปั๊ม EXP จาก PvP หรือ territory
- ทำงานร่วมกับ class, skill, stat, equipment, pet, mount และ knowledge mastery

## 3. ประเภทเลเวล

แนะนำให้มีเลเวลหลายชั้น แต่ MVP ควรเริ่มง่ายก่อน

### 3.1 Character Level

เลเวลหลักของตัวละคร

ใช้สำหรับ:

- เพิ่ม stat พื้นฐาน
- เพิ่ม stat point
- เพิ่ม skill point
- ปลดล็อกระบบ
- เข้า zone/dungeon บางระดับ
- ใส่อุปกรณ์ระดับสูงขึ้น

### 3.2 Class Level หรือ Class Mastery

ความชำนาญอาชีพ

ใช้สำหรับ:

- ปลดล็อกสกิลเฉพาะอาชีพ
- เพิ่ม passive
- เปิด ultimate/awakening

หมายเหตุ:

- MVP อาจยังไม่ต้องแยก class level เพื่อไม่ให้ซับซ้อน
- ถ้าเริ่มง่าย ให้ใช้ Character Level ก่อน แล้วค่อยเพิ่ม Class Mastery ภายหลัง

### 3.3 Life Skill Level

เลเวลสายฟาร์ม/คราฟ เช่น Mining, Woodcutting, Fishing, Crafting

ใช้สำหรับ:

- เพิ่มโอกาสเก็บ resource ดีขึ้น
- ใช้เครื่องมือระดับสูง
- craft item ระดับสูง

รายละเอียดควรไปอยู่ใน `30-LifeSkill.md` และ `31-Crafting.md`

### 3.4 Knowledge Mastery

ไม่ใช่ character level โดยตรง แต่เป็น progression คู่ขนานจากการตอบคำถาม

ใช้สำหรับ:

- เพิ่ม bonus จากคำถาม
- ปลดล็อก quest, skill, equipment บางอย่าง
- ranking ด้านความรู้

รายละเอียดอยู่ใน `34-Knowledge-System.md`

## 4. Level Cap

ค่าแนะนำ:

- MVP: Level 30
- Early Access: Level 60
- Full Launch: Level 100
- Expansion/Season: เพิ่ม cap ตาม content

เหตุผล:

- Level 30 พอสำหรับทดสอบ combat, equipment, skill, PvP, territory และ mount
- ไม่ควรเริ่มด้วย cap สูงเกิน เพราะ balance จะยาก
- Endgame แรกควรอยู่ที่ territory war, center zone และ equipment progression มากกว่า grind level ยาว

## 5. EXP Sources

### 5.1 Monster EXP

ได้จากการฆ่ามอนสเตอร์

ควรขึ้นกับ:

- monster level
- monster rarity
- zone difficulty
- party contribution
- level difference ระหว่างผู้เล่นกับมอน

### 5.2 Quest EXP

ได้จาก main quest, daily quest, city mission, dungeon quest

ใช้สำหรับ:

- ดันผู้เล่นใหม่ให้โตตามทาง
- สอนระบบ
- ให้รางวัลกิจกรรมที่ไม่ใช่ตีมอน

### 5.3 Resource EXP

ได้จาก gathering เช่น ตัดไม้ ขุดแร่ เก็บสมุนไพร ตกปลา

หลักการ:

- ให้ EXP น้อยกว่า combat แต่สม่ำเสมอ
- ให้ life skill EXP แยกด้วยในอนาคต
- resource หายากให้ EXP มากขึ้น

### 5.4 Craft EXP

ได้จากคราฟสำเร็จ

หลักการ:

- ให้ EXP ตาม rarity และ difficulty ของสูตร
- ป้องกันการคราฟ item ง่ายซ้ำเพื่อปั๊ม EXP
- ควรมี diminishing return สำหรับสูตรที่ต่ำกว่าเลเวลมาก

### 5.5 Territory EXP

ได้จากการยึดหรือป้องกันพื้นที่

ตัวอย่าง:

- เริ่ม claim tile
- ทำ claim progress
- ยึด tile สำเร็จ
- ป้องกัน tile จากมอนหรือผู้เล่น
- ส่ง resource ให้เมืองเพื่อสร้าง outpost

หลักการ:

- ให้ตาม contribution จริง
- มี daily/weekly cap บางส่วนเพื่อกันปั๊ม
- พื้นที่ contested หรือใกล้ center ให้ reward มากกว่า
- ไม่ควรให้ EXP จากการยืนเฉย ๆ

### 5.6 PvP EXP

ได้จากการเข้าร่วม PvP แบบมีเงื่อนไข

ให้ EXP จาก:

- ชนะผู้เล่นต่างเมืองใน contested zone
- assist
- ป้องกัน tile สำเร็จ
- ชนะใน city mission หรือ battleground

ข้อควรระวัง:

- ต้องมี anti-farm rule
- ฆ่าผู้เล่นคนเดิมซ้ำควรได้ EXP ลดลง
- level difference สูงเกินควรลด reward
- tutorial PvP ควรให้ reward แยก ไม่ใช่ EXP หลัก

### 5.7 Quiz Bonus EXP

การตอบคำถามถูกให้ bonus EXP

หลักการ:

- เป็น bonus จาก action ไม่ใช่แหล่ง EXP หลัก
- ตอบถูกตอนตีมอน เพิ่ม EXP เล็กน้อย
- ตอบถูกตอน claim เพิ่ม contribution หรือ claim speed
- ตอบถูกตอน gather เพิ่ม resource/EXP เล็กน้อย

## 6. สูตร EXP เบื้องต้น

### 6.1 Required EXP ต่อเลเวล

สูตรเบื้องต้น:

```text
required_exp(level) = floor(100 * level^1.45)
```

ตัวอย่าง:

| Level | EXP ไปเลเวลถัดไป |
| --- | --- |
| 1 | 100 |
| 2 | 273 |
| 5 | 1,030 |
| 10 | 2,818 |
| 20 | 7,696 |
| 30 | 13,814 |

หมายเหตุ:

- สูตรนี้เป็นค่าเริ่มต้น ต้องปรับหลังทดสอบ
- ช่วง 1-10 ควรเร็ว
- ช่วง 20-30 ควรเริ่มใช้เวลาเพื่อให้ผู้เล่นทดลองระบบอื่น

### 6.2 Monster EXP

```text
monster_exp = base_exp * level_factor * rarity_factor * zone_factor
```

ตัวอย่าง factor:

- normal: 1.0
- elite: 2.5
- mini boss: 8.0
- boss: 25.0

### 6.3 Level Difference Modifier

```text
level_diff = monster_level - player_level
```

| Difference | EXP Modifier |
| --- | --- |
| -10 หรือต่ำกว่า | 0.1 |
| -5 | 0.5 |
| 0 | 1.0 |
| +3 | 1.2 |
| +5 | 1.4 |
| +8 ขึ้นไป | 1.5 |

หลักการ:

- กันผู้เล่นเลเวลสูงกลับไปฟาร์มมอนง่าย
- ให้รางวัลเพิ่มเล็กน้อยเมื่อสู้ของยากกว่า

### 6.4 Territory EXP

```text
territory_exp = base_tile_exp * zone_factor * contribution_ratio
```

ตัวอย่าง:

- Starter/Farm zone: 0.5x
- Frontier: 1.0x
- Contested: 1.5x
- Central: 2.5x

### 6.5 Quiz Bonus

```text
final_exp = action_exp * (1 + quiz_bonus)
```

ค่าเริ่มต้น:

- ตอบถูกง่าย: +3%
- ตอบถูกปานกลาง: +5%
- ตอบถูกยาก: +8%
- ตอบถูก Expert: +12%

ข้อจำกัด:

- quiz bonus ต่อ action ไม่ควรเกิน +15% ในช่วงแรก
- Knowledge Mastery อาจเพิ่ม bonus ได้อีกเล็กน้อย แต่ต้องมี cap

## 7. Level Reward

เมื่อ level up ผู้เล่นควรได้รับ:

- stat เพิ่มอัตโนมัติ
- stat point
- skill point
- HP/MP refill บางส่วนหรือเต็ม
- unlock ระบบหรือ content
- notification และ visual feedback

ตัวอย่าง:

| Level | Reward/Unlock |
| --- | --- |
| 2 | Skill point แรก |
| 3 | Inventory tutorial complete |
| 5 | Territory claim unlock |
| 7 | PvP warning/tutorial |
| 10 | Mount quest |
| 15 | Dungeon entry |
| 20 | Guild unlock |
| 25 | Center path mission |
| 30 | MVP level cap/endgame loop |

## 8. Stat Point

ค่าเริ่มต้น:

- ได้ 3 stat points ต่อ level
- ทุก 5 level ได้ bonus 2 stat points
- บาง quest หรือ achievement อาจให้เพิ่มได้

Stat ที่อัปได้:

- Strength
- Intelligence
- Vitality
- Agility
- Dexterity
- Wisdom

ตัวอย่างผล:

- Strength เพิ่ม Attack/Carry
- Intelligence เพิ่ม Magic Attack/MP
- Vitality เพิ่ม HP/Defense
- Agility เพิ่ม Dodge/Movement utility
- Dexterity เพิ่ม Accuracy/Critical/Gathering
- Wisdom เพิ่ม MP Regen/Knowledge bonus/Support

หมายเหตุ:

- รายละเอียดสูตรอยู่ใน `13-Stat-System.md`
- MVP อาจใช้ auto stat ตาม class ก่อน แล้วเปิด manual stat ภายหลัง

## 9. Skill Point

ค่าเริ่มต้น:

- ได้ 1 skill point ทุก level
- ทุก 5 level ได้ bonus skill point
- บาง skill ต้องใช้ Knowledge Mastery หรือ class requirement

ใช้สำหรับ:

- ปลดล็อก active skill
- เพิ่ม level skill
- ปลด passive
- เตรียม ultimate/awakening ในอนาคต

รายละเอียดอยู่ใน `17-Skill-System.md`

## 10. Level Unlock Flow

ระบบควรค่อย ๆ เปิดตามเลเวล:

1. Level 1-4: movement, quiz, combat, inventory
2. Level 5-9: territory claim, defense, resource loop
3. Level 10-14: mount, city mission, better equipment
4. Level 15-19: dungeon, party content
5. Level 20-24: guild, advanced crafting
6. Level 25-30: contested zone, center path, world boss preview

หลักการ:

- ระบบใหญ่ไม่ควรเปิดพร้อมกันตั้งแต่นาทีแรก
- ผู้เล่นควรรู้สึกว่าทุก 5 level มีอะไรใหม่
- ถ้าผู้เล่นไม่ได้ทำ main quest แต่ level ถึง ควร unlock ระบบสำคัญได้อยู่

## 11. Party EXP

ถ้าเล่นเป็น party:

- EXP แบ่งตาม contribution
- ผู้เล่นที่อยู่ไกลเกินไปไม่ควรได้ EXP
- healer/support ต้องได้ contribution จากการช่วย ไม่ใช่เฉพาะ damage
- party bonus เล็กน้อยเพื่อส่งเสริม social play

ตัวอย่าง:

```text
party_exp = monster_exp * party_bonus
party_bonus = 1 + min(0.05 * (party_size - 1), 0.20)
```

## 12. Anti-Farm Rules

ต้องป้องกันการปั๊มเลเวล:

- ฆ่าผู้เล่นเดิมซ้ำ EXP ลดลง
- PvP ระหว่าง account/IP/party เดิมต้องตรวจจับ
- monster level ต่ำเกินไป EXP ลด
- craft สูตรเดิมซ้ำต่ำกว่าเลเวลมาก EXP ลด
- claim tile สลับกันยึดไปมาโดยกลุ่มเดิม EXP ลด
- AFK บน tile ไม่ควรได้ EXP

## 13. UI/UX

Level UI ควรแสดง:

- level ปัจจุบัน
- EXP bar
- EXP ที่ต้องใช้ไป level ถัดไป
- reward ถัดไป
- unlock ถัดไป
- stat point คงเหลือ
- skill point คงเหลือ

เมื่อ level up:

- มี visual effect
- แสดง stat ที่เพิ่ม
- แสดง skill/stat point ที่ได้รับ
- แสดงระบบใหม่ที่ unlock
- มีปุ่มไปอัป stat/skill

## 14. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- character_levels
- character_exp_logs
- level_curves
- level_rewards
- level_unlocks
- stat_point_logs
- skill_point_logs
- exp_sources
- anti_farm_counters

## 15. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /characters/:id/level`
- `GET /levels/curve`
- `GET /levels/rewards`
- `POST /characters/:id/allocate-stat`
- `POST /characters/:id/allocate-skill`

Server/Internal:

- `grantExp(characterId, source, amount, metadata)`
- `calculateRequiredExp(level)`
- `checkLevelUp(characterId)`
- `grantLevelReward(characterId, level)`
- `applyExpAntiFarmRules(characterId, source, metadata)`

Realtime Events:

- `exp:gained`
- `character:level_up`
- `level:reward_granted`
- `level:unlock_available`
- `stat_points:changed`
- `skill_points:changed`

## 16. Edge Cases

- ได้ EXP จำนวนมากจนขึ้นหลาย level พร้อมกัน
- level up ระหว่าง combat
- level up แล้วตายพร้อมกัน
- EXP จาก PvP ถูกปั๊มโดยผู้เล่นกลุ่มเดิม
- quest reward ให้ EXP เกิน cap
- level cap แล้ว EXP ควรไปไหน
- party contribution นับผิด
- disconnect ก่อนรับ level reward
- rollback หลัง server crash

## 17. TODO

- ตัดสินใจ MVP level cap เป็น 30 หรือไม่
- ทำ EXP table จริง Level 1-30
- กำหนด EXP จาก monster/resource/claim/quest ช่วงแรก
- กำหนด level unlock ทุก 5 level
- ตัดสินใจ auto stat หรือ manual stat สำหรับ MVP
- กำหนด anti-farm rule สำหรับ PvP และ territory
- เชื่อม level reward กับ skill/equipment/mount unlock
