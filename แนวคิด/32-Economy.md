# 32-Economy

> สถานะ: Draft v1

## 1. ภาพรวม

Economy System คือระบบเงิน ร้านค้า การแลกเปลี่ยน และ item sink ของ EduQuest Online เกมนี้ควรใช้หลายสกุลเงินเพื่อแยกหน้าที่ชัดเจน เช่น เงินทั่วไป เงินพรีเมียม เงินเมือง เงิน PvP เงินกิลด์ เงินกิจกรรม และชิ้นส่วนบอส

หลักสำคัญ:

- แต่ละสกุลเงินต้องมีแหล่งที่มาและที่ใช้ชัดเจน
- ห้ามให้เงินพรีเมียมซื้อพลังตรงจนกลายเป็น pay-to-win
- Gold ใช้เป็นเงินทั่วไป
- Currency เฉพาะทางใช้ควบคุม reward และร้านค้าเฉพาะระบบ
- Economy ต้องมี item/currency sink เพื่อกันเงินเฟ้อ

## 2. สกุลเงินหลัก

### 2.1 Gold

เงินพื้นฐานของเกม

หาได้จาก:

- ฆ่ามอนสเตอร์
- ทำ quest
- ขาย item/resource
- daily/city mission
- dungeon/boss
- crafting/trading

ใช้กับ:

- ซื้อของพื้นฐาน
- ซ่อม equipment
- crafting fee
- ซื้อ starter mount
- ซื้อ consumable
- marketplace fee
- teleport/บริการ NPC บางอย่าง

บทบาท:

- เป็นเงินหมุนเวียนหลัก
- ทุกคนหาได้
- ต้องมี sink เยอะเพื่อกันเงินเฟ้อ

### 2.2 Diamond

เงินพรีเมียมหรือเงินหายาก

หาได้จาก:

- เติมเงิน
- achievement พิเศษบางอย่าง
- event reward จำกัด
- season reward จำนวนเล็กน้อย

ใช้กับ:

- cosmetic skin
- mount/pet skin
- character appearance
- name change
- stable slot
- inventory convenience แบบจำกัด
- battle pass/cosmetic pass ถ้ามี

ข้อห้าม:

- ไม่ควรซื้อ equipment stat แรงโดยตรง
- ไม่ควรซื้อ mount power สูงโดยตรง เช่น Dragon
- ไม่ควรซื้อ item ที่ทำให้ชนะ PvP/territory ง่ายกว่าอย่างชัดเจน

### 2.3 City Token

เงินประจำเมือง เกี่ยวกับการช่วยเมืองเกิด

หาได้จาก:

- ยึด tile ให้เมือง
- ป้องกัน tile
- ส่ง resource เข้า city depot
- ทำ city mission
- เข้าร่วม territory event
- weekly city reward

ใช้กับ:

- City Mount
- territory gear
- city cosmetic
- city buff
- repair supply
- outpost material
- city shop

บทบาท:

- ทำให้ผู้เล่นอยากช่วยเมืองตัวเอง
- ใช้ควบคุม economy ของ territory war

### 2.4 Blood Drop

เงิน PvP หรือหยดเลือด ได้จากการต่อสู้กับผู้เล่น

หาได้จาก:

- ฆ่าผู้เล่นต่างเมืองใน PvP zone
- assist
- ป้องกัน tile สำเร็จ
- ขัด claim
- ชนะ city war objective
- PvP daily/weekly

ใช้กับ:

- War Wolf
- PvP cosmetic
- PvP title
- PvP gear ที่เน้น utility ไม่ใช่ stat พัง
- arena/war shop
- dismount resistance item บางชนิด

ข้อจำกัด:

- ฆ่าคนเดิมซ้ำ reward ลด
- level difference สูง reward ลด
- offline kill reward ลด
- ต้องมี anti-farm

### 2.5 Guild Token

เงินกิจกรรมกิลด์

หาได้จาก:

- guild quest
- guild boss
- guild war
- guild contribution
- guild research

ใช้กับ:

- guild shop
- guild buff
- raid supply
- guild cosmetic
- guild building upgrade

### 2.6 Knowledge Token

เงินจากกิจกรรมความรู้

หาได้จาก:

- daily knowledge challenge
- achievement ด้านคำถาม
- Knowledge Mastery milestone
- quiz event
- ranking ด้านความรู้

ใช้กับ:

- rune
- title
- cosmetic ด้านความรู้
- learning reward
- question review tool
- non-P2W utility

ข้อควรระวัง:

- ไม่ควรทำให้คนตอบคำถามเก่งซื้อพลัง PvP ตรงจนเกินไป
- ใช้เป็น unlock/utility/cosmetic จะปลอดภัยกว่า

### 2.7 Event Token

เงินกิจกรรมชั่วคราว

หาได้จาก:

- seasonal event
- holiday event
- world event
- limited quest

ใช้กับ:

- event cosmetic
- event mount skin
- event pet skin
- limited consumable
- decoration/title

### 2.8 Boss Fragment

ชิ้นส่วนจากบอสและ raid

หาได้จาก:

- world boss
- raid boss
- center zone boss
- season boss

ใช้กับ:

- Griffin shard
- Dragon shard
- boss equipment
- endgame rune
- rare crafting material

ข้อควรระวัง:

- ต้องมี weekly cap หรือ lockout
- ไม่ควร trade ง่ายเกินไปถ้าเป็น endgame progression

## 3. Currency Table

| Currency | แหล่งที่มา | ใช้กับ | Trade ได้ไหม |
| --- | --- | --- | --- |
| Gold | ทั่วไป | ซ่อม คราฟ ซื้อขาย | ได้บางระบบ |
| Diamond | เติมเงิน/รางวัลจำกัด | cosmetic/convenience | ไม่ควร trade |
| City Token | ช่วยเมือง/territory | city shop/mount/supply | ไม่ควร trade |
| Blood Drop | PvP | PvP shop/War Mount/title | ไม่ควร trade |
| Guild Token | กิลด์ | guild shop/buff | ไม่ควร trade |
| Knowledge Token | quiz/mastery | rune/title/utility | ไม่ควร trade |
| Event Token | event | event shop | ไม่ควร trade |
| Boss Fragment | boss/raid | endgame craft/mount shard | ส่วนใหญ่ bound |

## 4. Currency Source

แหล่งเงินต้องมี cap และ anti-abuse ตามความเสี่ยง

Gold:

- ได้ทั่วไป แต่ต้องมี sink มาก

City Token:

- ได้ตาม contribution จริง
- offline guard ได้แต่น้อยกว่า online
- weekly reward ช่วยกระตุ้นสงครามเมือง

Blood Drop:

- ต้องมี anti-farm หนัก
- repeat kill reward ลด
- ฆ่าผู้เล่น level ต่ำกว่ามาก reward ลด
- kill จาก offline guard ได้ลดลง

Diamond:

- ควบคุมด้วยระบบเติมเงินและ reward จำกัด
- ไม่ควรเป็น reward farm ปกติ

## 5. Currency Sink

Gold sink:

- repair
- crafting fee
- marketplace tax
- NPC service
- mount feed/stable
- teleport/return service
- item listing fee

City Token sink:

- city mount
- territory supply
- city buff
- outpost upgrade
- city cosmetic

Blood Drop sink:

- PvP mount
- PvP title
- PvP cosmetic
- war utility ที่ไม่ทำลาย balance

Guild Token sink:

- guild buff
- guild shop
- guild building
- raid supply

Knowledge Token sink:

- rune/cosmetic/title
- question review
- learning utility

Boss Fragment sink:

- shard exchange
- rare craft
- endgame equipment

## 6. ร้านค้า

### 6.1 General Shop

ใช้ Gold

ขาย:

- potion พื้นฐาน
- food
- tool เริ่มต้น
- repair kit
- starter mount บางตัว

### 6.2 Stable Shop

ใช้ Gold, City Token, Blood Drop, Event Token, Boss Fragment

ขาย:

- Starter Horse
- Swift Horse
- Pack Mule
- War Wolf
- City Mount
- mount feed
- mount gear

### 6.3 City Shop

ใช้ City Token

ขาย:

- City Mount
- territory gear
- repair supply
- outpost material
- city cosmetic
- city title

### 6.4 PvP Shop

ใช้ Blood Drop

ขาย:

- War Wolf
- PvP cosmetic
- PvP title
- PvP utility item แบบมี cap
- dismount-related item บางชนิด

### 6.5 Guild Shop

ใช้ Guild Token

ขาย:

- raid supply
- guild buff item
- guild cosmetic
- guild utility

### 6.6 Knowledge Shop

ใช้ Knowledge Token

ขาย:

- rune
- title
- cosmetic
- question review ticket
- learning-themed item

### 6.7 Event Shop

ใช้ Event Token

ขาย:

- limited cosmetic
- event mount/pet skin
- event title
- decoration

### 6.8 Premium Shop

ใช้ Diamond

ขาย:

- cosmetic
- skin
- appearance change
- name change
- stable slot
- inventory convenience จำกัด

ข้อห้าม:

- ไม่ขาย PvP power ตรง
- ไม่ขาย Dragon power ตรง
- ไม่ขาย resource แบบไม่จำกัดจน economy พัง

## 7. Marketplace / Trading

Marketplace ใช้ Gold เป็นเงินหลัก

ขายได้:

- crafted equipment
- resource
- crafting material
- consumable
- tool
- pet/mount item บางชนิด

ขายไม่ได้:

- bound item
- quest item
- City Token/Blood Drop/Guild Token โดยตรง
- premium currency
- boss fragment บางชนิด

ค่าธรรมเนียม:

- listing fee
- sale tax
- optional city tax ถ้าตลาดอยู่ในเมือง

## 8. PvP Economy

Blood Drop ต้องบาลานซ์เข้ม

กฎ:

- ได้จาก PvP ที่มีความหมาย
- ฆ่าคนเดิมซ้ำ reward ลด
- assist ได้บางส่วน
- defense/claim contribution ให้ reward ได้
- level gap มาก reward ลด
- offline kill reward ลด
- weekly cap ป้องกัน farm หนักเกิน

ตัวอย่าง:

```text
base_blood_drop = 10
repeat_kill_modifier = 0.1 ถึง 1.0
level_gap_modifier = 0.2 ถึง 1.0
zone_modifier = frontier 0.5, contested 1.0, center 1.5
offline_modifier = 0.5
```

## 9. Territory Economy

City Token ใช้ควบคุมสงครามเมือง

ได้จาก:

- claim tile
- defend tile
- deliver supply
- repair outpost
- city mission
- weekly city ranking

ใช้กับ:

- territory supply
- outpost upgrade
- city mount
- city gear
- city buff

ข้อจำกัด:

- contribution ต้องนับจาก action จริง
- AFK/offline contribution มี cap
- เมืองที่อ่อนกว่าอาจมี comeback bonus บางอย่าง

## 10. Premium Economy

Diamond ต้องไม่ทำลาย balance

อนุญาต:

- cosmetic
- convenience จำกัด
- skin
- extra preset/loadout slot
- stable slot
- appearance/name change

ไม่ควรอนุญาต:

- ซื้อ stat gear โดยตรง
- ซื้อ Blood Drop/City Token โดยตรง
- ซื้อ Dragon/mount endgame power โดยตรง
- ซื้อ resource T4/T5 แบบไม่จำกัด

## 11. Inflation Control

ปัญหา:

- Gold ล้น server
- resource ล้น marketplace
- token farm ซ้ำ

วิธีควบคุม:

- repair cost
- crafting fee
- marketplace tax
- enchant cost
- city project consume resource
- mount upkeep/feed
- event sink
- weekly cap สำหรับ token บางชนิด
- dynamic shop price บางรายการ

## 12. Reward Cap

ควรมี cap สำหรับ currency เฉพาะทาง:

- Blood Drop weekly cap
- City Token weekly soft cap
- Guild Token weekly cap
- Boss Fragment lockout
- Event Token event cap

Gold อาจไม่มี hard cap แต่ต้องมี sink

## 13. UI/UX

Currency UI ควรแสดง:

- Gold
- Diamond
- City Token
- Blood Drop
- Guild Token
- Knowledge Token
- Event Token
- Boss Fragment

ควรมี tooltip:

- หาได้จากไหน
- ใช้ซื้ออะไร
- trade ได้ไหม
- cap รายวัน/สัปดาห์ไหม

Shop UI:

- แสดง currency ที่ใช้
- แสดงของที่ซื้อได้/ซื้อไม่ได้
- แสดง requirement เช่น city rank, PvP rank
- แสดงคำเตือนถ้า item bound

## 14. Database ที่เกี่ยวข้อง

ตารางหรือ collection:

- currency_definitions
- character_wallets
- currency_transactions
- currency_sources
- currency_sinks
- shop_definitions
- shop_items
- shop_prices
- marketplace_listings
- marketplace_transactions
- currency_caps
- anti_farm_currency_logs

## 15. API/Event ที่เกี่ยวข้อง

REST/API:

- `GET /characters/:id/wallet`
- `GET /shops`
- `GET /shops/:id/items`
- `POST /shops/:id/buy`
- `POST /marketplace/list`
- `POST /marketplace/buy`
- `POST /marketplace/cancel`

Server/Internal:

- `grantCurrency(characterId, currencyType, amount, source, metadata)`
- `spendCurrency(characterId, currencyType, amount, sink, metadata)`
- `checkCurrencyCap(characterId, currencyType)`
- `applyAntiFarmModifier(source, metadata)`

Realtime Events:

- `currency:changed`
- `currency:granted`
- `currency:spent`
- `shop:item_bought`
- `marketplace:item_listed`
- `marketplace:item_sold`
- `currency:cap_reached`

## 16. Edge Cases

- ซื้อของพร้อมกันหลายหน้าต่างจนเงินติดลบ
- currency cap เต็มแต่ reward ยังเข้า queue
- kill PvP หลายคนพร้อมกันแล้ว Blood Drop คำนวณผิด
- marketplace sale หลัง item ถูก bind
- refund premium item
- shop price เปลี่ยนระหว่างเปิด UI
- server crash หลังหักเงินก่อนให้ item
- exploit ส่ง City Token/Blood Drop ผ่าน trade

## 17. TODO

- กำหนดชื่อสกุลเงิน final
- กำหนด wallet schema
- กำหนด Gold source/sink ช่วง MVP
- กำหนด Blood Drop formula จริง
- กำหนด City Token reward table
- กำหนด shop รายการแรกของ Stable/City/PvP
- กำหนด premium shop policy
- เชื่อมกับ `28-Mount-System.md`
- เชื่อมกับ `42-PvP-System.md`
- เชื่อมกับ `41-Guild-System.md`
