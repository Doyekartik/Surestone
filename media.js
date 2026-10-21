/* Big photo viewer (tap any property photo, then use the arrows) and project videos. */
(function(){
  const esc2=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const big=u=>{try{return typeof photo==='function'?photo(u,2000):u}catch{return u}};
  let box,stage,count,cap,prevB,nextB,items=[],at=0,lastFocus=null,busy=0;

  function build(){
    if(box)return;
    box=document.createElement('div');box.className='ss-lb';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label','Photos and videos');
    box.innerHTML=`<div class="ss-lb-top"><span class="ss-lb-count" aria-live="polite"></span><button type="button" class="ss-lb-close" aria-label="Close">✕</button></div>
      <button type="button" class="ss-lb-nav ss-lb-prev" aria-label="Previous"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
      <div class="ss-lb-stage"></div>
      <button type="button" class="ss-lb-nav ss-lb-next" aria-label="Next"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
      <div class="ss-lb-cap"></div>`;
    document.body.appendChild(box);
    stage=box.querySelector('.ss-lb-stage');count=box.querySelector('.ss-lb-count');cap=box.querySelector('.ss-lb-cap');prevB=box.querySelector('.ss-lb-prev');nextB=box.querySelector('.ss-lb-next');
    prevB.addEventListener('click',e=>{e.stopPropagation();go(-1)});
    nextB.addEventListener('click',e=>{e.stopPropagation();go(1)});
    box.querySelector('.ss-lb-close').addEventListener('click',close);
    box.addEventListener('click',e=>{if(e.target===box||e.target===stage)close()});
    let sx=0,sy=0;
    box.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY},{passive:true});
    box.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)go(dx<0?1:-1)},{passive:true});
    document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1)});
  }

  function preload(i){const it=items[(i+items.length)%items.length];if(it&&it.type==='img'){const im=new Image();im.decoding='async';im.src=big(it.src)}}

  function show(i,dir){
    at=(i+items.length)%items.length;const it=items[at],my=++busy;
    count.textContent=items.length>1?`${at+1} / ${items.length}`:'';
    cap.textContent=it.caption||'';
    const multi=items.length>1;prevB.hidden=!multi;nextB.hidden=!multi;
    stage.querySelectorAll('video').forEach(v=>{try{v.pause()}catch{}});
    let el;
    if(it.type==='video'){el=document.createElement('video');el.src=it.src;el.controls=true;el.playsInline=true;el.preload='auto';el.setAttribute('playsinline','');el.autoplay=true}
    else{el=new Image();el.alt=it.alt||'';el.decoding='async';el.src=big(it.src)}
    el.className='ss-lb-media';el.style.setProperty('--from',dir>0?'40px':dir<0?'-40px':'0px');
    const swap=()=>{if(my!==busy)return;stage.replaceChildren(el);requestAnimationFrame(()=>el.classList.add('in'));preload(at+1);preload(at-1)};
    if(it.type==='img'&&el.decode)el.decode().then(swap,swap);else swap();
  }
  function go(d){if(items.length>1)show(at+d,d)}

  function open(list,index){
    build();items=list.filter(x=>x&&x.src);if(!items.length)return;
    lastFocus=document.activeElement;box.hidden=false;document.documentElement.classList.add('ss-lb-open');
    requestAnimationFrame(()=>box.classList.add('on'));show(Math.max(0,index|0),0);box.querySelector('.ss-lb-close').focus({preventScroll:true});
  }
  function close(){
    if(!box||box.hidden)return;box.classList.remove('on');stage.querySelectorAll('video').forEach(v=>{try{v.pause()}catch{}});busy++;
    document.documentElement.classList.remove('ss-lb-open');
    setTimeout(()=>{box.hidden=true;stage.replaceChildren()},220);
    if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true});
  }
  window.ssLightbox={open,close};

  const current=()=>{try{return typeof homeById==='function'&&typeof state!=='undefined'?homeById(state.currentHome):null}catch{return null}};

  /* Videos block on the property page (called by app.js) */
  window.videoSectionHTML=function(h){
    const vids=(h&&Array.isArray(h.videos)?h.videos:[]).filter(v=>v&&/^https:\/\//.test(v.url));
    if(!vids.length)return'';
    return `<section class="detail-section detail-videos"><h2>Videos</h2><p>Take a closer look before you visit.</p><div class="video-grid ${vids.length===1?'one':''}">${vids.map((v,i)=>`<button type="button" class="video-tile" data-video-index="${i}" aria-label="Play video ${i+1}${v.name?': '+esc2(v.name):''}"><video src="${esc2(v.url)}#t=0.5" preload="metadata" muted playsinline loop tabindex="-1"></video><span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>${v.name?`<span class="video-name">${esc2(v.name)}</span>`:''}</button>`).join('')}</div></section>`;
  };

  // Tap a photo → big view (runs before the page's own click handling).
  window.addEventListener('click',e=>{
    const g=e.target.closest&&e.target.closest('[data-gallery-image]');
    if(g){const h=current();if(!h)return;const pics=(Array.isArray(h.gallery)&&h.gallery.length?h.gallery:[h.image,h.image2,h.image3]).filter(Boolean);
      e.preventDefault();e.stopPropagation();open(pics.map((u,i)=>({type:'img',src:u,alt:`${h.title}, photo ${i+1}`,caption:h.title})),Number(g.dataset.galleryImage)||0);return}
    const v=e.target.closest&&e.target.closest('[data-video-index]');
    if(v){const h=current();if(!h)return;e.preventDefault();e.stopPropagation();
      open((h.videos||[]).map(x=>({type:'video',src:x.url,caption:x.name||h.title})),Number(v.dataset.videoIndex)||0)}
  },true);

  // Desktop: a quiet muted preview while the mouse is on a video tile.
  document.addEventListener('pointerover',e=>{const t=e.target.closest&&e.target.closest('.video-tile');if(t&&e.pointerType==='mouse'){const v=t.querySelector('video');v&&v.play&&v.play().catch(()=>{})}});
  document.addEventListener('pointerout',e=>{const t=e.target.closest&&e.target.closest('.video-tile');if(t&&!t.contains(e.relatedTarget)){const v=t.querySelector('video');if(v){v.pause();try{v.currentTime=.5}catch{}}}});
})();
