import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('data/competiciones.json', 'utf8'));
const failures = [];
function makeSchedule(ids) {
  const teams = ids.slice();
  if (teams.length % 2) teams.push(null);
  const size = teams.length;
  const firstLeg = [];
  for (let round = 0; round < size - 1; round++) {
    const games = [];
    for (let i = 0; i < size / 2; i++) {
      const home = teams[i], away = teams[size - 1 - i];
      if (home && away) games.push([home, away]);
    }
    firstLeg.push(games);
    const fixed = teams[0], rotating = teams.slice(1);
    rotating.unshift(rotating.pop());
    teams.splice(0, teams.length, fixed, ...rotating);
  }
  return [...firstLeg, ...firstLeg.map(games => games.map(([home, away]) => [away, home]))];
}
for (const competition of data.competiciones) {
  const ids = competition.clubes;
  const schedule = makeSchedule(ids);
  const expectedRounds = (ids.length % 2 ? ids.length : ids.length - 1) * 2;
  if (schedule.length !== expectedRounds) failures.push(competition.nombre + ': número de jornadas incorrecto');
  const appearances = new Map(ids.map(id => [id, 0]));
  const pairCounts = new Map();
  for (const round of schedule) {
    const roundTeams = new Set();
    for (const [home, away] of round) {
      if (home === away) failures.push(competition.nombre + ': un club juega contra sí mismo');
      if (roundTeams.has(home) || roundTeams.has(away)) failures.push(competition.nombre + ': club repetido en una jornada');
      roundTeams.add(home); roundTeams.add(away);
      appearances.set(home, (appearances.get(home) ?? 0) + 1);
      appearances.set(away, (appearances.get(away) ?? 0) + 1);
      const pair = [home, away].sort().join('|');
      pairCounts.set(pair, (pairCounts.get(pair) ?? 0) + 1);
    }
  }
  for (const [id, count] of appearances) if (count !== ids.length - 1) failures.push(competition.nombre + ': partidos incorrectos para ' + id + ' (' + count + ')');
  const expectedPairs = ids.length * (ids.length - 1) / 2;
  if (pairCounts.size !== expectedPairs) failures.push(competition.nombre + ': cobertura de rivales incorrecta');
  for (const [pair, count] of pairCounts) if (count !== 2) failures.push(competition.nombre + ': enfrentamiento no ida/vuelta ' + pair);
}
if (failures.length) {
  console.error('PRUEBAS DE CALENDARIO FALLIDAS');
  failures.forEach(x => console.error('- ' + x));
  process.exit(1);
}
console.log('Calendarios correctos: ' + data.competiciones.length + ' competiciones ida/vuelta');
