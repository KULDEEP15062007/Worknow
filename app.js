'use strict';
/* WorkNow web app: talks to the real API (same origin) */
const $=s=>document.querySelector(s);
let lang=localStorage.getItem('wn_l')||'en';
Object.assign(HI,{'Allow location access':'लोकेशन की अनुमति दें','Use my location':'मेरी लोकेशन','Work location = map pin. Move the map to set it.':'काम की जगह = नक्शे का पिन। नक्शा खिसकाकर चुनें।','Captain is live on map':'कैप्टन नक्शे पर लाइव है','Admin key':'एडमिन की','Name':'नाम','Continue':'आगे बढ़ें','Server error, try again':'सर्वर में दिक्कत, फिर कोशिश करें','Change':'बदलें','Open':'खुला','Choose':'चुनें'});
const t=k=>(lang==='hi'&&HI[k])||k;
const DAYS={en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],hi:['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि']};
let tok=localStorage.getItem('wn_tok'),U=null,DISTS=[],SVC=[],tab='home',cf='All',q='',rf='All',rd='my',bw='Now',bp='UPI',sig='',ls=1,LR='cust',LP='',LN='',LD='Dehradun',ORD=[],ACT=null,OFFERS=[],JOB=null,online=false,myPos=null,gpsId=null,tickN=0,fitKey='';
try{U=JSON.parse(localStorage.getItem('wn_user'))}catch(e){}
const CATS=[['All','All'],['H','Home services'],['R','Rides'],['E','Errands'],['S','Student'],['U','Uttarakhand']];
const ST={search:'Finding captain',accepted:'On the way',arrived:'Arrived',started:'In progress',done:'Completed',cancel:'Cancelled',expired:'Cancelled'};
const ACTIVE=['search','accepted','arrived','started'];

/* ---------- helpers ---------- */
async function api(m,p,b){const r=await fetch(p,{method:m,headers:Object.assign({'Content-Type':'application/json'},tok?{Authorization:'Bearer '+tok}:{}),body:b?JSON.stringify(b):undefined});let j={};try{j=await r.json()}catch(e){}
 if(!r.ok){if(r.status===401&&tok&&U){doLogout()}throw new Error(j.error||t('Server error, try again'))}return j}
function toast(m){let e=$('#toast');if(!e){$('#app').insertAdjacentHTML('beforeend','<div class="toast" id="toast"></div>');e=$('#toast')}e.textContent=m;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2200)}
const fail=e=>toast(e.message);
function sheet(h){let s=$('#sheet');if(!s){$('#app').insertAdjacentHTML('beforeend','<div class="sheet" id="sheet" onclick="if(event.target===this)closeS()"><div id="sb"></div></div>');s=$('#sheet')}$('#sb').innerHTML=h;s.classList.add('on')}
const closeS=()=>$('#sheet')&&$('#sheet').classList.remove('on');
const canRedraw=()=>!(document.querySelector('#sheet.on')||document.activeElement&&document.activeElement.matches('input,select'));
const chipRow=(arr,cur,fn)=>`<div class="chips">${arr.map(a=>`<button class="chip ${cur===a[0]?'on':''}" onclick="${fn}('${a[0]}')">${t(a[1])}</button>`).join('')}</div>`;
const dist=n=>DISTS.find(d=>d.name===n)||DISTS[0]||{factor:1,lat:30.3,lng:78};
const fareOf=(b,d)=>{const x=Math.round(b*(dist(d).factor-1)*.5/5)*5;return{base:b,t:x,fare:b+x}};
const icOf=n=>(SVC.find(s=>s.en===n)||{}).ic||'🛠️';
const lgBtn=()=>`<button class="lg" onclick="setLang('${lang==='en'?'hi':'en'}')">${lang==='en'?'हिन्दी':'English'}</button>`;
function setLang(l){lang=l;localStorage.setItem('wn_l',l);document.documentElement.lang=l;U?shell():login()}
const otpIn=()=>`<div class="otpg">${[0,1,2,3].map(i=>`<input class="ob2" type="tel" inputmode="numeric" maxlength="4" autocomplete="${i?'off':'one-time-code'}" aria-label="OTP ${i+1}" oninput="otpType(this,${i})" onkeydown="otpKey(event,${i})" onfocus="this.select()">`).join('')}</div>`;
function otpType(el,i){const bs=[...document.querySelectorAll('.ob2')],d=el.value.replace(/\D/g,'');if(!d){el.value='';bs.forEach(b=>b.classList.toggle('f',!!b.value));return}
 for(let k=0;k<d.length&&i+k<4;k++)bs[i+k].value=d[k];const nx=Math.min(i+d.length,3);setTimeout(()=>bs[nx].focus(),0);bs.forEach(b=>b.classList.toggle('f',!!b.value))}
function otpKey(e,i){const bs=[...document.querySelectorAll('.ob2')];if(e.key==='Backspace'){if(!bs[i].value&&i>0){e.preventDefault();bs[i-1].value='';bs[i-1].classList.remove('f');bs[i-1].focus()}else bs[i].classList.remove('f')}else if(e.key==='ArrowLeft'&&i>0)bs[i-1].focus();else if(e.key==='ArrowRight'&&i<3)bs[i+1].focus()}
const otpVal=()=>[...document.querySelectorAll('.ob2')].map(b=>b.value).join('');
const otpFocus=()=>setTimeout(()=>{const b=document.querySelector('.ob2');b&&b.focus()},80);

/* ---------- 3D map (MapLibre + free terrain tiles) ---------- */
let map=null,mk={},is3d=true;
function mkr(k,lng,lat,e){if(!map)return;if(mk[k]){mk[k].setLngLat([lng,lat]);return}const el=document.createElement('div');el.className='pin';el.textContent=e;mk[k]=new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([lng,lat]).addTo(map)}
const rmk=k=>{if(mk[k]){mk[k].remove();delete mk[k]}};const clearMk=p=>Object.keys(mk).filter(k=>k.startsWith(p)).forEach(rmk);
function initMap(){if(map){map.remove();map=null;mk={}}const el=$('#map');if(!el||!window.maplibregl){if(el)el.innerHTML='<div class="mut" style="padding:20px">Map could not load (check internet).</div>';return}
 const c=dist(U.d);
 map=new maplibregl.Map({container:el,center:[c.lng,c.lat],zoom:11.5,pitch:60,bearing:-20,maxPitch:80,attributionControl:{compact:true},
  style:{version:8,sources:{osm:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,maxzoom:19,attribution:'© OpenStreetMap'},dem:{type:'raster-dem',tiles:['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],encoding:'terrarium',tileSize:256,maxzoom:14,attribution:'Terrain: Mapzen/AWS'}},
   layers:[{id:'osm',type:'raster',source:'osm'},{id:'hill',type:'hillshade',source:'dem',paint:{'hillshade-exaggeration':.45}}],terrain:{source:'dem',exaggeration:1.5}}});
 map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'top-right');map.on('error',()=>{})}
function tog3d(){if(!map)return;is3d=!is3d;map.setTerrain(is3d?{source:'dem',exaggeration:1.5}:null);map.easeTo({pitch:is3d?60:0,bearing:is3d?-20:0,duration:700})}
function locate(cb){if(!navigator.geolocation){toast(t('Allow location access'));return}navigator.geolocation.getCurrentPosition(p=>{myPos={lat:p.coords.latitude,lng:p.coords.longitude};map&&map.flyTo({center:[myPos.lng,myPos.lat],zoom:14.5,duration:1200});cb&&cb()},()=>toast(t('Allow location access')),{enableHighAccuracy:true,timeout:9000})}
function showMap(){const w=$('#mapwrap');if(!w)return;const on=['home','duty'].includes(tab);w.classList.toggle('on',on);$('#xh').style.display=(U.role==='cust'&&!ACT)?'block':'none';if(on&&map)setTimeout(()=>map.resize(),50)}

/* ---------- login ---------- */
function login(){$('#app').innerHTML=`<div class="hero"><div class="row"><div style="font-size:34px;font-weight:800">WorkNow</div>${lgBtn()}</div><div style="font-weight:600">${t('Pure Uttarakhand, work is one tap away')}</div></div><div class="sc" id="lb"></div>`;lstep()}
function lstep(){const b=$('#lb');
if(ls===1)b.innerHTML=`<div class="h">${t('Who are you?')}</div><div class="chips" style="margin-bottom:10px">${[['cust','Customer'],['cap','Captain'],['admin','Admin']].map(r=>`<button class="chip ${LR===r[0]?'on':''}" onclick="LR='${r[0]}';keep();lstep()">${t(r[1])}</button>`).join('')}</div>
<input id="nm" placeholder="${t('Your name')}" value="${LN}" style="margin-bottom:8px"><select id="dd" style="margin-bottom:8px">${DISTS.map(d=>`<option ${d.name===LD?'selected':''}>${d.name}</option>`).join('')}</select>
<div class="row" style="margin-bottom:8px"><div class="card" style="margin:0;padding:11px">+91</div><input id="ph" inputmode="numeric" maxlength="10" placeholder="${t('10 digit mobile number')}" value="${LP}"></div>
${LR==='admin'?`<input id="ak" type="password" placeholder="${t('Admin key')}" style="margin-bottom:8px">`:''}
<button class="btn" onclick="sendOtp()">${t('Send OTP')}</button><p class="mut" style="margin-top:12px">${t('By continuing you agree to Terms and Privacy Policy.')}</p>`;
if(ls===2)b.innerHTML=`<div class="h">${t('Verify OTP')}</div><p class="mut">${t('Sent to')} +91 ${LP}</p>${otpIn()}<button class="btn" onclick="verify()">${t('Verify')}</button><button class="btn o" style="margin-top:8px" onclick="ls=1;lstep()">${t('Change')}</button>`;if(ls===2)otpFocus()}
function keep(){if($('#nm'))LN=$('#nm').value;if($('#dd'))LD=$('#dd').value;if($('#ph'))LP=$('#ph').value}
async function sendOtp(){keep();if(LP.length!==10){toast(t('Enter 10 digits'));return}try{const r=await api('POST','/api/auth/send-otp',{phone:LP});if(r.demo)toast(r.demo);ls=2;lstep()}catch(e){fail(e)}}
async function verify(){const otp=otpVal();if(otp.length<4){toast(t('Enter 10 digits').replace('10','4'));return}
 try{const r=await api('POST','/api/auth/verify',{phone:LP,otp,name:LN||'User',role:LR,district:LD,adminKey:$('#ak')?$('#ak').value:undefined});tok=r.token;U={phone:r.user.phone,name:r.user.name,d:r.user.district,role:r.user.role};save();ls=1;boot()}catch(e){fail(e)}}
function save(){localStorage.setItem('wn_tok',tok);localStorage.setItem('wn_user',JSON.stringify(U))}
function doLogout(){online=false;stopGps();tok=null;U=null;localStorage.removeItem('wn_tok');localStorage.removeItem('wn_user');ls=1;login()}
async function boot(){tab=U.role==='cust'?'home':U.role==='cap'?'duty':'ad';sig='';try{const m=await api('GET','/api/me');online=m.online;U.d=m.district}catch(e){}shell();if(online&&U.role==='cap')startGps()}

/* ---------- shell ---------- */
function shell(){const r=U.role;const nv={cust:[['home','🏠','Home'],['rooms','🏡','Rooms'],['orders','🧾','Orders'],['acc','👤','Account']],cap:[['duty','🛵','Duty'],['earn','💰','Earnings'],['acc','👤','Account']],admin:[['ad','📊','Dashboard'],['acc','👤','Account']]}[r];
$('#app').innerHTML=`<div class="top"><div class="row"><div><div class="mut" style="color:#111a">${t(r==='cap'?'Captain':r==='admin'?'Admin':'Your location')}</div><select id="ds" style="background:transparent;border:0;font-weight:800;font-size:17px;padding:0;width:auto">${DISTS.map(d=>`<option value="${d.name}" ${d.name===U.d?'selected':''}>${d.name}</option>`).join('')}</select></div><div style="text-align:right"><div style="font-weight:800;font-size:18px">WorkNow</div>${lgBtn()}</div></div></div>
<div id="mapwrap"><div id="map"></div><div id="xh">📍</div><div class="mbtns"><button onclick="tog3d()">3D</button><button onclick="locate()">◎</button></div></div><div class="sc" id="mn"></div><div class="nav" id="nav"></div>`;
$('#ds').onchange=async function(){U.d=this.value;save();if(U.role==='cap')try{await api('POST','/api/captain/online',{online,district:U.d})}catch(e){}const c=dist(U.d);map&&map.flyTo({center:[c.lng,c.lat],zoom:11.5});sig='';draw()};
$('#nav').innerHTML=nv.map(n=>`<button id="n_${n[0]}" onclick="go('${n[0]}')"><b>${n[1]}</b>${t(n[2])}</button>`).join('');
if(r!=='admin')initMap();go(tab)}
function go(x){tab=x;document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('on',b.id==='n_'+x));sig='';showMap();draw();if(x==='home'&&U.role==='cust'&&!myPos&&!ACT)locate()}
function draw(){const m=$('#mn');if(!m)return;showMap();m.innerHTML=({home:cHome,rooms:rooms,orders:cOrders,acc:acc,duty:capDuty,earn:capEarn,ad:admin})[tab]();if(tab==='earn')loadEarn();if(tab==='ad')loadAdmin();if(tab==='orders'||tab==='rooms')loadList()}

/* ---------- customer ---------- */
const fl=()=>SVC.filter(s=>(cf==='All'||s.cat===cf)&&(!q||(s.en+t(s.en)).toLowerCase().includes(q)));
const tiles=l=>l.map(s=>`<button class="tile" onclick="book(${s.id})"><i>${s.ic}</i>${t(s.en)}<small>₹${s.base}+</small></button>`).join('')||`<div class="mut">${t('Nothing found')}</div>`;
function live(){const o=ACT;if(!o)return'';const ic=icOf(o.service);
 if(o.status==='done')return`<div class="card"><div class="h" style="margin:0">⭐ ${ic} ${t(o.service)} – ₹${o.fare}</div><div class="mut">${t('Rate your captain')}</div><div class="row" style="margin:10px 0">${[1,2,3,4,5].map(i=>`<button style="font-size:30px" onclick="rate(${i})">⭐</button>`).join('')}</div><div class="chips">${[0,20,50,100].map(v=>`<button class="chip" onclick="rate(5,${v})">${t('Tip')} ₹${v}</button>`).join('')}</div></div>`;
 const k=ACTIVE.concat('done').indexOf(o.status);const msg=o.status==='search'?t('Finding a captain…'):o.status==='accepted'?`${o.capName||'Captain'} ${t('is on the way')}`:o.status==='arrived'?t('Captain arrived'):t('Work in progress');
 return`<div class="card" style="border:2px solid var(--y)">${o.status==='search'?'<div class="pulse">🔍</div>':''}<div class="row"><b>${ic} ${t(o.service)}</b><b>₹${o.fare}</b></div><div style="font-weight:800;margin:4px 0">${msg}</div><div class="row" style="margin:8px 0">${['Request','Accepted','Arrived','Work','Done'].map((s,i)=>`<div class="step ${i<k?'d':i===k?'c':''}"><i>${i<k?'✓':i+1}</i>${t(s)}</div>`).join('')}</div>
 ${o.otp?`<div class="card" style="background:var(--bg);margin:0 0 8px"><div class="mut">${t('Share this OTP with captain')}</div><div style="font-size:30px;font-weight:800;letter-spacing:10px">${o.otp}</div></div>`:''}
 ${o.status==='accepted'?`<div class="mut">${t('ETA')} ~${o.etaMin} ${t('min (hill terrain adjusted)')}</div>`:''}
 ${['search','accepted'].includes(o.status)?`<button class="btn o" style="margin-top:8px" onclick="cancel('${o.id}')">${t('Cancel')} (${o.status==='search'?t('free'):'₹20 '+t('fee')})</button>`:''}</div>`}
function cHome(){return`${live()}${ACT?'':`<div class="mut" style="margin-bottom:8px">📍 ${t('Work location = map pin. Move the map to set it.')}</div>`}<input id="qi" placeholder="🔍 ${t('What do you need done today?')}" value="${q}" oninput="q=this.value.toLowerCase();$('#sg').innerHTML=tiles(fl())">
<div class="ban"><div><b>${t('Hill work, every village')}</b><span>${t('Verified captains in all 13 districts')}</span></div><div onclick="go('rooms')"><b>${t('Rent or list a room')}</b><span>${t('Rooms, flats, PG and homestays')}</span></div><div><b>${t('Your city, your jobs')}</b><span>${t('Students earn with skills near them')}</span></div></div>
${chipRow(CATS,cf,'setCf')}<div class="h">${t('Services')}</div><div class="grid" id="sg">${tiles(fl())}</div>`}
const setCf=c=>{cf=c;draw()};
function book(id){const s=SVC[id],f=fareOf(s.base,U.d);
 sheet(`<div class="h" style="margin-top:0">${s.ic} ${t(s.en)}</div><input id="ad" placeholder="${t('Address / landmark')}" value="${window._ad||''}"><div class="mut" style="margin:6px 0">📍 ${t('Work location = map pin. Move the map to set it.')}</div><button class="chip" onclick="closeS();locate()">◎ ${t('Use my location')}</button><div class="mut" style="margin:10px 0 4px">${t('When')}</div>${chipRow([['Now','Now'],['Today evening','Today evening'],['Tomorrow','Tomorrow']],bw,'setW')}<div class="mut" style="margin:8px 0 4px">${t('Payment')}</div>${chipRow([['UPI','UPI'],['Cash','Cash']],bp,'setP')}
 <div class="card" style="margin-top:10px"><div class="row"><span>${t('Base fare')}</span><b>₹${f.base}</b></div><div class="row"><span>${t('Hill route')} (${U.d})</span><b>₹${f.t}</b></div><div class="row" style="border-top:1px solid var(--l);margin-top:6px;padding-top:6px"><b>${t('Total')}</b><b>₹${f.fare}</b></div></div><p class="mut">${t('Cancel is free before a captain accepts, ₹20 after.')}</p><button class="btn y" onclick="confirmBook(${id})">${t('Book now')} – ₹${f.fare}</button>`)}
function setW(v){bw=v;rebook()}function setP(v){bp=v;rebook()}
function rebook(){window._ad=$('#ad').value;book(+$('#sb').innerHTML.match(/confirmBook\((\d+)\)/)[1])}
async function confirmBook(id){const a=$('#ad').value.trim();if(!a){toast(t('Enter address'));return}const c=map?map.getCenter():null;
 try{await api('POST','/api/orders',{serviceId:id,address:a,when:bw,pay:bp,district:U.d,lat:c&&c.lat,lng:c&&c.lng});window._ad='';closeS();toast(t('Request sent'));await tick(true)}catch(e){fail(e)}}
async function cancel(id){try{await api('POST',`/api/orders/${id}/cancel`);toast(t('Cancelled'));await tick(true)}catch(e){fail(e)}}
async function rate(n,v){try{await api('POST',`/api/orders/${ACT.id}/rate`,{rating:n,tip:v||0});toast(t('Thank you!')+' '+n+'⭐');await tick(true)}catch(e){fail(e)}}
function cOrders(){return`<div class="h" style="margin-top:0">${t('My bookings')}</div><div id="ol"></div>`}
function loadList(){if(tab==='orders'){const l=ORD;$('#ol').innerHTML=l.map(o=>`<div class="card row"><div><b>${icOf(o.service)} ${t(o.service)}</b><div class="mut">${o.id} · ${o.district} · ${t(o.when||'Now')}</div></div><div style="text-align:right"><b>₹${o.fare}</b><div class="mut">${t(ST[o.status])}</div></div></div>`).join('')||`<div class="mut">${t('No bookings yet. Book your first service from Home.')}</div>`}}

/* ---------- rooms ---------- */
function rooms(){const T=[['All','All'],['Room','Room'],['Flat','Flat'],['PG','PG'],['Homestay','Homestay']];
 return`<div class="row"><div class="h" style="margin:0">${t('Rooms for rent')}</div><button class="chip on" onclick="addRoom()">＋ ${t('List your room')}</button></div>${chipRow(T,rf,'setRf')}<div class="chips" style="margin:6px 0 10px"><button class="chip ${rd==='my'?'on':''}" onclick="rd='my';draw()">${t('My district')}: ${U.d}</button><button class="chip ${rd==='all'?'on':''}" onclick="rd='all';draw()">${t('All Uttarakhand')}</button></div><div id="rl"></div><div class="mut">${t('Free to list. No commission on rent.')}</div>`}
const setRf=v=>{rf=v;draw()};
async function loadRooms(){try{const qs=new URLSearchParams();if(rd==='my')qs.set('district',U.d);if(rf!=='All')qs.set('type',rf);const l=await api('GET','/api/rooms?'+qs);
 $('#rl').innerHTML=l.map(r=>`<div class="card"><div class="row"><b>${{Room:'🛏️',Flat:'🏢',PG:'🧑‍🎓',Homestay:'🏔️'}[r.ty]} ${esc(r.t)}</b><b>₹${r.rent}</b></div><div class="mut">${t(r.ty)} · ${r.d} · ${t('per month')}</div><button class="btn o" style="margin-top:8px;padding:9px" onclick="contact('${r.id}')">📞 ${t('Contact owner')}</button></div>`).join('')||`<div class="mut">${t('No rooms here yet. Be the first to list.')}</div>`}catch(e){}}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function contact(id){try{const r=await api('POST',`/api/rooms/${id}/contact`);toast(t('Owner will call you back'))}catch(e){fail(e)}}
function addRoom(){sheet(`<div class="h" style="margin-top:0">${t('List your room')}</div><input id="rt" placeholder="${t('Title (e.g. Sunny room near market)')}" style="margin-bottom:8px"><input id="rr" inputmode="numeric" placeholder="${t('Rent per month ₹')}" style="margin-bottom:8px"><select id="ry" style="margin-bottom:12px">${['Room','Flat','PG','Homestay'].map(x=>`<option value="${x}">${t(x)}</option>`).join('')}</select><button class="btn y" onclick="postRoom()">${t('Post listing')}</button>`)}
async function postRoom(){const a=$('#rt').value.trim(),r=+$('#rr').value;if(!a||!r){toast(t('Enter title and rent'));return}try{await api('POST','/api/rooms',{title:a,rent:r,type:$('#ry').value,district:U.d});closeS();rd='my';draw();toast(t('Room listed'))}catch(e){fail(e)}}
const _ll=loadList;loadList=function(){_ll();if(tab==='rooms')loadRooms()};
function acc(){return`<div class="card"><b style="font-size:18px">${esc(U.name)}</b><div class="mut">+91 ${U.phone} · ${U.d} · ${t(U.role==='cap'?'Captain':U.role==='admin'?'Admin':'Customer')}</div></div><div class="card"><div class="mut" style="margin-bottom:6px">${t('Language')}</div><div class="chips"><button class="chip ${lang==='en'?'on':''}" onclick="setLang('en')">English</button><button class="chip ${lang==='hi'?'on':''}" onclick="setLang('hi')">हिन्दी</button></div></div><div class="card mut">${t('Help & support: in-app chat coming soon')}<br>${t('Terms · Privacy · Cancellation policy')}</div><button class="btn r" onclick="doLogout()">${t('Logout')}</button>`}

/* ---------- captain ---------- */
function startGps(){if(!navigator.geolocation||gpsId!==null)return;gpsId=navigator.geolocation.watchPosition(p=>{myPos={lat:p.coords.latitude,lng:p.coords.longitude};mkr('me',myPos.lng,myPos.lat,'🛵')},()=>toast(t('Allow location access')),{enableHighAccuracy:true,maximumAge:3000})}
function stopGps(){if(gpsId!==null){navigator.geolocation.clearWatch(gpsId);gpsId=null}rmk('me')}
async function setOnline(v){try{if(v){startGps();if(!myPos)locate()}await api('POST','/api/captain/online',{online:v,district:U.d});online=v;if(!v)stopGps();sig='';draw()}catch(e){fail(e)}}
function capDuty(){const j=JOB;return`<div class="card row"><div><b style="font-size:18px">${t(online?'You are Online':'You are Offline')}</b><div class="mut">${online?U.d+' '+t('jobs are coming'):t('Go online to get requests')}</div></div><button class="sw ${online?'on':''}" onclick="setOnline(${!online})"></button></div>${j?jobCard(j):online?`<div class="card" style="text-align:center"><div class="pulse">📡</div>${t('Waiting for requests…')}</div>`:''}`}
function jobCard(o){const k=['accepted','arrived','started'].indexOf(o.status),ic=icOf(o.service);
 return`<div class="card" style="border:2px solid var(--y)"><div class="row"><b>${ic} ${t(o.service)}</b><b>₹${o.fare}</b></div><div class="mut">📍 ${esc(o.address)}, ${o.district} · ${t(o.when||'Now')} · ${t(o.pay||'UPI')}</div><div class="row" style="margin:10px 0">${['Accepted','Arrived','Work'].map((s,i)=>`<div class="step ${i<k?'d':i===k?'c':''}"><i>${i<k?'✓':i+1}</i>${t(s)}</div>`).join('')}</div>
 ${o.status==='accepted'?`<div class="mut" style="margin-bottom:8px">${t('ETA')} ~${o.etaMin} ${t('min (hill terrain adjusted)')}</div><button class="btn y" onclick="jobAct('arrive')">📍 ${t('I have arrived')}</button>`:''}
 ${o.status==='arrived'?`<div class="mut">${t('Ask customer for the 4 digit OTP')}</div>${otpIn()}<button class="btn y" onclick="startJob()">${t('Start work')}</button>`:''}
 ${o.status==='started'?`<div class="card" style="background:var(--bg)"><div class="row"><b>${t('You earn')}</b><b style="color:var(--g)">₹${o.youEarn}</b></div></div><button class="btn y" onclick="jobAct('complete')">✅ ${t('Complete job')}</button>`:''}</div>`}
async function jobAct(a){try{const r=await api('POST',`/api/orders/${JOB.id}/${a}`);if(a==='complete')toast('₹'+r.youEarn+' '+t('added to your account'));await tick(true)}catch(e){fail(e)}}
async function startJob(){const v=otpVal();try{await api('POST',`/api/orders/${JOB.id}/start`,{otp:v});await tick(true)}catch(e){fail(e)}}
function reqPop(){const e=$('#rq');const o=OFFERS[0];if(U.role!=='cap'||!online||JOB||!o){e&&e.remove();return}if(e&&e.dataset.id===o.id)return;e&&e.remove();try{navigator.vibrate&&navigator.vibrate([300,100,300])}catch(x){}
 $('#app').insertAdjacentHTML('beforeend',`<div class="card req" id="rq" data-id="${o.id}" style="border:2px solid var(--y);box-shadow:0 14px 34px #0007"><div style="color:#d97706;font-weight:800">⚡ ${t('New job nearby')}</div><div class="row"><b style="font-size:19px">${icOf(o.service)} ${t(o.service)}</b><b style="font-size:19px">₹${o.fare}</b></div><div class="mut">${esc(o.address)} · ${t('You earn')} ₹${o.youEarn}</div><div class="row" style="margin-top:10px"><button class="btn o" onclick="skipR('${o.id}')">${t('Skip')}</button><button class="btn y" onclick="acceptR('${o.id}')">${t('Accept')}</button></div></div>`)}
async function skipR(id){try{await api('POST',`/api/orders/${id}/skip`);OFFERS=OFFERS.filter(x=>x.id!==id);reqPop()}catch(e){fail(e)}}
async function acceptR(id){try{await api('POST',`/api/orders/${id}/accept`);$('#rq')&&$('#rq').remove();await tick(true)}catch(e){fail(e);OFFERS=[];reqPop()}}
function capEarn(){return`<div class="h" style="margin-top:0">${t('Earnings')}</div><div id="eb"></div>`}
async function loadEarn(){try{const e=await api('GET','/api/captain/earnings');const mx=Math.max(...e.days.map(d=>d.earned),1);
 $('#eb').innerHTML=`<div class="card row"><b>${t('Total earnings')}</b><b style="color:var(--g);font-size:22px">₹${e.total}</b></div><div class="card row"><span>${t('Today net earnings')}</span><b>₹${e.today} · ${e.jobs} ${t('jobs')}</b></div><div class="card"><div class="bars">${e.days.map((d,i)=>`<div class="${i===6?'t':''}">${d.earned?'₹'+d.earned:''}<b style="height:${d.earned/mx*85}px"></b>${DAYS[lang][new Date(d.day).getDay()]}</div>`).join('')}</div></div>`}catch(e){}}

/* ---------- admin (only place commission is visible) ---------- */
function admin(){return`<div id="ab"><div class="mut">…</div></div>`}
async function loadAdmin(){try{const [s,l]=await Promise.all([api('GET','/api/admin/stats'),api('GET','/api/admin/ledger')]);
 $('#ab').innerHTML=`<div class="h" style="margin-top:0">${t('Dashboard')}</div><div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div class="card"><div class="mut">${t('Total booking value')}</div><b style="font-size:22px">₹${s.gmv}</b></div><div class="card" style="background:var(--y);color:#111"><div style="font-size:13px">${t('WorkNow earnings (8%)')}</div><b style="font-size:22px">₹${s.commission}</b></div><div class="card"><div class="mut">${t('Completed')}</div><b style="font-size:22px">${s.completed}</b></div><div class="card"><div class="mut">${t('Active orders')} / Online</div><b style="font-size:22px">${s.activeOrders} / ${s.captainsOnline}</b></div></div>
 <div class="h">${t('District-wise commission')}</div><div class="card">${Object.keys(s.byDistrict).map(d=>`<div class="row"><span>${d}</span><b>₹${s.byDistrict[d]}</b></div>`).join('')||'—'}</div><div class="h">${t('Ledger')}</div><div class="card"><table><tr><th>ID</th><th>${t('District')}</th><th>${t('Fare')}</th><th>8%</th><th>${t('Payout')}</th></tr>${l.slice(0,15).map(x=>`<tr><td>${x.id}</td><td>${x.d}</td><td>₹${x.fare}</td><td>₹${x.comm}</td><td>₹${x.net}</td></tr>`).join('')}</table></div>`}catch(e){}}

/* ---------- live loop ---------- */
let lastNear=0;
async function tick(force){if(!U||!tok)return;tickN++;try{
 if(U.role==='cust'){ORD=await api('GET','/api/orders/mine');ACT=ORD.find(x=>ACTIVE.includes(x.status)||(x.status==='done'&&!x.rated))||null;
  const s=JSON.stringify(ORD.map(x=>x.id+x.status+x.rated+(x.otp||'')));if(s!==sig||force){sig=s;(force||canRedraw())&&draw()}
  if(ACT&&['accepted','arrived','started'].includes(ACT.status)){const tr=await api('GET',`/api/orders/${ACT.id}/track`);clearMk('n');mkr('job',tr.job.lng,tr.job.lat,'📍');if(tr.captain){mkr('cap',tr.captain.lng,tr.captain.lat,'🛵');const fk=ACT.id+ACT.status;if(map&&fk!==fitKey){fitKey=fk;const b=new maplibregl.LngLatBounds([tr.job.lng,tr.job.lat],[tr.job.lng,tr.job.lat]);b.extend([tr.captain.lng,tr.captain.lat]);map.fitBounds(b,{padding:60,maxZoom:15,duration:1200})}}}
  else{rmk('job');rmk('cap');if(!ACT&&Date.now()-lastNear>8000){lastNear=Date.now();const n=await api('GET','/api/captains/nearby');clearMk('n');n.forEach((c,i)=>mkr('n'+i,c.lng,c.lat,'🛵'))}}
  showMap()}
 if(U.role==='cap'){if(myPos&&online&&tickN%2===0)api('POST','/api/captain/location',myPos).catch(()=>{});
  JOB=await api('GET','/api/captain/job');OFFERS=online&&!JOB?await api('GET','/api/captain/offers'):[];
  const s=JSON.stringify([JOB&&JOB.status,JOB&&JOB.id,online,OFFERS.length]);if(s!==sig||force){sig=s;(force||canRedraw())&&draw()}
  clearMk('o');OFFERS.forEach(o=>mkr('o'+o.id,o.lng,o.lat,'📍'));if(JOB){mkr('job',JOB.lng,JOB.lat,'📍')}else rmk('job');reqPop()}
 }catch(e){}}
setInterval(tick,3000);

(async function init(){try{[DISTS,SVC]=await Promise.all([api('GET','/api/districts'),api('GET','/api/services')])}catch(e){document.getElementById('app').innerHTML='<div style="padding:30px">Server not reachable. Start it with: node server.js</div>';return}
 U&&tok?boot():login()})();
