# 01-Game-Loop

> สถานะ: Draft v1

## 1. ภาพรวม

Game Loop ของ EduQuest Online ต้องทำให้ผู้เล่นรู้สึกว่าเขากำลังเล่น MMORPG จริงบน world map แบบช่อง ๆ ผู้เล่นเดินทางบน grid เดียวกันแบบออนไลน์ เจอกันได้ ตีกันได้ ยึดพื้นที่ได้ ฟาร์มทรัพยากร ต่อสู้กับมอนสเตอร์ อัปเกรดตัวละคร และขยายอิทธิพลของเมืองเกิดตัวเอง โดยระบบคำถามและ Knowledge Mastery แทรกอยู่ในจังหวะสำคัญของการเล่น ไม่ใช่แยกออกมาเป็นโหมดทำข้อสอบ

แกนหลักของ loop คือ:

> เลือกเมืองเกิด -> เดินบนช่องด้วยพลังงาน -> เจอพื้นที่/มอน/ผู้เล่น -> ตอบคำถามเพื่อเพิ่มประสิทธิภาพ -> สู้/ฟาร์ม/ยึดพื้นที่ -> ได้รางวัล -> ขยายอิทธิพล -> กลับมาแข็งแกร่งขึ้น

## 2. เป้าหมายของ Game Loop

- ผู้เล่นต้องมี action ให้ทำตลอดเวลาโดยไม่รู้สึกว่าง
- คำถามต้องเพิ่มความตื่นเต้น ไม่ทำให้เกมหยุดนานเกินไป
- การตอบถูกต้องให้รางวัลชัดเจน แต่ตอบผิดยังเล่นต่อได้
- ทุก session ควรมีความคืบหน้าอย่างน้อย 1 อย่าง เช่น EXP, item, gold, mastery, quest progress หรือ map discovery
- แผนที่ต้องทำให้ผู้เล่นรู้สึกว่าโลกมีชีวิต เพราะมีผู้เล่นอื่นเคลื่อนที่ ป้องกันพื้นที่ และบุกพื้นที่พร้อมกัน
- การยึดพื้นที่ต้องเป็นเป้าหมายหลักที่ทำให้ผู้เล่นอยากร่วมมือกับเมืองหรือกิลด์ของตัวเอง
- Loop ต้องรองรับทั้ง solo, party, guild และ endgame
- MVP ต้องพิสูจน์ loop สำรวจ-ตอบคำถาม-สู้-เก็บของ-อัปเกรด ให้สนุกก่อน

## 3. Core Loop

1. ผู้เล่นเลือกเมืองเกิดและเป้าหมาย
   - เลือกเมืองเกิด 1 ใน 4 ทิศ หรือสุ่มเมืองเกิด
   - สำรวจแผนที่
   - ทำเควส
   - ฟาร์มวัตถุดิบ
   - ล่ามอนสเตอร์
   - บุกยึดพื้นที่
   - ป้องกันพื้นที่ของเมือง
   - ลงดันเจียน
   - ช่วยปาร์ตี้หรือกิลด์

2. ผู้เล่นเดินทางใน world map
   - แผนที่เป็น grid/tile
   - เดินตามจำนวนพลังงานที่มี
   - ปกติเดินได้ 1 ช่องต่อ action
   - ถ้าตอบคำถามถูก เดินได้ 2 ช่อง
   - สัตว์ขี่เพิ่มระยะเดิน เช่น ม้า +2 ช่อง, มังกร +5 ช่อง
   - ระบบโหลด chunk รอบตัวผู้เล่น
   - เห็นผู้เล่นอื่นที่อยู่ในพื้นที่ใกล้เคียงแบบ realtime
   - มีโอกาสพบ monster, resource, NPC, chest, event, dungeon entrance หรือ tile ที่ยึดได้

3. ผู้เล่นเจอ action challenge
   - โจมตี
   - ใช้สกิล
   - เก็บทรัพยากร
   - เปิดหีบ
   - ยึดพื้นที่ว่าง
   - ต่อสู้กับผู้เล่นที่ยืนป้องกันพื้นที่
   - ผ่านกับดัก
   - เจรจากับ NPC

4. ระบบเรียกคำถามตามบริบท
   - biome
   - action type
   - difficulty ของพื้นที่
   - Knowledge Mastery ของผู้เล่น
   - quest หรือ event ที่เกี่ยวข้อง

5. ผลลัพธ์เกิดจากทั้ง stat และคำตอบ
   - stat, equipment, class, element และ skill เป็นฐาน
   - คำตอบถูกเพิ่ม bonus, success rate หรือ reward quality
   - คำตอบผิดลดประสิทธิภาพ แต่ไม่ควรหยุดเกมทันที
   - การยึดพื้นที่ขึ้นกับสถานะ tile, ผู้เล่นที่ป้องกัน, combat result และ claim progress

6. ผู้เล่นได้รับรางวัล
   - EXP
   - gold
   - item
   - resource
   - Knowledge Mastery
   - quest progress
   - map discovery
   - territory contribution
   - city influence

7. ผู้เล่นอัปเกรดและตั้งเป้าหมายถัดไป
   - level up
   - ใส่อุปกรณ์ใหม่
   - อัปสกิล
   - คราฟของ
   - ปลดล็อกพื้นที่ใหม่
   - ช่วยเมืองขยายเส้นทางไปยังกลางแผนที่
   - เตรียมลง content ที่ยากขึ้น

## 4. World Layout Loop

โครงสร้างโลกพื้นฐาน:

1. กลางแผนที่เป็นศูนย์กลางของโลก
   - มีทรัพยากรหายาก
   - มี world boss หรือ event สำคัญ
   - เป็นพื้นที่แย่งชิงระยะยาว

2. รอบนอกมีเมืองเกิด 4 เมือง 4 ทิศ
   - เมืองเหนือ
   - เมืองใต้
   - เมืองตะวันออก
   - เมืองตะวันตก

3. ผู้เล่นเลือกเมืองเกิดตอนเริ่มเกม
   - เมืองเกิดเป็นจุด respawn หลัก
   - เมืองเกิดเป็น safe zone
   - ผู้เล่นของเมืองเดียวกันควรมีเป้าหมายร่วมในการขยายพื้นที่

4. พื้นที่ระหว่างเมืองกับศูนย์กลาง
   - ชั้นแรกเป็นพื้นที่ฟาร์มเริ่มต้น
   - ชั้นถัดไปเป็นมอนสเตอร์และทรัพยากรระดับกลาง
   - ชั้นลึกเป็นพื้นที่ PvP และ territory claim
   - ใกล้กลางแผนที่เป็นพื้นที่รางวัลสูงและอันตรายสูง

## 5. Micro Loop: 10-60 วินาที

Micro Loop คือจังหวะสั้นที่สุดที่ผู้เล่นทำซ้ำบ่อย ๆ

ตัวอย่าง:

1. เห็นมอนสเตอร์บน tile ใกล้ตัว
2. เดินเข้าไปหา
3. เริ่ม combat
4. ระบบสุ่มคำถามสั้นตามหมวด
5. ผู้เล่นตอบ
6. สกิลหรือการโจมตีเกิดผล
7. มอนสเตอร์เสีย HP หรือผู้เล่นโดนสวน
8. ได้ EXP/item เมื่อชนะ

ตัวอย่าง territory micro loop:

1. ผู้เล่นเดินเข้า tile ว่างที่ยังไม่มีใครครอบครอง
2. กด claim หรือโจมตี core ของพื้นที่
3. ระบบสุ่มคำถามแบบ Rune Sync หรือ Tactical Insight
4. ตอบถูกเพื่อเพิ่ม claim progress
5. ถ้าไม่มีผู้เล่นฝ่ายอื่นมาขัดขวาง tile จะถูกยึดให้เมืองของผู้เล่น
6. ผู้เล่นได้รับ territory contribution และ city influence

ตัวอย่าง PvP territory micro loop:

1. ผู้เล่น A จากเมือง 1 เดินเข้าใกล้พื้นที่ของเมือง 2
2. มีผู้เล่น B เมือง 2 ยืนป้องกันอยู่บน tile
3. ผู้เล่น A ต้องสู้กับผู้เล่น B ก่อน
4. คำถามช่วยเพิ่ม damage, accuracy, movement หรือ skill success
5. ถ้าผู้เล่น B ตาย จะกลับไปเกิดเมืองตัวเอง
6. ผู้เล่น A จึงเริ่ม claim tile ได้

หลักการ:

- คำถามใน micro loop ควรสั้น กระชับ และตอบได้ไว
- เวลาอ่านและตอบไม่ควรทำให้ combat หมดจังหวะ
- ควรมี feedback ทันที เช่น damage number, critical, mastery gain
- การตอบผิดควรสร้างผลเสียแบบรับรู้ได้ เช่น damage ลด, miss, cooldown เพิ่ม แต่ไม่ควรทำให้แพ้ทันทีทุกครั้ง

## 6. Session Loop: 5-30 นาที

Session Loop คือประสบการณ์หนึ่งรอบการเล่น

ตัวอย่าง session:

1. Login เข้าเกม
2. รับ daily quest หรือเลือกเป้าหมาย
3. ตรวจดูพื้นที่ของเมืองตัวเองบนแผนที่
4. เดินทางไป biome หรือแนวหน้าที่ต้องการ
5. ต่อสู้ เก็บทรัพยากร หรือยึดพื้นที่
6. ตอบคำถามหลายหมวดตามกิจกรรม
7. ได้ item, EXP, mastery, territory contribution และ quest progress
8. กลับเมืองเพื่อขายของ คราฟ อัปเกรด หรือเกิดใหม่หลังตาย
9. เตรียมตัวไปพื้นที่ที่ยากขึ้นหรือช่วยเมืองบุกต่อ

เป้าหมาย:

- ผู้เล่นควรรู้สึกว่าการเล่น 10 นาทีมีความคืบหน้า
- Session สั้นต้องเล่นได้โดยไม่ต้องลงดันเจียนยาว
- Session ยาวควรมีเป้าหมายใหญ่ เช่น boss, dungeon, party quest
- ผู้เล่นสาย PvP ควรมีเป้าหมายชัด เช่น ป้องกันแนวหน้า ชิง tile ว่าง หรือไล่ผู้เล่นศัตรูออกจากพื้นที่

## 7. Daily/Weekly Loop

Daily Loop:

- Login reward
- Daily quest
- Daily dungeon
- Daily knowledge challenge
- World event รอบสั้น
- Resource node refresh
- Territory contribution reward

Weekly Loop:

- Weekly quest
- Guild objective
- Raid lockout
- Weekly boss
- Ranking reward
- Knowledge review challenge
- City war summary reward

หลักการ:

- Daily ไม่ควรกลายเป็นงานบ้านที่น่าเบื่อ
- Reward ต้องช่วยให้ผู้เล่นตามทันได้ แต่ไม่ควรบังคับ login ทุกวันจนกดดัน
- Weekly content ใช้สำหรับเป้าหมายใหญ่และ social play

## 8. Long-Term Loop

Long-Term Loop คือเหตุผลที่ผู้เล่นอยู่กับเกมหลายสัปดาห์หรือหลายเดือน

- เก็บ level ตัวละคร
- ปั้น class และ build เฉพาะตัว
- สะสม equipment rarity สูง
- เพิ่ม Knowledge Mastery รายวิชา
- ปลดล็อก skill, awakening, title และ achievement
- สะสม pet และ mount
- เข้ากิลด์และทำ guild progression
- ช่วยเมืองเกิดยึดพื้นที่และเปิดเส้นทางไปกลางแผนที่
- แข่งขันอิทธิพลระหว่าง 4 เมือง
- ลง dungeon/raid ที่ยากขึ้น
- แข่งขัน ranking และ season
- สำรวจ continent ใหม่

## 9. บทบาทของ Quiz ใน Loop

Quiz ไม่ใช่ mode แยก แต่เป็นตัวปรับผลลัพธ์ของ action

รูปแบบการใช้:

- Movement Check: ตอบถูกเพื่อเดินได้ไกลขึ้น เช่น ปกติ 1 ช่อง ตอบถูก 2 ช่อง
- Combat Check: เพิ่ม damage, critical, accuracy หรือ skill success
- Resource Check: เพิ่มจำนวน resource หรือเพิ่มโอกาสได้ rare material
- Territory Check: เพิ่ม claim progress หรือลดเวลายึดพื้นที่
- Craft Check: เพิ่ม success rate, quality หรือ bonus stat
- Dialogue Check: เปิดทางเลือกคำตอบ clue หรือ quest path
- Dungeon Mechanic: แก้ puzzle, ปิดกับดัก, หยุด boss skill
- Guild/Raid Check: ให้สมาชิกช่วยกันตอบเพื่อผ่าน mechanic ร่วม

ข้อควรระวัง:

- หลีกเลี่ยงการถามทุก action จนถี่เกินไป
- คำถามยากควรอยู่กับ reward หรือ content ที่เหมาะสม
- คำถามที่ตอบผิดไม่ควรทำให้ผู้เล่นเสียเวลาหนักเกินไป
- ควรมีระบบทบทวนคำถามที่เคยผิดแบบสมัครใจ

## 10. Movement/Energy Loop

การเดินใช้พลังงานเป็นตัวจำกัดการเคลื่อนที่และสร้างจังหวะให้คำถามมีความหมาย

กฎเบื้องต้น:

- ผู้เล่นมี Energy สำหรับการเดิน
- การเดิน 1 ช่องใช้ Energy 1 หน่วย
- ถ้าไม่ตอบคำถามหรือไม่ผ่าน bonus check จะเดินได้ตามค่าพื้นฐาน
- ถ้าตอบคำถามถูก จะได้ Movement Bonus
- สัตว์ขี่เพิ่ม Movement Range ตามชนิด

ตัวอย่างค่าเริ่มต้น:

| สถานะ | ระยะเดินต่อ action |
| --- | --- |
| เดินปกติ | 1 ช่อง |
| ตอบคำถามถูก | 2 ช่อง |
| ขี่ม้า | 2 ช่อง |
| ขี่ม้า + ตอบถูก | 3 ช่อง |
| ขี่มังกร | 5 ช่อง |
| ขี่มังกร + ตอบถูก | 6 ช่อง |

หมายเหตุ:

- ตัวเลขนี้เป็นค่าเริ่มต้นสำหรับออกแบบ ยังต้อง balance อีกครั้ง
- พื้นที่บางชนิดอาจมี movement penalty เช่น ป่า หนองน้ำ ภูเขา หิมะ
- ถนนหรือพื้นที่เมืองอาจลด Energy cost
- Mount ระดับสูงควรมีข้อจำกัด เช่น cooldown, stamina หรือใช้ไม่ได้ในบาง dungeon

## 11. Territory Loop

พื้นที่บนแผนที่มีสถานะ ownership:

- Neutral: ยังไม่มีใครครอบครอง
- City Owned: เมืองใดเมืองหนึ่งครอบครอง
- Contested: กำลังถูกแย่งชิง
- Protected: เมืองเกิดหรือพื้นที่สำคัญที่ยังยึดไม่ได้

กฎยึดพื้นที่:

1. ผู้เล่นเดินไปยัง tile ที่ยึดได้
2. ถ้า tile เป็น Neutral ผู้เล่นเริ่ม claim ได้ทันที
3. ถ้า tile เป็นของเมืองอื่นและไม่มีผู้เล่นป้องกัน อาจต้องตี guardian/core ของพื้นที่
4. ถ้ามีผู้เล่นศัตรูยืนอยู่ ต้องสู้ให้ชนะก่อน
5. เมื่อ claim progress ครบ tile จะเปลี่ยน ownership เป็นเมืองของผู้เล่น
6. ผู้เล่นที่ตายจะ respawn ที่เมืองเกิดของตัวเอง

ข้อควรมีเพื่อ balance:

- พื้นที่ใกล้เมืองเกิดควรมี protection สูง
- การยึดพื้นที่ลึกควรต้องเชื่อมกับพื้นที่ที่เมืองตัวเองถือครองอยู่
- ควรมีเวลาหรือ resource cost ในการ claim เพื่อไม่ให้วิ่งยึดเร็วเกินไป
- เมืองที่เสียพื้นที่มากควรมี comeback bonus บางอย่าง

## 12. Reward Loop

รางวัลแบ่งเป็น 5 ประเภท:

### 12.1 Immediate Reward

- Damage เพิ่ม
- Critical
- Item drop
- Gold
- EXP
- Mastery point
- Movement bonus
- Claim progress

### 12.2 Short-Term Reward

- Quest progress
- Level up
- Skill point
- Equipment upgrade
- Craft material ครบ
- Territory contribution

### 12.3 Mid-Term Reward

- Unlock biome
- Unlock dungeon
- Unlock class skill
- Pet acquisition
- Rare equipment
- City influence reward

### 12.4 Long-Term Reward

- Awakening
- Mythic/Legendary gear
- Guild rank
- Season reward
- Knowledge title
- City territory ranking

### 12.5 Social Reward

- Party bonus
- Guild contribution
- Raid clear reward
- Marketplace profit
- Ranking position
- City war reward

## 13. MVP Game Loop

MVP ควรทำเฉพาะ loop ที่พิสูจน์แกนเกม:

1. Player login
2. Create character
3. Select one of 4 spawn cities
4. Spawn on city safe zone
5. Move across tiles using Energy
6. Answer movement quiz for bonus movement
7. Encounter monster/resource/chest/player/neutral tile
8. Answer contextual quiz
9. Resolve combat, gathering, PvP, or claim result
10. Gain EXP, item, gold, mastery, territory contribution
11. Open inventory
12. Equip item or use reward
13. If dead, respawn at home city
14. Continue exploring, farming, or expanding city territory

MVP ต้องตอบคำถามนี้ให้ได้:

> ถ้ามีแค่เมืองเกิด 4 ทิศ เดินบนช่อง ตอบคำถาม สู้มอน เจอผู้เล่น ยึดพื้นที่ เก็บของ และอัปเกรด ผู้เล่นอยากเล่นต่อไหม?

## 14. UI/UX

หน้าจอหลักควรมี:

- World map เป็นพื้นที่หลัก
- Grid/tile ownership สีชัดเจน
- Character status แบบอ่านง่าย
- Energy และ movement range
- Home city และ city influence
- Current quest/objective
- Hotbar skill
- Inventory shortcut
- Minimap หรือ chunk indicator
- ผู้เล่นอื่นบน tile ใกล้เคียง
- สถานะ tile เช่น Neutral, Owned, Contested, Protected
- Quiz prompt แบบ overlay สั้น ๆ เมื่อเกิด action

Quiz UI:

- แสดงคำถามสั้นและตัวเลือกชัดเจน
- มี timer เฉพาะ action ที่ต้องการความตื่นเต้น
- แสดง feedback ทันทีหลังตอบ
- บอกผลลัพธ์เชิงเกม เช่น +20% damage, Rare chance up
- มีปุ่มดูคำอธิบายหลัง combat หรือหลัง action จบ เพื่อไม่ขัดจังหวะ
 
Territory UI:

- แสดงเจ้าของพื้นที่ด้วยสีเมือง
- แสดง claim progress เมื่อกำลังยึด
- แสดง warning เมื่อเข้าสู่ PvP/contested zone
- แสดง respawn destination เมื่อผู้เล่นตาย

## 15. Database ที่เกี่ยวข้อง

ตารางหรือ collection ที่ควรเกี่ยวข้อง:

- players
- characters
- character_stats
- inventories
- items
- equipment
- world_tiles
- tile_ownerships
- tile_claims
- cities
- city_memberships
- city_influence_logs
- map_discoveries
- monsters
- quests
- questions
- question_attempts
- knowledge_masteries
- action_logs
- movement_logs
- pvp_logs
- death_logs
- rewards

## 16. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /characters/:id`
- `GET /world/chunks`
- `POST /world/move`
- `POST /world/claim/start`
- `POST /world/claim/contest`
- `POST /combat/start`
- `POST /combat/action`
- `POST /pvp/attack`
- `POST /quiz/answer`
- `GET /inventory`
- `POST /equipment/equip`

Realtime Events:

- `player:moved`
- `player:energy_changed`
- `player:respawned`
- `tile:revealed`
- `tile:ownership_changed`
- `tile:contested`
- `tile:claim_progress`
- `encounter:started`
- `quiz:prompted`
- `quiz:answered`
- `combat:updated`
- `reward:granted`
- `player:leveled_up`

## 17. Edge Cases

- ผู้เล่น disconnect ระหว่างตอบคำถาม
- ผู้เล่นตอบคำถามช้าเกินเวลา
- ผู้เล่น spam movement เพื่อเลี่ยง encounter
- ผู้เล่น block tile สำคัญด้วยการยืนขวางตลอดเวลา
- ผู้เล่นระดับสูงดักตีผู้เล่นใหม่ใกล้เมืองเกิด
- เมืองหนึ่งยึดพื้นที่เร็วเกินจนเมืองอื่นตามไม่ทัน
- ผู้เล่นตายระหว่าง claim tile
- ผู้เล่น disconnect ระหว่าง PvP
- ผู้เล่นหลายคน claim tile เดียวกันพร้อมกัน
- คำถามซ้ำบ่อยเกินไป
- ผู้เล่นระดับสูงกลับไปฟาร์มพื้นที่ง่าย
- Party member บางคนไม่ตอบคำถาม
- ผู้เล่นตอบผิดหลายครั้งติดกันจนรู้สึกแย่
- Bot ใช้ระบบเดาคำตอบหรือฟาร์มซ้ำ
- Reward จากคำถามทำให้ economy เสียสมดุล

## 18. TODO

- กำหนดความถี่คำถามต่อ minute ใน combat และ exploration
- กำหนดว่า movement ต้องตอบคำถามทุกกี่ tile หรือเฉพาะ tile พิเศษ
- กำหนด Energy สูงสุด การฟื้นฟู Energy และค่าใช้จ่ายต่อ terrain
- กำหนด movement bonus จากคำถามและ mount
- กำหนดกฎ PvP บน tile และการยืนป้องกันพื้นที่
- กำหนด claim progress, claim time, contest rule และ ownership rule
- กำหนด safe zone รอบเมืองเกิดทั้ง 4 ทิศ
- กำหนดสูตร reward bonus จากคำตอบถูก
- กำหนด penalty จากคำตอบผิดที่ยุติธรรม
- ออกแบบ first 30 minutes player journey
- ทำ prototype MVP loop แบบ playable
