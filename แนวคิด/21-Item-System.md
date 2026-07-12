# 21-Item-System

> สถานะ: Draft v1

## 1. ภาพรวม

Item System คือระบบไอเท็มกลางของ EduQuest Online ทุกอย่างที่ผู้เล่นถือ ใช้ แลกเปลี่ยน คราฟ เก็บจากมอน หรือได้จาก territory war ต้องอ้างอิงระบบนี้ ไม่ว่าจะเป็น equipment, consumable, resource, crafting material, quest item, pet item, mount item, territory supply หรือ currency

หลักสำคัญ:

- ไอเท็มทุกชนิดต้องมี type และ rule ชัดเจน
- ต้องกำหนด stack, bind, trade, drop, sell, destroy ตั้งแต่แรก
- PvP death drop ต้องระวัง ไม่ควรทำให้ผู้เล่นเสียของหนักเกิน
- Territory item เป็นหมวดสำคัญของเกมนี้
- Consumable ต้องมี cooldown เพื่อกัน spam
- Item sink ต้องมีเพื่อรักษา economy

## 2. Item Type

### 2.1 Equipment

ของสวมใส่ทั้งหมด รายละเอียดอยู่ใน `22-Equipment-System.md`

ตัวอย่าง:

- weapon
- armor
- accessory
- rune
- charm
- tool

### 2.2 Consumable

ของใช้แล้วหมด

ตัวอย่าง:

- HP Potion
- MP Potion
- Energy Food
- Buff Food
- Antidote
- Cleanse Item
- Repair Kit
- Return Scroll
- Scout Flare

### 2.3 Resource

วัตถุดิบจาก world map

ตัวอย่าง:

- wood
- stone
- ore
- herb
- fish
- monster material
- crystal
- rare biome material

### 2.4 Crafting Material

วัตถุดิบที่ผ่านการแปรรูปหรือใช้เฉพาะสูตรคราฟ

ตัวอย่าง:

- ingot
- plank
- cloth
- leather
- essence
- gear core
- rune dust
- monster core

### 2.5 Quest Item

ไอเท็มภารกิจ

กฎ:

- trade ไม่ได้
- drop ไม่ได้
- sell ไม่ได้
- ลบหรือเปลี่ยนสถานะเมื่อ quest จบ

### 2.6 Territory Item

ไอเท็มที่ใช้กับสงครามพื้นที่

ตัวอย่าง:

- claim token
- repair supply
- barricade kit
- trap kit
- outpost core
- city supply crate
- scout flare
- field ration

### 2.7 Pet/Mount Item

ตัวอย่าง:

- pet egg
- pet food
- pet skill book
- mount feed
- saddle
- evolution stone
- mount license

### 2.8 Currency

ตัวอย่าง:

- Gold
- Diamond
- City Token
- Guild Token
- PvP Token
- Knowledge Token
- Event Token

## 3. Item Data

ไอเท็มทุกชนิดควรมีข้อมูลมาตรฐาน:

- item_id
- name
- type
- subtype
- rarity
- stackable
- max_stack
- bind_type
- tradable
- sellable
- droppable
- destroyable
- weight
- inventory_category
- use_effect
- crafting_tags
- level_requirement
- class_requirement
- city_requirement
- expires_at
- source
- description

Item instance เพิ่มเติม:

- instance_id
- owner_character_id
- quantity
- durability ถ้ามี
- bound_to
- created_at
- acquired_from
- metadata

## 4. Inventory Category

เพื่อให้ UI ไม่รก ควรแบ่งหมวด:

- Equipment
- Consumable
- Resource
- Crafting
- Quest
- Territory
- Pet/Mount
- Currency
- Misc

## 5. Stack Rule

ค่าแนะนำ:

| Item Type | Max Stack |
| --- | --- |
| Potion | 99 |
| Food | 99 |
| Resource | 999 |
| Crafting Material | 999 |
| Token/Currency | 9999 หรือใช้ currency balance |
| Quest Item | แล้วแต่ชนิด |
| Equipment | ไม่ stack |
| Pet/Mount | ไม่ stack หรือ stack เฉพาะ item form |

กฎ:

- item ที่มี durability/random stat ไม่ควร stack
- item bound ต่างกันไม่ควร stack รวมกัน
- item หมดอายุไม่ควร stack กับ item ไม่หมดอายุ

## 6. Binding Rule

ประเภท bind:

- Tradable
- Bind on Pickup
- Bind on Equip
- Account Bound
- City Bound
- Guild Bound
- Quest Bound

คำแนะนำ:

- Common/Rare ส่วนใหญ่ trade ได้
- item craft ควร trade ได้เพื่อหนุน economy
- Legendary อาจ Bind on Equip
- territory reward อาจ City Bound
- quest item เป็น Quest Bound
- premium/cosmetic อาจ Account Bound

## 7. Trading / Selling / Destroying

แต่ละ item ต้องระบุ:

- tradable
- sellable
- destroyable
- marketplace_allowed
- mail_allowed
- warehouse_allowed

ข้อควรระวัง:

- Quest item ห้ามขาย/ทิ้ง ถ้ายังต้องใช้
- Territory supply อาจห้ามขายร้าน แต่ส่งเข้า city depot ได้
- Bound item ห้าม marketplace
- Currency บางชนิดไม่ควร trade

## 8. Consumable Rule

Consumable ต้องมี cooldown

ค่าแนะนำ:

| Item | Cooldown |
| --- | --- |
| HP Potion | 10-20 วินาที |
| MP Potion | 10-20 วินาที |
| Energy Food | 30-60 วินาที |
| Buff Food | 5-15 นาที |
| Repair Kit | 10-30 วินาที |
| Scout Flare | 30-60 วินาที |
| Return Scroll | ใช้ไม่ได้ตอน Combat Lock |

กฎ:

- Potion ใน PvP อาจมีประสิทธิภาพลดลงเล็กน้อย
- Return/Teleport item ใช้ไม่ได้ระหว่าง Combat Lock
- Consumable บางชนิดใช้ไม่ได้ใน Center Zone หรือ dungeon
- Offline Guard ใช้ consumable ได้เฉพาะที่ตั้งไว้ใน offline rule เท่านั้น

## 9. Grid Item Usage

ไอเท็มบางอย่างใช้กับ tile บนแผนที่

ตัวอย่าง:

- Repair Kit: ใช้กับ outpost/device/core ในช่องติดกัน
- Trap Kit: วาง trap ในช่องติดกัน
- Barricade Kit: วางสิ่งกีดขวางชั่วคราว
- Scout Flare: เปิด vision รอบ tile
- Claim Token: เพิ่ม claim progress ตามกฎ
- City Supply Crate: ส่งเข้าเมืองหรือ outpost
- Energy Food: ฟื้น Energy ให้ผู้เล่น

ต้องตรวจ:

- range
- tile state
- ownership
- PvP zone
- Combat Lock
- cooldown
- item quantity

## 10. PvP Death Drop

MVP แนะนำไม่ให้อุปกรณ์ตกจากตัวผู้เล่น

กฎแนะนำ:

| Zone | Drop Rule |
| --- | --- |
| Safe Zone | ไม่ drop |
| Farm Zone | ไม่ drop |
| Frontier Zone | resource drop 0-5% |
| Contested Zone | resource drop 10-20% |
| Center Zone | resource/supply drop 20-30% |

กฎ:

- Equipment ไม่ drop ใน MVP แต่ durability ลด
- Quest item ไม่ drop
- Bound item ไม่ drop
- Currency หลักไม่ drop
- Territory supply อาจ drop ถ้าถืออยู่
- Resource ที่ drop ต้องมี cap

เหตุผล:

- PvP ควรมีความเสี่ยง แต่ไม่โหดจนผู้เล่นไม่กล้าออกจากเมือง
- การเสีย resource/supply ทำให้สงครามมีน้ำหนักโดยไม่ทำลาย progress หลัก

## 11. Weight / Carry

ระบบน้ำหนักช่วยให้ resource และ supply มีความหมาย

ค่า:

- item_weight
- carry_capacity
- current_weight

แหล่ง carry capacity:

- STR
- bag
- pet
- mount
- equipment

ผลเมื่อหนักเกิน:

- ใช้ Energy เพิ่ม
- movement range ลด
- ใช้ mount บางชนิดไม่ได้
- ห้าม pick up item เพิ่ม

MVP ทางเลือก:

- เริ่มด้วย inventory slot ก่อน
- เพิ่ม weight ภายหลังเมื่อระบบ resource/territory supply พร้อม

## 12. Item Source

แหล่งที่มา:

- monster drop
- boss drop
- resource node
- crafting
- quest reward
- territory reward
- city shop
- guild shop
- event
- marketplace
- mail/trade

ข้อสำคัญ:

- AI-generated content ไม่ควรสร้าง item จริงโดยตรง
- item ใหม่ต้องมาจาก design table/admin approval

## 13. Item Sink

ต้องมีทางดูด item ออกจากระบบ:

- consumable ใช้แล้วหมด
- crafting consume material
- repair consume gold/resource
- enchant consume material
- city supply consume resource
- marketplace tax
- item destroy
- event exchange
- durability repair

เหตุผล:

- ป้องกัน resource ล้น server
- ทำให้ economy มี demand ต่อเนื่อง
- ทำให้ farmer/crafter มีบทบาท

## 14. Item กับ Offline Guard

Offline Guard ใช้ item จริงตามกฎ:

- อุปกรณ์ durability ลดเมื่อใช้สกิล/โดนตี
- tool durability ลดเมื่อ trap/turret/repair ทำงาน
- consumable ใช้ได้เฉพาะที่อนุญาตใน offline loadout
- item หมดแล้ว offline guard ใช้ต่อไม่ได้

ข้อจำกัด:

- ห้าม Offline Guard ใช้ potion แบบไม่จำกัด
- ต้องมี cooldown และ quantity
- ใช้ item แล้วต้อง log เพื่อให้เจ้าของเห็นตอนกลับมา

## 15. UI/UX

Item UI ควรแสดง:

- icon
- name
- rarity color
- type/subtype
- quantity
- stack
- bind status
- tradable/sellable/drop rule
- weight
- cooldown
- use condition
- source

Inventory filter:

- All
- Equipment
- Consumable
- Resource
- Crafting
- Quest
- Territory
- Pet/Mount
- Currency

Tooltip ควรชัด:

- ใช้ไม่ได้ระหว่าง Combat Lock
- ตกได้เมื่ออยู่ใน Center Zone
- City Bound: ใช้ได้กับเมืองนี้เท่านั้น
- Offline Guard สามารถใช้ item นี้ได้/ไม่ได้

## 16. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- item_templates
- item_instances
- item_types
- item_rarities
- item_stacks
- item_bindings
- item_use_effects
- item_cooldowns
- item_sources
- item_sinks
- item_drop_rules
- inventories
- inventory_slots
- item_transaction_logs
- item_use_logs
- pvp_drop_logs
- offline_item_use_logs

## 17. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /items/templates`
- `GET /characters/:id/inventory`
- `POST /items/use`
- `POST /items/drop`
- `POST /items/destroy`
- `POST /items/split-stack`
- `POST /items/merge-stack`
- `POST /items/move`
- `POST /items/trade`

Realtime Events:

- `item:added`
- `item:removed`
- `item:used`
- `item:cooldown_started`
- `item:stack_changed`
- `item:bound`
- `item:dropped`
- `item:picked_up`
- `inventory:updated`
- `pvp:item_dropped`
- `offline:item_used`

## 18. Edge Cases

- item stack รวมกันผิด bind type
- ใช้ potion พร้อมตาย
- ใช้ Return Scroll ระหว่าง Combat Lock
- item หมดอายุขณะอยู่ใน marketplace
- resource drop จาก PvP เกิน cap
- inventory เต็มตอนรับ quest reward
- offline guard ใช้ item ชิ้นสุดท้ายแล้วเจ้าของกลับมาไม่รู้
- item ถูก trade ระหว่าง server lag
- item bound แล้วยังขึ้น marketplace
- item weight ทำให้ผู้เล่นติดอยู่กลางแมพ

## 19. TODO

- กำหนด item type/subtype enum จริง
- กำหนด stack size จริง
- กำหนด PvP drop table ต่อ zone
- กำหนด consumable cooldown จริง
- กำหนด inventory slot หรือ weight สำหรับ MVP
- กำหนด territory item ชุดแรก
- เชื่อมกับ `22-Equipment-System.md`
- เชื่อมกับ `29-Resource-System.md`
- เชื่อมกับ `31-Crafting.md`
