# EduQuest Online - Game Design Document (GDD)

> Version: 1.0 (Concept)
> Genre: MMORPG + Quiz + RPG + Sandbox + Education

---

# 1. Vision

EduQuest Online คือเกม MMORPG แบบ World Map ที่ผู้เล่นทุกคนอยู่ในโลกเดียวกัน โดย "ความรู้" คือทรัพยากรหลัก

ทุกการกระทำสำคัญต้องอาศัยการตอบคำถามจากชุดคำถาม เช่น

- เดิน
- ต่อสู้
- เก็บทรัพยากร
- คราฟของ
- เปิดหีบ
- ใช้สกิล
- ทำเควส

เกมไม่ได้ทำให้ผู้เล่นรู้สึกเหมือนทำข้อสอบ แต่เหมือนกำลังผจญภัยในโลกแฟนตาซี

---

# 2. Core Gameplay Loop

1. สุ่มเกิดในโลก
2. สำรวจแผนที่
3. ตอบคำถามเพื่อเดิน
4. ต่อสู้กับมอนสเตอร์
5. เก็บทรัพยากร
6. คราฟอุปกรณ์
7. อัปเกรดตัวละคร
8. ล่าบอส
9. ลงดันเจียน
10. เข้ากิลด์
11. PvP
12. สะสมสัตว์เลี้ยงและของหายาก

---

# 3. World Map

- ขนาดเริ่มต้น 500 x 500 Tiles
- รองรับการขยายถึง 2000 x 2000
- โหลดเฉพาะพื้นที่รอบตัวผู้เล่น (Chunk Loading)

Biome

- ป่า
- ทะเลทราย
- ภูเขา
- หิมะ
- แม่น้ำ
- ทะเล
- หนองน้ำ
- สุสาน
- ภูเขาไฟ
- เมือง
- หมู่บ้าน
- ดินแดนมังกร

แต่ละ Biome มี

- มอนสเตอร์เฉพาะ
- ทรัพยากรเฉพาะ
- บอสเฉพาะ
- คำถามโบนัสเฉพาะพื้นที่

---

# 4. Tile System

หนึ่งช่องสามารถมี

- มอนสเตอร์
- NPC
- แร่
- ต้นไม้
- ปลา
- หีบสมบัติ
- ดันเจียน
- ร้านค้า
- Event
- Boss Spawn

---

# 5. Quiz Engine

คำถามแบ่งตาม

- วิทยาศาสตร์
- คณิตศาสตร์
- ภาษาไทย
- ภาษาอังกฤษ
- สังคม
- ภูมิศาสตร์
- ประวัติศาสตร์
- ตรรกะ
- Coding

ระดับ

- ง่าย
- ปานกลาง
- ยาก
- Expert

ทุกการตอบถูกจะเพิ่มค่า Knowledge Mastery ของหมวดนั้น

---

# 6. Character Stats

Primary

- HP
- MP
- Attack
- Magic Attack
- Defense
- Magic Defense
- Speed

Advanced

- Critical
- Critical Damage
- Accuracy
- Dodge
- Block
- Penetration
- Life Steal
- Mana Regen
- HP Regen
- Luck

Life Skill

- Mining
- Fishing
- Woodcutting
- Cooking
- Alchemy
- Blacksmith
- Farming

---

# 7. Classes

- Warrior
- Knight
- Archer
- Mage
- Priest
- Assassin
- Paladin
- Druid
- Summoner
- Engineer

ทุกอาชีพมี

- Passive
- Active
- Ultimate
- Awakening

---

# 8. Equipment

Helmet
Armor
Gloves
Boots
Weapon
Sub Weapon
Cape
Ring x2
Necklace
Artifact
Rune
Charm

Rarity

Common
Uncommon
Rare
Epic
Legendary
Mythic
Ancient
Divine
Celestial

---

# 9. Combat

ก่อนโจมตี

สุ่มคำถาม

ตอบถูก

- โจมตีแรงขึ้น
- Critical
- Skill Success

ตอบผิด

- Miss
- Damage ลดลง
- Skill Fail

---

# 10. Resource System

Mining

Fishing

Woodcutting

Herb

Monster Material

ทุกกิจกรรมใช้คำถาม

---

# 11. Pets

Combat

Support

Worker

Mount

Evolution

Skills

Passive

Ultimate

---

# 12. Boss

Mini Boss

Regional Boss

World Boss

Guild Boss

Raid Boss

World Boss เกิดทุก 3 ชั่วโมง

---

# 13. Guild

Guild Level

Guild Skills

Guild Quest

Guild Boss

Guild War

Guild Shop

Guild Research

---

# 14. PvP

Arena

Ranked

Battle Royale

Open World PvP

Castle Siege

---

# 15. Economy

Gold

Diamond

Marketplace

Auction House

Trading

Mail

Warehouse

---

# 16. Knowledge Mastery

ค่าความรู้แยกแต่ละวิชา

Science

Math

Thai

English

History

Geography

Coding

ปลดล็อก

- Skill
- Equipment
- Quest
- Achievement

---

# 17. Daily Content

Daily Quest

Weekly Quest

Login Reward

Daily Dungeon

World Event

---

# 18. Endgame

Raid

Mythic Dungeon

Legendary Craft

Guild War

Season Ranking

World Ranking

Knowledge Ranking

---

# 19. Suggested Tech

Frontend
- Next.js
- Phaser
- PixiJS

Backend
- Node.js
- NestJS

Database
- PostgreSQL
- Redis

Realtime
- Colyseus / WebSocket

Authentication
- Google
- Email

AI
- OpenAI API สำหรับสร้างคำถามและเนื้อหา

---

# 20. Roadmap

Phase 1
- Login
- World Map
- Movement
- Quiz
- Monster

Phase 2
- Inventory
- Equipment
- Shop
- NPC

Phase 3
- Pets
- Guild
- Craft

Phase 4
- Raid
- PvP
- Auction
- World Boss

Phase 5
- Seasons
- Events
- New Continents

