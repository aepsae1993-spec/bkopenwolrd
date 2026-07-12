# 22-Equipment-System

> สถานะ: Draft v1

## 1. ภาพรวม

Equipment System คือระบบของสวมใส่ที่ทำให้ผู้เล่นสร้าง build ได้หลายแบบ ไม่ใช่แค่ใส่ของที่เพิ่ม damage สูงสุด เกมนี้มีทั้ง combat, grid movement, territory war, resource farming และ crafting ดังนั้นอุปกรณ์ต้องรองรับบทบาทหลายสาย

Build หลัก:

- Combat Build: ตีแรง ถึก คริ เวท ฮีล
- Movement Build: เดินคุ้ม ลด Energy หนีง่าย มองไกล
- Territory Build: ยึดเร็ว ป้องกัน tile ซ่อม outpost
- Utility Build: ฟาร์ม คราฟ แบกของ ดรอปดี

## 2. เป้าหมายของระบบ

- ทำให้ผู้เล่นปรับ build ตามกิจกรรมได้
- เชื่อมกับ stat system
- เชื่อมกับ class และ skill
- รองรับ PvP และ territory war
- รองรับ durability จากการใช้งาน ตาย และ Offline Guard
- สนับสนุน economy ผ่าน crafting, trading, repair และ upgrade
- ทำให้ slot ที่ไม่ใช่อาวุธ เช่น boots, cape, shield, tool มีความสำคัญจริง

## 3. Equipment Slots

Slot หลัก:

- Weapon
- Sub Weapon / Shield
- Helmet
- Armor
- Gloves
- Boots
- Cape
- Ring 1
- Ring 2
- Necklace
- Artifact
- Rune
- Charm
- Tool

เหตุผลที่เพิ่ม Tool:

- เกมมี mining, woodcutting, fishing, gathering
- เกมมี claim, repair, trap, device
- Tool ทำให้ผู้เล่นสาย Engineer/farmer/crafter มี build จริง ไม่ต้องแข่งเฉพาะดาเมจ

## 4. Slot Identity

### 4.1 Weapon

เด่น:

- Physical Attack
- Magic Attack
- Range
- Skill modifier
- Damage type

ตัวอย่าง:

- Sword
- Axe
- Bow
- Crossbow
- Staff
- Wand
- Dagger
- Gadget

### 4.2 Sub Weapon / Shield

เด่น:

- Block Rate
- Block Power
- Defense
- Guard Influence
- Magic Defense

เหมาะกับ:

- Knight
- Priest
- defensive build

### 4.3 Helmet

เด่น:

- HP
- MP
- Accuracy
- resist
- vision บางชิ้น

### 4.4 Armor

เด่น:

- Physical Defense
- Magic Defense
- HP
- Damage Reduction

ข้อควรมี:

- armor หนักอาจเพิ่ม defense แต่ลด combat movement หรือ disengage เล็กน้อย

### 4.5 Gloves

เด่น:

- Attack Speed
- Critical
- Crafting Focus
- Gathering Power
- Repair Power

### 4.6 Boots

เด่น:

- Movement Cost Reduction
- Disengage Cost Reduction
- terrain bonus
- Energy
- dodge

สำคัญมากในเกมตาราง เพราะช่วยหนี Zone of Control และลดค่าเดินบน terrain

### 4.7 Cape

เด่น:

- Dodge
- Vision Range
- PvP utility
- stealth detection บางชิ้น
- movement utility

### 4.8 Ring

เด่น:

- Critical Rate
- Luck
- Drop Rate
- Energy Regen
- small unique bonus

### 4.9 Necklace

เด่น:

- Magic Defense
- MP
- Wisdom
- Heal bonus
- debuff resistance

### 4.10 Artifact

เด่น:

- unique passive
- class bonus
- territory bonus
- rare build-defining effect

ข้อควรระวัง:

- Artifact ไม่ควรหาได้ง่าย
- effect ต้องมี cap และ counterplay

### 4.11 Rune

เด่น:

- skill modifier
- element
- quiz bonus
- small passive

ตัวอย่าง:

- Fire Rune: เพิ่ม damage สกิลไฟ
- Route Rune: movement quiz bonus
- Claim Rune: เพิ่ม claim progress เล็กน้อย

### 4.12 Charm

เด่น:

- Luck
- Drop Rate
- anti-debuff
- rare event chance
- small defensive effect

### 4.13 Tool

เด่น:

- Gathering Power
- Mining/Woodcutting/Fishing/Herbalism
- Claim Power
- Repair Power
- Trap Power
- Crafting Focus

ตัวอย่าง:

- Pickaxe
- Axe
- Fishing Rod
- Herb Knife
- Claim Tool
- Repair Kit
- Trap Kit
- Engineer Device Kit

## 5. Rarity

Rarity เต็ม:

- Common
- Uncommon
- Rare
- Epic
- Legendary
- Mythic
- Ancient
- Divine
- Celestial

MVP แนะนำใช้:

- Common
- Uncommon
- Rare
- Epic
- Legendary

เหตุผล:

- balance ง่ายกว่า
- ผู้เล่นเข้าใจ progression เร็ว
- rarity สูงกว่านี้เก็บไว้ endgame/season/expansion

## 6. Stat Structure

อุปกรณ์หนึ่งชิ้นมี 3 ส่วน:

### 6.1 Main Stat

ค่าหลักของ slot

ตัวอย่าง:

- Weapon: Attack/Magic Attack
- Armor: Defense
- Boots: Movement utility
- Tool: Gathering/Claim/Repair

### 6.2 Sub Stat

ค่าสุ่ม 1-4 ค่า ตาม rarity

ตัวอย่าง:

- HP
- MP
- Critical Rate
- Dodge
- Accuracy
- Energy
- Vision Range
- Claim Power
- Repair Power
- Gathering Power
- Luck

### 6.3 Special Effect

เริ่มมีตั้งแต่ Rare/Epic ขึ้นไป

ตัวอย่าง:

- Backstep ถอยเพิ่ม 1 ช่อง แต่ cooldown เพิ่ม
- Hold Ground เพิ่ม Defense Power
- Rapid Attunement เพิ่ม claim progress
- Heal เพิ่ม shield เล็กน้อย
- Quick Shot เพิ่ม accuracy เมื่อยิงจากระยะ 3 ช่อง
- ลด Energy cost ในป่า/ภูเขา/ทะเลทราย

## 7. Rarity กับจำนวน Stat

| Rarity | Sub Stat | Special Effect |
| --- | --- | --- |
| Common | 0-1 | ไม่มี |
| Uncommon | 1 | ไม่มีหรือเล็กมาก |
| Rare | 1-2 | มีโอกาส |
| Epic | 2-3 | มี |
| Legendary | 3-4 | มี unique effect |
| Mythic+ | 4+ | endgame only |

## 8. Durability

Durability คือค่าความทนทานของอุปกรณ์

ลดเมื่อ:

- ใช้ basic attack/skill
- โดนโจมตี
- ตาย
- ใช้ tool gather/claim/repair
- Offline Guard ใช้สกิลสวนกลับ
- device/trap ทำงาน ถ้าเกี่ยวกับ tool

ค่าแนะนำ:

- PvE death: durability ลดเล็กน้อย
- PvP death: durability ลดมากกว่า PvE
- Offline Guard: durability ลดจริงตาม action
- durability 0: stat ลด หรือ special effect ไม่ทำงาน

ตัวอย่าง:

```text
durability 100-31: ทำงานเต็ม
durability 30-1: stat ลด 20%
durability 0: special effect ปิด และ stat ลด 50%
```

Repair:

- ซ่อมด้วย gold
- ซ่อมด้วย resource
- Engineer อาจซ่อมได้ถูกหรือเร็วกว่า
- ซ่อมกลาง field ต้องใช้ Repair Kit หรือ outpost

## 9. Requirement

อุปกรณ์อาจมีเงื่อนไข:

- character level
- class
- weapon type
- stat
- Knowledge Mastery
- city rank
- territory rank
- quest unlock

หลักการ:

- ไม่ควรล็อกเยอะเกินจนผู้เล่นทดลอง build ไม่ได้
- weapon ควรมี class restriction ชัดกว่า armor/accessory
- territory reward อาจใช้ city rank requirement

## 10. Class และ Weapon Restriction

ตัวอย่าง:

| Class | Weapon หลัก |
| --- | --- |
| Warrior | sword, axe |
| Knight | sword, shield, mace |
| Archer | bow, crossbow |
| Mage | staff, wand |
| Priest | staff, tome |
| Assassin | dagger, claw |
| Engineer | gadget, light crossbow, tool kit |
| Druid | staff, totem |

Armor:

- Light Armor: Archer, Assassin, Druid บาง build
- Medium Armor: Warrior, Engineer, Druid
- Heavy Armor: Knight, Warrior
- Cloth: Mage, Priest

## 11. Equipment กับ Grid

อุปกรณ์ต้องมีผลกับ grid map:

- Bow: เพิ่ม range/accuracy/Line of Sight bonus
- Boots: ลด Energy cost และ disengage penalty
- Cape: เพิ่ม Vision Range หรือ stealth detection
- Shield: เพิ่ม Guard Influence และ Defense Power
- Tool: เพิ่ม Claim Power, Repair Power, Gathering
- Trap Kit: เพิ่ม Trap Power
- Heavy Armor: ถึกขึ้น แต่ combat movement/disengage แย่ลง

ข้อจำกัด:

- Movement Range ไม่ควรเพิ่มง่าย
- bonus movement จากอุปกรณ์ควรเป็น utility เช่นลด cost มากกว่าเพิ่มช่องตรง ๆ
- อุปกรณ์ที่เพิ่ม range ต้องมี cap และอาจเฉพาะสกิล

## 12. Territory Equipment

อุปกรณ์สาย territory:

- Claim Tool: เพิ่ม Claim Power
- Repair Kit: เพิ่ม Repair Power
- Guard Shield: เพิ่ม Defense Power
- Scout Cape: เพิ่ม Vision Range บน frontier/contested zone
- Siege Hammer: เพิ่ม Siege Damage ต่อ claim core/outpost
- Trap Kit: เพิ่ม Trap Power และ trap duration

บทบาท:

- ทำให้ผู้เล่นที่ไม่ใช่สายฆ่าคนมีความสำคัญในสงคราม
- ทำให้ Engineer/Knight/Druid/Priest มี build support ที่ชัด
- ลดปัญหาทุกคนใส่แต่ damage gear

## 13. Set Bonus

ยังไม่จำเป็นใน MVP แต่ควรรองรับ

ตัวอย่าง:

### Frontier Guard Set

- 2 ชิ้น: Defense Power +5
- 4 ชิ้น: เมื่อยืนบน owned tile ได้ damage reduction เล็กน้อย

### Scout Set

- 2 ชิ้น: Vision Range +1
- 4 ชิ้น: ลด Energy cost ใน frontier zone

### Engineer Field Set

- 2 ชิ้น: Repair Power +5
- 4 ชิ้น: Rapid Attunement cooldown ลดเล็กน้อย

### Hunter Set

- 2 ชิ้น: damage ต่อมอน +5%
- 4 ชิ้น: rare drop จากมอนเพิ่มเล็กน้อย

## 14. Upgrade และ Enchant Link

ระบบนี้เชื่อมกับ `25-Enchant-System.md`

Equipment ควรรองรับ:

- enhance level เช่น +1 ถึง +10
- socket/rune
- reroll substat
- upgrade rarity บางชนิด
- repair
- reforging

ข้อควรระวัง:

- upgrade ไม่ควรทำให้ผู้เล่นใหม่ตามไม่ทัน
- PvP ควรมี scaling หรือ cap บางส่วน
- enchant ที่เพิ่ม movement/claim ต้องระวังเป็นพิเศษ

## 15. Binding และ Trading

สถานะ item:

- Tradable
- Bind on Equip
- Bind on Pickup
- City Bound
- Account Bound

กฎแนะนำ:

- Common/Rare ส่วนใหญ่ trade ได้
- item craft ควร trade ได้เพื่อหนุน economy
- Legendary อาจ Bind on Equip
- territory reward อาจ City Bound
- quest item Bind on Pickup

## 16. Equipment Score

อาจมี Gear Score เพื่อสื่อสารความแรงโดยรวม แต่ไม่ควรใช้ตัดสินทุกอย่าง

Gear Score ควรคำนวณจาก:

- rarity
- level requirement
- main stat
- sub stat
- special effect
- enhance level

ข้อควรระวัง:

- Gear Score สูงไม่ได้แปลว่าดีทุกกิจกรรม
- Territory/Movement/Utility gear อาจ score ต่ำกว่า combat gear แต่มีประโยชน์สูงมาก

## 17. Loot และ Acquisition

แหล่งที่มา:

- monster drop
- boss drop
- dungeon
- crafting
- territory reward
- city shop
- quest reward
- event
- marketplace/trading

หลักการ:

- ของ combat ได้จากมอน/boss/dungeon
- tool ได้จาก crafting/city shop/life skill
- territory gear ได้จาก city mission/territory contribution
- movement gear ได้จาก exploration/quest

## 18. UI/UX

Equipment UI ควรแสดง:

- slot
- rarity color
- main stat
- sub stat
- special effect
- durability
- requirement
- bind status
- comparison กับของที่ใส่อยู่
- effect ต่อ combat/movement/territory/utility

ควรมี filter:

- Combat
- Movement
- Territory
- Gathering
- Crafting
- Class usable

Tooltip ควรอธิบาย stat เฉพาะ:

- Claim Power: เพิ่ม progress เมื่อยึด tile
- Defense Power: ลด progress ศัตรูเมื่อป้องกัน tile
- Disengage Cost Reduction: ลดโทษตอนถอยจากศัตรูประชิด

## 19. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- equipment_templates
- equipment_instances
- equipment_slots
- equipment_rarities
- equipment_stats
- equipment_substats
- equipment_effects
- equipment_durability
- equipment_requirements
- equipment_sets
- equipment_bindings
- character_equipment
- repair_logs
- equipment_trade_logs

## 20. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /equipment/templates`
- `GET /characters/:id/equipment`
- `POST /characters/:id/equipment/equip`
- `POST /characters/:id/equipment/unequip`
- `POST /equipment/:instanceId/repair`
- `POST /equipment/:instanceId/bind`

Realtime Events:

- `equipment:equipped`
- `equipment:unequipped`
- `equipment:durability_changed`
- `equipment:broken`
- `equipment:repaired`
- `equipment:effect_activated`
- `stats:updated`

## 21. Edge Cases

- durability เหลือ 0 ระหว่าง combat
- ถอดอุปกรณ์แล้ว stat ลดจน HP เกิน max
- Offline Guard ใช้อุปกรณ์จนพัง
- item bound แต่พยายาม trade
- item requirement ไม่ครบหลังเปลี่ยน class
- equipment effect stack เกิน cap
- movement gear ทำให้หนี PvP ง่ายเกิน
- claim gear ทำให้ยึด tile เร็วเกิน
- repair cost แพงจนผู้เล่นไม่กล้า PvP

## 22. TODO

- กำหนด stat range ต่อ rarity
- กำหนด durability max ต่อ slot
- กำหนด repair cost formula
- กำหนด weapon list ต่อ class
- กำหนด Tool Slot ชุดแรก
- กำหนด equipment drop table ช่วง Level 1-30
- กำหนด territory gear MVP
- เชื่อมกับ `21-Item-System.md` และ `25-Enchant-System.md`
