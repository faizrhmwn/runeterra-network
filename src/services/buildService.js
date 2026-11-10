// Build Planner service — uses localStorage for persistence (offline-first CRUD)
const STORAGE_KEY = 'lol_builds'

// Starter meta builds for patch 16.22
const DEFAULT_BUILDS = [
  {
    id: 'build_meta_jinx',
    champion: 'Jinx',
    championId: 'Jinx',
    title: 'Patch 16.22 Lethal Hypercarry',
    role: 'ADC',
    items: ['Yun Tal Wildarrows', 'Infinity Edge', "Runaan's Hurricane", "Lord Dominik's Regards", 'Bloodthirster', "Berserker's Greaves"],
    runes: 'Lethal Tempo - Triumph - Legend: Bloodline - Coup de Grace',
    notes: 'Prioritize Yun Tal Wildarrows first for bleed crits, scale directly into Infinity Edge for massive teamfight reset DPS.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'build_meta_ahri',
    champion: 'Ahri',
    championId: 'Ahri',
    title: 'Patch 16.22 Burst & CDR Roamer',
    role: 'Mid',
    items: ['Malignance', 'Blackfire Torch', "Zhonya's Hourglass", "Rabadon's Deathcap", 'Cryptbloom', "Sorcerer's Shoes"],
    runes: 'Electrocute - Taste of Blood - Eyeball Collection - Ultimate Hunter',
    notes: 'Rush Malignance for ultimate cooldown, combo with Blackfire Torch burn tick during charm rotations.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'build_meta_aatrox',
    champion: 'Aatrox',
    championId: 'Aatrox',
    title: 'Patch 16.22 Bruiser Drain Tank',
    role: 'Top',
    items: ['Sundered Sky', 'Profane Hydra', 'Black Cleaver', "Sterak's Gage", "Death's Dance", 'Plated Steelcaps'],
    runes: 'Conqueror - Triumph - Legend: Haste - Last Stand',
    notes: 'Sundered Sky initial crit healing synergizes with Profane Hydra active for rapid waveclear and burst healing.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'build_meta_zaahen',
    champion: 'Zaahen',
    championId: 'Zaahen',
    title: 'Patch 16.22 Lethality Ambush',
    role: 'Jungle',
    items: ['Hubris', 'Opportunity', 'Voltaic Cyclosword', 'Serylda\'s Grudge', 'Edge of Night', 'Ionian Boots of Lucidity'],
    runes: 'Dark Harvest - Sudden Impact - Eyeball Collection - Relentless Hunter',
    notes: 'Stack Hubris early on ganks, utilize Opportunity movement speed burst to engage over terrain.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

function readBuilds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // populate starter builds
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BUILDS))
      return DEFAULT_BUILDS
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_BUILDS
  } catch {
    return DEFAULT_BUILDS
  }
}

function writeBuilds(builds) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds))
  } catch {
    // quota exceeded
  }
}

function generateId() {
  return `build_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

class BuildService {
  getAll() {
    return readBuilds()
  }

  getById(id) {
    return readBuilds().find((b) => b.id === id) || null
  }

  create(data) {
    const builds = readBuilds()
    const newBuild = {
      id: generateId(),
      champion: data.champion || '',
      championId: data.championId || '',
      title: data.title || 'Untitled Build',
      role: data.role || 'Mid',
      items: data.items || [],
      runes: data.runes || '',
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    builds.unshift(newBuild)
    writeBuilds(builds)
    return newBuild
  }

  update(id, data) {
    const builds = readBuilds()
    const idx = builds.findIndex((b) => b.id === id)
    if (idx === -1) throw new Error('Build not found')
    builds[idx] = {
      ...builds[idx],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
    writeBuilds(builds)
    return builds[idx]
  }

  delete(id) {
    const builds = readBuilds()
    const filtered = builds.filter((b) => b.id !== id)
    writeBuilds(filtered)
    return true
  }
}

export default new BuildService()
