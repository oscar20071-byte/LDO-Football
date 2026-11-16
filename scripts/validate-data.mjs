import fs from 'node:fs';
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const errors = [];
const checkUnique = (items, label) => { const seen = new Set(); for (const item of items) { if (!item.id) errors.push(label + ': registro sin id'); else if (seen.has(item.id)) errors.push(label + ': id duplicado ' + item.id); seen.add(item.id); } };
const clubs = read('data/equipos.json').equipos ?? [];
const players = read('data/jugadores.json').jugadores ?? [];
const nations = read('data/selecciones.json').selecciones ?? [];
const competitions = read('data/competiciones.json').competiciones ?? [];
checkUnique(clubs,'Clubes'); checkUnique(players,'Jugadores'); checkUnique(nations,'Selecciones'); checkUnique(competitions,'Competiciones');
const clubById = new Map(clubs.map(c=>[c.id,c]));
const keys = new Set();
for (const p of players) {
 if (!p.nombre) errors.push('Jugador '+p.id+': falta nombre');
 if (p.clubId && !clubById.has(p.clubId)) errors.push('Jugador '+p.id+': club inexistente '+p.clubId);
 if (p.clubId) { const k=p.nombre.trim().toLocaleLowerCase('es')+'|'+p.clubId; if(keys.has(k)) errors.push('Jugador duplicado: '+p.nombre); keys.add(k); }
 if (p.dorsal!=null && (!Number.isInteger(Number(p.dorsal)) || Number(p.dorsal)<1 || Number(p.dorsal)>99)) errors.push('Dorsal inválido: '+p.id);
}
for (const c of competitions) { if(!Array.isArray(c.clubes)||c.clubes.length<2) errors.push('Competición sin clubes suficientes: '+c.id); const seen=new Set(); for(const id of c.clubes){if(!clubById.has(id))errors.push('Club inexistente en competición: '+id);if(seen.has(id))errors.push('Club duplicado en competición: '+id);seen.add(id);} }
for (const n of nations) if(!n.nombre||!n.categoria) errors.push('Selección incompleta: '+n.id);
if(!clubs.length||!players.length||!nations.length||!competitions.length)errors.push('Catálogo vacío');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Validación correcta');console.log('Clubes: '+clubs.length);console.log('Jugadores demo: '+players.length);console.log('Selecciones: '+nations.length);console.log('Competiciones: '+competitions.length);
