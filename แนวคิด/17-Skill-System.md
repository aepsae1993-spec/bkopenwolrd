# 17-Skill-System

> สถานะ: Draft v1

## 1. ภาพรวม

Skill System ของ EduQuest Online ต้องออกแบบจากพื้นฐานว่าเกมเล่นบนแผนที่ช่องตารางแบบหมากรุก ทุกสกิลจึงต้องระบุได้ชัดเจนว่าใช้ได้กี่ช่อง ใช้กับเป้าหมายแบบไหน มีผลกับช่องใด ต้องมี Line of Sight หรือไม่ และเกี่ยวข้องกับ PvE, PvP หรือ Territory War อย่างไร

สกิลไม่ควรเป็นแค่ปุ่มโจมตีแรง ๆ แต่ต้องทำให้ตำแหน่งบนตารางมีความหมาย เช่น Archer ต้องหามุมยิง, Knight ยืนคุมช่อง, Engineer วาง trap, Mage ปิดพื้นที่, Priest ฮีลแนวหน้า, Assassin ขัด claim และ Warrior เปิดแนวปะทะ

## 2. เป้าหมายของระบบ

- รองรับ combat บน grid map
- ทำให้ class มีเอกลักษณ์ชัด
- เชื่อมกับ stat, equipment, quiz bonus และ territory
- ทำให้ PvP อ่านสถานการณ์ได้จากตำแหน่งบนช่อง
- รองรับการ highlight พื้นที่สกิลบน UI
- ป้องกันสกิลที่แรงเกินจนข้ามระบบยึดพื้นที่

## 3. ประเภทสกิล

### 3.1 Target Skill

เลือกเป้าหมาย 1 ตัวในระยะ

ตัวอย่าง:

- Warrior: Slash
- Archer: Power Shot
- Priest: Heal

### 3.2 Tile Skill

เลือกช่องบนแผนที่โดยตรง

ตัวอย่าง:

- Engineer: Spike Trap
- Mage: Fire Field
- Druid: Rooted Grove

### 3.3 Line Skill

มีผลเป็นเส้นตรงตามทิศที่เลือก

ตัวอย่าง:

- Warrior: Charge
- Archer: Piercing Shot
- Mage: Lightning Line

### 3.4 Area Skill

มีผลเป็นพื้นที่ เช่น 3x3 หรือ cross

ตัวอย่าง:

- Mage: Arcane Storm
- Priest: Sanctuary Field
- Druid: Ancient Grove

### 3.5 Self Skill

ใช้กับตัวเอง

ตัวอย่าง:

- Knight: Guard Stance
- Assassin: Vanish
- Archer: Focus

### 3.6 Movement Skill

ย้ายตำแหน่งบน grid

ตัวอย่าง:

- Warrior: Charge 2 ช่อง
- Archer: Backstep 1-2 ช่อง
- Assassin: Shadow Step 2 ช่อง
- Mage: Blink 1 ช่อง

### 3.7 Territory Skill

มีผลกับ tile ownership, claim, defense, outpost หรือ device

ตัวอย่าง:

- Engineer: Rapid Attunement
- Knight: Hold Ground
- Assassin: Sabotage Claim
- Priest: Sanctuary Field

## 4. Skill Data

สกิลทุกอันควรมีข้อมูลมาตรฐาน:

- skill_id
- class_id
- name
- description
- skill_type
- target_type
- range
- target_pattern
- area_pattern
- line_of_sight_required
- resource_cost_type
- resource_cost
- cooldown
- cast_time
- duration
- damage_type
- scaling_stat
- skill_multiplier
- status_effect
- territory_effect
- quiz_bonus_type
- pvp_modifier
- unlock_level
- max_skill_level

## 5. Target Pattern

Pattern มาตรฐานบนตาราง:

| Pattern | ความหมาย |
| --- | --- |
| SELF | ใช้กับตัวเอง |
| ADJACENT_8 | ช่องติดตัว 8 ทิศ |
| RANGE_2 | ภายใน 2 ช่อง |
| RANGE_3 | ภายใน 3 ช่อง |
| RANGE_4 | ภายใน 4 ช่อง |
| LINE_2 | เส้นตรง 2 ช่อง |
| LINE_3 | เส้นตรง 3 ช่อง |
| CONE_3 | กรวย 3 ช่อง |
| AREA_3x3 | พื้นที่ 3x3 |
| CROSS_3 | รูปกากบาทระยะ 3 |
| TILE_ONLY | เลือก tile |
| OWNED_TILE_ONLY | ใช้ได้เฉพาะ tile เมืองตัวเอง |
| CONTESTED_TILE_ONLY | ใช้ได้เฉพาะ contested tile |

## 6. Line of Sight

สกิลระยะไกลต้องมี Line of Sight เว้นแต่สกิลระบุเป็นข้อยกเว้น

บัง Line of Sight:

- wall
- mountain
- large tree
- building
- blocked tile

ไม่บังใน MVP:

- ผู้เล่น
- มอนสเตอร์
- resource node ขนาดเล็ก

กฎ:

- ถ้า Line of Sight ถูกบัง UI ต้องแสดงช่องเป้าหมายเป็น invalid
- Mage บางสกิลที่เลือก tile อาจไม่ต้องใช้ Line of Sight แต่ต้องมี cast time หรือ cooldown สูงกว่า

## 7. Cooldown และ Cast Time

ค่าแนะนำสำหรับ MVP:

| ประเภท | Cooldown |
| --- | --- |
| Basic Attack | 2-3 วินาที |
| สกิลเบา | 5-8 วินาที |
| สกิลกลาง | 8-15 วินาที |
| สกิลหนัก | 12-20 วินาที |
| Mobility | 15-25 วินาที |
| Territory Skill | 20-60 วินาที |
| Ultimate | 60-180 วินาที |

Cast Time:

- instant: ใช้ทันที
- short cast: 0.5-1 วินาที
- long cast: 1.5-3 วินาที

ข้อควรระวัง:

- สกิลที่มีผลแรงกับพื้นที่ควรมี cast time หรือ warning
- ถ้าเป้าหมายเดินออกจาก range ระหว่าง cast ต้องกำหนดว่าจะ fail หรือยิงตำแหน่งเดิม
- หลังใช้สกิลโจมตีควรมี movement delay 0.5-2 วินาทีตามความแรงของสกิล เพื่อกันตีแล้วถอยทันทีแบบไม่มีช่องให้สวน

## 8. Combat Lock

Combat Lock คือสถานะที่เกิดเมื่อผู้เล่นโจมตี โดนโจมตี ใช้สกิล hostile หรือมีส่วนร่วมกับ PvP/territory combat

ค่าเริ่มต้น:

- ระยะเวลา Combat Lock: 20 วินาที
- timer refresh ทุกครั้งที่โจมตีหรือโดนโจมตี
- ถ้าครบ 20 วินาทีโดยไม่เกิด action ต่อสู้ จะออกจาก combat

ผลของ Combat Lock:

- Safe Logout ไม่ได้
- ขึ้น mount ไม่ได้ หรือ mount speed ถูกลด/ยกเลิก
- Offline Guard ยังทำงานได้ถ้าผู้เล่นปิดเว็บ แต่ตัวละครยังค้างในโลก
- เข้า safe zone แล้วอาจยังคงติด combat lock จนกว่าจะครบเวลา
- death/respawn ใช้กฎ combat
- claim action อาจถูกยกเลิกหรือหยุดชั่วคราวตามกฎ tile

ค่าแนะนำ:

```text
Basic Attack Cooldown: 2s
Light Skill Cooldown: 5-8s
Heavy Skill Cooldown: 12-20s
Mobility Skill Cooldown: 15-25s
Combat Lock: 20s หลังโจมตี/โดนโจมตี
Safe Logout Lock: 20s
Mount Lock: 20s
Movement Delay หลังตี: 0.5-1s
```

หลักการ:

- ไม่ควรทำให้ทุกการโจมตี cooldown 20 วินาที เพราะ PvP จะช้าเกินไป
- ใช้ Combat Lock 20 วินาทีเพื่อกันตีแล้วหนี ออกเกม ขึ้น mount หรือ safe logout ทันที
- ผู้เล่นที่ online อยู่ยังเล่นต่อได้ แต่ต้องรับความเสี่ยงหลังเปิดไฟต์

## 9. Resource Cost

MVP ใช้ง่ายก่อน:

- สกิลกายภาพใช้ cooldown เป็นหลัก
- Mage/Priest/Druid ใช้ MP
- Engineer trap/device ใช้ material หรือ tool charge
- Territory skill บางอันใช้ cooldown + city supply

Phase หลังอาจเพิ่ม:

- Stamina
- Focus
- Rage
- Device Charge
- Pet Energy

## 10. Quiz Bonus กับ Skill

คำถามไม่ควรทำให้สกิล "ติดหรือไม่ติด" เสมอ เพราะจะทำให้ผู้เล่นหงุดหงิด ควรใช้เป็น bonus ต่อผลลัพธ์

ตัวอย่าง:

- Damage Skill: ตอบถูกเพิ่ม damage 5-15%
- Heal Skill: ตอบถูกเพิ่ม heal 5-15%
- Movement Skill: ตอบถูกเพิ่มระยะหรือคืน cooldown เล็กน้อย
- Territory Skill: ตอบถูกเพิ่ม claim/repair/defense progress
- Control Skill: ตอบถูกเพิ่ม duration เล็กน้อย

กฎ:

- ตอบผิดยังใช้สกิลได้ แต่ไม่ได้ bonus
- Ultimate อาจให้คำถามเพื่อเพิ่มผลพิเศษ
- PvP quiz bonus อาจเบากว่า PvE เพื่อ balance
- bonus ต่อ action ไม่ควรเกิน cap ที่กำหนดใน `13-Stat-System.md`

## 11. Skill Unlock

แนะนำ flow:

| Level | Unlock |
| --- | --- |
| 5 | เลือก class + active skill 2 อัน |
| 10 | skill tier 2 |
| 15 | territory skill |
| 20 | passive สำคัญ |
| 25 | advanced skill |
| 30 | ultimate แรก |

Skill Point:

- ได้ 1 skill point ต่อ level
- ใช้ปลดล็อกหรือเพิ่ม level สกิล
- บางสกิลต้องมี class requirement หรือ Knowledge Mastery requirement

## 12. Warrior Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Slash | Target | ADJACENT_8 | โจมตีกายภาพพื้นฐาน |
| Heavy Strike | Target | ADJACENT_8 | โจมตีแรง ถ้าตอบถูกเพิ่ม damage |
| Charge | Movement/Line | LINE_2 | พุ่ง 2 ช่อง ถ้าชนศัตรูเริ่มโจมตี |
| Break Line | Target | ADJACENT_8 | เพิ่ม damage ต่อผู้เล่นที่กำลัง defend/claim |
| War Cry | Area Buff | AREA_3x3 self center | เพิ่ม Attack พันธมิตรใกล้ตัว |
| Berserker Rush | Ultimate | LINE_3 | พุ่ง 3 ช่องและโจมตีเป้าหมายแรก |

บทบาท:

- เปิดแนวหน้า
- ไล่เข้าประชิด Archer/Mage/Priest
- ทำลายผู้เล่นที่ยืนป้องกันหรือ claim

## 13. Knight Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Shield Bash | Target | ADJACENT_8 | โจมตีและมีโอกาส stun สั้น |
| Guard Stance | Self | SELF | ลด damage ที่ได้รับ แต่ movement ใน combat ลด |
| Hold Ground | Territory | OWNED_TILE_ONLY | เพิ่ม Defense Power ของ tile ที่ยืนอยู่ |
| Taunt | Area Debuff | AREA_3x3 | บังคับมอน หรือทำให้ศัตรูโจมตี Knight มีผลดีกว่า |
| Shield Wall | Area Buff | LINE/CONE | ลด damage ให้พันธมิตรด้านหลัง |
| Iron Fortress | Ultimate | OWNED/CONTESTED TILE | ทำให้ tile ยึดยากขึ้นชั่วคราว |

บทบาท:

- ยืนขวางช่อง
- ป้องกัน tile
- ทำให้ศัตรูถอยจาก Zone of Control ยากขึ้น

## 14. Archer Skills

| Skill | Type | Range/Pattern | LoS | ผล |
| --- | --- | --- | --- | --- |
| Quick Shot | Target | RANGE_3 | Yes | ยิงเร็ว damage ปานกลาง |
| Power Shot | Target | RANGE_3 | Yes | ยิงแรง มี cast time สั้น |
| Pinning Arrow | Target | RANGE_3 | Yes | ลด movement หรือเพิ่ม disengage cost |
| Backstep | Movement | SELF | No | ถอย 1 ช่อง ถ้าตอบถูกถอย 2 ช่อง |
| Watch Post | Utility | SELF/TILE | No | เพิ่ม Vision Range รอบ tile |
| Rain of Arrows | Ultimate | AREA_3x3 in RANGE_3 | Partial | ยิงพื้นที่ 3x3 |

กฎพิเศษ:

- ถ้าศัตรูอยู่ติด 1 ช่อง damage ธนูลด 30-50%
- ถอยออกจากศัตรูประชิดใช้ Energy เพิ่มหรือเสี่ยงโดนโจมตีสวน
- Archer เดินบน world map เท่าอาชีพอื่น แต่เสียเปรียบเมื่อโดนประชิด

## 15. Mage Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Fire Bolt | Target | RANGE_3 | เวทไฟเป้าหมายเดี่ยว |
| Frost Field | Tile/Area | AREA_3x3 in RANGE_3 | สร้างพื้นที่ slow |
| Arcane Wall | Tile | LINE_1-3 | สร้างสิ่งกีดขวางชั่วคราว |
| Lightning Line | Line | LINE_3 | โจมตีเป็นเส้นตรง |
| Blink | Movement | RANGE_1 | ย้ายตัว 1 ช่อง |
| Arcane Storm | Ultimate | AREA_3x3 | damage หลาย tick |

บทบาท:

- คุมพื้นที่
- ขัด claim กลุ่ม
- ปิดทางเดินหรือ choke point

ข้อจำกัด:

- MP สูง
- โดนประชิดแล้ว cast ช้าลงหรือถูก interrupt ได้

## 16. Priest Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Heal | Target | RANGE_3 | ฟื้น HP เป้าหมาย |
| Shield Blessing | Target | RANGE_3 | เพิ่ม shield ชั่วคราว |
| Cleanse | Target | RANGE_3 | ล้าง debuff |
| Sanctuary Field | Area | AREA_3x3 | ฟื้น HP พันธมิตรในพื้นที่ |
| Recall Light | Utility | RANGE_3 | ลด death/respawn penalty บางโหมด |
| Divine Zone | Ultimate | AREA_3x3 | ลด damage ที่พันธมิตรได้รับ |

บทบาท:

- ทำให้แนวหน้าอยู่ได้นาน
- สำคัญใน defense และ party battle
- เป็นเป้าหมายสำคัญของ Assassin/Archer

## 17. Assassin Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Backstab | Target | ADJACENT_8 | damage สูงถ้าโจมตีจากด้านหลัง |
| Shadow Step | Movement/Target | RANGE_2 | ย้ายไปช่องติดเป้าหมาย |
| Smoke Bomb | Area | AREA_3x3 | ลด accuracy หรือ vision |
| Sabotage Claim | Territory | CONTESTED_TILE_ONLY | ลด claim progress ของศัตรู |
| Vanish | Self | SELF | stealth สั้น ๆ ถ้าไม่โดนประชิด |
| Execute | Ultimate | ADJACENT_8 | damage สูงต่อเป้าหมาย HP ต่ำ |

บทบาท:

- ลอบฆ่าแนวหลัง
- ขัด claim
- ป่วน Priest/Mage/Archer

ข้อจำกัด:

- ถ้าสู้ยาวเสียเปรียบ
- ต้องมี counter เช่น reveal, Watch Post, trap

## 18. Engineer Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Rapid Attunement | Territory | TILE_ONLY | เพิ่ม claim progress |
| Repair Kit | Territory | ADJACENT_8 | ซ่อม outpost/device/core |
| Spike Trap | Tile | ADJACENT_8 | วาง trap ทำ damage/slow |
| Mini Turret | Device | ADJACENT_8 | turret ยิงศัตรูระยะ 2 ช่อง |
| Barricade | Tile | ADJACENT_8 | สร้าง block ชั่วคราว 1 ช่อง |
| Field Workshop | Ultimate | AREA_3x3 | เพิ่ม claim/repair/device speed |

บทบาท:

- ยึด tile เร็ว
- ป้องกันทางเดิน
- ซ่อมแนวหน้า
- ทำให้ผู้เล่นสาย support มีค่ามากในสงคราม

ข้อจำกัด:

- device ต้องมี limit
- trap ซ้อนมากเกินต้องห้าม
- บางสกิลใช้ material/tool charge

## 19. Druid Skills

| Skill | Type | Range/Pattern | ผล |
| --- | --- | --- | --- |
| Vine Whip | Target | RANGE_2 | โจมตีและอาจ slow |
| Rooted Grove | Area | AREA_3x3 | root/slow ศัตรู |
| Nature Mend | Target | RANGE_2 | ฟื้น HP ทีละน้อย |
| Resource Sense | Utility | SELF | เพิ่มการมองเห็น resource |
| Wild Growth | Territory/Utility | TILE/AREA | เพิ่ม gathering yield ใกล้ tile |
| Ancient Grove | Ultimate | AREA_3x3 | ฟื้นพันธมิตรและ slow ศัตรู |

บทบาท:

- ฟาร์ม resource
- คุม terrain
- ซัพพอร์ตพื้นที่ธรรมชาติ
- ยื้อแนวรบด้วย slow/root

## 20. Passive Skill

Passive คือสกิลติดตัวที่ไม่ต้องกด

ตัวอย่าง:

- Warrior: เพิ่ม damage เมื่ออยู่ติดศัตรู
- Knight: เพิ่ม Defense Power เมื่อยืนบน tile เมืองตัวเอง
- Archer: เพิ่ม Vision Range
- Mage: ลด MP cost เมื่อยืนบน tile ที่มี magic field
- Priest: เพิ่ม heal ให้เป้าหมาย HP ต่ำ
- Assassin: เพิ่ม crit เมื่อโจมตีจากด้านหลัง
- Engineer: เพิ่ม claim/repair efficiency
- Druid: เพิ่ม gathering yield ใน biome ธรรมชาติ

## 21. Territory Skill Rules

สกิลที่มีผลกับ territory ต้องระวังเป็นพิเศษ

กฎ:

- ต้องมี cooldown ยาวกว่าสกิล combat
- ควรใช้ได้เฉพาะ tile ที่มีสถานะถูกต้อง
- ต้องมี contribution log
- ต้องมี anti-spam
- ต้องมี counterplay

ตัวอย่าง counterplay:

- Engineer เร่ง claim ได้ แต่ Knight ลด claim ได้
- Assassin ลด claim progress ได้ แต่ Archer Watch Post ช่วยเห็น Assassin
- Mage วาง AoE ขัด claim ได้ แต่ Priest ลด damage พื้นที่ได้
- Druid root ศัตรูได้ แต่ Cleanse ล้างได้

## 22. PvP Skill Rules

ใน PvP สกิลต้องทำให้ผู้เล่นตัดสินใจจากตำแหน่งบนตาราง

กฎ:

- ทุกสกิลต้องตรวจ range ก่อนใช้
- ถ้า target ขยับออกจาก range ระหว่าง cast ให้สกิล fail หรือยิงลง tile เดิมตามชนิดสกิล
- สกิล AoE ต้องมี warning ถ้ามี cast time
- crowd control ต้องมี diminishing return
- mobility skill ต้องไม่ข้าม safe zone หรือ protected boundary
- สกิล territory ต้องใช้ไม่ได้ใน safe zone
- ทุก hostile skill ต้องทำให้ผู้ใช้และเป้าหมายติด Combat Lock 20 วินาที
- ถ้าผู้เล่นปิดเว็บระหว่าง Combat Lock server ต้องถือว่ายังอยู่ในโลก ไม่ใช่ออกทันที

## 23. Offline Guard Skill Rules

Offline Guard คือกรณีที่ผู้เล่นออกเกมแต่เลือกให้ตัวละครยังอยู่บน tile เดิม ตัวละครสามารถใช้สกิลสวนกลับอัตโนมัติได้ถ้ามี resource และ cooldown พร้อม

กฎหลัก:

- ใช้เฉพาะสกิลที่อยู่ใน Offline Skill Loadout
- ใช้สกิลแบบ reactive เท่านั้น เช่น ถูกโจมตี มีศัตรูเข้าระยะ หรือ tile ถูก claim
- ไม่ใช้สกิลไล่ล่าข้าม tile
- ไม่เริ่ม combat กับผู้เล่นที่เดินผ่านเฉย ๆ เว้นแต่ tile เป็น contested/owned defense และกฎ PvP อนุญาต
- ไม่เริ่ม claim ใหม่
- ไม่ใช้ ultimate อัตโนมัติใน MVP เว้นแต่ผู้เล่นเปิดอนุญาตไว้ชัดเจน
- ทุกสกิลยังใช้ MP, Energy, material, cooldown และ durability ตามปกติ
- ถ้า resource ไม่พอ สกิล fail และตัวละครอาจใช้ basic attack/defense

Priority ตัวอย่าง:

1. ถ้า HP ต่ำและมี defensive/heal skill ให้ใช้ก่อน
2. ถ้าศัตรูอยู่ประชิด ใช้สกิลระยะใกล้หรือ disengage
3. ถ้าศัตรูอยู่ใน range และ Line of Sight ใช้สกิลโจมตีพื้นฐาน
4. ถ้า tile ถูก claim และมี territory defense skill ให้ใช้
5. ถ้าไม่มีเงื่อนไขตรง ใช้ basic defense หรือไม่ทำ action

ตัวอย่างตามอาชีพ:

- Warrior: Slash, Heavy Strike, War Cry เฉพาะเมื่อถูกโจมตี
- Knight: Guard Stance, Hold Ground, Shield Bash
- Archer: Quick Shot ถ้ามี Line of Sight, Backstep ถ้าโดนประชิด
- Mage: Fire Bolt, Frost Field เมื่อมีศัตรูหลายคนในพื้นที่
- Priest: Shield Blessing, Heal ตัวเองหรือพันธมิตรใกล้ ๆ
- Assassin: Smoke Bomb หรือ Backstab เฉพาะศัตรูประชิด
- Engineer: turret/trap ทำงานต่อ, Repair Kit เฉพาะ device/tile ที่ตั้งไว้
- Druid: Nature Mend, Rooted Grove เฉพาะเมื่อถูกโจมตีหรือป้องกัน tile

ข้อจำกัด:

- offline skill damage อาจลดลง เช่น 70-85% ของ online เพื่อให้คนเล่นจริงได้เปรียบ
- offline cooldown อาจยาวขึ้น
- offline contribution ต้องมี cap
- CC จาก offline guard ควรสั้นกว่าปกติหรือมี diminishing return เข้มกว่า
- ห้าม offline guard ใช้สกิลที่ต้องเล็งซับซ้อนมากใน MVP

## 24. UI/UX

เมื่อเลือกสกิล UI ต้องแสดง:

- ช่องที่ใช้ได้
- ช่องที่โดนผล
- ช่องที่ติด Line of Sight
- ช่องที่ blocked
- range
- cooldown
- resource cost
- cast time
- quiz bonus ที่จะได้ถ้าตอบถูก
- Combat Lock timer ถ้าติด combat
- Mount Lock/Safe Logout Lock ถ้ามี

สีแนะนำ:

- ช่องใช้ได้: ฟ้า
- ช่องโดน damage: แดง
- ช่อง heal/buff: เขียว
- ช่อง territory/claim: เหลือง
- ช่องใช้ไม่ได้: เทา

Offline Skill Loadout UI:

- เลือกสกิลได้ 3-4 ช่องสำหรับ offline guard
- ตั้ง priority ง่าย ๆ เช่น ป้องกันตัว, โจมตี, ป้องกัน tile
- แสดงค่าใช้ MP/Energy โดยประมาณ
- แสดงคำเตือนว่าสกิลจะทำงานอัตโนมัติและ resource อาจหมด

## 25. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- skills
- skill_levels
- skill_patterns
- skill_effects
- skill_costs
- skill_cooldowns
- skill_unlocks
- character_skills
- character_skill_loadouts
- skill_usage_logs
- tile_effects
- device_instances
- trap_instances
- offline_skill_loadouts
- offline_skill_usage_logs
- combat_locks

## 26. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /skills`
- `GET /classes/:id/skills`
- `GET /characters/:id/skills`
- `POST /characters/:id/skills/unlock`
- `POST /characters/:id/skills/level-up`
- `POST /characters/:id/skill-loadout`
- `POST /characters/:id/offline-skill-loadout`

Realtime Events:

- `skill:used`
- `skill:validated`
- `skill:failed`
- `skill:hit`
- `skill:missed`
- `skill:cooldown_started`
- `skill:interrupted`
- `skill:effect_applied`
- `tile_effect:created`
- `tile_effect:expired`
- `trap:placed`
- `device:placed`
- `territory_skill:applied`
- `offline_skill:triggered`
- `offline_skill:failed`
- `combat_lock:started`
- `combat_lock:refreshed`
- `combat_lock:ended`

## 27. Edge Cases

- เป้าหมายเดินออกจาก range ระหว่าง cast
- Line of Sight เปลี่ยนเพราะมี barricade ถูกสร้าง
- ผู้เล่นตายระหว่างสกิลกำลัง cast
- สกิล AoE โดนทั้งมอนและผู้เล่น ต้องแยก friend/foe
- trap ถูกวางซ้อนกันเกิน limit
- turret ยิงผู้เล่นใน safe zone
- Blink ข้าม tile blocked หรือข้าม ownership boundary
- Ultimate ถูกใช้พร้อมกับ death/respawn
- skill cooldown ไม่ sync ระหว่าง client/server
- quiz bonus มาถึงหลังสกิล resolve แล้ว
- offline guard ใช้สกิลใส่คนที่เพิ่งเข้า safe zone
- offline guard resource หมดแต่ UI ยังแสดงว่าสวนกลับได้
- ผู้เล่นวาง offline guard จำนวนมากเพื่อ block ทาง
- ผู้เล่นปิดเว็บทันทีหลังโจมตี
- ผู้เล่นพยายามขึ้น mount ระหว่าง Combat Lock

## 28. TODO

- กำหนด skill id จริงของ 8 class
- กำหนด cooldown/cost จริงทุกสกิล
- กำหนด pattern renderer บน UI
- ทำ prototype Line of Sight
- ทำ prototype Zone of Control + Backstep
- กำหนด crowd control diminishing return
- กำหนด trap/device limit
- เชื่อม skill กับ stat formula ใน `13-Stat-System.md`
- กำหนด Offline Skill Loadout, priority และ damage modifier
- กำหนด Combat Lock, Safe Logout Lock, Mount Lock และ movement delay จริง
