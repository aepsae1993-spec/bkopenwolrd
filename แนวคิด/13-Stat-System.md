# 13-Stat-System

> สถานะ: Draft v1

## 1. ภาพรวม

Stat System คือพจนานุกรมค่าสถานะกลางของ EduQuest Online ทุกระบบสำคัญต้องอ้างอิง stat ชุดเดียวกัน ไม่ว่าจะเป็น combat, movement บนตาราง, territory claim, equipment, skill, pet, mount, gathering, crafting และ knowledge bonus

เกมนี้ไม่ใช่ RPG ที่มีแค่ HP/Attack/Defense เพราะ world map เป็นช่องตารางและมีการยึดพื้นที่ ดังนั้น stat ต้องรองรับ 5 มิติ:

- Core Attribute
- Combat Stat
- Grid/Movement Stat
- Territory Stat
- Utility/Economy Stat

## 2. เป้าหมายของระบบ

- กำหนดภาษากลางของตัวละคร อาชีพ สกิล อุปกรณ์ และระบบแผนที่
- ทำให้แต่ละอาชีพมีจุดเด่นชัดเจน
- รองรับการต่อสู้บน grid map
- รองรับ Energy, movement, Zone of Control และ Line of Sight
- รองรับการยึดพื้นที่ ป้องกันพื้นที่ และซ่อม outpost
- รองรับการฟาร์ม resource และ crafting
- คุม balance ไม่ให้ stat ใด stat หนึ่งแรงเกิน

## 3. โครงสร้าง Stat

Stat แบ่งเป็น 3 ชั้น:

### 3.1 Base Stat

มาจาก:

- level
- class
- core attribute
- base growth

### 3.2 Bonus Stat

มาจาก:

- equipment
- pet
- mount
- title
- passive skill
- city bonus
- guild bonus

### 3.3 Temporary Modifier

มาจาก:

- skill buff/debuff
- potion
- tile effect
- quiz bonus
- territory effect
- event effect

สูตรรวม:

```text
final_stat = (base_stat + bonus_stat) * temporary_modifier
```

หมายเหตุ:

- บาง stat ควรใช้ additive มากกว่า multiplicative เพื่อกันเลขพุ่ง
- temporary modifier ต้องมี duration และ cap

## 4. Core Attribute

Core Attribute คือค่าหลักที่ผู้เล่นอัปเองหรือได้จาก level/class

| Attribute | บทบาทหลัก |
| --- | --- |
| STR | ดาเมจกายภาพ, carry, เจาะเกราะบางส่วน |
| INT | ดาเมจเวท, MP, skill power |
| VIT | HP, defense, ต้าน crowd control |
| AGI | dodge, disengage, movement utility |
| DEX | accuracy, critical, ยิงไกล, gathering precision |
| WIS | MP regen, heal, support, knowledge bonus |

## 5. Combat Stat

ใช้ในการต่อสู้ PvE และ PvP

### 5.1 HP

พลังชีวิต ถ้าเหลือ 0 ตัวละครตาย

```text
max_hp = base_hp + (VIT * 12) + class_hp_bonus + equipment_hp
```

### 5.2 MP

พลังเวทหรือพลังสกิล

```text
max_mp = base_mp + (INT * 8) + (WIS * 4) + equipment_mp
```

### 5.3 Physical Attack

ใช้กับอาวุธกายภาพและสกิลประชิด/ยิง

```text
physical_attack = weapon_attack + (STR * 2) + (DEX * 0.5) + class_attack_bonus
```

### 5.4 Magic Attack

ใช้กับเวทและสกิล magic

```text
magic_attack = weapon_magic + (INT * 2) + (WIS * 0.5) + class_magic_bonus
```

### 5.5 Physical Defense

ลด damage กายภาพ

```text
physical_defense = armor_defense + (VIT * 1.5) + (STR * 0.5)
```

### 5.6 Magic Defense

ลด damage เวท

```text
magic_defense = armor_magic_defense + (WIS * 1.5) + (INT * 0.5)
```

### 5.7 Accuracy

โอกาสโจมตีโดน

```text
accuracy = base_accuracy + (DEX * 1.5) + equipment_accuracy
```

### 5.8 Dodge

โอกาสหลบ

```text
dodge = base_dodge + (AGI * 1.2) + equipment_dodge
```

### 5.9 Critical Rate

โอกาสติดคริติคอล

```text
critical_rate = base_crit + (DEX * 0.15%) + equipment_crit
```

### 5.10 Critical Damage

ความแรงคริติคอล

```text
critical_damage = 150% + equipment_crit_damage + skill_bonus
```

### 5.11 Block Rate / Block Power

เหมาะกับ Knight หรืออุปกรณ์โล่

```text
block_rate = shield_block + (VIT * 0.08%)
block_power = shield_power + (STR * 0.3)
```

### 5.12 Action Speed

มีผลกับ cooldown หรือจังหวะ action ใน combat

```text
action_speed = base_action_speed + (AGI * 0.2%) + equipment_speed
```

## 6. Grid และ Movement Stat

ใช้กับการเดินบนตารางหมากรุก

### 6.1 Energy

ค่าที่ใช้เดินบน world map

```text
max_energy = base_energy + floor(AGI * 0.3) + equipment_energy + mount_energy_bonus
```

ค่าเริ่มต้นที่แนะนำ:

- base_energy = 20
- เดิน 1 ช่องใช้ Energy 1
- ตอบคำถามถูกเพิ่มระยะเดิน ไม่ใช่เพิ่ม Energy โดยตรง

### 6.2 Energy Regen

```text
energy_regen = base_regen + equipment_regen + city_buff
```

ตัวอย่าง:

- ฟื้น 1 Energy ทุก 3-5 นาที
- potion หรืออาหารช่วยฟื้นเร็วขึ้น
- safe zone อาจฟื้นเร็วกว่า contested zone

### 6.3 Movement Range

จำนวนช่องที่เดินได้ต่อ movement action

ค่าเริ่มต้น:

| สถานะ | ระยะเดิน |
| --- | --- |
| ปกติ | 1 ช่อง |
| ตอบคำถามถูก | 2 ช่อง |
| ขี่ม้า | 2 ช่อง |
| ขี่ม้า + ตอบถูก | 3 ช่อง |
| ขี่มังกร | 5 ช่อง |
| ขี่มังกร + ตอบถูก | 6 ช่อง |

ข้อจำกัด:

- Movement Range จาก stat ตัวละครไม่ควรเพิ่มง่าย
- อุปกรณ์หรือ AGI อาจช่วยเฉพาะ movement utility เช่น ลด penalty มากกว่าเพิ่มช่องตรง ๆ

### 6.4 Movement Cost Reduction

ลด Energy cost จาก terrain หรือ effect

ตัวอย่าง:

- boots ลดค่าเดินในป่า
- mount ลดค่าเดินบนถนน
- Druid ลดค่าเดินในป่า/หนองน้ำ

### 6.5 Disengage Cost Reduction

ลดโทษเมื่อถอยออกจาก Zone of Control

```text
disengage_cost = base_disengage_cost - floor(AGI / 20) - skill_bonus
```

ใช้กับ:

- Archer หนีตอนโดนประชิด
- Mage/Priest reposition
- Assassin disengage หลังโจมตี

### 6.6 Zone of Control Resist

ลดผลจากการถูกศัตรูประชิดหรือคุมช่อง

เหมาะกับ:

- Assassin
- Warrior
- boots/equipment บางชนิด

### 6.7 Vision Range

จำนวนช่องที่เห็นผู้เล่น มอน หรือ resource รอบตัว

```text
vision_range = base_vision + class_bonus + equipment_bonus + tile_bonus
```

ตัวอย่าง:

- base_vision = 5 ช่อง
- Archer/Scout ได้ bonus
- กลางคืน/หมอกลด vision

### 6.8 Mount Control

ความสามารถในการใช้ mount

ผลที่เป็นไปได้:

- ลด mount stamina cost
- ลด cooldown ลงจาก mount
- เพิ่มโอกาสไม่ตก mount เมื่อโดนโจมตี
- ใช้ mount ขั้นสูงได้

## 7. Territory Stat

ใช้กับระบบยึดพื้นที่และสงครามเมือง

### 7.1 Claim Power

เพิ่ม progress เมื่อยึด tile

```text
claim_progress = base_claim + claim_power + quiz_bonus - enemy_defense_power
```

เหมาะกับ:

- Engineer
- อุปกรณ์ tool
- city mission buff

### 7.2 Claim Speed

ลดเวลาหรือเพิ่ม tick rate ของการ claim

```text
claim_tick_interval = base_tick / (1 + claim_speed_bonus)
```

### 7.3 Defense Power

ลด progress การยึดจากศัตรูเมื่อผู้เล่นยืนป้องกัน tile

```text
effective_enemy_claim = enemy_claim_power - defense_power
```

เหมาะกับ:

- Knight
- Priest buff
- city-owned tile

### 7.4 Siege Damage

ใช้โจมตี claim core, barricade, outpost หรือ device

เหมาะกับ:

- Warrior
- Mage
- Engineer

### 7.5 Repair Power

ใช้ซ่อม outpost, barricade, turret, claim core

เหมาะกับ:

- Engineer
- Druid/Support บาง build

### 7.6 Trap Power

เพิ่ม damage/duration/effect ของ trap

เหมาะกับ:

- Engineer
- Assassin

### 7.7 Guard Influence

เพิ่มผลเมื่อยืนบน tile ของเมืองตัวเอง

ใช้กับ:

- defense contribution
- city buff
- reward calculation

## 8. Utility และ Economy Stat

ใช้กับการฟาร์ม resource, crafting และ economy

### 8.1 Gathering Power

เพิ่มประสิทธิภาพการเก็บ resource ทั่วไป

```text
gather_amount = base_amount + floor(gathering_power / 10)
```

### 8.2 Mining / Woodcutting / Fishing / Herbalism

life skill เฉพาะทาง

ผล:

- ใช้เครื่องมือระดับสูง
- เก็บ resource คุณภาพสูง
- ลดเวลาฟาร์ม
- เพิ่มโอกาส rare material

### 8.3 Crafting Focus

ใช้เพิ่มโอกาสคราฟสำเร็จหรือคุณภาพของ item

```text
craft_success = base_success + crafting_focus_bonus + quiz_bonus - recipe_difficulty
```

### 8.4 Crafting Quality

เพิ่มโอกาสได้ item stat ดีขึ้น

### 8.5 Drop Rate / Rare Drop Rate

เพิ่มโอกาส drop item

ข้อจำกัด:

- ต้องมี cap
- PvP drop ไม่ควรได้รับผลจาก rare drop สูงเกินไป

### 8.6 Luck

stat เสริมที่มีผลเล็กน้อยกับหลายระบบ

ผลที่เป็นไปได้:

- rare drop
- critical chance เล็กน้อย
- craft quality เล็กน้อย
- random event chance

### 8.7 Inventory Capacity / Carry Weight

จำนวนของที่ถือได้

ใช้กับ:

- resource farming
- trade
- city supply delivery

## 9. Stat Cap

เพื่อ balance ต้องมี cap ตั้งแต่แรก

| Stat | Cap แนะนำ |
| --- | --- |
| Critical Rate | 50% |
| Dodge | 40% |
| Block Rate | 50% |
| Cooldown Reduction | 30% |
| Damage Reduction | 60% |
| Quiz Bonus ต่อ action | 15% |
| Movement Range จากตัวละคร | +1 ถึง +2 ช่อง |
| Claim Speed Bonus | 50% |
| Energy Cost Reduction | 50% |

หมายเหตุ:

- cap เหล่านี้เป็นค่าเริ่มต้น ต้อง balance จาก prototype
- PvP อาจใช้ cap ต่ำกว่า PvE

## 10. Class Stat Priority

| Class | Stat หลัก | Stat รอง | Territory/Utility |
| --- | --- | --- | --- |
| Warrior | STR, VIT | DEX | Siege Damage |
| Knight | VIT, STR | WIS | Defense Power, Guard Influence |
| Archer | DEX, AGI | STR | Vision Range |
| Mage | INT, WIS | AGI | Area Control |
| Priest | WIS, VIT | INT | Support, Defense Power |
| Assassin | AGI, DEX | STR | Trap/Sabotage |
| Engineer | DEX, INT | VIT | Claim Power, Repair Power |
| Druid | WIS, DEX | VIT | Gathering, Terrain Control |

## 11. Damage Formula เบื้องต้น

### 11.1 Physical Damage

```text
raw_damage = physical_attack * skill_multiplier
mitigation = 100 / (100 + target_physical_defense)
final_damage = raw_damage * mitigation
```

### 11.2 Magic Damage

```text
raw_damage = magic_attack * skill_multiplier
mitigation = 100 / (100 + target_magic_defense)
final_damage = raw_damage * mitigation
```

### 11.3 PvP Modifier

```text
pvp_damage = final_damage * pvp_modifier
```

ค่าเริ่มต้น:

- pvp_modifier = 0.75

เหตุผล:

- ลดการตายเร็วเกินไป
- ทำให้ตำแหน่งและทีมมีความหมาย

## 12. Accuracy และ Dodge Formula

```text
hit_chance = base_hit + attacker_accuracy - defender_dodge
```

ค่าแนะนำ:

- base_hit = 80%
- min_hit = 20%
- max_hit = 95%

ตัวอย่าง:

ถ้า accuracy 30 และ dodge 10:

```text
hit_chance = 80 + 30 - 10 = 100 -> cap ที่ 95%
```

## 13. Critical Formula

```text
crit_chance = critical_rate - target_crit_resist
crit_damage = final_damage * critical_damage_multiplier
```

ค่าเริ่มต้น:

- critical_damage_multiplier = 150%
- crit chance cap = 50%

## 14. Claim Formula เบื้องต้น

```text
claim_tick = base_claim + attacker_claim_power + quiz_claim_bonus - defender_defense_power
```

ตัวอย่าง:

- base_claim = 10
- Engineer claim_power = 8
- ตอบคำถามถูก +5
- Knight ศัตรูยืนป้องกัน defense_power = 10

```text
claim_tick = 10 + 8 + 5 - 10 = 13
```

ถ้า tile ต้องการ 100 progress ต้องใช้หลาย tick จึงยึดได้

## 15. Quiz Bonus กับ Stat

Quiz bonus เป็น temporary modifier ต่อ action

ตัวอย่าง:

- Combat: +damage, +accuracy, +crit chance เล็กน้อย
- Movement: +movement range
- Claim: +claim progress
- Craft: +success chance หรือ quality
- Gather: +yield หรือ rare chance

ข้อจำกัด:

- ไม่ควร stack หลายชั้นจนเกิน cap
- ตอบผิดควรลด bonus ไม่ใช่ทำให้ action ล้มเหลวเสมอ
- PvP quiz bonus ต้องเบากว่า PvE บางกรณี

## 16. UI/UX

Stat UI ควรแบ่ง tab:

- Combat
- Movement
- Territory
- Gathering/Crafting
- Knowledge Bonus

ควรแสดง:

- ค่า base
- ค่า bonus จาก equipment
- ค่า temporary buff/debuff
- cap ถ้ามี
- tooltip อธิบาย stat แบบสั้น

ตัวอย่าง tooltip:

- Claim Power: เพิ่ม progress เมื่อยึด tile
- Vision Range: จำนวนช่องที่มองเห็นรอบตัวบนแผนที่
- Disengage Cost Reduction: ลดค่าใช้จ่ายเมื่อถอยออกจากศัตรูประชิด

## 17. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- stat_definitions
- character_attributes
- character_derived_stats
- stat_modifiers
- stat_caps
- class_stat_growth
- equipment_stat_bonuses
- temporary_buffs
- stat_snapshots

## 18. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /stats/definitions`
- `GET /characters/:id/stats`
- `POST /characters/:id/allocate-stat`
- `GET /characters/:id/stat-modifiers`

Server/Internal:

- `calculateDerivedStats(characterId)`
- `applyStatModifier(characterId, modifier)`
- `removeStatModifier(characterId, modifierId)`
- `enforceStatCaps(stats)`
- `snapshotStatsForCombat(characterId)`

Realtime Events:

- `stats:updated`
- `stat_modifier:applied`
- `stat_modifier:removed`
- `energy:changed`
- `claim_power:changed`
- `movement_range:changed`

## 19. Edge Cases

- stat จากหลายแหล่ง stack เกิน cap
- buff หมดเวลาระหว่าง combat
- equipment ถูกถอดแล้ว stat ลดจน HP เกิน max
- level up พร้อมกับตาย
- Energy regen เกิดขณะกำลังเดิน
- claim stat เปลี่ยนระหว่างกำลังยึด tile
- PvP ใช้ stat คนละ cap กับ PvE
- dodge สูงเกินจนตีไม่โดนเลย
- movement bonus ทำให้ข้าม Zone of Control ง่ายเกิน
- rare drop stat ทำให้ economy เสีย

## 20. TODO

- กำหนดค่า base stat ของแต่ละ class
- ทำ stat growth table Level 1-30
- กำหนด cap PvE/PvP แยกกัน
- กำหนด Energy regen จริง
- กำหนด terrain movement cost
- กำหนด Claim Power/Defense Power เริ่มต้น
- เชื่อม stat กับ skill และ equipment
- ทำ prototype สูตร damage, hit, claim บน grid
