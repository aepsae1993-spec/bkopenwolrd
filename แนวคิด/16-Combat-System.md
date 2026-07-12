# 16-Combat-System

> สถานะ: Draft v1

## 1. ภาพรวม

Combat System ใช้กฎเดียวกันพื้นฐานสำหรับ PvE และ PvP บนแผนที่ช่องตาราง ผู้เล่นและมอนสเตอร์มีตำแหน่งบน tile ใช้สกิลตามระยะช่อง และผลลัพธ์คำนวณจาก stat, skill, equipment และ quiz bonus

PvE ต้องให้อภัยกว่า PvP และต้องมีกฎ leash สำหรับมอนสเตอร์เพื่อไม่ให้ถูกลากออกจากจุดเกิดไกลเกินไป

## 2. PvE Combat Flow

1. ผู้เล่นเข้าใกล้มอน
2. มอน aggro หรือผู้เล่นโจมตีก่อน
3. ระบบเช็กระยะ, Line of Sight, cooldown, resource
4. ผู้เล่นใช้ basic attack หรือ skill
5. อาจมี quiz bonus
6. คำนวณ hit/damage/effect
7. มอนใช้ AI เดิน/โจมตี/ใช้สกิล
8. ถ้ามอนตาย ผู้เล่นได้ EXP/drop/mastery/quest progress
9. ถ้ามอนออกนอก leash radius มอนกลับจุดเกิดและ reset

## 3. Monster Leash Rule

มอนมีจุดเกิดประจำ เรียกว่า Spawn Anchor

กฎ:

- มอนเดินห่างจุดเกิดได้ไม่เกิน 3 ช่อง
- ถ้ากำลังจะตามผู้เล่นไปช่องที่ 4 ให้หยุดไล่
- มอนเข้าสถานะกลับจุดเกิด
- เมื่อกลับถึงจุดเกิด มอนรี HP เต็ม
- ล้าง aggro, debuff และ combat state
- ผู้เล่นไม่ได้ reward ถ้ามอน reset

ค่าเริ่มต้น:

```text
leash_radius = 3 tiles
reset_distance = 4 tiles
```

## 4. Combat Lock

PvE อาจใช้ Combat Lock สั้นกว่า PvP

ค่าแนะนำ:

- PvE Combat Lock: 10-15 วินาที
- PvP Combat Lock: 20 วินาที

ผล:

- กัน logout หนี combat
- กัน mount หนีทันที
- browser disconnect ยังต้องใช้ disconnect rule

## 5. Quiz Bonus ใน PvE

PvE ใช้ quiz ได้บ่อยกว่า PvP

ตัวอย่าง:

- ตอบถูก: damage +5-15%
- ตอบถูก: drop/resource chance เพิ่มเล็กน้อย
- ตอบถูก: ลด damage จาก mechanic
- ตอบผิด: action ยังเกิด แต่ไม่มี bonus หรือผลลดลงเล็กน้อย

## 6. TODO

- ขยายสูตร damage/hit/crit จาก `13-Stat-System.md`
- กำหนด PvE Combat Lock จริง
- กำหนด aggro range และ leash radius ต่อ monster type
- เชื่อมกับ `18-AI-Monster.md`
