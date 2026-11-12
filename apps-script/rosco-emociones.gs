// Rosco de las emociones · servidor (Google Apps Script)
// 1) Cambia la CLAVE por la que usaréis el profesorado.
// 2) Implementar > Nueva implementación > Aplicación web · Ejecutar como: Yo · Acceso: Cualquier usuario.
// 3) Copia la URL que termina en /exec y pégala en index.html (API_URL).
// Cada partida tiene un código de 4 cifras, así varias clases pueden jugar a la vez.
const CLAVE = 'cambia-esta-clave';
const CADUCA_MS = 12 * 3600 * 1000; // las partidas se borran a las 12 h

function doGet(e) { return out(read(String(e.parameter.c || ''))); }

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const p = PropertiesService.getScriptProperties();
    let c = String(d.code || '');
    if (d.action === 'config') {
      if (d.key !== CLAVE) return out({ error: 'clave' });
      if (!c) { // partida nueva: limpiar antiguas y crear código
        const all = p.getProperties(), t = Date.now();
        Object.keys(all).forEach(k => { if (k.indexOf('g_') === 0 && t - JSON.parse(all[k]).creada > CADUCA_MS) borrar(p, all, k.slice(2)); });
        do { c = String(Math.floor(1000 + Math.random() * 9000)); } while (p.getProperty('g_' + c));
        d.game.creada = t;
      } else if (!p.getProperty('g_' + c)) return out({ error: 'codigo' });
      const g = d.game;
      if (g.status === 'juego' && d.durMs) g.end = Date.now() + d.durMs;
      if (g.status === 'fin') g.end = Math.min(g.end || Date.now(), Date.now());
      p.setProperty('g_' + c, JSON.stringify(g));
    } else {
      const g = JSON.parse(p.getProperty('g_' + c) || 'null');
      if (!g || g.id !== d.id) return out({ error: 'partida' });
      if (d.action === 'result') p.setProperty('r_' + c + '_' + d.team, JSON.stringify({ st: d.st, ans: d.ans || [], mem: d.mem || [], t: Date.now() }));
      if (d.action === 'leave' && g.status === 'espera') p.deleteProperty('r_' + c + '_' + d.team);
    }
    return out(read(c));
  } finally { lock.releaseLock(); }
}

function borrar(p, all, c) {
  p.deleteProperty('g_' + c);
  Object.keys(all).forEach(k => { if (k.indexOf('r_' + c + '_') === 0) p.deleteProperty(k); });
}

function read(c) {
  const all = PropertiesService.getScriptProperties().getProperties(), r = {}, pre = 'r_' + c + '_';
  Object.keys(all).forEach(k => { if (k.indexOf(pre) === 0) r[k.slice(pre.length)] = JSON.parse(all[k]); });
  const g = c && all['g_' + c] ? JSON.parse(all['g_' + c]) : null;
  return { now: Date.now(), code: c, game: g, results: g ? r : {} };
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
