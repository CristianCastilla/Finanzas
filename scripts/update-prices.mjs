// ============================================================
//  Descarga los precios diarios de cada activo y escribe
//  data/prices.json. Lo ejecuta GitHub Actions a diario.
//  Local:  node scripts/update-prices.mjs
// ============================================================
import fs from "node:fs";

const ASSETS = {
  msci_world: {
    isin: "IE000ZYRH0Q7",
    symbol: "0P0001XF40.F",
    name: "iShares Developed World Index (IE) S Acc EUR",
    category: "Renta variable global"
  },
  msci_emerging: {
    isin: "IE000QAZP7L2",
    symbol: "0P0001XF3Z.F",
    name: "iShares Emerging Markets Index (IE) S Acc EUR",
    category: "Renta variable emergente"
  },
  bitcoin: {
    isin: "GB00BJYDH287",
    symbol: "WBTC.PA",
    name: "WisdomTree Physical Bitcoin",
    category: "Cripto (ETP)"
  },
  renta_fija: {
    isin: "FR0000989626",
    symbol: "0P00000LRT.F",
    name: "Groupama Tresorerie IC",
    category: "Monetario / Renta fija"
  }
};

const RANGE = process.env.PRICE_RANGE || "5y";

async function getSeries(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${RANGE}&interval=1d`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; finanzas-panel/1.0)" }
  });
  if (!res.ok) throw new Error(`${symbol} HTTP ${res.status}`);
  const json = await res.json();
  const r = json?.chart?.result?.[0];
  if (!r) throw new Error(`${symbol}: sin datos`);
  const ts = r.timestamp || [];
  const closes = r.indicators?.quote?.[0]?.close || [];
  const series = [];
  for (let i = 0; i < ts.length; i++) {
    const c = closes[i];
    if (c == null) continue;
    const d = new Date(ts[i] * 1000).toISOString().slice(0, 10);
    series.push([d, Math.round(c * 10000) / 10000]);
  }
  return { currency: r.meta?.currency || "EUR", series };
}

const out = {
  generated: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  source: "Yahoo Finance",
  assets: {}
};

let ok = 0;
for (const [key, a] of Object.entries(ASSETS)) {
  try {
    const s = await getSeries(a.symbol);
    if (!s.series.length) throw new Error("serie vacía");
    out.assets[key] = {
      isin: a.isin,
      symbol: a.symbol,
      name: a.name,
      category: a.category,
      currency: s.currency,
      series: s.series
    };
    ok++;
    console.log(`${key} (${a.symbol}): ${s.series.length} puntos, último ${s.series.at(-1)[1]} ${s.currency}`);
  } catch (e) {
    console.error(`${key} FALLÓ: ${e.message}`);
  }
}

if (ok < Object.keys(ASSETS).length) {
  console.error(`Aviso: solo se obtuvieron ${ok}/${Object.keys(ASSETS).length} activos.`);
}
if (ok === 0) {
  console.error("No se obtuvo ningún dato. Se aborta para no dejar el archivo vacío.");
  process.exit(1);
}

fs.mkdirSync("data", { recursive: true });
fs.writeFileSync("data/prices.json", JSON.stringify(out));
console.log(`Escrito data/prices.json (${ok} activos)`);
