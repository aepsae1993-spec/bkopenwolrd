# 04-WorldMap

> สถานะ: Draft v1

## 1. ภาพรวม

World Map ของ EduQuest Online เป็นแผนที่ออนไลน์แบบช่อง ๆ หรือ tile/grid map ผู้เล่นทุกคนอยู่ในโลกเดียวกัน เห็นกันได้ เดินบนช่องได้ เจอมอนสเตอร์ เก็บทรัพยากร ยึดพื้นที่ และต่อสู้กับผู้เล่นอื่นแบบ realtime หรือ near-realtime

แกนของระบบคือ:

> 4 เมืองเกิดรอบแผนที่ -> ฟาร์มและขยายพื้นที่ออกจากเมือง -> แย่งชิงพื้นที่ว่าง/พื้นที่ศัตรู -> มุ่งหน้าเข้าสู่ศูนย์กลางแผนที่

กลางแผนที่เป็นจุดศูนย์กลางของโลก มีทรัพยากร บอส event และรางวัลสำคัญ ส่วนรอบนอกมีเมืองเกิด 4 เมือง 4 ทิศ ผู้เล่นเลือกเมืองเกิดตอนเริ่มเกมหรือให้ระบบสุ่มเมืองเกิดได้

## 2. โครงสร้างแผนที่

แผนที่เป็น grid ขนาดใหญ่ เช่น 500 x 500 tiles ในช่วงเริ่มต้น และสามารถขยายเป็น 2000 x 2000 tiles ได้ในอนาคต

โครงสร้างหลัก:

- Center Zone: จุดศูนย์กลางแผนที่ เป็นพื้นที่รางวัลสูงและแย่งชิงสูง
- North City: เมืองเกิดทิศเหนือ
- South City: เมืองเกิดทิศใต้
- East City: เมืองเกิดทิศตะวันออก
- West City: เมืองเกิดทิศตะวันตก
- Starter Farm Ring: พื้นที่ฟาร์มรอบเมืองเกิด
- Resource/Monster Ring: พื้นที่ทรัพยากรและมอนสเตอร์ระดับกลาง
- Contested Ring: พื้นที่ยึดครองและ PvP
- Central War Ring: พื้นที่ก่อนถึงศูนย์กลาง ความเสี่ยงสูง รางวัลสูง

## 3. เมืองเกิด 4 ทิศ

ตอนสร้างตัวละคร ผู้เล่นเลือกเมืองเกิดได้ 1 เมือง หรือเลือกสุ่มเมืองเกิด

เมืองเกิดทำหน้าที่:

- จุด spawn เริ่มต้น
- จุด respawn หลังตาย
- safe zone ที่ห้าม PvP
- ศูนย์รวม NPC ร้านค้า crafting storage และ quest พื้นฐาน
- ฐานหลักของ city influence และ territory war

กฎเบื้องต้น:

- ผู้เล่นสังกัดเมืองเกิดตั้งแต่เริ่มเกม
- เปลี่ยนเมืองเกิดได้เฉพาะเงื่อนไขพิเศษ เช่น ticket, cooldown ยาว หรือ season reset
- เมืองเกิดไม่ควรถูกยึดถาวรในช่วงแรก
- พื้นที่รอบเมืองเกิดมี protection เพื่อป้องกันผู้เล่นใหม่โดนดักตี

## 4. Tile State

แต่ละ tile มีสถานะพื้นฐาน:

- Protected: เมืองเกิดหรือพื้นที่ safe zone ยึดไม่ได้
- Neutral: พื้นที่ว่าง ยังไม่มีเมืองใดครอบครอง
- Owned: พื้นที่ถูกครอบครองโดยเมืองหนึ่ง
- Contested: พื้นที่กำลังถูกแย่งชิง
- Blocked: พื้นที่เดินไม่ได้ เช่น ภูเขาสูง กำแพง น้ำลึก
- Event: พื้นที่มี event ชั่วคราว
- Dungeon Entrance: ทางเข้า dungeon
- Boss Spawn: พื้นที่เกิดบอส

แต่ละ tile อาจมี:

- ผู้เล่น
- มอนสเตอร์
- NPC
- resource node
- chest
- trap/hazard
- claim core
- building/outpost

มอนสเตอร์ที่เกิดบน tile ต้องมี Spawn Anchor และ Leash Rule:

- มอนเดินห่างจุดเกิดได้ไม่เกิน 3 ช่อง
- ถ้าตามผู้เล่นไปช่องที่ 4 มอนจะกลับจุดเกิด
- เมื่อกลับถึงจุดเกิด มอนรี HP เต็ม
- กฎละเอียดอยู่ใน `18-AI-Monster.md`

## 5. การเดินและพลังงาน

การเดินใช้ Energy เป็นตัวจำกัด

กฎพื้นฐาน:

- เดิน 1 ช่องใช้ Energy 1 หน่วย
- ผู้เล่นปกติเดินได้ 1 ช่องต่อ movement action
- ถ้าตอบคำถามถูก เดินได้ 2 ช่อง
- สัตว์ขี่เพิ่มจำนวนช่องที่เดินได้
- Terrain บางชนิดอาจเพิ่ม Energy cost
- ถนนหรือพื้นที่เมืองอาจลด Energy cost

ตัวอย่างระยะเดิน:

| สถานะ | ระยะเดินต่อ action |
| --- | --- |
| เดินปกติ | 1 ช่อง |
| ตอบคำถามถูก | 2 ช่อง |
| ขี่ม้า | 2 ช่อง |
| ขี่ม้า + ตอบถูก | 3 ช่อง |
| ขี่มังกร | 5 ช่อง |
| ขี่มังกร + ตอบถูก | 6 ช่อง |

หมายเหตุ:

- ตัวเลขยังเป็นค่าออกแบบเบื้องต้น ต้อง balance หลัง prototype
- Mount ระดับสูงควรมี stamina, cooldown หรือข้อจำกัดพื้นที่
- Movement quiz ควรสั้นมาก เพื่อไม่ทำให้การเดินสะดุด

## 6. Realtime Player Presence

ผู้เล่นควรเห็นผู้เล่นอื่นใน chunk รอบตัวเองแบบ realtime

ข้อมูลที่ควรแสดง:

- ชื่อตัวละคร
- เมือง/สีฝ่าย
- level โดยประมาณ
- guild ถ้ามี
- สถานะ PvP
- กำลังยืนบน tile ใด
- กำลัง claim, combat, dead หรือ moving
- offline guard ถ้าผู้เล่นออกเกมแต่เลือกให้ตัวละครยังเฝ้าอยู่

หลักการ:

- ไม่จำเป็นต้องโหลดผู้เล่นทั้งโลก โหลดเฉพาะ chunk รอบตัว
- ตำแหน่งต้อง sync เร็วพอให้ PvP และ block tile ทำงานได้
- ถ้าผู้เล่นยืนขวางพื้นที่สำคัญ ผู้เล่นศัตรูต้องสู้ให้ชนะก่อนจึงผ่านหรือยึดได้

## 7. Offline Guard บน World Map

ผู้เล่นสามารถเลือกออกเกมแบบให้ตัวละครยังอยู่บน tile เดิมได้ เรียกว่า Offline Guard

กฎ:

- ตัวละครยังแสดงบนแผนที่
- ผู้เล่นอื่นสามารถโจมตีได้ถ้าอยู่ในเขต PvP
- ตัวละครใช้สกิลสวนกลับอัตโนมัติตาม offline skill loadout
- สกิลยังใช้ Energy, MP, material และ cooldown
- ถ้า Energy/MP หมด ตัวละครป้องกันตัวได้น้อยลง
- ถ้าตาย จะ respawn กลับเมืองเกิด
- ถ้าครบเวลาสูงสุด ตัวละครออกจากโลกหรือกลับเมืองตามกฎที่กำหนด

กรณี browser:

- ถ้าผู้เล่นปิดแท็บ ปิดเว็บ refresh หรือเน็ตหลุด server ต้องตัดสินจาก Default Logout Mode และ combat state
- ถ้าติด Combat Lock ตัวละครต้องค้างบนโลก ไม่หายทันที
- ถ้าไม่ติด combat และอยู่ safe zone สามารถ safe logout ได้
- ถ้าอยู่ contested/frontier zone และตั้งค่า Offline Guard ไว้ ตัวละครจะอยู่เฝ้าต่อ
- ถ้า reconnect ทันเวลา ผู้เล่นกลับมาคุมตัวละครเดิมบน tile เดิม

Combat Lock ที่เกี่ยวกับแผนที่:

- โจมตีหรือโดนโจมตีแล้วติด Combat Lock 20 วินาที
- ระหว่าง Combat Lock ขึ้น mount ไม่ได้หรือ mount ถูกยกเลิก
- ระหว่าง Combat Lock Safe Logout ไม่ได้
- ระหว่าง Combat Lock ถ้าปิดเว็บ ตัวละครยังคงอยู่บน tile และถูกโจมตีได้

ข้อจำกัด:

- ไม่ควรเริ่ม claim tile ขณะ offline
- contribution จาก offline guard ต้องน้อยกว่า online
- ต้องมีระบบกันผู้เล่นวางตัวละคร offline ปิดทางจำนวนมาก
- safe zone logout ควรปลอดภัยและไม่จำเป็นต้องใช้ offline guard

## 8. Territory Claim

ผู้เล่นสามารถยึดพื้นที่ให้เมืองเกิดของตัวเองได้

กรณีพื้นที่ว่าง:

1. ผู้เล่นเดินเข้า tile ที่เป็น Neutral
2. กด claim หรือตี claim core
3. ระบบเริ่ม claim progress
4. ตอบคำถามถูกเพื่อเพิ่ม claim progress หรือย่นเวลา
5. เมื่อ progress เต็ม tile เปลี่ยนเป็น Owned ของเมืองผู้เล่น

กรณีพื้นที่มีผู้เล่นศัตรูยืนอยู่:

1. ผู้เล่น A เมือง 1 เดินเข้าพื้นที่ของเมือง 2
2. พบผู้เล่น B เมือง 2 ยืนป้องกัน
3. ผู้เล่น A ต้องต่อสู้กับผู้เล่น B
4. ถ้าผู้เล่น B ตาย จะ respawn ที่เมืองเกิดของตัวเอง
5. ผู้เล่น A จึงเริ่ม claim หรือโจมตี claim core ได้

กฎสำคัญ:

- พื้นที่ที่จะยึดควรต้องเชื่อมกับพื้นที่ของเมืองตัวเอง หรือมี outpost เงื่อนไขพิเศษ
- การ claim ควรใช้เวลา ไม่ใช่แตะแล้วได้ทันที
- ผู้เล่นฝ่ายเจ้าของพื้นที่ควรมีเวลามาป้องกัน
- พื้นที่กลางแผนที่ควรใช้คนหลายคนหรือกิลด์ช่วยกัน

## 9. PvP บน World Map

PvP เกิดได้ในพื้นที่ที่ไม่ใช่ safe zone/protected zone

กฎเบื้องต้น:

- ผู้เล่นต่างเมืองสามารถโจมตีกันได้ใน contested zone
- ผู้เล่นเมืองเดียวกันไม่ควรโจมตีกัน ยกเว้น duel หรือโหมดพิเศษ
- เมื่อตาย ผู้เล่นกลับไปเกิดที่เมืองเกิดของตัวเอง
- การตายอาจเสีย durability, Energy, time หรือ drop บางอย่าง แต่ไม่ควรโหดเกินจนผู้เล่นใหม่เลิกเล่น
- ผู้เล่นที่เพิ่งเกิดใหม่ควรมี spawn protection ชั่วคราว
- เมื่อโจมตีหรือโดนโจมตี ผู้เล่นติด Combat Lock 20 วินาที
- ระหว่าง Combat Lock ไม่สามารถ Safe Logout หรือขึ้น mount เพื่อหนีได้
- ถ้าปิดเว็บระหว่าง Combat Lock ตัวละครยังอยู่ในโลกและใช้ Offline Guard/Disconnect rule

## 10. Resource และ Monster Distribution

พื้นที่ใกล้เมือง:

- มอนสเตอร์ง่าย
- resource พื้นฐาน
- PvP จำกัดหรือไม่มี
- เหมาะกับผู้เล่นใหม่

พื้นที่กลาง:

- มอนสเตอร์ระดับกลาง
- resource หายากขึ้น
- มี tile ว่างให้ยึด
- เริ่มเจอผู้เล่นต่างเมือง

พื้นที่ใกล้ศูนย์กลาง:

- มอนสเตอร์ยาก
- world boss
- resource หายาก
- PvP หนาแน่น
- เหมาะกับ party/guild

## 11. Center Zone

Center Zone คือเป้าหมายระยะยาวของแผนที่

ควรมี:

- World boss
- rare resource
- dungeon entrance ระดับสูง
- season objective
- city ranking objective
- PvP และ territory war หนาแน่น

หลักการ:

- Center Zone ต้องคุ้มค่าพอให้ผู้เล่นอยากแย่ง
- แต่ไม่ควรจำเป็นจนผู้เล่น solo เล่นไม่ได้
- ควรมี event เป็นรอบ ๆ เพื่อรวมผู้เล่นหลายเมือง

## 12. Chunk Loading

เพื่อรองรับแผนที่ใหญ่และผู้เล่นจำนวนมาก ระบบต้องโหลดเฉพาะพื้นที่ใกล้ตัว

ตัวอย่าง:

- Client โหลด 5x5 chunks รอบผู้เล่น
- 1 chunk อาจมี 16x16 หรือ 32x32 tiles
- Server เป็น authority หลักของตำแหน่ง, combat, claim และ ownership
- Client แสดง prediction ได้ แต่ผลสุดท้ายต้องยึด server state

## 13. UI/UX

World Map UI ควรแสดง:

- Grid/tile ชัดเจน
- สี ownership ของแต่ละเมือง
- icon เมืองเกิดทั้ง 4 ทิศ
- marker ศูนย์กลางแผนที่
- Energy ปัจจุบัน
- movement range ที่เดินได้
- mount status
- tile info เมื่อ hover/click
- ผู้เล่นใกล้เคียง
- offline guard icon
- combat lock timer
- claim progress
- warning เมื่อเข้า PvP zone

## 14. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- world_maps
- world_tiles
- chunks
- cities
- city_memberships
- tile_ownerships
- tile_claims
- tile_resources
- tile_monsters
- tile_events
- player_positions
- movement_logs
- pvp_logs
- death_logs
- respawn_points
- offline_guards
- combat_locks
- disconnect_sessions

## 15. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /world/map`
- `GET /world/chunks`
- `GET /world/tile/:id`
- `POST /world/move`
- `POST /world/claim/start`
- `POST /world/claim/cancel`
- `POST /world/claim/contest`
- `POST /pvp/attack`
- `POST /player/respawn`
- `POST /world/offline-guard/start`
- `POST /world/offline-guard/stop`
- `POST /world/reconnect`

Realtime Events:

- `player:entered_chunk`
- `player:left_chunk`
- `player:moved`
- `player:energy_changed`
- `player:mounted`
- `player:died`
- `player:respawned`
- `player:offline_guard_started`
- `player:offline_guard_ended`
- `player:combat_lock_started`
- `player:combat_lock_ended`
- `player:disconnected`
- `player:reconnected`
- `tile:revealed`
- `tile:claim_started`
- `tile:claim_progress`
- `tile:contested`
- `tile:ownership_changed`
- `pvp:started`
- `pvp:ended`

## 16. Edge Cases

- ผู้เล่นยืนขวางทางสำคัญนานเกินไป
- ผู้เล่นใหม่โดนผู้เล่นเก่าดักตีใกล้เมืองเกิด
- เมืองหนึ่งยึดพื้นที่มากเกินจน snowball
- ผู้เล่น disconnect ระหว่าง PvP หรือ claim
- ผู้เล่นหลายคน claim tile เดียวกันพร้อมกัน
- tile ownership เปลี่ยนขณะผู้เล่นกำลังเดินเข้า tile
- Energy หมดกลางพื้นที่ศัตรู
- mount bonus ทำให้ข้ามพื้นที่ป้องกันได้ง่ายเกินไป
- ผู้เล่นใช้ bot เดินฟาร์มและ claim อัตโนมัติ
- server lag ทำให้ตำแหน่งผู้เล่นไม่ตรงกัน
- ผู้เล่นใช้ offline guard หลายตัวขวาง choke point
- offline guard ถูกโจมตีตอนเจ้าของ reconnect
- offline guard ตายแต่ client เจ้าของยังไม่รู้
- ผู้เล่นปิดเว็บตอน Combat Lock เหลือไม่กี่วินาที
- ผู้เล่น reconnect แล้วตำแหน่ง/HP เปลี่ยนไปจากตอนปิดเว็บ

## 17. TODO

- กำหนดขนาด map และ chunk จริงสำหรับ MVP
- ตั้งชื่อเมืองเกิด 4 ทิศ
- กำหนดสีเมืองและ identity ของแต่ละเมือง
- กำหนด Energy max และการฟื้นฟู Energy
- กำหนด terrain movement cost
- กำหนด mount movement table
- กำหนด claim time, claim progress และ contest rule
- กำหนด safe zone รอบเมืองเกิด
- กำหนด center zone objective
- กำหนด Offline Guard duration, icon, reward cap และ anti-block rule
- กำหนด browser disconnect/reconnect window และ Default Logout Mode
- กำหนด Combat Lock 20 วินาทีบน world map
- ทำ prototype แผนที่ grid ที่เห็นผู้เล่นอื่นและ claim tile ได้
