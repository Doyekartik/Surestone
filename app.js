/* "Pool,Park,Others" → "Pool, Park" */
function listText(v){return String(v||'').split(',').map(x=>x.trim()).filter(x=>x&&!/^others?$/i.test(x)).join(', ')}
const photo=(id,w=960)=>/^(https?:\/\/|data:image\/)/i.test(id||'')?id:`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=84`;
const homes=[
 {id:'shankar-garden-home',price:24500000,displayPrice:'₹2.45 Cr',label:'for sale',title:'A little garden in the city',type:'Apartment',location:'Shankar Nagar, Raipur, Chhattisgarh',neighbourhood:'Shankar Nagar',city:'Raipur',beds:3,baths:3,area:1540,areaLabel:'1,540 sq. ft.',image:'photo-1600607687920-4e2a09cf159d',image2:'photo-1600210492486-724fe5c67fb0',image3:'photo-1600607687939-ce8a6c25118c',verified:true,tour:true,moveIn:true,amenities:['Garden','3D tour','Verified','Balcony','Parking'],description:'A quiet little pocket of green in the middle of everything. Morning light finds its way into the living room, and the terrace has just enough room for your favourite plants.'},
 {id:'avanti-vihar-light',price:16800000,displayPrice:'₹1.68 Cr',label:'for sale',title:'The sunlit corner apartment',type:'Apartment',location:'Avanti Vihar, Raipur, Chhattisgarh',neighbourhood:'Avanti Vihar',city:'Raipur',beds:2,baths:2,area:1180,areaLabel:'1,180 sq. ft.',image:'photo-1600210492486-724fe5c67fb0',image2:'photo-1600607687920-4e2a09cf159d',image3:'photo-1600607687939-ce8a6c25118c',verified:true,tour:true,moveIn:true,amenities:['3D tour','Verified','Balcony','Gym'],description:'Tucked above the trees on a peaceful street, this bright two bedroom apartment has an easy, open feel and a balcony made for slow weekend mornings.'},
 {id:'kachna-villa',price:43500000,displayPrice:'₹4.35 Cr',label:'for sale',title:'A slower kind of Sunday',type:'Villa',location:'Kachna, Raipur, Chhattisgarh',neighbourhood:'Kachna',city:'Raipur',beds:4,baths:4,area:2860,areaLabel:'2,860 sq. ft.',image:'photo-1600607687939-ce8a6c25118c',image2:'photo-1600596542815-ffad4c1539a9',image3:'photo-1613977257363-707ba9348227',verified:true,tour:true,moveIn:true,amenities:['Garden','3D tour','Verified','Parking','Pool'],description:'An open, airy home with a generous courtyard and plenty of room to grow. Thoughtful materials, leafy edges and a little breathing room in a quieter corner of Raipur.'},
 {id:'telibandha-penthouse',price:37500000,displayPrice:'₹3.75 Cr',label:'for sale',title:'Rooms with a wider view',type:'Penthouse',location:'Telibandha, Raipur, Chhattisgarh',neighbourhood:'Telibandha',city:'Raipur',beds:3,baths:3,area:2210,areaLabel:'2,210 sq. ft.',image:'photo-1600566753086-00f18fb6b3ea',image2:'photo-1600607687644-c7171b42498f',image3:'photo-1600607687939-ce8a6c25118c',verified:true,tour:true,moveIn:false,amenities:['3D tour','Verified','Balcony','Pool'],description:'All the city you need, and a little space above it. The wraparound windows catch the late light, while the top floor gives the whole place a remarkable hush.'},
 {id:'mowa-house',price:9800000,displayPrice:'₹98 L',label:'for sale',title:'Small details, a big feeling',type:'Apartment',location:'Mowa, Raipur, Chhattisgarh',neighbourhood:'Mowa',city:'Raipur',beds:2,baths:2,area:990,areaLabel:'990 sq. ft.',image:'photo-1600607687920-4e2a09cf159d',image2:'photo-1600210492486-724fe5c67fb0',image3:'photo-1600607687939-ce8a6c25118c',verified:true,tour:false,moveIn:true,amenities:['Verified','Balcony','Gym'],description:'A lovely considered space with warm wood, clean lines and its own sheltered balcony. Close to the good bakeries, the park and your new favourite coffee.'},
 {id:'saddu-garden-home',price:28800000,displayPrice:'₹2.88 Cr',label:'for sale',title:'Under the old rain trees',type:'Villa',location:'Saddu, Raipur, Chhattisgarh',neighbourhood:'Saddu',city:'Raipur',beds:3,baths:3,area:1940,areaLabel:'1,940 sq. ft.',image:'photo-1613977257363-707ba9348227',image2:'photo-1600596542815-ffad4c1539a9',image3:'photo-1600607687939-ce8a6c25118c',verified:true,tour:true,moveIn:true,amenities:['Garden','3D tour','Verified','Parking'],description:'An intimate home sheltered beneath Saddu’s beautiful old trees. The garden edges blur the line between indoors and out, making every afternoon feel a little longer.'},
 {id:'vip-road-plot',price:7200000,displayPrice:'₹72 L',label:'for sale',title:'Space for something of your own',type:'Plot',location:'VIP Road, Raipur, Chhattisgarh',neighbourhood:'VIP Road',city:'Raipur',beds:0,baths:0,area:2400,areaLabel:'2,400 sq. ft.',image:'photo-1500382017468-9049fed747ef',image2:'photo-1500530855697-b586d89ba3ee',image3:'photo-1448375240586-882707db888b',verified:true,tour:false,moveIn:true,amenities:['Garden','Verified'],description:'Room to build something that is entirely yours. Set in a quiet corner of Raipur, this green plot is the beginning of an idea you have been holding onto.'}];
/* ---- EstateDesk CRM link: projects come from the CRM, enquiries go back to it (settings in crm-config.js) ---- */
const crmConfig=()=>{const c=window.SURESTONE_CRM;return c&&/^https:\/\/|^http:\/\/localhost/.test(c.url||'')&&/^[0-9a-f-]{36}$/i.test(c.org||'')?{url:c.url.replace(/\/$/,''),org:c.org,formKey:/^[a-f0-9]{64}$/.test(c.formKey||'')?c.formKey:''}:null};
const NO_PHOTO='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#eee7db"/><path d="M520 430 600 360l80 70v90H520z" fill="none" stroke="#b49a72" stroke-width="10"/><text x="600" y="590" font-family="Georgia,serif" font-size="40" fill="#8c7653" text-anchor="middle">Photos coming soon</text></svg>');
if(crmConfig())homes.length=0;
async function sendToCrm(fields){const c=crmConfig();if(!c||!c.formKey)return{ok:true};try{const r=await fetch(`${c.url}/api/leads/in/${c.formKey}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,page:location.href})});const j=await r.json().catch(()=>({}));if(r.ok&&j.ok){try{rememberMe(fields)}catch{}}return r.ok&&j.ok?{ok:true}:{ok:false,error:j.error||'Could not send right now. Please try again.'}}catch{return{ok:false,error:'Could not connect. Check your internet and try again.'}}}
function formError(form,msg){let p=form.querySelector('.form-error');if(!p){p=document.createElement('p');p.className='form-error';p.setAttribute('role','alert');form.querySelector('[type=submit]')?.before(p)}p.textContent=msg||'';p.hidden=!msg}
function crmProjectToHome(p){
  const slug=String(p.name||'project').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)+'-'+String(p.id).slice(0,8);
  const loc=String(p.location||'').trim();const lp=loc.split(',').map(x=>x.trim()).filter(Boolean);const neighbourhood=(/^sector\b/i.test(lp[0]||'')&&lp[1]?lp[0]+', '+lp[1]:lp[0])||'Raipur';
  const blr=/bangalore|bengaluru|whitefield|electronic city|devanahalli|sarjapur|hebbal|yelahanka|koramangala|indiranagar|hsr layout|jp nagar|bannerghatta|kanakapura road|hennur|marathahalli|bellandur|kr puram|rajajinagar|malleshwaram|jayanagar|banashankari|thanisandra|budigere|hoskote|nelamangala/i.test(loc);const city=blr?'Bangalore':'Raipur';let location=loc||'Raipur';if(blr){if(!/karnataka/i.test(location))location+=', Karnataka'}else{if(!/raipur/i.test(location))location+=', Raipur';if(!/chhattisgarh/i.test(location))location+=', Chhattisgarh'}
  const t=String(p.type||'').toLowerCase();const type=/penthouse/.test(t)?'Penthouse':/villa|bungalow|row ?house|independent/.test(t)?'Villa':/plot|land/.test(t)?'Plot':/retail|shop|showroom|commercial/.test(t)?'Retail':/office/.test(t)?'Office':'Apartment';
  const deal=['lease','both'].includes(p.deal)?p.deal:'sale';
  const beds=(String(p.configs||'').match(/\d+(\.\d+)?/g)||[]).map(Number).filter(n=>n>0&&n<10);
  const price=Math.round((Number(p.price_from)||0)*100000);
  const sf=Number(p.size_from)||0,st=Number(p.size_to)||0;
  const base=crmConfig()?.url||'';const photos=(Array.isArray(p.photos)?p.photos:[]).map(u=>typeof u!=='string'?'':/^https:\/\//.test(u)?u:u.startsWith('/')&&!u.startsWith('//')?base+u:'').filter(Boolean);
  const amen=String(p.amenities||'').split(/[,•\n]+/).map(a=>a.trim()).filter(Boolean).slice(0,12);
  const status=p.status||'';const extra=[];
  if(p.developer)extra.push(['Developer',p.developer]);if(p.possession)extra.push(['Possession',p.possession]);if(p.rera_no)extra.push(['RERA number',p.rera_no]);if(p.banks)extra.push(['Home loans from',listText(p.banks)]);
  const desc=[p.highlights?listText(p.highlights).replace(/[.!\s]*$/,'.'):'',`${p.name}${p.developer?' by '+p.developer:''}${loc?' in '+loc:''}.`].filter(Boolean).join(' ');
  return{id:slug,crm:true,crmName:p.name,price,displayPrice:deal==='lease'?'For lease':price?currency(price)+' onwards':'Price on request',label:deal==='lease'?'For lease':deal==='both'?'Sale or lease':(status||'New project'),deal,forLease:deal!=='sale',title:p.name,type,location,neighbourhood,city,developer:String(p.developer||'').trim(),bedsList:beds,
    beds:beds.length?Math.max(...beds):0,bedsLabel:p.configs||'',baths:0,area:st||sf,areaFrom:sf||st,areaLabel:sf?`${sf.toLocaleString('en-IN')}${st&&st!==sf?'–'+st.toLocaleString('en-IN'):''} sq. ft.`:'Size on request',
    image:photos[0]||NO_PHOTO,image2:photos[1]||'',image3:photos[2]||'',gallery:photos,videos:(Array.isArray(p.videos)?p.videos:[]).filter(v=>v&&typeof v.url==='string'&&/^https:\/\//.test(v.url)).slice(0,5).map(v=>({url:v.url,name:String(v.name||'')})),verified:Boolean(p.rera_no),tour:false,tourUrl:'',moveIn:status==='Ready to move',availability:status||'',
    amenities:amen,description:desc,extraSpecs:extra,crmId:p.id,hasBrochure:Boolean(p.has_brochure),planCount:Number(p.plan_count)||0,votes:Number(p.votes)||0,filterTags:[...amen,...(p.rera_no?['RERA registered']:[])],latitude:typeof p.lat==='number'?p.lat:null,longitude:typeof p.lng==='number'?p.lng:null}
}
const neighbourhoods=[
 {name:'Shankar Nagar',city:'Raipur',photo:'photo-1512343879784-a960bf40e7f2',homes:1,lat:21.25363,lon:81.66967,tag:'A WELL-LOVED CITY ADDRESS'},
 {name:'Avanti Vihar',city:'Raipur',photo:'photo-1596176530529-78163a4f7af2',homes:1,lat:21.24273,lon:81.66934,tag:'A LITTLE LIVELINESS'},
 {name:'Kachna',city:'Raipur',photo:'photo-1564013799919-ab600027ffc6',homes:1,lat:21.26569,lon:81.70938,tag:'ROOM TO BREATHE'},
 {name:'Telibandha',city:'Raipur',photo:'photo-1500382017468-9049fed747ef',homes:1,lat:21.24103,lon:81.6648,tag:'CITY DAYS, QUIETER EVENINGS'},
 {name:'Mowa',city:'Raipur',photo:'photo-1600607687920-4e2a09cf159d',homes:1,lat:21.26848,lon:81.67180,tag:'A LITTLE MORE ROOM'},
 {name:'Saddu',city:'Raipur',photo:'photo-1613977257363-707ba9348227',homes:1,lat:21.3000,lon:81.7000,tag:'GREEN AROUND THE EDGES'},
 {name:'VIP Road',city:'Raipur',photo:'photo-1600607687939-ce8a6c25118c',homes:1,lat:21.2187,lon:81.6835,tag:'A GOOD PLACE TO LAND'}];
const $=(q,root=document)=>root.querySelector(q),$$=(q,root=document)=>[...root.querySelectorAll(q)],contactFormTemplate=$('#contactForm').innerHTML;
const store={read(k,d){try{return JSON.parse(localStorage.getItem('surestone:'+k))??d}catch{return d}},write(k,v){localStorage.setItem('surestone:'+k,JSON.stringify(v))}};
const pageParams=new URLSearchParams(location.search);
const state={mode:pageParams.get('mode')==='new'?'new':'buy',location:pageParams.get('location')||'',developer:'all',type:pageParams.get('type')||'all',price:pageParams.get('price')||'all',beds:pageParams.get('beds')||'all',area:Number(pageParams.get('area')||0),moveIn:'all',amenities:[],sort:'featured',saved:store.read('saved',[]),profile:store.read('profile',{}),authUser:null,preferences:store.read('preferences',{}),visits:store.read('visits',[]),mapLocation:null,currentHome:null,visibleCount:6,accountTab:'saved',toastTimer:null,budget:'all',deal:'all',status:'all',localities:[]};
const currency=n=>n>=10000000?`₹${(n/10000000).toFixed(2).replace(/0+$/,'').replace(/\.$/,'')} Cr`:`₹${Math.round(n/100000)} L`;
const homeById=id=>homes.find(h=>h.id===id);
/* ---- Cities and areas: Atal Nagar (Naya Raipur), Raipur, Bangalore ---- */
const BUDGETS=[['all','Any budget'],['u100','Under ₹1 Cr'],['100to150','₹1 – 1.5 Cr'],['150to200','₹1.5 – 2 Cr'],['200to300','₹2 – 3 Cr'],['o300','₹3 Cr+']];
function budgetOK(key,price){if(!key||key==='all')return true;if(!price)return false;const L=price/100000,[lo,hi]=({u100:[0,100],'100to150':[100,150],'150to200':[150,200],'200to300':[200,300],o300:[300,1e9],under100:[0,100],'100to300':[100,300],over300:[300,1e9]})[key]||[0,1e9];return L>=lo&&L<hi}
const PLACE_ALIASES={'bangalore':['bangalore','bengaluru'],'bengaluru':['bangalore','bengaluru'],'atal nagar':['atal nagar','naya raipur','nava raipur'],'naya raipur':['atal nagar','naya raipur','nava raipur']};
function placeTerms(search){const s=String(search||'').toLowerCase().replace(/chhattisgarh|karnataka|india/g,'').trim();if(!s)return[];const main=s.split(',')[0].trim();const parts=main.split(/[()]/).map(x=>x.trim()).filter(Boolean);const out=new Set();parts.forEach(p=>{out.add(p);(PLACE_ALIASES[p]||[]).forEach(a=>out.add(a))});return[...out]}
function placeMatch(search,text){const terms=placeTerms(search);if(!terms.length)return true;const t=String(text||'').toLowerCase();return terms.some(x=>t.includes(x))}
function placeName(search){const s=String(search||'').trim();if(!s)return'';return s.replace(/,\s*(chhattisgarh|karnataka|india)\s*$/i,'').trim()}
function refreshCityChoices(){const dl=$('#locationSuggestions');if(!dl||!homes.some(h=>h.crm))return;const sectors=[...new Set(homes.filter(h=>/atal nagar|naya raipur|nava raipur/i.test(h.location)).map(h=>(h.location.match(/sector[\s-]*\d+[a-z]?/i)||[''])[0].replace(/\s+/g,' ').replace(/^sector/i,'Sector')).filter(Boolean))].sort((a,b)=>parseInt(a.slice(7))-parseInt(b.slice(7)));const areas=[...new Set(homes.map(h=>h.neighbourhood+', '+(h.city||'Raipur')))].filter(a=>!/sector/i.test(a)).sort();const list=['Atal Nagar (Naya Raipur)',...sectors.map(x=>x+', Atal Nagar (Naya Raipur)'),'Raipur','Bangalore',...areas];dl.innerHTML=[...new Set(list)].map(v=>`<option value="${esc(v)}"></option>`).join('')}

const pageHome=()=>{const pid=(pageParams.get('p')||'').toLowerCase();return pid?homes.find(h=>h.crmId===pid):homeById(pageParams.get('id')||homes[0]?.id)};
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function openDialog(id){const d=document.getElementById(id);if(d&&!d.open)d.showModal()}
function closeDialog(id){const d=document.getElementById(id);if(d?.open)d.close()}
function openAccount(tab='saved'){state.accountTab=tab;$$('.account-tab').forEach(button=>button.classList.toggle('active',button.dataset.accountTab===tab));renderAccountPanel();openDialog('accountDialog')}
function openSellerEnquiry(){$('#contactSubline').textContent='Tell us about the home you would like to sell.';$('#contactHomeLabel').textContent='Where is your home?';$('#contactArea').value='';$('#contactForm').dataset.kind='sell';openDialog('contactDialog')}
function syncHeader(){const count=state.saved.length;if(typeof me==='function'){const who=me();if(who.name&&!state.profile.name)state.profile={...state.profile,name:who.name};if(who.phone&&!state.profile.phone)state.profile={...state.profile,phone:who.phone}}$('#savedCount').textContent=count;$('#profileSavedCount').textContent=count;$('#accountSavedBadge').textContent=count;$('#savedCount').dataset.empty=count===0?'true':'false';const p=state.profile;$('.account-avatar').textContent=(p.name||'S').trim().charAt(0).toUpperCase();$('#profileAvatar').textContent=(p.name||'G').trim().charAt(0).toUpperCase();$('#accountNameDisplay').textContent=p.name||'Your personal space';$('.account-button-copy strong').textContent=p.name?`Hello, ${(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase())(p.name.trim().split(/\s+/)[0])}`:'Your account';$('.profile-edit').innerHTML=p.name?'Edit your details <span></span>':'Add your details <span></span>';const signedIn=Boolean(state.authUser);$('.auth-methods').classList.toggle('hidden',signedIn);$('#googleSignOut').classList.toggle('hidden',!hasLocalLogin());$('#headerLogout')?.classList.toggle('hidden',!hasLocalLogin());if(signedIn&&state.needEmailVerify)showVerifyEmail($('#authMessage'),state.authUser.email);else $('#authMessage').textContent=signedIn?`Signed in as ${state.authUser.email||state.authUser.phone||state.authUser.name}`:'';renderAccountPanel()}
function filterHomes(){const search=state.location.toLowerCase().trim();let out=homes.filter(h=>{const modeOK=state.mode==='new'?!h.moveIn:true;if(!modeOK)return false;const areaOK=placeMatch(search,`${h.location} ${h.neighbourhood} ${h.city} ${h.title}`);if(!areaOK)return false;if(state.type==='lease'?!h.forLease:state.type!=='all'&&h.type!==state.type)return false;if(!budgetOK(state.price,h.price))return false;if(state.beds!=='all'){const n=Number(state.beds),list=h.bedsList&&h.bedsList.length?h.bedsList:(h.beds?[h.beds]:[]);if(!(n>=5?list.some(x=>x>=5):list.includes(n)))return false}if(state.developer!=='all'&&(h.developer||'')!==state.developer)return false;if(state.area&&h.area<state.area)return false;if(state.moveIn!=='all'&&h.moveIn!==(state.moveIn==='true'))return false;if(state.amenities.some(a=>!(h.filterTags||h.amenities).some(x=>String(x).toLowerCase()===a.toLowerCase())))return false;if(state.deal==='sale'&&h.deal==='lease')return false;if(state.deal==='lease'&&!h.forLease)return false;if(state.status!=='all'&&(h.availability||(h.moveIn?'Ready to move':'Under construction'))!==state.status)return false;if(state.localities.length&&!state.localities.includes(h.neighbourhood))return false;return true});if(state.sort==='votes')out.sort((a,b)=>(b.votes||0)-(a.votes||0));if(state.sort==='price-low')out.sort((a,b)=>a.price-b.price);if(state.sort==='price-high')out.sort((a,b)=>b.price-a.price);if(state.sort==='area-high')out.sort((a,b)=>b.area-a.area);return out}
function renderListings(){const filtered=filterHomes(),shown=filtered.slice(0,state.visibleCount),grid=$('#propertyGrid');grid.innerHTML=shown.map(cardHTML).join('');$('#resultLabel').textContent=state.mode==='new'?'New projects to explore':'Homes to fall for';$('#emptyResults').classList.toggle('hidden',filtered.length!==0);$('#loadMore').classList.toggle('hidden',filtered.length<=state.visibleCount);$('#seeAllLink').textContent=filtered.length>state.visibleCount?'EXPLORE ALL HOMES ':'EXPLORE ALL HOMES ';updateListingHeading();updateFilterIndicators();renderPills()}
function updateListingHeading(){const heading=$('#listingTypeHeading');if(!heading)return;const where=$('#listingWhere'),sub=$('#listingSub'),place=placeName(state.location);if(where)where.textContent=place?' in '+place+'.':'.';if(sub)sub.textContent=state.mode==='new'?'New launches and projects under construction. Book early for the best price and choice.':'Luxury homes and new projects in Raipur and Bangalore, picked with care.';if(state.mode==='new'&&state.type==='all'){heading.textContent='New projects';return}const plural={all:'Featured homes',Apartment:'Apartments',Villa:'Villas',Penthouse:'Penthouses',Plot:'Plots',Retail:'Retail spaces',lease:'Places for lease'};heading.textContent=plural[state.type]||`${state.type}s`}
function cardHTML(h){return `<article class="property-card" data-home="${h.id}" tabindex="0" role="group" aria-label="${esc(h.title)}, ${esc(h.displayPrice)}"><div class="property-photo"><img src="${photo(h.image)}" alt="${esc(h.title)}, ${esc(h.location)}" loading="lazy"><span class="property-verified"><svg viewBox="0 0 16 16"><path d="M8 1.6 13.5 3.5v4c0 3.2-2.2 5.5-5.5 7C4.7 13 2.5 10.7 2.5 7.5v-4L8 1.6Z"/><path d="m5.3 8 1.8 1.8 3.7-4"/></svg> ASTITTVA VERIFIED</span><button class="property-heart ${state.saved.includes(h.id)?'saved':''}" data-save="${h.id}" aria-label="${state.saved.includes(h.id)?'Remove saved home':'Save home'}" aria-pressed="${state.saved.includes(h.id)}"><svg viewBox="0 0 24 24"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg></button>${h.tour?`<button class="tour-chip" data-tour="${h.id}"><svg viewBox="0 0 18 18"><path d="M9 2 15.8 5.4 9 9 2.2 5.4 9 2Z"/><path d="m2.2 5.4 0 7.1L9 16l6.8-3.5V5.4M9 9v7"/></svg> STEP INSIDE · 3D</button>`:''}</div><div class="property-card-main"><h3 class="property-title">${esc(h.title)}</h3><div class="property-headline"><span class="property-price">${h.displayPrice}</span><span class="property-price-label">${h.label}</span></div><p class="property-location"><svg viewBox="0 0 16 16"><path d="M13 6.5c0 3.7-5 7.1-5 7.1S3 10.2 3 6.5a5 5 0 1 1 10 0Z"/><circle cx="8" cy="6.5" r="1.5"/></svg>${esc(h.location)}</p><div class="property-specs">${h.beds?`<span class="property-spec"><svg viewBox="0 0 18 18"><path d="M2 14V7h14v7M4 7V4h4v3m2 0V4h4v3M2 11h14M4 14v2m10-2v2"/></svg>${esc(h.bedsLabel||h.beds+' beds')}</span>`:''}${h.baths?`<span class="property-spec"><svg viewBox="0 0 18 18"><path d="M3 9V5a3 3 0 0 1 6 0m0 0v2M3 7h12v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7ZM5 15v1m8-1v1"/></svg>${h.baths} baths</span>`:''}<span class="property-spec"><svg viewBox="0 0 18 18"><path d="M2.5 5.5 9 2l6.5 3.5v7L9 16l-6.5-3.5v-7Z"/><path d="m2.7 5.6 6.3 3.5 6.3-3.5M9 9v7"/></svg>${h.areaLabel}</span></div><div class="property-card-footer">${voteBtn(h)}<a href="#home" class="property-arrow" data-detail="${h.id}" aria-label="Explore ${esc(h.title)}">EXPLORE </a></div></div></article>`}
function renderPills(){const pills=[];if(state.location)pills.push(['location',state.location]);if(state.type!=='all')pills.push(['type',state.type==='lease'?'For lease':state.type]);if(state.price!=='all')pills.push(['price',({under100:'Under ₹1 Cr','100to300':'₹1–3 Cr','over300':'₹3 Cr+'})[state.price]]);if(state.beds!=='all')pills.push(['beds',`${state.beds}+ bedrooms`]);if(state.area)pills.push(['area',`${state.area.toLocaleString()}+ sq. ft.`]);if(state.moveIn!=='all')pills.push(['moveIn',state.moveIn==='true'?'Ready to move':'Under construction']);state.amenities.forEach(a=>pills.push([`amenity:${a}`,a]));if(state.budget!=='all')pills.push(['budget',({u50:'Under ₹50 L','50to100':'₹50 L–1 Cr','100to200':'₹1–2 Cr','200to300':'₹2–3 Cr',o300:'₹3 Cr+'})[state.budget]]);if(state.deal!=='all')pills.push(['deal',state.deal==='lease'?'For lease':'For sale']);if(state.status!=='all')pills.push(['status',state.status]);state.localities.forEach(l=>pills.push([`loc:${l}`,l]));$('#activeFilters').innerHTML=pills.map(([k,v])=>`<span class="filter-pill">${esc(v)}<button data-remove-filter="${esc(k)}" aria-label="Remove ${esc(v)} filter">×</button></span>`).join('')}
function updateFilterIndicators(){const n=(state.type!=='all')+(state.price!=='all')+(state.beds!=='all')+(state.area>0)+(state.moveIn!=='all')+state.amenities.length+(state.developer!=='all')+(state.status!=='all')+state.localities.length;if($('#modalBudget')){$('#modalBudget').value=state.price;$('#modalStatus').value=state.status;if($('#modalDeveloper'))$('#modalDeveloper').value=state.developer}if($('#devFilter')){$('#devFilter').value=state.developer;if(typeof syncGlassSelect==='function')syncGlassSelect($('#devFilter'))}$$('#localityChips button').forEach(b=>b.classList.toggle('selected',state.localities.includes(b.dataset.locality)));$('#filterBadge').classList.toggle('active',n>0);$('#modalType').value=state.type;$('#modalBeds').value=state.beds;$('#moveFilter').value=state.moveIn;$('#areaRange').value=state.area;$('#areaValue').textContent=state.area?`${Number(state.area).toLocaleString()} sq. ft.`:'Any size';$('#propertyType').value=state.type;syncPropertyTypeGlass();$('#priceRange').value=state.price;$('#bedsFilter').value=state.beds;$('#areaFilter').value=state.area>=2500?'2500':state.area>=1500?'1500':state.area>=1000?'1000':'all';$$('.glass-select-generic select').forEach(syncGlassSelect);$$('#amenityChips button').forEach(b=>b.classList.toggle('selected',state.amenities.includes(b.dataset.amenity)))}
function syncPropertyTypeGlass(){const select=$('#propertyType'),label=$('#propertyTypeLabel'),menu=$('#propertyTypeOptions');if(!select||!label)return;label.textContent=select.selectedOptions[0]?.textContent||'Any home';const list=menu?$$('[role="option"]',menu):[];list.forEach(option=>option.setAttribute('aria-selected',String(option.dataset.propertyType===select.value)));const selected=list.findIndex(option=>option.dataset.propertyType===select.value);if(menu&&selected>=0){menu.style.setProperty('--glass-selected-index',selected);if(menu.hidden)menu.style.setProperty('--glass-hover-index',selected)}}
function initPropertyTypeGlass(){const wrap=$('#propertyTypeGlass'),select=$('#propertyType'),trigger=$('#propertyTypeTrigger'),menu=$('#propertyTypeOptions');if(!wrap||!select||!trigger||!menu)return;menu.classList.add('glass-select-menu-floating');const options=()=>$$('[role="option"]',menu),setHover=option=>{const index=options().indexOf(option);if(index>=0)menu.style.setProperty('--glass-hover-index',index)},close=(returnFocus=false)=>{menu.hidden=true;wrap.classList.remove('glass-open');trigger.setAttribute('aria-expanded','false');if(returnFocus)trigger.focus()},open=(last=false)=>{menu.hidden=false;wrap.classList.add('glass-open');trigger.setAttribute('aria-expanded','true');positionGlassDropdown(trigger,menu);const list=options(),current=list.findIndex(option=>option.dataset.propertyType===select.value);menu.style.setProperty('--glass-hover-index',current);list[last?list.length-1:Math.max(0,current)]?.focus()},toggle=()=>menu.hidden?open():close();trigger.addEventListener('click',toggle);trigger.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){event.preventDefault();if(menu.hidden)open(event.key==='ArrowUp');else options().find(option=>option.dataset.propertyType===select.value)?.focus()}else if(event.key==='Escape')close()});menu.addEventListener('pointerover',event=>{const option=event.target.closest('[role="option"]');if(option)setHover(option)});menu.addEventListener('pointerleave',()=>{const focused=options().find(option=>option===document.activeElement);setHover(focused||options().find(option=>option.dataset.propertyType===select.value))});menu.addEventListener('focusin',event=>{const option=event.target.closest('[role="option"]');if(option)setHover(option)});menu.addEventListener('click',event=>{const option=event.target.closest('[role="option"]');if(!option)return;select.value=option.dataset.propertyType;syncPropertyTypeGlass();select.dispatchEvent(new Event('change',{bubbles:true}));close(true)});menu.addEventListener('keydown',event=>{const list=options(),index=list.indexOf(event.target);if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();list[(index+(event.key==='ArrowDown'?1:list.length-1))%list.length]?.focus()}else if(event.key==='Home'||event.key==='End'){event.preventDefault();list[event.key==='Home'?0:list.length-1]?.focus()}else if(event.key==='Escape'){event.preventDefault();close(true)}});document.addEventListener('click',event=>{if(!wrap.contains(event.target))close()});syncPropertyTypeGlass()}
let glassMenuSequence=0,glassFloatingHandlers=false;
function syncGlassSelect(select){if(!select)return;const wrap=select.closest('.glass-select-generic');if(!wrap)return;const label=$('.glass-select-value',wrap),menu=$('.glass-select-menu',wrap);if(label)label.textContent=select.selectedOptions[0]?.textContent||'Choose an option';const options=$$('[role="option"]',menu);options.forEach(option=>option.setAttribute('aria-selected',String(option.dataset.glassValue===select.value)));const index=options.findIndex(option=>option.dataset.glassValue===select.value);if(index>=0){menu.style.setProperty('--glass-selected-index',index);if(menu.hidden)menu.style.setProperty('--glass-hover-index',index)}}
function positionGlassDropdown(trigger,menu){const rect=trigger.getBoundingClientRect(),width=Math.min(280,window.innerWidth-24),heightLimit=Math.min(194,window.innerHeight-24),height=Math.min(menu.scrollHeight,heightLimit),spaceBelow=window.innerHeight-rect.bottom-12,spaceAbove=rect.top-12,top=spaceBelow>=Math.min(height,180)||spaceBelow>=spaceAbove?rect.bottom+9:Math.max(12,rect.top-height-9),left=Math.max(12,Math.min(rect.left,window.innerWidth-width-12));menu.style.width=width+'px';menu.style.maxHeight=height+'px';menu.style.overflowY='auto';menu.style.left=left+'px';menu.style.top=top+'px'}
function enhanceGlassSelect(select){if(select.classList.contains('glass-native-select')||select.closest('.glass-select-generic'))return;const wrap=document.createElement('span');wrap.className='glass-select glass-select-generic';const id='surestone-glass-'+(++glassMenuSequence),trigger=document.createElement('button'),value=document.createElement('span'),icon=document.createElementNS('http://www.w3.org/2000/svg','svg'),path=document.createElementNS('http://www.w3.org/2000/svg','path'),menu=document.createElement('div');select.parentNode.insertBefore(wrap,select);wrap.appendChild(select);select.classList.add('glass-native-select');select.tabIndex=-1;select.setAttribute('aria-hidden','true');trigger.type='button';trigger.className='glass-select-trigger';trigger.id=id+'-trigger';trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls',id+'-options');trigger.setAttribute('aria-label',select.getAttribute('aria-label')||select.closest('label')?.querySelector(':scope > span, :scope > small')?.textContent.trim()||'Choose an option');value.className='glass-select-value';trigger.appendChild(value);icon.setAttribute('viewBox','0 0 16 16');icon.setAttribute('aria-hidden','true');path.setAttribute('d','m3.5 6 4.5 4 4.5-4');icon.appendChild(path);trigger.appendChild(icon);menu.className='glass-select-menu glass-select-menu-floating';menu.hidden=true;menu.id=id+'-options';menu.setAttribute('role','listbox');menu.setAttribute('aria-label',trigger.getAttribute('aria-label'));for(const item of [...select.options]){const option=document.createElement('button');option.type='button';option.setAttribute('role','option');option.dataset.glassValue=item.value;option.textContent=item.textContent;option.disabled=item.disabled;menu.appendChild(option)}wrap.append(trigger,menu);const options=()=>$$('[role="option"]',menu),setIndex=option=>{const index=options().indexOf(option);if(index>=0)menu.style.setProperty('--glass-hover-index',index)},position=()=>positionGlassDropdown(trigger,menu);const close=(returnFocus=false)=>{menu.hidden=true;wrap.classList.remove('glass-open');trigger.setAttribute('aria-expanded','false');if(returnFocus)trigger.focus()},open=(last=false)=>{menu.hidden=false;wrap.classList.add('glass-open');trigger.setAttribute('aria-expanded','true');position();const list=options(),current=list.findIndex(option=>option.dataset.glassValue===select.value),index=last?list.length-1:Math.max(0,current);menu.style.setProperty('--glass-hover-index',index);list[index]?.focus()},toggle=()=>menu.hidden?open():close();trigger.addEventListener('click',event=>{event.preventDefault();toggle()});trigger.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){event.preventDefault();if(menu.hidden)open(event.key==='ArrowUp');else options().find(option=>option.dataset.glassValue===select.value)?.focus()}else if(event.key==='Escape')close()});menu.addEventListener('pointerover',event=>{const option=event.target.closest('[role="option"]');if(option)setIndex(option)});menu.addEventListener('pointerleave',()=>setIndex(options().find(option=>option===document.activeElement)||options().find(option=>option.dataset.glassValue===select.value)));menu.addEventListener('focusin',event=>{const option=event.target.closest('[role="option"]');if(option)setIndex(option)});menu.addEventListener('click',event=>{event.preventDefault();const option=event.target.closest('[role="option"]');if(!option||option.disabled)return;select.value=option.dataset.glassValue;syncGlassSelect(select);select.dispatchEvent(new Event('change',{bubbles:true}));close(true)});menu.addEventListener('keydown',event=>{const list=options(),index=list.indexOf(event.target);if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();list[(index+(event.key==='ArrowDown'?1:list.length-1))%list.length]?.focus()}else if(event.key==='Home'||event.key==='End'){event.preventDefault();list[event.key==='Home'?0:list.length-1]?.focus()}else if(event.key==='Escape'){event.preventDefault();close(true)}});syncGlassSelect(select)}
function initGlassDropdowns(root=document){$$('select',root).forEach(enhanceGlassSelect);if(!glassFloatingHandlers){glassFloatingHandlers=true;document.addEventListener('click',event=>$$('.glass-select-generic.glass-open').forEach(wrap=>{if(!wrap.contains(event.target)){const trigger=$('.glass-select-trigger',wrap),menu=$('.glass-select-menu',wrap);if(menu){menu.hidden=true;wrap.classList.remove('glass-open');trigger?.setAttribute('aria-expanded','false')}}}));window.addEventListener('scroll',()=>$$('.glass-select-menu-floating:not([hidden])').forEach(menu=>{const trigger=menu.closest('.glass-select')?.querySelector('.glass-select-trigger');if(trigger)positionGlassDropdown(trigger,menu)}),true);window.addEventListener('resize',()=>$$('.glass-select-menu-floating:not([hidden])').forEach(menu=>{const trigger=menu.closest('.glass-select')?.querySelector('.glass-select-trigger');if(trigger)positionGlassDropdown(trigger,menu)}))}}
function setSave(id){const on=!state.saved.includes(id);if(!on){state.saved=state.saved.filter(x=>x!==id);toast('Taken off your saved homes.')}else{state.saved.unshift(id);toast(state.client?'Saved to your account.':'A little place to come back to.')}store.write('saved',state.saved);renderListings();syncHeader();saveToCrm(homeById(id),on)}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderNeighbourhoods(){const box=$('#neighbourhoodCards');if(!box)return;
  // Areas come from the real projects (no stock photos). Atal Nagar first, then Raipur, then Bangalore.
  const real=homes.filter(h=>h.crm);
  if(!real.length){box.innerHTML='';return}
  const groups=new Map();real.forEach(h=>{const atal=/atal nagar|naya raipur|nava raipur/i.test(h.location);const area=atal?'Atal Nagar (Naya Raipur)':h.neighbourhood.replace(/^sector[^,]*,\s*/i,'');const key=area+'|'+(h.city||'Raipur');const g=groups.get(key)||{area,city:h.city||'Raipur',atal,homes:[]};g.homes.push(h);groups.set(key,g)});
  const rank=g=>g.atal?0:g.city==='Raipur'?1:2;
  const list=[...groups.values()].sort((a,b)=>rank(a)-rank(b)||b.homes.length-a.homes.length||a.area.localeCompare(b.area));
  const max=document.body.classList.contains('page-neighbourhoods')?99:6;
  box.innerHTML=list.slice(0,max).map(g=>{const img=(g.homes.find(h=>h.image&&h.image!==NO_PHOTO)||g.homes[0]).image;return `<article class="neighbourhood-card-wrap"><a href="search.html?location=${encodeURIComponent(g.area)}" class="neighbourhood-card"><img src="${photo(img,640)}" alt="Homes in ${esc(g.area)}" loading="lazy"><span class="neighbourhood-meta"><strong>${esc(g.area)}</strong><small>${esc(g.city)} · ${g.homes.length} propert${g.homes.length===1?'y':'ies'}</small></span></a><button class="area-trend-link" type="button" data-area-trend="${esc(g.area)}" data-area-city="${esc(g.city)}">Price history <span aria-hidden="true">↗</span></button></article>`}).join('')}
function openAreaTrend(area,city){
  let dialog=$('#areaTrendDialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='areaTrendDialog';dialog.className='dialog area-trend-dialog';dialog.innerHTML='<div class="dialog-shell"><header class="dialog-head"><div><h2 id="areaTrendTitle"></h2><p>Year-by-year government guideline value</p></div><button class="dialog-close" type="button" aria-label="Close">×</button></header><div class="area-trend-body"></div></div>';document.body.append(dialog);dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}
  $('#areaTrendTitle,.detail-followup-title',dialog).textContent=`${area}, ${city}`;
  const years=['2020–21','2021–22','2022–23','2023–24','2024–25','2025–26'];
  const source=city==='Raipur'?'https://epanjeeyan.cg.gov.in/NGDRS_CG/Users/help':'https://kaveri.karnataka.gov.in/';
  $('.area-trend-body',dialog).innerHTML=`<p class="area-trend-note">Verified year-by-year rates for this exact locality and land category have not been added yet. We show N/A until an official source confirms a comparable figure.</p><div class="area-trend-table-wrap"><table class="area-trend-table"><thead><tr><th>Financial year</th><th>Guideline value</th></tr></thead><tbody>${years.map(y=>`<tr><th scope="row"><span>FY</span> ${y}</th><td>N/A</td></tr>`).join('')}</tbody></table></div><p class="area-trend-note">Government guideline values are valuation benchmarks, not actual sale prices. Rates can vary by exact location, land use and road category.</p><a class="text-link" href="${source}" target="_blank" rel="noopener">Open official valuation source ↗</a>`;
  dialog.showModal();
}function showHomes({location=null,mode=null,type=null,clear=false}={}){if(clear){state.location='';state.developer='all';state.price='all';state.type='all';state.price='all';state.beds='all';state.area=0;state.moveIn='all';state.amenities=[]}if(location!==null)state.location=location;if(mode!==null)state.mode=mode;if(type!==null)state.type=type;state.visibleCount=homes.length;window.location.href=`search.html?mode=${state.mode}&location=${encodeURIComponent(state.location)}&type=${encodeURIComponent(state.type)}&price=${encodeURIComponent(state.price)}&beds=${encodeURIComponent(state.beds)}&area=${encodeURIComponent(state.area)}`}
function renderAccountPanel(){const panel=$('#accountPanel');if(!panel)return;if(state.accountTab==='saved'){const items=state.saved.map(homeById).filter(Boolean);panel.innerHTML=items.length?`<div class="account-saved-list">${items.map(h=>`<div class="account-saved-item"><img src="${photo(h.image,250)}" alt=""><div><strong>${esc(h.title)}</strong><span>${h.displayPrice} · ${esc(h.location)}</span></div><button data-detail="${h.id}">Take a look </button></div>`).join('')}</div>`:`<div class="account-empty"><span>⌂</span><strong>A little space for the ones you love.</strong><p>Save a home that catches your eye and it’ll be right here, waiting for you.</p><button data-go-homes="true">Find your first favourite</button></div>`}
else if(state.accountTab==='preferences'){const p=state.preferences;panel.innerHTML=`<form id="preferencesForm" class="account-pref-form"><label class="form-row"><span>Area I have in mind</span><input name="area" list="raipurAreas" value="${esc(p.area||'Raipur, Chhattisgarh')}" placeholder="A Raipur neighbourhood"><datalist id="raipurAreas">${['Raipur, Chhattisgarh',...neighbourhoods.map(n=>`${n.name}, Raipur`)].map(area=>`<option value="${esc(area)}"></option>`).join('')}</datalist></label><label class="form-row"><span>Home type</span><select name="type"><option value="all">Any home</option>${['Apartment','Villa','Penthouse','Plot'].map(t=>`<option value="${t}" ${p.type===t?'selected':''}>${t}</option>`).join('')}</select></label><label class="form-row"><span>Bedrooms</span><select name="beds"><option value="all">Any BHK</option>${[1,2,3,4,4.5,5].map(n=>`<option value="${n}" ${String(p.beds)===String(n)?'selected':''}>${n} BHK</option>`).join('')}</select></label><label class="form-row"><span>Comfortable budget</span><select name="price">${BUDGETS.map(([v,t])=>`<option value="${v}" ${p.price===v?'selected':''}>${t}</option>`).join('')}</select></label><button type="submit" class="gold-button pref-full">Save my home brief <span>→</span></button></form>`}
else{panel.innerHTML=state.visits.length?state.visits.map((v,i)=>`<div class="visit-card"><div><strong>${esc(v.title)}</strong><span>${esc(v.location)} · ${esc(v.date)} at ${esc(v.time)}</span><span class="visit-status">${esc(v.status)}</span></div><button data-resched-visit="${i}">Reschedule</button></div>`).join(''):`<div class="account-empty"><span>⌂</span><strong>One day this’ll feel like home.</strong><p>When a place catches your eye, book a visit and we’ll help you take a look.</p><button data-go-homes="true">Explore the good places</button></div>`}initGlassDropdowns(panel);const form=$('#preferencesForm',panel);if(form)form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);state.preferences=Object.fromEntries(fd.entries());store.write('preferences',state.preferences);state.location=state.preferences.area||'';state.type=state.preferences.type;state.beds=state.preferences.beds;state.price=state.preferences.price;$('#locationSearch').value=state.location;$$('.search-tab').forEach(t=>t.classList.toggle('selected',t.dataset.mode===state.mode));renderListings();toast('Your little home brief is saved.');})}
function detailHTML(h){const gallery=[h.image,h.image2,h.image3].filter(Boolean),area=h.latitude!=null&&h.longitude!=null?{name:h.neighbourhood,lat:h.latitude,lon:h.longitude}:(neighbourhoods.find(n=>n.name===h.neighbourhood)||neighbourhoods[0]),sqft=h.areaFrom||h.area,pricePerSqft=h.price&&sqft?Math.round(h.price/sqft).toLocaleString('en-IN'):'';return `<div class="property-detail-shell"><div class="detail-topbar"><a href="search.html?location=${encodeURIComponent(h.neighbourhood)}">← All homes in ${esc(h.neighbourhood)}</a><span>${esc(h.city==='Bangalore'?'Bangalore, Karnataka':'Raipur, Chhattisgarh')}</span></div><section class="property-detail-gallery" aria-label="Property photo gallery"><button class="gallery-feature" type="button" data-gallery-image="0" aria-label="View photo 1 of ${esc(h.title)}"><img id="detailHeroImage" src="${photo(gallery[0],1300)}" alt="${esc(h.title)} exterior and main view"><span class="gallery-count">1 / ${(h.gallery&&h.gallery.length)||gallery.length} photos</span></button><div class="gallery-thumbnails">${gallery.slice(1).map((img,i)=>`<button type="button" data-gallery-image="${i+1}" aria-label="View photo ${i+2} of ${esc(h.title)}"><img src="${photo(img,640)}" alt="${i===0?'Interior':'Additional view'} of ${esc(h.title)}"></button>`).join('')}</div><div class="gallery-actions"><button type="button" data-save="${h.id}" class="${state.saved.includes(h.id)?'saved-detail':''}">${state.saved.includes(h.id)?'♥ Saved':'♡ Save home'}</button><span class="share-wrap"><button type="button" data-share="${h.id}" aria-label="Share ${esc(h.title)}">↗ Share</button></span>${voteBtn(h,true)}${h.tour?`<button type="button" data-tour="${h.id}">Explore the 3D tour</button>`:''}</div></section><div class="property-detail-layout"><article class="property-detail-main"><header class="property-detail-heading"><div><span class="detail-verified">✓ The Astittva Estates checked</span><div class="detail-price">${h.displayPrice}</div><h1>${esc(h.title)}</h1><p class="detail-location">${esc(h.location)}</p></div></header><div class="detail-facts">${h.beds?`<div><strong>${esc(h.bedsLabel||String(h.beds))}</strong><span>${h.bedsLabel?'Configurations':'Bedrooms'}</span></div>`:''}${h.baths?`<div><strong>${h.baths}</strong><span>Bathrooms</span></div>`:''}<div><strong>${h.crm?(h.areaFrom?esc(h.areaLabel.replace(' sq. ft.','')):'On request'):h.area.toLocaleString('en-IN')}</strong><span>${h.type==='Plot'?'Plot area':'Built-up area'}${h.crm&&!h.areaFrom?'':' · sq. ft.'}</span></div><div><strong>${h.type}</strong><span>Property type</span></div></div><section class="detail-section"><h2>About this property</h2><p>${esc(h.description)}</p></section>${typeof videoSectionHTML==='function'?videoSectionHTML(h):''}<section class="detail-section"><h2>Property details</h2><div class="detail-spec-grid"><div><span>Asking price</span><strong>${h.displayPrice}</strong></div><div><span>Price per sq. ft.</span><strong>${pricePerSqft?(h.crm?'From ₹':'₹')+pricePerSqft:'On request'}</strong></div><div><span>Neighbourhood</span><strong>${esc(h.neighbourhood)}, ${esc(h.city||'Raipur')}</strong></div><div><span>Availability</span><strong>${esc(h.availability||(h.moveIn?'Ready to move':'Under construction'))}</strong></div><div><span>Listing type</span><strong>${h.deal==='lease'?'For lease':h.deal==='both'?'For sale or lease':'For sale'}</strong></div><div><span>Listing reference</span><strong>TAE-${esc(h.id.toUpperCase())}</strong></div>${(h.extraSpecs||[]).map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div></section>${h.crm&&(h.hasBrochure||h.planCount)?`<section class="detail-section"><h2>Brochure & floor plans</h2><p>${unlockCache(h.id)?'Open for you.':'Leave your name and mobile number to open them.'}</p><div class="detail-files">${h.hasBrochure?`<button type="button" class="gold-button " data-unlock="brochure" data-unlock-home="${esc(h.id)}">${unlockCache(h.id)?'':''}View brochure</button>`:''}${h.planCount?`<button type="button" class="button-outline " data-unlock="plans" data-unlock-home="${esc(h.id)}">${unlockCache(h.id)?'':''}View floor plans (${h.planCount})</button>`:''}</div></section>`:''}<section class="detail-section"><h2>Features & amenities</h2><div class="detail-amenities">${h.amenities.filter(a=>a!=='Verified').map(a=>`<span>${esc(a)}</span>`).join('')||'<span>Contact us for feature details</span>'}</div></section><section class="detail-section detail-area-section"><div><h2>About ${esc(h.neighbourhood)}</h2><p>Explore homes for sale around ${esc(h.neighbourhood)} and see where this property sits in Raipur.</p><a href="search.html?location=${encodeURIComponent(h.neighbourhood+', Raipur')}">View homes in ${esc(h.neighbourhood)}</a></div><iframe title="Map of ${esc(h.neighbourhood)}, Raipur" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=${area.lon-.015}%2C${area.lat-.015}%2C${area.lon+.015}%2C${area.lat+.015}&layer=mapnik&marker=${area.lat}%2C${area.lon}"></iframe></section><p class="detail-note">${h.crm?'Prices, sizes and availability can change. Please confirm the latest details with our team.':'Listing information and imagery are illustrative. Confirm measurements, availability and documents with the seller before purchase.'}</p></article><aside class="detail-contact-card"><span>Interested in this property?</span><strong>Talk with our property team.</strong><p>Ask a question or arrange a time to see it in person.</p><div class="contact-row"><button class="gold-button" type="button" data-contact-home="${h.id}">Contact seller</button>${state.crmContact?.phone?`<a class="contact-icon gold" href="tel:${esc(state.crmContact.phone)}" aria-label="Call us on ${esc(state.crmContact.phone)}" title="Call ${esc(state.crmContact.phone)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg></a>`:''}</div><div class="contact-row visit-row"><button class="button-outline visit-btn" type="button" data-book="${h.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg><span>Schedule a visit</span></button></div><small><span>We’ll follow up about</span> <span class="detail-followup-title">${esc(h.title)}</span>.</small></aside></div></div>`}
function openDetails(id){const h=homeById(id);if(!h)return;window.location.href=`property.html?id=${encodeURIComponent(id)}`}
let tourRoom=0;const rooms=[{name:'The living room',image:'photo-1600607687939-ce8a6c25118c',copy:'Look up. Look around. This is the light that fills your living room at four o’clock.'},{name:'A slower sort of morning',image:'photo-1600210492486-724fe5c67fb0',copy:'Find the quiet corner you will naturally choose, the place your morning will begin.'},{name:'A little bit of outside',image:'photo-1600596542815-ffad4c1539a9',copy:'Step outside. Your private pocket of fresh air is right here.'},{name:'The evening light',image:'photo-1600607687920-4e2a09cf159d',copy:'Take it in from this side, too. Some places reveal their best selves a little later.'}];
function openTour(id){const h=homeById(id),scene=$('#tourScene');if(h)state.currentHome=id;let tourUrl='';if(h?.tourUrl){try{const parsed=new URL(h.tourUrl);if(['https:','http:'].includes(parsed.protocol))tourUrl=parsed.href}catch{}}let frame=$('#propertyTourFrame');if(tourUrl){if(!frame){frame=document.createElement('iframe');frame.id='propertyTourFrame';frame.className='property-tour-frame';frame.title=`3D tour of ${h.title}`;frame.allow='fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking';frame.allowFullscreen=true;scene.append(frame)}frame.src=tourUrl;scene.classList.add('has-external-tour');$('#tourCaptionTitle').textContent=`Step inside ${h.neighbourhood}.`;$('#tourCaptionCopy').textContent='Explore this property in an immersive 3D tour.';openDialog('tourDialog');return}if(frame){frame.src='about:blank';frame.remove()}scene.classList.remove('has-external-tour');tourRoom=0;updateTour();openDialog('tourDialog')}
function updateTour(){const room=rooms[tourRoom];$('#tourScene').style.backgroundImage=`linear-gradient(#17161214,#17161273),url("${photo(room.image,1700)}")`;$('#tourRoomName').textContent=room.name;$('#tourCaptionCopy').textContent=room.copy;const h=homeById(state.currentHome);$('#tourCaptionTitle').textContent=h?`Picture yourself at ${h.neighbourhood}.`:'Picture yourself here.';$('#tourListingLink').onclick=e=>{e.preventDefault();closeDialog('tourDialog');if(state.currentHome)openDetails(state.currentHome)}}
const coords=[{name:'Raipur',city:'Chhattisgarh',lat:21.2514,lon:81.6296},...neighbourhoods.map(({name,city,lat,lon})=>({name,city,lat,lon}))];
function openMap(location=state.location){state.mapLocation=location;const group=coords.find(n=>`${n.name}, ${n.city}`.toLowerCase().includes((location||'').toLowerCase())||`${n.city}`.toLowerCase()===(location||'').toLowerCase())||coords[0];$('#mapPickList').innerHTML=coords.map(n=>`<button class="map-pick ${n.name===group.name?'active':''}" data-map-area="${esc(n.name+', '+n.city)}"><span>${esc(n.name)}</span><small>${esc(n.city)}</small></button>`).join('');setMapFrame(group);openDialog('mapDialog')}
function setMapFrame(area){const found=coords.find(n=>`${n.name}, ${n.city}`===area||n.name===area)||coords[0];const delta=.02;$('#mapFrame').src=`https://www.openstreetmap.org/export/embed.html?bbox=${found.lon-delta}%2C${found.lat-delta}%2C${found.lon+delta}%2C${found.lat+delta}&layer=mapnik&marker=${found.lat}%2C${found.lon}`;$$('.map-pick').forEach(b=>b.classList.toggle('active',b.dataset.mapArea===`${found.name}, ${found.city}`))}
function requestLocation(){const btn=$('#gpsButton');if(!navigator.geolocation){toast('Location is not available in this browser.');return}btn.classList.add('gps-busy');btn.innerHTML='<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="6.5"/></svg> Finding you…';navigator.geolocation.getCurrentPosition(pos=>{const {latitude:lat,longitude:lon}=pos.coords;const near=coords.slice().sort((a,b)=>Math.hypot(a.lat-lat,a.lon-lon)-Math.hypot(b.lat-lat,b.lon-lon))[0];state.location=near?`${near.name}, ${near.city}`:`${lat.toFixed(3)}, ${lon.toFixed(3)}`;$('#locationSearch').value=state.location;showHomes({location:state.location});toast(`Finding homes near ${near?.name||'you'}.`);restoreGps()},()=>{restoreGps();toast('Location access wasn’t available. Try entering a neighbourhood instead.')},{enableHighAccuracy:false,timeout:8000,maximumAge:60000});function restoreGps(){btn.classList.remove('gps-busy');btn.innerHTML='<svg viewBox="0 0 20 20"><path d="M10 2v2M10 16v2M2 10h2m12 0h2"/><circle cx="10" cy="10" r="6.5"/><circle cx="10" cy="10" r="1.5"/></svg> Use my location'}}
function initNavigationUnderline(){const nav=$('.main-nav'),links=$$('.nav-link',nav);if(!nav||!links.length)return;const bc=document.body.classList,file=location.pathname.split('/').pop().toLowerCase()||'index.html',pageHref=bc.contains('page-testimonials')||file==='testimonials.html'?'testimonials.html':bc.contains('page-neighbourhoods')||file==='neighbourhoods.html'?'neighbourhoods.html':file==='sell.html'?'#sell':bc.contains('page-about')||file==='about.html'?'about.html':file==='account.html'?null:'search.html';let pageLink=pageHref?links.find(link=>link.getAttribute('href')===pageHref):null;let active=pageLink;links.forEach(link=>link.classList.toggle('active',link===active));const indicator=document.createElement('span');indicator.className='nav-underline';indicator.setAttribute('aria-hidden','true');nav.appendChild(indicator);nav.classList.add('has-underline');const move=(link,immediate=false)=>{indicator.style.opacity=link?'1':'0';if(!link)return;if(immediate)indicator.style.transition='none';indicator.style.width=link.offsetWidth+'px';indicator.style.transform='translateX('+link.offsetLeft+'px)';if(immediate){indicator.getBoundingClientRect();indicator.style.removeProperty('transition')}};move(active,true);links.forEach(link=>{link.addEventListener('pointerenter',()=>move(link));link.addEventListener('focus',()=>move(link));link.addEventListener('click',event=>{if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;move(link);const href=link.getAttribute('href');if(href==='#sell'||href==='#contact'){links.forEach(item=>item.classList.toggle('active',item===link));active=link;return}const destination=new URL(link.href,location.href);if(destination.pathname.toLowerCase()===location.pathname.toLowerCase())return;event.preventDefault();window.setTimeout(()=>location.assign(destination.href),90)})});nav.addEventListener('pointerleave',()=>move(active));$('#contactDialog')?.addEventListener('close',()=>{active=pageLink;links.forEach(item=>item.classList.toggle('active',item===active));move(active)});window.addEventListener('resize',()=>move(active))}
function setupEvents(){document.addEventListener('keydown',e=>{const card=e.target.closest('.property-card');if(card&&e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openDetails(card.dataset.home)}});document.addEventListener('click',e=>{const sellLink=e.target.closest('a[href="#sell"]');if(sellLink){e.preventDefault();openSellerEnquiry();return}const card=e.target.closest('.property-card');if(card&&!e.target.closest('button,a,input,select')){openDetails(card.dataset.home);return}const galleryPhoto=e.target.closest('[data-gallery-image]');if(galleryPhoto){const h=homeById(state.currentHome),images=[h.image,h.image2,h.image3].filter(Boolean),index=Number(galleryPhoto.dataset.galleryImage);$('#detailHeroImage').src=photo(images[index],1300);$('#detailHeroImage').alt=`${h.title}, photo ${index+1}`;$('.gallery-count').textContent=`${index+1} / ${images.length} photos`;$('[data-gallery-image]').forEach(b=>b.classList.toggle('active',b===galleryPhoto));return}const contactHome=e.target.closest('[data-contact-home]');if(contactHome){const h=homeById(contactHome.dataset.contactHome);state.currentHome=h.id;$('#contactSubline').textContent=`Ask our team about ${h.title}.`;$('#contactHomeLabel').textContent='Property';$('#contactArea').value=`${h.title}, ${h.location}`;{const m=me(),f=$('#contactForm').elements;if(m.name&&f.name&&!f.name.value)f.name.value=m.name;if(m.phone&&f.phone&&!f.phone.value)f.phone.value=m.phone;if(m.email&&f.email&&!f.email.value)f.email.value=m.email;}$('#contactForm').elements.notes.value=`I’m interested in ${h.title}. Please share more details.`;$('#contactForm').dataset.kind='seller-enquiry';openDialog('contactDialog');return}const close=e.target.closest('[data-close]');if(close){closeDialog(close.dataset.close);return}const save=e.target.closest('[data-save]');if(save){const id=save.dataset.save;setSave(id);if(document.body.classList.contains('page-property'))$('#propertyPage').innerHTML=detailHTML(homeById(id));else if($('#detailDialog').open)$('#detailContent').innerHTML=detailHTML(homeById(id));return}const tour=e.target.closest('[data-tour]');if(tour){closeDialog('detailDialog');openTour(tour.dataset.tour);return}const detail=e.target.closest('[data-detail]');if(detail){e.preventDefault();openDetails(detail.dataset.detail);return}const book=e.target.closest('[data-book]');if(book){const h=homeById(book.dataset.book);state.currentHome=h.id;$('#visitPropertyTitle').textContent=`${h.title} · ${h.location}`;const d=new Date();d.setDate(d.getDate()+1);$('#visitDate').min=d.toISOString().split('T')[0];$('#visitDate').value=d.toISOString().split('T')[0];if($('#visitName')&&!$('#visitName').value)$('#visitName').value=state.profile.name||'';if($('#visitPhone')&&!$('#visitPhone').value)$('#visitPhone').value=state.profile.phone||'';formError($('#visitForm'),'');closeDialog('detailDialog');openDialog('visitDialog');return}const pref=e.target.closest('[data-go-homes]');if(pref){closeDialog('accountDialog');document.getElementById('homes').scrollIntoView({behavior:'smooth'});return}const rem=e.target.closest('[data-remove-filter]');if(rem){const key=rem.dataset.removeFilter;if(key.startsWith('amenity:'))state.amenities=state.amenities.filter(x=>x!==key.slice(8));else if(key.startsWith('loc:'))state.localities=state.localities.filter(x=>x!==key.slice(4));else if(key==='budget')state.budget='all';else if(key==='deal')state.deal='all';else if(key==='status')state.status='all';else if(key==='location')state.location='';else if(key==='type')state.type='all';else if(key==='price')state.price='all';else if(key==='beds')state.beds='all';else if(key==='area')state.area=0;else state.moveIn='all';renderListings();return}const n=e.target.closest('[data-neighbourhood]');if(n){showHomes({location:n.dataset.neighbourhood});return}const near=e.target.closest('[data-location]');if(near){showHomes({location:near.dataset.location});return}const acct=e.target.closest('[data-account-tab]');if(acct){state.accountTab=acct.dataset.accountTab;$$('.account-tab').forEach(t=>t.classList.toggle('active',t===acct));renderAccountPanel();return}const resched=e.target.closest('[data-resched-visit]');if(resched){openReschedule(Number(resched.dataset.reschedVisit),resched.closest('.visit-card'));return}const area=e.target.closest('[data-map-area]');if(area){setMapFrame(area.dataset.mapArea);state.mapLocation=area.dataset.mapArea;return}const pill=e.target.closest('[data-amenity]');if(pill){state.amenities=state.amenities.includes(pill.dataset.amenity)?state.amenities.filter(a=>a!==pill.dataset.amenity):[...state.amenities,pill.dataset.amenity];pill.classList.toggle('selected',state.amenities.includes(pill.dataset.amenity));return}});
$$('.search-tab').forEach(b=>b.addEventListener('click',()=>{state.mode=b.dataset.mode;$$('.search-tab').forEach(x=>x.classList.toggle('selected',x===b));renderListings()}));
$('#searchButton').addEventListener('click',()=>showHomes({location:$('#locationSearch').value.trim(),type:$('#propertyType').value}));$('#locationSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();showHomes({location:e.currentTarget.value.trim(),type:$('#propertyType').value})}});$('#propertyType').addEventListener('change',e=>{state.type=e.target.value;renderListings()});$('#priceRange').addEventListener('change',e=>{state.price=e.target.value;renderListings()});$('#bedsFilter').addEventListener('change',e=>{state.beds=e.target.value;renderListings()});$('#areaFilter').addEventListener('change',e=>{state.area=e.target.value==='all'?0:Number(e.target.value);renderListings()});$('#sortFilter').addEventListener('change',e=>{state.sort=e.target.value;renderListings()});$('#loadMore').addEventListener('click',()=>{state.visibleCount=homes.length;renderListings()});$('#seeAllLink').addEventListener('click',e=>{e.preventDefault();location.href='search.html'});$('#clearFilters').addEventListener('click',()=>showHomes({clear:true}));$('#filtersOpen').addEventListener('click',()=>openDialog('filtersDialog'));$('#applyFilters').addEventListener('click',()=>{if($('#modalBudget')){state.price=$('#modalBudget').value;state.status=$('#modalStatus').value;if($('#modalDeveloper'))state.developer=$('#modalDeveloper').value}state.type=$('#modalType').value;state.beds=$('#modalBeds').value;state.moveIn=$('#moveFilter').value;state.area=Number($('#areaRange').value);renderListings();closeDialog('filtersDialog')});$('#resetFilters').addEventListener('click',()=>{state.type='all';state.beds='all';state.moveIn='all';state.area=0;state.amenities=[];state.budget='all';state.deal='all';state.status='all';state.localities=[];renderListings();closeDialog('filtersDialog')});$('#areaRange').addEventListener('input',e=>$('#areaValue').textContent=e.target.value?`${Number(e.target.value).toLocaleString()} sq. ft.`:'Any size');$('#gpsButton').addEventListener('click',requestLocation);$('#mapJump').addEventListener('click',()=>openMap());$('#savedShortcut').addEventListener('click',()=>openAccount('saved'));$('#accountOpen').addEventListener('click',()=>openAccount('saved'));$('#accountFooter').addEventListener('click',()=>openAccount('saved'));$('#mobileMenu').addEventListener('click',()=>$('.main-nav').classList.toggle('mobile-open'));document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>$('.main-nav').classList.remove('mobile-open')));$('.main-nav').addEventListener('click',()=>$('.main-nav').classList.remove('mobile-open'));$('#tourDemo').addEventListener('click',()=>openTour('garden-terrace'));$('#editProfileButton').addEventListener('click',()=>{const p=state.profile;$('#profileName').value=p.name||'';$('#profileEmail').value=p.email||'';$('#profilePhone').value=p.phone||'';openDialog('profileDialog')});$('#profileForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.target);state.profile={name:fd.get('name').trim(),email:fd.get('email').trim(),phone:fd.get('phone').trim()};store.write('profile',state.profile);syncHeader();closeDialog('profileDialog');toast('Your details are saved. Good to have you here.')});$('#tourPrev').addEventListener('click',()=>{tourRoom=(tourRoom+rooms.length-1)%rooms.length;updateTour()});$('#tourNext').addEventListener('click',()=>{tourRoom=(tourRoom+1)%rooms.length;updateTour()});$('#tourHotspot').addEventListener('click',()=>{tourRoom=(tourRoom+1)%rooms.length;updateTour()});let dragging=false,startX=0;$('#tourScene').addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX;e.currentTarget.setPointerCapture(e.pointerId)});$('#tourScene').addEventListener('pointerup',e=>{if(!dragging)return;const dx=e.clientX-startX;dragging=false;if(Math.abs(dx)>65){tourRoom=(tourRoom+(dx<0?1:rooms.length-1))%rooms.length;updateTour()}else if(Math.abs(dx)>15)e.currentTarget.style.backgroundPosition=`${50+dx/5}% center`});$('#visitForm').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,btn=form.querySelector('[type=submit]');const h=homeById(state.currentHome);if(!h)return;const d=new Date($('#visitDate').value+'T12:00:00');const visit={homeId:h.id,title:h.title,location:h.location,date:d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),time:$('#visitTime').value,status:'Requested'};const vName=($('#visitName')?.value||state.profile.name||'').trim(),vPhone=($('#visitPhone')?.value||state.profile.phone||'').trim();formError(form,'');btn.disabled=true;const sent=await sendToCrm({name:vName,mobile:vPhone,email:state.profile.email||'',project:h.crmName||h.title,location:h.neighbourhood,message:`Site visit request: ${visit.date} at ${visit.time} for ${h.title}.`});btn.disabled=false;if(!sent.ok){formError(form,sent.error);return}state.profile={...state.profile,name:state.profile.name||vName,phone:state.profile.phone||vPhone};store.write('profile',state.profile);state.visits.push(visit);store.write('visits',state.visits);closeDialog('visitDialog');state.accountTab='visits';$$('.account-tab').forEach(t=>t.classList.toggle('active',t.dataset.accountTab==='visits'));syncHeader();openDialog('accountDialog');toast('Lovely. We’ll be in touch to confirm your visit.')});$('#contactForm').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,btn=form.querySelector('[type=submit]');const data=Object.fromEntries(new FormData(form).entries());const kind=form.dataset.kind||'enquiry';const h=kind==='seller-enquiry'?homeById(state.currentHome):null;formError(form,'');btn.disabled=true;const sent=await sendToCrm({name:data.name,mobile:data.phone,email:data.email,location:data.area,project:h?(h.crmName||h.title):'',message:(kind==='sell'?'Wants to SELL a property. ':'')+(data.notes||'')});btn.disabled=false;if(!sent.ok){formError(form,sent.error);return}const lead={...data,kind,createdAt:new Date().toISOString()};store.write('leads',[...store.read('leads',[]),lead]);form.innerHTML=`<div class="contact-success"><span>✳</span><h3>Thank you, ${esc(data.name.split(/\s+/)[0])}.</h3><p>We’ve got your note and we’ll be in touch soon. A real person, with a little time for you.</p><button type="button" id="finishContact">Back to looking around</button></div>`;$('#finishContact').addEventListener('click',()=>closeDialog('contactDialog'))});$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));}
document.addEventListener('click',e=>{const trend=e.target.closest('[data-area-trend]');if(trend)openAreaTrend(trend.dataset.areaTrend,trend.dataset.areaCity)});
const HINDI_TEXT={
  'about us':'हमारे बारे में','buy a home':'घर खरीदें','sell with us':'हमारे साथ बेचें','properties':'प्रॉपर्टी','contact':'संपर्क','testimonials':'ग्राहकों की राय','your account':'आपका खाता','good morning':'सुप्रभात','astittva verified':'अस्तित्वा द्वारा सत्यापित','step inside · 3d':'अंदर देखें · 3D','explore':'देखें','the astittva estates checked':'द अस्तित्वा एस्टेट्स द्वारा जाँची गई','share':'शेयर करें','about':'परिचय','view floor plans':'फ़्लोर प्लान देखें','about this property':'इस प्रॉपर्टी के बारे में','asking price':'माँगी गई कीमत','price per sq. ft.':'प्रति वर्ग फुट कीमत','listing reference':'लिस्टिंग संदर्भ','contact us for feature details':'सुविधाओं की जानकारी के लिए संपर्क करें','interested in this property?':'इस प्रॉपर्टी में रुचि है?','talk with our property team.':'हमारी प्रॉपर्टी टीम से बात करें।','ask a question or arrange a time to see it in person.':'सवाल पूछें या इसे देखने का समय तय करें।','contact seller':'विक्रेता से संपर्क करें','schedule a visit':'विज़िट तय करें','your little home brief is saved.':'आपके घर की पसंद सेव कर ली गई है।','loading this home…':'यह घर लोड हो रहा है…',
  'about us':'हमारे बारे में','properties.':'प्रॉपर्टीज़।','who we are':'हम कौन हैं','what we do':'हम क्या करते हैं','buying a home':'घर खरीदना','new projects':'नई परियोजनाएँ','selling your property':'अपनी प्रॉपर्टी बेचें','leasing and commercial':'लीज़ और कमर्शियल प्रॉपर्टी','home loans and paperwork':'होम लोन और कागज़ी काम','after you move in':'आपके घर में आने के बाद','what we believe in':'हमारी सोच','honesty first':'ईमानदारी सबसे पहले','only checked properties':'सत्यापित प्रॉपर्टीज़','your time matters':'आपका समय हमारे लिए अहम है','relationships, not deals':'रिश्ते, सिर्फ़ सौदे नहीं','where we work':'हम कहाँ काम करते हैं','atal nagar (naya raipur)':'अटल नगर (नया रायपुर)','the new capital: planned sectors, wide roads, new projects.':'नई राजधानी: नियोजित सेक्टर, चौड़ी सड़कें और नई परियोजनाएँ।','raipur':'रायपुर','bangalore':'बेंगलुरु','let us find your next home.':'आइए, आपके लिए अगला घर ढूँढें।','see properties':'प्रॉपर्टीज़ देखें','talk to us':'हमसे बात करें',
  'we help families and businesses buy, sell and lease property in atal nagar (naya raipur), raipur and bangalore. we work with checked projects, clear prices and one person who stays with you from the first visit to the day you get the keys.':'हम परिवारों और व्यवसायों को अटल नगर (नया रायपुर), रायपुर और बेंगलुरु में प्रॉपर्टी खरीदने, बेचने और लीज़ पर लेने में मदद करते हैं। हमारी जाँची हुई परियोजनाओं, साफ़ कीमतों और आपकी पहली मुलाक़ात से चाबी मिलने तक साथ रहने वाले सलाहकार के साथ आपको भरोसेमंद मदद मिलती है।',
  'the astittva estates is a real estate group from raipur. our team knows the city area by area: which projects are moving fast, which builders deliver on time, and what a fair price looks like. we also work in bangalore, so families moving between the two cities can deal with one team they already know.':'द अस्तित्वा एस्टेट्स रायपुर का एक रियल एस्टेट समूह है। हमारी टीम शहर के हर इलाके और परियोजनाओं, बिल्डरों की समय पर डिलीवरी तथा उचित कीमतों को समझती है। हम बेंगलुरु में भी काम करते हैं, इसलिए दोनों शहरों के बीच आने-जाने वाले परिवार एक ही परिचित टीम से जुड़ सकते हैं।',
  'we are not a listing portal. every home on this website is a project our team has seen, checked and is ready to show you in person.':'हम केवल लिस्टिंग दिखाने वाला पोर्टल नहीं हैं। इस वेबसाइट की हर प्रॉपर्टी को हमारी टीम ने देखा और जाँचा है, और हम आपको वह व्यक्तिगत रूप से दिखाने के लिए तैयार हैं।',
  'flats, villas, penthouses and plots: ready to move or under construction.':'फ्लैट, विला, पेंटहाउस और प्लॉट: रहने के लिए तैयार या निर्माणाधीन।','new launches from trusted developers, often with launch prices and better choice of units.':'भरोसेमंद डेवलपर की नई परियोजनाएँ, अक्सर शुरुआती कीमतों और बेहतर विकल्पों के साथ।','a fair price, the right buyers and help with every paper till registration.':'उचित कीमत, सही खरीदार और रजिस्ट्रेशन तक हर दस्तावेज़ में मदद।','shops, offices and retail space to buy or to rent.':'खरीदने या किराये पर लेने के लिए दुकानें, कार्यालय और रिटेल स्पेस।','help with bank loans, agreements, registration and possession.':'बैंक लोन, एग्रीमेंट, रजिस्ट्रेशन और पज़ेशन में मदद।','interiors, resale or renting it out later: we are still a call away.':'इंटीरियर, रीसेल या बाद में किराये पर देने के लिए भी हम बस एक कॉल दूर हैं।','we tell you the full price, the good and the not-so-good about every home.':'हम हर घर की पूरी कीमत और उसकी अच्छी-बुरी बातें साफ़-साफ़ बताते हैं।','rera, approvals and the builder\'s record are checked before we show a project.':'किसी परियोजना को दिखाने से पहले हम RERA, मंज़ूरियों और बिल्डर के रिकॉर्ड की जाँच करते हैं।','visits on your schedule, quick answers and no follow-up calls you did not ask for.':'आपके समय के अनुसार विज़िट, तुरंत जवाब और बिना माँगे कोई फ़ॉलो-अप कॉल नहीं।','we want you to come back to us and send your friends. that only happens if we do right by you.':'हम चाहते हैं कि आप दोबारा हमारे पास आएँ और अपने दोस्तों को भी भेजें। यह तभी होगा जब हम आपका भरोसा निभाएँगे।','shankar nagar, vip road, avanti vihar, telibandha and more.':'शंकर नगर, VIP रोड, अवंति विहार, तेलीबांधा और अन्य इलाके।','homes and projects for families moving to or within bangalore.':'बेंगलुरु आने वाले या शहर में रहने वाले परिवारों के लिए घर और परियोजनाएँ।',
  'luxury properties in raipur & bangalore':'रायपुर और बेंगलुरु में लग्ज़री प्रॉपर्टीज़','a little more':'थोड़ी और','room for':'जगह','you.':'आपके लिए।','luxury properties in raipur and bangalore.':'रायपुर और बेंगलुरु में लग्ज़री प्रॉपर्टीज़।','checked by us, shown to you honestly.':'हमारी जाँच के बाद, पूरी ईमानदारी से आपके सामने।','buy':'खरीदें','new projects':'नई परियोजनाएँ','explore map':'मैप देखें','city':'शहर','property type':'प्रॉपर्टी का प्रकार','any home':'कोई भी घर','apartment':'अपार्टमेंट','villa':'विला','penthouse':'पेंटहाउस','plot':'प्लॉट','retail':'रिटेल','for lease':'लीज़ के लिए','budget':'बजट','any budget':'कोई भी बजट','under ₹1 cr':'₹1 करोड़ से कम','₹1 – 1.5 cr':'₹1 – 1.5 करोड़','₹1.5 – 2 cr':'₹1.5 – 2 करोड़','₹2 – 3 cr':'₹2 – 3 करोड़','₹3 cr+':'₹3 करोड़ से अधिक','find a home':'घर खोजें','popular:':'लोकप्रिय:','use my location':'मेरी लोकेशन इस्तेमाल करें',
  'featured homes':'चुनिंदा घर','luxury homes and new projects in raipur and bangalore, picked with care.':'रायपुर और बेंगलुरु के चुनिंदा लग्ज़री घर और नई परियोजनाएँ।','explore all homes':'सभी घर देखें','homes to fall for':'आपके सपनों के घर','any bhk':'कोई भी BHK','any developer':'कोई भी डेवलपर','any size':'कोई भी आकार','more filters':'और फ़िल्टर','sort by':'क्रमबद्ध करें','recommended':'सुझाए गए','price: low to high':'कीमत: कम से ज़्यादा','price: high to low':'कीमत: ज़्यादा से कम','largest first':'सबसे बड़ा पहले','no homes here (yet).':'यहाँ अभी कोई घर नहीं है।','try a broader search or clear some filters and see what turns up.':'खोज का दायरा बढ़ाएँ या कुछ फ़िल्टर हटाकर फिर देखें।','clear filters':'फ़िल्टर हटाएँ','see all homes':'सभी घर देखें','a few good places make all the difference.':'कुछ अच्छी जगहें बहुत फ़र्क लाती हैं।','take a walk':'घूमकर देखें','before the':'आगे बढ़ने से','move.':'पहले।','photos show you a room. a 3d tour lets you feel how you’d live in it. step inside, wander around, and picture your favourite chair in the corner, wherever you are.':'तस्वीरें कमरा दिखाती हैं, जबकि 3D टूर आपको वहाँ रहने का अनुभव देता है। अंदर आइए, घूमकर देखिए और सोचिए कि आपका पसंदीदा आरामकुर्सी वाला कोना कहाँ होगा।','take a 3d home tour':'3D होम टूर देखें','real homes. real space.':'असली घर। असली जगह।','360° · inside & out':'360° · अंदर और बाहर','by':'के अनुसार','area.':'इलाका।','properties by area':'इलाके के अनुसार प्रॉपर्टीज़','every project we sell, by area: atal nagar (naya raipur), raipur and bangalore. tap an area to see its homes.':'हमारी हर परियोजना इलाके के अनुसार देखें: अटल नगर (नया रायपुर), रायपुर और बेंगलुरु। उस इलाके के घर देखने के लिए चुनें।','see all properties':'सभी प्रॉपर्टीज़ देखें','somewhere to go.':'जाने के लिए एक नई जगह।','someone to help':'कोई साथ देने वाला','you':'आप','get there.':'वहाँ तक पहुँचने में।','selling is personal. we’ll give your home the attention it deserves and find it the right person.':'घर बेचना एक निजी फैसला है। हम आपके घर को पूरा ध्यान देंगे और उसके लिए सही खरीदार ढूँढेंगे।','let’s talk about your home':'अपने घर के बारे में बात करें','good things happen':'अच्छी शुरुआत होती है','when they feel right':'जब सब सही लगे','why':'क्यों','what makes us different from a usual broker.':'एक आम ब्रोकर से हम कैसे अलग हैं।','only checked properties':'सत्यापित प्रॉपर्टीज़','every project is visited and checked by our team: rera, approvals, builder record and the real price.':'हमारी टीम हर परियोजना पर जाकर RERA, मंज़ूरियों, बिल्डर के रिकॉर्ड और पूरी कीमत की जाँच करती है।','one person, start to finish':'शुरू से अंत तक एक ही सलाहकार','one advisor handles your search, visits, paperwork and the bank loan. you never repeat yourself.':'एक सलाहकार आपकी खोज, विज़िट, कागज़ी काम और बैंक लोन संभालता है। आपको अपनी बात बार-बार नहीं दोहरानी पड़ती।','honest, full prices':'पूरी और ईमानदार कीमतें','we tell you the total cost up front: parking, plc, gst and registration. no surprises at booking.':'हम पार्किंग, PLC, GST और रजिस्ट्रेशन सहित कुल लागत पहले ही बताते हैं। बुकिंग के समय कोई सरप्राइज़ नहीं।','visits on your time':'आपके समय पर विज़िट','pick a day and time online. we pick you up, show you around and answer every question on the spot.':'ऑनलाइन दिन और समय चुनें। हम आपको लेकर आएँगे, जगह दिखाएँगे और आपके हर सवाल का जवाब देंगे।','raipur and bangalore':'रायपुर और बेंगलुरु','luxury homes, plots and new projects in atal nagar (naya raipur), raipur and bangalore.':'अटल नगर (नया रायपुर), रायपुर और बेंगलुरु में लग्ज़री घर, प्लॉट और नई परियोजनाएँ।','with you after the keys':'चाबी मिलने के बाद भी साथ','help with possession, interiors and resale or rent later. we stay in touch long after the deal.':'पज़ेशन, इंटीरियर और बाद में रीसेल या किराये पर देने में मदद। सौदे के बाद भी हम जुड़े रहते हैं।','in their':'उनकी','words.':'ज़ुबानी।','what our clients say after moving in.':'घर में आने के बाद हमारे ग्राहकों की राय।','good people.':'अच्छे लोग।','good places.':'अच्छी जगहें।','property moves can feel like a lot. we’re here to make it feel like a conversation with someone who actually gets you.':'घर बदलना बड़ा फैसला हो सकता है। हम इसे ऐसे सहज बातचीत जैसा बनाते हैं जहाँ कोई आपकी बात सचमुच समझे।','people before property':'प्रॉपर्टी से पहले लोग','your life comes first. always.':'आपकी ज़िंदगी सबसे पहले। हमेशा।','a little extra looking':'थोड़ी और बारीकी से जाँच','local care in the details.':'हर छोटी बात में स्थानीय समझ।','here when you need us':'ज़रूरत पर हम यहीं हैं','from your first search to your first night.':'पहली खोज से नए घर की पहली रात तक।','find your place':'अपनी जगह खोजें','popular searches':'लोकप्रिय खोजें','property in raipur':'रायपुर में प्रॉपर्टी','flats in raipur':'रायपुर में फ्लैट','flats in naya raipur':'नया रायपुर में फ्लैट','3 bhk flats in raipur':'रायपुर में 3 BHK फ्लैट','bungalows in raipur':'रायपुर में बंगले','plots in raipur':'रायपुर में प्लॉट','new projects in raipur':'रायपुर में नई परियोजनाएँ','luxury homes in raipur':'रायपुर में लग्ज़री घर','we’re here for you':'हम आपकी मदद के लिए हैं','contact us':'संपर्क करें','beyond the address':'पते से आगे',
  'property type':'प्रॉपर्टी का प्रकार','bhk':'BHK','ready to move':'तुरंत रहने के लिए तैयार','either is fine':'दोनों ठीक हैं','under construction':'निर्माणाधीन','minimum area':'न्यूनतम क्षेत्रफल','lovely little extras':'पसंदीदा सुविधाएँ','3d tour':'3D टूर','verified':'सत्यापित','garden':'बगीचा','balcony':'बालकनी','start fresh':'फिर से शुरू करें','show matching homes':'मिलते-जुलते घर दिखाएँ','a few little details.':'कुछ ज़रूरी बातें।','property moves can feel like a lot.':'प्रॉपर्टी से जुड़ी बातें मुश्किल लग सकती हैं।','take a look':'देखें','save home':'घर सेव करें','saved':'सेव किया गया','explore':'देखें','share':'शेयर करें','contact seller':'विक्रेता से संपर्क करें','schedule a visit':'विज़िट तय करें','about this property':'इस प्रॉपर्टी के बारे में','property details':'प्रॉपर्टी की जानकारी','asking price':'माँगी गई कीमत','price per sq. ft.':'प्रति वर्ग फुट कीमत','neighbourhood':'इलाका','availability':'उपलब्धता','listing type':'लिस्टिंग का प्रकार','listing reference':'लिस्टिंग नंबर','features & amenities':'विशेषताएँ और सुविधाएँ','contact us for feature details':'सुविधाओं की जानकारी के लिए संपर्क करें','interested in this property?':'इस प्रॉपर्टी में रुचि है?','talk with our property team.':'हमारी प्रॉपर्टी टीम से बात करें।','ask a question or arrange a time to see it in person.':'सवाल पूछें या इसे देखने का समय तय करें।','schedule a visit':'विज़िट तय करें','we’ll follow up about':'हम इस बारे में आपसे संपर्क करेंगे:',
  'good to see you.':'आपसे मिलकर अच्छा लगा।','a little home for all your home plans.':'आपके घर के सभी सपनों के लिए एक छोटी-सी जगह।','your personal space':'आपकी निजी जगह','add your details':'अपनी जानकारी जोड़ें','saved homes':'सेव किए गए घर','phone':'फ़ोन','sign out':'साइन आउट','my home brief':'मेरी घर की पसंद','my visits':'मेरी विज़िट','a little space for the ones you love.':'आपके पसंदीदा घरों के लिए एक खास जगह।','save a home that catches your eye and it’ll be right here, waiting for you.':'पसंद आया घर सेव करें, वह यहीं आपका इंतज़ार करेगा।','find your first favourite':'अपना पहला पसंदीदा घर खोजें','area i have in mind':'मेरी पसंद का इलाका','home type':'घर का प्रकार','bedrooms':'बेडरूम','comfortable budget':'सुविधाजनक बजट','save my home brief':'मेरी घर की पसंद सेव करें','reschedule':'समय बदलें','a real person, with a little time for you.':'हमारी टीम का एक सदस्य आपसे बात करेगा।',
  'tell us a little about you.':'अपने बारे में थोड़ा बताएँ।','your home, your next chapter. where do we start?':'आपका घर, आपकी नई शुरुआत। कहाँ से शुरू करें?','your name':'आपका नाम','email address':'ईमेल पता','phone number':'फ़ोन नंबर','where are you looking?':'आप कहाँ देख रहे हैं?','anything else you’d like us to know?':'क्या आप कुछ और बताना चाहेंगे?','start a conversation':'बात शुरू करें','welcome back.':'वापसी पर स्वागत है।','sign in with your email and password.':'अपने ईमेल और पासवर्ड से साइन इन करें।','password':'पासवर्ड','sign in':'साइन इन करें','new here? create an account':'यहाँ नए हैं? खाता बनाएँ','create your account.':'अपना खाता बनाएँ।','save homes and keep your plans together.':'घर सेव करें और अपनी योजनाएँ एक जगह रखें।','use at least 6 characters.':'कम-से-कम 6 अक्षर इस्तेमाल करें।','create account':'खाता बनाएँ','already have an account? sign in':'पहले से खाता है? साइन इन करें','sign in with phone.':'फ़ोन से साइन इन करें।','we’ll text you a one-time verification code.':'हम आपको एक बार इस्तेमाल होने वाला सत्यापन कोड भेजेंगे।','phone number with country code':'देश कोड सहित फ़ोन नंबर','verification code':'सत्यापन कोड','send verification code':'सत्यापन कोड भेजें','send a new code':'नया कोड भेजें','a little introduction.':'थोड़ा परिचय।','mobile number':'मोबाइल नंबर','save my details':'मेरी जानकारी सेव करें','see it for yourself.':'खुद आकर देखें।','let’s find a time that feels good.':'आइए, आपके लिए सही समय चुनें।','choose a day':'दिन चुनें','a time that works for you':'आपके लिए सुविधाजनक समय','request a visit':'विज़िट का अनुरोध करें','a place that feels like yours.':'एक ऐसी जगह जो आपकी लगे।','explore the neighbourhoods our homes call home.':'उन इलाकों को देखें जिन्हें हमारे घर अपना कहते हैं।','open official valuation source':'आधिकारिक मूल्यांकन स्रोत खोलें','price history':'कीमत का इतिहास','year-by-year government guideline value':'हर साल का सरकारी गाइडलाइन मूल्य','financial year':'वित्तीय वर्ष','guideline value':'गाइडलाइन मूल्य','verified year-by-year rates for this exact locality and land category have not been added yet. we show n/a until an official source confirms a comparable figure.':'इस इलाके और भूमि श्रेणी के सत्यापित सालाना रेट अभी उपलब्ध नहीं हैं। आधिकारिक स्रोत से मिलान योग्य आँकड़े मिलने तक यहाँ N/A दिखेगा।','government guideline values are valuation benchmarks, not actual sale prices. rates can vary by exact location, land use and road category.':'सरकारी गाइडलाइन मूल्य मूल्यांकन के मानक हैं, वास्तविक बिक्री कीमतें नहीं। दरें सटीक जगह, भूमि उपयोग और सड़क श्रेणी के अनुसार बदल सकती हैं।','n/a':'उपलब्ध नहीं',
  'find your dream home':'अपने सपनों का घर खोजें','free · takes 1 minute':'मुफ़्त · केवल 1 मिनट','tell us your dream home.':'अपने सपनों के घर के बारे में बताएँ।','we find it for you.':'हम आपके लिए उसे ढूँढेंगे।','our advisor will shortlist homes that fit your budget and call you. no spam, no pressure.':'हमारे सलाहकार आपके बजट के अनुसार घर चुनकर आपको कॉल करेंगे। न स्पैम, न दबाव।','what are you looking for?':'आप क्या ढूँढ रहे हैं?','type of property':'प्रॉपर्टी का प्रकार','your budget':'आपका बजट','which area do you prefer?':'आपको कौन-सा इलाका पसंद है?','buying for':'किसके लिए खरीद रहे हैं','when do you plan to buy?':'आप कब तक खरीदना चाहते हैं?','will you need a home loan?':'क्या आपको होम लोन चाहिए?','best time to call you':'कॉल करने का सही समय','anything else? (optional)':'कुछ और? (वैकल्पिक)','find homes for me':'मेरे लिए घर खोजें','your number is safe with us. we call only about homes you asked for.':'आपका नंबर हमारे पास सुरक्षित है। हम सिर्फ़ उन्हीं घरों के बारे में कॉल करेंगे जिनके लिए आपने पूछा है।',
  'price history':'कीमत का इतिहास','all homes in':'इस इलाके के सभी घर','view homes in':'इस इलाके के घर देखें','on request':'अनुरोध पर','ready to move':'तुरंत रहने के लिए तैयार','for sale':'बिक्री के लिए','for lease':'लीज़ के लिए','for sale or lease':'बिक्री या लीज़ के लिए','configurations':'कॉन्फ़िगरेशन','bathrooms':'बाथरूम','plot area':'प्लॉट का क्षेत्रफल','built-up area':'निर्मित क्षेत्रफल','property type':'प्रॉपर्टी का प्रकार','availability':'उपलब्धता','features & amenities':'विशेषताएँ और सुविधाएँ','brochure & floor plans':'ब्रोशर और फ़्लोर प्लान','view brochure':'ब्रोशर देखें','view floor plans':'फ़्लोर प्लान देखें','explore the 3d tour':'3D टूर देखें','all homes':'सभी घर','photos':'तस्वीरें','saved homes':'सेव किए गए घर','we’ve got your note and we’ll be in touch soon.':'आपका संदेश मिल गया। हम जल्द ही आपसे संपर्क करेंगे।','back to looking around':'वापस ब्राउज़ करें','thank you,':'धन्यवाद,','share':'शेयर करें','no homes here (yet).':'यहाँ अभी कोई घर नहीं है।','find homes':'घर खोजें','filter':'फ़िल्टर','apply filters':'फ़िल्टर लागू करें','reset filters':'फ़िल्टर रीसेट करें','show homes':'घर दिखाएँ','any time':'कोई भी समय','any area':'कोई भी इलाका','all':'सभी','a raipur neighbourhood':'रायपुर का कोई इलाका','new launches and projects under construction. book early for the best price and choice.':'निर्माणाधीन नई परियोजनाएँ। बेहतर कीमत और विकल्प के लिए जल्दी बुक करें।','remove saved home':'सेव किए गए घर हटाएँ','save home':'घर सेव करें','taken off your saved homes.':'आपके सेव किए गए घरों से हटा दिया गया।','saved to your account.':'आपके खाते में सेव किया गया।','a little place to come back to.':'फिर से देखने के लिए एक खास जगह।','location access wasn’t available. try entering a neighbourhood instead.':'लोकेशन उपलब्ध नहीं है। इसके बजाय इलाके का नाम लिखें।','could not send right now. please try again.':'अभी भेजा नहीं जा सका। कृपया फिर कोशिश करें।','could not connect. check your internet and try again.':'कनेक्ट नहीं हो सका। इंटरनेट जाँचकर फिर कोशिश करें।','price on request':'कीमत पूछने पर','size on request':'आकार पूछने पर','the astittva estates.':'द अस्तित्वा एस्टेट्स।','property photo gallery':'प्रॉपर्टी की तस्वीरें','view this home':'यह घर देखें','explore this property in an immersive 3d tour.':'इस प्रॉपर्टी का 3D टूर देखें।','edit your details':'अपनी जानकारी बदलें','a little home brief':'घर की पसंद','my details':'मेरी जानकारी','good morning':'सुप्रभात','good afternoon':'नमस्कार','good evening':'शुभ संध्या','view in english':'अंग्रेज़ी में देखें','financial year':'वित्तीय वर्ष','guideline value':'गाइडलाइन मूल्य','verified year-by-year rates for this exact locality and land category have not been added yet. we show n/a until an official source confirms a comparable figure.':'इस इलाके और भूमि श्रेणी के सत्यापित सालाना रेट अभी उपलब्ध नहीं हैं। आधिकारिक स्रोत से मिलान योग्य आँकड़े मिलने तक यहाँ N/A दिखेगा।','government guideline values are valuation benchmarks, not actual sale prices. rates can vary by exact location, land use and road category.':'सरकारी गाइडलाइन मूल्य मूल्यांकन के मानक हैं, वास्तविक बिक्री कीमतें नहीं। दरें सटीक जगह, भूमि उपयोग और सड़क श्रेणी के अनुसार बदल सकती हैं।','fy':'वित्त वर्ष','n/a':'उपलब्ध नहीं','homes':'घर','properties':'प्रॉपर्टीज़','propert':'प्रॉपर्टी',
  '© 2026 the astittva estates · raipur & bangalore':'© 2026 द अस्तित्वा एस्टेट्स · रायपुर और बेंगलुरु','360° immersive tour':'360° इमर्सिव टूर','the living room':'बैठक का कमरा','drag to take a look around':'देखने के लिए खींचें','inside & outside. all yours.':'अंदर और बाहर। सब आपका।','picture yourself here.':'यहाँ खुद को महसूस करें।','look up. look around. this is the light that fills your living room at four o’clock.':'ऊपर देखिए, चारों ओर नज़र डालिए। शाम चार बजे आपके बैठक के कमरे में ऐसी रोशनी होगी।','see this home':'यह घर देखें','© openstreetmap contributors':'© ओपनस्ट्रीटमैप योगदानकर्ता','find your home':'अपना घर खोजें','luxury homes in raipur, naya raipur & bangalore':'रायपुर, नया रायपुर और बेंगलुरु में लग्ज़री घर','homes for sale in raipur':'रायपुर में बिक्री के लिए घर','sell your property':'अपनी प्रॉपर्टी बेचें','homes picked for you':'आपके लिए चुने गए घर','client reviews':'ग्राहकों की राय','about us | the astittva estates':'हमारे बारे में | द अस्तित्वा एस्टेट्स','your account | the astittva estates':'आपका खाता | द अस्तित्वा एस्टेट्स','find your home | the astittva estates':'अपना घर खोजें | द अस्तित्वा एस्टेट्स','the astittva estates | luxury homes in raipur, naya raipur & bangalore':'द अस्तित्वा एस्टेट्स | रायपुर, नया रायपुर और बेंगलुरु में लग्ज़री घर','properties by area | the astittva estates':'इलाके के अनुसार प्रॉपर्टीज़ | द अस्तित्वा एस्टेट्स','property details | the astittva estates':'प्रॉपर्टी की जानकारी | द अस्तित्वा एस्टेट्स','homes for sale in raipur | the astittva estates':'रायपुर में बिक्री के लिए घर | द अस्तित्वा एस्टेट्स','sell your property | the astittva estates':'अपनी प्रॉपर्टी बेचें | द अस्तित्वा एस्टेट्स','homes picked for you | the astittva estates':'आपके लिए चुने गए घर | द अस्तित्वा एस्टेट्स','client reviews | the astittva estates':'ग्राहकों की राय | द अस्तित्वा एस्टेट्स','home':'घर','for':'के लिए'
};
Object.assign(HINDI_TEXT,{
  'where is your home?':'आपका घर कहाँ है?','type a city or area':'शहर या इलाका लिखें','what should we call you?':'हम आपको किस नाम से बुलाएँ?','neighbourhood or city':'इलाका या शहर','a little about the place you have in mind…':'अपनी पसंद की जगह के बारे में थोड़ा बताएँ…','e.g. atal nagar, shankar nagar':'जैसे: अटल नगर, शंकर नगर','e.g. atal nagar, raipur':'जैसे: अटल नगर, रायपुर','you@somewhere.com':'आपका ईमेल','10-digit mobile':'10 अंकों का मोबाइल नंबर','e.g. east facing, near a school, ground floor for parents':'जैसे: पूर्वमुखी, स्कूल के पास, माता-पिता के लिए भूतल','what did you like? how did we help?':'आपको क्या पसंद आया? हमने कैसे मदद की?','how did we help you?':'हमने आपकी कैसे मदद की?','main navigation':'मुख्य नेविगेशन','view saved homes':'सेव किए गए घर देखें','open menu':'मेन्यू खोलें','search properties':'प्रॉपर्टीज़ खोजें','developer':'डेवलपर','area':'इलाका','sculptural architecture and shaded garden at a modern home':'आधुनिक घर की बनावट और छायादार बगीचा','explore real estate neighbourhoods on an interactive map':'रियल एस्टेट इलाकों का इंटरैक्टिव नक्शा देखें','the astittva estates, beyond the address':'द अस्तित्वा एस्टेट्स, पते से आगे','rating':'रेटिंग'});
Object.assign(HINDI_TEXT,{
  'open for you.':'आपके लिए उपलब्ध।','leave your name and mobile number to open them.':'इन्हें देखने के लिए अपना नाम और मोबाइल नंबर दें।','prices, sizes and availability can change. please confirm the latest details with our team.':'कीमतें, आकार और उपलब्धता बदल सकते हैं। कृपया हमारी टीम से नवीनतम जानकारी की पुष्टि करें।','listing information and imagery are illustrative. confirm measurements, availability and documents with the seller before purchase.':'लिस्टिंग की जानकारी और तस्वीरें उदाहरण के लिए हैं। खरीदने से पहले माप, उपलब्धता और दस्तावेज़ विक्रेता से जाँच लें।','and see where this property sits in raipur.':'और देखें कि यह प्रॉपर्टी रायपुर में कहाँ है।','see':'देखें','in full':'पूरी जानकारी','opened this home on the website':'यह घर वेबसाइट पर खोला गया','please tell us who you are: your name and the mobile number you gave our team.':'कृपया अपना परिचय दें: आपका नाम और वह मोबाइल नंबर जो आपने हमारी टीम को दिया था।','photos, price, size and location. just tell us who you are, it takes 5 seconds.':'तस्वीरें, कीमत, आकार और लोकेशन देखने के लिए अपना परिचय दें। इसमें केवल 5 सेकंड लगेंगे।','tell us who you are. just your name and mobile number.':'अपना परिचय दें। केवल नाम और मोबाइल नंबर चाहिए।','welcome! you can now see every home in full.':'स्वागत है! अब आप हर घर की पूरी जानकारी देख सकते हैं।','could not add gmail.':'Gmail नहीं जोड़ा जा सका।','please enter your name.':'कृपया अपना नाम दर्ज करें।','please enter a valid 10-digit mobile number.':'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।','beds':'बेडरूम','baths':'बाथरूम','take a look':'देखें','saved':'सेव किया गया','all homes in':'इस इलाके के सभी घर','about':'परिचय','explore homes for sale around':'इस इलाके में बिक्री के लिए घर देखें','view homes in':'इस इलाके के घर देखें','raipur neighbourhood map':'रायपुर के इलाके का नक्शा','bangalore neighbourhood map':'बेंगलुरु के इलाके का नक्शा','continue with google':'Google के साथ जारी रखें','previous room':'पिछला कमरा','next room':'अगला कमरा','the astittva estates home':'द अस्तित्वा एस्टेट्स का घर','preferred day':'पसंदीदा दिन','rating':'रेटिंग'});
function initHindiTranslation(){
  const header=$('.header-actions')||$('.site-header')||document.body;if(header.querySelector('[data-language-toggle]'))return;
  const button=document.createElement('button');button.type='button';button.className='language-toggle';button.dataset.languageToggle='true';button.setAttribute('aria-label','हिंदी में देखें');header.append(button);
  const heroLine=$('.hero-rotating-line'),heroHeading=$('.page-home .hero h1'),heroLead=heroHeading?.firstChild,heroLeadEnglish=heroLead?.nodeValue,heroWord=$('#heroWord'),heroFor=$('.hero-word-for'),heroEnding=$('.hero-rotating-line em');if(heroLine)heroLine.dataset.languageStaticOverride='true';if(heroHeading)heroHeading.dataset.languageStaticOverride='true';
  const normalized=s=>String(s).replace(/\s+/g,' ').trim().toLocaleLowerCase('en');
  const englishToHindi=new Map(Object.entries(HINDI_TEXT).map(([en,hi])=>[normalized(en),hi]));const hindiToEnglish=new Map();for(const [en,hi] of englishToHindi)if(!hindiToEnglish.has(normalized(hi)))hindiToEnglish.set(normalized(hi),en);
  const escapeRegex=phrase=>phrase.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const makePhrases=map=>[...map.entries()].sort((a,b)=>b[0].length-a[0].length).map(([phrase,replacement])=>({replacement,pattern:new RegExp(`(^|[^\\p{L}\\p{N}])(${escapeRegex(phrase)})(?=$|[^\\p{L}\\p{N}])`,'giu')}));
  const enPhrases=makePhrases(englishToHindi),hiPhrases=makePhrases(hindiToEnglish);
  function convert(value,exact,phrases){const direct=exact.get(normalized(value));if(direct)return direct;let result=String(value);for(const {pattern,replacement} of phrases){pattern.lastIndex=0;result=result.replace(pattern,(_match,prefix)=>prefix+replacement)}return result}
  const textState=new WeakMap(),attributeState=new WeakMap();let hindi=false;
  const eligible=el=>!!el&&!el.closest('script,style,noscript,svg,[data-language-toggle],[data-language-static-override],.property-title,.property-price,.property-location,.property-spec,.detail-price,.detail-location,.detail-facts strong,.detail-spec-grid strong,.detail-amenities,.property-detail-heading h1,.neighbourhood-meta,#areaTrendTitle,.detail-followup-title');
  function applyText(node){const el=node.parentElement;if(!eligible(el)||el.closest('input,textarea,img'))return;const current=node.nodeValue;let state=textState.get(node);if(!state||current!==state.rendered){state={english:convert(current,hindiToEnglish,hiPhrases),rendered:current};textState.set(node,state)}const rendered=hindi?convert(state.english,englishToHindi,enPhrases):state.english;if(current!==rendered){state.rendered=rendered;node.nodeValue=rendered}else state.rendered=current}
  function applyAttribute(el,attr){if(!eligible(el))return;const current=el.getAttribute(attr);if(current===null)return;let attrs=attributeState.get(el);if(!attrs){attrs=new Map();attributeState.set(el,attrs)}let state=attrs.get(attr);if(!state||current!==state.rendered){state={english:convert(current,hindiToEnglish,hiPhrases),rendered:current};attrs.set(attr,state)}const rendered=hindi?convert(state.english,englishToHindi,enPhrases):state.english;if(current!==rendered){state.rendered=rendered;el.setAttribute(attr,rendered)}else state.rendered=current}
  function translate(root=document.body){if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode()))applyText(node);const elements=root.nodeType===Node.ELEMENT_NODE?[root,...root.querySelectorAll('*')]:[...root.querySelectorAll?.('*')||[]];for(const el of elements)for(const attr of ['aria-label','title','placeholder','alt'])applyAttribute(el,attr)}
  const titleEnglish=convert(document.title,hindiToEnglish,hiPhrases);
  function setLanguage(useHindi){hindi=useHindi;document.documentElement.lang=hindi?'hi':'en';button.textContent=hindi?'English':'हिन्दी';button.setAttribute('aria-label',hindi?'View in English':'हिंदी में देखें');button.setAttribute('aria-pressed',String(hindi));if(heroLine&&heroWord&&heroFor&&heroEnding){if(heroLead)heroLead.nodeValue=hindi?'आपके लिए':heroLeadEnglish;heroWord.textContent=hindi?'थोड़ी और जगह':'home';heroFor.hidden=hindi;heroEnding.hidden=hindi;heroFor.textContent='for';heroEnding.textContent='you.';heroLine.classList.toggle('hero-line-hi',hindi)}translate();document.title=hindi?convert(titleEnglish,englishToHindi,enPhrases):titleEnglish;window.resetHomeHeroWordCycle?.();try{localStorage.setItem('tae-language',hindi?'hi':'en')}catch{}}
  button.addEventListener('click',()=>setLanguage(!hindi));let savedLanguage='en';try{savedLanguage=localStorage.getItem('tae-language')||'en'}catch{}setLanguage(savedLanguage==='hi');
  let translationFrame=0;window.applySiteLanguage=()=>translate(document.body);const observer=new MutationObserver(()=>{if(translationFrame)return;translationFrame=requestAnimationFrame(()=>{translationFrame=0;translate(document.body)})});observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']});
}
initHindiTranslation();

function initHeroWordCycle(){const windowEl=$('.hero-word-window'),wordEl=$('#heroWord');if(!windowEl||!wordEl)return;const englishWords=['home','place','space','everything'],hindiWords=['थोड़ी और जगह','थोड़ी और रोशनी','थोड़ी और शांति','थोड़ी और खुशहाली'];let words=document.documentElement.lang==='hi'?hindiWords:englishWords,index=0,busy=false;
  const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const measure=word=>{const c=wordEl.cloneNode(false);c.removeAttribute('id');c.textContent=word;c.style.cssText='position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;transition:none;transform:none;filter:none;opacity:0';windowEl.style.position='relative';windowEl.appendChild(c);const w=c.getBoundingClientRect().width;c.remove();return Math.ceil(w)+2};
  const fit=(animate=true,i=index)=>{windowEl.style.transition=animate&&!calm?'width .6s cubic-bezier(.65,0,.35,1)':'none';windowEl.style.width=measure(words[i])+'px'};
  fit(false);window.addEventListener('resize',()=>fit(false),{passive:true});if(document.fonts){document.fonts.ready.then(()=>fit(false));document.fonts.addEventListener?.('loadingdone',()=>fit(false))}
  wordEl.style.transition=calm?'none':'opacity .45s ease, transform .6s cubic-bezier(.22,.75,.25,1), filter .45s ease';
  window.resetHomeHeroWordCycle=()=>{words=document.documentElement.lang==='hi'?hindiWords:englishWords;index=0;busy=false;wordEl.style.transition='none';wordEl.style.opacity='1';wordEl.style.transform='translateY(0)';wordEl.style.filter='blur(0)';wordEl.textContent=words[0];fit(false,0)};
  const step=()=>{const activeWords=document.documentElement.lang==='hi'?hindiWords:englishWords;if(activeWords!==words){window.resetHomeHeroWordCycle();return}if(busy||document.hidden)return;busy=true;const next=(index+1)%words.length,grow=measure(words[next])>measure(words[index]);
    if(grow)fit(true,next);
    wordEl.style.opacity='0';wordEl.style.transform='translateY(-.22em)';wordEl.style.filter='blur(4px)';
    setTimeout(()=>{index=(index+1)%words.length;wordEl.style.transition='none';wordEl.style.transform='translateY(.22em)';wordEl.textContent=words[index];void wordEl.offsetWidth;
      if(!grow)fit(true);
      setTimeout(()=>{wordEl.style.transition=calm?'none':'opacity .55s ease, transform .7s cubic-bezier(.22,.75,.25,1), filter .55s ease';wordEl.style.opacity='1';wordEl.style.transform='translateY(0)';wordEl.style.filter='blur(0)';setTimeout(()=>{busy=false},700)},grow?180:120)
    },calm?0:620)};
  setInterval(step,3600)}

/* ---- Brochure & floor plans: open only after name + mobile (saved as a lead in the CRM) ---- */
const unlockState={home:null,what:'brochure'};
/* The browser only remembers WHO asked; the CRM decides every time whether the files open (first call done). */
function unlockCache(id){try{const v=JSON.parse(localStorage.getItem('surestone:open:'+id)||'null');return v&&v.at>Date.now()-864e5?v:null}catch{return null}}
try{Object.keys(localStorage).filter(k=>k.startsWith('surestone:files:')).forEach(k=>localStorage.removeItem(k))}catch{}
function unlockSave(id){try{localStorage.setItem('surestone:open:'+id,JSON.stringify({at:Date.now()}))}catch{}}
function unlockForget(id){try{localStorage.removeItem('surestone:open:'+id)}catch{}}
function askedFor(id){try{return JSON.parse(localStorage.getItem('surestone:asked:'+id)||'null')}catch{return null}}
function setAsked(id,v){try{localStorage.setItem('surestone:asked:'+id,JSON.stringify(v));localStorage.setItem('surestone:asked',JSON.stringify(v))}catch{}}
function askedAny(){try{return JSON.parse(localStorage.getItem('surestone:asked')||'null')}catch{return null}}
async function unlockRequest(h,{name,phone,recheck,website=''}){const c=crmConfig();const idToken=await phoneToken();const r=await fetch(`${c.url}/api/site/unlock`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:c.formKey,t:state.shortlist?.t||undefined,project:h.crmId,projectName:h.crmName,name,phone,email:state.authUser?.email||state.profile.email||undefined,idToken,what:unlockState.what==='plans'?'plans':'brochure',recheck:!!recheck,website})});const res=await r.json().catch(()=>({}));if(res.needVerify){state.needVerify=true;return{needVerify:true}}if(res.locked)return{locked:true,message:res.error};if(!r.ok||!res.ok)throw new Error(res.error||'Could not open it right now. Please try again.');return res}
function showWaiting(h,msg){const d=unlockDialog(),ask=d.querySelector('#unlockAsk'),box=d.querySelector('#unlockFiles');ask.hidden=true;d.querySelector('#unlockVerify').hidden=true;box.hidden=false;$('#unlockTitle').textContent='Please try again';$('#unlockSub').textContent=h.title;box.innerHTML=`<div class="unlock-wait"><p>${esc(msg||'Could not open it right now. Please try again, or call us.')}</p></div>`;if(!d.open)d.showModal()}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-unlock-recheck]');if(!b)return;const h=homeById(unlockState.home),a=askedFor(h?.id);if(!h||!a)return;b.disabled=true;try{const res=await unlockRequest(h,{...a,recheck:true});if(res.needVerify)return openVerify(h);if(res.locked)showWaiting(h,res.message);else{unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans})}}catch(err){b.disabled=false;toast(err.message==='Failed to fetch'?'Could not connect. Try again.':err.message)}});
function markUnlocked(h){$$(`[data-unlock-home="${CSS.escape(h.id)}"]`).forEach(b=>{b.classList.remove('locked');b.querySelector('.lock')?.remove()})}
function unlockDialog(){
  let d=document.getElementById('unlockDialog');if(d)return d;
  d=document.createElement('dialog');d.className='dialog';d.id='unlockDialog';
  d.innerHTML='<form class="dialog-shell contact-shell" id="unlockForm" novalidate><header class="dialog-head"><div><h2 id="unlockTitle">Get the brochure</h2><p id="unlockSub"></p></div><button type="button" class="dialog-close" data-close="unlockDialog" aria-label="Close">×</button></header><div id="unlockAsk"><label class="form-row"><span>Your name</span><input name="name" autocomplete="name" placeholder="What should we call you?" required></label><label class="form-row"><span>Mobile number</span><input name="phone" type="tel" autocomplete="tel" placeholder="+91" required></label><input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="display:none"><button class="gold-button contact-submit" type="submit">Request access <span>→</span></button><p class="unlock-note">We share your number only with our own team. No spam.</p></div><div id="unlockVerify" hidden><label class="form-row"><span>Your name</span><input name="vname" autocomplete="name" placeholder="What should we call you?"></label><label class="form-row"><span>Mobile number</span><input name="vphone" type="tel" autocomplete="tel" placeholder="+91 98765 43210"></label><div id="vRecaptcha" class="v-recaptcha"></div><button type="button" class="gold-button contact-submit" id="vSend">Send code by SMS <span>→</span></button><label class="form-row" id="vCodeRow" hidden><span>6-digit code</span><input id="vCode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="••••••"></label><button type="button" class="gold-button contact-submit" id="vConfirm" hidden>Verify <span>→</span></button><p class="unlock-note">We share your number only with our own team. No spam.</p><p class="verify-status" id="verifyStatus" role="status"></p></div><div id="unlockFiles" hidden></div></form>';
  document.body.appendChild(d);
  d.addEventListener('click',e=>{if(e.target===d)d.close()});
  d.querySelector('#unlockForm').addEventListener('submit',async e=>{
    e.preventDefault();const form=e.currentTarget,btn=form.querySelector('[type=submit]'),h=homeById(unlockState.home),c=crmConfig();
    const name=form.elements.name.value.trim(),phone=form.elements.phone.value.trim();
    if(name.length<2){formError(form,'Please enter your name.');return}
    if(phone.replace(/\D/g,'').length<10){formError(form,'Please enter a valid mobile number (India: 10 digits).');return}
    if(!h||!c||!c.formKey){formError(form,'This is not available right now. Please call us.');return}
    formError(form,'');btn.disabled=true;
    let res;try{res=await unlockRequest(h,{name,phone,website:form.elements.website.value});if(res.needVerify){btn.disabled=false;return openVerify(h)}}catch(err){btn.disabled=false;formError(form,err.message==='Failed to fetch'?'Could not connect. Check your internet and try again.':err.message);return}
    btn.disabled=false;state.profile={...state.profile,name:state.profile.name||name,phone:state.profile.phone||phone};store.write('profile',state.profile);
    setAsked(h.id,{name,phone});
    if(res.locked){unlockForget(h.id);showWaiting(h,res.message);return}
    unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans});
  });
  return d;
}
function showUnlocked(h,files){
  const d=unlockDialog(),ask=d.querySelector('#unlockAsk'),box=d.querySelector('#unlockFiles');
  ask.hidden=true;d.querySelector('#unlockVerify').hidden=true;box.hidden=false;
  const plans=(files.plans||[]).filter(p=>/^https?:\/\//.test(p.url||''));
  const isImg=u=>/\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(u);
  const wantPlans=unlockState.what==='plans';
  $('#unlockTitle').textContent=wantPlans?'Floor plans':'Brochure';
  $('#unlockSub').textContent=`${h.title} · thank you, our team will be in touch.`;
  const brochure=files.brochure&&/^https?:\/\//.test(files.brochure)?`<a class="gold-button unlock-open" href="${esc(files.brochure)}" target="_blank" rel="noopener noreferrer">Open the brochure <span>→</span></a>`:'';
  const planHtml=plans.length?`<div class="plan-grid">${plans.map((p,i)=>`<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="plan-item">${isImg(p.url)?`<img src="${esc(p.url)}" alt="${esc(p.label||'Floor plan '+(i+1))}" loading="lazy">`:'<span class="plan-file">PDF</span>'}<span>${esc(p.label||'Floor plan '+(i+1))}</span></a>`).join('')}</div>`:'';
  // Show only what was asked for: floor plans → floor plans, brochure → brochure.
  const onePlan=plans.length===1?`<a class="gold-button unlock-open" href="${esc(plans[0].url)}" target="_blank" rel="noopener noreferrer">Open the floor plan${plans[0].label?' · '+esc(plans[0].label.slice(0,40)):''} <span>→</span></a>`:'';
  box.innerHTML=wantPlans
    ?(plans.length===1&&!isImg(plans[0].url)?onePlan:planHtml)||'<p class="unlock-note">Floor plans are not added yet. Our team will send them to you.</p>'
    :brochure||'<p class="unlock-note">The brochure is not added yet. Our team will send it to you.</p>';
  if(!d.open)d.showModal();
}
/* ---- Verify the mobile with an SMS code (Firebase). The CRM checks Firebase's signed token, so a typed number is not enough. ---- */
const phoneVerified=()=>Boolean(window.sureStoneAuth?.currentPhone?.());
async function phoneToken(){try{return window.sureStoneAuth?.currentPhone?.()?await window.sureStoneAuth.getIdToken():undefined}catch{return undefined}}
function toE164(v){const d=String(v||'').replace(/[^\d+]/g,'');if(d.startsWith('+'))return d;const n=d.replace(/\D/g,'');return n.length===10?'+91'+n:n.length===12&&n.startsWith('91')?'+'+n:n.length===11&&n.startsWith('0')?'+91'+n.slice(1):''}
async function afterVerified(h,name){
  try{const res=await unlockRequest(h,{name});if(res.needVerify)return;setAsked(h.id,{name});if(res.locked){unlockForget(h.id);showWaiting(h,res.message)}else{unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans})}}
  catch(err){$('#verifyStatus').textContent=err.message==='Failed to fetch'?'Could not connect. Check your internet and try again.':err.message}
}
function openVerify(h){
  const d=unlockDialog(),form=d.querySelector('#unlockForm'),panel=d.querySelector('#unlockVerify'),status=$('#verifyStatus');
  d.querySelector('#unlockAsk').hidden=true;d.querySelector('#unlockFiles').hidden=true;panel.hidden=false;
  $('#unlockTitle').textContent='Verify your number';$('#unlockSub').textContent=`${h.title}: we send a 6-digit code by SMS, then our team will call you.`;
  if(!form.elements.vname.value)form.elements.vname.value=state.profile.name||'';
  if(!form.elements.vphone.value)form.elements.vphone.value=state.profile.phone||'';
  $('#vCodeRow').hidden=true;$('#vConfirm').hidden=true;$('#vSend').hidden=false;$('#vSend').disabled=false;$('#vSend').innerHTML='Send code by SMS <span>→</span>';status.textContent='';formError(form,'');
  try{window.sureStoneAuth?.clearPhoneVerifier?.()}catch{}$('#vRecaptcha').innerHTML='';
  if(!d.open)d.showModal();
  if(!window.sureStoneAuth?.configured)status.textContent='SMS check is not available right now. Please call us.';
  $('#vSend').onclick=async()=>{
    const name=form.elements.vname.value.trim(),phone=toE164(form.elements.vphone.value);
    if(name.length<2){formError(form,'Please enter your name.');return}
    if(!phone){formError(form,'Please enter a valid mobile number (India: 10 digits).');return}
    formError(form,'');$('#vSend').disabled=true;status.textContent='Sending the code…';
    try{await window.sureStoneAuth.sendPhoneCode(phone,'vRecaptcha');status.textContent=`Code sent to ${phone}. Type it below.`;$('#vSend').hidden=true;$('#vCodeRow').hidden=false;$('#vConfirm').hidden=false;$('#vCode').focus()}
    catch(err){$('#vSend').disabled=false;status.textContent=/operation-not-allowed|billing/.test(err.code||'')?'SMS check is not switched on yet. Please call us for the brochure.':/too-many|quota/.test(err.code||'')?'Too many codes right now. Please try again later, or call us.':/invalid-phone/.test(err.code||'')?'This number does not look right. Please check it.':'Could not send the code. Please try again.';try{window.sureStoneAuth.clearPhoneVerifier()}catch{}}
  };
  $('#vConfirm').onclick=async()=>{
    const code=$('#vCode').value.replace(/\D/g,'');if(code.length!==6){formError(form,'Please type the 6-digit code.');return}
    formError(form,'');$('#vConfirm').disabled=true;status.textContent='Checking…';
    try{await window.sureStoneAuth.confirmPhoneCode(code)}catch(err){$('#vConfirm').disabled=false;status.textContent=/invalid-verification-code/.test(err.code||'')?'That code is not right. Please check the SMS.':/code-expired/.test(err.code||'')?'The code expired. Close this and try again.':'Could not check the code. Please try again.';return}
    $('#vConfirm').disabled=false;const name=form.elements.vname.value.trim();
    state.needVerify=false;state.profile={...state.profile,name:state.profile.name||name};store.write('profile',state.profile);
    status.textContent='✅ Number verified';await afterVerified(h,name);
  };
}
function openUnlock(id,what){
  const h=homeById(id);if(!h)return;unlockState.home=id;unlockState.what=what;
  if((state.crmContact?.verify||state.needVerify)&&!phoneVerified())return openVerify(h);
  if((state.crmContact?.verify||state.needVerify)&&phoneVerified()&&!askedFor(h.id)&&!askedAny()&&crmConfig()){const nm=state.profile.name||'';unlockRequest(h,{name:nm}).then(res=>{if(res.needVerify)return openVerify(h);setAsked(h.id,{name:nm});if(res.locked){unlockForget(h.id);showWaiting(h,res.message)}else{unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans})}}).catch(()=>showWaiting(h,'Could not check right now. Please try again in a minute.'));return}
  // Signed in with a known mobile: open straight away (the CRM still gets the request on their lead).
  if(state.authUser&&crmConfig()&&!askedFor(h.id)){const ph=knownPhone(),nm=(state.profile.name||state.authUser.name||'').trim();if(ph&&nm.length>=2){unlockRequest(h,{name:nm,phone:ph}).then(res=>{if(res.needVerify)return openVerify(h);setAsked(h.id,{name:nm,phone:ph});if(res.locked){unlockForget(h.id);showWaiting(h,res.message)}else{unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans})}}).catch(err=>toast(err.message||'Could not open it right now.'));return}}
  const asked=askedFor(h.id),known=!asked&&askedAny();
  // Already gave their details for another home: ask for this one too (the team sees it), no form again.
  if(known&&crmConfig()){unlockRequest(h,known).then(res=>{if(res.needVerify)return openVerify(h);setAsked(h.id,known);if(res.locked){unlockForget(h.id);showWaiting(h,res.message)}else{unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans})}}).catch(()=>showWaiting(h,'Could not check right now. Please try again in a minute.'));return}
  if(asked&&crmConfig()){unlockRequest(h,{...asked,recheck:true}).then(res=>{if(res.needVerify)return openVerify(h);if(res.locked){unlockForget(h.id);showWaiting(h,res.message)}else{unlockSave(h.id);markUnlocked(h);showUnlocked(h,{brochure:res.brochure,plans:res.plans})}}).catch(()=>showWaiting(h,'Could not check right now. Please try again in a minute.'));return}
  const d=unlockDialog(),form=d.querySelector('#unlockForm');
  d.querySelector('#unlockAsk').hidden=false;d.querySelector('#unlockVerify').hidden=true;d.querySelector('#unlockFiles').hidden=true;
  $('#unlockTitle').textContent=what==='plans'?'See the floor plans':'Get the brochure';
  $('#unlockSub').textContent=`${h.title}: leave your name and mobile number and it opens right away.`;
  if(!form.elements.name.value)form.elements.name.value=state.profile.name||'';
  if(!form.elements.phone.value)form.elements.phone.value=state.profile.phone||'';
  formError(form,'');d.showModal();
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-unlock]');if(!b)return;e.preventDefault();openUnlock(b.dataset.unlockHome,b.dataset.unlock)});
/* ---- Homes picked for one client (link sent by the team from the CRM): shortlist.html?t=… ---- */
const waDigits=p=>{const d=String(p||'').replace(/\D/g,'');return d.length===10?'91'+d:d};
function shortlistCardHTML(h,reaction){
  const facts=[h.bedsLabel,h.areaFrom?h.areaLabel:'',h.availability,...(h.extraSpecs||[]).filter(([k])=>k==='Possession'||k==='Developer').map(([k,v])=>k==='Possession'?'Possession '+v:'By '+v)].filter(Boolean);
  const imgs=[h.image,h.image2,h.image3].filter(Boolean);
  const rera=(h.extraSpecs||[]).find(([k])=>k==='RERA number');
  return `<article class="sl-card" data-sl-home="${esc(h.id)}">
  <div class="sl-photos ${imgs.length>1?'multi':''}">${imgs.map((u,i)=>`<img src="${photo(u,i?640:1200)}" alt="${esc(h.title)}${i?', photo '+(i+1):''}" loading="${i?'lazy':'eager'}">`).join('')}</div>
  <div class="sl-body">
    <div class="sl-top"><span class="detail-price">${esc(h.displayPrice)}</span>${h.availability?`<span class="sl-status">${esc(h.availability)}</span>`:''}</div>
    <h2>${esc(h.title)}</h2><p class="detail-location">${esc(h.location)}</p>
    ${facts.length?`<p class="sl-facts">${facts.map(esc).join(' · ')}</p>`:''}
    ${h.description?`<p class="sl-desc">${esc(h.description)}</p>`:''}
    ${h.amenities.length?`<div class="detail-amenities">${h.amenities.slice(0,8).map(a=>`<span>${esc(a)}</span>`).join('')}</div>`:''}
    ${rera?`<p class="sl-rera">RERA ${esc(rera[1])}</p>`:''}
    ${h.hasBrochure||h.planCount?`<div class="detail-files">${h.hasBrochure?`<button type="button" class="gold-button " data-unlock="brochure" data-unlock-home="${esc(h.id)}">${unlockCache(h.id)?'':''}View brochure</button>`:''}${h.planCount?`<button type="button" class="button-outline " data-unlock="plans" data-unlock-home="${esc(h.id)}">${unlockCache(h.id)?'':''}View floor plans (${h.planCount})</button>`:''}</div>${unlockCache(h.id)?'':'<p class="sl-rera">Brochure and floor plans open with your name and mobile number.</p>'}`:''}
    <div class="sl-tools">${voteBtn(h,true)}<span class="share-wrap"><button type="button" class="sl-share" data-share="${esc(h.id)}">↗ Share</button></span></div>
    <div class="sl-react" role="group" aria-label="What do you think of ${esc(h.title)}?">
      <button type="button" class="${reaction==='like'?'on':''}" data-react="like" data-react-home="${esc(h.id)}">♥ I like this</button>
      <button type="button" class="${reaction==='no'?'on':''}" data-react="no" data-react-home="${esc(h.id)}">Not for me</button>
      <button type="button" class="${reaction==='visit'?'on':''}" data-react="pickvisit" data-react-home="${esc(h.id)}">Book a site visit</button>
    </div>
    <div class="sl-visit" hidden><label><span>Day</span><input type="date" class="sl-day"></label><label><span>Time</span><select class="sl-time"><option value="10:00">10:00 am</option><option value="11:30">11:30 am</option><option value="13:00">1:00 pm</option><option value="15:00">3:00 pm</option><option value="16:30">4:30 pm</option><option value="18:00">6:00 pm</option></select></label><button type="button" class="gold-button" data-react="visit" data-react-home="${esc(h.id)}">Send request <span>→</span></button></div>
    <p class="sl-msg" role="status"></p>
  </div></article>`
}
async function loadShortlist(c){
  const box=$('#shortlistPage');if(!box)return;
  const t=(pageParams.get('t')||'').toLowerCase();
  const dead=msg=>{box.innerHTML=`<div class="property-not-found"><h1>${esc(msg)}</h1><a href="search.html">Browse homes</a></div>`};
  if(!/^[a-f0-9]{24,64}$/.test(t))return dead('This link is not complete. Please ask your property advisor for it again.');
  state.shortlistCfg=c;
  // The homes open only for someone signed in. The CRM checks who it is: the client they were picked for sees
  // their own page; anyone the link was forwarded to sees the homes under their own name.
  if(!state.authKnown){box.innerHTML='<div class="property-not-found"><h1>Loading the homes picked for you…</h1></div>';return}
  if(!state.authUser&&!me().in){
    box.innerHTML='<div class="sl-login"><span class="detail-verified">Private link</span><h1>Homes picked for you.</h1></div>';
    box.querySelector('.sl-login').appendChild(identityForm({cls:'id-form sl-id',sub:'Please tell us who you are: your name and the mobile number you gave our team.',button:'See my homes',message:'Opened the homes link the team sent',onDone:()=>loadShortlist(c)}));
    return;
  }
  box.innerHTML='<div class="property-not-found"><h1>Loading the homes picked for you…</h1></div>';
  let d;try{const idToken=await window.sureStoneAuth.getIdToken();const r=await fetch(`${c.url}/api/site/shortlist`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({t,idToken,key:c.formKey,action:'load',name:me().name,phone:me().phone}),cache:'no-store'});d=await r.json().catch(()=>({}));if(!r.ok||!d.ok)return dead(d.error||'This link is not active any more.')}catch{return dead('Could not load the homes. Check your internet and refresh.')}
  const list=(d.projects||[]).map(crmProjectToHome);
  homes.splice(0,homes.length,...list);
  state.shortlist={t,reactions:d.reactions||{},owner:!!d.owner};
  const agent=d.agent_name?String(d.agent_name).split(' ')[0]:'';
  const who=d.owner?(d.client||'there'):(d.client||state.authUser.name||'there');
  document.title=`${d.owner?'Homes picked for '+(d.client||'you'):'Homes shared with you'} | The Astittva Estates`;
  box.innerHTML=`<div class="sl-shell"><header class="sl-intro"><span class="detail-verified">${d.owner?'✓ Picked for you':'Shared with you'}</span><h1>Hi ${esc(who)}, ${d.owner?'here are homes picked for you.':'here are the homes in this link.'}</h1><p>${list.length} home${list.length===1?'':'s'} from ${esc(d.agent_name||'our team')}. Tap “View brochure” or “View floor plans” for the details, or book a site visit.</p>${d.owner&&d.note?`<blockquote class="sl-note">${esc(d.note)}</blockquote>`:''}</header>
  ${list.length?list.map(h=>shortlistCardHTML(h,state.shortlist.reactions[h.crmId])).join(''):'<div class="property-not-found"><h1>These homes are not available any more.</h1></div>'}
  <p class="detail-note">Prices, sizes and availability can change. Please confirm the latest details with ${esc(agent||'our team')}.</p></div>`;
  const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);const day=tomorrow.toISOString().split('T')[0];
  $$('.sl-day').forEach(i=>{i.min=day;i.value=day});
  if(d.owner)setTimeout(async()=>{try{const idToken=await window.sureStoneAuth.getIdToken();fetch(`${c.url}/api/site/shortlist`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({t,idToken,action:'seen',name:me().name,phone:me().phone})})}catch{}},1500);
}
document.addEventListener('surestone-auth-state',e=>{
  const first=!state.authKnown;state.authKnown=true;const uid=e.detail?.uid||'';
  if(document.body.classList.contains('page-shortlist')&&state.shortlistCfg&&(first||uid!==state.shortlistUid)){state.shortlistUid=uid;state.authUser=e.detail||null;loadShortlist(state.shortlistCfg)}
  else state.shortlistUid=uid;
});
document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-react]');if(!b||!state.shortlist)return;e.preventDefault();
  const h=homeById(b.dataset.reactHome),card=b.closest('.sl-card'),msg=card?.querySelector('.sl-msg'),c=crmConfig();if(!h||!card||!c)return;
  if(b.dataset.react==='pickvisit'){const v=card.querySelector('.sl-visit');v.hidden=!v.hidden;return}
  const reaction=b.dataset.react;let when=null;
  if(reaction==='visit'){const day=card.querySelector('.sl-day').value,time=card.querySelector('.sl-time').value;if(!day){msg.textContent='Please pick a day.';return}when=new Date(`${day}T${time}:00`).toISOString()}
  b.disabled=true;msg.textContent='';
  let ok=false,j={};try{const idToken=await window.sureStoneAuth.getIdToken();const r=await fetch(`${c.url}/api/site/shortlist`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({t:state.shortlist.t,idToken,key:c.formKey,action:'react',project:h.crmId,reaction,when,name:me().name,phone:me().phone})});j=await r.json().catch(()=>({}));ok=j.ok}catch{}
  if(!ok&&j.needPhone){b.disabled=false;msg.textContent='Please add your mobile number first.';askClientPhone(state.authUser);return}
  b.disabled=false;
  if(!ok){msg.textContent='Could not send. Please try again, or call us.';return}
  state.shortlist.reactions[h.crmId]=reaction;
  card.querySelectorAll('.sl-react button').forEach(x=>x.classList.toggle('on',x.dataset.react===(reaction==='visit'?'pickvisit':reaction)));
  if(reaction==='visit'){card.querySelector('.sl-visit').hidden=true;msg.textContent='Visit request sent. We will call you to confirm the time.'}
  else msg.textContent=reaction==='like'?'Noted. Your advisor will be in touch.':'Thanks for telling us. We will look for better options.';
});
/* ---- More filters: budget, sale/lease, status, locality, amenities from the CRM ---- */
function injectMoreFilters(){
  const body=$('#filtersDialog .dialog-body');if(!body||$('#modalBudget'))return;
  const row=(label,id,opts)=>`<label class="form-row"><span>${label}</span><select id="${id}">${opts.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></label>`;
  const html=row('Budget','modalBudget',BUDGETS)
    +row('Developer','modalDeveloper',[['all','Any developer']])
    +row('Project stage','modalStatus',[['all','Any stage'],['Pre-launch','Pre-launch'],['Under construction','Under construction'],['Ready to move','Ready to move']]);
  const first=body.querySelector('.form-row');first?first.insertAdjacentHTML('afterend',html):body.insertAdjacentHTML('afterbegin',html);
  const extras=$('#amenityChips')?.closest('.form-row');
  if(extras){extras.querySelector('span').textContent='Amenities';extras.insertAdjacentHTML('afterend','<div class="form-row" id="localityRow" hidden><span>Locality</span><div class="chip-set" id="localityChips"></div></div>')}
  const sort=$('#sortFilter');if(sort&&!sort.querySelector('[value="votes"]'))sort.insertAdjacentHTML('beforeend','<option value="votes">Most liked</option>');
  document.addEventListener('click',e=>{const b=e.target.closest('[data-locality]');if(!b)return;const l=b.dataset.locality;state.localities=state.localities.includes(l)?state.localities.filter(x=>x!==l):[...state.localities,l];b.classList.toggle('selected',state.localities.includes(l))});
}
function refreshFilterChoices(){
  const tdev=$('#devFilter');if(tdev){const devs=[...new Set(homes.map(h=>h.developer).filter(Boolean))].sort();tdev.innerHTML='<option value="all">Any developer</option>'+devs.map(d=>`<option value="${esc(d)}">${esc(d)}</option>`).join('');tdev.value=devs.includes(state.developer)?state.developer:'all';tdev.closest('.filter-field').hidden=!devs.length;if(typeof syncGlassSelect==='function')syncGlassSelect(tdev)}
  const devSel=$('#modalDeveloper');if(devSel){const devs=[...new Set(homes.map(h=>h.developer).filter(Boolean))].sort();devSel.innerHTML='<option value="all">Any developer</option>'+devs.map(d=>`<option value="${esc(d)}">${esc(d)}</option>`).join('');devSel.value=devs.includes(state.developer)?state.developer:'all';devSel.closest('.form-row').hidden=!devs.length;if(typeof syncGlassSelect==='function')syncGlassSelect(devSel)}
  refreshCityChoices();
  const chips=$('#amenityChips');if(!chips||!homes.some(h=>h.crm))return;
  const count=new Map();homes.forEach(h=>(h.filterTags||[]).forEach(a=>{const k=String(a).trim();if(k)count.set(k,(count.get(k)||0)+1)}));
  const list=[...count.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,24).map(([k])=>k);
  chips.innerHTML=list.map(a=>`<button type="button" data-amenity="${esc(a)}" class="${state.amenities.includes(a)?'selected':''}">${esc(a)}</button>`).join('')||'<span class="unlock-note">No amenities added yet.</span>';
  const locs=[...new Set(homes.map(h=>h.neighbourhood).filter(Boolean))].sort();
  const lr=$('#localityRow');if(lr){lr.hidden=locs.length<2;$('#localityChips').innerHTML=locs.map(l=>`<button type="button" data-locality="${esc(l)}" class="${state.localities.includes(l)?'selected':''}">${esc(l)}</button>`).join('')}
}

/* ---- Likes (one per browser) and sharing ---- */
const voterId=(()=>{try{let v=localStorage.getItem('surestone:voter');if(!/^[a-f0-9]{32}$/.test(v||'')){v=[...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(16).padStart(2,'0')).join('');localStorage.setItem('surestone:voter',v)}return v}catch{return ''}})();
const myVotes=new Set(store.read('votes',[]));
const voteBtn=(h,big)=>h.crm?`<button type="button" class="vote-btn ${big?'big':''} ${myVotes.has(h.crmId)?'on':''}" data-vote="${esc(h.id)}" aria-pressed="${myVotes.has(h.crmId)}" aria-label="Like ${esc(h.title)}" title="${myVotes.has(h.crmId)?'You like this':'Like'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v11H3V10h4Zm2 11V10l4.6-7.2c.3-.5 1-.7 1.6-.4 1 .5 1.5 1.6 1.2 2.7L15.6 9H20a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.6 21H9Z"/></svg><span>${h.votes||0}</span>${big?`<em>${myVotes.has(h.crmId)?'Liked':'Like'}</em>`:''}</button>`:'';
document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-vote]');if(!b)return;e.preventDefault();e.stopPropagation();
  const h=homeById(b.dataset.vote),c=crmConfig();if(!h||!c||!voterId)return;
  const on=!myVotes.has(h.crmId);
  on?myVotes.add(h.crmId):myVotes.delete(h.crmId);h.votes=Math.max(0,(h.votes||0)+(on?1:-1));store.write('votes',[...myVotes]);
  $$(`[data-vote="${CSS.escape(h.id)}"]`).forEach(x=>{x.classList.toggle('on',on);x.setAttribute('aria-pressed',on);x.querySelector('span').textContent=h.votes;const em=x.querySelector('em');if(em)em.textContent=on?'Liked':'Like';x.title=on?'You like this':'Like'});
  try{const r=await fetch(`${c.url}/api/site/vote`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({org:c.org,project:h.crmId,voter:voterId,on})});const j=await r.json().catch(()=>({}));if(typeof j.votes==='number'){h.votes=j.votes;$$(`[data-vote="${CSS.escape(h.id)}"] span`).forEach(x=>x.textContent=j.votes)}}catch{}
},true);
document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-share]');if(!b)return;e.preventDefault();
  const h=homeById(b.dataset.share);if(!h)return;
  const url=h.crmId?`${location.origin}/property.html?p=${h.crmId}`:`${location.origin}/property.html?id=${encodeURIComponent(h.id)}`;
  const text=`${h.title} · ${h.displayPrice} · ${h.location}`;
  if(navigator.share){try{await navigator.share({title:h.title,text,url});return}catch(err){if(err&&err.name==='AbortError')return}}
  const menu=document.createElement('div');menu.className='share-menu';menu.innerHTML=`<a href="https://wa.me/?text=${encodeURIComponent(text+'\n'+url)}" target="_blank" rel="noopener noreferrer">WhatsApp</a><button type="button" data-copy>Copy link</button>`;
  $$('.share-menu').forEach(m=>m.remove());b.after(menu);
  menu.querySelector('[data-copy]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(url);toast('Link copied. Paste it anywhere.')}catch{prompt('Copy this link:',url)}menu.remove()});
  setTimeout(()=>document.addEventListener('click',function off(ev){if(!menu.contains(ev.target)&&ev.target!==b){menu.remove();document.removeEventListener('click',off)}}),0);
});
/* ---- Website accounts and saved homes in the CRM (one account per email / mobile; email must be verified) ---- */
async function clientCall(body){const c=crmConfig();if(!c||!c.formKey)return null;try{const r=await fetch(`${c.url}/api/site/client`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:c.formKey,...body})});return await r.json().catch(()=>null)}catch{return null}}
async function saveToCrm(h,on){
  if(!h||!h.crm)return;const c=crmConfig();if(!c)return;
  if(state.client){const tok=await window.sureStoneAuth?.getIdToken?.();if(tok){await clientCall({action:'save',idToken:tok,project:h.crmId,on});return}}
  if(voterId)clientCall({action:'save_anon',org:c.org,voter:voterId,project:h.crmId,on});
}
function syncSaves(serverIds){
  if(!homes.some(h=>h.crm)){state.pendingServerSaves=serverIds;return}
  state.pendingServerSaves=null;const c=crmConfig();
  const server=new Set((serverIds||[]).map(String));
  const local=state.saved.map(homeById).filter(h=>h&&h.crm);
  // homes saved before signing in: move them to the account (and drop the anonymous count)
  local.forEach(async h=>{if(!server.has(h.crmId)){const tok=await window.sureStoneAuth?.getIdToken?.();if(tok)await clientCall({action:'save',idToken:tok,project:h.crmId,on:true})}if(voterId&&c)clientCall({action:'save_anon',org:c.org,voter:voterId,project:h.crmId,on:false})});
  homes.filter(h=>h.crm&&server.has(h.crmId)&&!state.saved.includes(h.id)).forEach(h=>state.saved.push(h.id));
  store.write('saved',state.saved);renderListings();syncHeader();
}
function showVerifyEmail(where,email){
  const box=where;if(!box)return;
  box.innerHTML=`<span class="verify-mail">📧 We sent a link to <b>${esc(email||'your email')}</b>. Open it to verify your email, then tap below.</span><span class="verify-mail-btns"><button type="button" class="button-outline" data-mail-check>I have verified</button><button type="button" class="button-text" data-mail-resend>Send the link again</button></span>`;
}
document.addEventListener('click',async e=>{
  if(e.target.closest('[data-mail-resend]')){try{await window.sureStoneAuth.resendVerification();toast('We sent the link again. Check your inbox and spam.')}catch(err){toast(err?.code==='auth/too-many-requests'?'Please wait a minute before asking again.':'Could not send the link. Please try again.')}return}
  if(e.target.closest('[data-mail-check]')){const r=await window.sureStoneAuth?.refreshUser?.();if(r?.emailVerified){state.needEmailVerify=false;closeDialog('createAccountDialog');toast('Email verified. Your account is ready.');await registerClient(state.authUser,true);syncHeader()}else toast('Not verified yet. Open the link in the email first.')}
});
async function registerClient(user,fresh){
  if(!user||!crmConfig())return;
  const tok=await window.sureStoneAuth?.getIdToken?.(!!fresh);if(!tok)return;
  const res=await clientCall({action:'register',idToken:tok,name:state.profile.name||user.name||'',phone:knownPhone()});
  if(!res)return;
  if(res.needEmailVerify){state.client=false;state.needEmailVerify=true;syncHeader();return}
  if(res.conflict){
    state.client=false;
    const what=res.conflict==='phone'?'mobile number':'email';
    // a brand-new account that repeats an existing email / mobile is removed again
    try{if(user.createdAt&&Date.now()-user.createdAt<5*60e3)await window.sureStoneAuth.deleteCurrentUser();else await window.sureStoneAuth.signOut()}catch{try{await window.sureStoneAuth.signOut()}catch{}}
    toast(`An account with this ${what} already exists. Please sign in with that account.`);return;
  }
  if(res.ok){state.client=true;state.needEmailVerify=false;syncSaves(res.saves||[]);if(res.need_phone&&!state.suppressPhoneAsk&&!document.querySelector('.gate-card,.id-form'))askClientPhone(user)}
}
async function loadCrmListings(c){
  if(document.body.classList.contains('page-shortlist'))return loadShortlist(c);
  const notFound='<div class="property-not-found"><h1>This home is no longer available.</h1><a href="search.html">Browse homes in Raipur</a></div>';
  try{
    const response=await fetch(`${c.url}/api/site/projects?org=${encodeURIComponent(c.org)}`);
    const data=await response.json().catch(()=>({}));
    if(!response.ok||!Array.isArray(data.projects))throw new Error(data.error||`CRM request failed (${response.status})`);
    state.crmContact={phone:data.contact&&typeof data.contact.phone==='string'&&/^\+?[0-9]{8,15}$/.test(data.contact.phone)?data.contact.phone:null,verify:!!data.contact?.verify_phone};
    homes.splice(0,homes.length,...data.projects.map(crmProjectToHome));
  }catch(error){console.warn('The Astittva Estates could not load projects from the CRM.',error);const el=$('#emptyResults');if(el){el.dataset.crmError='1'}}
  if(document.body.classList.contains('page-search'))state.visibleCount=Math.max(state.visibleCount,homes.length);
  if(state.pendingServerSaves)syncSaves(state.pendingServerSaves);
  refreshFilterChoices();renderNeighbourhoods();renderListings();
  if(document.body.classList.contains('page-property')){
    const property=pageHome();
    $('#propertyPage').innerHTML=property?detailHTML(property):notFound;
    if(property)state.currentHome=property.id;
  }
  window.applySiteLanguage?.();
}
async function loadSupabaseListings(){
  const crm=crmConfig();if(crm)return loadCrmListings(crm);
  if(document.body.classList.contains('page-shortlist')){$('#shortlistPage').innerHTML='<div class="property-not-found"><h1>This link is not active right now.</h1><a href="search.html">Browse homes in Raipur</a></div>';return}
  const config=window.SURESTONE_SUPABASE;
  if(!config?.url||!config?.publishableKey)return;
  try{
    const endpoint=`${config.url.replace(/\/$/,'')}/rest/v1/properties?select=*&status=eq.published&city=eq.Raipur&order=created_at.desc`;
    const response=await fetch(endpoint,{headers:{apikey:config.publishableKey}});
    if(!response.ok)throw new Error(`Supabase request failed (${response.status})`);
    const rows=await response.json();
    const fallbackPhotos=['photo-1600607687920-4e2a09cf159d','photo-1600210492486-724fe5c67fb0','photo-1600607687939-ce8a6c25118c'];
    const records=rows.map(row=>{
      const price=Number(row.price_inr)||0,area=Number(row.area_sqft)||0,images=Array.isArray(row.image_urls)?row.image_urls:[];
      const locality=row.locality||'Raipur';
      return{id:row.slug,price,displayPrice:currency(price),label:'for sale',title:row.title,type:row.property_type,location:`${locality}, ${row.city||'Raipur'}, Chhattisgarh`,neighbourhood:locality,city:row.city||'Raipur',beds:Number(row.bedrooms)||0,baths:Number(row.bathrooms)||0,area,areaLabel:`${area.toLocaleString('en-IN')} sq. ft.`,image:images[0]||fallbackPhotos[0],image2:images[1]||fallbackPhotos[1],image3:images[2]||fallbackPhotos[2],verified:Boolean(row.verified),tour:Boolean(row.tour_url),tourUrl:row.tour_url||'',moveIn:Boolean(row.move_in_ready),amenities:Array.isArray(row.amenities)?row.amenities:[],description:row.description||'',latitude:row.latitude,longitude:row.longitude};
    });
    homes.splice(0,homes.length,...records);
    renderNeighbourhoods();renderListings();
    if(document.body.classList.contains('page-property')){
      const property=homeById(pageParams.get('id')||records[0]?.id);
      $('#propertyPage').innerHTML=property?detailHTML(property):'<div class="property-not-found"><h1>This home is no longer available.</h1><a href="search.html">Browse homes in Raipur</a></div>';
      if(property)state.currentHome=property.id;
    }
    window.applySiteLanguage?.();
  }catch(error){console.warn('The Astittva Estates could not load live listings. Showing sample listings instead.',error)}
}

loadSupabaseListings();

$('#tourDialog').addEventListener('close',()=>{const frame=$('#propertyTourFrame');if(frame)frame.src='about:blank'});

function initFirebaseAuth(){
  const signIn=$('#googleSignIn'),signOut=$('#googleSignOut'),message=$('#authMessage');
  const authErrorText=error=>({
    'auth/invalid-credential':'That email or password was not recognized.',
    'auth/email-already-in-use':'An account already uses that email. Try signing in instead.',
    'auth/weak-password':'Choose a stronger password with at least 6 characters.',
    'auth/invalid-email':'Enter a valid email address.',
    'auth/invalid-phone-number':'Enter a phone number with its country code, such as +91.',
    'auth/operation-not-allowed':'This sign-in method is not enabled in Firebase yet.',
    'auth/too-many-requests':'Too many attempts. Please wait and try again.',
    'auth/billing-not-enabled':'Phone sign-in is not active yet. Please use Google for now.',
    'auth/invalid-app-credential':'The security check failed. Please refresh the page and try again.',
    'auth/captcha-check-failed':'The security check failed. Please refresh the page and try again.',
    'auth/quota-exceeded':'Too many codes were sent today. Please use Google, or try tomorrow.',
    'auth/unauthorized-domain':'Sign-in is not allowed on this web address yet.',
    'auth/invalid-verification-code':'That code is not right. Please check the SMS.',
    'auth/code-expired':'The code expired. Please ask for a new one.',
    'auth/quota-exceeded':'Firebase has reached its SMS limit for now.',
    'auth/account-exists-with-different-credential':'An account with this email already exists. Sign in the way you did before (email or Google).',
    'auth/credential-already-in-use':'This number or email is already used by another account. Sign in with that account.'
  }[error?.code]||error?.message||'Something went wrong. Please try again.');
  const openAuth=kind=>{
    closeDialog('accountDialog');
    const target=kind==='create'?'createAccountDialog':kind==='phone'?'phoneAuthDialog':'emailAuthDialog';
    ['emailAuthDialog','createAccountDialog','phoneAuthDialog'].forEach(id=>closeDialog(id));
    if(kind==='phone'){
      const form=$('#phoneLoginForm');form.reset();delete form.dataset.codeSent;
      $('#phoneCodeRow').classList.add('hidden');$('#phoneSendCode').textContent='Send verification code';
      $('#phoneLoginMessage').textContent='';$('#phoneRecaptcha').innerHTML='';
      window.sureStoneAuth?.clearPhoneVerifier();
    }
    if(kind==='email')$('#emailLoginMessage').textContent='';
    if(kind==='create')$('#createAccountMessage').textContent='';
    openDialog(target);
  };
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-auth-open]');
    if(trigger){event.preventDefault();openAuth(trigger.dataset.authOpen)}
  });
  signIn.addEventListener('click',async()=>{
    if(!window.sureStoneAuth?.configured){message.textContent='Firebase setup is not finished yet. Add the web app config and enable Google sign-in.';return}
    signIn.disabled=true;message.textContent='Opening Google sign-in…';
    try{await window.sureStoneAuth.signIn()}catch(error){message.textContent=error.code==='auth/unauthorized-domain'?'This site domain is not authorized in Firebase.':(error.message||'Google sign-in could not be completed.');signIn.disabled=false}
  });
  signOut.addEventListener('click',async()=>{
    signOut.disabled=true;message.textContent='Signing out and clearing account data…';
    try{
      await window.sureStoneAuth?.signOut();
      state.authUser=null;state.profile={};state.saved=[];state.preferences={};state.visits=[];state.accountTab='saved';
      ['profile','saved','preferences','visits'].forEach(key=>localStorage.removeItem(`surestone:${key}`));
      $$('.account-tab').forEach(tab=>tab.classList.toggle('active',tab.dataset.accountTab==='saved'));
      syncHeader();toast('Signed out. Your saved homes and account details were cleared from this device.');
    }catch(error){message.textContent=error.message||'Sign-out failed. Your data was kept.'}
    finally{signOut.disabled=false}
  });
  document.addEventListener('surestone-auth-state',event=>{
    const user=event.detail;state.authUser=user;
    if(user){state.profile={...state.profile,name:state.profile.name||user.name||'',email:user.email||state.profile.email||'',phone:state.profile.phone||user.phone||''};store.write('profile',state.profile)}
    if(user){state.needEmailVerify=Boolean(user.passwordAccount&&!user.emailVerified&&!user.phone);registerClient(user)}else{state.client=false;state.needEmailVerify=false}
    syncHeader();signIn.disabled=false;
  });
  document.addEventListener('surestone-auth-error',event=>{message.textContent=event.detail?.message||'Google sign-in could not be completed.'});
  $('#emailLoginForm').addEventListener('submit',async event=>{
    event.preventDefault();const form=event.currentTarget,submit=form.querySelector('[type="submit"]'),status=$('#emailLoginMessage');
    submit.disabled=true;status.textContent='Signing in…';
    try{const data=new FormData(form);const cred=await window.sureStoneAuth.signInEmail(data.get('email').trim(),data.get('password'));closeDialog('emailAuthDialog');toast(cred?.user&&!cred.user.emailVerified?'Signed in. Please verify your email: open the link we sent you.':'You’re signed in. Welcome back.')}
    catch(error){status.textContent=authErrorText(error)}finally{submit.disabled=false}
  });
  $('#createAccountForm').addEventListener('submit',async event=>{
    event.preventDefault();const form=event.currentTarget,submit=form.querySelector('[type="submit"]'),status=$('#createAccountMessage');
    submit.disabled=true;status.textContent='Creating your account…';
    try{
      const data=new FormData(form),name=data.get('name').trim(),email=data.get('email').trim();
      const result=await window.sureStoneAuth.createEmailAccount(name,email,data.get('password'));
      state.profile={...state.profile,name,email,phone:result.user.phoneNumber||''};store.write('profile',state.profile);
      state.authUser={uid:result.user.uid,name,email,phone:result.user.phoneNumber||'',emailVerified:false,passwordAccount:true,createdAt:Date.now()};state.needEmailVerify=true;syncHeader();
      showVerifyEmail(status,email);toast('Almost done: check your email for the link.')
    }catch(error){status.textContent=authErrorText(error)}finally{submit.disabled=false}
  });
  $('#phoneLoginForm').addEventListener('submit',async event=>{
    event.preventDefault();const form=event.currentTarget,submit=$('#phoneSendCode'),status=$('#phoneLoginMessage');
    submit.disabled=true;status.textContent=form.dataset.codeSent?'Checking your code…':'Verifying and sending your code…';
    try{
      if(form.dataset.codeSent){
        await window.sureStoneAuth.confirmPhoneCode(form.elements.code.value.trim());
        closeDialog('phoneAuthDialog');toast('You’re signed in. Welcome to The Astittva Estates.');
      }else{
        const phone=form.elements.phone.value.replace(/[\s()-]/g,'');
        if(!/^\+[1-9]\d{7,14}$/.test(phone))throw new Error('Enter the full number with country code, for example +91 98765 43210.');
        await window.sureStoneAuth.sendPhoneCode(phone,'phoneRecaptcha');form.dataset.codeSent='true';
        $('#phoneCodeRow').classList.remove('hidden');form.elements.code.required=true;submit.textContent='Verify and sign in';
        $('#phoneResendCode').classList.remove('hidden');status.textContent='Code sent. Check your phone and enter the 6-digit code.';
      }
    }catch(error){status.textContent=authErrorText(error)}finally{submit.disabled=false}
  });
  $('#phoneResendCode').addEventListener('click',()=>{
    const form=$('#phoneLoginForm');delete form.dataset.codeSent;form.elements.code.value='';$('#phoneCodeRow').classList.add('hidden');
    $('#phoneSendCode').textContent='Send verification code';$('#phoneResendCode').classList.add('hidden');
    window.sureStoneAuth?.clearPhoneVerifier();$('#phoneRecaptcha').innerHTML='';$('#phoneLoginMessage').textContent='Enter your number and solve the check to request another code.';
  });
  $('#phoneAuthDialog').addEventListener('close',()=>{window.sureStoneAuth?.clearPhoneVerifier();$('#phoneRecaptcha').innerHTML=''});
}
initFirebaseAuth();

/* ---------- Visitors who are not signed in give their name and mobile once before seeing a home in full ---------- */
const GATE_KEY='surestone:visitor';
function gateKnown(){
  // known = we have their mobile (typed, or verified by SMS). A Gmail alone is not enough.
  if(state.authUser&&gatePhone(state.authUser.phone))return true;
  if(state.profile&&gatePhone(state.profile.phone))return true;
  try{
    const v=JSON.parse(localStorage.getItem(GATE_KEY)||'null');if(v&&v.phone)return true;
    const a=askedAny();return !!(a&&a.phone);
  }catch{return false}
}
function gatePhone(raw){const d=String(raw||'').replace(/\D/g,'').replace(/^(91|0)(?=[6-9]\d{9}$)/,'');return /^[6-9]\d{9}$/.test(d)?d:''}
function removePropertyGate(){const page=$('#propertyPage');if(!page)return;page.classList.remove('gated');$('.gate-card',page)?.remove()}
function applyPropertyGate(){
  const page=$('#propertyPage');
  if(!page||!document.body.classList.contains('page-property'))return;
  const h=homeById(state.currentHome);
  if(!h||gateKnown()||!page.querySelector(':scope > :not(.gate-card)')||page.querySelector('.property-not-found')){removePropertyGate();return}
  if($('.gate-card',page))return;
  const card=identityForm({cls:'gate-card',photo:h.image,title:`See ${h.crmName||h.title||'this home'} in full`,sub:'Photos, price, size and location. Just tell us who you are, it takes 5 seconds.',button:'See this home',project:h.crmName||h.title||'',message:'Opened this home on the website',onDone:name=>{removePropertyGate();toast(`Thank you, ${name.split(/\s+/)[0]}. Enjoy the tour.`)}});
  page.classList.add('gated');page.prepend(card);
  setTimeout(()=>card.elements.name.focus({preventScroll:true}),50);
}
if(document.body.classList.contains('page-property')){
  const page=$('#propertyPage');
  if(page)new MutationObserver(()=>{if(!$('.gate-card',page)||page.querySelector('.property-not-found'))applyPropertyGate()}).observe(page,{childList:true});
  applyPropertyGate();
}
document.addEventListener('surestone-auth-state',e=>{
  try{if(e.detail)localStorage.setItem('surestone:signedin','1');else localStorage.removeItem('surestone:signedin')}catch{}
  if(e.detail&&gateKnown())removePropertyGate();
});

/* ---------- Signed in with email / Google: ask the mobile once, so the client shows as a lead in the CRM ---------- */
function knownPhone(){
  const pick=v=>gatePhone(v&&v.phone);
  try{return pick(state.profile)||pick(JSON.parse(localStorage.getItem('surestone:visitor')||'null'))||pick(askedAny())||''}catch{return ''}
}
function askClientPhone(user){
  if(document.getElementById('clientPhoneDialog'))return;
  const d=document.createElement('dialog');d.className='dialog';d.id='clientPhoneDialog';
  d.innerHTML=`<form class="dialog-shell contact-shell" novalidate><header class="dialog-head"><div><h2>One last thing.</h2><p>Add your mobile number to finish signing up. Our team uses it only to help you with homes you like.</p></div></header>
  <label class="form-row"><span>Mobile number</span><input name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10-digit mobile" required maxlength="16"></label>
  <button class="gold-button contact-submit" type="submit">Finish signing up <span>→</span></button><button type="button" class="button-text cp-later">Sign out instead</button></form>`;
  document.body.appendChild(d);
  const form=d.querySelector('form');
  d.addEventListener('cancel',e=>e.preventDefault());
  d.querySelector('.cp-later').addEventListener('click',async()=>{try{await window.sureStoneAuth?.signOut?.()}catch{}d.close();d.remove()});
  form.addEventListener('submit',async e=>{
    e.preventDefault();const phone=gatePhone(form.elements.phone.value),btn=form.querySelector('[type=submit]');
    if(!phone){formError(form,'Please enter a valid 10-digit mobile number.');return}
    formError(form,'');btn.disabled=true;
    const tok=await window.sureStoneAuth?.getIdToken?.();
    const res=tok?await clientCall({action:'register',idToken:tok,name:state.profile.name||user.name||'',phone}):null;
    btn.disabled=false;
    if(!res||!res.ok){formError(form,'Could not save right now. Please try again.');return}
    state.profile={...state.profile,phone};try{store.write('profile',state.profile)}catch{}
    d.close();d.remove();toast('Thank you. Our team will be in touch.');
  });
  d.showModal?d.showModal():d.setAttribute('open','');
}

/* ---------- My visits: reschedule (no cancel) — the new time goes to the CRM with a fresh alert ---------- */
function openReschedule(i,card){
  const v=state.visits[i];if(!v||!card||card.querySelector('.resched-form'))return;
  const t=new Date();t.setDate(t.getDate()+1);const min=t.toISOString().split('T')[0];
  const f=document.createElement('form');f.className='resched-form';f.noValidate=true;
  f.innerHTML=`<label><span>New day</span><input type="date" name="day" min="${min}" value="${min}" required></label><label><span>Time</span><select name="time"><option>10:00 am</option><option>11:30 am</option><option>1:00 pm</option><option>3:00 pm</option><option>4:30 pm</option><option>6:00 pm</option></select></label><button class="gold-button" type="submit">Send new time <span>→</span></button><button type="button" class="button-text" data-resched-close>Keep the old time</button>`;
  card.appendChild(f);
  f.querySelector('[data-resched-close]').addEventListener('click',()=>f.remove());
  f.addEventListener('submit',async e=>{
    e.preventDefault();const btn=f.querySelector('[type=submit]');
    const phone=gatePhone(state.profile.phone)||knownPhone();
    if(!phone){formError(f,'Please add your mobile number in your account first.');return}
    const day=f.elements.day.value,time=f.elements.time.value;if(!day){formError(f,'Please pick a day.');return}
    const nice=new Date(day+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    formError(f,'');btn.disabled=true;
    const sent=await sendToCrm({name:state.profile.name||'Website client',mobile:phone,project:v.title,message:`Wants to RESCHEDULE the site visit at ${v.title} to ${nice} at ${time} (was ${v.date} at ${v.time}).`});
    btn.disabled=false;if(!sent.ok){formError(f,sent.error);return}
    state.visits[i]={...v,date:nice,time,status:'New time requested'};store.write('visits',state.visits);renderAccountPanel();
    toast('New time sent. We will call you to confirm.');
  });
}

/* ---------- Contact (nav) ---------- */
document.addEventListener('click',e=>{const a=e.target.closest('[data-contact-open]');if(!a)return;e.preventDefault();$('#contactSubline').textContent='How can we help? Tell us what you are looking for.';$('#contactHomeLabel').textContent='Which city or area?';$('#contactArea').value='';$('#contactForm').dataset.kind='enquiry';openDialog('contactDialog')});

/* ---------- Quick appointment (home page, under the city search) ---------- */
(function quickAppointment(){
  if(!document.body.classList.contains('page-home')||!$('.search-panel')||$('#quickAppt'))return;
  const t=new Date();t.setDate(t.getDate()+1);const min=t.toISOString().split('T')[0];
  const f=document.createElement('form');f.id='quickAppt';f.className='quick-appt';f.noValidate=true;
  f.innerHTML=`<strong>Quick appointment</strong><input name="name" placeholder="Your name" autocomplete="name" maxlength="80" aria-label="Your name"><input name="phone" type="tel" inputmode="numeric" placeholder="Mobile number" autocomplete="tel" maxlength="16" aria-label="Mobile number"><input name="day" type="date" min="${min}" value="${min}" aria-label="Preferred day"><input name="website" class="gate-hp" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="gold-button" type="submit">BOOK A CALL</button>`;
  if(state.profile.name)f.elements.name.value=state.profile.name;if(state.profile.phone)f.elements.phone.value=state.profile.phone;
  $('.search-panel').after(f);
  f.addEventListener('submit',async e=>{
    e.preventDefault();const btn=f.querySelector('[type=submit]');
    const name=f.elements.name.value.trim(),phone=gatePhone(f.elements.phone.value),day=f.elements.day.value;
    if(name.length<2){formError(f,'Please enter your name.');return}
    if(!phone){formError(f,'Please enter a valid 10-digit mobile number.');return}
    const nice=day?new Date(day+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'}):'';
    formError(f,'');btn.disabled=true;
    const sent=await sendToCrm({name,mobile:phone,location:$('#locationSearch')?.value||'',message:`Quick appointment: wants a call${nice?' on '+nice:''}.`,website:f.elements.website.value});
    btn.disabled=false;if(!sent.ok){formError(f,sent.error);return}
    try{localStorage.setItem('surestone:visitor',JSON.stringify({name,phone,at:Date.now()}))}catch{}
    f.innerHTML=`<strong>Thank you, ${esc(name.split(/\s+/)[0])}.</strong><span>Our team will contact you shortly.</span>`;
  });
})();

/* ---------- Testimonials ---------- */
(async function loadTestimonials(){
  const sec=$('#testimonials'),grid=$('#testimonialGrid'),c=crmConfig();if(!sec||!grid||!c)return;
  try{
    const r=await fetch(`${c.url}/api/site/testimonials?org=${encodeURIComponent(c.org)}`);const d=await r.json();
    const list=(d.testimonials||[]).filter(x=>x&&x.body);
    sec.hidden=false;
    if(!list.length){grid.innerHTML='<p class="t-empty">No reviews yet. Bought or sold with us? We would love to hear how it went.</p>';return}
    grid.innerHTML=list.slice(0,document.body.classList.contains('page-testimonials')?48:9).map(x=>`<figure class="testimonial"><div class="t-stars" aria-label="${x.rating} out of 5">${'★'.repeat(x.rating||5)}${'☆'.repeat(5-(x.rating||5))}</div><blockquote>${esc(x.body)}</blockquote><figcaption><strong>${esc(x.name||'Our client')}</strong>${x.place||x.project?`<span>${esc([x.project,x.place].filter(Boolean).join(' · '))}</span>`:''}</figcaption></figure>`).join('');
    sec.hidden=false;if(location.hash==='#testimonials')sec.scrollIntoView();
  }catch{}
})();
(async function reviewLink(){
  const r=(pageParams.get('review')||'').toLowerCase(),c=crmConfig();if(!/^[a-f0-9]{32}$/.test(r)||!c)return;
  let info={};try{info=await (await fetch(`${c.url}/api/site/testimonials?r=${r}`)).json()}catch{}
  const d=document.createElement('dialog');d.className='dialog';d.id='reviewDialog';
  if(!info.ok||info.done){d.innerHTML=`<div class="dialog-shell contact-shell"><header class="dialog-head"><div><h2>${info.done?'Thank you!':'This link is not active.'}</h2><p>${info.done?'We already have your testimonial.':'Please ask our team for a new link.'}</p></div><button type="button" class="dialog-close" data-close="reviewDialog" aria-label="Close">×</button></header></div>`}
  else d.innerHTML=`<form class="dialog-shell contact-shell" novalidate><header class="dialog-head"><div><h2>How was it, ${esc(info.name||'')}?</h2><p>${info.project?esc(info.project)+': ':''}a few words about your experience with The Astittva Estates.</p></div><button type="button" class="dialog-close" data-close="reviewDialog" aria-label="Close">×</button></header>
  <div class="form-row"><span>Your rating</span><div class="rate-stars" role="radiogroup" aria-label="Rating">${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}" aria-label="${n} star${n>1?'s':''}">★</button>`).join('')}</div></div>
  <label class="form-row"><span>Your name</span><input name="name" value="${esc(info.name||'')}" maxlength="80"></label>
  <label class="form-row"><span>City or area (optional)</span><input name="place" maxlength="80" placeholder="e.g. Atal Nagar, Raipur"></label>
  <label class="form-row"><span>Your words</span><textarea name="text" rows="4" maxlength="1200" placeholder="What did you like? How did we help?"></textarea></label>
  <button class="gold-button contact-submit" type="submit">SEND <span>→</span></button></form>`;
  document.body.appendChild(d);d.querySelector('[data-close]')?.addEventListener('click',()=>d.close());d.showModal();
  const form=d.querySelector('form');if(!form)return;let rating=5;
  const paint=()=>form.querySelectorAll('[data-rate]').forEach(b=>b.classList.toggle('on',Number(b.dataset.rate)<=rating));paint();
  form.addEventListener('click',e=>{const b=e.target.closest('[data-rate]');if(b){rating=Number(b.dataset.rate);paint()}});
  form.addEventListener('submit',async e=>{
    e.preventDefault();const btn=form.querySelector('[type=submit]'),text=form.elements.text.value.trim();
    if(text.length<10){formError(form,'Please write a few words (at least 10 letters).');return}
    btn.disabled=true;formError(form,'');
    let ok=false,err='';try{const res=await fetch(`${c.url}/api/site/testimonials`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({r,name:form.elements.name.value,place:form.elements.place.value,rating,text})});const j=await res.json();ok=j.ok;err=j.error||''}catch{err='Could not send. Check your internet and try again.'}
    btn.disabled=false;if(!ok){formError(form,err||'Could not send. Please try again.');return}
    form.innerHTML='<div class="contact-success"><span>✳</span><h3>Thank you.</h3><p>Your words mean a lot to us. They will show on our website soon.</p></div>';
  });
})();

/* ---------- No 3D tours yet: hide the 3D tour section when no home has one ---------- */
(function hideTourSection(){const sec=$('.experience-section');if(!sec)return;const check=()=>{sec.hidden=!homes.some(h=>h.tour||h.tourUrl)};check();setTimeout(check,4000)})();

/* ---------- Greeting by the visitor's own clock (works in any country) ---------- */
function greeting(){const h=new Date().getHours();return h<5?'Good evening':h<12?'Good morning':h<17?'Good afternoon':'Good evening'}
function paintGreeting(){$$('.account-button-copy>span:first-child').forEach(el=>{el.textContent=greeting()})}
paintGreeting();setInterval(paintGreeting,60000);

/* ---------- Log out: for everyone "logged in" on this device ----------
   A visitor counts as logged in once they gave their name and mobile (property gate, brochure, forms)
   or signed in with Google / phone. Log out forgets all of it on this device. */
function hasLocalLogin(){
  if(state.authUser)return true;
  try{const v=JSON.parse(localStorage.getItem('surestone:visitor')||'null');if(v&&v.phone)return true}catch{}
  const a=askedAny();if(a&&a.phone)return true;
  return !!(state.profile&&(state.profile.phone||state.profile.name));
}
async function logOutEverywhere(){
  try{if(state.authUser)await window.sureStoneAuth?.signOut?.()}catch{}
  try{Object.keys(localStorage).filter(k=>k.startsWith('surestone:')&&k!=='surestone:voter'&&k!=='surestone:votes').forEach(k=>localStorage.removeItem(k))}catch{}
  try{sessionStorage.setItem('surestone:loggedout','1')}catch{}
  location.reload();
}
function syncLogout(){
  const on=hasLocalLogin();
  $('#headerLogout')?.classList.toggle('hidden',!on);
  const so=$('#googleSignOut');if(so){so.textContent='Log out';so.classList.toggle('hidden',!on)}
}
(function logoutButtons(){
  const acts=$('.header-actions');
  if(acts&&!$('#headerLogout')){
    const b=document.createElement('button');b.type='button';b.id='headerLogout';b.className='header-logout hidden';b.textContent='Log out';
    b.addEventListener('click',logOutEverywhere);
    const acc=$('#accountOpen');acc?acc.after(b):acts.appendChild(b);
  }
  // the Log out button in the account window does the same (also when they never used Google / phone)
  $('#googleSignOut')?.addEventListener('click',e=>{e.stopImmediatePropagation();e.preventDefault();logOutEverywhere()},true);
  document.addEventListener('surestone-auth-state',()=>setTimeout(syncLogout,0));
  document.addEventListener('click',()=>setTimeout(syncLogout,50));
  document.addEventListener('submit',()=>setTimeout(syncLogout,1500));
  $('#accountDialog')?.addEventListener('toggle',syncLogout);
  setInterval(syncLogout,3000);syncLogout();
  try{if(sessionStorage.getItem('surestone:loggedout')){sessionStorage.removeItem('surestone:loggedout');setTimeout(()=>toast('You are logged out. Your details were removed from this device.'),400)}}catch{}
})();

/* =====================================================================================================
   ONE simple way in: name + mobile (that is the "login"). Optional later: verify the mobile by SMS code
   (only when the company turns on "Verify clients' mobile" in the CRM) and add a Gmail.
   ===================================================================================================== */
function me(){let v=null;try{v=JSON.parse(localStorage.getItem('surestone:visitor')||'null')||askedAny()}catch{}
  const p=state.profile||{},u=state.authUser||{};
  const phone=gatePhone(v?.phone)||gatePhone(p.phone)||gatePhone(u.phone)||'';
  return{name:(v?.name||p.name||u.name||'').trim(),phone,email:u.email||p.email||'',emailVerified:!!(u.email&&u.emailVerified!==false),phoneVerified:!!(v?.verified||(u.phone&&gatePhone(u.phone)===phone)),in:!!phone}}
function saveMe(name,phone,extra={}){try{const v=JSON.parse(localStorage.getItem('surestone:visitor')||'null')||{};localStorage.setItem('surestone:visitor',JSON.stringify({...v,name,phone,at:Date.now(),...extra}));localStorage.setItem('surestone:asked',JSON.stringify({name,phone}))}catch{}
  state.profile={...state.profile,name,phone};try{store.write('profile',state.profile)}catch{};try{syncHeader()}catch{}}
const needOtp=()=>!!(state.crmContact?.verify&&window.sureStoneAuth?.configured);
/* SMS code step inside any form. Resolves true when the number is verified. */
function otpStep(form,phone){return new Promise(resolve=>{
  const id='otp'+Math.random().toString(36).slice(2,8);
  const box=document.createElement('div');box.className='otp-box';
  box.innerHTML=`<p class="otp-note">We sent a 6-digit code by SMS to <b>${esc(phone)}</b>.</p><div id="${id}"></div><label class="form-row"><span>Code</span><input class="otp-code" inputmode="numeric" maxlength="6" placeholder="6-digit code" autocomplete="one-time-code"></label><button type="button" class="gold-button otp-ok">Verify <span>→</span></button><button type="button" class="button-text otp-change">Change number</button><p class="otp-status" role="status"></p>`;
  form.querySelectorAll(':scope > :not(.otp-box):not(h2):not(p):not(img)').forEach(el=>el.hidden=true);form.appendChild(box);
  const st=box.querySelector('.otp-status'),done=ok=>{box.remove();form.querySelectorAll('[hidden]').forEach(el=>{if(!el.classList.contains('gate-hp'))el.hidden=false});resolve(ok)};
  box.querySelector('.otp-change').addEventListener('click',()=>{try{window.sureStoneAuth.clearPhoneVerifier()}catch{};done(false)});
  st.textContent='Sending the code…';
  window.sureStoneAuth.sendPhoneCode(toE164(phone),id).then(()=>{st.textContent='';box.querySelector('.otp-code').focus()}).catch(err=>{st.textContent=/operation-not-allowed|billing/.test(err.code||'')?'SMS check is not switched on yet.':/too-many|quota/.test(err.code||'')?'Too many codes right now. Please try later.':/invalid-phone/.test(err.code||'')?'This number does not look right.':'Could not send the code. Please try again.'});
  box.querySelector('.otp-ok').addEventListener('click',async()=>{const code=box.querySelector('.otp-code').value.replace(/\D/g,'');if(code.length!==6){st.textContent='Please type the 6-digit code.';return}
    st.textContent='Checking…';try{await window.sureStoneAuth.confirmPhoneCode(code);done(true)}catch(err){st.textContent=/invalid-verification-code/.test(err.code||'')?'That code is not right.':/code-expired/.test(err.code||'')?'The code expired. Tap Change number and try again.':'Could not check the code. Please try again.'}});
})}
/* The one form: name + mobile (+ SMS code when switched on). Saves the lead in the CRM. */
function identityForm({cls='id-form',photo,title,sub,button='Continue',project='',message='Logged in on the website',onDone}){
  const f=document.createElement('form');f.className=cls;f.noValidate=true;const m=me();
  f.innerHTML=`${photo?`<img class="gate-photo" src="${esc(photo)}" alt="">`:''}${title?`<h2>${esc(title)}</h2>`:''}${sub?`<p>${esc(sub)}</p>`:''}
  <label class="form-row"><span>Your name</span><input name="name" autocomplete="name" placeholder="What should we call you?" required maxlength="80" value="${esc(m.name)}"></label>
  <label class="form-row"><span>Mobile number</span><input name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10-digit mobile" required maxlength="16" value="${esc(m.phone)}"></label>
  ${window.sureStoneAuth?.configured?`<div class="id-gmail"><span>Email <em>(optional)</em></span>${m.email?`<b class="id-gmail-on">${esc(m.email)} <i>✓</i></b>`:`<button type="button" class="me-btn me-google" data-id-google><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.8 27.9a12 12 0 0 1 0-7.7v-5.3H5.9a20 20 0 0 0 0 18.3l6.9-5.3Z"/><path fill="#EA4335" d="M24 12c3 0 5.6 1 7.7 3l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.9 14.9l6.9 5.3C14.4 15.5 18.8 12 24 12Z"/></svg> Add with Gmail</button>`}</div>`:''}
  <input name="website" tabindex="-1" autocomplete="off" class="gate-hp" aria-hidden="true">
  <button class="gold-button" type="submit">${esc(button)} <span>→</span></button>`;
  f.querySelector('[data-id-google]')?.addEventListener('click',async ev=>{
    const g=ev.currentTarget,box=g.parentElement;state.suppressPhoneAsk=true;g.disabled=true;
    try{await window.sureStoneAuth.addGoogle();await new Promise(r=>setTimeout(r,300));const em=state.authUser?.email||'';
      if(em){box.innerHTML=`<span>Email <em>(optional)</em></span><b class="id-gmail-on">${esc(em)} <i>✓</i></b>`;if(!f.elements.name.value.trim()&&state.authUser?.name)f.elements.name.value=state.authUser.name}else g.disabled=false}
    catch(err){g.disabled=false;if(!/popup-closed|cancelled/.test(err.code||''))formError(f,err.message||'Could not add Gmail.')}
  });
  f.addEventListener('submit',async e=>{
    e.preventDefault();const btn=f.querySelector('[type=submit]');
    const name=f.elements.name.value.trim(),phone=gatePhone(f.elements.phone.value);
    if(name.length<2){formError(f,'Please enter your name.');return}
    if(!phone){formError(f,'Please enter a valid 10-digit mobile number.');return}
    formError(f,'');let verified=me().phoneVerified&&me().phone===phone;
    if(needOtp()&&!verified){if(!(await otpStep(f,phone)))return;verified=true}
    btn.disabled=true;
    const sent=await sendToCrm({name,mobile:phone,email:me().email||undefined,project,message:message+(verified?' (number verified by SMS)':''),website:f.elements.website.value});
    btn.disabled=false;if(!sent.ok){formError(f,sent.error);return}
    saveMe(name,phone,verified?{verified:true}:{});
    if(state.authUser){state.suppressPhoneAsk=false;try{registerClient(state.authUser)}catch{}}   // links the Gmail to this lead
    onDone&&onDone(name,phone);
  });
  return f;
}
/* Account window: who you are, add Gmail, verify mobile, log out. Replaces the old sign-in buttons. */
function renderMeBox(){
  const host=$('#accountDialog .auth-actions');if(!host)return;
  let box=$('#meBox');if(!box){box=document.createElement('div');box.id='meBox';host.before(box)}
  const m=me();
  if(!m.in){box.innerHTML='';box.appendChild(identityForm({cls:'id-form me-form',title:'',sub:'Tell us who you are. Just your name and mobile number.',button:'Continue',onDone:()=>{renderMeBox();toast('Welcome! You can now see every home in full.')}}));return}
  const canVerify=needOtp()&&!m.phoneVerified,google=window.sureStoneAuth?.configured;
  box.innerHTML=`<div class="me-rows">
    <div class="me-row"><span>Mobile</span><b>${esc(m.phone)}</b>${m.phoneVerified?'<em class="me-ok">Verified</em>':canVerify?'<button type="button" class="me-btn" data-me-verify>Verify by SMS</button>':''}</div>
    <div class="me-row"><span>Email</span>${m.email?`<b>${esc(m.email)}</b><em class="me-ok">Added with Google</em>`:google?'<button type="button" class="me-btn me-google" data-me-google><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.8 27.9a12 12 0 0 1 0-7.7v-5.3H5.9a20 20 0 0 0 0 18.3l6.9-5.3Z"/><path fill="#EA4335" d="M24 12c3 0 5.6 1 7.7 3l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.9 14.9l6.9 5.3C14.4 15.5 18.8 12 24 12Z"/></svg> Add your Gmail (optional)</button>':'<span class="me-muted">Not added</span>'}</div>
  </div><p class="me-status" role="status"></p>`;
  const st=box.querySelector('.me-status');
  box.querySelector('[data-me-google]')?.addEventListener('click',async()=>{st.textContent='Opening Google…';try{await window.sureStoneAuth.addGoogle();st.textContent='Gmail added. Thank you.'}catch(err){st.textContent=/popup-closed|cancelled/.test(err.code||'')?'':(err.message||'Could not add Gmail.')}});
  box.querySelector('[data-me-verify]')?.addEventListener('click',async()=>{const f=document.createElement('form');f.className='id-form';box.appendChild(f);const ok=await otpStep(f,m.phone);f.remove();if(ok){saveMe(m.name,m.phone,{verified:true});sendToCrm({name:m.name,mobile:m.phone,message:'Verified their mobile number by SMS on the website'});renderMeBox();toast('Number verified.')}});
}
(function initMeBox(){
  if(!$('#accountDialog'))return;
  renderMeBox();
  document.addEventListener('surestone-auth-state',()=>setTimeout(renderMeBox,0));
  $('#accountDialog').addEventListener('toggle',renderMeBox);
  $('#accountOpen')?.addEventListener('click',()=>setTimeout(renderMeBox,0));
})();

/* Any form with a name + mobile (brochure, Book a call, sell, contact, visit) logs the person in on this device,
   so the header says "Good evening, <name>" without them having to fill "Edit your details". */
function rememberMe(fields){
  const name=String(fields?.name||'').trim(),phone=gatePhone(fields?.mobile);
  if(name.length<2||!phone)return;
  const m=me();
  if(!m.in||(m.phone===phone&&!m.name))saveMe(name,phone);
  try{renderMeBox()}catch{}
}

/* ---------- Testimonials: anyone can share their experience (an admin approves it in the CRM first) ---------- */
(function shareExperience(){
  const sec=$('#testimonials');if(!sec)return;
  const head=sec.querySelector('.section-heading');
  if(head&&!$('#shareExperience')){const b=document.createElement('button');b.type='button';b.id='shareExperience';b.className='button-outline';b.textContent='SHARE YOUR EXPERIENCE';head.appendChild(b);b.addEventListener('click',openShare)}
  function openShare(){
    const c=crmConfig();if(!c)return;let d=$('#shareDialog');if(d)d.remove();
    const m=me();d=document.createElement('dialog');d.className='dialog';d.id='shareDialog';
    d.innerHTML=`<form class="dialog-shell contact-shell" novalidate><header class="dialog-head"><div><h2>Share your experience.</h2><p>A few words about buying or selling with The Astittva Estates.</p></div><button type="button" class="dialog-close" aria-label="Close">×</button></header>
    <div class="form-row"><span>Your rating</span><div class="rate-stars" role="radiogroup" aria-label="Rating">${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}" aria-label="${n} star${n>1?'s':''}">★</button>`).join('')}</div></div>
    <label class="form-row"><span>Your name</span><input name="name" maxlength="80" value="${esc(m.name)}"></label>
    <label class="form-row"><span>Mobile number <em>(not shown on the website)</em></span><input name="phone" type="tel" inputmode="numeric" maxlength="16" value="${esc(m.phone)}"></label>
    <label class="form-row"><span>City or area (optional)</span><input name="place" maxlength="80" placeholder="e.g. Atal Nagar, Raipur"></label>
    <label class="form-row"><span>Your words</span><textarea name="text" rows="4" maxlength="1200" placeholder="How did we help you?"></textarea></label>
    <button class="gold-button contact-submit" type="submit">SEND <span>→</span></button></form>`;
    document.body.appendChild(d);d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d)d.close()});d.showModal();
    const form=d.querySelector('form');let rating=5;const paint=()=>form.querySelectorAll('[data-rate]').forEach(b=>b.classList.toggle('on',Number(b.dataset.rate)<=rating));paint();
    form.addEventListener('click',e=>{const b=e.target.closest('[data-rate]');if(b){rating=Number(b.dataset.rate);paint()}});
    form.addEventListener('submit',async e=>{
      e.preventDefault();const btn=form.querySelector('[type=submit]'),name=form.elements.name.value.trim(),text=form.elements.text.value.trim(),phone=gatePhone(form.elements.phone.value);
      if(name.length<2){formError(form,'Please enter your name.');return}
      if(!phone){formError(form,'Please enter a valid 10-digit mobile number.');return}
      if(text.length<10){formError(form,'Please write a few words (at least 10 letters).');return}
      btn.disabled=true;formError(form,'');let ok=false,err='';
      try{const r=await fetch(`${c.url}/api/site/testimonials`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:c.formKey,name,phone,place:form.elements.place.value,rating,text})});const j=await r.json();ok=j.ok;err=j.error||''}catch{err='Could not send. Check your internet and try again.'}
      btn.disabled=false;if(!ok){formError(form,err||'Could not send. Please try again.');return}
      form.innerHTML='<div class="contact-success"><span>✳</span><h3>Thank you.</h3><p>Your words mean a lot to us. Your review will show here shortly.</p></div>';
    });
  }
})();

/* Home page: link to the full reviews page; reviews page: the nav item is marked */
(function reviewsLinks(){const sec=$('#testimonials');if(!sec)return;
  if(!document.body.classList.contains('page-testimonials')){const head=sec.querySelector('.section-heading');if(head&&!$('#allReviews')){const a=document.createElement('a');a.id='allReviews';a.className='text-link';a.href='testimonials.html';a.innerHTML='SEE ALL REVIEWS <span></span>';head.appendChild(a)}}
  else{$$('.main-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='testimonials.html'))}
})();

/* Developer dropdown in the listing toolbar */
$('#devFilter')?.addEventListener('change',e=>{state.developer=e.target.value;renderListings()});
