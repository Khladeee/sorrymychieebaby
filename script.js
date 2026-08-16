  /* ---------- background stars ---------- */
  const starLayer = document.getElementById('stars');
  for(let i=0;i<70;i++){
    const s = document.createElement('div');
    s.className='star';
    s.style.left = Math.random()*100+'vw';
    s.style.top = Math.random()*100+'vh';
    s.style.animationDelay = (Math.random()*3.5)+'s';
    starLayer.appendChild(s);
  }

  /* ---------- clickable wish stars (hero only) ---------- */
  const hero = document.getElementById('hero');
  const wishes = [
    "I really am sorry.",
    "you make ordinary nights feel like something.",
    "I'm listening now — really listening.",
    "next time, I stay awake.",
    "you're worth staying up for.",
    "this is me, trying."
  ];
  for(let i=0;i<6;i++){
    const ws = document.createElement('div');
    ws.className = 'wish-star';
    ws.style.left = (8 + Math.random()*84) + '%';
    ws.style.top = (8 + Math.random()*70) + '%';
    ws.style.animationDelay = (Math.random()*3)+'s';
    const msg = document.createElement('div');
    msg.className = 'wish-msg';
    msg.textContent = wishes[i % wishes.length];
    ws.appendChild(msg);
    ws.addEventListener('mouseenter', () => msg.classList.add('show'));
    ws.addEventListener('mouseleave', () => msg.classList.remove('show'));
    ws.addEventListener('click', () => msg.classList.toggle('show'));
    hero.appendChild(ws);
  }

  /* ---------- night -> dawn scroll tint ---------- */
  const sky = document.getElementById('sky');
  const nightColors = ['#0b1023','#141b3d'];
  const dawnColors  = ['#3a2c5e','#c96a5a'];
  function lerpColor(a,b,t){
    const ah=parseInt(a.slice(1),16), bh=parseInt(b.slice(1),16);
    const ar=(ah>>16)&255, ag=(ah>>8)&255, ab=ah&255;
    const br=(bh>>16)&255, bg=(bh>>8)&255, bb=bh&255;
    const rr=Math.round(ar+(br-ar)*t), rg=Math.round(ag+(bg-ag)*t), rb=Math.round(ab+(bb-ab)*t);
    return `rgb(${rr},${rg},${rb})`;
  }
  function onScroll(){
    const t = Math.min(1, window.scrollY / (document.body.scrollHeight - window.innerHeight));
    const c1 = lerpColor(nightColors[0], dawnColors[0], t);
    const c2 = lerpColor(nightColors[1], dawnColors[1], t);
    sky.style.background = `linear-gradient(180deg, ${c1}, ${c2})`;
    starLayer.style.opacity = 1 - t*0.85;
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- typewriter hero headline ---------- */
  const typeTarget = document.getElementById('typeTarget');
  const fullText = "I owe you more than an apology, Rytch.";
  const emStart = fullText.indexOf("an apology");
  const emEnd = emStart + "an apology".length;
  let ti = 0;
  function typeStep(){
    if(ti <= fullText.length){
      const shown = fullText.slice(0, ti);
      let html = shown;
      if(ti > emStart){
        const before = shown.slice(0, emStart);
        const mid = shown.slice(emStart, Math.min(ti, emEnd));
        const after = ti > emEnd ? shown.slice(emEnd) : '';
        html = before + '<em>' + mid + '</em>' + after;
      }
      typeTarget.innerHTML = html;
      ti++;
      setTimeout(typeStep, 32);
    }
  }
  typeStep();

  /* ---------- moon parallax + click ---------- */
  const moonWrap = document.getElementById('moonWrap');
  const moonEl = document.getElementById('moonEl');
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width - 0.5;
    const py = (e.clientY - r.top)/r.height - 0.5;
    moonWrap.style.transform = `translate(${px*14}px, ${py*14}px)`;
  });
  let moonClicks = 0;
  moonEl.addEventListener('click', () => {
    moonClicks++;
    moonEl.style.transform = 'scale(0.85)';
    setTimeout(() => moonEl.style.transform = 'scale(1)', 180);
  });

  /* ---------- card tilt ---------- */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-py*8}deg) rotateY(${px*8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------- memory jar ---------- */
  const jarNotes = [
    "I noticed when you got quiet that day. I should've asked why sooner.",
    "you remembering small things about my day is not small to me.",
    "I'm proud of how you handle hard weeks. I don't say that enough.",
    "I think about our random late-night calls more than you'd guess.",
    "I'm working on being someone you don't have to chase for attention.",
    "thank you for still being here while I figure this out."
  ];
  const jarEl = document.getElementById('jarEl');
  const jarNote = document.getElementById('jarNote');
  const jarCount = document.getElementById('jarCount');
  let jarPulls = 0;
  jarEl.addEventListener('click', () => {
    const note = jarNotes[Math.floor(Math.random()*jarNotes.length)];
    jarNote.textContent = '"' + note + '"';
    jarNote.classList.remove('show');
    void jarNote.offsetWidth;
    jarNote.classList.add('show');
    jarPulls++;
    jarCount.textContent = jarPulls === 1 ? '1 pulled so far' : jarPulls + ' pulled so far';
    jarEl.style.transform = 'scale(0.92) rotate(-3deg)';
    setTimeout(() => jarEl.style.transform = '', 200);
  });

  /* ---------- forgive me ---------- */
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const btnRow = document.getElementById('btnRow');
  const result = document.getElementById('result');
  const noCount = document.getElementById('noCount');
  const celebrate = document.getElementById('celebrate');

  const noExcuses = [
    "you can try, but this button is as tired of running as I am of sleeping through calls.",
    "still no luck. it's stalling for me, not against you.",
    "okay it's basically begging on my behalf at this point.",
    "at some point 'no' just becomes 'convince me more' — I'm listening."
  ];
  let noPresses = 0;

  function dodge(){
    const rowRect = btnRow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = rowRect.width - btnRect.width - 10;
    const maxY = rowRect.height - btnRect.height - 10;
    const x = Math.max(10, Math.random()*maxX);
    const y = Math.max(10, Math.random()*maxY);
    if(!noBtn.classList.contains('dodging')) noBtn.classList.add('dodging');
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
  }

  ['mouseenter','click','touchstart'].forEach(evt => {
    noBtn.addEventListener(evt, (e) => {
      if(evt !== 'mouseenter') e.preventDefault();
      noPresses++;
      dodge();
      noCount.textContent = noExcuses[Math.min(noPresses-1, noExcuses.length-1)];
    });
  });

  yesBtn.addEventListener('click', () => {
    result.textContent = "thank you, Rytch. I won't waste it.";
    result.classList.add('show');
    noCount.textContent = '';
    noBtn.style.display = 'none';
    burstHearts();
  });

  function burstHearts(){
    for(let i=0;i<28;i++){
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = ['♥','✦','♥','✧'][Math.floor(Math.random()*4)];
      h.style.left = (10 + Math.random()*80) + 'vw';
      h.style.bottom = '0px';
      h.style.color = Math.random() > 0.5 ? '#f2b880' : '#e8c468';
      h.style.animationDelay = (Math.random()*0.6)+'s';
      celebrate.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }
  }

  /* ---------- custom cursor + trailing hearts (desktop only) ---------- */
  const cursor = document.getElementById('cursor');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(isFinePointer){
    let lastTrail = 0;
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      const now = Date.now();
      if(now - lastTrail > 90){
        lastTrail = now;
        const t = document.createElement('div');
        t.className = 'trail-heart';
        t.textContent = '♥';
        t.style.left = e.clientX + 'px';
        t.style.top = e.clientY + 'px';
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 1000);
      }
    });
    document.querySelectorAll('button, .moon, .jar, .wish-star').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else {
    cursor.style.display = 'none';
  }
