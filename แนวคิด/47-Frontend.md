# 47-Frontend

> สถานะ: Draft v1

## 1. ภาพรวม

Frontend ของ EduQuest Online ต้องให้ความรู้สึกเป็นเกม MMORPG เต็มจอบน browser ไม่ใช่เว็บ dashboard หน้าแรกหลังเข้าเกมควรเห็น world map, tile grid, เมือง, ผู้เล่น, มอนสเตอร์, resource, HUD และ action ที่เล่นได้ทันที

เป้าหมายภาพรวม:

> Browser MMORPG + Tactical Grid Map + Fantasy Territory War

ผู้เล่นต้องรู้สึกว่าเกมดูอลังการ น่าเล่น อ่านสถานการณ์ง่าย และเข้าใจว่าต้องทำอะไรต่อจากหน้าจอเดียว

## 2. หลักการออกแบบ UX/UI

- Game First: หน้าจอหลักคือแผนที่เกม ไม่ใช่หน้าเมนู
- Fullscreen Experience: UI ควรเต็มจอแบบเกม
- Grid Clarity: ช่องตารางต้องอ่านง่าย คลิกง่าย และเห็น ownership ชัด
- Fantasy Tactical: โทนแฟนตาซีผสมเกมวางแผน ไม่ใช่เว็บธุรกิจ
- Fast Feedback: เดิน ตี เก็บของ claim ต้องมี animation/feedback ทันที
- Clear Risk: PvP, Combat Lock, Offline Guard, resource drop ต้องเตือนชัด
- Minimal Reading: objective และ tooltip สั้น ชัด เข้าใจไว
- Beautiful but Playable: สวยอลังการ แต่ข้อมูลสำคัญต้องไม่ถูกเอฟเฟกต์บัง

## 3. Screen List

หน้าหลักที่ต้องมี:

- Login
- Character Select
- Character Creation
- City Selection
- Main Game Screen
- Inventory/Equipment
- Skill/Stat
- Mount/Pet
- Crafting
- Shop/Stable
- Logout/Offline Guard Settings

MVP อาจเริ่มเฉพาะ:

- Character Select mock
- City Selection
- Main Game Screen
- Inventory/Equipment mock
- Skill Bar mock
- Mount/Pet mock
- Logout modal

## 4. Character Select

แสดง:

- ตัวละคร
- level
- class
- home city
- active mount
- active pet
- last position/zone
- Offline Guard status ถ้าตัวละครยังอยู่ในโลก

ปุ่ม:

- Enter World
- Create Character
- Settings

## 5. City Selection

ใช้ตอนสร้างตัวละคร

แสดงเมืองเกิด 4 ทิศ:

- North City: น้ำเงิน/เงิน
- South City: เขียว/ทอง
- East City: ฟ้า/ม่วง
- West City: แดง/ทองแดง

แต่ละเมืองแสดง:

- สีเมือง
- จุดเกิดบนแผนที่
- bonus เบา ๆ
- population balance
- ปุ่มเลือกเมือง
- ปุ่มสุ่มเมือง

ข้อควรระวัง:

- bonus เมืองต้องไม่แรงจนบังคับ meta
- ปุ่มสุ่มเมืองควรแสดง reward เล็กน้อยเพื่อช่วย balance

## 6. Main Game Layout

หน้าจอหลักเต็มจอ:

```text
┌─────────────────────────────────────────────────────────────┐
│ Top HUD: Portrait / HP MP Energy / Currencies / Alerts      │
├───────────────┬───────────────────────────────┬─────────────┤
│ Quest/Object  │                               │ Minimap     │
│ Chat/Events   │        World Map Grid          │ Tile Info   │
│ City Mission  │                               │ Territory   │
├───────────────┴───────────────────────────────┴─────────────┤
│ Bottom HUD: Skill Bar / Mount / Pet / Inventory / Menu       │
└─────────────────────────────────────────────────────────────┘
```

จุดสำคัญ:

- World map ต้องใหญ่ที่สุด
- HUD ไม่ควรบัง tile สำคัญ
- panel ซ้าย/ขวาพับเก็บได้
- mobile/tablet อาจใช้ bottom sheet แทน panel ข้าง

## 7. World Map UI

World Map คือพระเอกของเกม

ต้องแสดง:

- grid/tile ชัดเจน
- terrain texture เช่น grass, forest, desert, mountain, snow, water
- owner color overlay ของ 4 เมือง
- neutral tile
- contested tile
- center zone effect
- resource node
- monster
- player
- offline guard
- claim progress
- outpost/barricade/trap
- safe/farm/frontier/contested/center zone boundary

สี ownership:

- North: blue/silver
- South: green/gold
- East: cyan/purple
- West: red/copper
- Neutral: gray/natural
- Contested: animated border

## 8. Tile Interaction

เมื่อ hover/click tile ต้องแสดงข้อมูล:

- coordinate
- biome
- terrain
- owner
- zone type
- PvP risk
- resource node
- monster
- players standing
- offline guard
- claim status

ปุ่ม action ตามบริบท:

- Move
- Gather
- Attack
- Claim
- Defend
- Inspect
- Set Marker

ถ้า action ใช้ไม่ได้ ต้องบอกเหตุผล เช่น:

- Not enough Energy
- Combat Locked
- Line of Sight blocked
- Requires Pickaxe
- PvP disabled in this zone

## 9. Movement UX

เมื่อผู้เล่นเลือกเดิน:

- highlight ช่องที่เดินได้
- แสดง Energy cost
- แสดง mount range
- แสดงช่องที่เดินได้จาก quiz bonus
- แสดง blocked tile
- แสดง PvP danger tile

สีแนะนำ:

- ฟ้า: เดินได้
- เหลือง: เดินได้ถ้าตอบคำถามถูก
- แดง: อันตราย/PvP
- เทา: blocked
- ม่วง: contested

ตัวอย่าง:

- เดินปกติ 1 ช่อง
- ตอบคำถามถูก 2 ช่อง
- Starter Horse 2 ช่อง
- Dragon 5 ช่อง

ถ้าติด Combat Lock:

- mount button lock
- Safe Logout lock
- timer 20 วินาที

## 10. Combat UX

เมื่อเลือกเป้าหมายหรือสกิล:

- highlight skill range
- highlight affected tile
- แสดง Line of Sight
- แสดง invalid tile
- แสดง cooldown
- แสดง resource cost
- แสดง cast time
- แสดง quiz bonus ที่เป็นไปได้

สี skill area:

- แดง: damage
- เขียว: heal/support
- เหลือง: territory/claim
- ฟ้า: movement
- ม่วง: debuff/control

Feedback:

- damage number
- heal number
- shield indicator
- debuff icon
- miss/dodge/block text
- Combat Lock timer
- death summary

## 11. PvP UX

เมื่อเข้า PvP zone:

- แสดง warning ชัดเจน
- enemy city color ชัด
- show PvP risk ใน tile panel
- show Combat Lock เมื่อเริ่มสู้
- show Mount Lock/Safe Logout Lock

ข้อความตัวอย่าง:

- You are entering a Contested Zone.
- Combat Locked: 18s
- Cannot mount during combat.
- Safe logout unavailable.
- If you close the browser now, your character remains in the world.

## 12. Quiz UX

Quiz ต้องไม่เหมือนข้อสอบ

ชื่อ overlay:

- Rune Check
- Tactical Insight
- Pathfinding Rune
- Crafting Formula
- Territory Attunement

รูปแบบ:

- overlay สั้น
- คำถามสั้น
- ตัวเลือกใหญ่
- แสดง reward ที่จะได้
- feedback ทันที
- ไม่บังเกมนาน

ตัวอย่าง reward text:

- Correct: +1 Movement
- Correct: +10% Damage
- Correct: +5 Claim Progress
- Correct: Rare chance up

## 13. Inventory และ Equipment UI

Inventory เป็น panel/modal

แสดง:

- inventory grid
- item category
- search/filter
- stack
- weight/carry ถ้าเปิดใช้
- item tooltip
- rarity color
- bind status
- PvP drop warning

Equipment:

- slot รอบตัวละคร
- durability bar
- compare item
- stat change preview
- special effect
- repair button

Filter:

- Equipment
- Consumable
- Resource
- Crafting
- Territory
- Pet/Mount
- Currency

## 14. Skill UI

Skill Bar ล่างจอ:

- basic attack
- active skill
- territory skill
- potion/consumable shortcut
- mount
- pet command
- inventory

ต้องแสดง:

- cooldown
- unavailable reason
- range preview เมื่อ hover
- resource cost
- hotkey

## 15. Mount UI

แสดง:

- active mount icon
- stamina
- movement range
- summon/dismiss
- mount cooldown
- dismount risk
- terrain bonus

ถ้า Combat Lock:

- mount button disabled
- แสดง timer

Stable UI:

- mount list
- preview
- cost currency
- movement stat
- carry bonus
- terrain bonus
- allowed zone

## 16. Pet UI

แสดง:

- active pet
- pet type
- level
- loyalty/mood
- pet skill
- trigger status
- summon/dismiss

สำหรับสัตว์เทพ:

- mythic skill cooldown
- PvP effect reduced warning
- fragment/source progress

## 17. Crafting UI

แสดง:

- station
- recipe list
- required materials
- missing items
- success rate
- quality range
- quiz bonus
- craft time
- output preview
- bind/trade result

ต้องมี:

- show only craftable
- favorite recipe
- bulk craft สำหรับ item พื้นฐาน

## 18. Shop และ Economy UI

Currency bar:

- Gold
- Diamond
- City Token
- Blood Drop
- Guild Token
- Knowledge Token
- Event Token
- Boss Fragment

Shop UI:

- แสดง currency ที่ใช้
- แสดง requirement
- แสดง bound status
- แสดง preview mount/pet/equipment
- แสดง warning ถ้าเป็น cosmetic/premium

## 19. Logout และ Offline Guard UX

สำคัญมากเพราะเกมเล่นบน browser

Logout Modal ต้องมี:

- Safe Logout
- Stay in World / Offline Guard
- Default Logout Mode
- Offline Skill Loadout
- warning ถ้าอยู่ PvP/Combat Lock
- timer ถ้าออกไม่ได้ทันที
- preview ว่าตัวละครจะอยู่ที่ tile ไหน

กรณีปิดเว็บ:

- UI settings ต้องให้ผู้เล่นตั้งค่าไว้ชัด
- ถ้าปิดเว็บตอน Combat Lock ตัวละครยังอยู่ในโลก
- reconnect screen ต้องบอกสถานะล่าสุด

ข้อความตัวอย่าง:

- Closing the browser now will keep your character in the world.
- Offline Guard enabled for 4 hours.
- Your character may be attacked while offline.

## 20. Art Direction

สไตล์:

- fantasy tactical MMORPG
- dark stone/metal/glass UI
- territory color สดแต่ไม่แสบตา
- tile texture มีรายละเอียด
- center zone มีแสงพิเศษ
- skill effect สั้น ชัด ไม่บังข้อมูล

หลีกเลี่ยง:

- UI แบบ dashboard/card หนา ๆ
- สีเดียวทั้งเกม
- effect เยอะจนมอง tile ไม่ออก
- text ยาวบนหน้าจอหลัก

## 21. Frontend Tech

แนะนำ:

- Next.js: app shell, routing, account, panels
- React: HUD, panels, modals
- Phaser หรือ PixiJS: world map grid/canvas
- WebSocket: realtime movement/combat/tile update
- Zustand หรือ Redux: client state
- Tailwind/CSS Modules: UI styling
- Canvas/WebGL: map rendering

หลักการ:

- Server authoritative
- Client ทำ prediction ได้เฉพาะ visual
- ทุก movement/combat/claim ต้องรอ server confirm
- UI ต้องรองรับ reconnect/resync

## 22. Prototype Scope

Playable Prototype Phase 1:

- world map grid 30x30 หรือ 50x50
- เมือง 4 ทิศ
- center zone
- player marker
- tile ownership overlay
- movement highlight
- Energy bar
- mount mock
- monster mock
- resource node mock
- tile info panel
- skill bar mock
- combat lock timer
- quiz overlay mock
- inventory mock
- logout/offline guard modal

ยังไม่ต้องมี:

- full backend จริง
- marketplace จริง
- pet evolution
- guild
- raid
- real AI question generation

## 23. Database/API ที่เกี่ยวข้อง

Frontend ต้องใช้ API/Event จาก:

- character
- world map
- movement
- combat
- PvP
- inventory
- equipment
- mount
- pet
- crafting
- economy
- logout/offline guard

Realtime Events:

- `player:moved`
- `tile:ownership_changed`
- `combat_lock:started`
- `combat_lock:ended`
- `monster:moved`
- `resource:depleted`
- `skill:used`
- `item:added`
- `mount:summoned`
- `pet:skill_triggered`
- `offline_guard:started`

## 24. Edge Cases

- browser resize แล้ว map/UI พัง
- reconnect แล้วตำแหน่งไม่ตรง
- skill highlight ไม่ตรงกับ server validation
- tile ownership เปลี่ยนขณะ panel เปิดอยู่
- inventory เต็มตอนรับ item
- Combat Lock timer client/server ไม่ตรง
- user ปิดเว็บกลาง quiz
- Offline Guard ถูกโจมตีตอนเจ้าของอยู่หน้า logout
- mobile viewport แคบเกินสำหรับ panel ซ้าย/ขวา

## 25. Prototype Visual Direction: Isometric World Map

The playable map uses an isometric 2.5D renderer instead of a flat square grid. Every game tile remains an addressable grid cell for movement, PvP, gathering, and claim; only its presentation changes.

- Tiles are diamond-shaped, with a low-poly top surface and visible side depth.
- Forest, grass, mountain, snow, water, and desert render with compact scene props such as tree groves, peaks, waves, and dunes.
- Spawn cities render as compact settlements, while the center PvP objective renders as a landmark monument.
- Ownership is communicated through the diamond rim: blue North, green South, teal East, copper West; unowned PvP tiles use a clear red rim.
- Safe/PvP boundaries, selected tiles, reachable tiles, resources, monsters, and player markers must sit above the terrain and remain readable at mobile scale.
- The map keeps mouse/touch drag panning and uses DOM buttons for accessible, deterministic tile selection in the prototype.
- The camera corrects from the final rendered player position, keeping the active character inside the frame even at a world edge.
- The area beyond an explored world edge renders as open water, so the playable land reads as part of a larger world rather than a clipped rectangle.
- Each 5x5 spawn city uses one city-color ground treatment. A luminous perimeter is drawn only around the district's outer diamond, while the surrounding unowned PvP tiles retain their red rim.
- The city ground treatment overrides its hidden biome at every visual layer. Four deterministic resource nodes sit at the district corners, and choosing a city resets the character position to that city's own center tile.

## 26. TODO

- ทำ wireframe main game screen
- กำหนด design tokens สีเมือง 4 ทิศ
- กำหนด icon set สำหรับ tile/resource/monster/player
- เลือก Phaser หรือ PixiJS
- ทำ prototype grid 30x30
- ทำ HUD mock
- ทำ tile info panel
- ทำ movement highlight
- ทำ quiz overlay
- ทำ logout/offline guard modal
