import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('data/jugadores.json','utf8'));
const clubs=JSON.parse(fs.readFileSync('data/equipos.json','utf8')).equipos;
const comps=JSON.parse(fs.readFileSync('data/competiciones.json','utf8')).competiciones;
const errors=[];const ids=new Set(clubs.map(c=>c.id));const playerIds=new Set();
for(const p of data.jugadores){if(playerIds.has(p.id))errors.push('ID duplicado '+p.id);playerIds.add(p.id);if(!ids.has(p.clubId))errors.push('Club inexistente '+p.clubId);if(!p.nombre||!p.posicion||!p.fuente||!p.dorsal)errors.push('Dato incompleto '+p.id);}
for(const c of comps)for(const id of c.clubes)if(!ids.has(id))errors.push('Club no existe en liga '+id);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('Datos válidos: '+clubs.length+' clubes, '+data.jugadores.length+' jugadores reales registrados.');
