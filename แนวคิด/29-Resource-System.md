# 29-Resource-System

> สถานะ: Draft v1

## 1. ภาพรวม

Resource System คือระบบทรัพยากรบน world map แบบช่องตาราง ทรัพยากรเป็นเหตุผลสำคัญที่ทำให้ผู้เล่นออกจากเมือง ฟาร์มใน biome ต่าง ๆ แย่งพื้นที่ ยึด tile และขน supply กลับเมือง

ทรัพยากรไม่ได้เป็นแค่ของคราฟ แต่เป็นเชื้อเพลิงของหลายระบบ:

- crafting
- equipment repair
- territory claim
- outpost construction
- trap/device
- potion/food
- city mission
- trading/economy

## 2. เป้าหมายของระบบ

- ทำให้แต่ละ biome มีคุณค่าต่างกัน
- ทำให้พื้นที่ไกลเมืองและพื้นที่เสี่ยง PvP มีรางวัลสูงกว่า
- เชื่อมกับ Tool Slot และ Life Skill
- เชื่อมกับ crafting และ item economy
- ทำให้ territory war มีเหตุผลทางทรัพยากร
- ป้องกัน bot และการฟาร์มซ้ำแบบไม่มีความเสี่ยง

## 3. Resource Types

### 3.1 Wood

แหล่ง:

- ป่า
- หมู่บ้าน
- พื้นที่ธรรมชาติ

ใช้สำหรับ:

- bow
- staff
- barricade
- building/outpost
- basic tool

Life Skill:

- Woodcutting

Tool:

- Axe

### 3.2 Stone

แหล่ง:

- ภูเขา
- เหมือง
- ซากปรักหักพัง

ใช้สำหรับ:

- outpost
- wall
- claim core
- basic construction

Life Skill:

- Mining

Tool:

- Pickaxe

### 3.3 Ore

ตัวอย่าง:

- copper
- iron
- silver
- mithril
- aether ore

ใช้สำหรับ:

- weapon
- armor
- tool
- device
- upgrade material

แหล่ง:

- ภูเขา
- เหมือง
- volcanic biome
- center zone

Tool:

- Pickaxe

### 3.4 Herb

ใช้สำหรับ:

- potion
- buff food
- alchemy
- antidote
- pet medicine

แหล่ง:

- ป่า
- หนองน้ำ
- พื้นที่พิเศษ

Tool:

- Herb Knife

### 3.5 Fish

ใช้สำหรับ:

- food
- buff food
- trade
- pet food

แหล่ง:

- แม่น้ำ
- ทะเล
- หนองน้ำ

Tool:

- Fishing Rod

### 3.6 Monster Material

ได้จาก:

- มอนสเตอร์
- elite
- boss

ตัวอย่าง:

- leather
- fang
- claw
- blood
- scale
- monster core

ใช้สำหรับ:

- equipment
- pet item
- potion
- rune
- special crafting

### 3.7 Crystal / Aether Shard

ทรัพยากรหายาก

ใช้สำหรับ:

- rune
- enchant
- high-tier crafting
- territory device
- city upgrade

แหล่ง:

- contested zone
- center zone
- dungeon
- world boss
- event node

### 3.8 Territory Supply

ทรัพยากรสำหรับสงครามพื้นที่

ตัวอย่าง:

- repair supply
- claim supply
- city supply crate
- outpost core fragment
- barricade material

ใช้สำหรับ:

- claim tile
- repair outpost
- build barricade
- upgrade territory
- city mission

หมายเหตุ:

- Territory Supply ควรมีโอกาสตกเมื่อผู้เล่นตายใน PvP zone

## 4. Resource Node

Resource Node คือจุดทรัพยากรบน tile

ข้อมูล:

- node_id
- tile_id
- resource_type
- resource_tier
- quantity
- max_quantity
- respawn_time
- required_tool
- required_life_skill
- biome
- ownership_modifier
- pvp_risk_level
- depleted_state

Node State:

- Available
- Being Gathered
- Depleted
- Respawning
- Contested
- Event Boosted

## 5. Resource Tier

ค่าเริ่มต้น:

| Tier | พื้นที่ | ตัวอย่าง |
| --- | --- | --- |
| T1 | Safe/Farm | wood, stone, herb พื้นฐาน |
| T2 | Farm/Frontier | iron, better herb, fish |
| T3 | Frontier/Contested | silver, rare wood, monster core |
| T4 | Contested/Center | mithril, aether crystal |
| T5 | Center/Boss/Event | ancient shard, rare core |

หลักการ:

- T1-T2 เหมาะกับผู้เล่นใหม่
- T3 เริ่มมีความเสี่ยง
- T4-T5 เป็นเหตุผลหลักให้เกิด PvP/territory war

## 6. Gathering Flow

1. ผู้เล่นเดินถึง tile ที่มี resource node
2. ระบบเช็ก required tool
3. ระบบเช็ก Energy/action cooldown
4. เริ่ม gather
5. ระบบอาจเรียก quiz bonus
6. คำนวณ yield, rare chance, durability loss
7. node quantity ลด
8. resource เข้า inventory
9. ถ้า node quantity เหลือ 0 เข้าสถานะ Depleted
10. node รอ respawn

## 7. Tool Requirement

| Resource | Tool |
| --- | --- |
| Wood | Axe |
| Stone | Pickaxe |
| Ore | Pickaxe |
| Herb | Herb Knife |
| Fish | Fishing Rod |
| Monster Material | Weapon/Harvest Knife |
| Crystal | Pickaxe หรือ Aether Tool |
| Territory Supply | Claim/Repair Tool |

กฎ:

- ไม่มี tool อาจเก็บไม่ได้ หรือได้ yield ต่ำมาก
- tool มี durability
- tool rarity ส่งผลต่อ yield/rare chance
- Engineer/Druid อาจมี bonus กับ tool บางประเภท

## 8. Quiz Bonus

Quiz ใช้เพิ่มผลตอบแทน ไม่ใช่บังคับผ่าน

ผลเมื่อตอบถูก:

- yield เพิ่ม
- rare chance เพิ่ม
- durability loss ลด
- life skill EXP เพิ่ม
- gathering time ลดเล็กน้อย

ผลเมื่อตอบผิด:

- ได้ผลปกติ หรือ yield ลดเล็กน้อย
- ไม่ควรทำให้ fail เสมอ

ตัวอย่างหมวดคำถาม:

- Mining/Ore: วิทยาศาสตร์, คณิต, ภูมิศาสตร์
- Herb/Alchemy: วิทยาศาสตร์
- Fishing: วิทยาศาสตร์, ภูมิศาสตร์
- Woodcutting: วิทยาศาสตร์, ตรรกะ
- Crystal/Aether: ตรรกะ, Coding, วิทยาศาสตร์

## 9. Ownership และ Territory Bonus

ถ้า resource อยู่บน tile เมืองตัวเอง:

- gathering speed เพิ่มเล็กน้อย
- yield เพิ่มเล็กน้อย
- contribution เมืองเพิ่ม
- ส่ง resource เข้า city depot ได้ง่าย

ถ้า resource อยู่บน tile ศัตรู:

- gather ได้ถ้า zone อนุญาต
- อาจมี yield penalty
- เสี่ยง PvP
- อาจต้องฆ่าผู้เล่น/guard ที่ป้องกันก่อน

ถ้า resource อยู่บน neutral tile:

- ใครก็เก็บได้
- อาจใช้เป็นแรงจูงใจให้ claim tile นั้น

## 10. Resource กับ Territory War

ทรัพยากรใช้ในสงคราม:

- Stone/Wood: barricade, outpost
- Ore: weapon/device/siege tool
- Crystal: claim core, enchant, advanced device
- Herb/Food: potion, buff supply
- Territory Supply: claim/repair/upgrade tile

ตัวอย่าง:

- ยึด tile ได้ แต่ถ้าไม่มี repair supply ก็รักษา outpost ไม่ได้นาน
- เมืองที่ถือแหล่ง ore จะ craft weapon ได้ง่าย
- เมืองที่ถือ crystal node จะได้เปรียบด้าน rune/enchant

## 11. PvP Risk และ Drop

ทรัพยากรดีควรมีความเสี่ยงสูงขึ้น

| Zone | Resource | PvP Drop |
| --- | --- | --- |
| Safe/Farm | T1-T2 | ไม่ drop |
| Frontier | T2-T3 | 0-5% |
| Contested | T3-T4 | 10-20% |
| Center | T4-T5 | 20-30% |

กฎ:

- Equipment ไม่ drop ใน MVP
- Resource และ Territory Supply อาจ drop
- Quest item ไม่ drop
- Bound item ไม่ drop
- drop ต้องมี cap ต่อ death

## 12. Weight และ Carry

Resource ควรมีน้ำหนัก

ตัวอย่าง:

- Wood: กลาง
- Stone: หนัก
- Ore: หนัก
- Herb: เบา
- Fish: เบา/กลาง
- Crystal: เบาแต่หายาก
- Supply Crate: หนักมาก

ผลเมื่อหนักเกิน:

- Energy cost เพิ่ม
- movement range ลด
- ใช้ mount บางชนิดไม่ได้
- ห้ามเก็บ resource เพิ่ม

MVP:

- ถ้าซับซ้อนเกิน ให้ใช้ inventory stack ก่อน
- แต่ database ควรมี field weight ไว้

## 13. Respawn Time

ค่าแนะนำ:

| Tier | Respawn |
| --- | --- |
| T1 | 1-5 นาที |
| T2 | 5-15 นาที |
| T3 | 15-30 นาที |
| T4 | 30-60 นาที |
| T5 | event/boss/time window |

ควรมี random offset เพื่อกัน bot:

```text
actual_respawn = base_respawn + random(-20%, +20%)
```

## 14. Anti-Bot / Anti-Farm

กฎ:

- node depletion
- respawn random offset
- quiz/check บางครั้ง
- diminishing reward ถ้าฟาร์ม node เดิมซ้ำ
- server authority
- detect path loop
- contested resource มี PvP risk
- tool durability ลดจริง
- carry/weight จำกัดการฟาร์มยาวเกิน

## 15. Offline Guard และ Resource

Offline Guard ไม่ควรฟาร์ม resource เอง

กฎ:

- offline guard ป้องกัน tile ได้
- offline guard ไม่เริ่ม gather
- trap/turret/device ทำงานได้ตามกฎ
- resource node ไม่ควรถูกเก็บโดยตัวละคร offline

เหตุผล:

- กันการเปิดตัวละครทิ้งไว้ฟาร์ม 24 ชั่วโมง
- ให้การฟาร์มต้องเป็น active gameplay

## 16. UI/UX

Resource UI ควรแสดง:

- resource icon
- tier
- quantity เหลือโดยประมาณ
- required tool
- required life skill
- ownership ของ tile
- PvP risk warning
- respawn/depleted state
- weight ที่จะได้รับ
- quiz bonus result

บนแผนที่:

- resource node icon
- rare node highlight
- contested resource marker
- city-owned resource marker

## 17. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- resource_types
- resource_tiers
- resource_nodes
- resource_node_states
- resource_spawn_rules
- resource_gather_logs
- resource_respawn_timers
- resource_ownership_modifiers
- resource_drop_rules
- resource_weight_rules
- character_gathering_stats

## 18. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /resources/types`
- `GET /world/tile/:id/resources`
- `POST /resources/gather/start`
- `POST /resources/gather/complete`
- `POST /resources/gather/cancel`

Realtime Events:

- `resource:spawned`
- `resource:depleted`
- `resource:respawned`
- `resource:gather_started`
- `resource:gather_completed`
- `resource:contested`
- `resource:ownership_bonus_applied`
- `resource:rare_found`

## 19. Edge Cases

- ผู้เล่นหลายคนเก็บ node เดียวกันพร้อมกัน
- node หมดระหว่างผู้เล่นกำลัง gather
- tile ownership เปลี่ยนระหว่าง gather
- ผู้เล่นตายระหว่างแบก supply crate
- inventory เต็มตอน gather สำเร็จ
- tool durability หมดกลาง action
- quiz result มาช้าหลัง node depleted
- bot เดินวนเก็บ node เดิม
- resource respawn บน tile ที่กลายเป็น blocked

## 20. Prototype Rules: Depletion, Yield, and Respawn

The browser prototype uses the following authoritative rule set. The production server must calculate and persist every quantity, gather result, depletion time, and respawn result.

### Node lifecycle

1. Each resource node has `resource_type`, `tier`, `quantity`, `max_quantity`, and optional `respawn_at`.
2. A gathering action represents one minute of active gathering in the prototype.
3. Every completed action reduces `quantity`; the collected amount is added to the player's inventory.
4. At `quantity = 0`, the node disappears and the tile is empty. The tile can be claimed while waiting.
5. Exactly 30 minutes after depletion, the server randomly chooses a valid resource type and tier for that tile's biome, then creates a new node. Claim ownership does not prevent the respawn.

### Wood gathering yield

| Gathering Level | Wood / minute | Wood / 30 minutes |
| --- | ---: | ---: |
| Lv.1 | 10 | 300 |
| Lv.2 | 12 | 360 |
| Lv.3 | 15 | 450 |
| Lv.4 | 18 | 540 |
| Lv.5 | 21 | 630 |

Other resource types apply a lower multiplier because they are more valuable: herb 0.90, stone 0.85, hardwood 0.70, iron 0.65, crystal 0.50. Tools, city bonuses, quiz bonuses, and PvP risk modifiers are applied after this base yield.

### Spawn selection

- Forest and grass: wood, herb, or hardwood.
- Mountain and desert: stone or iron.
- Snow, mountain, and water: crystal may spawn.
- The prototype displays T1-T3 nodes. Tier is rolled with the resource type; T2 adds 25% node quantity and T3 adds 50%. A production table should weight low tiers most heavily and reserve high tiers for dangerous biomes and events.

## 21. TODO

- กำหนด resource type จริงสำหรับ MVP
- กำหนด node spawn ต่อ biome
- กำหนด tool requirement และ durability loss
- กำหนด yield formula
- กำหนด PvP drop ต่อ resource type
- กำหนด weight/carry ว่าจะใช้ใน MVP หรือ phase หลัง
- เชื่อมกับ `30-LifeSkill.md`
- เชื่อมกับ `31-Crafting.md`
- เชื่อมกับ `21-Item-System.md`
