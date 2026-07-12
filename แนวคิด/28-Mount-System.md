# 28-Mount-System

> สถานะ: Draft v1

## 1. ภาพรวม

Mount System คือระบบสัตว์ขี่สำหรับการเดินทางบน world map แบบช่องตาราง สัตว์ขี่ไม่ได้เป็นแค่ cosmetic แต่มีผลกับ movement range, Energy efficiency, carry capacity, terrain bonus, exploration และการขน resource/supply

เกมนี้ผู้เล่นควรมีสัตว์ขี่หลายตัวให้เลือกซื้อหรือปลดล็อกตามสไตล์การเล่น เช่น เดินทางเร็ว ขนของเก่ง ใช้ในสงครามพื้นที่ หรือใช้สำรวจ biome เฉพาะ

## 2. เป้าหมายของระบบ

- ทำให้การเดินบนแผนที่สนุกและมี progression
- ให้ผู้เล่นเลือก mount ตามกิจกรรม
- เพิ่มทางใช้เงิน Gold, token และ currency พิเศษ
- เชื่อมกับ Resource, Crafting, PvP และ Territory War
- ไม่ทำให้ mount ใช้หนี PvP ได้ง่ายเกินไป
- ทำให้ mount สายขนของมีความสำคัญ ไม่ใช่มีแต่ตัวเร็ว

## 3. กฎพื้นฐาน

ค่า movement เริ่มต้น:

```text
เดินปกติ = 1 ช่อง
ตอบคำถามถูก = 2 ช่อง
Starter Horse = 2 ช่อง
Starter Horse + ตอบถูก = 3 ช่อง
Dragon = 5 ช่อง
Dragon + ตอบถูก = 6 ช่อง
```

กฎ:

- Mount เพิ่ม movement range ต่อ movement action
- Mount ใช้ mount stamina
- Mount บางตัวลด Energy cost
- Mount บางตัวเพิ่ม carry capacity
- Mount บางตัวมี terrain bonus
- Mount ใช้ไม่ได้หรือถูกยกเลิกระหว่าง Combat Lock
- Mount ไม่ควรใช้ข้าม safe/protected boundary หรือ choke point สำคัญแบบผิดกฎ

## 4. Mount Stat

Mount แต่ละตัวควรมี:

- mount_id
- name
- rarity
- movement_range
- stamina
- stamina_regen
- energy_cost_modifier
- carry_capacity_bonus
- terrain_bonus
- dismount_resistance
- summon_time
- summon_cooldown
- allowed_zone
- acquisition_method
- currency_cost
- upkeep_cost

## 5. Mount Types

### 5.1 Starter Horse

บทบาท:

- สัตว์ขี่เริ่มต้น
- ใช้ง่าย ราคาถูก
- เหมาะกับผู้เล่นใหม่

ค่าเริ่มต้น:

- movement_range: 2 ช่อง
- carry bonus: น้อย
- stamina: ปานกลาง
- ซื้อด้วย Gold หรือได้จาก quest level 10

### 5.2 Swift Horse

บทบาท:

- เดินทางเร็ว
- เหมาะกับ exploration และ daily route

ค่าเริ่มต้น:

- movement_range: 3 ช่อง
- stamina: สูงกว่า Starter Horse
- carry bonus: ต่ำ
- ซื้อด้วย Gold ราคาแพงกว่า

### 5.3 Pack Mule

บทบาท:

- ขน resource/supply
- เหมาะกับ farmer, crafter, trader

ค่าเริ่มต้น:

- movement_range: 2 ช่อง
- carry bonus: สูง
- stamina: สูง
- dismount resistance: ต่ำ
- ซื้อด้วย Gold หรือ Crafting/City Shop

### 5.4 War Wolf

บทบาท:

- mount สาย PvP/territory
- ใช้เดินทางใน contested zone ได้ดี

ค่าเริ่มต้น:

- movement_range: 3 ช่อง
- dismount resistance: ปานกลาง
- carry bonus: ต่ำ
- ซื้อด้วย PvP currency หรือ Blood Drop

### 5.5 Armored Boar

บทบาท:

- ถึก ขนของได้พอสมควร
- เหมาะกับ resource route และ frontline supply

ค่าเริ่มต้น:

- movement_range: 2 ช่อง
- carry bonus: กลาง
- dismount resistance: สูง
- terrain bonus: ป่า/หนองน้ำ
- ซื้อด้วย Gold + resource หรือ City Token

### 5.6 Desert Lizard

บทบาท:

- สำรวจทะเลทราย
- ลดค่าเดินบน sand tile

ค่าเริ่มต้น:

- movement_range: 3 ช่อง
- terrain bonus: desert
- stamina loss ลดบนทะเลทราย
- ซื้อในเมือง/biome เฉพาะ

### 5.7 Snow Elk

บทบาท:

- สำรวจหิมะและภูเขา

ค่าเริ่มต้น:

- movement_range: 3 ช่อง
- terrain bonus: snow/mountain
- ลด Energy cost ใน biome หนาว

### 5.8 City Mount

บทบาท:

- mount ประจำเมือง
- สร้าง identity ของ 4 เมือง

ตัวอย่าง:

- North Wolf
- South Camel
- East Hawkstrider
- West Warhorse

ค่าเริ่มต้น:

- movement_range: 3 ช่อง
- bonus เมื่ออยู่บน tile ของเมืองตัวเอง
- ซื้อด้วย City Token และ city rank

### 5.9 Griffin

บทบาท:

- mount ระดับสูงสำหรับ exploration
- ข้าม terrain บางชนิดได้

ค่าเริ่มต้น:

- movement_range: 4 ช่อง
- stamina cost: สูง
- summon cooldown: สูง
- ใช้ไม่ได้ใน dungeon/บาง contested objective
- ได้จาก quest, event, boss fragment หรือ high-tier crafting

### 5.10 Dragon

บทบาท:

- endgame mount
- เดินทางไกลมาก
- เป็น prestige และ utility สูง

ค่าเริ่มต้น:

- movement_range: 5 ช่อง
- ตอบคำถามถูก: 6 ช่อง
- stamina cost: สูงมาก
- cooldown: สูง
- zone restriction: ใช้ไม่ได้ในบาง PvP/center objective
- ไม่ควรซื้อได้ง่าย
- ได้จาก endgame, world boss, season reward, dragon shard crafting

ข้อควรระวัง:

- Dragon ถ้าใช้ได้ทุกที่ จะทำให้ movement และ territory balance พัง
- ต้องมี stamina/cooldown/zone restriction ชัดเจน

## 6. Movement Table

| Mount/สถานะ | ระยะเดิน |
| --- | --- |
| เดินปกติ | 1 ช่อง |
| ตอบคำถามถูก | 2 ช่อง |
| Starter Horse | 2 ช่อง |
| Starter Horse + ตอบถูก | 3 ช่อง |
| Swift Horse | 3 ช่อง |
| Pack Mule | 2 ช่อง + carry |
| War Wolf | 3 ช่อง + dismount resist |
| Armored Boar | 2 ช่อง + ถึก/carry |
| Desert Lizard | 3 ช่อง + desert bonus |
| Snow Elk | 3 ช่อง + snow/mountain bonus |
| Griffin | 4 ช่อง |
| Dragon | 5 ช่อง |
| Dragon + ตอบถูก | 6 ช่อง |

## 7. Mount Stamina

Mount ต้องมี stamina เพื่อไม่ให้เดินเร็วฟรีตลอดเวลา

กฎ:

- เดินด้วย mount ใช้ stamina
- terrain ยากใช้ stamina มากขึ้น
- stamina หมดแล้ว mount movement ลดลง หรือบังคับ dismount
- stamina ฟื้นช้าในโลก
- stamina ฟื้นเร็วในเมือง/stable
- mount feed ใช้ฟื้น stamina

ค่าแนะนำ:

```text
Starter Horse stamina = 100
เดิน 1 action ใช้ 5 stamina
terrain ยาก +2 ถึง +5 stamina
stable regen เร็วกว่า world regen 3-5 เท่า
```

## 8. PvP และ Combat Lock

Mount ต้องถูกคุมด้วย Combat Lock

กฎ:

- ถ้าโจมตีหรือโดนโจมตี ติด Combat Lock 20 วินาที
- ระหว่าง Combat Lock ขึ้น mount ไม่ได้
- ถ้าอยู่บน mount แล้วโดนโจมตี มีโอกาส dismount
- เมื่อ dismount เริ่ม mount cooldown
- mount ใช้หนีได้เฉพาะก่อนเข้า combat
- mount speed ไม่ควรกลบ mobility skill ของ class

Dismount chance อาจขึ้นกับ:

- damage ที่ได้รับ
- mount dismount resistance
- rider Mount Control
- skill effect
- terrain

## 9. Zone Restriction

ตัวอย่าง:

| Zone | Mount Rule |
| --- | --- |
| Safe Zone | ใช้ได้ |
| Farm Zone | ใช้ได้ |
| Frontier Zone | ใช้ได้ |
| Contested Zone | ใช้ได้ แต่เสี่ยง dismount |
| Center Zone | บาง mount ถูกจำกัด |
| Dungeon | ส่วนใหญ่ใช้ไม่ได้ |
| PvP Objective Tile | mount ระดับสูงอาจใช้ไม่ได้ |

## 10. Terrain Bonus

Mount บางตัวเด่นใน terrain เฉพาะ:

- Desert Lizard: ทะเลทราย
- Snow Elk: หิมะ/ภูเขา
- Armored Boar: ป่า/หนองน้ำ
- Griffin: ข้าม terrain บางชนิด
- City Mount: bonus บน tile ของเมืองตัวเอง

ผลที่เป็นไปได้:

- ลด stamina cost
- ลด Energy cost
- ลด movement penalty
- เพิ่ม carry efficiency

## 11. Carry Capacity

Mount สายขนของช่วย resource economy

ตัวอย่าง:

- Pack Mule: carry สูง
- Armored Boar: carry กลาง + ถึก
- Dragon: carry กลาง แต่เน้นเร็ว/endgame
- War Wolf: carry ต่ำ แต่เหมาะ PvP

ใช้กับ:

- resource farming
- supply delivery
- city mission
- trade route
- territory repair

## 12. Acquisition และ Currency

ช่องทางได้ mount:

- Quest
- Gold shop
- City Token shop
- PvP/Blood currency shop
- Crafting
- Territory reward
- Event
- Boss drop fragment
- Season reward
- Premium cosmetic skin

ตัวอย่าง currency:

- Gold: mount พื้นฐาน เช่น Starter Horse, Swift Horse, Pack Mule
- Diamond: cosmetic skin, stable slot, convenience ที่ไม่ขาย power ตรง
- City Token: City Mount, supply mount, mount ที่ช่วยเมือง
- Blood Drop: mount สาย PvP เช่น War Wolf, Armored War Mount
- Event Token: mount limited/event
- Boss Fragment: Griffin/Dragon shard

ข้อสำคัญ:

- ไม่ควรขาย Dragon หรือ mount power สูงด้วยเงินจริงตรง ๆ
- Diamond ควรใช้กับ cosmetic หรือ convenience
- Mount ที่มีผลกับ PvP/territory ควรหาได้จาก gameplay

## 13. Mount Shop

ควรมี Stable NPC ในเมืองเกิด

ฟีเจอร์:

- ดูรายชื่อ mount
- preview
- ดู movement range
- ดู stamina/carry/terrain bonus
- ดู allowed zone
- ซื้อด้วย currency ที่กำหนด
- ตั้ง active mount
- ให้อาหาร/ฟื้น stamina
- ซ่อมหรือดูแล mount gear

## 14. Mount Gear

Phase หลังควรรองรับ mount gear:

- Saddle: stamina
- Horseshoe/Claw: terrain bonus
- Bag: carry capacity
- Armor: dismount resistance
- Charm: summon cooldown หรือ stamina regen

กฎ:

- mount gear อาจ craft/trade ได้
- mount gear ไม่ควรเพิ่ม movement range ง่ายเกิน
- gear สาย PvP ต้องมี cap

## 15. Mount Progression

Mount อาจมี progression เบา ๆ:

- level
- affinity
- stamina training
- terrain mastery
- cosmetic skin

ข้อควรระวัง:

- อย่าให้ mount leveling กลายเป็น grind หลักเกิน
- mount progression ควรเสริม ไม่ใช่บังคับทุกคนทำ

## 16. Mount กับ Quiz

Quiz ใช้เพิ่มผล movement ได้:

- ตอบถูกเพิ่ม movement +1 ตามกฎ
- ลด stamina cost
- ลดโอกาส dismount
- เพิ่ม terrain handling ชั่วคราว

ข้อจำกัด:

- bonus ต้องมี cap
- ใน PvP/Combat Lock ไม่ควรใช้ quiz เพื่อขึ้น mount หนี

## 17. UI/UX

Mount UI ควรแสดง:

- active mount
- movement range
- stamina
- carry bonus
- terrain bonus
- zone restriction
- summon cooldown
- dismount risk
- currency cost
- owned/not owned

บน world map:

- แสดงช่องที่เดินได้ด้วย mount
- แสดง stamina cost ก่อนเดิน
- เตือนเมื่อเข้า PvP/Combat Lock แล้ว mount จะถูกจำกัด
- แสดง dismount state

## 18. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- mount_templates
- mount_instances
- character_mounts
- mount_stats
- mount_stamina
- mount_unlocks
- mount_shops
- mount_prices
- mount_gear
- mount_usage_logs
- dismount_logs

## 19. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /mounts`
- `GET /characters/:id/mounts`
- `POST /mounts/buy`
- `POST /characters/:id/mounts/active`
- `POST /mounts/summon`
- `POST /mounts/dismiss`
- `POST /mounts/feed`

Realtime Events:

- `mount:purchased`
- `mount:activated`
- `mount:summoned`
- `mount:dismissed`
- `mount:stamina_changed`
- `mount:dismounted`
- `mount:cooldown_started`
- `mount:movement_bonus_applied`

## 20. Edge Cases

- ผู้เล่นโดนตีตอนกำลัง summon mount
- Combat Lock เริ่มขณะอยู่บน mount
- stamina หมดกลางเส้นทาง
- mount พยายามเดินข้าม blocked tile
- Dragon ข้ามเขต PvP objective ที่ไม่ควรข้าม
- ผู้เล่นซื้อ mount ด้วย currency ไม่พอเพราะ lag
- mount active หายหลัง reconnect
- carry capacity ลดแล้ว inventory น้ำหนักเกิน
- dismount แล้วผู้เล่นติดอยู่บน tile ที่เข้าไม่ได้ถ้าไม่มี mount

## 21. TODO

- กำหนด mount list MVP
- กำหนดราคา Gold/City Token/Blood Drop
- กำหนด stamina และ stamina regen จริง
- กำหนด dismount formula
- กำหนด zone restriction ของ Griffin/Dragon
- กำหนด Stable NPC ในเมืองเกิด 4 เมือง
- เชื่อมกับ `32-Economy.md`
- เชื่อมกับ `21-Item-System.md`
- เชื่อมกับ `29-Resource-System.md`
