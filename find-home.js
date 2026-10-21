/* Client requirement form ("Share my form" in the CRM): find-home.html?f=<form>&by=<advisor> */
(function findHome(){
  const form=document.getElementById('fhForm');if(!form)return;
  const CRM=(window.SURESTONE_CRM||{}).url||'';
  const q=new URLSearchParams(location.search),f=(q.get('f')||'').toLowerCase(),by=q.get('by')||'';
  const err=document.getElementById('fhError'),send=document.getElementById('fhSend');
  const OPTS={
    bhk:['1 BHK','2 BHK','3 BHK','4 BHK','4.5 BHK','5+ BHK','Penthouse','Other'],
    ptype:['Apartment','Villa','Independent house','Plot','Office','Retail'],
    budget:['Under ₹1 Cr','₹1 – 1.5 Cr','₹1.5 – 2 Cr','₹2 – 3 Cr','₹3 Cr+'],
    purpose:['Self use','Investment','Both'],
    timeline:['Right away','Within 3 months','3 – 6 months','Just exploring'],
    loan:['Yes','No','Not sure'],
    slot:['Morning','Afternoon','Evening','Any time']
  };
  const BUDGET={'Under ₹1 Cr':[null,100],'₹1 – 1.5 Cr':[100,150],'₹1.5 – 2 Cr':[150,200],'₹2 – 3 Cr':[200,300],'₹3 Cr+':[300,null]}; // lakhs
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  form.querySelectorAll('.fh-picks').forEach(box=>{const n=box.dataset.name;box.setAttribute('role','radiogroup');box.innerHTML=(OPTS[n]||[]).map(o=>`<label class="fh-pick"><input type="radio" name="${n}" value="${esc(o)}"><span>${esc(o)}</span></label>`).join('')});
  const showErr=m=>{err.textContent=m;err.hidden=!m};
  if(!/^[a-f0-9]{24,64}$/.test(f)||!/^https:\/\//.test(CRM)&&!/^http:\/\/(127\.0\.0\.1|localhost)/.test(CRM)){form.querySelectorAll('input,textarea,button').forEach(e=>e.disabled=true);showErr('This link is not complete. Please ask your property advisor for it again.');return}

  // Fill in what we already know.
  try{const v=JSON.parse(localStorage.getItem('surestone:visitor')||'null');if(v){if(v.name)document.getElementById('fhName').value=v.name;if(v.phone)document.getElementById('fhPhone').value=String(v.phone).replace(/^\+?91/,'').slice(-10)}}catch{}
  fetch(`${CRM}/api/site/requirement?f=${f}${by?`&by=${encodeURIComponent(by)}`:''}`).then(r=>r.json()).then(d=>{
    if(!d||!d.ok){form.querySelectorAll('input,textarea,button').forEach(e=>e.disabled=true);showErr('This link is not active any more. Please ask your property advisor for a new one.');return}
    const who=d.advisor?`<b>${esc(d.advisor)}</b> will personally shortlist homes`:'Our advisor will shortlist homes';
    document.getElementById('fhLead').innerHTML=`${who}${d.city?' in '+esc(d.city):''} that fit your budget, and call you. No spam, no pressure.`;
    const areas=(d.areas||[]).filter(Boolean);
    document.getElementById('fhAreas').innerHTML=areas.map(a=>`<option value="${esc(a)}"></option>`).join('');
    form.dataset.advisor=d.advisor||'';
  }).catch(()=>{});

  form.addEventListener('submit',async e=>{
    e.preventDefault();showErr('');
    const fd=new FormData(form),name=String(fd.get('name')||'').trim(),phone=String(fd.get('phone')||'').replace(/[^\d+]/g,'');
    if(name.length<2)return showErr('Please enter your name.');
    if(!/^(\+?91)?[6-9]\d{9}$/.test(phone)&&!/^\+\d{8,15}$/.test(phone))return showErr('Please enter a valid 10-digit mobile number.');
    const b=BUDGET[fd.get('budget')]||[null,null];
    const body={f,by,name,phone,bhk:fd.get('bhk')||'',ptype:fd.get('ptype')||'',bmin:b[0]??'',bmax:b[1]??'',location:fd.get('location')||'',purpose:fd.get('purpose')||'',timeline:fd.get('timeline')||'',loan:fd.get('loan')||'',slot:fd.get('slot')||'',note:fd.get('note')||''};
    send.disabled=true;send.firstChild.textContent='SENDING… ';
    try{
      const r=await fetch(`${CRM}/api/site/requirement`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      const d=await r.json().catch(()=>({}));
      if(!d.ok){showErr(d.error||'Could not send. Please try again, or call us.');return}
      try{if(typeof rememberMe==='function')rememberMe({name,mobile:phone})}catch{}
      const who=esc(d.advisor||form.dataset.advisor||'Our advisor');
      const done=document.getElementById('fhDone');
      done.innerHTML=`<span class="fh-tick">✓</span><h2>Thank you, ${esc(d.name||name.split(' ')[0])}.</h2>${d.fits?`<p><strong>${d.fits} of our project${d.fits===1?'':'s'} fit${d.fits===1?'s':''} your budget.</strong> ${who} will call you soon with the details, prices and the best units.</p>`:`<p>${who} will look for homes that match and call you soon.</p>`}<div class="fh-done-actions"><a class="gold-button" href="search.html">SEE OUR HOMES <span>→</span></a></div>`;
      form.hidden=true;done.hidden=false;window.scrollTo({top:0,behavior:'smooth'});
    }catch{showErr('No internet right now. Please try again.')}
    finally{send.disabled=false;send.firstChild.textContent='FIND HOMES FOR ME '}
  });
})();
