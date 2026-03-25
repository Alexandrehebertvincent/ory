// ============================================================================
// Génère une visualisation HTML de la carte du monde
// ============================================================================
// Usage : npx tsx scripts/buildMapPreview.ts && open data/map-preview.html
//
// Convertit les 291K tuiles en une image pixel encodée en base64 +
// un viewer HTML interactif avec zoom/pan et légende.
// ============================================================================

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface TileData {
	coord: { lat: number; lng: number }
	terrain: string
	elevation: number
	nationId: string | null
	settlementId: string | null
}

interface MapFile {
	bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }
	tiles: TileData[]
}

// Couleurs terrain
const TERRAIN_COLORS: Record<string, [number, number, number]> = {
	ocean: [30, 60, 120],
	sea: [50, 90, 160],
	ice: [220, 235, 250],
	tundra: [180, 195, 175],
	steppe: [195, 190, 140],
	plain: [140, 180, 90],
	forest: [50, 120, 50],
	dense_forest: [30, 90, 30],
	jungle: [20, 100, 40],
	hill: [160, 145, 100],
	mountain: [130, 115, 90],
	desert: [210, 190, 140],
	swamp: [80, 110, 70],
	coast: [100, 160, 180],
	lake: [70, 120, 170],
	river: [60, 110, 180],
}

// Couleurs nations (hash → HSL)
function nationColor(id: string): [number, number, number] {
	let hash = 0
	for (let i = 0; i < id.length; i++) {
		hash = id.charCodeAt(i) + ((hash << 5) - hash)
	}
	const h = Math.abs(hash) % 360
	const s = 50 + (Math.abs(hash >> 8) % 30)
	const l = 40 + (Math.abs(hash >> 16) % 25)
	// HSL to RGB
	const c = (1 - Math.abs((2 * l) / 100 - 1)) * (s / 100)
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l / 100 - c / 2
	let r = 0,
		g = 0,
		b = 0
	if (h < 60) {
		r = c
		g = x
	} else if (h < 120) {
		r = x
		g = c
	} else if (h < 180) {
		g = c
		b = x
	} else if (h < 240) {
		g = x
		b = c
	} else if (h < 300) {
		r = x
		b = c
	} else {
		r = c
		b = x
	}
	return [
		Math.round((r + m) * 255),
		Math.round((g + m) * 255),
		Math.round((b + m) * 255),
	]
}

// Encode un tableau de pixels RGBA en BMP base64 (pas besoin de lib externe)
function createBMPBase64(
	width: number,
	height: number,
	pixels: Uint8Array,
): string {
	const rowSize = Math.ceil((width * 3) / 4) * 4
	const imageSize = rowSize * height
	const fileSize = 54 + imageSize

	const buf = Buffer.alloc(fileSize)

	// BMP Header
	buf.write('BM', 0)
	buf.writeUInt32LE(fileSize, 2)
	buf.writeUInt32LE(54, 10) // offset to data

	// DIB Header (BITMAPINFOHEADER)
	buf.writeUInt32LE(40, 14)
	buf.writeInt32LE(width, 18)
	buf.writeInt32LE(-height, 22) // top-down
	buf.writeUInt16LE(1, 26) // planes
	buf.writeUInt16LE(24, 28) // bpp
	buf.writeUInt32LE(0, 30) // no compression
	buf.writeUInt32LE(imageSize, 34)

	// Pixel data (BGR)
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const srcIdx = (y * width + x) * 4
			const dstIdx = 54 + y * rowSize + x * 3
			buf[dstIdx] = pixels[srcIdx + 2] // B
			buf[dstIdx + 1] = pixels[srcIdx + 1] // G
			buf[dstIdx + 2] = pixels[srcIdx] // R
		}
	}

	return buf.toString('base64')
}

function main() {
	console.log('Chargement des tuiles...')
	const mapPath = resolve(
		__dirname,
		'../packages/historical-data/src/seed/mapTiles.generated.json',
	)
	const mapData = JSON.parse(readFileSync(mapPath, 'utf8')) as MapFile

	// Projection equirectangulaire → pixels
	// ~1px par 0.5° donne ~720×280, mais on veut plus de détail
	// ~1px par 0.25° → 1440×560
	const pxPerDeg = 4 // ~1440×560
	const { minLat, maxLat, minLng, maxLng } = mapData.bounds
	const width = Math.ceil((maxLng - minLng) * pxPerDeg)
	const height = Math.ceil((maxLat - minLat) * pxPerDeg)

	console.log(`Image: ${width}×${height} pixels`)

	// Créer les pixels (RGBA)
	const terrainPixels = new Uint8Array(width * height * 4).fill(0)
	const nationPixels = new Uint8Array(width * height * 4).fill(0)
	const elevPixels = new Uint8Array(width * height * 4).fill(0)

	// Fond océan profond
	for (let i = 0; i < width * height; i++) {
		const [r, g, b] = TERRAIN_COLORS.ocean
		terrainPixels[i * 4] = r
		terrainPixels[i * 4 + 1] = g
		terrainPixels[i * 4 + 2] = b
		terrainPixels[i * 4 + 3] = 255

		nationPixels[i * 4] = 20
		nationPixels[i * 4 + 1] = 30
		nationPixels[i * 4 + 2] = 60
		nationPixels[i * 4 + 3] = 255

		// Élévation : bleu profond par défaut
		elevPixels[i * 4] = 10
		elevPixels[i * 4 + 1] = 20
		elevPixels[i * 4 + 2] = 80
		elevPixels[i * 4 + 3] = 255
	}

	console.log('Projection des tuiles...')

	// Stats settlements pour la couche nations
	const settlementCoords: Array<{ x: number; y: number; name: string }> = []

	for (const tile of mapData.tiles) {
		const px = Math.round((tile.coord.lng - minLng) * pxPerDeg)
		const py = Math.round((maxLat - tile.coord.lat) * pxPerDeg) // Y inversé
		if (px < 0 || px >= width || py < 0 || py >= height) continue

		const idx = (py * width + px) * 4

		// --- Terrain layer ---
		const tc = TERRAIN_COLORS[tile.terrain] ?? [128, 128, 128]
		terrainPixels[idx] = tc[0]
		terrainPixels[idx + 1] = tc[1]
		terrainPixels[idx + 2] = tc[2]

		// --- Nation layer ---
		if (tile.nationId) {
			const nc = nationColor(tile.nationId)
			nationPixels[idx] = nc[0]
			nationPixels[idx + 1] = nc[1]
			nationPixels[idx + 2] = nc[2]
		} else if (tile.terrain !== 'ocean' && tile.terrain !== 'sea') {
			// Terre sans nation → gris
			nationPixels[idx] = 80
			nationPixels[idx + 1] = 80
			nationPixels[idx + 2] = 80
		}

		// --- Elevation layer ---
		if (tile.elevation > 0) {
			// Terre : vert foncé (0m) → brun (1000m) → blanc (5000m+)
			const t = Math.min(1, tile.elevation / 5000)
			if (t < 0.2) {
				elevPixels[idx] = 30 + Math.round(t * 5 * 80)
				elevPixels[idx + 1] = 120 - Math.round(t * 5 * 30)
				elevPixels[idx + 2] = 30
			} else if (t < 0.6) {
				const t2 = (t - 0.2) / 0.4
				elevPixels[idx] = 110 + Math.round(t2 * 60)
				elevPixels[idx + 1] = 90 + Math.round(t2 * 30)
				elevPixels[idx + 2] = 30 + Math.round(t2 * 50)
			} else {
				const t2 = (t - 0.6) / 0.4
				elevPixels[idx] = 170 + Math.round(t2 * 85)
				elevPixels[idx + 1] = 120 + Math.round(t2 * 135)
				elevPixels[idx + 2] = 80 + Math.round(t2 * 175)
			}
		} else {
			// Océan : gradient bleu
			const d = Math.min(1, Math.abs(tile.elevation) / 6000)
			elevPixels[idx] = Math.round(50 * (1 - d))
			elevPixels[idx + 1] = Math.round(100 * (1 - d) + 20)
			elevPixels[idx + 2] = Math.round(180 - d * 100)
		}

		if (tile.settlementId) {
			settlementCoords.push({
				x: px,
				y: py,
				name: tile.settlementId.replace('set_', ''),
			})
		}
	}

	// Dessiner les settlements comme des points blancs brillants
	for (const s of settlementCoords) {
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				const px = s.x + dx
				const py = s.y + dy
				if (px < 0 || px >= width || py < 0 || py >= height) continue
				const idx = (py * width + px) * 4
				// Point blanc sur toutes les couches
				terrainPixels[idx] = nationPixels[idx] = elevPixels[idx] = 255
				terrainPixels[idx + 1] =
					nationPixels[idx + 1] =
					elevPixels[idx + 1] =
						255
				terrainPixels[idx + 2] =
					nationPixels[idx + 2] =
					elevPixels[idx + 2] =
						255
			}
		}
	}

	console.log('Encodage BMP...')
	const terrainBmp = createBMPBase64(width, height, terrainPixels)
	const nationBmp = createBMPBase64(width, height, nationPixels)
	const elevBmp = createBMPBase64(width, height, elevPixels)

	console.log('Génération HTML...')

	const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>ORY — Carte du monde (An 1000)</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #111;
  color: #eee;
  font-family: 'Segoe UI', system-ui, sans-serif;
  overflow: hidden;
  height: 100vh;
}
#header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(0,0,0,0.85);
  padding: 10px 20px;
  display: flex; align-items: center; gap: 20px;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #333;
}
#header h1 { font-size: 18px; font-weight: 600; color: #d4a857; }
#header .stats { font-size: 13px; color: #888; }
.layer-btn {
  padding: 6px 14px;
  border: 1px solid #555;
  background: #222;
  color: #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.layer-btn.active { background: #d4a857; color: #111; border-color: #d4a857; }
.layer-btn:hover { border-color: #999; }
#legend {
  position: fixed; bottom: 20px; left: 20px; z-index: 100;
  background: rgba(0,0,0,0.85);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #333;
  font-size: 12px;
  max-height: 50vh;
  overflow-y: auto;
}
#legend h3 { color: #d4a857; margin-bottom: 8px; font-size: 13px; }
.legend-item { display: flex; align-items: center; gap: 8px; margin: 3px 0; }
.legend-swatch { width: 16px; height: 12px; border-radius: 2px; flex-shrink: 0; }
#info {
  position: fixed; bottom: 20px; right: 20px; z-index: 100;
  background: rgba(0,0,0,0.85);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #333;
  font-size: 12px;
}
#canvas-container {
  margin-top: 48px;
  width: 100%; height: calc(100vh - 48px);
  overflow: hidden;
  cursor: grab;
}
#canvas-container:active { cursor: grabbing; }
#map-img {
  image-rendering: pixelated;
  transform-origin: 0 0;
  position: absolute;
}
</style>
</head>
<body>

<div id="header">
  <h1>ORY — An 1000</h1>
  <span class="stats">${mapData.tiles.length.toLocaleString()} tuiles hex · 25km</span>
  <button class="layer-btn active" onclick="setLayer('terrain')">Terrain</button>
  <button class="layer-btn" onclick="setLayer('nation')">Nations</button>
  <button class="layer-btn" onclick="setLayer('elevation')">Élévation</button>
</div>

<div id="canvas-container">
  <img id="map-img" />
</div>

<div id="legend"></div>
<div id="info">Scroll = zoom · Clic-glisser = déplacer</div>

<script>
const layers = {
  terrain: 'data:image/bmp;base64,${terrainBmp}',
  nation: 'data:image/bmp;base64,${nationBmp}',
  elevation: 'data:image/bmp;base64,${elevBmp}',
};

const legends = {
  terrain: [
    ['#1e3c78','Océan'],['#325aa0','Mer'],['#dcebfa','Glace'],
    ['#b4c3af','Toundra'],['#c3be8c','Steppe'],['#8cb45a','Plaine'],
    ['#327832','Forêt'],['#146428','Jungle'],['#a09164','Colline'],
    ['#82735a','Montagne'],['#d2be8c','Désert'],
  ],
  nation: [['#fff','Point = settlement'],['#505050','Terre sans nation'],['(couleurs)','Chaque nation = 1 couleur']],
  elevation: [['#1e7832','0m (côte)'],['#aa7850','1000m'],['#fff','5000m+'],['#1464b4','Océan (-6000m)']],
};

let currentLayer = 'terrain';
let scale = 1.5;
let panX = 0, panY = 0;
let isDragging = false;
let lastX, lastY;

const img = document.getElementById('map-img');
const container = document.getElementById('canvas-container');

function setLayer(name) {
  currentLayer = name;
  img.src = layers[name];
  document.querySelectorAll('.layer-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.toLowerCase().includes(name.slice(0,4)));
  });
  const leg = document.getElementById('legend');
  const items = legends[name] || [];
  leg.innerHTML = '<h3>' + name.charAt(0).toUpperCase() + name.slice(1) + '</h3>' +
    items.map(([c,l]) => '<div class=legend-item><div class=legend-swatch style="background:'+c+'"></div>'+l+'</div>').join('');
}

function updateTransform() {
  img.style.transform = 'translate('+panX+'px,'+panY+'px) scale('+scale+')';
}

container.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = container.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const oldScale = scale;
  scale *= e.deltaY < 0 ? 1.15 : 0.87;
  scale = Math.max(0.3, Math.min(20, scale));
  panX = mx - (mx - panX) * (scale / oldScale);
  panY = my - (my - panY) * (scale / oldScale);
  updateTransform();
}, { passive: false });

container.addEventListener('mousedown', e => {
  isDragging = true;
  lastX = e.clientX; lastY = e.clientY;
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  panX += e.clientX - lastX;
  panY += e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY;
  updateTransform();
});
window.addEventListener('mouseup', () => isDragging = false);

// Init
setLayer('terrain');
panX = (container.clientWidth - ${width} * scale) / 2;
panY = (container.clientHeight - ${height} * scale) / 2;
updateTransform();
</script>
</body>
</html>`

	const outputPath = resolve(__dirname, '../data/map-preview.html')
	writeFileSync(outputPath, html, 'utf8')

	const sizeKB = Math.round(html.length / 1024)
	console.log()
	console.log(`Carte sauvegardée: ${outputPath} (${sizeKB} KB)`)
	console.log('Ouvrir avec: open data/map-preview.html')
}

main()
