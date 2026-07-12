# 31-Crafting

> สถานะ: Draft v1

## 1. ภาพรวม

Crafting System คือระบบแปรรูปทรัพยากรและสร้างไอเท็มของ EduQuest Online ผู้เล่นนำ resource จาก world map มาใช้สร้าง consumable, equipment, tool, territory item, pet/mount item และ upgrade material

Crafting เป็นสะพานเชื่อม:

> Resource -> Material -> Item/Equipment/Tool/Territory Supply -> Economy/Territory War

## 2. เป้าหมายของระบบ

- ทำให้ resource มีมูลค่า
- ทำให้ผู้เล่นสายฟาร์ม/คราฟมีบทบาทจริง
- สนับสนุน economy และ marketplace
- เชื่อมกับ territory war ผ่าน supply, barricade, trap, outpost
- ใช้ quiz เป็น bonus ด้าน success/quality ไม่ใช่ข้อสอบบังคับ
- ลดความรู้สึกเสียของจากการคราฟล้มเหลว

## 3. Crafting Categories

### 3.1 Basic Crafting

ของใช้พื้นฐาน:

- HP Potion
- MP Potion
- Energy Food
- Buff Food
- Repair Kit
- Basic Tool

### 3.2 Equipment Crafting

ของสวมใส่:

- weapon
- armor
- shield
- boots
- cape
- accessory
- tool

### 3.3 Refining

แปรรูป resource:

- ore -> ingot
- wood -> plank
- hide -> leather
- herb -> extract
- crystal -> rune dust
- fish -> food ingredient

### 3.4 Territory Crafting

ของสำหรับยึดและป้องกันพื้นที่:

- barricade kit
- trap kit
- claim token
- repair supply
- outpost core
- scout flare
- city supply crate

### 3.5 Pet/Mount Crafting

ของเกี่ยวกับสัตว์เลี้ยงและสัตว์ขี่:

- pet food
- pet skill book
- mount feed
- saddle
- evolution stone
- mount gear

### 3.6 Upgrade Material Crafting

วัสดุอัปเกรด:

- enhancement stone
- rune
- charm
- repair material
- enchant core
- socket material

## 4. Crafting Station

Station หลัก:

- Blacksmith: weapon, armor, tool
- Workshop: territory item, device, trap
- Alchemy Table: potion, herb, crystal
- Cooking Station: food, buff food
- Tailor/Leatherwork: cloth, leather, boots, cape
- Stable/Pet Lab: mount/pet item
- City Forge: city project, outpost, territory supply ระดับสูง

กฎ:

- เมืองเกิดมี station พื้นฐาน
- outpost อาจมี station ชั่วคราว
- station ระดับสูงอาจอยู่ในเมืองที่ upgrade แล้ว
- Center/contested resource อาจต้องใช้ station เฉพาะ

## 5. Recipe Data

Recipe ควรมีข้อมูล:

- recipe_id
- name
- category
- station_type
- required_materials
- required_gold
- required_tool
- required_level
- required_life_skill
- required_knowledge_mastery
- required_city_rank
- craft_time
- base_success_rate
- recipe_difficulty
- quality_roll
- output_item
- output_quantity
- bonus_output_chance
- tradable_result
- city_requirement

## 6. Crafting Flow

1. ผู้เล่นเลือก station
2. เลือก recipe
3. ระบบเช็ก material, gold, tool, level, life skill และ requirement
4. ผู้เล่นเริ่ม craft
5. ระบบอาจถาม quiz เพื่อเพิ่ม bonus
6. คำนวณ success/quality
7. consume material
8. สร้าง item result
9. ให้ crafting EXP/life skill EXP
10. log ผลลัพธ์

## 7. Success Rule

หลักการ MVP:

- ของพื้นฐาน success 100%
- refining พื้นฐาน success 100%
- equipment/rare/territory device ใช้ quality roll มากกว่า fail แล้วของหาย
- ถ้า fail ไม่ควรเสีย material ทั้งหมดใน MVP

ตัวอย่าง fail outcome:

- ได้ item quality ต่ำ
- เสีย material บางส่วน
- ได้ broken part
- craft time เสียไป

สูตร:

```text
success_rate = base_success_rate
             + crafting_focus_bonus
             + life_skill_bonus
             + quiz_bonus
             + station_bonus
             - recipe_difficulty
```

## 8. Quality Rule

Quality ส่งผลต่อ stat และมูลค่า item

ระดับ:

- Normal
- Fine
- Great
- Excellent
- Masterwork

ผลของ quality:

- stat สูงขึ้น
- durability สูงขึ้น
- substat เพิ่ม
- special effect chance เพิ่ม
- sell/trade value สูงขึ้น

สูตร:

```text
quality_score = base_quality
              + crafting_quality_stat
              + material_quality
              + quiz_bonus
              + station_bonus
              + city_bonus
```

ตัวอย่าง mapping:

| Quality Score | Result |
| --- | --- |
| 0-39 | Normal |
| 40-59 | Fine |
| 60-79 | Great |
| 80-94 | Excellent |
| 95+ | Masterwork |

## 9. Quiz Bonus

Quiz ใช้เป็น bonus ไม่ใช่เงื่อนไขบังคับ

ตอบถูก:

- success rate เพิ่ม
- quality score เพิ่ม
- material refund chance เพิ่ม
- bonus output chance เพิ่ม
- craft time ลดเล็กน้อย

ตอบผิด:

- craft ยังดำเนินต่อ
- ไม่ได้ bonus
- หรือ quality ลดเล็กน้อยในสูตรยาก

หมวดคำถาม:

- Potion/Alchemy: Science
- Equipment: Math, Science
- Device/Trap: Logic, Coding
- Food: Science, Thai/English vocabulary บางแบบ
- Territory Core: Logic, Math, Coding

## 10. Material Quality

วัตถุดิบมี tier/quality:

- T1-T5
- common/rare variant
- biome-specific material
- city-owned resource bonus
- center zone rare material

ตัวอย่าง:

- Iron Ore T2 -> Iron Ingot
- Mithril Ore T4 -> Mithril Ingot
- Aether Crystal T4 -> Rune Dust
- Ancient Aether Shard T5 -> Enchant Core

## 11. Crafting Time

ค่าแนะนำ:

| Craft Type | Time |
| --- | --- |
| Potion/Food พื้นฐาน | instant ถึง 5 วินาที |
| Refining | 3-10 วินาที |
| Basic Equipment | 10-30 วินาที |
| Rare Equipment | 1-5 นาที |
| Territory Item | 30 วินาที-5 นาที |
| City Project | หลายนาทีถึงหลายชั่วโมง |

หมายเหตุ:

- bulk craft ควรมีสำหรับ item พื้นฐาน
- craft time ยาวควรเป็น async หรือ station queue

## 12. Territory Crafting

Territory crafting เป็นหัวใจของสงครามเมือง

ตัวอย่าง:

### Barricade Kit

ใช้:

- Wood
- Stone
- Metal part

ผล:

- วางสิ่งกีดขวางชั่วคราวบน tile

### Trap Kit

ใช้:

- Metal part
- monster material
- crystal dust

ผล:

- วาง trap บน tile

### Repair Supply

ใช้:

- Wood
- Stone
- Ore

ผล:

- ซ่อม outpost/device/core

### Claim Token

ใช้:

- Territory Supply
- Crystal
- City Token

ผล:

- ช่วยเพิ่ม claim progress หรือเริ่ม claim action บางประเภท

### Outpost Core

ใช้:

- Stone
- Ore
- Crystal
- City Supply

ผล:

- สร้าง outpost หรือ upgrade tile

## 13. City Project / Group Crafting

Phase หลังควรมี crafting แบบเมืองหรือกิลด์ร่วมกัน

ตัวอย่าง:

- Upgrade city forge
- Build frontier outpost
- Build watch tower
- Repair city gate
- Create center war supply

กฎ:

- ผู้เล่นหลายคนส่ง resource เข้า project
- ได้ contribution ตามของที่ส่ง
- project สำเร็จแล้วเปิด buff หรือ structure
- ใช้เวลาเป็นรอบ

## 14. Economy และ Trading

ของ craft ควรเป็นแกน economy

กฎ:

- equipment craft ส่วนใหญ่ trade ได้
- consumable trade ได้
- tool trade ได้
- territory supply อาจ City Bound
- rare craft อาจ Bind on Equip
- city project item อาจ trade ไม่ได้

Item sink:

- craft consume material
- repair consume material
- enchant consume material
- territory war consume supply
- market tax

## 15. Anti-Spam / Anti-Exploit

ต้องป้องกัน:

- craft สูตรง่ายซ้ำเพื่อปั๊ม EXP
- bot craft bulk แบบไม่จำกัด
- material duplication
- craft cancel เพื่อคืน material ผิดพลาด
- quality exploit จาก reconnect/disconnect

กฎ:

- diminishing EXP ถ้า recipe ต่ำกว่า level มาก
- craft queue server-authoritative
- material consume ต้องเป็น transaction
- result generation ต้อง atomic
- bulk craft จำกัดจำนวนต่อรอบ

## 16. MVP Recipe List

ควรเริ่มน้อยแต่ครบ loop:

- HP Potion
- MP Potion
- Energy Food
- Iron Ingot
- Wood Plank
- Leather
- Basic Sword
- Basic Bow
- Basic Staff
- Basic Armor
- Pickaxe
- Axe
- Fishing Rod
- Repair Kit
- Trap Kit
- Barricade Kit
- Claim Supply

## 17. UI/UX

Crafting UI ควรแสดง:

- recipe list
- category filter
- station type
- required materials
- missing materials
- success rate
- expected quality range
- quiz bonus
- craft time
- output preview
- tradable/bind result
- required level/life skill

ควรมี:

- bulk craft สำหรับ item พื้นฐาน
- favorite recipe
- show only craftable
- compare crafted equipment preview

## 18. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- crafting_recipes
- crafting_recipe_materials
- crafting_stations
- crafting_station_levels
- crafting_attempts
- crafting_results
- crafting_quality_rules
- crafting_success_rules
- crafting_queues
- city_projects
- city_project_contributions
- recipe_unlocks

## 19. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /crafting/recipes`
- `GET /crafting/stations`
- `POST /crafting/start`
- `POST /crafting/cancel`
- `POST /crafting/claim-result`
- `POST /crafting/bulk`
- `POST /city-projects/contribute`

Realtime Events:

- `crafting:started`
- `crafting:completed`
- `crafting:failed`
- `crafting:quality_rolled`
- `crafting:material_consumed`
- `crafting:result_created`
- `city_project:updated`
- `city_project:completed`

## 20. Edge Cases

- inventory เต็มตอน craft สำเร็จ
- material ถูกใช้พร้อมกันหลาย recipe
- disconnect ระหว่าง craft
- quiz result มาหลัง craft timeout
- station ถูกทำลายหรือ ownership เปลี่ยนระหว่าง craft
- craft queue ซ้ำจากการกดปุ่มหลายครั้ง
- quality roll ไม่ตรง client/server
- recipe ถูก patch ระหว่างผู้เล่นกำลัง craft
- city project รับ resource เกินจำนวนที่ต้องการ

## 21. TODO

- กำหนด recipe MVP จริง
- กำหนด success/quality table
- กำหนด crafting EXP และ life skill EXP
- กำหนด station ในเมืองเกิด 4 เมือง
- กำหนด territory crafting cost
- กำหนด city project phase แรก
- เชื่อมกับ `21-Item-System.md`
- เชื่อมกับ `29-Resource-System.md`
- เชื่อมกับ `22-Equipment-System.md`
