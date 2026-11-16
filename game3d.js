import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const $=id=>document.getElementById(id);
const fieldEl=$('pitch');
const FIELD={x:100,z:64,goalHalf:7};
const keys=new Set();
let scene,camera,renderer,clock,raf=null,active=false,paused=false,players=[],ball,selected=1,score=[0,0],shots=[0,0],elapsed=0,duration=300,home,away,careerMode=false,careerData=null,roster=[];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mat=(color,roughness=.78)=>new THREE.MeshStandardMaterial({color,roughness});
const green=mat('#247a42'),lineMat=new THREE.LineBasicMaterial({color:'#eaf5df'}),white=mat('#f6f6ee'),black=mat('#18242b');
const teamPalette=[{shirt:'#f3f1e9',short:'#202c50',sock:'#f3f1e9'},{shirt:'#273c83',short:'#a51e39',sock:'#273c83'}];
const crowd=[];
const crowdColors=['#d94b45','#f0c84b','#3478bd','#e8e8e8','#34a06b','#8a5bb5','#e58a37'];

function makeHuman(p,teamIndex){
 const root=new THREE.Group();
 const keeper=p.role==='GK';
 const kit=keeper?{shirt:teamIndex===0?'#f0c52e':'#ef7b25',short:'#20252a',sock:'#f4f4f4'}:teamPalette[teamIndex];
 const shirt=mat(kit.shirt),short=mat(kit.short),skin=mat('#d5a27c'),sock=mat(kit.sock),boot=mat('#20252a');
 const torso=new THREE.Mesh(new THREE.CylinderGeometry(.43,.5,1.05,10),shirt);torso.position.y=1.55;root.add(torso);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.28,12,10),skin);head.position.y=2.32;root.add(head);
 const hair=new THREE.Mesh(new THREE.SphereGeometry(.285,12,8,0,Math.PI*2,0,Math.PI*.52),mat('#30251f'));hair.position.y=2.4;root.add(hair);
 p.arms=[];
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.position.set(side*.53,1.93,0);
  const sleeve=new THREE.Mesh(new THREE.CylinderGeometry(.12,.14,.48,8),shirt);sleeve.position.y=-.12;arm.add(sleeve);
  const forearm=new THREE.Mesh(new THREE.CylinderGeometry(.085,.105,.32,8),skin);forearm.position.y=-.49;arm.add(forearm);
  if(keeper){const glove=new THREE.Mesh(new THREE.SphereGeometry(.14,8,8),mat('#f5f5f5'));glove.position.y=-.68;arm.add(glove)}
  arm.rotation.z=side*-.16;root.add(arm);p.arms.push(arm);
  const leg=new THREE.Group();leg.position.set(side*.22,1.02,0);
  const thigh=new THREE.Mesh(new THREE.CylinderGeometry(.15,.17,.55,8),short);thigh.position.y=-.27;leg.add(thigh);
  const shin=new THREE.Mesh(new THREE.CylinderGeometry(.105,.12,.48,8),sock);shin.position.y=-.75;leg.add(shin);
  const shoe=new THREE.Mesh(new THREE.BoxGeometry(.23,.13,.38),boot);shoe.position.set(0,-1.02,.1);leg.add(shoe);
  root.add(leg);p.legs.push(leg);
 }
 const numberCanvas=document.createElement('canvas');numberCanvas.width=128;numberCanvas.height=64;
 const c=numberCanvas.getContext('2d');c.fillStyle=kit.shirt;c.fillRect(0,0,128,64);c.fillStyle=kit.short;c.font='bold 42px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText(String(p.dorsal||p.number||10),64,34);
 const texture=new THREE.CanvasTexture(numberCanvas);
 const badge=new THREE.Mesh(new THREE.PlaneGeometry(.45,.28),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide}));
 badge.position.set(0,1.58,-.445);root.add(badge);
 p.root=root;p.team=teamIndex;p.legs=p.legs;p.speed=keeper?5.2:(teamIndex===0?7.2:6.3);p.keeper=keeper;
 return root;
}
function addLine(points){const geometry=new THREE.BufferGeometry().setFromPoints(points.map(v=>new THREE.Vector3(v[0],.035,v[1])));scene.add(new THREE.Line(geometry,lineMat))}
function addBox(x,y,z,w,h,d,material){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);scene.add(m);return m}
function buildCrowd(){
 const stadium=mat('#68727b'),seatA=mat('#263746'),seatB=mat('#354858');
 // Gradas escalonadas a ambos lados del campo y detrás de las porterías.
 for(const side of [-1,1]){
  const stand=addBox(0,.45,side*37,102,.9,7,stadium);stand.castShadow=false;
  for(let row=0;row<4;row++){
   const z=side*(34.5+row*1.65);
   for(let x=-47;x<=47;x+=2.6){
    const person=new THREE.Group();person.position.set(x,.9+row*.22,z);
    const shirt=mat(crowdColors[(Math.floor((x+50)*3+row*7+side*13)%crowdColors.length+crowdColors.length)%crowdColors.length]);
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.19,.23,.48,6),shirt);body.position.y=.34;person.add(body);
    const head=new THREE.Mesh(new THREE.SphereGeometry(.15,7,6),mat('#c99470'));head.position.y=.68;person.add(head);
    const arms=[];for(const sign of [-1,1]){const arm=new THREE.Group();arm.position.set(sign*.22,.48,0);const limb=new THREE.Mesh(new THREE.CylinderGeometry(.055,.07,.42,5),shirt);limb.position.y=.18;arm.add(limb);person.add(arm);arms.push(arm)}
    scene.add(person);crowd.push({root:person,arms,phase:Math.random()*Math.PI*2,rate:1+Math.random()*2});
   }
  }
 }
 for(const side of [-1,1]){
  addBox(side*53,.45,0,7,.9,70,stadium);
  for(let row=0;row<3;row++)for(let z=-31;z<=31;z+=2.8){
   const person=new THREE.Group();person.position.set(side*(49+row*1.7),.9+row*.2,z);
   const shirt=mat(crowdColors[Math.floor(Math.random()*crowdColors.length)]);
   const body=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,.46,6),shirt);body.position.y=.32;person.add(body);
   const head=new THREE.Mesh(new THREE.SphereGeometry(.14,7,6),mat('#c99470'));head.position.y=.65;person.add(head);
   const arms=[];for(const sign of [-1,1]){const arm=new THREE.Group();arm.position.set(sign*.2,.46,0);const limb=new THREE.Mesh(new THREE.CylinderGeometry(.05,.065,.4,5),shirt);limb.position.y=.17;arm.add(limb);person.add(arm);arms.push(arm)}
   scene.add(person);crowd.push({root:person,arms,phase:Math.random()*Math.PI*2,rate:1+Math.random()*2});
  }
 }
}
function animateCrowd(time){for(const fan of crowd){const wave=Math.max(0,Math.sin(time*fan.rate+fan.phase));fan.root.position.y+=Math.sin(time*2+fan.phase)*.002;fan.arms.forEach((arm,i)=>{arm.rotation.z=(i===0?-1:1)*(.25+wave*.9);arm.rotation.x=wave*.22})}}
function buildPitch(){
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(FIELD.x,FIELD.z),green);ground.rotation.x=-Math.PI/2;ground.position.y=-.04;scene.add(ground);
 for(let i=0;i<10;i++){const stripe=new THREE.Mesh(new THREE.PlaneGeometry(FIELD.x/10,FIELD.z),mat(i%2?'#247a42':'#2a8548'));stripe.rotation.x=-Math.PI/2;stripe.position.set(-FIELD.x/2+FIELD.x/20+i*FIELD.x/10,-.025,0);scene.add(stripe)}
 const x=FIELD.x/2,z=FIELD.z/2;
 addLine([[-x,0],[-x,-z],[x,-z],[x,z],[-x,z],[-x,0]]);
 addLine([[0,-z],[0,z]]);
 const circle=[];for(let i=0;i<=64;i++){const a=i/64*Math.PI*2;circle.push([Math.cos(a)*9,Math.sin(a)*9])}addLine(circle);
 for(const sign of [-1,1]){
  const gx=sign*x;
  addLine([[gx, -18],[gx-sign*16,-18],[gx-sign*16,18],[gx,18]]);
  addLine([[gx,-9],[gx-sign*5,-9],[gx-sign*5,9],[gx,9]]);
  const goal=addBox(gx+sign*1.6,1.2,0,3.2,2.4,14,white);goal.material=white;goal.material.wireframe=true;
 }
 const spot=new THREE.Mesh(new THREE.CircleGeometry(.28,16),white);spot.rotation.x=-Math.PI/2;spot.position.set(0,.04,0);scene.add(spot);
}
function setupRenderer(){
 scene=new THREE.Scene();scene.background=new THREE.Color('#9bd0e5');scene.fog=new THREE.Fog('#9bd0e5',100,190);
 camera=new THREE.PerspectiveCamera(42,fieldEl.clientWidth/fieldEl.clientHeight,.1,300);
 camera.position.set(0,76,83);camera.lookAt(0,0,0);
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.setSize(fieldEl.clientWidth,fieldEl.clientHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 fieldEl.replaceChildren(renderer.domElement);
 scene.add(new THREE.HemisphereLight('#e8f5ff','#284a2f',2));
 const sun=new THREE.DirectionalLight('#fff4d8',2.2);sun.position.set(-25,60,30);sun.castShadow=true;scene.add(sun);
 buildPitch();buildCrowd();clock=new THREE.Clock();
 window.addEventListener('resize',resize);
}
function resize(){if(!renderer||!camera)return;const w=fieldEl.clientWidth,h=fieldEl.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}
function squadFor(id){return roster.filter(p=>p.clubId===id)}
function positionsFor(teamIndex,squad){
 const gk=squad.filter(p=>p.posicion==='POR'),def=squad.filter(p=>p.posicion==='DEF'),mid=squad.filter(p=>p.posicion==='MED'),fwd=squad.filter(p=>p.posicion==='DEL');
 const chosen=[gk[0],...def.slice(0,4),...mid.slice(0,3),...fwd.slice(0,3)].filter(Boolean);
 const coords=[[-46,0],[-29,-22],[-31,-7],[-31,7],[-29,22],[-10,-19],[-12,0],[-10,19],[13,-21],[17,0],[13,21]];
 return chosen.slice(0,11).map((data,i)=>({data,team:teamIndex,role:data.posicion==='POR'?'GK':data.posicion,x:teamIndex===0?coords[i][0]:-coords[i][0],z:coords[i][1],legs:[],arms:[],vx:0,vz:0,hasBall:false}));
}
function clearScenePlayers(){for(const p of players)if(p.root)scene.remove(p.root);players=[];if(ball)scene.remove(ball)}
function spawnPlayers(){
 clearScenePlayers();
 const one=positionsFor(0,squadFor(home.id)),two=positionsFor(1,squadFor(away.id));
 players=[...one,...two];
 players.forEach(p=>{const model=makeHuman(p,p.team);model.position.set(p.x,0,p.z);scene.add(model);p.root=model});
 const geo=new THREE.SphereGeometry(.48,18,14);ball=new THREE.Mesh(geo,mat('#ffffff',.35));ball.position.set(-41,0.48,0);scene.add(ball);
 selected=Math.min(1,one.length-1);players[selected].hasBall=true;attachBall(players[selected]);
}
function attachBall(p){players.forEach(x=>x.hasBall=x===p);ball.position.set(p.x+(p.team===0?1.25:-1.25),.5,p.z+.1);ball.userData.owner=p;ball.userData.vx=0;ball.userData.vz=0}
function startScene(homeId,awayId,opts={}){
 if(!renderer)setupRenderer();
 home={id:homeId,name:opts.homeName||homeId,short:opts.homeShort||homeId.slice(0,3).toUpperCase()};
 away={id:awayId,name:opts.awayName||awayId,short:opts.awayShort||awayId.slice(0,3).toUpperCase()};
 careerMode=!!opts.career;careerData=opts.careerData||null;duration=opts.duration||300;elapsed=0;score=[0,0];shots=[0,0];paused=false;active=true;
 spawnPlayers();$('homeName').textContent=home.short;$('awayName').textContent=away.short;$('homeScore').textContent='0';$('awayScore').textContent='0';$('matchClock').textContent='00:00';$('shots').textContent='Tiros 0 - 0';$('matchMessage').textContent='¡Partido 3D listo! Controla al jugador marcado.';
 $('pauseBtn').textContent='PAUSAR';
 if(raf!==null)cancelAnimationFrame(raf);clock.getDelta();raf=requestAnimationFrame(frame);
}
function nearestOwnToBall(){let best=-1,d=Infinity;players.forEach((p,i)=>{if(p.team!==0)return;const n=Math.hypot(p.x-ball.position.x,p.z-ball.position.z);if(n<d){d=n;best=i}});return best}
function acquireForAction(){const owner=ball.userData.owner;if(owner&&owner.team===0){selected=players.indexOf(owner);return owner}const nearest=nearestOwnToBall();if(nearest>=0&&Math.hypot(players[nearest].x-ball.position.x,players[nearest].z-ball.position.z)<15){selected=nearest;attachBall(players[selected]);return players[selected]}$('matchMessage').textContent='Acércate al balón para recuperar la posesión.';return null}
function pass(){
 const p=acquireForAction();if(!p)return;
 const candidates=players.filter(q=>q.team===0&&q!==p);
 candidates.sort((a,b)=>{const score=q=>Math.hypot(q.x-p.x,q.z-p.z)-((q.x-p.x)>0?18:0);return score(a)-score(b)});
 const mate=candidates[0];if(!mate)return;
 ball.userData.owner=null;players.forEach(q=>q.hasBall=false);
 const dx=mate.x-p.x,dz=mate.z-p.z,d=Math.hypot(dx,dz)||1;
 ball.userData.vx=dx/d*27;ball.userData.vz=dz/d*27;ball.userData.target=mate;
 selected=players.indexOf(mate);$('matchMessage').textContent='Pase enviado a '+(mate.data?.nombre||'tu compañero')+'.';
}
function shoot(){
 const p=acquireForAction();if(!p)return;
 ball.userData.owner=null;players.forEach(q=>q.hasBall=false);
 const targetZ=clamp(-p.z*.22+(Math.random()-.5)*5,-FIELD.goalHalf+1,FIELD.goalHalf-1);
 const dx=FIELD.x/2+4-p.x,dz=targetZ-p.z,d=Math.hypot(dx,dz)||1;
 const power=p.x>25?39:34;
 ball.userData.vx=dx/d*power;ball.userData.vz=dz/d*power;ball.userData.shot=true;ball.userData.lastTeam=0;shots[0]++;
 $('shots').textContent='Tiros '+shots[0]+' - '+shots[1];$('matchMessage').textContent='¡Disparo hacia la portería!';
}
function switchPlayer(){const owner=ball.userData.owner;let candidates=players.map((p,i)=>({p,i})).filter(x=>x.p.team===0&&x.i!==selected);if(owner&&owner.team===0){candidates.sort((a,b)=>Math.hypot(a.p.x-ball.position.x,a.p.z-ball.position.z)-Math.hypot(b.p.x-ball.position.x,b.p.z-ball.position.z));}else{candidates.sort((a,b)=>Math.hypot(a.p.x-ball.position.x,a.p.z-ball.position.z)-Math.hypot(b.p.x-ball.position.x,b.p.z-ball.position.z));}if(candidates.length){selected=candidates[0].i;$('matchMessage').textContent='Controlas a '+(players[selected].data?.nombre||'tu jugador')+'.'}}
function scoreGoal(teamIndex){
 score[teamIndex]++;$('homeScore').textContent=score[0];$('awayScore').textContent=score[1];
 $('goalFlash').textContent='¡GOOOL!';$('goalFlash').classList.remove('show');void $('goalFlash').offsetWidth;$('goalFlash').classList.add('show');
 $('matchMessage').textContent='¡Gol de '+(teamIndex===0?home.name:away.name)+'!';
 players.forEach(p=>{p.x=p.team===0?-Math.abs(p.x):Math.abs(p.x);p.z=clamp(p.z,-27,27)});
 attachBall(players[1]);selected=1;ball.userData.owner=players[1];
}
function movePlayer(p,dx,dz,dt,sprint=false){
 const len=Math.hypot(dx,dz);if(!len){p.legs.forEach(leg=>leg.rotation.x*=.78);p.arms?.forEach(arm=>arm.rotation.x*=.78);return;}
 const speed=p.speed*(sprint?1.38:1);p.x=clamp(p.x+dx/len*speed*dt,-48,48);p.z=clamp(p.z+dz/len*speed*dt,-29,29);
 p.root.position.set(p.x,0,p.z);p.root.rotation.y=Math.atan2(dx,dz);
 const phase=performance.now()*.014+(p.team?Math.PI:0),swing=Math.sin(phase)*.62;
 p.legs.forEach((leg,i)=>{leg.rotation.x=(i===0?1:-1)*swing;leg.rotation.z=Math.cos(phase)*.035});
 p.arms?.forEach((arm,i)=>{arm.rotation.x=(i===0?-1:1)*swing*.72;arm.rotation.z=(i===0?-.12:.12)});
 p.root.position.y=.025+Math.abs(Math.sin(phase*2))*.045;
}
function aiUpdate(dt){
 const owner=ball.userData.owner;
 for(const p of players){
  if(p.keeper){
   const homeSide=p.team===0?-1:1,targetX=homeSide*45.5,targetZ=clamp(ball.position.z,-6.2,6.2);
   const dx=targetX-p.x,dz=targetZ-p.z;
   if(Math.abs(dx)>.25||Math.abs(dz)>.35)movePlayer(p,dx,dz,dt*1.25);
   p.x=homeSide*45.5;p.root.position.x=p.x;
   if(!owner&&Math.abs(ball.position.x-p.x)<5&&Math.abs(ball.position.z-p.z)<4){attachBall(p);$('matchMessage').textContent='¡El portero atrapa el balón!'}
   continue;
  }
  if(p.team===0&&players[selected]===p)continue;
  if(p.team===0&&owner===p){movePlayer(p,7,clamp(-p.z*.12,-2,2),dt*.45)}else if(p.team===0&&(!owner||owner.team===1)){const target=owner&&owner.team===1?owner:ball.position;const dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz);if(d>3)movePlayer(p,dx,dz,dt*.72)}
  else if(p.team===1){const target=owner&&owner.team===1?{x:owner.x+5,z:owner.z}:ball.position;const dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz);if(d>3)movePlayer(p,dx,dz,dt*.75)}
  else if(p.team===0&&p!==players[selected]){const dx=clamp(p.x,-35,-8)-p.x,dz=clamp(p.z,-24,24)-p.z;if(Math.hypot(dx,dz)>2)movePlayer(p,dx,dz,dt*.25)}
 }
 if(owner&&owner.team===1&&Math.random()<.008){ball.userData.owner=null;ball.userData.vx=-28;ball.userData.vz=(Math.random()-.5)*10;ball.userData.shot=true;ball.userData.lastTeam=1;shots[1]++}
}
function updateBall(dt){
 const owner=ball.userData.owner;
 if(owner){ball.position.set(owner.x+(owner.team===0?1.15:-1.15),.5,owner.z+.12);return}
 ball.position.x+=ball.userData.vx*dt;ball.position.z+=ball.userData.vz*dt;
 ball.userData.vx*=Math.pow(.986,dt*60);ball.userData.vz*=Math.pow(.986,dt*60);
 if(Math.abs(ball.position.z)>FIELD.z/2-1){ball.position.z=clamp(ball.position.z,-FIELD.z/2+1,FIELD.z/2-1);ball.userData.vz*=-.65}
 if(ball.position.x>FIELD.x/2&&Math.abs(ball.position.z)<FIELD.goalHalf){scoreGoal(0);return}
 if(ball.position.x< -FIELD.x/2&&Math.abs(ball.position.z)<FIELD.goalHalf){scoreGoal(1);return}
 if(Math.abs(ball.position.x)>FIELD.x/2+5){ball.position.x=0;ball.position.z=0;ball.userData.vx=0;ball.userData.vz=0}
 if(Math.hypot(ball.userData.vx,ball.userData.vz)<5){
  let best=null,d=2.3;for(const p of players){const dist=Math.hypot(p.x-ball.position.x,p.z-ball.position.z);if(dist<d){best=p;d=dist}}
  if(best)attachBall(best);
 }
}
function readMovement(){
 const left=keys.has('a')||keys.has('arrowleft'),right=keys.has('d')||keys.has('arrowright'),up=keys.has('w')||keys.has('arrowup'),down=keys.has('s')||keys.has('arrowdown');
 return {dx:Number(right)-Number(left),dz:Number(down)-Number(up),sprint:keys.has(' ')||keys.has('shift')};
}
function frame(){
 if(!active)return;const dt=Math.min(clock.getDelta(),.04);
 if(!paused){
  const p=players[selected];if(p){const m=readMovement();movePlayer(p,m.dx,m.dz,dt,m.sprint);if(ball.userData.owner===p)attachBall(p)}
  aiUpdate(dt);updateBall(dt);elapsed+=dt;
  const seconds=Math.floor(elapsed);$('matchClock').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
  if(elapsed>=duration){finish();return}
 }
 camera.position.x+=(0-camera.position.x)*.015;camera.lookAt(0,0,0);
 renderer.render(scene,camera);raf=requestAnimationFrame(frame);
}
function finish(){
 active=false;if(raf!==null)cancelAnimationFrame(raf);
 const save=(()=>{try{return JSON.parse(localStorage.getItem('footballJourneySave')||'{}')}catch{return {}}})();
 save.played=(save.played||0)+1;save.lastResult=home.short+' '+score[0]+' - '+score[1]+' '+away.short;
 if(careerMode&&save.career){save.career.apps=(save.career.apps||0)+1;save.career.goals=(save.career.goals||0);save.career.xp=(save.career.xp||0)+12+score[0]*4;save.career.ovr=Math.min(99,60+Math.floor(save.career.xp/40));save.career.fatigue=Math.min(100,(save.career.fatigue||0)+20);if(score[0]>score[1])save.career.wins=(save.career.wins||0)+1}
 localStorage.setItem('footballJourneySave',JSON.stringify(save));
 $('resultHome').textContent=home.name;$('resultAway').textContent=away.name;$('resultScore').textContent=score[0]+' - '+score[1];$('resultSummary').textContent='Partido 3D · Tiros: '+shots[0]+' - '+shots[1];$('resultTitle').textContent=score[0]>score[1]?'¡Victoria!':score[0]===score[1]?'Empate':'A seguir trabajando';
 document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$('resultScreen').classList.add('active');
}
async function startFromUI(career=false){
 try{
  if(!roster.length){const res=await fetch('data/jugadores.json');if(!res.ok)throw new Error('No se pudo leer data/jugadores.json');roster=(await res.json()).jugadores||[]}
  let saved={};try{saved=JSON.parse(localStorage.getItem('footballJourneySave')||'{}')}catch{}
  careerMode=career;careerData=saved.career||null;
  const homeId=career?(saved.career?.team||'real-madrid'):$('homeTeam').value;
  const awayId=career?['real-madrid','barcelona','manchester-city','liverpool','bayern','psg','juventus','inter'].find(x=>x!==homeId):$('awayTeam').value;
  if(homeId===awayId){$('matchMessage').textContent='Elige dos clubes distintos.';return}
  const names=Object.fromEntries([['real-madrid','Real Madrid'],['barcelona','FC Barcelona'],['manchester-city','Manchester City'],['liverpool','Liverpool FC'],['bayern','Bayern München'],['psg','Paris Saint-Germain'],['juventus','Juventus'],['inter','Inter de Milán']]);
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$('gameScreen').classList.add('active');
  startScene(homeId,awayId,{career,careerData,duration:career?300:Number($('matchLength').value),homeName:names[homeId],awayName:names[awayId],homeShort:names[homeId].slice(0,3).toUpperCase(),awayShort:names[awayId].slice(0,3).toUpperCase()});
 }catch(err){console.error(err);$('matchMessage').textContent='Error al cargar el partido 3D: '+err.message;alert('No se pudo iniciar el partido 3D. Abre el juego desde GitHub Pages y comprueba tu conexión.')}
}
function stop(){active=false;if(raf!==null)cancelAnimationFrame(raf);keys.clear()}
$('startGame').onclick=()=>startFromUI(false);
$('careerMatch').onclick=()=>startFromUI(true);
$('passBtn').onclick=pass;$('shootBtn').onclick=shoot;$('switchBtn').onclick=switchPlayer;
$('pauseBtn').onclick=()=>{paused=!paused;$('pauseBtn').textContent=paused?'REANUDAR':'PAUSAR'};
$('leaveMatch').onclick=()=>{if(confirm('¿Salir del partido? El resultado no se guardará.')){stop();document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$('homeScreen').classList.add('active')}};
$('resultContinue').onclick=()=>{stop();document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$('homeScreen').classList.add('active')};
window.addEventListener('keydown',e=>{const key=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key))e.preventDefault();if(e.repeat)return;keys.add(key);if(!active||paused)return;if(key==='j')pass();if(key==='k')shoot();if(key==='l')switchPlayer()});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
document.querySelectorAll('[data-key]').forEach(button=>{const key=button.dataset.key.toLowerCase();button.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(key)});['pointerup','pointercancel','pointerleave'].forEach(type=>button.addEventListener(type,()=>keys.delete(key)))});
window.addEventListener('blur',()=>keys.clear());
window.FJ3D={start:startFromUI,pass,shoot,switchPlayer};
