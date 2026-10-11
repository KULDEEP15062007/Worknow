/* wn-inline-css: style is bundled here so only this one file needs uploading */
(function(){const st=document.createElement('style');st.id='wn-inline-css';st.textContent=`
:root{--y:#ffd60a;--k:#111;--bg:#f3f3f1;--c:#fff;--m:#6b6b66;--l:#e6e6e1;--g:#16a34a;--r:#dc2626;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0e0e0d;--c:#1a1a18;--k:#f5f5f0;--m:#a3a39c;--l:#2c2c29}}
*{box-sizing:border-box}html,body{height:100%;margin:0}
body{font-family:Mukta,system-ui,sans-serif;background:var(--bg);color:var(--k)}
button,input,select{font:inherit;color:inherit}button{border:0;background:none;cursor:pointer}
input,select{background:var(--c);border:1.5px solid var(--l);border-radius:12px;padding:11px 12px;width:100%;outline:none}input:focus{border-color:var(--y)}
.app{max-width:430px;margin:0 auto;height:100%;display:flex;flex-direction:column;background:var(--bg);position:relative;overflow:hidden}
.top{background:var(--y);color:#111;padding:10px 14px 14px;border-radius:0 0 22px 22px}
.sc{flex:1;overflow-y:auto;padding:14px 14px 90px}
.card{background:var(--c);border:1px solid var(--l);border-radius:16px;padding:12px;margin-bottom:10px}
.btn{background:#111;color:#ffd60a;border-radius:14px;padding:13px;font-weight:800;width:100%;transition:transform .12s}
.btn:active{transform:scale(.97)}.btn.y{background:var(--y);color:#111}.btn.o{background:var(--c);color:var(--k);border:1.5px solid var(--l)}.btn.r{background:var(--r);color:#fff}
.h{font-weight:800;font-size:18px;margin:14px 0 8px}.mut{color:var(--m);font-size:13px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 6px}
.tile{text-align:center;font-size:11.5px;font-weight:600;line-height:1.15}
.tile i{display:flex;align-items:center;justify-content:center;height:62px;margin-bottom:4px;border-radius:16px;background:var(--c);border:1px solid var(--l);font-style:normal;font-size:28px;transition:.15s}
.tile:active i{transform:scale(.92);background:var(--y)}.tile small{display:block;color:var(--g);font-weight:700}
.chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}.chip{padding:6px 13px;border-radius:99px;border:1.5px solid var(--l);background:var(--c);white-space:nowrap;font-weight:700;font-size:13px}.chip.on{background:#111;color:#ffd60a;border-color:#111}
.nav{position:absolute;left:0;right:0;bottom:0;display:flex;background:var(--c);border-top:1px solid var(--l);padding-bottom:env(safe-area-inset-bottom,0px)}
.nav button{flex:1;padding:8px 0;font-size:12px;font-weight:700;color:var(--m)}.nav button.on{color:var(--k);box-shadow:inset 0 3px 0 var(--y)}.nav b{display:block;font-size:20px}
.sheet{position:absolute;inset:0;background:#0009;display:none;align-items:flex-end;z-index:30}.sheet.on{display:flex}
.sheet>div{background:var(--c);width:100%;border-radius:24px 24px 0 0;padding:16px;max-height:90%;overflow:auto;animation:up .28s}
@keyframes up{from{transform:translateY(100%)}}
.hero{background:var(--y);color:#111;padding:36px 22px 30px;border-radius:0 0 34px 34px}
.pulse{width:84px;height:84px;border-radius:50%;background:var(--y);margin:8px auto;display:flex;align-items:center;justify-content:center;font-size:34px;animation:pl 1.3s infinite}
@keyframes pl{0%{box-shadow:0 0 0 0 #ffd60aaa}100%{box-shadow:0 0 0 40px #ffd60a00}}
.req{position:absolute;left:10px;right:10px;top:10px;z-index:40;animation:vib .5s 3}
@keyframes vib{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}
.row{display:flex;justify-content:space-between;align-items:center;gap:8px}
.otp{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;width:100%}.otpw{position:relative;width:100%;margin:6px 0}.otpi{position:absolute;inset:0;width:100%;height:100%;opacity:0;z-index:2;font-size:16px}.ob{min-width:0;height:68px;border:2px solid var(--l);border-radius:12px;background:var(--c);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800}.ob.f{border-color:var(--y)}
.step{flex:1;text-align:center;font-size:10.5px;color:var(--m);position:relative}.step i{display:block;width:20px;height:20px;line-height:20px;margin:0 auto 3px;border-radius:50%;background:var(--l);font-style:normal;font-size:11px;position:relative;z-index:1}
.step.d i{background:var(--g);color:#fff}.step.c i{background:var(--y);color:#111}.step:not(:last-child):after{content:"";position:absolute;top:9px;left:50%;width:100%;height:3px;background:var(--l)}.step.d:not(:last-child):after{background:var(--g)}
.bars{display:flex;gap:6px;align-items:flex-end;height:120px}.bars div{flex:1;text-align:center;font-size:10px;display:flex;flex-direction:column;justify-content:flex-end;height:100%}.bars b{display:block;background:#111;border-radius:6px 6px 2px 2px;transition:height .5s}.bars .t b{background:var(--y);outline:1px solid #111}
.sw{position:relative;width:62px;height:34px;border-radius:99px;background:var(--l);transition:.25s;flex:none}.sw:after{content:"";position:absolute;top:3px;left:3px;width:28px;height:28px;border-radius:50%;background:#fff;transition:.25s}.sw.on{background:var(--g)}.sw.on:after{left:31px}
.toast{position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:9px 16px;border-radius:99px;font-size:13px;font-weight:700;opacity:0;transition:.3s;z-index:90;pointer-events:none;white-space:nowrap}.toast.on{opacity:1}
table{width:100%;font-size:12px;border-collapse:collapse}td,th{padding:6px 3px;border-bottom:1px solid var(--l);text-align:left}
.ban{display:flex;gap:10px;overflow-x:auto;margin:12px 0 4px;scroll-snap-type:x mandatory}.ban div{flex:none;width:86%;scroll-snap-align:start;border-radius:18px;padding:14px;background:#111;color:#ffd60a}.ban div:nth-child(2){background:#16a34a;color:#fff}.ban div:nth-child(3){background:#2563eb;color:#fff}.ban b{font-size:18px;display:block}.ban span{font-size:12.5px;color:#fff}
.lg{background:#1112;border-radius:99px;padding:4px 10px;font-weight:800;font-size:13px}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

.otpbig{width:100%;height:70px;font-size:36px;font-weight:800;text-align:center;letter-spacing:24px;text-indent:24px;border:2px solid var(--y);border-radius:16px;margin:8px 0}
#mapwrap{position:relative;height:250px;flex:none;display:none}#mapwrap.on{display:block}#map{position:absolute;inset:0}
#xh{position:absolute;left:50%;top:50%;font-size:34px;transform:translate(-50%,-100%);pointer-events:none;filter:drop-shadow(0 3px 3px #0008)}
.mbtns{position:absolute;left:10px;bottom:10px;display:grid;gap:8px;z-index:5}.mbtns button{width:42px;height:42px;border-radius:50%;background:#fff;color:#111;font-weight:800;box-shadow:0 2px 8px #0006}
.pin{font-size:30px;filter:drop-shadow(0 3px 3px #0009);line-height:1}
.top{border-radius:0}


.otpg{display:flex!important;flex-wrap:nowrap;justify-content:center;gap:12px;margin:14px 0;width:auto!important}
.ob2{flex:none!important;display:block;box-sizing:border-box;width:64px!important;min-width:64px!important;max-width:64px!important;height:76px!important;padding:0!important;text-align:center;font-size:34px;font-weight:800;border:2px solid var(--l);border-radius:16px;background:var(--c);color:var(--k);-webkit-appearance:none;appearance:none;box-shadow:0 2px 6px #0002}
.ob2:focus{border-color:var(--g);box-shadow:0 0 0 4px #16a34a40;outline:none}.ob2.f{border-color:var(--k)}

.bdot{width:18px;height:18px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 0 #2563ebaa;animation:bp 1.8s infinite}
@keyframes bp{0%{box-shadow:0 0 0 0 #2563ebaa}100%{box-shadow:0 0 0 22px #2563eb00}}
#mapwrap.full{flex:1;height:auto;min-height:0;margin-bottom:64px}
#mapcard{position:absolute;left:10px;right:10px;bottom:10px;z-index:6;max-height:60%;overflow:auto;display:none}#mapcard .card{margin:0;box-shadow:0 6px 24px #0004}
.mbtns{top:10px!important;bottom:auto!important}
@media(min-width:760px){.app{max-width:920px;box-shadow:0 0 40px #0002}.grid{grid-template-columns:repeat(6,1fr)}.sheet{align-items:center}.sheet>div{max-width:520px;margin:0 auto;border-radius:24px}#mapcard{left:50%;right:auto;width:440px;transform:translateX(-50%)}.sc{padding-left:24px;padding-right:24px}.ban div{width:46%}.nav button{max-width:200px}.nav{justify-content:center}}
`;document.head.appendChild(st)})();
'use strict';
/* WorkNow web app: talks to the real API (same origin) */
const $=s=>document.querySelector(s);
let lang=localStorage.getItem('wn_l')||'en';
Object.assign(HI,{'Allow location access':'लोकेशन की अनुमति दें','Use my location':'मेरी लोकेशन','Work location = map pin. Move the map to set it.':'काम की जगह = नक्शे का पिन। नक्शा खिसकाकर चुनें।','Captain is live on map':'कैप्टन नक्शे पर लाइव है','Admin key':'एडमिन की','Name':'नाम','Continue':'आगे बढ़ें','Server error, try again':'सर्वर में दिक्कत, फिर कोशिश करें','Change':'बदलें','Open':'खुला','Choose':'चुनें','Map':'नक्शा','Captains nearby':'पास में कैप्टन','Pick work location':'काम की जगह चुनें','Confirm location':'लोकेशन पक्की करें','Location set':'लोकेशन तय हो गई','Move the map under the pin':'नक्शा खिसकाकर पिन सही जगह लाएँ','Change on map':'नक्शे पर बदलें','Your GPS location':'आपकी GPS लोकेशन','Map pin':'नक्शे का पिन','District centre':'ज़िले का केंद्र','Drop location':'ड्रॉप लोकेशन','Choose on map':'नक्शे पर चुनें','Drop address / landmark':'ड्रॉप का पता / लैंडमार्क','Choose drop on map first':'पहले नक्शे पर ड्रॉप चुनें','Service is only in Uttarakhand':'सेवा सिर्फ़ उत्तराखंड में है','km away':'किमी दूर','Estimated distance':'अनुमानित दूरी','Turn on location to get jobs':'काम पाने के लिए लोकेशन चालू करें','Pickup location':'पिकअप लोकेशन','Not available here':'यहाँ उपलब्ध नहीं','Not available in':'उपलब्ध नहीं:','Waiting for admin approval':'एडमिन की मंज़ूरी का इंतज़ार'});
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

/* ---------- Map: Google Maps if GOOGLE_MAPS_KEY is set on server, else free flat map (MapLibre) ---------- */
let map=null,mk={},is3d=false,sat=localStorage.getItem('wn_sat')==='1',useG=false,CFG={},NEAR=[],pickMode=false,PICK=null,lastCard='',lastNear=0,routeLine=null,routeKey='',routeAt=0,ROUTE=null;
const emojiIcon=e=>({url:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><text x="22" y="34" font-size="32" text-anchor="middle">${e}</text></svg>`),scaledSize:new google.maps.Size(44,44),anchor:new google.maps.Point(22,40)});
function mkr(k,lng,lat,e){if(!map)return;if(mk[k]){useG?mk[k].setPosition({lat,lng}):mk[k].setLngLat([lng,lat]);return}
 if(useG){mk[k]=new google.maps.Marker({position:{lat,lng},map,icon:emojiIcon(e),optimized:false});return}
 const el=document.createElement('div');el.className='pin';el.textContent=e;mk[k]=new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([lng,lat]).addTo(map)}
function mkDot(k,lng,lat){if(!map)return;if(mk[k]){useG?mk[k].setPosition({lat,lng}):mk[k].setLngLat([lng,lat]);return}
 if(useG){mk[k]=new google.maps.Marker({position:{lat,lng},map,icon:{path:google.maps.SymbolPath.CIRCLE,scale:9,fillColor:'#2563eb',fillOpacity:1,strokeColor:'#fff',strokeWeight:3},zIndex:999});return}
 const el=document.createElement('div');el.className='bdot';mk[k]=new maplibregl.Marker({element:el}).setLngLat([lng,lat]).addTo(map)}
const rmk=k=>{if(mk[k]){useG?mk[k].setMap(null):mk[k].remove();delete mk[k]}};const clearMk=p=>Object.keys(mk).filter(k=>k.startsWith(p)).forEach(rmk);
function paintMe(){if(!map||!myPos)return;U&&U.role==='cap'?mkr('me',myPos.lng,myPos.lat,'🛵'):mkDot('me',myPos.lng,myPos.lat)}
function loadGoogle(k){return new Promise(res=>{if(window.google&&google.maps)return res(true);window.gm_authFailure=()=>{CFG.googleMapsKey=null;toast('Google Maps key problem – free map in use');if(U)shell()};window.__gm=()=>res(true);const s=document.createElement('script');s.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(k)+'&callback=__gm';s.async=true;s.onerror=()=>res(false);document.head.appendChild(s);setTimeout(()=>res(false),9000)})}
function initMap(){Object.keys(mk).forEach(rmk);if(map&&!useG)map.remove();map=null;routeKey='';lastNear=0;const el=$('#map');if(!el)return;const c=dist(U.d);
 useG=!!(CFG.googleMapsKey&&window.google&&google.maps&&google.maps.Map);
 if(useG){map=new google.maps.Map(el,{center:{lat:c.lat,lng:c.lng},zoom:12,disableDefaultUI:true,zoomControl:true,gestureHandling:'greedy',clickableIcons:false,mapTypeId:sat?'hybrid':'roadmap'});const b=$('#b3d');if(b)b.style.display='none';return}
 if(!window.maplibregl){el.innerHTML='<div class="mut" style="padding:20px">Map could not load (check internet).</div>';return}
 map=new maplibregl.Map({container:el,center:[c.lng,c.lat],zoom:12,pitch:0,bearing:0,maxPitch:80,attributionControl:{compact:true},
  style:{version:8,sources:{
   street:{type:'raster',tiles:['a','b','c','d'].map(x=>`https://${x}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png`),tileSize:256,maxzoom:19,attribution:'© OpenStreetMap, © CARTO'},
   sat:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],tileSize:256,maxzoom:19,attribution:'Imagery © Esri'},
   satlbl:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],tileSize:256,maxzoom:19},
   dem:{type:'raster-dem',tiles:['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],encoding:'terrarium',tileSize:256,maxzoom:14,attribution:'Terrain: Mapzen/AWS'}},
   layers:[{id:'street',type:'raster',source:'street'},{id:'sat',type:'raster',source:'sat',layout:{visibility:'none'}},{id:'satlbl',type:'raster',source:'satlbl',layout:{visibility:'none'}},{id:'hill',type:'hillshade',source:'dem',layout:{visibility:'none'},paint:{'hillshade-exaggeration':.3,'hillshade-shadow-color':'#4a5a4a'}}]}});
 map.on('load',applyBase);map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'top-right');map.on('error',()=>{})}
function applyBase(){if(!map)return;if(useG){map.setMapTypeId(sat?'hybrid':'roadmap');return}const v=(id,on)=>map.getLayer(id)&&map.setLayoutProperty(id,'visibility',on?'visible':'none');v('street',!sat);v('sat',sat);v('satlbl',sat);v('hill',!sat&&is3d)}
function togSat(){sat=!sat;localStorage.setItem('wn_sat',sat?'1':'0');applyBase();toast(sat?'🛰 Satellite':'🗺 Map')}
function tog3d(){if(!map||useG)return;is3d=!is3d;map.setTerrain(is3d?{source:'dem',exaggeration:1.2}:null);applyBase();map.easeTo({pitch:is3d?55:0,bearing:is3d?-20:0,duration:700})}
function flyTo(lng,lat,z){if(!map)return;if(useG){map.panTo({lat,lng});map.setZoom(z)}else map.flyTo({center:[lng,lat],zoom:z,duration:1000})}
function getC(){if(!map)return null;const c=map.getCenter();return useG?{lat:c.lat(),lng:c.lng()}:{lat:c.lat,lng:c.lng}}
function fitPts(p){if(!map)return;if(useG){const b=new google.maps.LatLngBounds();p.forEach(x=>b.extend({lat:x[1],lng:x[0]}));map.fitBounds(b,60)}else{const b=new maplibregl.LngLatBounds(p[0],p[0]);p.forEach(x=>b.extend(x));map.fitBounds(b,{padding:70,maxZoom:16,duration:1000})}}
function mapResize(){if(!map)return;useG?google.maps.event.trigger(map,'resize'):map.resize()}
/* red route line from captain to the work location (free OSRM road routing; straight line if it fails) */
function drawLine(pts){if(!map)return false;if(useG){routeLine&&routeLine.setMap(null);routeLine=new google.maps.Polyline({path:pts.map(p=>({lat:p[1],lng:p[0]})),strokeColor:'#e11d48',strokeWeight:5,map});return true}
 if(!map.isStyleLoaded())return false;const gj={type:'Feature',geometry:{type:'LineString',coordinates:pts}};
 if(map.getSource('route'))map.getSource('route').setData(gj);else{map.addSource('route',{type:'geojson',data:gj});const L={'line-cap':'round','line-join':'round'};map.addLayer({id:'routecase',type:'line',source:'route',layout:L,paint:{'line-color':'#fff','line-width':9}});map.addLayer({id:'routeline',type:'line',source:'route',layout:L,paint:{'line-color':'#e11d48','line-width':5}})}return true}
async function routeTo(a,b){if(!map||!a||!b)return;const key=[a.lat.toFixed(3),a.lng.toFixed(3),b.lat.toFixed(4),b.lng.toFixed(4)].join();if(key===routeKey||Date.now()-routeAt<8000)return;routeAt=Date.now();
 let pts=[[a.lng,a.lat],[b.lng,b.lat]];try{const r=await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`,{signal:AbortSignal.timeout?AbortSignal.timeout(4000):undefined});const j=await r.json();if(j.routes&&j.routes[0]){pts=j.routes[0].geometry.coordinates;ROUTE={min:Math.max(1,Math.round(j.routes[0].duration/60)),km:(j.routes[0].distance/1000).toFixed(1)}}}catch(e){}
 if(drawLine(pts))routeKey=key}
function clearRoute(){routeKey='';ROUTE=null;if(!map)return;if(useG){routeLine&&routeLine.setMap(null);routeLine=null}else if(map.getSource&&map.getSource('route'))map.getSource('route').setData({type:'FeatureCollection',features:[]})}
function locate(cb){if(!navigator.geolocation){toast(t('Allow location access'));return}navigator.geolocation.getCurrentPosition(p=>{myPos={lat:p.coords.latitude,lng:p.coords.longitude};paintMe();flyTo(myPos.lng,myPos.lat,15);cb&&cb()},()=>toast(t('Allow location access')),{enableHighAccuracy:true,timeout:9000})}
const inUK=(a,b)=>a>28.6&&a<31.6&&b>77.4&&b<81.2;
let AV={},avSel=10,DROP=null,QUOTE=null,pickFor={type:'pick',svc:null};
function startPick(type,svc){pickFor={type:type||'pick',svc:svc==null?null:svc};pickMode=true;go('map')}
function confirmPick(){const p=getC();if(!p||!inUK(p.lat,p.lng)){toast(t('Service is only in Uttarakhand'));return}if(pickFor.type==='drop')DROP=p;else PICK=p;QUOTE=null;pickMode=false;go('home');toast(t('Location set'));if(pickFor.svc!=null)setTimeout(()=>book(pickFor.svc),250)}
function mapCard(){if(ACT)return live();
 if(pickMode)return`<div class="card"><b>📍 ${t('Move the map under the pin')}</b><div class="row" style="margin-top:8px"><button class="btn o" onclick="pickMode=false;go('home')">${t('Cancel')}</button><button class="btn y" onclick="confirmPick()">${t('Confirm location')}</button></div></div>`;
 return`<div class="card"><div class="row"><b>🛵 ${t('Captains nearby')}: ${NEAR.length}</b><button class="chip on" onclick="startPick()">📍 ${t('Pick work location')}</button></div><div class="mut" style="margin-top:6px">🔵 ${t('Your GPS location')}</div></div>`}
function showMap(){const w=$('#mapwrap');if(!w)return;const cust=U.role==='cust',full=cust&&tab==='map',on=full||(U.role==='cap'&&tab==='duty');
 w.classList.toggle('on',on);w.classList.toggle('full',full);$('#mn').style.display=full?'none':'block';$('#xh').style.display=(full&&pickMode)?'block':'none';$('#xh').textContent=pickFor.type==='drop'?'🏁':'📍';
 const cd=$('#mapcard');cd.style.display=full?'block':'none';if(full){const h=mapCard();if(h!==lastCard){lastCard=h;cd.innerHTML=h}}
 if(on&&map)setTimeout(mapResize,50)}

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
async function boot(){tab=U.role==='cust'?'home':U.role==='cap'?'duty':'ad';sig='';try{const m=await api('GET','/api/me');online=m.online;U.d=m.district;U.approved=m.approved}catch(e){}shell();if(U.role==='cust'||(online&&U.role==='cap'))startGps()}

/* ---------- shell ---------- */
function shell(){const r=U.role;const nv={cust:[['home','🏠','Home'],['map','🗺','Map'],['rooms','🏡','Rooms'],['orders','🧾','Orders'],['acc','👤','Account']],cap:[['duty','🛵','Duty'],['earn','💰','Earnings'],['acc','👤','Account']],admin:[['ad','📊','Dashboard'],['acc','👤','Account']]}[r];
$('#app').innerHTML=`<div class="top"><div class="row"><div><div class="mut" style="color:#111a">${t(r==='cap'?'Captain':r==='admin'?'Admin':'Your location')}</div><select id="ds" style="background:transparent;border:0;font-weight:800;font-size:17px;padding:0;width:auto">${DISTS.map(d=>`<option value="${d.name}" ${d.name===U.d?'selected':''}>${d.name}</option>`).join('')}</select></div><div style="text-align:right"><div style="font-weight:800;font-size:18px">WorkNow</div>${lgBtn()}</div></div></div>
<div id="mapwrap"><div id="map"></div><div id="xh">📍</div><div class="mbtns"><button onclick="togSat()">🛰</button><button id="b3d" onclick="tog3d()">3D</button><button onclick="locate()">◎</button></div><div id="mapcard"></div></div><div class="sc" id="mn"></div><div class="nav" id="nav"></div>`;
$('#ds').onchange=async function(){U.d=this.value;save();if(U.role==='cap')try{await api('POST','/api/captain/online',{online,district:U.d})}catch(e){}const c=dist(U.d);flyTo(c.lng,c.lat,12);sig='';draw()};
$('#nav').innerHTML=nv.map(n=>`<button id="n_${n[0]}" onclick="go('${n[0]}')"><b>${n[1]}</b>${t(n[2])}</button>`).join('');
if(r!=='admin'){initMap();paintMe()}lastCard='';go(tab)}
function go(x){tab=x;document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('on',b.id==='n_'+x));sig='';showMap();draw();if(x==='map'&&U.role==='cust'){const p=PICK||myPos;if(p)setTimeout(()=>flyTo(p.lng,p.lat,15),150)}}
function draw(){const m=$('#mn');if(!m)return;showMap();m.innerHTML=({home:cHome,map:()=>'',rooms:rooms,orders:cOrders,acc:acc,duty:capDuty,earn:capEarn,ad:admin})[tab]();if(tab==='earn')loadEarn();if(tab==='ad')loadAdmin();if(tab==='orders'||tab==='rooms')loadList()}

/* ---------- customer ---------- */
const fl=()=>SVC.filter(s=>(cf==='All'||s.cat===cf)&&(!q||(s.en+t(s.en)).toLowerCase().includes(q)));
const avail=s=>!AV[s.id]||AV[s.id].includes(U.d);
const tiles=l=>l.map(s=>`<button class="tile" ${avail(s)?'':'style="opacity:.45;filter:grayscale(1)"'} onclick="book(${s.id})"><i>${s.ic}</i>${t(s.en)}<small ${avail(s)?'':'style="color:var(--r)"'}>${avail(s)?(s.kind==='km'?'₹'+s.perKm+'/km':'₹'+s.base+'+'):t('Not available here')}</small></button>`).join('')||`<div class="mut">${t('Nothing found')}</div>`;
function live(){const o=ACT;if(!o)return'';const ic=icOf(o.service);
 if(o.status==='done')return`<div class="card"><div class="h" style="margin:0">⭐ ${ic} ${t(o.service)} – ₹${o.fare}</div><div class="mut">${t('Rate your captain')}</div><div class="row" style="margin:10px 0">${[1,2,3,4,5].map(i=>`<button style="font-size:30px" onclick="rate(${i})">⭐</button>`).join('')}</div><div class="chips">${[0,20,50,100].map(v=>`<button class="chip" onclick="rate(5,${v})">${t('Tip')} ₹${v}</button>`).join('')}</div></div>`;
 const k=ACTIVE.concat('done').indexOf(o.status);const msg=o.status==='search'?t('Finding a captain…'):o.status==='accepted'?`${o.capName||'Captain'} ${t('is on the way')}`:o.status==='arrived'?t('Captain arrived'):t('Work in progress');
 return`<div class="card" style="border:2px solid var(--y)">${o.status==='search'?'<div class="pulse">🔍</div>':''}<div class="row"><b>${ic} ${t(o.service)}</b><b>₹${o.fare}</b></div><div style="font-weight:800;margin:4px 0">${msg}</div><div class="row" style="margin:8px 0">${['Request','Accepted','Arrived','Work','Done'].map((s,i)=>`<div class="step ${i<k?'d':i===k?'c':''}"><i>${i<k?'✓':i+1}</i>${t(s)}</div>`).join('')}</div>
 ${o.otp?`<div class="card" style="background:var(--bg);margin:0 0 8px"><div class="mut">${t('Share this OTP with captain')}</div><div style="font-size:30px;font-weight:800;letter-spacing:10px">${o.otp}</div></div>`:''}
 ${o.status==='accepted'?`<div class="mut">${t('ETA')} ~${ROUTE?ROUTE.min:o.etaMin} min${ROUTE?' · '+ROUTE.km+' km':''}</div>`:''}
 ${['search','accepted'].includes(o.status)?`<button class="btn o" style="margin-top:8px" onclick="cancel('${o.id}')">${t('Cancel')} (${o.status==='search'?t('free'):'₹20 '+t('fee')})</button>`:''}</div>`}
function cHome(){return`${live()}<input id="qi" placeholder="🔍 ${t('What do you need done today?')}" value="${q}" oninput="q=this.value.toLowerCase();$('#sg').innerHTML=tiles(fl())">
<div class="ban"><div><b>${t('Hill work, every village')}</b><span>${t('Verified captains in all 13 districts')}</span></div><div onclick="go('rooms')"><b>${t('Rent or list a room')}</b><span>${t('Rooms, flats, PG and homestays')}</span></div><div><b>${t('Your city, your jobs')}</b><span>${t('Students earn with skills near them')}</span></div></div>
${chipRow(CATS,cf,'setCf')}<div class="h">${t('Services')}</div><div class="grid" id="sg">${tiles(fl())}</div>`}
const setCf=c=>{cf=c;draw()};
const row=(a,b,top)=>`<div class="row" ${top?'style="border-top:1px solid var(--l);margin-top:6px;padding-top:6px"':''}><span>${a}</span><b>${b}</b></div>`;
function fareBox(s){if(s.kind==='km'){if(!QUOTE||QUOTE.id!==s.id)return`<div class="mut">${t('Choose drop on map first')}</div>`;return row(t('Base fare'),'₹'+QUOTE.base)+row(t('Estimated distance')+': '+QUOTE.km+' km','₹'+QUOTE.dist)+row(t('Hill route')+' ('+U.d+')','₹'+QUOTE.terrain)+row('<b>'+t('Total')+'</b>','₹'+QUOTE.fare,1)}
 const f=fareOf(s.base,U.d);return row(t('Base fare'),'₹'+f.base)+row(t('Hill route')+' ('+U.d+')','₹'+f.t)+row('<b>'+t('Total')+'</b>','₹'+f.fare,1)}
const fareNow=s=>s.kind==='km'?(QUOTE&&QUOTE.id===s.id?QUOTE.fare:null):fareOf(s.base,U.d).fare;
function book(id){const s=SVC[id],km=s.kind==='km',fa=fareNow(s);if(!avail(s)){toast(t('Not available in')+' '+U.d);return}
 sheet(`<div class="h" style="margin-top:0">${s.ic} ${t(s.en)}</div>
 <div class="row" style="margin:6px 0"><span class="mut">📍 ${t('Pickup location')}: ${t(PICK?'Map pin':myPos?'Your GPS location':'District centre')}</span><button class="chip" onclick="window._ad=$('#ad').value;closeS();startPick('pick',${id})">🗺 ${t('Change on map')}</button></div>
 <input id="ad" placeholder="${t('Address / landmark')}" value="${window._ad||''}">
 ${km?`<div class="row" style="margin:10px 0 6px"><span class="mut">🏁 ${t('Drop location')}: ${DROP?'✓':'—'}</span><button class="chip on" onclick="window._ad=$('#ad').value;window._da=$('#da').value;closeS();startPick('drop',${id})">🗺 ${t('Choose on map')}</button></div><input id="da" placeholder="${t('Drop address / landmark')}" value="${window._da||''}">`:''}
 <div class="mut" style="margin:10px 0 4px">${t('When')}</div>${chipRow([['Now','Now'],['Today evening','Today evening'],['Tomorrow','Tomorrow']],bw,'setW')}<div class="mut" style="margin:8px 0 4px">${t('Payment')}</div>${chipRow([['UPI','UPI'],['Cash','Cash']],bp,'setP')}
 <div class="card" style="margin-top:10px" id="fq">${fareBox(s)}</div><p class="mut">${t('Cancel is free before a captain accepts, ₹20 after.')}</p><button id="bb" class="btn y" onclick="confirmBook(${id})">${t('Book now')}${fa?' – ₹'+fa:''}</button>`);
 if(km&&DROP&&!(QUOTE&&QUOTE.id===id))getQuote(id)}
async function getQuote(id){const p=PICK||myPos||dist(U.d);try{const r=await api('POST','/api/quote',{serviceId:id,district:U.d,lat:p.lat,lng:p.lng,dLat:DROP.lat,dLng:DROP.lng});QUOTE=Object.assign(r,{id});if($('#fq')&&$('#bb')){$('#fq').innerHTML=fareBox(SVC[id]);$('#bb').textContent=t('Book now')+' – ₹'+r.fare}}catch(e){fail(e)}}
function setW(v){bw=v;rebook()}function setP(v){bp=v;rebook()}
function rebook(){window._ad=$('#ad').value;if($('#da'))window._da=$('#da').value;book(+$('#sb').innerHTML.match(/confirmBook\((\d+)\)/)[1])}
async function confirmBook(id){const s=SVC[id],a=$('#ad').value.trim();if(!a){toast(t('Enter address'));return}const c=PICK||myPos;
 if(c&&!inUK(c.lat,c.lng)){toast(t('Service is only in Uttarakhand'));return}
 const body={serviceId:id,address:a,when:bw,pay:bp,district:U.d,lat:c&&c.lat,lng:c&&c.lng};
 if(s.kind==='km'){if(!DROP){toast(t('Choose drop on map first'));return}body.dLat=DROP.lat;body.dLng=DROP.lng;body.daddr=($('#da').value||'').trim()}
 try{await api('POST','/api/orders',body);window._ad='';window._da='';DROP=null;QUOTE=null;closeS();toast(t('Request sent'));await tick(true)}catch(e){fail(e)}}
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
function startGps(){if(!navigator.geolocation||gpsId!==null)return;gpsId=navigator.geolocation.watchPosition(p=>{myPos={lat:p.coords.latitude,lng:p.coords.longitude};paintMe()},()=>{},{enableHighAccuracy:true,maximumAge:3000})}
function stopGps(){if(gpsId!==null){navigator.geolocation.clearWatch(gpsId);gpsId=null}rmk('me')}
async function setOnline(v){try{if(v){startGps();if(!myPos)locate()}await api('POST','/api/captain/online',{online:v,district:U.d});online=v;if(!v)stopGps();sig='';draw()}catch(e){fail(e)}}
function capDuty(){const j=JOB;return`<div class="card row"><div><b style="font-size:18px">${t(online?'You are Online':'You are Offline')}</b><div class="mut">${online?U.d+' '+t('jobs are coming'):t('Go online to get requests')}</div></div><button class="sw ${online?'on':''}" onclick="setOnline(${!online})"></button></div>${U.approved===false?`<div class="card" style="border:2px solid var(--y)">⏳ ${t('Waiting for admin approval')}</div>`:''}${online&&!myPos?`<div class="card" style="border:2px solid var(--r)">📡 ${t('Turn on location to get jobs')}</div>`:''}${j?jobCard(j):online?`<div class="card" style="text-align:center"><div class="pulse">📡</div>${t('Waiting for requests…')}</div>`:''}`}
function jobCard(o){const k=['accepted','arrived','started'].indexOf(o.status),ic=icOf(o.service);
 return`<div class="card" style="border:2px solid var(--y)"><div class="row"><b>${ic} ${t(o.service)}</b><b>₹${o.fare}</b></div><div class="mut">📍 ${esc(o.address)}, ${o.district} · ${t(o.when||'Now')} · ${t(o.pay||'UPI')}</div>${o.km?`<div class="mut">🏁 ${esc(o.daddr||'')} · ${o.km} km</div>`:''}<div class="row" style="margin:10px 0">${['Accepted','Arrived','Work'].map((s,i)=>`<div class="step ${i<k?'d':i===k?'c':''}"><i>${i<k?'✓':i+1}</i>${t(s)}</div>`).join('')}</div>
 ${o.status==='accepted'?`<div class="mut" style="margin-bottom:8px">${t('ETA')} ~${ROUTE?ROUTE.min:o.etaMin} min${ROUTE?' · '+ROUTE.km+' km':''}</div><button class="btn y" onclick="jobAct('arrive')">📍 ${t('I have arrived')}</button>`:''}
 ${o.status==='arrived'?`<div class="mut">${t('Ask customer for the 4 digit OTP')}</div>${otpIn()}<button class="btn y" onclick="startJob()">${t('Start work')}</button>`:''}
 ${o.status==='started'?`<div class="card" style="background:var(--bg)"><div class="row"><b>${t('You earn')}</b><b style="color:var(--g)">₹${o.youEarn}</b></div></div><button class="btn y" onclick="jobAct('complete')">✅ ${t('Complete job')}</button>`:''}</div>`}
async function jobAct(a){try{const r=await api('POST',`/api/orders/${JOB.id}/${a}`);if(a==='complete')toast('₹'+r.youEarn+' '+t('added to your account'));await tick(true)}catch(e){fail(e)}}
async function startJob(){const v=otpVal();try{await api('POST',`/api/orders/${JOB.id}/start`,{otp:v});await tick(true)}catch(e){fail(e)}}
function reqPop(){const e=$('#rq');const o=OFFERS[0];if(U.role!=='cap'||!online||JOB||!o){e&&e.remove();return}if(e&&e.dataset.id===o.id)return;e&&e.remove();try{navigator.vibrate&&navigator.vibrate([300,100,300])}catch(x){}
 $('#app').insertAdjacentHTML('beforeend',`<div class="card req" id="rq" data-id="${o.id}" style="border:2px solid var(--y);box-shadow:0 14px 34px #0007"><div style="color:#d97706;font-weight:800">⚡ ${t('New job nearby')}</div><div class="row"><b style="font-size:19px">${icOf(o.service)} ${t(o.service)}</b><b style="font-size:19px">₹${o.fare}</b></div><div class="mut">📍 ${o.distKm} ${t('km away')} · ${esc(o.address)}${o.km?` · 🏁 ${o.km} km`:''} · ${t('You earn')} ₹${o.youEarn}</div><div class="row" style="margin-top:10px"><button class="btn o" onclick="skipR('${o.id}')">${t('Skip')}</button><button class="btn y" onclick="acceptR('${o.id}')">${t('Accept')}</button></div></div>`)}
async function skipR(id){try{await api('POST',`/api/orders/${id}/skip`);OFFERS=OFFERS.filter(x=>x.id!==id);reqPop()}catch(e){fail(e)}}
async function acceptR(id){try{await api('POST',`/api/orders/${id}/accept`);$('#rq')&&$('#rq').remove();await tick(true)}catch(e){fail(e);OFFERS=[];reqPop()}}
function capEarn(){return`<div class="h" style="margin-top:0">${t('Earnings')}</div><div id="eb"></div>`}
async function loadEarn(){try{const e=await api('GET','/api/captain/earnings');const mx=Math.max(...e.days.map(d=>d.earned),1);
 $('#eb').innerHTML=`<div class="card row"><b>${t('Total earnings')}</b><b style="color:var(--g);font-size:22px">₹${e.total}</b></div><div class="card row"><span>${t('Today net earnings')}</span><b>₹${e.today} · ${e.jobs} ${t('jobs')}</b></div><div class="card"><div class="bars">${e.days.map((d,i)=>`<div class="${i===6?'t':''}">${d.earned?'₹'+d.earned:''}<b style="height:${d.earned/mx*85}px"></b>${DAYS[lang][new Date(d.day).getDay()]}</div>`).join('')}</div></div>`}catch(e){}}

/* ---------- admin (only place commission is visible) ---------- */
function admin(){return`<div id="ab"><div class="mut">…</div></div>`}
async function loadAdmin(){try{const [s,l]=await Promise.all([api('GET','/api/admin/stats'),api('GET','/api/admin/ledger')]);
 $('#ab').innerHTML=`<div class="h" style="margin-top:0">${t('Dashboard')}</div><div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div class="card"><div class="mut">${t('Total booking value')}</div><b style="font-size:22px">₹${s.gmv}</b></div><div class="card" style="background:var(--y);color:#111"><div style="font-size:13px">${t('WorkNow earnings (8%)')}</div><b style="font-size:22px">₹${s.commission}</b></div><div class="card"><div class="mut">${t('Completed')}</div><b style="font-size:22px">${s.completed}</b></div><div class="card"><div class="mut">${t('Active orders')} / Online</div><b style="font-size:22px">${s.activeOrders} / ${s.captainsOnline}</b></div></div>
 <div class="h">${t('District-wise commission')}</div><div class="card">${Object.keys(s.byDistrict).map(d=>`<div class="row"><span>${d}</span><b>₹${s.byDistrict[d]}</b></div>`).join('')||'—'}</div><div class="h">${t('Ledger')}</div><div class="card"><table><tr><th>ID</th><th>${t('District')}</th><th>${t('Fare')}</th><th>8%</th><th>${t('Payout')}</th></tr>${l.slice(0,15).map(x=>`<tr><td>${x.id}</td><td>${x.d}</td><td>₹${x.fare}</td><td>₹${x.comm}</td><td>₹${x.net}</td></tr>`).join('')}</table></div><div id="ac"></div>`;loadAdmin2()}catch(e){}}

/* ---------- live loop ---------- */
async function tick(force){if(!U||!tok)return;tickN++;if(tickN%10===0)loadAv();try{
 if(U.role==='cust'){ORD=await api('GET','/api/orders/mine');ACT=ORD.find(x=>ACTIVE.includes(x.status)||(x.status==='done'&&!x.rated))||null;
  const s=JSON.stringify(ORD.map(x=>x.id+x.status+x.rated+(x.otp||'')));if(s!==sig||force){sig=s;(force||canRedraw())&&draw()}
  if(ACT&&['accepted','arrived','started'].includes(ACT.status)){const tr=await api('GET',`/api/orders/${ACT.id}/track`);clearMk('n');mkr('job',tr.job.lng,tr.job.lat,'📍');if(ACT.dlat)mkr('drop',ACT.dlng,ACT.dlat,'🏁');
   if(tr.captain){mkr('cap',tr.captain.lng,tr.captain.lat,'🛵');const fk=ACT.id+ACT.status;if(map&&fk!==fitKey){fitKey=fk;fitPts([[tr.job.lng,tr.job.lat],[tr.captain.lng,tr.captain.lat]])}
    if(ACT.status!=='started')await routeTo(tr.captain,tr.job);else clearRoute()}}
  else{rmk('job');rmk('cap');rmk('drop');clearRoute();if(!ACT&&Date.now()-lastNear>8000){lastNear=Date.now();NEAR=await api('GET','/api/captains/nearby');clearMk('n');NEAR.forEach((c,i)=>mkr('n'+i,c.lng,c.lat,'🛵'))}}
  showMap()}
 if(U.role==='cap'){if(myPos&&online&&tickN%2===0)api('POST','/api/captain/location',myPos).catch(()=>{});
  JOB=await api('GET','/api/captain/job');OFFERS=online&&!JOB?await api('GET','/api/captain/offers'):[];
  const s=JSON.stringify([JOB&&JOB.status,JOB&&JOB.id,online,OFFERS.length]);if(s!==sig||force){sig=s;(force||canRedraw())&&draw()}
  clearMk('o');OFFERS.forEach(o=>mkr('o'+o.id,o.lng,o.lat,'📍'));if(JOB){mkr('job',JOB.lng,JOB.lat,'📍');if(JOB.dlat)mkr('drop',JOB.dlng,JOB.dlat,'🏁');if(JOB.status==='accepted'&&myPos)routeTo(myPos,JOB);else clearRoute()}else{rmk('job');rmk('drop');clearRoute()}reqPop()}
 }catch(e){}}
setInterval(tick,3000);

(async function init(){try{[DISTS,SVC]=await Promise.all([api('GET','/api/districts'),api('GET','/api/services')]);try{AV=await api('GET','/api/availability')}catch(e){}try{CFG=await api('GET','/api/config');if(CFG.googleMapsKey)await loadGoogle(CFG.googleMapsKey)}catch(e){}}catch(e){document.getElementById('app').innerHTML='<div style="padding:30px">Server not reachable. Start it with: node server.js</div>';return}
 U&&tok?boot():login()})();

async function loadAv(){try{AV=await api('GET','/api/availability')}catch(e){}}
async function capOk(p,v){try{await api('POST','/api/admin/captain',{phone:p,approved:v});loadAdmin2()}catch(e){fail(e)}}
async function avSet(id,d,on){try{await api('POST','/api/admin/availability',{serviceId:id,district:d,on});await loadAv();loadAdmin2()}catch(e){fail(e)}}
async function loadAdmin2(){try{const [cp,av]=await Promise.all([api('GET','/api/admin/captains'),api('GET','/api/admin/availability')]);const sv=SVC[avSel],on=av[avSel]||[];
 $('#ac').innerHTML=`<div class="h">Captains</div><div class="card">${cp.map(x=>`<div class="row" style="margin-bottom:6px"><span>${esc(x.name)} · ${x.phone} · ${x.district}${x.online?' 🟢':''}</span><button class="chip ${x.approved?'on':''}" onclick="capOk('${x.phone}',${!x.approved})">${x.approved?'Approved ✓':'Approve'}</button></div>`).join('')||'—'}</div>
 <div class="h">Service availability</div><div class="chips" style="margin-bottom:8px">${SVC.map(s=>`<button class="chip ${s.id===avSel?'on':''}" onclick="avSel=${s.id};loadAdmin2()">${s.ic}</button>`).join('')}</div>
 <div class="card"><b>${sv.ic} ${sv.en}</b><div class="chips" style="flex-wrap:wrap;margin-top:8px">${DISTS.map(d=>`<button class="chip ${on.includes(d.name)?'on':''}" onclick="avSet(${avSel},'${d.name}',${!on.includes(d.name)})">${d.name}</button>`).join('')}</div></div>`}catch(e){}}
