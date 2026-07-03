(function(){
  const html=document.documentElement,body=document.body;
  const themeToggle=document.getElementById('themeToggle');
  const sunIcon=document.getElementById('sunIcon');
  const moonIcon=document.getElementById('moonIcon');
  const langToggle=document.getElementById('langToggle');
  const langIcon=document.getElementById('langIcon');
  const mobileToggle=document.getElementById('mobileToggle');
  const mobileMenu=document.getElementById('mobileMenu');

  const getBrowserLang=()=>(navigator.language||'').startsWith('bn')?'bn':'en';

  const initTheme=()=>{
    const t=localStorage.getItem('theme')||'light';
    html.dataset.theme=t;
    if(sunIcon&&moonIcon){sunIcon.style.display=t==='dark'?'block':'none';moonIcon.style.display=t==='dark'?'none':'block'}
  };

  const updateLang=(l)=>{
    if(langIcon)langIcon.textContent=l.toUpperCase();
    document.querySelectorAll('[data-en][data-bn]').forEach(el=>{el.innerHTML=el.dataset[l]||el.innerHTML});
  };

  const initLang=()=>{
    const l=localStorage.getItem('language')||getBrowserLang();
    body.dataset.lang=l;
    updateLang(l);
  };

  if(themeToggle){
    themeToggle.onclick=()=>{
      const t=html.dataset.theme==='dark'?'light':'dark';
      html.dataset.theme=t;
      localStorage.setItem('theme',t);
      if(sunIcon&&moonIcon){sunIcon.style.display=t==='dark'?'block':'none';moonIcon.style.display=t==='dark'?'none':'block'}
    };
  }

  if(langToggle){
    langToggle.onclick=()=>{
      const l=body.dataset.lang==='en'?'bn':'en';
      body.dataset.lang=l;
      localStorage.setItem('language',l);
      updateLang(l);
    };
  }

  initTheme();
  if(langToggle)initLang();

  if(mobileToggle&&mobileMenu){
    mobileToggle.addEventListener('click',(e)=>{
      e.stopPropagation();
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow=mobileMenu.classList.contains('active')?'hidden':'';
    });
    document.addEventListener('click',(e)=>{
      if(!mobileMenu.contains(e.target)&&!mobileToggle.contains(e.target)){
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow='';
      }
    });
    mobileMenu.querySelectorAll('a').forEach(a=>{
      a.onclick=()=>{
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow='';
      };
    });
  }

  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('active')});
  },{threshold:.1});
  document.querySelectorAll('.section,.bento-item,.uniform-card,.info-card,.team-card,.contact-card,.pricing-card,.process-card').forEach(el=>{
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
