/* LDO Football — motor de ligas y copas locales */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const STORE='ldoCompetitionV1';
let teams=[],players=[],state=null,competitions=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const points=t=>t.w*3+t.d;
function standings(){return state.table.slice().sort((a,b)=>points(b)-points(a)||b.gd-a.gd||b.gf-a.gf||a.name.localeCompare(b.name))}
function makeSchedule(ids){
 const arr=ids.slice();if(arr.length%2)arr.push(null);const n=arr.length,rounds=[];
 for(let r=0;r<n-1;r++){
  const games=[];for(let i=0;i<n/2;i++){const a=arr[i],b=arr[n-1-i];if(a&&b)games.push({home:r%2?b:a,away:r%2?a:b,played:false,score:null})}
  rounds.push(games);const fixed=arr[0],rest=arr.slice(1);rest.unshift(rest.pop());arr.splice(0,arr.length,fixed,...rest);
 }
 const reverse=rounds.map(g=>g.map(x=>({home:x.away,away:x.home,played:false,score:null})));
 return [...rounds,...reverse];
}
function initCompetition(name){
 const comp=competitions.find(c=>c.name===name);if(!comp)return;
 const list=teams.filter(t=>t.competicion===name);
 if(list.length<2){$('compMessage').textContent='Esta competición necesita al menos dos clubes.';return}
 state={name,season:'2026/27',round:0,discipline:{},table:list.map(t=>({id:t.id,name:t.nombre,p:0,w:0,d:0,l:0,gf:0,ga:0,gd:0})),schedule:makeSchedule(list.map(t=>t.id)),history:[]};
 persist();render();
}
function persist(){localStorage.setItem(STORE,JSON.stringify(state))}
function disciplineRecord(player){
 if(!state.discipline)state.discipline={};
 if(!state.discipline[player.id])state.discipline[player.id]={id:player.id,name:player.nombre,teamId:player.clubId||player.equipoId,yellows:0,yellowCards:0,redCards:0,suspension:0};
 return state.discipline[player.id];
}
function suspendedCount(teamId){
 return Object.values(state.discipline||{}).filter(d=>d.teamId===teamId&&d.suspension>0).length;
}
function applyCompetitionDiscipline(teamId,events){
 const roster=players.filter(p=>(p.clubId===teamId||p.equipoId===teamId)&&p.verificado===true&&!['POR','GK'].includes(p.posicion));
 const available=roster.filter(p=>disciplineRecord(p).suspension===0);
 if(available.length&&Math.random()<.18){
  const player=available[Math.floor(Math.random()*available.length)],d=disciplineRecord(player);
  const secondYellow=Math.random()<.04;
  const directRed=!secondYellow&&Math.random()<.025;
  if(secondYellow){d.yellowCards+=2;d.redCards++;d.yellows=(d.yellows+2)%5;d.suspension=Math.max(d.suspension,1);events.push(player.nombre+': segunda amarilla y roja (1 partido de sanción)')}
  else if(directRed){d.redCards++;d.suspension=Math.max(d.suspension,2);events.push(player.nombre+': roja directa (2 partidos de sanción)')}
  else{d.yellows++;d.yellowCards++;events.push(player.nombre+': amarilla'+(d.yellows>=5?' (acumulación: 1 partido de sanción)':''));if(d.yellows>=5){d.yellows=0;d.suspension=Math.max(d.suspension,1)}}
 }
 // La sanción se descuenta después del partido: una jugadora sancionada al inicio
 // se pierde esta jornada y solo entonces reduce su contador.
 for(const p of roster){const d=disciplineRecord(p);if(d.suspension>0&& !available.some(a=>a.id===p.id))d.suspension=Math.max(0,d.suspension-1)}
}
function simulate(game){
 const home=state.table.find(t=>t.id===game.home),away=state.table.find(t=>t.id===game.away);
 const rating=t=>Math.max(.25,1+Math.random()*2.7-suspendedCount(t.id)*.28);
 const h=rating(home),a=rating(away);
 const hg=Math.max(0,Math.min(7,Math.round(Math.random()*2.1+(h-a)*.7)));
 const ag=Math.max(0,Math.min(7,Math.round(Math.random()*2.1+(a-h)*.7)));
 game.played=true;game.score=[hg,ag];
 home.p++;away.p++;home.gf+=hg;home.ga+=ag;away.gf+=ag;away.ga+=hg;home.gd=home.gf-home.ga;away.gd=away.gf-away.ga;
 if(hg>ag){home.w++;away.l++}else if(ag>hg){away.w++;home.l++}else{home.d++;away.d++}
 const disciplinaryEvents=[];applyCompetitionDiscipline(home.id,disciplinaryEvents);applyCompetitionDiscipline(away.id,disciplinaryEvents);
 state.history.push({round:state.round+1,home:home.name,away:away.name,score:[hg,ag],discipline:disciplinaryEvents});
}
function playRound(){
 if(!state)return;const round=state.schedule[state.round];
 if(!round){$('compMessage').textContent='Temporada terminada. ¡Campeona: '+standings()[0].name+'!';return}
 round.forEach(g=>simulate(g));state.round++;persist();render();
 $('compMessage').textContent=state.round===state.schedule.length?'Temporada finalizada. Campeona: '+standings()[0].name:'Jornada '+state.round+' completada.';
}
function render(){
 if(!state)return;
 $('compTitle').textContent=state.name+' · Temporada '+state.season;
 $('compProgress').textContent='Jornada '+state.round+' de '+state.schedule.length;
 $('compTable').innerHTML='<div class="tableWrap"><table><thead><tr><th>#</th><th>Club</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>'+standings().map((t,i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(t.name)+'</td><td>'+t.p+'</td><td>'+t.w+'</td><td>'+t.d+'</td><td>'+t.l+'</td><td>'+t.gf+'</td><td>'+t.ga+'</td><td>'+t.gd+'</td><td><b>'+points(t)+'</b></td></tr>').join('')+'</tbody></table></div>';
 const games=state.schedule.flatMap((r,i)=>r.map(g=>({...g,round:i+1})));
 $('compFixtures').innerHTML=games.slice(0,Math.min(games.length,60)).map(g=>'<div class="fixture"><span>J'+g.round+'</span><b>'+esc(state.table.find(t=>t.id===g.home)?.name||g.home)+'</b><span>'+(g.played?g.score.join(' - '):'vs')+'</span><b>'+esc(state.table.find(t=>t.id===g.away)?.name||g.away)+'</b></div>').join('');
 const disciplinary=Object.values(state.discipline||{}).filter(d=>d.yellowCards||d.redCards||d.suspension).sort((a,b)=>b.suspension-a.suspension||b.redCards-a.redCards||b.yellowCards-a.yellowCards);
 $('disciplineTable').innerHTML=disciplinary.length?'<div class="tableWrap"><table><thead><tr><th>Jugadora</th><th>Amarillas</th><th>Rojas</th><th>Suspensión pendiente</th></tr></thead><tbody>'+disciplinary.map(d=>'<tr><td>'+esc(d.name)+'</td><td>'+d.yellowCards+'</td><td>'+d.redCards+'</td><td>'+d.suspension+' PJ</td></tr>').join('')+'</tbody></table></div>':'<p class="hint">Sin sanciones registradas. El sistema solo registra jugadoras verificadas que aparecen en la plantilla del club.</p>';
 $('playRound').disabled=state.round>=state.schedule.length;
}
function initCup(){
 if(!state){$('compMessage').textContent='Primero crea una liga.';return}
 const ids=state.table.map(t=>t.id).sort(()=>Math.random()-.5);
 state.cup={round:ids.map(id=>({home:id,away:null,bye:true,played:true,score:[0,0],winner:id})),stage:1};
 const pair=[];for(let i=0;i<ids.length;i+=2){if(ids[i+1])pair.push({home:ids[i],away:ids[i+1],played:false});else pair.push({home:ids[i],away:null,played:true,winner:ids[i],bye:true})}
 state.cup.round=pair;persist();renderCup();
}
function playCup(){
 if(!state?.cup)return;const round=state.cup.round;
 const winners=round.map(g=>{if(g.bye)return g.winner;const h=state.table.find(t=>t.id===g.home),a=state.table.find(t=>t.id===g.away);const hs=Math.floor(Math.random()*4),as=Math.floor(Math.random()*4);g.played=true;g.score=[hs,as];g.winner=hs===as?(Math.random()<.5?g.home:g.away):(hs>as?g.home:g.away);return g.winner});
 if(winners.length===1){$('cupMessage').textContent='¡Campeona de copa: '+state.table.find(t=>t.id===winners[0]).name+'!';renderCup();return}
 const next=[];for(let i=0;i<winners.length;i+=2){if(winners[i+1])next.push({home:winners[i],away:winners[i+1],played:false});else next.push({home:winners[i],away:null,bye:true,played:true,winner:winners[i]})}
 state.cup.round=next;state.cup.stage++;persist();renderCup();
}
function renderCup(){
 if(!state?.cup)return;$('cupBracket').innerHTML=state.cup.round.map(g=>'<div class="fixture"><b>'+esc(state.table.find(t=>t.id===g.home)?.name||g.home)+'</b><span>'+(g.bye?'PASA':g.played?g.score.join(' - '):'vs')+'</span><b>'+esc(g.away?state.table.find(t=>t.id===g.away)?.name||g.away:'Pase directo')+'</b></div>').join('');
 $('cupMessage').textContent='Ronda '+state.cup.stage+' · Ganadoras avanzan.';$('playCup').disabled=state.cup.round.length===1&&state.cup.round[0].played;
}
async function boot(){
 try{const [res,rosters]=await Promise.all([fetch('data/equipos.json'),fetch('data/jugadoras.json')]);const [data,playerData]=await Promise.all([res.json(),rosters.json()]);teams=data.equipos.filter(t=>t.tipo==='club');players=playerData.jugadoras||[];competitions=[...new Set(teams.map(t=>t.competicion))].sort().map(name=>({name}));$('competitionSelect').innerHTML=competitions.map(c=>'<option>'+esc(c.name)+'</option>').join('');
 try{state=JSON.parse(localStorage.getItem(STORE)||'null')}catch(e){state=null}
 if(state&&state.table?.length){state.discipline=state.discipline||{};render();if(state.cup)renderCup()}
 $('createLeague').onclick=()=>initCompetition($('competitionSelect').value);
 $('playRound').onclick=playRound;$('createCup').onclick=initCup;$('playCup').onclick=playCup;
 $('resetLeague').onclick=()=>{if(confirm('¿Borrar liga, resultados y copa guardados?')){state=null;localStorage.removeItem(STORE);$('compTitle').textContent='Sin competición activa';$('compTable').innerHTML='';$('compFixtures').innerHTML='';$('cupBracket').innerHTML='';$('compMessage').textContent='Selecciona una competición.'}};
 }catch(e){$('compMessage').textContent='No se pudo cargar data/equipos.json. '+e.message}
}
document.addEventListener('ldo:discipline-updated',()=>{try{const latest=JSON.parse(localStorage.getItem(STORE)||'null');if(latest&&latest.table?.length){state=latest;state.discipline=state.discipline||{};render()}}catch(e){console.warn('No se pudo actualizar la disciplina',e)}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();