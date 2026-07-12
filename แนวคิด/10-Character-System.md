# 10-Character-System

> สถานะ: Draft v1

## 1. ภาพรวม

Character System คือแกนกลางของ EduQuest Online ตัวละครไม่ได้เป็นแค่ avatar สำหรับเดินบนแผนที่ แต่เป็นจุดรวมของระบบ RPG, world map, PvP, territory war, learning progression, equipment, pet และ mount

ตัวละครหนึ่งตัวต้องตอบคำถามสำคัญเหล่านี้ได้:

- ผู้เล่นคือใคร
- สังกัดเมืองไหน
- อยู่ตำแหน่งใดบน world map
- มีเลเวล อาชีพ stat และสกิลอะไร
- เดินได้กี่ช่อง ใช้ Energy เท่าไร
- ใส่อุปกรณ์อะไร
- มีสัตว์ขี่และสัตว์เลี้ยงอะไร
- มี Knowledge Mastery แค่ไหน
- ช่วยเมืองยึดหรือป้องกันพื้นที่ไปเท่าไร

## 2. เป้าหมายของระบบ

- เป็นฐานข้อมูลหลักที่ระบบอื่นอ้างถึง
- รองรับ world map แบบ tile และ realtime player presence
- รองรับเมืองเกิด 4 ทิศและการ respawn กลับเมือง
- รองรับ RPG progression เช่น level, class, stat, skill, equipment
- รองรับ movement/energy/mount สำหรับการเดินบนแผนที่
- รองรับ PvP, death, respawn และ territory contribution
- รองรับ pet, mount, inventory และ knowledge mastery แบบขยายต่อได้

## 3. Character Identity

ข้อมูลตัวตนพื้นฐาน:

- character id
- player/account id
- character name
- appearance
- gender/body type ถ้ามี
- portrait/avatar
- title
- home city
- guild
- party
- created at
- last login

กฎ:

- 1 account อาจมีหลายตัวละครได้ แต่ MVP อาจเริ่มที่ 1 ตัวละครก่อน
- ชื่อตัวละครต้อง unique หรือ unique ภายใน server
- appearance เปลี่ยนได้ผ่าน item หรือ NPC ในอนาคต
- title ได้จาก quest, achievement, territory rank หรือ knowledge rank

## 4. Home City

Home City คือเมืองเกิดและฝ่ายหลักของตัวละคร

เมืองเกิดทำหน้าที่:

- จุดเกิดตอนเริ่มเกม
- จุด respawn หลังตาย
- ฝ่ายใน territory war
- สีบนแผนที่และ UI
- แหล่งรับ city mission
- แหล่งรับ reward จาก contribution

กฎ:

- ผู้เล่นเลือกเมืองเกิด 1 ใน 4 เมืองตอนสร้างตัวละคร
- ระบบอาจมีตัวเลือกสุ่มเมืองเกิดเพื่อช่วย balance จำนวนผู้เล่น
- เปลี่ยนเมืองเกิดได้ยาก เช่น season reset, transfer ticket หรือ cooldown ยาว
- ผู้เล่นเมืองเดียวกันเป็นฝ่ายเดียวกันในระบบ territory war
- เมืองเกิดและพื้นที่ safe zone ห้าม PvP

## 5. Position และ World State

ตัวละครต้องมีตำแหน่งปัจจุบันบน world map

ข้อมูลตำแหน่ง:

- current map id
- x, y tile coordinate
- current chunk id
- current zone type: safe, farm, frontier, contested, center
- current tile ownership
- last safe position
- respawn point
- facing direction ถ้าจำเป็น

สถานะบนโลก:

- idle
- moving
- gathering
- combat
- pvp
- claiming
- defending
- offline_guard
- mounted
- dead
- respawning

กฎ:

- Server เป็น authority ของตำแหน่งจริง
- Client อาจแสดง movement preview ได้ แต่ต้องยืนยันจาก server
- ผู้เล่นที่ disconnect ควรค้างอยู่ช่วงสั้น ๆ หรือถูกนำออกจากโลกตามกฎ reconnect
- ถ้าตายในพื้นที่ใดก็ตาม จะกลับไป respawn ที่เมืองเกิดหรือ respawn point ที่กำหนด

## 6. Offline Guard

Offline Guard คือโหมดที่ผู้เล่นเลือกตอนออกเกมว่าให้ตัวละครยังอยู่บน tile เดิม เพื่อเฝ้าพื้นที่หรือเส้นทาง ถ้ามีศัตรูมาโจมตี ตัวละครสามารถสวนกลับอัตโนมัติด้วยสกิลที่ตั้งไว้ล่วงหน้า ตราบใดที่ยังมี HP, Energy, MP, cooldown และเงื่อนไขสกิลครบ

เกมเล่นบน browser ดังนั้นระบบต้องรองรับทั้งการออกเกมแบบตั้งใจ และการออกกลางคัน เช่น ปิดแท็บ ปิดเว็บ refresh หน้า browser crash เน็ตหลุด หรือมือถือปัดปิดแอป

โหมดออกเกมควรมี 2 แบบ:

1. Safe Logout
   - ใช้ได้ใน safe zone หรือพื้นที่ที่ไม่มี combat
   - ตัวละครหายจากโลกหลังเวลาสั้น ๆ
   - ปลอดภัยกว่า แต่ไม่ช่วยป้องกันพื้นที่

2. Stay in World / Offline Guard
   - ตัวละครยังอยู่บน tile เดิม
   - ผู้เล่นอื่นเห็นและโจมตีได้
   - ถ้ามีศัตรูโจมตี ตัวละครใช้ auto defense script
   - ถ้าตาย จะ respawn กลับเมืองเกิด

Browser Disconnect Handling:

- ถ้าผู้เล่นกด logout ผ่าน UI ให้ใช้โหมดที่ผู้เล่นเลือกไว้
- ถ้าผู้เล่นปิดแท็บ/ปิดเว็บ/refresh/เน็ตหลุด ให้ server ใช้ค่า Default Logout Mode ที่ผู้เล่นตั้งไว้ล่วงหน้า
- ถ้าไม่มีค่า default ให้ใช้กฎปลอดภัยของระบบตาม zone และ combat state
- ถ้าติด Combat Lock ต้องไม่หายจากโลกทันที แม้จะปิดเว็บ
- ถ้า reconnect กลับมาภายใน reconnect window ให้กลับมาคุมตัวละครเดิม

Default Logout Mode ที่ควรให้ผู้เล่นตั้งค่า:

- In Safe Zone: Safe Logout
- In Farm Zone: Safe Logout after delay หรือ Offline Guard
- In Frontier/Contested Zone: Offline Guard
- During Combat Lock: Stay in World until combat resolved

ค่าแนะนำ:

```text
Reconnect Window: 60 วินาที
Safe Logout Delay นอก safe zone: 10-30 วินาที
Combat Lock Logout: ค้างในโลกอย่างน้อย 20 วินาที และต่อเนื่องจน combat lock หมด
Offline Guard Duration: 2-8 ชั่วโมง ตาม balance
```

กฎ Offline Guard:

- ต้องเลือกเปิดเองตอนออกเกม
- ใช้ไม่ได้ใน safe zone ถ้าไม่จำเป็น หรือใช้ได้แต่ไม่มีผล combat
- ใช้ได้ดีสุดบน owned tile, frontier, contested zone
- ตัวละครไม่เดินไล่ศัตรูออกจาก tile เอง
- ตัวละครตอบโต้เฉพาะศัตรูที่โจมตีหรือเข้ามาในระยะสกิลที่ตั้งไว้
- ใช้เฉพาะสกิลที่ผู้เล่นตั้งไว้ใน Offline Loadout
- ทุกสกิลยังใช้ cooldown, Energy, MP, material และ durability ตามปกติ
- ถ้า Energy/MP หมด จะเหลือแค่ basic defense หรือไม่สวนกลับ
- ไม่สามารถเริ่ม claim tile ใหม่ขณะ offline
- ไม่ควรได้ EXP เต็มจากการฆ่าผู้เล่นขณะ offline
- contribution จาก offline guard ต้องมี cap ต่อวัน/สัปดาห์

ตัวอย่าง Offline Loadout:

- Slot 1: Basic Attack
- Slot 2: สกิลสวนเมื่อศัตรูประชิด
- Slot 3: สกิลป้องกันหรือ heal ตัวเอง
- Slot 4: สกิล territory defense ถ้าเป็น tile เมืองตัวเอง

ตัวอย่างตามอาชีพ:

- Knight: เปิด Guard Stance และ Hold Ground
- Archer: ยิง Quick Shot ถ้าศัตรูอยู่ใน Line of Sight ระยะ 3 ช่อง
- Mage: ใช้ Frost Field เมื่อมีศัตรูมากกว่า 1 คนในพื้นที่
- Priest: ใช้ Shield/Heal ตัวเองหรือพันธมิตรที่อยู่ใกล้
- Engineer: turret/trap ที่วางไว้ทำงานต่อ แต่ซ่อม/วางใหม่ไม่ได้ถ้าไม่มี loadout และ resource

ข้อจำกัดเพื่อกัน abuse:

- Offline Guard มีเวลาสูงสุด เช่น 2-8 ชั่วโมง แล้วตัวละครกลับเป็น inactive หรือถูกส่งกลับเมือง
- ถ้า HP ต่ำมาก อาจเข้าสู่ wounded state และไม่สวนกลับเต็มกำลัง
- ถ้าถูกฆ่าขณะ offline อาจมี death penalty เบากว่า online เล็กน้อย แต่ยังเสีย durability/Energy บางส่วน
- ห้ามใช้ Offline Guard ซ้อนจำนวนมากจาก account เดียวกันในพื้นที่เดียวกัน
- ถ้า server ตรวจพบการใช้ตัวละคร offline เพื่อ block ทางเข้าแบบผิดปกติ ต้องมี decay หรือ forced return

ข้อมูลที่ต้องเก็บ:

- logout_mode
- default_logout_mode_by_zone
- disconnect_reason
- last_seen_at
- reconnect_expires_at
- combat_lock_expires_at
- offline_guard_enabled
- offline_guard_started_at
- offline_guard_expires_at
- offline_skill_loadout
- offline_ai_profile
- offline_guard_energy
- offline_guard_contribution_today

## 7. Level และ EXP

ตัวละครมี character level เป็น progression หลัก

ข้อมูล:

- level
- current EXP
- required EXP
- total EXP
- stat points
- skill points

แหล่ง EXP:

- ฆ่ามอนสเตอร์
- ทำ quest
- เก็บ resource
- craft สำเร็จ
- ยึดพื้นที่
- ป้องกันพื้นที่
- เข้าร่วม PvP หรือ city mission
- ตอบคำถามถูกใน action สำคัญ

หลักการ:

- EXP จากคำถามควรเป็น bonus ไม่ใช่แหล่งหลักทั้งหมด
- EXP จาก PvP ต้องป้องกันการปั๊มกันเอง
- EXP จาก territory ควรให้ตาม contribution จริง ไม่ใช่แค่ยืนเฉย ๆ
- Level system รายละเอียดอยู่ใน `12-Level-System.md`

## 8. Class

ตัวละครมี class สำหรับกำหนดบทบาทในการเล่น

ข้อมูล:

- class id
- class level หรือ class mastery
- unlocked skills
- skill loadout
- class passive

บทบาท class ควรครอบคลุม:

- Tank: ยืนป้องกัน tile และรับ damage
- Melee DPS: สู้ระยะประชิดและไล่ล่า
- Ranged DPS: ยิงจากระยะปลอดภัย
- Mage: damage พื้นที่และ control
- Healer/Support: ช่วย party และป้องกันแนวหน้า
- Scout: เดินเร็ว เห็นพื้นที่ไกล เหมาะกับสำรวจ
- Engineer/Crafter: ช่วย claim, repair, build outpost หรือ craft

หลักการ:

- ทุก class ต้องมีประโยชน์ทั้ง PvE และ territory war
- ไม่ควรมี class ที่เก่งทุกอย่าง
- class อาจเปลี่ยนได้ในอนาคต แต่ต้องมี cost หรือ cooldown
- รายละเอียดอยู่ใน `11-Class-System.md`

## 9. Stats

Character stats แบ่งเป็น 4 กลุ่ม

### 8.1 Combat Stats

- HP
- MP
- Attack
- Magic Attack
- Defense
- Magic Defense
- Accuracy
- Dodge
- Critical Rate
- Critical Damage
- Attack Speed

### 8.2 World Map Stats

- Energy
- Max Energy
- Energy Regen
- Movement Range
- Movement Cost Reduction
- Mount Control
- Vision Range

### 8.3 Territory Stats

- Claim Power
- Claim Speed
- Defense Contribution
- Siege Damage
- Repair Power
- Guard Bonus

### 8.4 Utility Stats

- Luck
- Drop Rate
- Gathering Power
- Crafting Focus
- Inventory Capacity
- Knowledge Bonus

หลักการ:

- Combat stats ใช้ในการสู้มอนและ PvP
- World map stats ทำให้การเดินและสำรวจมี build ได้
- Territory stats ทำให้ผู้เล่นที่ไม่ใช่สายฆ่าคนยังช่วยเมืองได้
- Utility stats ใช้กับฟาร์มและคราฟ
- สูตรละเอียดอยู่ใน `13-Stat-System.md`

## 10. Energy และ Movement

Energy เป็นค่าหลักสำหรับการเดินบน world map

กฎเริ่มต้น:

- เดิน 1 ช่องใช้ Energy 1 หน่วย
- ถ้าตอบคำถาม movement ถูก เดินได้ 2 ช่องต่อ action
- สัตว์ขี่เพิ่ม movement range
- Terrain บางชนิดเพิ่ม Energy cost
- ถนน เมือง หรือ buff อาจลด Energy cost

ข้อมูลที่ตัวละครต้องเก็บ:

- current Energy
- Max Energy
- last Energy regen time
- movement bonus
- movement penalty
- active mount id

ตัวอย่าง movement:

| สถานะ | ระยะเดินต่อ action |
| --- | --- |
| เดินปกติ | 1 ช่อง |
| ตอบคำถามถูก | 2 ช่อง |
| ขี่ม้า | 2 ช่อง |
| ขี่ม้า + ตอบถูก | 3 ช่อง |
| ขี่มังกร | 5 ช่อง |
| ขี่มังกร + ตอบถูก | 6 ช่อง |

## 11. Combat State, Death และ Respawn

สถานะ combat:

- current HP
- current MP
- target id
- combat mode: PvE/PvP
- last attack time
- cooldowns
- active buffs/debuffs
- combat_lock_expires_at
- mount_lock_expires_at
- safe_logout_lock_expires_at

Combat Lock:

- เกิดเมื่อโจมตี โดนโจมตี ใช้ hostile skill หรือร่วม PvP/territory combat
- ระยะเวลาเริ่มต้น 20 วินาที
- timer refresh เมื่อมี action ต่อสู้ใหม่
- ระหว่าง Combat Lock ผู้เล่นไม่สามารถ Safe Logout ได้
- ระหว่าง Combat Lock การปิด browser จะทำให้ตัวละครค้างอยู่ในโลกตามกฎ Offline Guard/Disconnect
- ระหว่าง Combat Lock ไม่ควรขึ้น mount ได้ หรือ mount speed ถูกลด/ยกเลิก

Death rules:

1. HP เหลือ 0
2. ตัวละครเข้าสู่สถานะ dead
3. combat/claim action ถูกยกเลิก
4. แสดงหน้าจอ death summary
5. ผู้เล่น respawn ที่เมืองเกิดหรือ respawn point
6. ใช้ spawn protection ชั่วคราวหลังเกิด

ถ้าตายระหว่าง Offline Guard:

- ตัวละครหยุด offline guard ทันที
- respawn กลับเมืองเกิด
- owner เห็น death report ตอน login กลับมา
- tile defense contribution คำนวณตามเวลาหรือ action ที่เกิดขึ้นจริงก่อนตาย

Penalty ที่เป็นไปได้:

- durability ของ equipment ลด
- Energy ลดบางส่วน
- เสียเวลา respawn
- drop เฉพาะ resource บางส่วนใน contested zone

หลักการ:

- การตายต้องมีความหมาย แต่ไม่ควรโหดจนผู้เล่นใหม่เลิกเล่น
- ใน safe zone ไม่ควรถูกโจมตี
- ช่วง tutorial ควรลดโทษตาย

## 12. Equipment Link

ตัวละครมี equipment slots:

- weapon
- sub weapon/shield
- helmet
- armor
- gloves
- boots
- cape
- ring 1
- ring 2
- necklace
- artifact
- rune
- charm

อุปกรณ์ส่งผลต่อ:

- stat
- skill bonus
- movement
- Energy
- claim
- gathering/crafting
- PvP resistance

รายละเอียดอยู่ใน `22-Equipment-System.md`

## 13. Inventory Link

ตัวละครมี inventory สำหรับ:

- gold
- diamond หรือ premium currency
- consumable
- resource
- crafting material
- equipment
- quest item
- pet item
- mount item

หลักการ:

- Inventory capacity อาจขยายได้ด้วย bag/equipment/pet
- Resource ที่ drop จาก PvP ต้องระวัง balance
- รายละเอียดอยู่ใน `21-Item-System.md`

## 14. Mount Link

Mount คือระบบเพิ่ม mobility บน world map

ข้อมูล:

- active mount id
- owned mounts
- mount stamina
- mount cooldown
- mount speed/movement range

บทบาท:

- เพิ่มช่องเดิน
- ลด Energy cost
- ช่วยขน resource
- ใช้หนีหรือเข้าพื้นที่ contested

ข้อจำกัด:

- Mount บางชนิดใช้ไม่ได้ใน dungeon
- Mount อาจถูกยกเลิกเมื่อเข้า combat
- Mount ระดับสูงควรมี cooldown/stamina เพื่อไม่ให้ข้ามเกมเร็วเกินไป

รายละเอียดอยู่ใน `28-Mount-System.md`

## 15. Pet Link

Pet คือ companion ที่ช่วยผู้เล่นใน combat, support, gathering หรือ territory

ข้อมูล:

- active pet id
- owned pets
- pet level
- pet skills
- pet loyalty/energy ถ้ามี

บทบาท:

- ช่วยโจมตี
- ช่วยบัฟ
- ช่วยเก็บของ
- ช่วยเพิ่ม drop/gather rate
- ช่วย claim หรือ defend tile

รายละเอียดอยู่ใน `26-Pet-System.md` และ `27-Pet-Skill.md`

## 16. Knowledge Mastery Link

ตัวละครมี Knowledge Mastery แยกตามหมวดความรู้

ตัวอย่าง:

- Math
- Science
- Thai
- English
- History
- Geography
- Logic
- Coding

ผลต่อเกม:

- เพิ่ม bonus เมื่อตอบคำถามถูกในหมวดนั้น
- ปลดล็อก skill/equipment/quest บางอย่าง
- เพิ่มประสิทธิภาพ action เฉพาะ เช่น crafting, machine, rune, route
- ใช้เป็น achievement/ranking ได้

หลักการ:

- Knowledge Mastery เป็น bonus และ unlock ไม่ควรแทนที่ stat/build ทั้งหมด
- PvP ต้องไม่กลายเป็นชนะเพราะเก่งคำถามอย่างเดียว
- รายละเอียดอยู่ใน `34-Knowledge-System.md`

## 17. Territory Contribution

ตัวละครต้องเก็บ contribution ต่อเมือง

ข้อมูล:

- tiles claimed
- tiles defended
- contested battles joined
- enemy players defeated
- city missions completed
- resources delivered to city
- weekly contribution
- season contribution
- city rank
- offline guard defense time
- offline guard successful defense

การใช้:

- แจก reward รายวัน/รายสัปดาห์
- จัดอันดับผู้เล่นในเมือง
- ปลดล็อก title
- เพิ่มสิทธิ์ซื้อของใน city shop
- ใช้คำนวณ season reward

หลักการ:

- ต้องกันการปั๊ม contribution
- การช่วยป้องกันและ supply ควรได้แต้ม ไม่ใช่เฉพาะฆ่าผู้เล่น
- ผู้เล่น solo ควรมีทางช่วยเมืองได้
- Offline contribution ต้องน้อยกว่า online contribution เพื่อไม่ให้การออกเกมเฝ้าพื้นที่ดีกว่าการเล่นจริง

## 18. Character Creation Flow

Flow สร้างตัวละคร:

1. เลือกชื่อ
2. ปรับรูปลักษณ์
3. เลือกเมืองเกิด 1 ใน 4 หรือสุ่ม
4. เลือก class เริ่มต้น หรือเลือก novice ก่อน
5. ยืนยันตัวละคร
6. Spawn ในเมืองเกิด
7. รับ main quest/tutorial แรก

ตัวเลือกสุ่มเมืองเกิด:

- ให้ bonus เล็กน้อย เช่น starter resource หรือ EXP boost ชั่วคราว
- ใช้ช่วยกระจายผู้เล่นให้เมืองไม่ imbalance

## 19. UI/UX

Character UI ควรมี tab:

- Overview: ชื่อ เลเวล class เมืองเกิด title
- Stats: stat รวมและ stat จากอุปกรณ์
- Equipment: slot สวมใส่
- Inventory shortcut
- Skills
- Knowledge Mastery
- Mount
- Pet
- Territory
- Offline Guard

บน world map ควรแสดง:

- HP/MP
- Energy
- level
- class icon
- city color
- active mount
- active pet
- current status เช่น moving, combat, claiming
- offline guard icon ถ้าผู้เล่นออกเกมแต่ตัวยังอยู่บนโลก

Logout UI:

- Safe Logout
- Stay in World / Offline Guard
- แสดงคำเตือนว่าอาจถูกโจมตีและตายได้
- แสดงเวลาคงเหลือของ Offline Guard
- เลือก Offline Skill Loadout ก่อนออกเกมได้
- ตั้งค่า Default Logout Mode สำหรับกรณีปิดเว็บ/เน็ตหลุด
- แสดง Combat Lock timer เมื่อออกเกมไม่ได้ทันที

## 20. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- characters
- character_appearances
- character_positions
- character_statuses
- character_stats
- character_levels
- character_classes
- character_energy
- character_equipment
- character_inventories
- character_mounts
- character_pets
- character_knowledge_masteries
- character_contributions
- character_deaths
- character_respawns
- character_unlocks
- character_logout_states
- character_offline_guards
- character_offline_skill_loadouts
- character_combat_locks
- character_disconnect_sessions

## 21. API/Event ที่เกี่ยวข้อง

REST/API:

- `POST /characters`
- `GET /characters`
- `GET /characters/:id`
- `PATCH /characters/:id/appearance`
- `POST /characters/:id/select-city`
- `GET /characters/:id/stats`
- `GET /characters/:id/status`
- `POST /characters/:id/respawn`
- `POST /characters/:id/logout/safe`
- `POST /characters/:id/logout/offline-guard`
- `POST /characters/:id/offline-loadout`
- `POST /characters/:id/logout-settings`
- `POST /characters/:id/reconnect`

Realtime Events:

- `character:created`
- `character:entered_world`
- `character:moved`
- `character:status_changed`
- `character:level_up`
- `character:class_changed`
- `character:energy_changed`
- `character:died`
- `character:respawned`
- `character:equipment_changed`
- `character:mount_changed`
- `character:pet_changed`
- `character:offline_guard_started`
- `character:offline_guard_ended`
- `character:offline_guard_attacked`
- `character:offline_guard_defended`
- `character:combat_lock_started`
- `character:combat_lock_ended`
- `character:disconnected`
- `character:reconnected`

## 22. Edge Cases

- ผู้เล่น disconnect ระหว่าง combat
- ผู้เล่น disconnect ระหว่าง claim tile
- ผู้เล่นเลือก Offline Guard แล้วถูกโจมตีทันที
- ผู้เล่นปิด browser หลังโจมตีทันที
- ผู้เล่น refresh หน้าเว็บระหว่าง Combat Lock
- ผู้เล่นเน็ตหลุดแล้ว reconnect หลังตัวละครตาย
- ผู้เล่น offline guard จน Energy/MP หมด
- ผู้เล่นใช้หลาย account วางตัวละครขวางทาง
- offline guard ฆ่าผู้เล่นแล้ว reward/contribution ต้องไม่สูงเกิน
- ผู้เล่นตายตอน Energy หมด
- ผู้เล่นเมืองเดียวกันขวางกันเอง
- ผู้เล่นพยายามเปลี่ยนเมืองเพื่อรับ reward สองฝั่ง
- ตัวละครติดอยู่ใน tile ที่กลายเป็น blocked
- mount ถูกยกเลิกกลาง movement
- pet หรือ mount active หายเพราะข้อมูล sync ผิด
- level up พร้อมกับตาย
- reward จาก territory เข้า character ผิดตัว

## 23. TODO

- กำหนดชื่อเมืองเกิดทั้ง 4 และ city id
- ตัดสินใจว่าเริ่มเกมเลือก class เลยหรือเริ่มเป็น novice
- กำหนด character level cap สำหรับ MVP
- กำหนด Max Energy เริ่มต้นและ Energy regen
- กำหนด death penalty สำหรับ safe/farm/contested/center zone
- กำหนดกฎ Offline Guard, เวลาสูงสุด, reward cap และ AI loadout
- กำหนด Default Logout Mode UI สำหรับ browser disconnect
- กำหนด Combat Lock 20 วินาที, Mount Lock และ Safe Logout Lock
- กำหนด stat เริ่มต้นตาม class
- กำหนด character database schema เวอร์ชันแรก
