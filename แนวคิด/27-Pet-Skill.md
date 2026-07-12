# 27-Pet-Skill

> สถานะ: Draft v1

## 1. ภาพรวม

Pet Skill System คือระบบสกิลของสัตว์เลี้ยง สัตว์เลี้ยงต้องเสริมผู้เล่น ไม่ใช่แทนผู้เล่น สกิล pet ช่วยได้ทั้ง combat, support, worker, vision, territory และ utility แต่ต้องมี cap ชัดเจน โดยเฉพาะใน PvP และ Offline Guard

เกมควรมีทั้ง pet ทั่วไปที่หาได้ช่วงต้น และสัตว์เทพหายากที่เป็นเป้าหมายระยะยาว สัตว์เทพมีสกิลแรง เช่น ขังศัตรู หยุด movement หรือป้องกันตาย แต่ผลต้องลดลงใน PvP เพื่อไม่ให้สมดุลพัง

## 2. กฎกลาง Pet Skill

Modifier ตามโหมด:

| Mode | Effect |
| --- | --- |
| PvE | 100% |
| PvP | 50-80% |
| Offline Guard | 40-60% |
| Boss/Elite | แล้วแต่ immune/resist |

กฎ:

- Pet skill ไม่ควรแรงเท่าสกิลผู้เล่น
- Pet ไม่ควรฆ่าผู้เล่นได้ง่าย
- CC จาก pet ต้องสั้นกว่า CC จากผู้เล่น
- Pet ไม่เริ่มสู้เองถ้าเจ้าของไม่อยู่ใน combat ยกเว้น Offline Guard ถูกโจมตี
- Pet ไม่ควรฟาร์ม resource เอง
- สัตว์เทพ active ได้ทีละ 1 ตัว
- สัตว์เทพใช้ใน Offline Guard ไม่ได้ หรือ effect ลดหนักมาก

## 3. ประเภทสกิล

- Attack: ช่วยโจมตี
- Support: heal, shield, cleanse, buff
- Worker: gathering, carry, auto loot
- Vision: มองเห็นศัตรู/resource
- Territory: claim, defend, alert, trap detect
- Utility: ลด cooldown, ลด weight, เพิ่ม resist
- Mythic Control: ขัง, slow field, seal, prison

## 4. Trigger

Pet skill ทำงานตาม trigger:

- เจ้าของโจมตี
- เจ้าของโดนโจมตี
- HP เจ้าของต่ำกว่า 40%
- เจ้าของเริ่ม gather
- เจ้าของเข้า contested zone
- ศัตรูเข้า vision
- เจ้าของกำลัง claim/defend tile
- เจ้าของใช้ Offline Guard แล้วถูกโจมตี

## 5. Cooldown

ค่าแนะนำ:

| Skill Type | Cooldown |
| --- | --- |
| Attack | 8-15 วินาที |
| Heal/Shield | 20-45 วินาที |
| Vision Alert | 30-60 วินาที |
| Gathering Assist | 10-20 วินาที หรือ per action |
| Territory Assist | 30-60 วินาที |
| Mythic Control | 3-10 นาที |
| Rebirth/Death Save | 10-30 นาที |

## 6. Skill Slot ตาม Rarity

| Rarity | Skill |
| --- | --- |
| Common | 1 skill |
| Uncommon | 1 active + 1 passive |
| Rare | 2 skills |
| Epic | 3 skills |
| Legendary | 3 skills + unique passive |
| Mythic/Divine | 3-4 skills + mythic active |

## 7. Pet ชุดแรก

### 7.1 Wolf Cub

ประเภท: Combat

หาได้จาก:

- Gold shop
- quest
- forest monster egg

สกิล:

- Bite: กัดเป้าหมายที่เจ้าของโจมตี ทำ damage เล็กน้อย
- Pack Instinct: ถ้าเจ้าของอยู่ใกล้พันธมิตร pet damage เพิ่มเล็กน้อย

เหมาะกับ:

- Warrior
- Assassin
- ผู้เล่นใหม่สายตี

### 7.2 Fire Imp

ประเภท: Magic Combat

หาได้จาก:

- monster drop
- fire biome
- event

สกิล:

- Spark Bolt: ยิงเวทไฟใส่เป้าหมาย
- Ember Mark: ทำให้เป้าหมายรับ magic damage เพิ่มเล็กน้อยชั่วคราว

เหมาะกับ:

- Mage
- Druid สายเวท

### 7.3 Mini Golem

ประเภท: Tank/Defense

หาได้จาก:

- cave/stone monster drop
- crafting

สกิล:

- Stone Guard: ให้ shield เล็กน้อยแก่เจ้าของ
- Heavy Body: ลดโอกาส knockback/dismount เล็กน้อย

เหมาะกับ:

- Knight
- Engineer
- สายป้องกัน tile

### 7.4 Spirit Owl

ประเภท: Vision/Support

หาได้จาก:

- Knowledge Token
- forest quest

สกิล:

- Wide Sight: Vision Range +1
- Enemy Ping: แจ้งเตือนศัตรูต่างเมืองในระยะสั้น

เหมาะกับ:

- Archer
- Scout build
- territory defense

### 7.5 Light Wisp

ประเภท: Support

หาได้จาก:

- Knowledge Token
- support quest

สกิล:

- Small Heal: ฮีลเจ้าของเล็กน้อยเมื่อ HP ต่ำกว่า 40%
- Purify Flicker: ลด duration debuff เล็กน้อย

เหมาะกับ:

- Priest
- Druid
- solo player

### 7.6 Miner Mole

ประเภท: Worker

หาได้จาก:

- mining quest
- cave biome

สกิล:

- Ore Sense: เพิ่มโอกาสพบ ore node หรือ rare ore เล็กน้อย
- Dig Assist: Mining yield +เล็กน้อย

เหมาะกับ:

- farmer
- crafter
- Engineer

### 7.7 Herb Sprite

ประเภท: Worker/Alchemy

หาได้จาก:

- herb biome
- alchemy quest

สกิล:

- Herb Sense: เห็น herb node ไกลขึ้น
- Fresh Pick: Herb yield +เล็กน้อย

เหมาะกับ:

- potion crafter
- Druid

### 7.8 Little Boar

ประเภท: Carry/Worker

หาได้จาก:

- Gold shop
- farm quest

สกิล:

- Pack Helper: carry capacity +เล็กน้อย
- Forage: เพิ่มโอกาสได้ resource เพิ่มจาก gathering

เหมาะกับ:

- resource farmer
- trader

### 7.9 Watch Raven

ประเภท: Territory/Vision

หาได้จาก:

- City Token
- city mission

สกิล:

- Border Alert: แจ้งเตือนเมื่อศัตรูเข้าใกล้ tile ที่เจ้าของยืน
- Sharp Eye: เพิ่ม accuracy เล็กน้อยใน PvP/defense

เหมาะกับ:

- Archer
- Knight
- คนเฝ้า territory

### 7.10 Crystal Beetle

ประเภท: Territory/Claim

หาได้จาก:

- City Token
- crystal node event

สกิล:

- Aether Grip: claim progress +เล็กน้อย
- Core Sense: เพิ่มผลตอนซ่อมหรือโจมตี claim core เล็กน้อย

เหมาะกับ:

- Engineer
- territory build

### 7.11 Bubble Slime

ประเภท: Defensive/Beginner

หาได้จาก:

- beginner quest
- Gold shop

สกิล:

- Soft Shield: ลด damage ครั้งถัดไปเล็กน้อย
- Item Nudge: auto loot ระยะใกล้

เหมาะกับ:

- ผู้เล่นใหม่

### 7.12 Thunder Kit

ประเภท: PvP Utility

หาได้จาก:

- Blood Drop
- PvP reward

สกิล:

- Static Bite: โจมตีเล็กน้อยและลด Action Speed ชั่วคราว
- Quick Reflex: ลด disengage penalty เล็กน้อย

เหมาะกับ:

- PvP build
- Archer
- Assassin

## 8. สัตว์เทพหายาก

สัตว์เทพเป็น pet ระดับ Mythic/Divine หาได้ยากมาก เป็นเป้าหมายระยะยาว ไม่ควรซื้อ power ตรงด้วย Diamond

กฎ:

- active ได้ทีละ 1 ตัว
- mythic skill cooldown ยาว
- PvP effect ลดลงมาก
- Offline Guard ใช้ mythic control ไม่ได้ หรือ effect ลดหนัก
- มี counter เช่น cleanse, break shield, CC immunity, cage HP

### 8.1 Chrono Seraph

ธีม: เวลา

หาได้จาก:

- Time Fragment 100 ชิ้น
- world event
- time boss

สกิล:

- Time Cage: ขังเป้าหมายไม่ให้เดิน
  - PvE: 10 วินาที
  - PvP: 3 วินาที
  - ถ้าโดนโจมตีเกินจำนวนหนึ่ง cage แตก
- Slow Field: ลด movement ศัตรูในพื้นที่ 3x3
- Rewind Spark: ฟื้น HP ย้อนกลับเล็กน้อยให้เจ้าของ

### 8.2 Abyss Fenrir

ธีม: สงครามและการล่า

หาได้จาก:

- Blood Drop rank สูง
- World Boss Fang

สกิล:

- Blood Hunt: mark ศัตรู ถ้าศัตรูหนีออกระยะจะถูก slow
- Savage Lock: กัดตรึงเป้าหมาย
  - PvE: 8 วินาที
  - PvP: 2.5 วินาที
- War Howl: เพิ่ม damage พันธมิตรใกล้ ๆ ใน PvP zone เล็กน้อย

### 8.3 Celestial Dragonling

ธีม: มังกรสวรรค์

หาได้จาก:

- Dragon Shard
- raid boss
- center boss

สกิล:

- Dragon Seal: ปิดการใช้ mobility skill ชั่วคราว
  - PvE: 10 วินาที
  - PvP: 3 วินาที
- Aether Breath: โจมตี line 3 ช่อง
- Royal Presence: เพิ่ม resistance ต่อ fear/stun/slow ให้เจ้าของ

### 8.4 World Turtle

ธีม: ป้องกันและโลกโบราณ

หาได้จาก:

- City Project
- Ancient Shell Fragment

สกิล:

- Earth Prison: สร้างกำแพงล้อมช่องเป้าหมาย
  - PvE: 10 วินาที
  - PvP: 3 วินาที หรือกำแพงมี HP ให้ตีแตก
- Fortress Aura: เพิ่ม Defense Power ตอนป้องกัน tile
- Supply Shell: เพิ่ม carry capacity สูงมาก

### 8.5 Phoenix

ธีม: ไฟและการเกิดใหม่

หาได้จาก:

- legendary egg
- world boss
- event

สกิล:

- Rebirth Flame: กันตาย 1 ครั้งแบบ HP เหลือน้อยมาก
  - PvP cooldown 10-30 นาที
- Flame Ring: ทำ damage รอบตัว 3x3
- Purifying Fire: ล้าง debuff บางชนิด

### 8.6 Void Lynx

ธีม: เงาและมิติ

หาได้จาก:

- Center Zone rare spawn
- void fragment

สกิล:

- Void Snare: ขังเป้าหมายในเงา
  - PvE: 7-10 วินาที
  - PvP: 2 วินาที
- Phase Step: ลด disengage penalty ให้เจ้าของ
- Shadow Reveal: มองเห็น stealth ระยะสั้น

### 8.7 Crystal Leviathan

ธีม: น้ำและคริสตัล

หาได้จาก:

- water raid
- Crystal Core

สกิล:

- Crystal Bind: root เป้าหมาย
  - PvE: 8 วินาที
  - PvP: 2.5 วินาที
- Tide Shield: โล่ดูด damage
- Resource Resonance: เพิ่ม rare crystal yield เล็กน้อย

## 9. Mythic Control Rule

สกิลขัง/หยุดเดินต้องมี rule กลาง:

```text
PvE: 7-10 วินาที
PvP: 2-4 วินาที
Territory Object: 5 วินาที
Offline Guard: ไม่ใช้ หรือ effect 20-30%
```

Counter:

- Cleanse
- CC immunity หลังโดนซ้ำ
- cage มี HP ให้ตีแตก
- boss resist
- diminishing return

## 10. Acquisition Summary

| Pet | Source | Currency/Material |
| --- | --- | --- |
| Wolf Cub | shop/quest | Gold |
| Fire Imp | monster/event | drop |
| Mini Golem | cave/craft | material |
| Spirit Owl | knowledge shop | Knowledge Token |
| Light Wisp | knowledge/support quest | Knowledge Token |
| Miner Mole | mining quest | Gold/material |
| Herb Sprite | herb quest | material |
| Little Boar | shop/quest | Gold |
| Watch Raven | city shop | City Token |
| Crystal Beetle | city/crystal event | City Token |
| Bubble Slime | beginner/shop | Gold |
| Thunder Kit | PvP shop | Blood Drop |
| Chrono Seraph | time event | Time Fragment |
| Abyss Fenrir | PvP/boss | Blood Drop + Boss Fang |
| Celestial Dragonling | raid/center boss | Dragon Shard |
| World Turtle | city project | Ancient Shell Fragment |
| Phoenix | event/world boss | Legendary Egg |
| Void Lynx | center rare spawn | Void Fragment |
| Crystal Leviathan | water raid | Crystal Core |

## 11. UI/UX

Pet skill UI ควรแสดง:

- skill name
- trigger
- cooldown
- PvE effect
- PvP effect
- Offline Guard effect
- counter/cap
- rarity requirement

สำหรับสัตว์เทพ:

- แสดง warning ว่า PvP effect ลดลง
- แสดง cooldown ใหญ่ชัดเจน
- แสดง fragment/source ที่ต้องใช้

## 12. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- pet_skill_templates
- pet_skill_effects
- pet_skill_triggers
- pet_skill_cooldowns
- pet_skill_mode_modifiers
- pet_skill_counters
- pet_skill_unlocks
- pet_mythic_sources
- pet_skill_usage_logs

## 13. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /pets/:id/skills`
- `POST /pets/:id/skills/equip`
- `POST /pets/:id/skills/upgrade`
- `GET /pet-skills`

Realtime Events:

- `pet_skill:triggered`
- `pet_skill:cooldown_started`
- `pet_skill:effect_applied`
- `pet_skill:countered`
- `pet_skill:expired`
- `pet_mythic:activated`

## 14. Edge Cases

- pet CC ซ้อนกับ player CC จนศัตรูขยับไม่ได้
- pet heal หลายตัวทำให้ party ตายยากเกิน
- pet vision หลายตัวเปิด map กว้างเกินไป
- mythic pet ถูกใช้ใน Offline Guard แล้วโกงเกิน
- Phoenix กันตายซ้อนกับ skill กันตายอื่น
- Time Cage ใช้กับผู้เล่นที่กำลังเข้า safe zone
- World Turtle สร้างกำแพง block ผู้เล่นใหม่
- pet auto loot เก็บของผิดเจ้าของ

## 15. TODO

- กำหนด pet skill id จริง
- กำหนดตัวเลข damage/heal/bonus จริง
- กำหนด PvP modifier ต่อ pet skill
- กำหนด mythic cooldown จริง
- กำหนด fragment source ของสัตว์เทพ
- เชื่อมกับ `26-Pet-System.md`
- เชื่อมกับ `42-PvP-System.md`
- เชื่อมกับ `32-Economy.md`
