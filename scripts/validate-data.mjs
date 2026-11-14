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
const clubs = read('data/equipos.json').equipos ?? [];
const players = read('data/jugadoras.json').jugadoras ?? [];
const nations = read('data/selecciones.json').selecciones ?? [];
const competitions = read('data/competiciones.json').competiciones ?? [];

checkUnique(clubs, 'Clubes');
checkUnique(players, 'Jugadoras');
checkUnique(nations, 'Selecciones');
checkUnique(competitions, 'Competiciones');

const clubById = new Map(clubs.map(club => [club.id, club]));
const playerKeys = new Set();
for (const player of players) {
  if (!player.nombre) errors.push('Jugadora ' + player.id + ': falta nombre');
  if (player.clubId && !clubById.has(player.clubId)) {
    errors.push('Jugadora ' + player.id + ': clubId inexistente ' + player.clubId);
  }
  if (player.clubId) {
    const key = player.nombre.trim().toLocaleLowerCase('es') + '|' + player.clubId;
    if (playerKeys.has(key)) errors.push('Jugadora duplicada en club: ' + player.nombre + ' (' + player.clubId + ')');
    playerKeys.add(key);
  }
  if (player.dorsal != null && (!Number.isInteger(Number(player.dorsal)) || Number(player.dorsal) < 1 || Number(player.dorsal) > 99)) {
    errors.push('Jugadora ' + player.id + ': dorsal inválido');
  }
}
for (const competition of competitions) {
  if (!Array.isArray(competition.clubes) || competition.clubes.length < 2) {
    errors.push('Competición ' + competition.id + ': necesita al menos dos clubes');
  }
  const localIds = new Set();
  for (const clubId of competition.clubes ?? []) {
    if (!clubById.has(clubId)) errors.push('Competición ' + competition.id + ': club inexistente ' + clubId);
    if (localIds.has(clubId)) errors.push('Competición ' + competition.id + ': club repetido ' + clubId);
    localIds.add(clubId);
    const club = clubById.get(clubId);
    if (club && club.competicion !== competition.nombre) {
      errors.push('Competición ' + competition.nombre + ': ' + club.nombre + ' pertenece a ' + club.competicion);
    }
  }
}
for (const nation of nations) {
  if (!nation.nombre || !nation.categoria) errors.push('Selección ' + nation.id + ': falta nombre o categoría');
}
if (!clubs.length || !players.length || !nations.length || !competitions.length) errors.push('Uno de los catálogos está vacío');

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
