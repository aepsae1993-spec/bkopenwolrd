# 26-Pet-System

> สถานะ: Draft v1

## 1. ภาพรวม

Pet System คือระบบสัตว์เลี้ยงหรือ companion ที่ติดตามผู้เล่นบน world map และช่วยในกิจกรรมต่าง ๆ เช่น combat, support, gathering, loot, territory defense และ utility

Pet ต้องต่างจาก Mount:

- Mount ใช้เดินทางและขนของ
- Pet ใช้ช่วย action, combat, support และ utility

หลักสำคัญ:

- Pet ไม่ควรเก่งจนแทนผู้เล่น
- Pet ควรเสริม build และสไตล์การเล่น
- Pet ใช้ใน PvP ได้ แต่ต้องมี cap และ counterplay
- Pet ไม่ควรฟาร์ม resource เองตอนผู้เล่น offline

## 2. เป้าหมายของระบบ

- เพิ่มความรู้สึกสะสมและเลี้ยงดู
- ให้ผู้เล่นปรับ build ผ่าน pet ได้
- ช่วยผู้เล่น solo แต่ไม่ทำลาย party play
- เชื่อมกับ crafting, economy, pet item และ pet skill
- รองรับ pet สาย combat/support/worker/territory
- เพิ่มของสะสมระยะยาวโดยไม่เป็น pay-to-win

## 3. ประเภท Pet

### 3.1 Combat Pet

บทบาท:

- ช่วยโจมตี
- ทำ damage เล็กน้อย
- ช่วย tank มอนบางตัว

ตัวอย่าง:

- wolf cub
- fire imp
- mini golem
- hawk

### 3.2 Support Pet

บทบาท:

- ให้ heal เล็กน้อย
- shield
- cleanse
- buff stat
- ลด debuff duration

ตัวอย่าง:

- fairy
- spirit owl
- light wisp

### 3.3 Worker Pet

บทบาท:

- ช่วยเก็บของ
- เพิ่ม gathering yield
- เพิ่ม carry capacity เล็กน้อย
- ช่วยเก็บ loot อัตโนมัติ

ตัวอย่าง:

- little boar
- miner mole
- herb sprite

### 3.4 Territory Pet

บทบาท:

- ช่วย defend tile
- เพิ่ม vision เล็กน้อย
- แจ้งเตือนศัตรู
- ช่วย claim/repair เล็กน้อย

ตัวอย่าง:

- watch raven
- guard pup
- crystal beetle

### 3.5 Cosmetic Pet

บทบาท:

- ติดตามเฉย ๆ
- มี emote/skin
- ไม่มีผล combat หรือมีผลน้อยมาก

เหมาะกับ:

- Diamond shop
- event reward
- achievement

## 4. Pet Slot

กฎแนะนำ:

- Active pet ได้ 1 ตัวใน MVP
- ในอนาคตอาจมี support slot/cosmetic slot แยก
- Pet ต้องถูก summon ถึงจะให้ผล
- เปลี่ยน pet ได้ใน safe zone หรือมี cooldown
- ระหว่าง Combat Lock อาจเปลี่ยน pet ไม่ได้

## 5. Pet Stat

Pet มี stat ของตัวเอง:

- level
- HP
- attack
- defense
- support_power
- utility_power
- loyalty
- energy
- skill_slots
- rarity

Pet ไม่ควรใช้ stat scale เต็มเหมือนผู้เล่น

สูตรเบื้องต้น:

```text
pet_effect_power = base_pet_power + pet_level_bonus + rarity_bonus + loyalty_bonus
```

PvP modifier:

```text
pet_pvp_effect = pet_effect_power * 0.5 ถึง 0.8
```

เหตุผล:

- กัน pet ทำ damage หรือ control แรงเกินใน PvP

## 6. Pet Level

Pet ได้ EXP จาก:

- combat ที่ pet ถูก summon
- pet food
- pet training
- pet quest
- gathering support
- territory support ที่มี cap

ข้อจำกัด:

- Pet ไม่ควรได้ EXP ตอนผู้เล่น offline แบบไม่จำกัด
- Offline Guard อาจให้ pet contribution เล็กน้อย แต่มี cap
- Pet level ไม่ควรแซง character level มากเกิน

## 7. Loyalty / Mood

Pet มี loyalty หรือ mood เพื่อเพิ่มมิติการเลี้ยง

เพิ่มจาก:

- ให้อาหาร
- ใช้งานตามบทบาท
- ชนะ combat
- pet interaction

ลดจาก:

- pet ตายบ่อย
- ไม่ให้อาหารนาน
- ใช้งานหนักเกิน

ผล:

- loyalty สูงเพิ่ม pet effect เล็กน้อย
- loyalty ต่ำ pet skill cooldown เพิ่ม หรือ effect ลด

## 8. Pet Skill

รายละเอียดสกิลอยู่ใน `27-Pet-Skill.md`

ประเภท:

- Active
- Passive
- Triggered
- Utility
- Territory

ตัวอย่าง:

- Bite: โจมตีเป้าหมายใกล้ ๆ
- Small Heal: ฟื้น HP เล็กน้อย
- Auto Loot: เก็บของใกล้ตัว
- Resource Sense: เพิ่มการมองเห็น resource
- Watch Alert: แจ้งเตือนศัตรูใกล้ tile
- Claim Assist: เพิ่ม claim progress เล็กน้อย

## 9. Pet ใน Combat

กฎ:

- Pet โจมตีตาม AI ง่าย ๆ
- Pet ไม่ควร body block ผู้เล่นใน MVP
- Pet อยู่ใกล้ผู้เล่น ไม่ไล่ไกล
- ถ้าผู้เล่นตาย pet หยุดสู้และกลับสถานะ inactive
- Pet damage ต้องต่ำกว่าผู้เล่นมาก

PvP:

- Pet effect ใช้ modifier ลดลง
- CC จาก pet ต้องสั้น
- Pet ไม่ควร kill ผู้เล่นเองง่าย ๆ
- Pet ต้องมี counter เช่น AoE, target pet, dismiss

## 10. Pet บน Grid

Pet อาจไม่จำเป็นต้องยืนบน tile แยกใน MVP เพื่อลดความซับซ้อน

ตัวเลือก:

1. Attached Pet
   - Pet ติดกับผู้เล่น
   - ไม่มีตำแหน่งแยก
   - ใช้ effect รอบผู้เล่น
   - เหมาะกับ MVP

2. Grid Pet
   - Pet มี tile ของตัวเอง
   - เดินตามและอาจโดนตีได้
   - ซับซ้อนกว่า
   - เหมาะ Phase หลัง

แนะนำ MVP:

- ใช้ Attached Pet ก่อน
- แสดง visual ข้างตัวผู้เล่น
- skill ใช้ตำแหน่งผู้เล่นเป็น origin

## 11. Worker Pet และ Resource

Worker Pet ช่วยฟาร์ม แต่ไม่ควรฟาร์มแทนผู้เล่น

ผลที่เป็นไปได้:

- gathering yield +เล็กน้อย
- rare chance +เล็กน้อย
- auto loot
- carry capacity +เล็กน้อย
- resource node vision +1

ข้อจำกัด:

- ผู้เล่นต้องเป็นคนเริ่ม gather
- Pet ไม่เก็บ resource เองตอน offline
- bonus ต้องมี cap

## 12. Territory Pet

Territory Pet ช่วยในสงครามพื้นที่

ผลที่เป็นไปได้:

- vision รอบ tile +1
- warning เมื่อศัตรูเข้าใกล้
- claim assist เล็กน้อย
- defense assist เล็กน้อย
- trap detection เล็กน้อย

ข้อจำกัด:

- contribution จาก pet มี cap
- ไม่ควรทำให้ offline defense แข็งเกินไป
- ถ้าใช้กับ Offline Guard ต้องลด effect ลง

## 13. Pet Acquisition

ช่องทางได้ pet:

- quest
- monster drop/egg
- crafting
- pet shop
- event
- boss drop
- city shop
- knowledge reward
- premium cosmetic pet

Currency:

- Gold: pet พื้นฐาน
- City Token: territory pet
- Blood Drop: PvP-themed pet cosmetic หรือ utility จำกัด
- Knowledge Token: support/learning pet
- Event Token: limited pet
- Diamond: cosmetic pet/skin ไม่ขาย power ตรง

## 14. Pet Rarity

ใช้ rarity:

- Common
- Uncommon
- Rare
- Epic
- Legendary

ผล:

- stat สูงขึ้น
- skill slot เพิ่ม
- passive เพิ่ม
- evolution path ดีขึ้น

ข้อควรระวัง:

- rarity สูงไม่ควรล็อกหลัง paywall
- cosmetic rarity แยกจาก power rarity ได้

## 15. Pet Evolution

Phase หลัง:

- pet level ถึงเงื่อนไข
- ใช้ evolution stone
- ใช้ resource/monster material
- อาจต้องทำ pet quest

ผล:

- เปลี่ยนรูปลักษณ์
- เพิ่ม skill slot
- เพิ่ม passive
- เพิ่ม stat เล็กน้อย

## 16. Pet Item

ไอเท็มที่เกี่ยวข้อง:

- pet food
- pet medicine
- pet skill book
- pet gear
- evolution stone
- pet cosmetic skin

Pet food:

- เพิ่ม loyalty
- ฟื้น pet energy
- อาจมี buff ชั่วคราว

## 17. Pet กับ Offline Guard

กฎ:

- Pet ช่วย Offline Guard ได้เฉพาะถ้าถูกตั้งไว้
- Pet effect ลดลงเมื่อ offline
- Pet ไม่ฟาร์ม resource ตอน offline
- Pet ไม่เดินไล่ศัตรูข้าม tile เอง
- Pet contribution มี cap

ตัวอย่าง:

- Watch pet แจ้งเตือนศัตรู
- Guard pet ช่วยป้องกันเล็กน้อย
- Support pet shield ตัวละครเมื่อถูกโจมตี

## 18. UI/UX

Pet UI ควรแสดง:

- active pet
- pet type
- level
- EXP
- loyalty/mood
- skill
- rarity
- food/energy
- summon/dismiss
- evolution progress

บน world map:

- pet icon ข้างตัวละคร
- active pet effect
- warning จาก territory pet
- auto loot indicator

## 19. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- pet_templates
- pet_instances
- character_pets
- pet_stats
- pet_levels
- pet_loyalty
- pet_skills
- pet_items
- pet_evolution_rules
- pet_usage_logs
- pet_offline_guard_logs

## 20. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /pets`
- `GET /characters/:id/pets`
- `POST /pets/summon`
- `POST /pets/dismiss`
- `POST /pets/feed`
- `POST /pets/evolve`
- `POST /pets/skill-equip`

Realtime Events:

- `pet:acquired`
- `pet:summoned`
- `pet:dismissed`
- `pet:level_up`
- `pet:loyalty_changed`
- `pet:skill_triggered`
- `pet:evolved`
- `pet:auto_loot`
- `pet:territory_alert`

## 21. Edge Cases

- pet active หายหลัง reconnect
- pet ช่วยฆ่าผู้เล่นแล้ว reward คำนวณผิด
- pet auto loot ตอน inventory เต็ม
- pet loyalty ต่ำระหว่าง combat
- pet effect stack กับ pet คนอื่นเกิน cap
- pet ใช้ skill ตอนเจ้าของตาย
- pet offline guard ทำให้ defense แข็งเกิน
- premium cosmetic pet ถูกเข้าใจว่า pay-to-win

## 22. TODO

- กำหนด pet MVP 5-10 ตัวแรก
- กำหนดว่า MVP ใช้ Attached Pet หรือ Grid Pet
- กำหนด pet stat และ PvP modifier
- กำหนด pet acquisition source
- กำหนด pet food และ loyalty formula
- เชื่อมกับ `27-Pet-Skill.md`
- เชื่อมกับ `21-Item-System.md`
- เชื่อมกับ `32-Economy.md`
