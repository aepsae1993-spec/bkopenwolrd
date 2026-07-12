# 11-Class-System

> สถานะ: Draft v1

## 1. ภาพรวม

Class System คือระบบกำหนดบทบาทของตัวละครในโลกแบบ tile/grid map อาชีพไม่ได้มีหน้าที่แค่ตีมอน แต่ต้องมีบทบาทชัดเจนบนแผนที่ตาราง เช่น ยืนป้องกันช่อง ยิงสนับสนุนจากระยะไกล ฮีลคนบนแนวหน้า วางกับดัก ยึดพื้นที่เร็ว หรือขัดขวางการ claim ของศัตรู

หลักสำคัญ:

- ทุกอาชีพต้องอ่านออกบนตารางว่า "ทำอะไรได้กี่ช่อง"
- ทุกอาชีพต้องมีบทบาทใน PvE, PvP และ Territory War
- ทุกอาชีพต้องมีจุดอ่อนที่แก้ทางได้
- Movement บน world map โดยพื้นฐานเท่ากัน แต่อาชีพต่างกันที่ combat movement, range, control และ utility
- เกมควรเริ่มง่ายด้วย Novice แล้วเลือก class ตอน Level 5

## 2. กฎพื้นฐานบนตาราง

แผนที่เป็นช่องแบบหมากรุก ทุก action ต้องอ้างอิง tile

### 2.1 ระยะพื้นฐาน

| ประเภท | ระยะ |
| --- | --- |
| Melee | 1 ช่องรอบตัว |
| Short Range | 2 ช่อง |
| Mid Range | 3 ช่อง |
| Long Range | 4 ช่อง |
| Area | รูปแบบเฉพาะ เช่น 3x3, เส้นตรง, กรวย |

### 2.2 ทิศทางโจมตี

MVP แนะนำให้ใช้ 8 ทิศ:

- บน
- ล่าง
- ซ้าย
- ขวา
- เฉียง 4 ทิศ

เหตุผล:

- เข้าใจง่ายกว่าวัดระยะวงกลม
- เหมาะกับ grid map
- ทำ UI highlight ช่องเป้าหมายได้ง่าย

### 2.3 Line of Sight

สกิลยิงไกลต้องมี Line of Sight เว้นแต่สกิลระบุว่ายิงข้ามสิ่งกีดขวางได้

สิ่งที่บังได้:

- กำแพง
- ภูเขา
- ต้นไม้ใหญ่
- สิ่งปลูกสร้าง
- tile blocked

สิ่งที่ไม่บังใน MVP:

- ผู้เล่นอื่น
- มอนสเตอร์
- resource node ขนาดเล็ก

หมายเหตุ:

- ถ้าให้ผู้เล่นบังกันเองตั้งแต่แรก เกมจะซับซ้อนและติดขัดง่าย
- ภายหลังอาจเพิ่มระบบ body block เฉพาะ Knight หรือ shield formation

### 2.4 Zone of Control

Zone of Control คือพื้นที่ประชิดรอบตัว 1 ช่อง

กฎ:

- ถ้าศัตรูอยู่ติดตัวในระยะ 1 ช่อง ถือว่าโดนประชิด
- การเดินออกจากช่องที่โดนประชิดอาจมี penalty
- บางอาชีพมีสกิลลดหรือเพิ่ม penalty นี้

ตัวอย่าง penalty:

- ใช้ Energy เพิ่ม +1
- movement bonus จากคำถามถูกถูกลดลง
- มีโอกาสโดน attack of opportunity
- ใช้สกิลยิงไกลบางชนิดไม่ได้

## 3. Class Unlock

Flow แนะนำ:

1. Level 1 เริ่มเป็น Novice
2. Level 1-4 สอน movement, combat, resource, inventory, quiz
3. Level 5 เลือก Class แรก
4. Level 10 เปิด skill tier 2
5. Level 20 เปิด advanced passive หรือ class quest
6. Level 30 เปิด ultimate แรกใน MVP

เหตุผล:

- ผู้เล่นเข้าใจแผนที่ก่อนเลือกบทบาท
- ลดความกดดันตอนเริ่มเกม
- ให้ quest ช่วงต้นพาไปทดลองหลาย action ก่อนเลือก class

## 4. Class ชุดแรก

MVP/Phase แรกแนะนำ 8 อาชีพ:

- Warrior
- Knight
- Archer
- Mage
- Priest
- Assassin
- Engineer
- Druid

Phase หลังค่อยเพิ่ม:

- Paladin
- Summoner
- Ranger
- Alchemist
- Warlock
- Merchant
- Beast Tamer

## 5. Warrior

### 5.1 บทบาท

Warrior เป็นสายประชิดสมดุล เล่นง่าย เหมาะกับผู้เล่นใหม่ ใช้บุก tile และสู้ตัวต่อตัวได้ดี

บทบาท:

- PvE: ฆ่ามอนเดี่ยวเร็ว
- PvP: ดวลระยะประชิด
- Territory: บุกเข้าแนวป้องกันและเปิดทางให้ทีม

### 5.2 กฎบนตาราง

- ระยะโจมตีพื้นฐาน: 1 ช่อง
- เดินบน world map: ปกติเท่าทุกอาชีพ
- Combat mobility: มีสกิลพุ่ง 1-2 ช่อง
- ถ้าอยู่ติดศัตรู ได้ bonus damage เล็กน้อย
- แพ้ทางการโดน kite จาก Archer/Mage ถ้าเข้าไม่ถึง

### 5.3 จุดแข็ง

- เล่นง่าย
- damage เสถียร
- HP สูงกว่าสายบาง
- เหมาะกับบุกพื้นที่

### 5.4 จุดอ่อน

- ต้องเข้าประชิด
- ถ้าโดน slow/root จะเสียเปรียบ
- ไม่มี utility เท่า Engineer/Druid
- ป้องกัน tile ไม่แน่นเท่า Knight

### 5.5 สกิลตัวอย่าง

- Slash: โจมตี 1 ช่อง
- Heavy Strike: โจมตีแรง 1 ช่อง ถ้าตอบคำถามถูกเพิ่ม damage
- Charge: พุ่งเป็นเส้นตรง 2 ช่อง ถ้าชนศัตรูเริ่ม combat ทันที
- Break Line: เพิ่ม damage ต่อผู้เล่นที่กำลัง defend หรือ claim
- War Cry: เพิ่ม Attack ให้พันธมิตรในระยะ 1 ช่องรอบตัว
- Ultimate - Berserker Rush: พุ่ง 3 ช่องและโจมตีเป้าหมายแรกที่เจอ

## 6. Knight

### 6.1 บทบาท

Knight เป็นสายถึกและป้องกันพื้นที่ เหมาะกับการยืนคุมช่องสำคัญและปกป้องผู้เล่นแนวหลัง

บทบาท:

- PvE: tank มอนและบอส
- PvP: ยืนขวางทางและล็อกศัตรู
- Territory: ป้องกัน tile ลดความเร็ว claim ของศัตรู

### 6.2 กฎบนตาราง

- ระยะโจมตีพื้นฐาน: 1 ช่อง
- มี Guard Zone รอบตัว 1 ช่อง
- ศัตรูที่ออกจาก Guard Zone มี penalty เพิ่ม
- เมื่อยืนบน tile ของเมืองตัวเอง ได้ defense bonus
- movement ใน combat ต่ำกว่าอาชีพอื่นเล็กน้อยเมื่อใช้ stance

### 6.3 จุดแข็ง

- HP/Defense สูง
- ยืนป้องกัน tile ดีที่สุด
- เหมาะกับ choke point
- ช่วยลดโอกาสศัตรูทะลุแนวหน้า

### 6.4 จุดอ่อน

- damage ต่ำ
- ไล่ศัตรูเร็ว ๆ ไม่เก่ง
- ถ้าโดนโจมตีไกลต่อเนื่องอาจทำอะไรไม่ได้
- ต้องมีทีมสนับสนุนจึงเด่นมาก

### 6.5 สกิลตัวอย่าง

- Shield Bash: โจมตี 1 ช่อง มีโอกาส stun สั้น
- Guard Stance: ลด damage ที่ได้รับ แต่ movement ลด
- Hold Ground: ยืนบน tile แล้วลด claim progress ของศัตรูในบริเวณนั้น
- Taunt: บังคับมอนหรือทำให้ผู้เล่นศัตรูที่อยู่ใกล้โจมตี Knight ได้ผลดีกว่าคนอื่น
- Shield Wall: เพิ่ม defense ให้พันธมิตรด้านหลัง 1 ช่อง
- Ultimate - Iron Fortress: ทำให้ tile ที่ยืนอยู่ยึดยากขึ้นชั่วคราว

## 7. Archer

### 7.1 บทบาท

Archer เป็นสายยิงไกลและเฝ้าชายแดน เด่นเรื่องโจมตีก่อน เห็นพื้นที่ไกล และคุมช่องเปิด

บทบาท:

- PvE: ฆ่ามอนก่อนมาถึงตัว
- PvP: ยิงสนับสนุนและไล่ศัตรูที่กำลัง claim
- Territory: เฝ้าแนวชายแดน เพิ่ม vision และยิงขัดจังหวะ

### 7.2 กฎบนตาราง

- ระยะโจมตีพื้นฐาน: 3 ช่อง
- โจมตีได้ 8 ทิศ
- ต้องมี Line of Sight
- ถ้าศัตรูอยู่ติด 1 ช่อง ถือว่าโดนประชิด
- เมื่อโดนประชิด damage ธนูลด 30-50%
- เมื่อโดนประชิด ใช้สกิลยิงไกลบางสกิลไม่ได้
- เดิน world map เท่าคนอื่น แต่หนียากขึ้นเมื่อถูกประชิด

### 7.3 กฎหนีเมื่อโดนประชิด

ถ้าศัตรูอยู่ในช่องติดกัน:

- การถอยออกใช้ Energy เพิ่ม +1
- movement bonus จากคำถามถูกอาจลดลงเหลือ +0 หรือ +1
- ถ้าถอยโดยไม่ใช้สกิล disengage อาจโดน attack of opportunity

Archer จึงไม่ได้เดินช้าตลอดเวลา แต่เสียเปรียบเมื่อศัตรูเข้าถึงตัว

### 7.4 จุดแข็ง

- ยิงได้ไกล
- คุมพื้นที่เปิดดี
- เหมาะกับเฝ้า tile และยิงคนที่กำลัง claim
- มี vision utility

### 7.5 จุดอ่อน

- ตัวบาง
- แพ้เมื่อโดนประชิด
- ต้องหามุมยิง
- ถูกสิ่งกีดขวางบังได้

### 7.6 สกิลตัวอย่าง

- Quick Shot: ยิงเป้าหมายในระยะ 3 ช่อง
- Power Shot: ยิงแรง ระยะ 3 ช่อง ต้องมี Line of Sight
- Pinning Arrow: ยิงลด movement เป้าหมาย
- Backstep: ถอยหลัง 1 ช่อง ถ้าตอบคำถามถูกถอย 2 ช่อง
- Watch Post: เพิ่ม vision range รอบ tile ที่ยืนอยู่
- Ultimate - Rain of Arrows: โจมตีพื้นที่ 3x3 ในระยะ 3 ช่อง

## 8. Mage

### 8.1 บทบาท

Mage เป็นสายเวทพื้นที่และควบคุม zone เด่นในการโจมตีหลายช่องและสร้างพื้นที่อันตราย

บทบาท:

- PvE: เคลียร์มอนกลุ่ม
- PvP: คุมพื้นที่ contested
- Territory: ทำให้ศัตรูรวมกลุ่ม claim ได้ยาก

### 8.2 กฎบนตาราง

- ระยะสกิลพื้นฐาน: 2-3 ช่อง
- มีสกิลแบบ target tile ไม่จำเป็นต้องเลือกตัวละครเสมอ
- AoE พื้นฐาน: 3x3 หรือเส้นตรง
- บางสกิลไม่ต้องมี Line of Sight ถ้าเป็นเวทตกพื้นที่ แต่ต้อง balance ด้วย cast time
- ถ้าโดนประชิด มีโอกาสร่ายสกิลช้าลงหรือถูก interrupt

### 8.3 จุดแข็ง

- damage พื้นที่สูง
- คุมทางแคบได้ดี
- ขัด claim หลายคนพร้อมกัน
- มี slow/root/burn/freeze

### 8.4 จุดอ่อน

- HP/Defense ต่ำ
- ใช้ MP สูง
- ต้องระวัง cooldown
- ถ้าโดน Assassin หรือ Warrior เข้าถึงตัวจะเสี่ยง

### 8.5 สกิลตัวอย่าง

- Fire Bolt: ยิงเวทระยะ 3 ช่อง
- Frost Field: สร้างพื้นที่ slow 3x3
- Arcane Wall: สร้างสิ่งกีดขวางชั่วคราว 1-3 ช่อง
- Meteor Spark: โจมตี tile เป้าหมายและช่องรอบ ๆ
- Blink: ย้ายตัว 1 ช่องผ่านสิ่งกีดขวางเล็กบางชนิด
- Ultimate - Arcane Storm: สร้างพายุเวทในพื้นที่ 3x3 หลาย tick

## 9. Priest

### 9.1 บทบาท

Priest เป็นสายฮีลและซัพพอร์ต ทำให้ทีมยืนสู้ได้นานขึ้น โดยเฉพาะการป้องกัน tile หรือบุกพื้นที่สำคัญ

บทบาท:

- PvE: ฮีล party ใน dungeon/boss
- PvP: ทำให้แนวหน้าตายยาก
- Territory: สร้างพื้นที่ปลอดภัยและฟื้นฟูคนป้องกัน

### 9.2 กฎบนตาราง

- ระยะฮีลพื้นฐาน: 3 ช่อง
- ฮีลต้องมี Line of Sight ใน MVP
- สกิลบางอย่างเป็นพื้นที่ 3x3
- ถ้าโดนประชิดยังใช้สกิลได้ แต่มี cast penalty บางสกิล
- damage ต่ำกว่าสายโจมตี

### 9.3 จุดแข็ง

- เพิ่มอายุทีม
- ล้าง debuff
- สำคัญมากใน territory defense
- ทำให้ Knight/Warrior ยืนหน้าได้นาน

### 9.4 จุดอ่อน

- ฟาร์มเดี่ยวช้ากว่า
- เป็นเป้าหมายแรกของ Assassin/Archer
- ต้องยืนตำแหน่งดี
- ถ้าไม่มีทีมจะใช้ศักยภาพไม่เต็ม

### 9.5 สกิลตัวอย่าง

- Heal: ฟื้น HP เป้าหมายในระยะ 3 ช่อง
- Shield Blessing: ให้โล่ชั่วคราว
- Cleanse: ล้าง debuff
- Sanctuary Field: สร้างพื้นที่ฟื้น HP 3x3
- Revive Spark: ลดเวลาคืนชีพหรือชุบในบาง mode
- Ultimate - Divine Zone: ลด damage ที่พันธมิตรได้รับในพื้นที่ชั่วคราว

## 10. Assassin

### 10.1 บทบาท

Assassin เป็นสายลอบโจมตีและขัดจังหวะ เด่นในการเข้าถึงแนวหลัง ฆ่าเป้าหมายบาง และทำลาย claim

บทบาท:

- PvE: ฆ่ามอนเดี่ยวเร็ว
- PvP: ลอบฆ่า Archer/Mage/Priest
- Territory: ขัด claim, ตัด support, ก่อกวนแนวหลัง

### 10.2 กฎบนตาราง

- ระยะโจมตีพื้นฐาน: 1 ช่อง
- combat mobility สูง
- มีสกิลพุ่ง/ลอบไป 2 ช่อง
- ถ้าโจมตีจากด้านหลังหรือจาก stealth ได้ bonus
- ถ้าสู้ยืดเยื้อจะเสียเปรียบสายถึก

### 10.3 จุดแข็ง

- burst damage สูง
- เข้าถึงแนวหลังได้ดี
- หนีและ reposition ได้
- ขัดจังหวะ claim ดี

### 10.4 จุดอ่อน

- HP ต่ำ
- ถ้า burst ไม่ตายจะลำบาก
- แพ้ Knight หรือ CC หนัก
- ต้องใช้ตำแหน่งและจังหวะ

### 10.5 สกิลตัวอย่าง

- Backstab: โจมตีแรงถ้าอยู่ด้านหลังเป้าหมาย
- Shadow Step: ย้ายไปช่องติดเป้าหมายในระยะ 2 ช่อง
- Smoke Bomb: ทำให้ศัตรูใน 3x3 accuracy ลด
- Sabotage Claim: ลด claim progress ของศัตรูบน tile
- Vanish: เข้าสถานะ stealth สั้น ๆ ถ้าไม่อยู่ติดศัตรู
- Ultimate - Execute: damage สูงต่อเป้าหมาย HP ต่ำ

## 11. Engineer

### 11.1 บทบาท

Engineer เป็นอาชีพสำคัญของเกมยึดพื้นที่ เด่นเรื่อง claim, repair, trap, device และสร้างความได้เปรียบบน tile

บทบาท:

- PvE: ใช้ turret/trap ช่วยสู้
- PvP: วางกับดัก คุมทาง และ disrupt
- Territory: ยึดเร็ว ซ่อม outpost สร้างอุปกรณ์ป้องกัน

### 11.2 กฎบนตาราง

- ระยะโจมตีพื้นฐาน: 1-2 ช่อง ขึ้นกับอาวุธ/อุปกรณ์
- วาง device ได้ในช่องติดกัน 1 ช่อง
- turret ยิงระยะ 2 ช่อง
- trap ทำงานเมื่อศัตรูเดินเข้าช่อง
- claim speed สูงกว่าอาชีพทั่วไป
- repair power สูง

### 11.3 จุดแข็ง

- ดีที่สุดด้าน utility พื้นที่
- ช่วยยึดและป้องกัน tile
- สร้างสิ่งกีดขวางหรืออุปกรณ์ได้
- มีบทบาทแม้ไม่ฆ่าผู้เล่นเยอะ

### 11.4 จุดอ่อน

- ดวลตรง ๆ ไม่เก่งเท่า combat class
- ต้องเตรียมพื้นที่
- device อาจถูกทำลาย
- ใช้ resource หรือ cooldown มาก

### 11.5 สกิลตัวอย่าง

- Rapid Attunement: เพิ่ม claim progress
- Repair Kit: ซ่อม outpost/claim core/device
- Spike Trap: วาง trap ในช่องติดกัน ทำ damage/slow
- Mini Turret: วาง turret ยิงศัตรูระยะ 2 ช่อง
- Barricade: สร้างสิ่งกีดขวางชั่วคราว 1 ช่อง
- Ultimate - Field Workshop: เพิ่ม claim/repair/device speed ให้ทีมในพื้นที่

## 12. Druid

### 12.1 บทบาท

Druid เป็นสายธรรมชาติ ฟาร์ม ซัพพอร์ต และควบคุม terrain เด่นในพื้นที่ป่า หนองน้ำ และ resource zone

บทบาท:

- PvE: sustain ดีและฟาร์ม resource
- PvP: slow/root และบัฟทีม
- Territory: บัฟพื้นที่ ฟื้นฟู และช่วย resource logistics

### 12.2 กฎบนตาราง

- ระยะโจมตีพื้นฐาน: 2 ช่อง
- สกิลธรรมชาติหลายอย่างมีผลกับ terrain
- ใน biome ธรรมชาติอาจได้ bonus เล็กน้อย
- มี root/slow เพื่อหยุดศัตรูบนช่อง
- gathering bonus สูงกว่าอาชีพทั่วไป

### 12.3 จุดแข็ง

- ฟาร์มดี
- sustain ดี
- คุม movement ศัตรูได้
- ช่วยทีมในพื้นที่ทรัพยากร

### 12.4 จุดอ่อน

- burst damage ต่ำ
- ไม่ถึกเท่า Knight
- ไม่ฮีลแรงเท่า Priest
- พึ่งพา terrain/สถานการณ์บางส่วน

### 12.5 สกิลตัวอย่าง

- Vine Whip: โจมตีระยะ 2 ช่อง
- Rooted Grove: root หรือ slow ศัตรูในพื้นที่ 3x3
- Nature Mend: ฟื้น HP ทีละน้อย
- Resource Sense: เห็น resource node ในระยะเพิ่มขึ้น
- Wild Growth: เพิ่ม gathering yield ใน tile ใกล้เคียง
- Ultimate - Ancient Grove: สร้างพื้นที่ฟื้นฟูพันธมิตรและ slow ศัตรู

## 13. ตารางสรุปอาชีพ

| Class | Range | จุดเด่น | Territory Role | จุดอ่อน |
| --- | --- | --- | --- | --- |
| Warrior | 1 | บุกและดวล | เปิดแนวหน้า | แพ้ kite |
| Knight | 1 | ถึกและกันพื้นที่ | ป้องกัน tile | ดาเมจต่ำ |
| Archer | 3 | ยิงไกลและ vision | เฝ้าชายแดน | แพ้โดนประชิด |
| Mage | 2-3/AoE | เวทพื้นที่ | คุม contested zone | ตัวบาง/MP สูง |
| Priest | 3 | ฮีลและป้องกัน | ยื้อแนวหน้า | ฟาร์มเดี่ยวช้า |
| Assassin | 1/พุ่ง 2 | ลอบฆ่า | ขัด claim | แพ้สู้ยาว |
| Engineer | 1-2/device | claim/repair/trap | ยึดและสร้างป้อม | ดวลไม่เด่น |
| Druid | 2/พื้นที่ | ฟาร์มและคุม terrain | บัฟ resource zone | burst ต่ำ |

## 14. City Synergy

เมืองเกิดไม่ควรล็อกอาชีพ แต่สามารถมี bonus เบา ๆ เพื่อสร้างรสชาติ

ตัวอย่าง:

- เมืองเหนือ: Knight/Priest training cost ลดเล็กน้อย
- เมืองใต้: Engineer/Druid crafting/resource bonus เล็กน้อย
- เมืองตะวันออก: Archer/Assassin scouting bonus เล็กน้อย
- เมืองตะวันตก: Warrior/Mage combat quest bonus เล็กน้อย

ข้อควรระวัง:

- bonus ห้ามแรงจนผู้เล่นจำเป็นต้องเลือกเมืองตามอาชีพ
- territory balance สำคัญกว่า flavor
- season อาจปรับ bonus เพื่อแก้เมืองที่อ่อนกว่า

## 15. Class Change และ Respec

MVP:

- เลือก class ตอน Level 5
- เปลี่ยนอาชีพไม่ได้ หรือเปลี่ยนได้เฉพาะ reset ช่วงทดสอบ

หลัง MVP:

- ใช้ Class Respec Ticket
- มี cooldown เช่น 7 วัน
- class level/mastery อาจแยกตามอาชีพ
- skill point reset ได้ด้วย cost

หลักการ:

- เปลี่ยนฟรีตลอดเวลาจะทำให้ territory war balance ยาก
- แต่ถ้าเปลี่ยนไม่ได้เลย ผู้เล่นใหม่อาจกลัวเลือกผิด
- ควรมีระบบทดลอง class ก่อนยืนยัน

## 16. Class กับ Quiz

คำถามไม่ควรทำให้ class identity หายไป แต่ช่วยเพิ่มประสิทธิภาพ action ของ class

ตัวอย่าง:

- Warrior ตอบถูก: เพิ่ม damage หรือลด cooldown Charge
- Knight ตอบถูก: เพิ่ม block หรือ Hold Ground นานขึ้น
- Archer ตอบถูก: เพิ่ม accuracy/range bonus เล็กน้อย หรือ Backstep เพิ่มช่อง
- Mage ตอบถูก: เพิ่ม AoE damage หรือลด MP cost
- Priest ตอบถูก: เพิ่ม heal/shield
- Assassin ตอบถูก: เพิ่ม crit หรือ sabotage สำเร็จมากขึ้น
- Engineer ตอบถูก: เพิ่ม claim/repair progress
- Druid ตอบถูก: เพิ่ม root duration หรือ gathering yield

ข้อจำกัด:

- Quiz bonus ควรมี cap
- ตอบผิดไม่ควรทำให้ class เล่นไม่ได้
- PvP ต้องยังขึ้นกับตำแหน่ง stat skill และทีม ไม่ใช่คำถามอย่างเดียว

## 17. UI/UX

Class UI ควรแสดง:

- บทบาทหลัก
- ระยะโจมตีเป็นจำนวนช่อง
- จุดแข็ง/จุดอ่อน
- skill list
- territory role
- recommended stat
- recommended equipment

บน world map:

- เมื่อเลือกสกิล ต้อง highlight ช่องที่ใช้ได้
- แสดง Line of Sight ว่ายิงได้หรือโดนบัง
- แสดง Zone of Control เมื่อโดนประชิด
- แสดง warning ถ้า Archer/Mage/Priest ถูกศัตรูเข้าประชิด
- แสดง tile effect จาก Mage/Druid/Engineer ชัดเจน

## 18. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- classes
- class_roles
- class_levels
- class_stats
- class_skills
- class_passives
- class_unlocks
- character_classes
- character_skill_loadouts
- class_respec_logs
- class_balance_versions

## 19. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /classes`
- `GET /classes/:id`
- `POST /characters/:id/select-class`
- `POST /characters/:id/respec-class`
- `GET /characters/:id/class`
- `GET /characters/:id/skill-loadout`
- `POST /characters/:id/skill-loadout`

Realtime Events:

- `class:selected`
- `class:changed`
- `skill:used`
- `skill:cooldown_started`
- `skill:interrupted`
- `zone_of_control:entered`
- `line_of_sight:blocked`
- `tile_effect:created`
- `tile_effect:expired`

## 20. Edge Cases

- ผู้เล่นเลือก class แล้วเสียใจทันที
- Archer ยิงเป้าหมายที่ขยับออกจาก range ระหว่าง cast
- Mage วาง AoE บน tile ที่ ownership เปลี่ยนพร้อมกัน
- Engineer วาง trap ซ้อนกันมากเกินไป
- Knight block ทางจนผู้เล่นใหม่ผ่านไม่ได้
- Assassin ใช้ stealth เพื่อก่อกวนโดยไม่มี counter
- Priest ทำให้กลุ่มป้องกันอมตะเกินไป
- Druid root ศัตรูซ้ำจนขยับไม่ได้เลย
- class ใด class หนึ่งกลายเป็นจำเป็นใน territory war
- quiz bonus ทำให้บาง class แรงเกิน

## 21. TODO

- ตัดสินใจว่า MVP ใช้ 8 class ครบหรือเริ่ม 4 class ก่อน
- กำหนดระยะโจมตีและ cooldown จริงของแต่ละสกิล
- กำหนด Line of Sight rule เวอร์ชันแรก
- กำหนด Zone of Control และ disengage penalty จริง
- กำหนด skill unlock ตาม level
- ทำตาราง stat growth ของแต่ละ class
- ทำ prototype Archer range, Knight guard, Engineer claim, Priest heal บน grid
