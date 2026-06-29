/* ============================================================
   main.js — MediSlim
   Navbar · Mobile menu · Smooth scroll · Steps · Testimonials
   BMI Calculator · Stats counter · FAQ · Cookies · Reveals
   ============================================================ */

'use strict';

/* ══════════════════════════════════════
   LENIS — Smooth scroll
══════════════════════════════════════ */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,
  });
  function rafLoop(time) { lenis.raf(time); requestAnimationFrame(rafLoop); }
  requestAnimationFrame(rafLoop);
}

/* ══════════════════════════════════════
   NAVBAR — scroll behaviour
══════════════════════════════════════ */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const banner  = document.getElementById('topBanner');
  const closeBtn = document.getElementById('topBannerClose');
  let bannerHeight = banner ? banner.offsetHeight : 0;

  if (!navbar) return;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.maxHeight = banner.offsetHeight + 'px';
      requestAnimationFrame(() => {
        banner.style.transition = 'max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease';
        banner.style.maxHeight  = '0';
        banner.style.opacity    = '0';
        banner.style.padding    = '0';
      });
    });
  }
})();

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
(function initMobileMenu() {
  const btn  = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  let scrollPos = 0;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (!isOpen) {
      scrollPos = window.scrollY;
      document.body.classList.add('no-scroll');
      document.body.style.top = `-${scrollPos}px`;
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, scrollPos);
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.classList.toggle('open');
  });

  /* Mobile sub-dropdowns */
  function initMobileDropdown(toggleId, subId) {
    const toggle = document.getElementById(toggleId);
    const sub    = document.getElementById(subId);
    if (!toggle || !sub) return;
    toggle.addEventListener('click', () => sub.classList.toggle('open'));
  }
  initMobileDropdown('mobileDropTreat', 'mobileSubTreat');
  initMobileDropdown('mobileDropHow',   'mobileSubHow');

  /* Close on escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) btn.click();
  });
})();

/* ══════════════════════════════════════
   STEPS — interactive highlight
══════════════════════════════════════ */
(function initSteps() {
  const steps = document.querySelectorAll('.step-item');
  if (!steps.length) return;

  steps.forEach((step, i) => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  /* Auto-advance on desktop */
  if (window.innerWidth >= 768) {
    let currentStep = 0;
    setInterval(() => {
      steps.forEach(s => s.classList.remove('active'));
      currentStep = (currentStep + 1) % steps.length;
      steps[currentStep].classList.add('active');
    }, 3500);
  }
})();

/* ══════════════════════════════════════
   TESTIMONIALS — simple slider
══════════════════════════════════════ */
(function initTestimonials() {
  const slides   = document.querySelectorAll('.testimonial-slide');
  const prevBtn  = document.getElementById('testPrev');
  const nextBtn  = document.getElementById('testNext');
  if (!slides.length) return;

  let current = 0;

  function show(index) {
    slides.forEach((s, i) => {
      s.style.display = i === index ? 'grid' : 'none';
      s.style.opacity = i === index ? '1' : '0';
    });
  }

  function next() { current = (current + 1) % slides.length; show(current); }
  function prev() { current = (current - 1 + slides.length) % slides.length; show(current); }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  /* Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  /* Auto-play */
  let autoPlay = setInterval(next, 6000);
  const swiper = document.getElementById('testimonialsSwiper');
  if (swiper) {
    swiper.addEventListener('mouseenter', () => clearInterval(autoPlay));
    swiper.addEventListener('mouseleave', () => { autoPlay = setInterval(next, 6000); });
  }

  /* Touch swipe */
  let touchStartX = 0;
  if (swiper) {
    swiper.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    swiper.addEventListener('touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    });
  }

  show(0);
})();

/* ══════════════════════════════════════
   BMI CALCULATOR
══════════════════════════════════════ */
(function initBMI() {
  const form       = document.getElementById('bmiForm');
  const heightInp  = document.getElementById('bmiHeight');
  const weightInp  = document.getElementById('bmiWeight');
  const resultBox  = document.getElementById('bmiResultBox');
  const resultNum  = document.getElementById('bmiResultNumber');
  const resultCat  = document.getElementById('bmiResultCategory');
  const resultDesc = document.getElementById('bmiResultDesc');
  const gaugeNum   = document.getElementById('bmiGaugeNumber');
  const bmiCta     = document.getElementById('bmiCta');
  const heightErr  = document.getElementById('bmiHeightErr');
  const weightErr  = document.getElementById('bmiWeightErr');

  if (!form) return;

  const segments = [
    document.getElementById('bmi-seg-0'),
    document.getElementById('bmi-seg-1'),
    document.getElementById('bmi-seg-2'),
    document.getElementById('bmi-seg-3'),
  ];

  const activeColors = ['#64B5F6','#81C784','#FFB74D','#E57373'];

  function resetSegments() {
    segments.forEach((seg, i) => {
      if (seg) {
        seg.style.opacity  = '0.35';
        seg.style.filter   = 'none';
      }
    });
  }

  function activateSegment(index) {
    resetSegments();
    if (segments[index]) {
      segments[index].style.opacity = '1';
      segments[index].style.filter  = 'brightness(1.4) drop-shadow(0 0 8px ' + activeColors[index] + ')';
    }
  }

  function getBMICategory(bmi) {
    const lang = localStorage.getItem('lang') || 'es';
    const t = typeof translations !== 'undefined' ? translations[lang] : null;
    if (bmi < 18.5) return { index: 0, cat: t ? t['bmi.underweight'] : 'Underweight',  desc: t ? t['bmi.under_desc'] : '', showCta: false };
    if (bmi < 25)   return { index: 1, cat: t ? t['bmi.normal']      : 'Normal',       desc: t ? t['bmi.normal_desc']: '', showCta: false };
    if (bmi < 30)   return { index: 2, cat: t ? t['bmi.overweight']  : 'Overweight',   desc: t ? t['bmi.over_desc']  : '', showCta: true  };
    return                 { index: 3, cat: t ? t['bmi.obese']       : 'Obesity',      desc: t ? t['bmi.obese_desc'] : '', showCta: true  };
  }

  function animateNumber(el, target, decimals, duration) {
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = (target * p).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(frame);
  }

  function showError(input, errEl, show) {
    if (show) {
      input.classList.add('error');
      errEl.classList.add('show');
    } else {
      input.classList.remove('error');
      errEl.classList.remove('show');
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const cm = parseFloat(heightInp.value);
    const kg = parseFloat(weightInp.value);
    let valid = true;

    if (isNaN(cm) || cm < 100 || cm > 250) { showError(heightInp, heightErr, true); valid = false; }
    else showError(heightInp, heightErr, false);

    if (isNaN(kg) || kg < 30 || kg > 300)  { showError(weightInp, weightErr, true); valid = false; }
    else showError(weightInp, weightErr, false);

    if (!valid) return;

    const bmi       = kg / ((cm / 100) ** 2);
    const bmiRounded= Math.round(bmi * 10) / 10;
    const info      = getBMICategory(bmiRounded);

    /* Animate gauge number */
    if (gaugeNum) animateNumber(gaugeNum, bmiRounded, 1, 1200);

    /* Activate segment */
    setTimeout(() => activateSegment(info.index), 400);

    /* Show result box */
    if (resultBox) {
      resultBox.classList.add('show');
      animateNumber(resultNum, bmiRounded, 1, 1200);
      setTimeout(() => {
        resultCat.textContent  = info.cat;
        resultDesc.textContent = info.desc;
        if (bmiCta) bmiCta.style.display = info.showCta ? 'inline-flex' : 'none';
      }, 1300);
    }
  });

  /* Clear errors on input */
  heightInp.addEventListener('input', () => showError(heightInp, heightErr, false));
  weightInp.addEventListener('input', () => showError(weightInp, weightErr, false));

  resetSegments();
})();

/* ══════════════════════════════════════
   STATS COUNTER — number animation
══════════════════════════════════════ */
(function initStats() {
  const stats = [
    { id: 'stat-patients',     target: 500,  decimals: 0, suffix: '' },
    { id: 'stat-satisfaction', target: 97,   decimals: 0, suffix: '' },
    { id: 'stat-weight',       target: 12,   decimals: 0, suffix: '' },
    { id: 'stat-cont',         target: 94,   decimals: 0, suffix: '' },
  ];

  let animated = false;

  function animateStat(id, target, decimals, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const val = target * easeOut(p);
      el.textContent = val.toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(frame);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function triggerStats() {
    if (animated) return;
    const section = document.getElementById('stat-patients');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animated = true;
      stats.forEach(s => animateStat(s.id, s.target, s.decimals, 2000));
    }
  }

  window.addEventListener('scroll', triggerStats, { passive: true });
  triggerStats();
})();

/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      /* Close all */
      items.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      /* Open clicked (toggle) */
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ══════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
══════════════════════════════════════ */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════
   COOKIE BANNER — RGPD/AEPD
══════════════════════════════════════ */
(function initCookies() {
  const banner     = document.getElementById('cookieBanner');
  const toggleBtn  = document.getElementById('cookieToggle');
  const acceptAll  = document.getElementById('cookieAcceptAll');
  const reject     = document.getElementById('cookieReject');
  const customize  = document.getElementById('cookieCustomize');
  const acceptSel  = document.getElementById('cookieAcceptSel');
  const options    = document.getElementById('cookieOptions');

  if (!banner) return;

  /* Show banner if no consent stored */
  if (!localStorage.getItem('cookieConsent')) {
    banner.style.display = 'block';
  } else {
    if (toggleBtn) toggleBtn.classList.add('show');
  }

  function hideBanner() {
    banner.style.display = 'none';
    if (toggleBtn) toggleBtn.classList.add('show');
  }

  function setConsent(analytics, marketing, personal) {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics,
      marketing,
      personal,
      timestamp: new Date().toISOString()
    }));
    hideBanner();
  }

  if (acceptAll)  acceptAll.addEventListener('click', () => setConsent(true, true, true));
  if (reject)     reject.addEventListener('click',    () => setConsent(false, false, false));

  if (customize && options) {
    customize.addEventListener('click', () => options.classList.toggle('show'));
  }

  if (acceptSel) {
    acceptSel.addEventListener('click', () => {
      const analytics = document.getElementById('ck-analytics')?.checked ?? false;
      const marketing = document.getElementById('ck-marketing')?.checked ?? false;
      const personal  = document.getElementById('ck-personal')?.checked  ?? false;
      setConsent(analytics, marketing, personal);
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      banner.style.display = 'block';
      toggleBtn.classList.remove('show');
    });
  }
})();

/* ══════════════════════════════════════
   ACTIVE NAV LINK — highlight current page
══════════════════════════════════════ */
(function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .footer-link').forEach(link => {
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
})();

/* ══════════════════════════════════════
   TREATMENT CARDS — hover micro-animation
══════════════════════════════════════ */
document.querySelectorAll('.treatment-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
  });
});
