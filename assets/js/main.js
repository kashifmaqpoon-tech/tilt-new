
document.addEventListener('DOMContentLoaded', function(){
  // Slider
  (function(){
    const slider = document.querySelector('.slider'); if(!slider) return;
    const slides = slider.querySelector('.slides'); const total = slides.children.length; let index=0;
    const dots = slider.querySelector('.slider-dots');
    for(let i=0;i<total;i++){ const b=document.createElement('button'); if(i===0) b.classList.add('active'); dots.appendChild(b); b.addEventListener('click', ()=> go(i)); }
    const go = (i)=>{ index = (i+total)%total; slides.style.transform = 'translateX(' + (-index*100) + '%)'; updateDots(); }
    const updateDots = ()=>{ dots.querySelectorAll('button').forEach((b,bi)=> b.classList.toggle('active', bi===index)); }
    slider.querySelector('.slider-prev').addEventListener('click', ()=> go(index-1));
    slider.querySelector('.slider-next').addEventListener('click', ()=> go(index+1));
    let autoplay = setInterval(()=> go(index+1), 4500);
    slider.addEventListener('mouseenter', ()=> clearInterval(autoplay));
    slider.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> go(index+1), 4500));
  })();

  // Reveal on scroll
  const obs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));

  // Counters
  function animateCounter(el, to){ let start=0; const dur=1300; const t0=performance.now(); function tick(now){ const t=Math.min((now-t0)/dur,1); const val=Math.floor(t*to); el.textContent = val + (to>=30?'+':''); if(t<1) requestAnimationFrame(tick); } requestAnimationFrame(tick); }
  const countersSection = document.querySelector('.counters');
  if(countersSection){ const obs2 = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ document.querySelectorAll('.counter .num').forEach((n)=>{ const target=parseInt(n.dataset.target); animateCounter(n,target); }); obs2.disconnect(); } }); }, {threshold:0.4}); obs2.observe(countersSection); }
  // lazy load images
  document.querySelectorAll('img').forEach(img=> img.loading = img.loading || 'lazy');
});
