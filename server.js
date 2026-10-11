'use strict';
/* WorkNow backend: zero dependencies (Node 18+). Run: node server.js */
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const PORT=+process.env.PORT||3000, COMMISSION=+process.env.COMMISSION||0.08;
const ADMIN_KEY=process.env.ADMIN_KEY||'change-me', DEMO=process.env.OTP_MODE!=='sms';
const DB_FILE=process.env.DB_FILE||path.join(__dirname,'data.json');

const DIST={'Dehradun':1,'Haridwar':1,'Udham Singh Nagar':1,'Nainital':1.2,'Pauri Garhwal':1.3,'Tehri Garhwal':1.4,'Almora':1.4,'Bageshwar':1.5,'Champawat':1.5,'Rudraprayag':1.6,'Pithoragarh':1.7,'Chamoli':1.8,'Uttarkashi':1.8};
const ICONS=['🧹','🔧','⚡','🪚','🎨','❄️','💇','🐜','🍳','🧺','🏍️','🛺','🚕','🚚','🛒','📦','💊','🔥','💧','📚','💻','📸','🎒','🚜','⛰️','👵','🎪','🛕','🍎','🪔'];
const DC={'Dehradun':[30.32,78.03],'Haridwar':[29.95,78.16],'Udham Singh Nagar':[28.98,79.40],'Nainital':[29.39,79.46],'Pauri Garhwal':[30.15,78.77],'Tehri Garhwal':[30.38,78.43],'Almora':[29.60,79.66],'Bageshwar':[29.84,79.77],'Champawat':[29.33,80.09],'Rudraprayag':[30.28,78.98],'Pithoragarh':[29.58,80.22],'Chamoli':[30.41,79.33],'Uttarkashi':[30.73,78.44]};
const inUK=(a,b)=>a>28.6&&a<31.6&&b>77.4&&b<81.2;
const KM={10:[20,8,30],11:[30,12,40],12:[50,16,80],13:[150,25,200],15:[30,9,40]}; /* serviceId:[base, per km, minimum fare] in Rs - edit to your real city rates */
const hav=(a,b,c,d)=>{const r=x=>x*Math.PI/180,h=Math.sin(r(c-a)/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(r(d-b)/2)**2;return 12742*Math.asin(Math.sqrt(h))};
const roadKm=(a,b,c,d)=>+(hav(a,b,c,d)*1.4).toFixed(1); /* straight line x 1.4 = approx road distance in hills */
const SERVICES=[['Home cleaning','घर की सफाई',250,'H'],['Plumber','प्लंबर',200,'H'],['Electrician','इलेक्ट्रीशियन',200,'H'],['Carpenter','बढ़ई',300,'H'],['Painter','पेंटर',500,'H'],['AC / Geyser repair','AC / गीज़र मरम्मत',350,'H'],['Salon at home','घर पर सैलून',400,'H'],['Pest control','कीट नियंत्रण',600,'H'],['Cook','रसोइया',300,'H'],['Laundry pickup','लॉन्ड्री पिकअप',120,'H'],['Bike taxi','बाइक टैक्सी',40,'R'],['Auto','ऑटो',60,'R'],['Hill taxi','पहाड़ी टैक्सी',150,'R'],['Mini truck','मिनी ट्रक',350,'R'],['Groceries','किराना',40,'E'],['Parcel','पार्सल',60,'E'],['Medicine','दवाई',50,'E'],['Gas cylinder','गैस सिलेंडर',60,'E'],['Water tanker','पानी टैंकर',400,'E'],['Tuition','ट्यूशन',150,'S'],['Data entry','डेटा एंट्री',300,'S'],['Event photos','इवेंट फ़ोटो',500,'S'],['Porter','कुली',150,'U'],['Farm labour','खेत मज़दूर',450,'U'],['Trek guide','ट्रेक गाइड',800,'U'],['Elder care','बुज़ुर्ग देखभाल',600,'U'],['Mela / wedding help','मेला / शादी सहायक',500,'U'],['Yatra helper','यात्रा सहायक',400,'U'],['Mandi fruit & veg','मंडी से फल-सब्ज़ी',90,'U'],['Pandit / puja','पंडित / पूजा',700,'U']].map((s,i)=>({id:i,ic:ICONS[i],en:s[0],hi:s[1],base:KM[i]?KM[i][0]:s[2],cat:s[3],kind:KM[i]?'km':'fixed',perKm:KM[i]?KM[i][1]:0,minFare:KM[i]?KM[i][2]:0}));

/* ---------- storage (JSON file, atomic write) ---------- */
let db={users:{},orders:[],ledger:[],rooms:[],otps:{},secret:crypto.randomBytes(32).toString('hex')};
try{db=Object.assign(db,JSON.parse(fs.readFileSync(DB_FILE,'utf8')))}catch(e){}
const UP_URL=process.env.UPSTASH_REDIS_REST_URL,UP_TOK=process.env.UPSTASH_REDIS_REST_TOKEN,UP_KEY='worknow:db';
async function up(cmd){const r=await fetch(UP_URL,{method:'POST',headers:{Authorization:'Bearer '+UP_TOK,'Content-Type':'application/json'},body:JSON.stringify(cmd)});const j=await r.json();if(j.error)throw new Error(j.error);return j.result}
const snap=()=>JSON.stringify(Object.assign({},db,{orders:db.orders.slice(0,400),otps:{}}));
let dirty=false;const save=()=>{dirty=true};
async function persist(){if(UP_URL)await up(['SET',UP_KEY,snap()]);else{fs.writeFileSync(DB_FILE+'.tmp',snap());fs.renameSync(DB_FILE+'.tmp',DB_FILE)}}
setInterval(()=>{if(!dirty)return;dirty=false;persist().catch(e=>{dirty=true;console.error('save failed',e.message)})},UP_URL?4000:1000).unref();
const flush=()=>UP_URL?persist():(fs.writeFileSync(DB_FILE+'.tmp',snap()),fs.renameSync(DB_FILE+'.tmp',DB_FILE));

/* ---------- helpers ---------- */
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const eq=(a,b)=>{a=Buffer.from(String(a));b=Buffer.from(String(b));return a.length===b.length&&crypto.timingSafeEqual(a,b)};
const b64=o=>Buffer.from(JSON.stringify(o)).toString('base64url');
const sign=p=>{const b=b64(p);return b+'.'+crypto.createHmac('sha256',db.secret).update(b).digest('base64url')};
function unsign(t){const [b,s]=String(t||'').split('.');if(!b||!s)return null;const x=crypto.createHmac('sha256',db.secret).update(b).digest('base64url');if(!eq(s,x))return null;const p=JSON.parse(Buffer.from(b,'base64url'));return p.exp>Date.now()?p:null}
class HttpErr extends Error{constructor(c,m){super(m);this.code=c}}
const bad=(c,m)=>{throw new HttpErr(c,m)};
const today=()=>new Date().toDateString();
/* SERVICE AREA (like Rapido's city geofence): pickup and drop must be within AREA_KM of a district town, and each vehicle has a maximum trip length */
const AREA_KM=70,MAXKM={10:25,11:30,12:100,13:60,15:40};
const nearestDist=(lat,lng)=>{let b=null,m=1e9;for(const n in DC){const d=hav(lat,lng,DC[n][0],DC[n][1]);if(d<m){m=d;b=n}}return{name:b,km:m}};
const inArea=(lat,lng)=>inUK(lat,lng)&&nearestDist(lat,lng).km<=AREA_KM;
const AREA_MSG='Service is not available at this location. We work only around Uttarakhand towns.';
/* WHERE EACH SERVICE RUNS (admin can change this in the Admin screen). Default: bike taxi + auto only in the plains/major towns. */
const PLAIN=['Dehradun','Haridwar','Udham Singh Nagar','Nainital'],REQUIRE=process.env.REQUIRE_APPROVAL==='1';
const getAvail=()=>db.avail||(db.avail={10:PLAIN.slice(),11:PLAIN.slice()});
const availOK=(id,d)=>{const a=getAvail()[id];return !a||a.includes(d)};
const NA=(svc,d)=>`${svc.en} is not available in ${d} yet`;
const isApproved=u=>u.approved!==false;
const priceOf=(svc,d,km)=>{if(svc.kind!=='km'){const t=Math.round(svc.base*(DIST[d]-1)*.5/5)*5;return{base:svc.base,dist:0,terrain:t,fare:svc.base+t}}const road=svc.perKm*km,t=Math.round(road*(DIST[d]-1)*.5);return{base:svc.base,dist:Math.round(road),terrain:t,fare:Math.max(svc.minFare,Math.round(svc.base+road+t))}};
const radiusKm=o=>{const a=(Date.now()-o.at)/1000;return a<30?3:a<60?6:a<90?10:15}; /* search widens: 3 km, 6, 10, then 15 */
const freshLoc=u=>!!(u&&u.loc&&Date.now()-u.loc.at<120000);
const etaMin=d=>Math.round(8*DIST[d]);
const rate={};function limit(key,max,ms){const n=Date.now(),a=(rate[key]||[]).filter(t=>n-t<ms);if(a.length>=max)bad(429,'Too many attempts, try later');a.push(n);rate[key]=a}
function sendSms(phone,otp){console.log(`[SMS stub] OTP for ${phone}: ${otp}`)} /* plug MSG91 / Twilio here when OTP_MODE=sms */

/* ---------- views: commission is never exposed to customers/captains ---------- */
function view(o,role){const v={id:o.id,service:o.svc,district:o.d,address:o.addr,when:o.when,pay:o.pay,status:o.st,createdAt:o.at,capName:o.capName||null,km:o.km||0,daddr:o.daddr||'',dlat:o.dlat,dlng:o.dlng,lat:role==='cap'&&o.st==='search'?+o.lat.toFixed(2):o.lat,lng:role==='cap'&&o.st==='search'?+o.lng.toFixed(2):o.lng};
 if(role==='cust'){v.fare=o.fare;v.breakdown={base:o.base,distance:o.dist||0,terrain:o.terrain};if(o.st==='search')v.searchKm=radiusKm(o);if(['accepted','arrived'].includes(o.st))v.otp=o.otp;if(o.st==='accepted')v.etaMin=etaMin(o.d);v.rated=!!o.rated}
 else if(role==='cap'){v.fare=o.fare;v.youEarn=o.fare-Math.round(o.fare*COMMISSION);if(o.st==='accepted')v.etaMin=etaMin(o.d)}
 else Object.assign(v,{fare:o.fare,commission:o.comm||Math.round(o.fare*COMMISSION),cust:o.cust,cap:o.cap||null});return v}

/* ---------- order engine ---------- */
function finish(o){o.st='done';o.comm=Math.round(o.fare*COMMISSION);o.net=o.fare-o.comm;o.doneAt=Date.now();db.ledger.push({id:o.id,type:'job',d:o.d,fare:o.fare,comm:o.comm,net:o.net,cap:o.cap,day:today(),at:Date.now()});save()}
const activeJob=ph=>db.orders.find(o=>o.cap===ph&&['accepted','arrived','started'].includes(o.st));
setInterval(()=>{let ch=0;db.orders.forEach(o=>{if(o.st==='search'&&Date.now()-o.at>180000){o.st='expired';ch=1}});if(ch)save()},10000).unref();


/* ---------- optional demo captain (DEMO_BOT=1): accepts jobs nobody took, so you can test alone ---------- */
const BOT=process.env.DEMO_BOT==='1',K=+process.env.BOT_SPEED||1;
setInterval(()=>{if(!BOT)return;let ch=0;const n=Date.now();db.orders.forEach(o=>{
 if(o.st==='search'&&n-o.at>12000*K){o.st='accepted';o.cap='bot';o.capName='Ramesh (demo captain)';o.ast=n;o.bot={lat:o.lat+.012,lng:o.lng+.012};ch=1}
 else if(o.cap==='bot'&&['accepted','arrived','started'].includes(o.st)){const a=n-o.ast;
  if(o.st==='accepted'){o.bot.lat+=(o.lat-o.bot.lat)*.25;o.bot.lng+=(o.lng-o.bot.lng)*.25;if(a>10000*K){o.st='arrived';o.ast=n;ch=1}}
  else if(o.st==='arrived'&&a>8000*K){o.st='started';o.ast=n;ch=1}
  else if(o.st==='started'&&a>10000*K){finish(o);ch=1}
  db.users.bot=db.users.bot||{phone:'bot',name:'Ramesh',district:o.d};db.users.bot.loc={lat:o.bot.lat,lng:o.bot.lng,at:n}}});if(ch)save()},Math.max(100,2000*K)).unref();
/* ---------- routes ---------- */
const R=[];const route=(m,p,roles,fn)=>R.push({m,re:new RegExp('^'+p.replace(/:(\w+)/g,'(?<$1>[^/]+)')+'$'),roles,fn});
route('GET','/api/health',null,()=>({ok:true,commissionPct:undefined,time:Date.now()}));
route('GET','/api/config',null,()=>({googleMapsKey:process.env.GOOGLE_MAPS_KEY||null}));
route('GET','/api/districts',null,()=>Object.keys(DIST).map(n=>({name:n,factor:DIST[n],lat:DC[n][0],lng:DC[n][1]})));
route('GET','/api/services',null,()=>SERVICES);

route('POST','/api/auth/send-otp',null,(c)=>{const ph=String(c.body.phone||'');if(!/^[6-9]\d{9}$/.test(ph))bad(400,'Invalid phone');limit('otp'+ph,8,600000);
 const otp=DEMO?'1234':String(crypto.randomInt(1000,10000));db.otps[ph]={h:sha(ph+otp),exp:Date.now()+300000,tries:0};save();if(!DEMO)sendSms(ph,otp);return{sent:true,demo:DEMO?'OTP is 1234':undefined}});
route('POST','/api/auth/verify',null,(c)=>{const {phone:ph,otp,name,role,district,adminKey}=c.body;const e=db.otps[ph];
 if(!e||e.exp<Date.now())bad(400,'OTP expired');if(++e.tries>5){delete db.otps[ph];bad(429,'Too many wrong OTPs')}if(!eq(e.h,sha(ph+otp))){save();bad(400,'Wrong OTP')}
 if(!['cust','cap','admin'].includes(role))bad(400,'Invalid role');if(role==='admin'&&!eq(adminKey||'',ADMIN_KEY))bad(403,'Admin key required');
 if(district&&!DIST[district])bad(400,'Unknown district');delete db.otps[ph];
 const isNew=!db.users[ph];const u=db.users[ph]=Object.assign(db.users[ph]||{phone:ph,created:Date.now()},{name:String(name||'User').slice(0,40),district:district||db.users[ph]?.district||'Dehradun'});
 u.roles=[...new Set([...(u.roles||[]),role])];if(role==='cap'&&isNew)u.approved=!REQUIRE;save();
 return{token:sign({ph,role,exp:Date.now()+30*864e5}),user:{phone:ph,name:u.name,district:u.district,role}}});

/* customer */
route('POST','/api/orders',['cust'],(c)=>{const {serviceId,address,when,pay,district}=c.body;const svc=SERVICES[serviceId];if(!svc)bad(400,'Unknown service');
 let d=district||db.users[c.ph].district;if(!DIST[d])bad(400,'Unknown district');if(!String(address||'').trim())bad(400,'Address required');
 if(db.orders.some(o=>o.cust===c.ph&&['search','accepted','arrived','started'].includes(o.st)))bad(409,'You already have an active booking');
 limit('book'+c.ph,10,3600000);
 let lat=+c.body.lat,lng=+c.body.lng;if(c.body.lat==null||c.body.lng==null){lat=DC[d][0];lng=DC[d][1]}else{if(!inArea(lat,lng))bad(400,AREA_MSG);d=nearestDist(lat,lng).name}
 if(!availOK(svc.id,d))bad(400,NA(svc,d));
 let km=0,dLat,dLng;if(svc.kind==='km'){dLat=+c.body.dLat;dLng=+c.body.dLng;if(!inArea(dLat,dLng))bad(400,AREA_MSG);km=roadKm(lat,lng,dLat,dLng);if(km>MAXKM[svc.id])bad(400,`Trip too long. Maximum ${MAXKM[svc.id]} km for ${svc.en}`);if(km<0.2)bad(400,'Drop is too close to pickup')}
 const p=priceOf(svc,d,km);
 const o={id:'WN'+crypto.randomInt(10000,99999),sid:svc.id,svc:svc.en,base:p.base,dist:p.dist,terrain:p.terrain,fare:p.fare,km,dlat:dLat,dlng:dLng,daddr:String(c.body.daddr||'').slice(0,200),d,addr:String(address).slice(0,200),when:['Now','Today evening','Tomorrow'].includes(when)?when:'Now',pay:pay==='Cash'?'Cash':'UPI',cust:c.ph,lat,lng,st:'search',otp:String(crypto.randomInt(1000,10000)),otpTries:0,at:Date.now(),skip:[]};
 db.orders.unshift(o);save();return view(o,'cust')});
route('GET','/api/orders/mine',['cust'],c=>db.orders.filter(o=>o.cust===c.ph).slice(0,50).map(o=>view(o,'cust')));
route('POST','/api/orders/:id/cancel',['cust'],c=>{const o=find(c,'cust');if(!['search','accepted'].includes(o.st))bad(409,'Cannot cancel now');
 if(o.st==='accepted'){db.ledger.push({id:o.id,type:'cancel_fee',d:o.d,fare:20,comm:Math.round(20*COMMISSION),net:20-Math.round(20*COMMISSION),cap:o.cap,day:today(),at:Date.now()})}o.st='cancel';save();return view(o,'cust')});
route('POST','/api/orders/:id/rate',['cust'],c=>{const o=find(c,'cust');if(o.st!=='done'||o.rated)bad(409,'Cannot rate');const r=Math.min(5,Math.max(1,+c.body.rating|0)),tip=Math.min(500,Math.max(0,+c.body.tip|0));
 o.rated=1;o.rating=r;o.tip=tip;if(tip)db.ledger.push({id:o.id,type:'tip',d:o.d,fare:0,comm:0,net:tip,cap:o.cap,day:today(),at:Date.now()});save();return{ok:true}});
function find(c,role){const o=db.orders.find(x=>x.id===c.params.id);if(!o)bad(404,'Order not found');if(role==='cust'&&o.cust!==c.ph)bad(403,'Not your order');if(role==='cap'&&o.cap!==c.ph)bad(403,'Not your job');return o}

/* captain */
route('POST','/api/captain/online',['cap'],c=>{const u=db.users[c.ph];if(c.body.online&&!isApproved(u))bad(403,'Your captain account is waiting for approval');u.online=!!c.body.online;if(c.body.district&&DIST[c.body.district])u.district=c.body.district;save();return{online:u.online,district:u.district}});
route('POST','/api/quote',['cust'],c=>{const svc=SERVICES[c.body.serviceId];if(!svc)bad(400,'Unknown service');let d=DIST[c.body.district]?c.body.district:db.users[c.ph].district;let km=0;
 if(svc.kind==='km'){if(inArea(+c.body.lat,+c.body.lng))d=nearestDist(+c.body.lat,+c.body.lng).name;if(!inArea(+c.body.lat,+c.body.lng)||!inArea(+c.body.dLat,+c.body.dLng))bad(400,AREA_MSG);km=roadKm(+c.body.lat,+c.body.lng,+c.body.dLat,+c.body.dLng);if(km>MAXKM[svc.id])bad(400,`Trip too long. Maximum ${MAXKM[svc.id]} km for ${svc.en}`)}if(!availOK(svc.id,d))bad(400,NA(svc,d));return Object.assign({km},priceOf(svc,d,km))});
/* offers = only jobs near the captain's live GPS, nearest first (radius 3 km -> 6 -> 10 -> 15 as the search ages) */
route('GET','/api/captain/offers',['cap'],c=>{const u=db.users[c.ph];if(!u.online||activeJob(c.ph)||!freshLoc(u))return[];
 return db.orders.filter(o=>o.st==='search'&&!o.skip.includes(c.ph)).map(o=>({o,d:hav(u.loc.lat,u.loc.lng,o.lat,o.lng)})).filter(x=>x.d<=radiusKm(x.o)).sort((a,b)=>a.d-b.d).slice(0,5).map(x=>Object.assign(view(x.o,'cap'),{distKm:+x.d.toFixed(1)}))});
route('GET','/api/captain/job',['cap'],c=>{const o=activeJob(c.ph);return o?view(o,'cap'):null});
route('POST','/api/orders/:id/accept',['cap'],c=>{const u=db.users[c.ph],o=db.orders.find(x=>x.id===c.params.id);if(!o)bad(404,'Order not found');if(!u.online)bad(409,'Go online first');if(activeJob(c.ph))bad(409,'Finish your current job first');
 if(!freshLoc(u))bad(409,'Turn on your location first');if(hav(u.loc.lat,u.loc.lng,o.lat,o.lng)>radiusKm(o))bad(403,'Job is too far from you');if(o.st!=='search')bad(409,'Taken by someone else'); /* single-threaded: this check+set is atomic */
 o.st='accepted';o.cap=c.ph;o.capName=u.name;o.acceptedAt=Date.now();save();return view(o,'cap')});
route('POST','/api/orders/:id/skip',['cap'],c=>{const o=db.orders.find(x=>x.id===c.params.id);if(o&&!o.skip.includes(c.ph))o.skip.push(c.ph);save();return{ok:true}});
route('POST','/api/orders/:id/arrive',['cap'],c=>{const o=find(c,'cap');if(o.st!=='accepted')bad(409,'Wrong state');o.st='arrived';save();return view(o,'cap')});
route('POST','/api/orders/:id/start',['cap'],c=>{const o=find(c,'cap');if(o.st!=='arrived')bad(409,'Wrong state');if(o.otpTries>=5)bad(429,'OTP locked, contact support');
 if(!eq(o.otp,String(c.body.otp||''))){o.otpTries++;save();bad(400,'Wrong OTP')}o.st='started';save();return view(o,'cap')});
route('POST','/api/orders/:id/complete',['cap'],c=>{const o=find(c,'cap');if(o.st!=='started')bad(409,'Wrong state');finish(o);return view(o,'cap')});
route('GET','/api/captain/earnings',['cap'],c=>{const mine=db.ledger.filter(l=>l.cap===c.ph);
 const days=[...Array(7)].map((_,i)=>{const d=new Date(Date.now()-(6-i)*864e5).toDateString();return{day:d,earned:mine.filter(l=>l.day===d).reduce((a,b)=>a+b.net,0)}});
 return{today:days[6].earned,total:mine.reduce((a,b)=>a+b.net,0),jobs:mine.filter(l=>l.type==='job').length,days}});

route('GET','/api/me',['cust','cap','admin'],c=>{const u=db.users[c.ph];return{phone:u.phone,name:u.name,district:u.district,online:!!u.online,approved:isApproved(u),role:c.role}});
route('POST','/api/captain/location',['cap'],c=>{const lat=+c.body.lat,lng=+c.body.lng;if(!inUK(lat,lng))bad(400,'Location outside Uttarakhand');limit('loc'+c.ph,60,60000);db.users[c.ph].loc={lat,lng,at:Date.now()};return{ok:true}});
route('GET','/api/orders/:id/track',['cust'],c=>{const o=find(c,'cust');const u=o.cap&&db.users[o.cap];const live=u&&u.loc&&Date.now()-u.loc.at<120000&&['accepted','arrived','started'].includes(o.st);return{status:o.st,job:{lat:o.lat,lng:o.lng},captain:live?{lat:u.loc.lat,lng:u.loc.lng,at:u.loc.at}:null}});
route('GET','/api/captains/nearby',['cust'],c=>{const d=c.q.district||db.users[c.ph].district;return Object.values(db.users).filter(u=>u.online&&u.district===d&&u.loc&&Date.now()-u.loc.at<120000).slice(0,30).map(u=>({lat:+u.loc.lat.toFixed(3),lng:+u.loc.lng.toFixed(3)}))});
/* rooms (free listing, no commission) */
route('GET','/api/rooms',null,c=>db.rooms.filter(r=>(!c.q.district||r.d===c.q.district)&&(!c.q.type||r.ty===c.q.type)).slice(0,100).map(({phone,...r})=>r));
route('POST','/api/rooms',['cust','cap'],c=>{const {title,rent,type,district}=c.body;if(!String(title||'').trim()||!(+rent>0))bad(400,'Title and rent required');if(!['Room','Flat','PG','Homestay'].includes(type))bad(400,'Invalid type');
 limit('room'+c.ph,10,86400000);const r={id:'R'+Date.now(),t:String(title).slice(0,80),rent:Math.min(+rent|0,500000),ty:type,d:DIST[district]?district:db.users[c.ph].district,phone:c.ph,at:Date.now()};db.rooms.unshift(r);save();const {phone,...pub}=r;return pub});
route('POST','/api/rooms/:id/contact',['cust','cap'],c=>{const r=db.rooms.find(x=>x.id===c.params.id);if(!r)bad(404,'Room not found');return{message:'Owner will call you back',ownerPhone:'+91'+r.phone.slice(0,2)+'XXXXXX'+r.phone.slice(-2)}});
route('DELETE','/api/rooms/:id',['cust','cap'],c=>{const i=db.rooms.findIndex(x=>x.id===c.params.id&&x.phone===c.ph);if(i<0)bad(404,'Not found');db.rooms.splice(i,1);save();return{ok:true}});

route('GET','/api/availability',null,()=>getAvail());
route('GET','/api/admin/availability',['admin'],()=>{const a=getAvail(),o={};SERVICES.forEach(s=>o[s.id]=a[s.id]||Object.keys(DIST));return o});
route('POST','/api/admin/availability',['admin'],c=>{const {serviceId,district,on}=c.body;if(!SERVICES[serviceId]||!DIST[district])bad(400,'Bad input');const a=getAvail();let l=a[serviceId]||Object.keys(DIST);l=on?[...new Set([...l,district])]:l.filter(x=>x!==district);if(l.length===Object.keys(DIST).length)delete a[serviceId];else a[serviceId]=l;save();return{ok:true}});
route('GET','/api/admin/captains',['admin'],()=>Object.values(db.users).filter(u=>(u.roles||[]).includes('cap')&&u.phone!=='bot').map(u=>({phone:u.phone,name:u.name,district:u.district,approved:isApproved(u),online:!!u.online})));
route('POST','/api/admin/captain',['admin'],c=>{const u=db.users[c.body.phone];if(!u)bad(404,'Not found');u.approved=!!c.body.approved;if(!u.approved)u.online=false;save();return{ok:true}});
/* admin: the only place commission is visible */
route('GET','/api/admin/stats',['admin'],()=>{const L=db.ledger,by={};L.forEach(l=>by[l.d]=(by[l.d]||0)+l.comm);
 return{commissionPct:COMMISSION*100,gmv:L.reduce((a,b)=>a+b.fare,0),commission:L.reduce((a,b)=>a+b.comm,0),payouts:L.reduce((a,b)=>a+b.net,0),completed:L.filter(l=>l.type==='job').length,activeOrders:db.orders.filter(o=>['search','accepted','arrived','started'].includes(o.st)).length,captainsOnline:Object.values(db.users).filter(u=>u.online).length,byDistrict:by}});
route('GET','/api/admin/ledger',['admin'],()=>db.ledger.slice(-100).reverse());
route('GET','/api/admin/orders',['admin'],()=>db.orders.slice(0,100).map(o=>view(o,'admin')));

/* ---------- static website ---------- */
const STATIC=new Set(['index.html','app.js','hi.js','style.css','sw.js','manifest.webmanifest','icon.svg']),MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
function serve(res,pathname){let n=decodeURIComponent(pathname).replace(/^\/+/,'')||'index.html';if(!STATIC.has(n))n='index.html'; /* only whitelisted files are ever served */
 const f=[path.join(__dirname,'public',n),path.join(__dirname,n)].find(x=>fs.existsSync(x));if(!f){res.writeHead(404);return res.end('Not found')}
 res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':n==='index.html'?'no-cache':'public, max-age=300'});fs.createReadStream(f).pipe(res)}
/* ---------- server ---------- */
const server=http.createServer((req,res)=>{
 const cors={'Access-Control-Allow-Origin':process.env.ORIGIN||'*','Access-Control-Allow-Headers':'Content-Type,Authorization','Access-Control-Allow-Methods':'GET,POST,DELETE,OPTIONS'};
 const out=(code,obj)=>{res.writeHead(code,Object.assign({'Content-Type':'application/json'},cors));res.end(JSON.stringify(obj===undefined?null:obj))};
 if(req.method==='OPTIONS'){res.writeHead(204,cors);return res.end()}
 if(req.method==='GET'&&!req.url.startsWith('/api'))return serve(res,new URL(req.url,'http://x').pathname);
 let raw='';req.on('data',d=>{raw+=d;if(raw.length>5e4){req.destroy()}});
 req.on('end',()=>{try{
  const url=new URL(req.url,'http://x');const r=R.find(x=>x.m===req.method&&x.re.test(url.pathname));if(!r)return out(404,{error:'Not found'});
  const c={params:r.re.exec(url.pathname).groups||{},q:Object.fromEntries(url.searchParams),body:raw?JSON.parse(raw):{}};
  if(r.roles){const p=unsign((req.headers.authorization||'').replace('Bearer ',''));if(!p)bad(401,'Login required');if(!r.roles.includes(p.role))bad(403,'Not allowed for your role');c.ph=p.ph;c.role=p.role;if(!db.users[c.ph])bad(401,'Unknown user')}
  out(200,r.fn(c))}catch(e){e instanceof HttpErr?out(e.code,{error:e.message}):e instanceof SyntaxError?out(400,{error:'Bad JSON'}):(console.error(e),out(500,{error:'Server error'}))}})});
if(require.main===module){(async()=>{if(UP_URL){try{const v=await up(['GET',UP_KEY]);if(v)db=Object.assign(db,JSON.parse(v));console.log('Loaded data from Upstash')}catch(e){console.error('Upstash load failed:',e.message);process.exit(1)}}
 server.listen(PORT,()=>console.log(`WorkNow on :${PORT} (commission ${COMMISSION*100}%, ${DEMO?'demo OTP 1234':'SMS mode'}, storage ${UP_URL?'Upstash':'file'})`));
 const bye=()=>Promise.resolve(flush()).catch(()=>{}).finally(()=>process.exit());process.on('SIGINT',bye);process.on('SIGTERM',bye)})()}
module.exports={server,flush};
