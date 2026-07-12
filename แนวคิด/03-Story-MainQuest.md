# 03-Story-MainQuest

> สถานะ: Draft v1

## 1. ภาพรวม

Main Quest ของ EduQuest Online ไม่ควรเป็นเนื้อเรื่องยาวที่บังคับผู้เล่นอ่าน แต่ควรเป็นเส้นทางนำผู้เล่นเข้าสู่ระบบหลักของเกมทีละขั้น โดยใช้ภารกิจสั้น ๆ เพื่อสอนการเล่นบน world map แบบช่อง การใช้ Energy การตอบคำถาม การฟาร์ม การต่อสู้ PvP และการยึดพื้นที่

แนวทางหลัก:

> Main Quest = Gameplay Onboarding + Progression Path + Territory Objective

เนื้อเรื่องมีได้ แต่เป็นเพียงบริบทบาง ๆ เช่น เมืองเกิดกำลังขยายพื้นที่เข้าสู่ศูนย์กลางแผนที่ ผู้เล่นเป็นนักผจญภัยของเมืองที่ช่วยสำรวจ ฟาร์ม ป้องกัน และยึดพื้นที่

## 2. เป้าหมายของ Main Quest

- สอนผู้เล่นให้เข้าใจระบบทีละอย่าง
- ทำให้ผู้เล่นรู้ว่าจะทำอะไรต่อโดยไม่ต้องอ่านคู่มือ
- พาผู้เล่นออกจากเมืองเกิดไปยังพื้นที่ฟาร์มและพื้นที่ยึดครอง
- ทำให้ผู้เล่นเข้าใจว่า 4 เมืองกำลังแข่งกันขยายพื้นที่
- ให้รางวัลที่ช่วยเริ่มเกม เช่น EXP, gold, equipment, mount เริ่มต้น, item ฟื้น Energy
- เปิดระบบใหม่ตามลำดับ เช่น inventory, combat, resource, territory, PvP, mount

## 3. หลักการออกแบบ

- Quest ต้องสั้นและทำได้จริงบนแผนที่
- 1 quest ควรสอน 1 ระบบหลัก
- หลีกเลี่ยง dialogue ยาว
- ข้อความ quest ควรเป็นคำสั่งชัด เช่น เดินไป, ตีมอน, เก็บไม้, ยึด tile
- Story เป็นพื้นหลัง ไม่ใช่สิ่งที่ขวาง action
- ผู้เล่นควร skip dialogue ได้ แต่ยังเข้าใจ objective จาก UI
- Main Quest ควรเชื่อมกับเมืองเกิดของผู้เล่นเสมอ

## 4. โครง Main Quest ช่วงต้น

### Chapter 1: เริ่มต้นที่เมืองเกิด

เป้าหมาย: สอนเมืองเกิด, safe zone, NPC, UI พื้นฐาน

Quest:

1. คุยกับ NPC ประจำเมือง
2. เปิดแผนที่ดูตำแหน่งเมืองตัวเอง
3. ดูตำแหน่งศูนย์กลางแผนที่
4. รับอุปกรณ์เริ่มต้น

Reward:

- Basic weapon
- Small potion
- Gold เล็กน้อย

### Chapter 2: เดินบนช่อง

เป้าหมาย: สอน tile movement, Energy, movement quiz

Quest:

1. เดินออกจากเมือง 1 ช่อง
2. ตอบคำถาม movement เพื่อเดิน 2 ช่อง
3. กลับมารายงาน NPC

Reward:

- EXP
- Energy food
- Knowledge Mastery เล็กน้อย

### Chapter 3: ฟาร์มรอบเมือง

เป้าหมาย: สอน resource และ monster พื้นฐาน

Quest:

1. เก็บ resource 3 ชิ้น เช่น ไม้ หิน สมุนไพร
2. ตีมอนสเตอร์เริ่มต้น 3 ตัว
3. เปิด inventory
4. ใส่อุปกรณ์ที่ดรอป

Reward:

- Starter armor
- Gold
- Resource bundle

### Chapter 4: ยึดพื้นที่ว่าง

เป้าหมาย: สอน territory claim

Quest:

1. ไปยัง Neutral Tile ใกล้เมือง
2. เริ่ม claim
3. ตอบคำถาม Territory Attunement
4. ทำ claim progress ให้เต็ม
5. ดู tile เปลี่ยนเป็นสีเมืองของผู้เล่น

Reward:

- Territory contribution
- City influence
- EXP

### Chapter 5: ป้องกันพื้นที่

เป้าหมาย: สอนการยืนป้องกันและสถานะ tile

Quest:

1. ยืนบน tile ของเมืองตัวเอง 30 วินาที
2. ดูข้อมูล ownership ของ tile
3. กำจัดมอนสเตอร์ที่เกิดใกล้พื้นที่

Reward:

- Defense token
- Potion
- Gold

### Chapter 6: เจอผู้เล่นเมืองอื่น

เป้าหมาย: สอนความเสี่ยงของ contested zone และ PvP แบบเบื้องต้น

Quest:

1. เดินเข้าเขต Contested Zone
2. เห็น warning ว่าเป็นพื้นที่ PvP
3. เข้าร่วม tutorial duel หรือ PvP bot แทนผู้เล่นจริง
4. เรียนรู้ว่าถ้าตายจะกลับเมืองเกิด

Reward:

- PvP training badge
- EXP
- Item ซ่อม durability

หมายเหตุ:

- ช่วงแรกไม่ควรบังคับผู้เล่นไปแพ้ผู้เล่นจริง
- ใช้ bot หรือ training encounter เพื่อสอนระบบก่อน

### Chapter 7: สัตว์ขี่ตัวแรก

เป้าหมาย: สอน mount movement

Quest:

1. ทำภารกิจส่งของระหว่าง tile
2. รับ mount เริ่มต้น เช่น ม้า
3. ทดลองเดินด้วย mount
4. ตอบคำถามถูกเพื่อเพิ่ม movement range

Reward:

- Starter Horse
- Mount food
- EXP

### Chapter 8: เป้าหมายสู่กลางแผนที่

เป้าหมาย: เปิดภาพรวมระยะยาวของเกม

Quest:

1. เปิด world map
2. ดูเส้นทางจากเมืองตัวเองไป Center Zone
3. เลือก objective ระยะกลาง เช่น ฟาร์ม, ยึด, ป้องกัน, ลงดัน
4. ปลดล็อก Daily Quest และ City Mission

Reward:

- Daily system unlock
- City mission unlock
- Title เริ่มต้น

## 5. Main Quest Loop

Main Quest ควรใช้ loop นี้:

1. รับ objective จากเมือง
2. เดินบน tile ด้วย Energy
3. ตอบคำถามเพื่อเพิ่มประสิทธิภาพ
4. ทำ action หลัก เช่น ฟาร์ม สู้ ยึด ป้องกัน
5. กลับมารับรางวัลหรือรับ objective ถัดไป
6. เปิดระบบใหม่หรือพื้นที่ใหม่

## 6. Quest Type

ประเภทเควสหลัก:

- Movement Quest: เดินไปยัง tile ที่กำหนด
- Combat Quest: กำจัดมอนสเตอร์หรือผู้เล่นฝึกซ้อม
- Gathering Quest: เก็บ resource
- Claim Quest: ยึด tile ว่าง
- Defense Quest: ป้องกัน tile ของเมือง
- Delivery Quest: ส่งของระหว่างจุด
- Knowledge Quest: ตอบคำถามหมวดที่กำหนด
- Mount Quest: ใช้สัตว์ขี่เดินทาง
- City Mission: ทำเป้าหมายที่ช่วยเมืองโดยรวม
- Center Path Quest: ค่อย ๆ เปิดเส้นทางสู่กลางแผนที่

## 7. การใช้ Story แบบเบา

ใช้ story เพียงเพื่อบอกเหตุผลของ objective:

- เมืองต้องการทรัพยากร
- เส้นทางไปศูนย์กลางต้องถูกเปิด
- tile รอบเมืองต้องถูกป้องกัน
- มอนสเตอร์ทำให้การขยายพื้นที่ช้าลง
- ผู้เล่นเมืองอื่นกำลังแย่งอาณาเขต

หลีกเลี่ยง:

- cutscene ยาว
- dialogue หลายหน้า
- quest ที่ให้เดินคุย NPC อย่างเดียวหลายรอบ
- เนื้อเรื่องที่ทำให้ผู้เล่นลืมว่าต้องเล่นอะไร

## 8. First 30 Minutes Flow

เป้าหมาย 30 นาทีแรก:

1. เลือกเมืองเกิด
2. เกิดใน safe zone
3. รับอาวุธเริ่มต้น
4. เดินออกเมือง 1 ช่อง
5. ตอบคำถามเพื่อเดินได้ 2 ช่อง
6. ตีมอนสเตอร์ 1-3 ตัว
7. เก็บ resource
8. เปิด inventory และใส่ของ
9. ยึด Neutral Tile แรก
10. เห็นสีเมืองตัวเองบนแผนที่
11. เรียนรู้ว่า death จะกลับเมืองเกิด
12. ปลดล็อก daily/city mission

ถ้าผู้เล่นจบ 30 นาทีแรกแล้ว ควรรู้สึกว่า:

- ฉันอยู่เมืองไหน
- ฉันเดินยังไง
- คำถามช่วยอะไร
- ฉันฟาร์มอะไรได้
- ฉันยึดพื้นที่ยังไง
- ตายแล้วไปไหน
- เป้าหมายใหญ่คือขยายพื้นที่ไปกลางแผนที่

## 9. UI/UX

Quest UI ควรแสดง:

- Objective สั้นและชัด
- ระยะทางเป็นจำนวนช่อง
- Energy ที่ต้องใช้โดยประมาณ
- พิกัดหรือ marker บนแผนที่
- Reward ที่จะได้รับ
- สถานะเมือง/พื้นที่ที่เกี่ยวข้อง

ตัวอย่างข้อความ:

- เดินไปยัง tile ที่กำหนด 2 ช่อง
- ตอบคำถามเพื่อเพิ่มระยะเดิน
- กำจัดมอนสเตอร์ 3 ตัว
- เก็บไม้ 3 ชิ้น
- ยึด Neutral Tile ให้เมืองของคุณ
- กลับไปยังเมืองเกิด

## 10. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- quests
- quest_steps
- quest_rewards
- character_quests
- quest_progress
- quest_unlocks
- city_missions
- city_mission_progress
- tutorial_flags
- npc_dialogues

## 11. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /quests/active`
- `GET /quests/available`
- `POST /quests/:id/start`
- `POST /quests/:id/complete`
- `POST /quests/:id/progress`
- `GET /city/missions`

Realtime Events:

- `quest:started`
- `quest:progressed`
- `quest:completed`
- `quest:reward_granted`
- `quest:system_unlocked`
- `city_mission:updated`

## 12. Edge Cases

- ผู้เล่นไม่อ่าน dialogue แต่ต้องเข้าใจ objective
- ผู้เล่นเดินออกนอกเส้นทาง tutorial
- ผู้เล่น Energy หมดระหว่าง quest
- tile เป้าหมายถูกยึดโดยเมืองอื่นก่อนผู้เล่นไปถึง
- ผู้เล่นตายระหว่าง main quest
- ผู้เล่นเปลี่ยนเมืองเกิดในอนาคต
- ผู้เล่นถูกผู้เล่นอื่นขวางระหว่างทำ quest
- ผู้เล่นทำ quest ซ้ำเพื่อปั๊ม reward

## 13. TODO

- ตั้งชื่อ NPC ประจำเมืองทั้ง 4
- กำหนด quest id และ reward จริง
- กำหนด tutorial map marker
- กำหนดว่า PvP tutorial ใช้ bot หรือ duel
- กำหนด mount เริ่มต้นและเงื่อนไขปลดล็อก
- กำหนด City Mission หลังจบ main quest ช่วงต้น
