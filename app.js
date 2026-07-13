const size = 17;
const center = 8;

const cities = {
  north: {
    key: "north",
    name: "North City",
    short: "North",
    glyph: "N",
    color: "#6da8ff",
    owner: "rgba(109, 168, 255, 0.68)",
    start: { x: 8, y: 1 },
    bonus: "เกราะเมือง +3%",
  },
  south: {
    key: "south",
    name: "South City",
    short: "South",
    glyph: "S",
    color: "#5ec77d",
    owner: "rgba(94, 199, 125, 0.68)",
    start: { x: 8, y: 15 },
    bonus: "เก็บทรัพยากร +3%",
  },
  east: {
    key: "east",
    name: "East City",
    short: "East",
    glyph: "E",
    color: "#54c6b8",
    owner: "rgba(84, 198, 184, 0.68)",
    start: { x: 15, y: 8 },
    bonus: "ฟื้นฟู MP +3%",
  },
  west: {
    key: "west",
    name: "West City",
    short: "West",
    glyph: "W",
    color: "#d88654",
    owner: "rgba(216, 134, 84, 0.68)",
    start: { x: 1, y: 8 },
    bonus: "โจมตี claim core +3%",
  },
};

const mounts = [
  { name: "เดินเท้า", range: 1 },
  { name: "ม้า", range: 2 },
  { name: "กริฟฟิน", range: 3 },
  { name: "มังกร", range: 5 },
];

const terrainGlyphs = {
  grass: "🌿",
  forest: "🌲",
  desert: "🏜️",
  mountain: "⛰️",
  water: "🌊",
  snow: "❄️",
};

const state = {
  homeCity: "north",
  selected: null,
  player: { x: 8, y: 1 },
  energy: 12,
  maxEnergy: 12,
  hp: 820,
  mp: 440,
  gold: 1280,
  blood: 7,
  quizReady: false,
  mountIndex: 1,
  combatLock: 0,
  offlineGuard: true,
  tiles: [],
};

const elements = {
  grid: document.querySelector("#worldGrid"),
  eventLog: document.querySelector("#eventLog"),
  tileName: document.querySelector("#tileName"),
  tileOwner: document.querySelector("#tileOwner"),
  tileZone: document.querySelector("#tileZone"),
  tileContent: document.querySelector("#tileContent"),
  tileRisk: document.querySelector("#tileRisk"),
  moveAction: document.querySelector("#moveAction"),
  gatherAction: document.querySelector("#gatherAction"),
  attackAction: document.querySelector("#attackAction"),
  claimAction: document.querySelector("#claimAction"),
  energyText: document.querySelector("#energyText"),
  energyFill: document.querySelector("#energyFill"),
  positionText: document.querySelector("#positionText"),
  homeCityBadge: document.querySelector("#homeCityBadge"),
  combatLockRing: document.querySelector("#combatLockRing"),
  combatState: document.querySelector("#combatState"),
  combatHint: document.querySelector("#combatHint"),
  goldText: document.querySelector("#goldText"),
  bloodText: document.querySelector("#bloodText"),
  quizButton: document.querySelector("#quizButton"),
  mountButton: document.querySelector("#mountButton"),
  mountText: document.querySelector("#mountText"),
  cityDialog: document.querySelector("#cityDialog"),
  cityGrid: document.querySelector("#cityGrid"),
  logoutDialog: document.querySelector("#logoutDialog"),
  logoutButton: document.querySelector("#logoutButton"),
  offlineGuardToggle: document.querySelector("#offlineGuardToggle"),
  quickPanel: document.querySelector("#quickPanel"),
};

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function tileKey(x, y) {
  return `${x},${y}`;
}

function getTile(x, y) {
  return state.tiles.find((tile) => tile.x === x && tile.y === y);
}

function buildWorld() {
  const terrainCycle = ["grass", "forest", "desert", "grass", "mountain", "water", "snow"];
  const specialResources = new Map([
    ["6,5", "แร่อักษร"],
    ["11,5", "คริสตัลความรู้"],
    ["5,11", "ไม้เวท"],
    ["12,12", "เหล็กดาว"],
  ]);
  const monsters = new Map([
    ["7,6", { name: "Rune Beast", hp: 260, anchor: "7,6" }],
    ["10,7", { name: "Glass Warden", hp: 320, anchor: "10,7" }],
    ["6,10", { name: "Ash Stalker", hp: 280, anchor: "6,10" }],
  ]);
  const enemyPlayers = new Map([
    ["9,8", { name: "Borin", city: "west", hp: 620 }],
    ["8,9", { name: "Mira", city: "east", hp: 540, guard: true }],
  ]);

  state.tiles = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dist = distance({ x, y }, { x: center, y: center });
      const city = Object.values(cities).find((entry) => entry.start.x === x && entry.start.y === y);
      const terrain = terrainCycle[(x * 3 + y * 5) % terrainCycle.length];
      let owner = null;
      let zone = "Neutral";
      if (city) {
        owner = city.key;
        zone = "Safe City";
      } else if (dist <= 2) {
        zone = "Center War";
      } else if (dist <= 4) {
        zone = "Contested";
      } else if (y <= 3 && Math.abs(x - center) <= 3) {
        owner = "north";
        zone = "Starter Farm";
      } else if (y >= 13 && Math.abs(x - center) <= 3) {
        owner = "south";
        zone = "Starter Farm";
      } else if (x >= 13 && Math.abs(y - center) <= 3) {
        owner = "east";
        zone = "Starter Farm";
      } else if (x <= 3 && Math.abs(y - center) <= 3) {
        owner = "west";
        zone = "Starter Farm";
      } else if (dist <= 6) {
        zone = "Frontier";
      }

      state.tiles.push({
        x,
        y,
        terrain,
        owner,
        zone,
        city: city?.key || null,
        resource: specialResources.get(tileKey(x, y)) || null,
        monster: monsters.get(tileKey(x, y)) || null,
        enemyPlayer: enemyPlayers.get(tileKey(x, y)) || null,
      });
    }
  }
}

function moveRange() {
  return mounts[state.mountIndex].range + (state.quizReady ? 1 : 0);
}

function isPvp(tile) {
  return ["Contested", "Center War", "Frontier"].includes(tile.zone);
}

function renderGrid() {
  elements.grid.innerHTML = "";
  const range = moveRange();
  for (const tile of state.tiles) {
    const button = document.createElement("button");
    button.className = `tile ${tile.terrain}`;
    button.type = "button";
    button.dataset.x = tile.x;
    button.dataset.y = tile.y;
    button.style.setProperty("--owner", tile.owner ? cities[tile.owner].owner : "transparent");
    button.setAttribute("aria-label", `ช่อง ${tile.x},${tile.y}`);

    if (tile.zone === "Center War") button.classList.add("center");
    if (state.selected && state.selected.x === tile.x && state.selected.y === tile.y) button.classList.add("selected");
    if (distance(state.player, tile) <= range && distance(state.player, tile) > 0) {
      button.classList.add(state.quizReady ? "quiz-reachable" : "reachable");
    }

    const glyph = document.createElement("span");
    glyph.className = "glyph";
    if (tile.city) {
      glyph.classList.add("city-glyph");
      glyph.dataset.label = cities[tile.city].glyph;
      glyph.textContent = "🏰";
    } else if (tile.zone === "Center War") {
      glyph.classList.add("center-glyph");
      glyph.textContent = "✦";
    } else {
      glyph.classList.add("terrain-glyph");
      glyph.textContent = terrainGlyphs[tile.terrain] || "·";
    }
    button.appendChild(glyph);

    if (tile.resource) button.appendChild(unit("💎", "resource"));
    if (tile.monster) button.appendChild(unit("☠", "monster"));
    if (tile.enemyPlayer) button.appendChild(unit(tile.enemyPlayer.guard ? "🛡" : "⚔", tile.enemyPlayer.guard ? "guard" : "enemy-player"));
    if (tile.x === state.player.x && tile.y === state.player.y) button.appendChild(unit("★", "player"));

    button.addEventListener("click", () => selectTile(tile));
    elements.grid.appendChild(button);
  }
}

function unit(label, className) {
  const span = document.createElement("span");
  span.className = `unit ${className}`;
  span.textContent = label;
  return span;
}

function selectTile(tile) {
  state.selected = tile;
  renderAll();
}

function renderTilePanel() {
  const tile = state.selected || getTile(state.player.x, state.player.y);
  const owner = tile.owner ? cities[tile.owner].name : "ไม่มีเจ้าของ";
  const content = [
    tile.city ? "เมืองเกิด" : null,
    tile.resource,
    tile.monster?.name,
    tile.enemyPlayer ? `${tile.enemyPlayer.name}${tile.enemyPlayer.guard ? " (Offline Guard)" : ""}` : null,
  ].filter(Boolean);
  const range = moveRange();
  const dist = distance(state.player, tile);
  const canMove = dist > 0 && dist <= range && state.energy >= 1 && tile.terrain !== "water";
  const canGather = Boolean(tile.resource) && dist === 0;
  const canAttack = Boolean(tile.monster || tile.enemyPlayer) && dist <= 1;
  const canClaim = dist === 0 && !tile.city && tile.owner !== state.homeCity && !tile.enemyPlayer && isPvp(tile);

  elements.tileName.textContent = `${tile.x}, ${tile.y} - ${tile.terrain}`;
  elements.tileOwner.textContent = owner;
  elements.tileZone.textContent = tile.zone;
  elements.tileContent.textContent = content.length ? content.join(", ") : "พื้นที่ว่าง";
  elements.tileRisk.textContent = isPvp(tile) ? "PvP เปิด / มีโอกาสเสียทรัพยากร" : "ปลอดภัย";
  elements.moveAction.disabled = !canMove;
  elements.gatherAction.disabled = !canGather;
  elements.attackAction.disabled = !canAttack;
  elements.claimAction.disabled = !canClaim;
}

function renderHud() {
  const city = cities[state.homeCity];
  elements.energyText.textContent = `${state.energy}/${state.maxEnergy}`;
  elements.energyFill.style.setProperty("--value", `${(state.energy / state.maxEnergy) * 100}%`);
  elements.positionText.textContent = `ตำแหน่ง ${state.player.x}, ${state.player.y}`;
  elements.homeCityBadge.textContent = city.short;
  elements.homeCityBadge.className = `city-badge ${city.key}`;
  elements.goldText.textContent = state.gold.toLocaleString("th-TH");
  elements.bloodText.textContent = state.blood.toLocaleString("th-TH");
  elements.mountText.textContent = `${mounts[state.mountIndex].name} +${mounts[state.mountIndex].range}`;
  elements.quizButton.classList.toggle("active", state.quizReady);
  elements.offlineGuardToggle.checked = state.offlineGuard;

  if (state.combatLock > 0) {
    elements.combatLockRing.textContent = state.combatLock;
    elements.combatState.textContent = "ติด Combat Lock";
    elements.combatHint.textContent = "ยังออกแบบ Safe Logout ไม่ได้ และขึ้นสัตว์ขี่ไม่ได้";
  } else {
    elements.combatLockRing.textContent = "0";
    elements.combatState.textContent = "ปลอดภัย";
    elements.combatHint.textContent = "ยังสามารถ Safe Logout และขึ้นสัตว์ขี่ได้";
  }
}

function renderQuickPanel(mode = "inventory") {
  const data = {
    inventory: ["◆ แร่อักษร x4", "◇ ไม้เวท x2", "◌ ยาฟื้น HP x3", "▣ Claim Core x1"],
    mount: mounts.map((mount, index) => `${index === state.mountIndex ? "✓" : "○"} ${mount.name} เดิน ${mount.range}`),
    pet: ["Chrono Seraph", "Crystal Fox", "Rune Sprite"],
    craft: ["ดาบฝึกหัด", "เกราะหนัง", "เครื่องมือขุด", "ธงยึดพื้นที่"],
  };
  elements.quickPanel.innerHTML = "";
  for (const item of data[mode]) {
    const pill = document.createElement("span");
    pill.className = "item-pill";
    pill.textContent = item;
    elements.quickPanel.appendChild(pill);
  }
}

function renderCityDialog() {
  elements.cityGrid.innerHTML = "";
  Object.values(cities).forEach((city) => {
    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `
      <div class="city-sigil" style="color:${city.color}; border:1px solid ${city.color}55">${city.glyph}</div>
      <strong>${city.name}</strong>
      <span>${city.bonus}</span>
      <button type="button">เลือกเมืองนี้</button>
    `;
    card.querySelector("button").addEventListener("click", () => chooseCity(city.key));
    elements.cityGrid.appendChild(card);
  });
}

function renderAll() {
  renderGrid();
  renderTilePanel();
  renderHud();
}

function logEvent(message) {
  const line = document.createElement("p");
  line.textContent = message;
  elements.eventLog.prepend(line);
  while (elements.eventLog.children.length > 8) {
    elements.eventLog.lastElementChild.remove();
  }
}

function chooseCity(key) {
  const city = cities[key];
  state.homeCity = key;
  state.player = { ...city.start };
  state.selected = getTile(city.start.x, city.start.y);
  state.energy = state.maxEnergy;
  elements.cityDialog.close();
  logEvent(`เริ่มต้นที่ ${city.name}: ${city.bonus}`);
  renderAll();
}

function doMove() {
  const tile = state.selected;
  if (!tile || elements.moveAction.disabled) return;
  state.player = { x: tile.x, y: tile.y };
  state.energy = Math.max(0, state.energy - 1);
  state.quizReady = false;
  logEvent(`เดินไปช่อง ${tile.x}, ${tile.y} ใช้ Energy 1`);
  renderAll();
}

function doGather() {
  const tile = getTile(state.player.x, state.player.y);
  if (!tile.resource) return;
  state.gold += 35;
  logEvent(`เก็บ ${tile.resource} ได้ทอง +35`);
  tile.resource = null;
  renderAll();
}

function doAttack() {
  const tile = state.selected;
  if (!tile || elements.attackAction.disabled) return;
  state.combatLock = 20;
  if (tile.monster) {
    tile.monster.hp -= 170;
    logEvent(`โจมตี ${tile.monster.name} และติด Combat Lock 20 วินาที`);
    if (tile.monster.hp <= 0) {
      state.gold += 120;
      logEvent(`${tile.monster.name} ถูกกำจัด ได้ทอง +120`);
      tile.monster = null;
    }
  } else if (tile.enemyPlayer) {
    tile.enemyPlayer.hp -= 210;
    logEvent(`ปะทะ ${tile.enemyPlayer.name} แบบ PvP คูลดาวเริ่มทำงาน`);
    if (tile.enemyPlayer.hp <= 0) {
      state.blood += 2;
      logEvent(`${tile.enemyPlayer.name} แพ้ กลับเมืองเกิด ได้หยดเลือด +2`);
      tile.enemyPlayer = null;
    }
  }
  renderAll();
}

function doClaim() {
  const tile = getTile(state.player.x, state.player.y);
  if (elements.claimAction.disabled) return;
  tile.owner = state.homeCity;
  state.gold += 50;
  logEvent(`ยึดช่อง ${tile.x}, ${tile.y} ให้ ${cities[state.homeCity].name} สำเร็จ`);
  renderAll();
}

function tick() {
  if (state.combatLock > 0) {
    state.combatLock -= 1;
    renderHud();
  }
}

elements.moveAction.addEventListener("click", doMove);
elements.gatherAction.addEventListener("click", doGather);
elements.attackAction.addEventListener("click", doAttack);
elements.claimAction.addEventListener("click", doClaim);
elements.quizButton.addEventListener("click", () => {
  state.quizReady = !state.quizReady;
  logEvent(state.quizReady ? "ตอบคำถามถูก: เดินได้ไกลขึ้น 1 ช่องใน action ถัดไป" : "ปิดโบนัส Quiz Move");
  renderAll();
});
elements.mountButton.addEventListener("click", () => {
  if (state.combatLock > 0) {
    logEvent("ติด Combat Lock: ยังสลับสัตว์ขี่ไม่ได้");
    return;
  }
  state.mountIndex = (state.mountIndex + 1) % mounts.length;
  logEvent(`สลับเป็น ${mounts[state.mountIndex].name}`);
  renderAll();
  renderQuickPanel("mount");
});
elements.logoutButton.addEventListener("click", () => elements.logoutDialog.showModal());
elements.offlineGuardToggle.addEventListener("change", (event) => {
  state.offlineGuard = event.target.checked;
  logEvent(state.offlineGuard ? "เปิด Offline Guard" : "ปิด Offline Guard");
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach((entry) => entry.classList.remove("active"));
    button.classList.add("active");
    renderQuickPanel(button.id.replace("Tab", ""));
  });
});

buildWorld();
renderCityDialog();
state.selected = getTile(state.player.x, state.player.y);
renderAll();
renderQuickPanel();
logEvent("เข้าสู่โลก EduQuest Online Prototype");
logEvent("เลือกช่องบนแผนที่เพื่อเดิน เก็บทรัพยากร โจมตี หรือยึดพื้นที่");
setTimeout(() => elements.cityDialog.showModal(), 450);
setInterval(tick, 1000);
