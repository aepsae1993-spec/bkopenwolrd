const size = 31;
const center = Math.floor(size / 2);
const viewRadius = 10;
const isoTileWidth = 100;
const isoTileHeight = 56;
const isoHalfWidth = isoTileWidth / 2;
const isoHalfHeight = isoTileHeight / 2;

const cities = {
  north: {
    key: "north",
    name: "North City",
    short: "North",
    glyph: "N",
    color: "#6da8ff",
    owner: "rgba(109, 168, 255, 0.68)",
    start: { x: center, y: 2 },
    bonus: "เกราะเมือง +3%",
  },
  south: {
    key: "south",
    name: "South City",
    short: "South",
    glyph: "S",
    color: "#5ec77d",
    owner: "rgba(94, 199, 125, 0.68)",
    start: { x: center, y: size - 3 },
    bonus: "เก็บทรัพยากร +3%",
  },
  east: {
    key: "east",
    name: "East City",
    short: "East",
    glyph: "E",
    color: "#54c6b8",
    owner: "rgba(84, 198, 184, 0.68)",
    start: { x: size - 3, y: center },
    bonus: "ฟื้นฟู MP +3%",
  },
  west: {
    key: "west",
    name: "West City",
    short: "West",
    glyph: "W",
    color: "#d88654",
    owner: "rgba(216, 134, 84, 0.68)",
    start: { x: 2, y: center },
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

const gatherYieldByLevel = [10, 12, 15, 18, 21];
const resourceRespawnMs = 30 * 60 * 1000;
const resourceProfiles = [
  { id: "wood", name: "ไม้", icon: "🪵", tier: 1, maxQuantity: 120, yieldMultiplier: 1, terrains: ["forest", "grass"] },
  { id: "herb", name: "สมุนไพร", icon: "🌿", tier: 1, maxQuantity: 100, yieldMultiplier: 0.9, terrains: ["forest", "grass", "snow"] },
  { id: "stone", name: "หิน", icon: "🪨", tier: 1, maxQuantity: 110, yieldMultiplier: 0.85, terrains: ["mountain", "desert"] },
  { id: "hardwood", name: "ไม้แก่น", icon: "🌳", tier: 2, maxQuantity: 90, yieldMultiplier: 0.7, terrains: ["forest"] },
  { id: "iron", name: "แร่เหล็ก", icon: "⛏️", tier: 2, maxQuantity: 80, yieldMultiplier: 0.65, terrains: ["mountain", "desert"] },
  { id: "crystal", name: "คริสตัล", icon: "💠", tier: 3, maxQuantity: 60, yieldMultiplier: 0.5, terrains: ["snow", "mountain", "water"] },
];

const state = {
  homeCity: "north",
  selected: null,
  player: { x: center, y: 2 },
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
  gatherLevel: 1,
  inventory: { wood: 0, herb: 0, stone: 0, hardwood: 0, iron: 0, crystal: 0 },
  tiles: [],
};

const elements = {
  grid: document.querySelector("#worldGrid"),
  mapWrap: document.querySelector(".map-wrap"),
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
  mapMeta: document.querySelector("#mapMeta"),
  gatherInfo: document.querySelector("#gatherInfo"),
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

function worldKey(offsetX, offsetY) {
  return tileKey(center + offsetX, center + offsetY);
}

function safeCityAt(x, y) {
  return Object.values(cities).find((city) => Math.abs(city.start.x - x) <= 2 && Math.abs(city.start.y - y) <= 2);
}

function createResourceForTerrain(terrain, seed = Math.random()) {
  const candidates = resourceProfiles.filter((profile) => profile.terrains.includes(terrain));
  const profile = candidates[Math.floor(seed * candidates.length)] || resourceProfiles[0];
  const tierBonus = seed > 0.93 ? 2 : seed > 0.72 ? 1 : 0;
  const tier = Math.min(3, profile.tier + tierBonus);
  const maxQuantity = Math.round(profile.maxQuantity * (1 + (tier - profile.tier) * 0.25));
  return { ...profile, tier, maxQuantity, quantity: maxQuantity };
}

function resourceYield(node) {
  const levelIndex = Math.min(Math.max(state.gatherLevel, 1), gatherYieldByLevel.length) - 1;
  return Math.max(1, Math.round(gatherYieldByLevel[levelIndex] * node.yieldMultiplier));
}

function resourceLabel(node) {
  return `${node.name} T${node.tier} ${node.quantity}/${node.maxQuantity}`;
}

function formatRespawn(availableAt) {
  const seconds = Math.max(0, Math.ceil((availableAt - Date.now()) / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

function buildWorld() {
  const terrainCycle = ["grass", "forest", "desert", "grass", "mountain", "water", "snow"];
  const monsters = new Map([
    [worldKey(-3, -4), { name: "Rune Beast", hp: 260, anchor: worldKey(-3, -4) }],
    [worldKey(4, -3), { name: "Glass Warden", hp: 320, anchor: worldKey(4, -3) }],
    [worldKey(-5, 4), { name: "Ash Stalker", hp: 280, anchor: worldKey(-5, 4) }],
    [worldKey(5, 5), { name: "Ember Lynx", hp: 340, anchor: worldKey(5, 5) }],
  ]);
  const enemyPlayers = new Map([
    [worldKey(1, 0), { name: "Borin", city: "west", hp: 620 }],
    [worldKey(0, 1), { name: "Mira", city: "east", hp: 540, guard: true }],
  ]);

  state.tiles = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dist = distance({ x, y }, { x: center, y: center });
      const city = Object.values(cities).find((entry) => entry.start.x === x && entry.start.y === y);
      const safeCity = safeCityAt(x, y);
      const terrain = terrainCycle[(x * 3 + y * 5) % terrainCycle.length];
      let owner = null;
      let zone = "PvP";
      if (safeCity) {
        owner = safeCity.key;
        zone = "Safe City";
      } else if (dist <= 2) {
        zone = "Center War";
      }

      const resourceSeed = ((x * 17 + y * 31) % 29) / 29;
      const safeDistrictResource = Boolean(
        safeCity
        && !city
        && Math.abs(x - safeCity.start.x) === 2
        && Math.abs(y - safeCity.start.y) === 2,
      );
      const hasResource = safeDistrictResource || (!safeCity && (x * 17 + y * 31) % 23 === 0);

      state.tiles.push({
        x,
        y,
        terrain,
        owner,
        zone,
        city: city?.key || null,
        resource: hasResource ? createResourceForTerrain(safeDistrictResource ? "grass" : terrain, resourceSeed) : null,
        respawnAt: null,
        monster: monsters.get(tileKey(x, y)) || null,
        enemyPlayer: enemyPlayers.get(tileKey(x, y)) || null,
      });
    }
  }
}

function viewportBounds() {
  const span = viewRadius * 2 + 1;
  const minX = Math.min(Math.max(state.player.x - viewRadius, 0), size - span);
  const minY = Math.min(Math.max(state.player.y - viewRadius, 0), size - span);
  return { minX, minY, maxX: minX + span - 1, maxY: minY + span - 1, span };
}

function visibleTiles() {
  const bounds = viewportBounds();
  return state.tiles
    .filter((tile) => tile.x >= bounds.minX && tile.x <= bounds.maxX && tile.y >= bounds.minY && tile.y <= bounds.maxY)
    .sort((a, b) => a.y - b.y || a.x - b.x);
}

function territoryBoundary(tile) {
  if (!tile.owner) return false;
  return [
    getTile(tile.x + 1, tile.y),
    getTile(tile.x - 1, tile.y),
    getTile(tile.x, tile.y + 1),
    getTile(tile.x, tile.y - 1),
  ].some((neighbor) => !neighbor || neighbor.owner !== tile.owner);
}

function cityBoundaryEdges(tile) {
  if (!tile.owner || isPvp(tile)) return [];
  const directions = [
    { name: "north", x: 0, y: -1 },
    { name: "east", x: 1, y: 0 },
    { name: "south", x: 0, y: 1 },
    { name: "west", x: -1, y: 0 },
  ];
  return directions
    .filter((direction) => getTile(tile.x + direction.x, tile.y + direction.y)?.owner !== tile.owner)
    .map((direction) => direction.name);
}

function zoneClass(zone) {
  return zone.toLowerCase().replace(/\s+/g, "-");
}

function moveRange() {
  return mounts[state.mountIndex].range + (state.quizReady ? 1 : 0);
}

function isPvp(tile) {
  return tile.zone !== "Safe City";
}

function isoPosition(tile, bounds) {
  const localX = tile.x - bounds.minX;
  const localY = tile.y - bounds.minY;
  return {
    x: (localX - localY) * isoHalfWidth + (bounds.span - 1) * isoHalfWidth,
    y: (localX + localY) * isoHalfHeight,
    depth: (localX + localY) * 10 + localX,
  };
}

function isoElement(className) {
  const element = document.createElement("span");
  element.className = className;
  element.setAttribute("aria-hidden", "true");
  return element;
}

function createIsoScene(tile) {
  const scene = isoElement(`iso-scene ${tile.terrain}`);
  if (tile.city) {
    scene.classList.add("settlement");
    for (let index = 0; index < 3; index += 1) scene.appendChild(isoElement(`iso-house house-${index + 1}`));
    const banner = isoElement("city-banner");
    banner.textContent = cities[tile.city].glyph;
    scene.appendChild(banner);
    return scene;
  }

  // A city is deliberately a single readable district, not a random biome collage.
  if (tile.zone === "Safe City") return scene;

  if (tile.zone === "Center War") {
    scene.classList.add("world-monument");
    scene.append(isoElement("monument-spire"), isoElement("monument-ring"));
    return scene;
  }

  if (tile.terrain === "forest" || (tile.terrain === "grass" && (tile.x * 7 + tile.y) % 4 === 0)) {
    scene.classList.add("tree-grove");
    for (let index = 0; index < (tile.terrain === "forest" ? 3 : 1); index += 1) scene.appendChild(isoElement(`iso-tree tree-${index + 1}`));
  } else if (tile.terrain === "mountain" || tile.terrain === "snow") {
    scene.classList.add("peak-scene");
    scene.append(isoElement("iso-peak peak-back"), isoElement("iso-peak peak-front"));
  } else if (tile.terrain === "water") {
    scene.classList.add("water-scene");
    scene.append(isoElement("wave wave-one"), isoElement("wave wave-two"));
  } else if (tile.terrain === "desert") {
    scene.classList.add("dune-scene");
    scene.append(isoElement("dune dune-one"), isoElement("dune dune-two"));
  }
  return scene;
}

function renderGrid() {
  elements.grid.innerHTML = "";
  const bounds = viewportBounds();
  elements.grid.style.width = `${bounds.span * isoTileWidth}px`;
  elements.grid.style.height = `${bounds.span * isoTileHeight + isoTileHeight}px`;
  const range = moveRange();
  for (const tile of visibleTiles()) {
    const button = document.createElement("button");
    const position = isoPosition(tile, bounds);
    const cityEdges = cityBoundaryEdges(tile);
    button.className = `tile ${tile.terrain} ${zoneClass(tile.zone)} ${isPvp(tile) ? "pvp-zone" : "safe-zone"} ${tile.owner ? `owner-${tile.owner}` : "owner-neutral"}`;
    button.type = "button";
    button.dataset.x = tile.x;
    button.dataset.y = tile.y;
    button.style.setProperty("--iso-x", `${position.x}px`);
    button.style.setProperty("--iso-y", `${position.y}px`);
    button.style.zIndex = String(position.depth);
    button.setAttribute("aria-label", `ช่อง ${tile.x},${tile.y}`);

    if (tile.zone === "Center War") button.classList.add("center");
    if (territoryBoundary(tile) && isPvp(tile)) button.classList.add("territory-boundary");
    if (cityEdges.length) button.classList.add("city-boundary");
    if (state.selected && state.selected.x === tile.x && state.selected.y === tile.y) button.classList.add("selected");
    if (distance(state.player, tile) <= range && distance(state.player, tile) > 0) {
      button.classList.add(state.quizReady ? "quiz-reachable" : "reachable");
    }

    button.append(isoElement("iso-side"), isoElement("tile-rim"), isoElement("iso-floor"), createIsoScene(tile));
    for (const edge of cityEdges) button.appendChild(isoElement(`zone-edge edge-${edge}`));

    if (tile.resource) button.appendChild(unit(tile.resource.icon, `resource tier-${tile.resource.tier}`));
    if (tile.monster) button.appendChild(unit("☠", "monster"));
    if (tile.enemyPlayer) button.appendChild(characterModel(tile.enemyPlayer.guard ? "guard" : "enemy", tile.enemyPlayer.name));
    if (tile.x === state.player.x && tile.y === state.player.y) button.appendChild(characterModel("player", "Arin"));

    button.addEventListener("click", () => selectTile(tile));
    elements.grid.appendChild(button);
  }

  requestAnimationFrame(() => {
    const mapWrap = elements.grid.parentElement;
    if (!mapWrap) return;
    const playerPosition = isoPosition(state.player, bounds);
    mapWrap.scrollLeft = playerPosition.x - mapWrap.clientWidth / 2 + isoTileWidth / 2;
    mapWrap.scrollTop = playerPosition.y - mapWrap.clientHeight / 2 + isoTileHeight / 2;

    // Absolute isometric tiles create an uneven scroll footprint. Correct against
    // the rendered player tile so the camera stays useful at the map edges.
    const playerTile = elements.grid.querySelector(`[data-x="${state.player.x}"][data-y="${state.player.y}"]`);
    if (!playerTile) return;
    const wrapRect = mapWrap.getBoundingClientRect();
    const playerRect = playerTile.getBoundingClientRect();
    mapWrap.scrollLeft += playerRect.left + playerRect.width / 2 - (wrapRect.left + wrapRect.width / 2);
    mapWrap.scrollTop += playerRect.top + playerRect.height / 2 - (wrapRect.top + wrapRect.height * 0.42);
  });
}

function characterModel(kind, name) {
  const model = document.createElement("span");
  const weapon = document.createElement("i");
  const shadow = document.createElement("b");
  const marker = document.createElement("span");
  model.className = `character-model ${kind}`;
  model.setAttribute("role", "img");
  model.setAttribute("aria-label", name);
  marker.className = `presence-marker ${kind}`;
  marker.setAttribute("aria-hidden", "true");
  if (kind === "player") {
    const sprite = document.createElement("img");
    sprite.className = "character-sprite";
    sprite.src = "assets/mage-arin.png";
    sprite.alt = "";
    model.append(sprite);
  }
  model.append(weapon, shadow, marker);
  return model;
}

function setupMapPan() {
  const mapWrap = elements.mapWrap;
  const drag = { active: false, moved: false, pointerId: null, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 };

  mapWrap.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.active = true;
    drag.moved = false;
    drag.pointerId = event.pointerId;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.scrollLeft = mapWrap.scrollLeft;
    drag.scrollTop = mapWrap.scrollTop;
    mapWrap.setPointerCapture(event.pointerId);
    mapWrap.classList.add("is-dragging");
  });

  mapWrap.addEventListener("pointermove", (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) drag.moved = true;
    mapWrap.scrollLeft = drag.scrollLeft - deltaX;
    mapWrap.scrollTop = drag.scrollTop - deltaY;
    if (drag.moved) event.preventDefault();
  });

  const endDrag = (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    if (mapWrap.hasPointerCapture(event.pointerId)) mapWrap.releasePointerCapture(event.pointerId);
    mapWrap.classList.remove("is-dragging");
    drag.active = false;
    drag.pointerId = null;
  };

  mapWrap.addEventListener("pointerup", endDrag);
  mapWrap.addEventListener("pointercancel", endDrag);
  mapWrap.addEventListener("click", (event) => {
    if (!drag.moved) return;
    drag.moved = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
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
    tile.resource ? resourceLabel(tile.resource) : tile.respawnAt ? `กำลังฟื้นตัว ${formatRespawn(tile.respawnAt)}` : null,
    tile.monster?.name,
    tile.enemyPlayer ? `${tile.enemyPlayer.name}${tile.enemyPlayer.guard ? " (Offline Guard)" : ""}` : null,
  ].filter(Boolean);
  const range = moveRange();
  const dist = distance(state.player, tile);
  const canMove = dist > 0 && dist <= range && state.energy >= 1 && tile.terrain !== "water";
  const canGather = Boolean(tile.resource) && dist === 0;
  const canAttack = Boolean(tile.monster || tile.enemyPlayer) && dist <= 1;
  const canClaim = dist === 0 && !tile.city && !tile.owner && !tile.enemyPlayer && !tile.resource && isPvp(tile);

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
  elements.mapMeta.textContent = `World ${size}x${size} | View ${viewRadius * 2 + 1}x${viewRadius * 2 + 1}`;
  elements.gatherInfo.textContent = `เก็บเกี่ยว Lv.${state.gatherLevel} | ไม้ ${gatherYieldByLevel[state.gatherLevel - 1]}/นาที`;
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
    inventory: [
      `🪵 ไม้ x${state.inventory.wood}`,
      `🌿 สมุนไพร x${state.inventory.herb}`,
      `🪨 หิน x${state.inventory.stone}`,
      `⛏️ แร่เหล็ก x${state.inventory.iron}`,
      `💠 คริสตัล x${state.inventory.crystal}`,
      "▣ Claim Core x1",
    ],
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
    const chooseButton = card.querySelector("button");
    chooseButton.dataset.city = city.key;
    chooseButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      chooseCity(event.currentTarget.dataset.city);
    });
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
  const node = tile.resource;
  const amount = Math.min(resourceYield(node), node.quantity);
  state.inventory[node.id] += amount;
  node.quantity -= amount;
  logEvent(`เก็บ ${node.name} +${amount} (รอบเก็บ 1 นาที)`);
  if (node.quantity <= 0) {
    tile.resource = null;
    tile.respawnAt = Date.now() + resourceRespawnMs;
    logEvent(`${node.name} หมดแล้ว: ช่องนี้ว่างและยึดได้, สุ่มเกิดใหม่ใน 30 นาที`);
  }
  renderAll();
  renderQuickPanel("inventory");
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
  const now = Date.now();
  let respawned = false;
  for (const tile of state.tiles) {
    if (tile.respawnAt && now >= tile.respawnAt) {
      tile.resource = createResourceForTerrain(tile.terrain);
      tile.respawnAt = null;
      logEvent(`${tile.resource.name} T${tile.resource.tier} เกิดใหม่ที่ ${tile.x}, ${tile.y}`);
      respawned = true;
    }
  }
  if (state.combatLock > 0) {
    state.combatLock -= 1;
    renderHud();
  }
  if (respawned) {
    renderAll();
    renderQuickPanel("inventory");
  } else if (state.selected?.respawnAt) {
    renderTilePanel();
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

setupMapPan();
buildWorld();
renderCityDialog();
state.selected = getTile(state.player.x, state.player.y);
renderAll();
renderQuickPanel();
logEvent("เข้าสู่โลก EduQuest Online Prototype");
logEvent("เลือกช่องบนแผนที่เพื่อเดิน เก็บทรัพยากร โจมตี หรือยึดพื้นที่");
setTimeout(() => elements.cityDialog.showModal(), 450);
setInterval(tick, 1000);
