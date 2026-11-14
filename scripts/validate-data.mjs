import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const errors = [];
const checkUnique = (items, label) => {
  const seen = new Set();
  for (const item of items) {
    if (!item.id) errors.push(label + ': registro sin id');
    else if (seen.has(item.id)) errors.push(label + ': id duplicado ' + item.id);
    seen.add(item.id);
  }
};
const clubsData = read('data/equipos.json');
const playersData = read('data/jugadoras.json');
const nationsData = read('data/selecciones.json');
const competitionsData = read('data/competiciones.json');
const clubs = clubsData.equipos ?? [];
const players = playersData.jugadoras ?? [];
const nations = nationsData.selecciones ?? [];
const competitions = competitionsData.competiciones ?? [];

checkUnique(clubs, 'Clubes');
checkUnique(players, 'Jugadoras');
checkUnique(nations, 'Selecciones');
checkUnique(competitions, 'Competiciones');

const clubIds = new Set(clubs.map(x => x.id));
for (const player of players) {
  if (player.clubId && !clubIds.has(player.clubId)) {
    errors.push('Jugadora ' + player.id + ': clubId inexistente ' + player.clubId);
  }
}
for (const competition of competitions) {
  if (!Array.isArray(competition.clubes)) errors.push('Competición ' + competition.id + ': falta lista clubes');
  for (const clubId of competition.clubes ?? []) {
    if (!clubIds.has(clubId)) errors.push('Competición ' + competition.id + ': club inexistente ' + clubId);
  }
}
if (!clubs.length) errors.push('No hay clubes en el catálogo');
if (!players.length) errors.push('No hay jugadoras en el catálogo');
if (!nations.length) errors.push('No hay selecciones en el catálogo');
if (!competitions.length) errors.push('No hay competiciones en el catálogo');

if (errors.length) {
  console.error('VALIDACIÓN FALLIDA');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}
console.log('Validación correcta');
console.log('Clubes: ' + clubs.length);
console.log('Jugadoras: ' + players.length);
console.log('Entradas de selecciones: ' + nations.length);
console.log('Competiciones: ' + competitions.length);
