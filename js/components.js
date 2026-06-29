/* ============================================================
   components.js — Inyección de Navbar / Footer compartidos
   Cada página define: window.BASE_PATH antes de cargar este script
   '' → raíz (index.html)    '../' → pages/*.html
   '../../' → pages/legal/*.html
   ============================================================ */
(function () {
  var BP = (typeof window.BASE_PATH !== 'undefined') ? window.BASE_PATH : '';

  /* ── COOKIE BANNER ── */
  var COOKIE_HTML = [
    '<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Cookie consent">',
    '  <div class="cookie-inner glass-card">',
    '    <div class="cookie-header"><h3 class="cookie-title" data-i18n="cookie.title">Hablemos de las cookies</h3></div>',
    '    <p class="cookie-text" data-i18n="cookie.text">Usamos cookies para mejorar tu experiencia…</p>',
    '    <div class="cookie-btns">',
    '      <button class="btn btn-primary" id="cookieAcceptAll" data-i18n="cookie.accept_all">Aceptar Todo</button>',
    '      <button class="btn btn-outline" id="cookieReject" data-i18n="cookie.reject">Rechazar todo</button>',
    '      <button class="btn btn-outline" id="cookieCustomize" data-i18n="cookie.customize">Personalizar</button>',
    '    </div>',
    '    <div class="cookie-options" id="cookieOptions">',
    '      <div class="cookie-checkboxes">',
    '        <label class="cookie-check-label"><input type="checkbox" id="ck-necessary" checked disabled/><span data-i18n="cookie.necessary">Funcionalidad</span></label>',
    '        <label class="cookie-check-label"><input type="checkbox" id="ck-analytics" checked/><span data-i18n="cookie.analytics">Analíticas</span></label>',
    '        <label class="cookie-check-label"><input type="checkbox" id="ck-marketing" checked/><span data-i18n="cookie.marketing">Publicidad</span></label>',
    '        <label class="cookie-check-label"><input type="checkbox" id="ck-personal"  checked/><span data-i18n="cookie.personal">Personalización</span></label>',
    '      </div>',
    '      <button class="btn btn-primary" id="cookieAcceptSel" data-i18n="cookie.accept_sel">Guardar selección</button>',
    '    </div>',
    '  </div>',
    '</div>',
    '<button class="cookie-toggle-btn" id="cookieToggle" title="Cookies" aria-label="Cookie settings">🍪</button>'
  ].join('\n');

  /* ── NAVBAR ── */
  var NAV_HTML = [
    '<header class="navbar" id="navbar" role="banner">',
    '  <div class="container">',
    '    <nav class="navbar-inner" aria-label="Main navigation">',
    '      <a href="' + BP + 'index.html" class="navbar-logo" aria-label="Bajar Peso">',
    '        <svg class="logo-icon" width="40" height="40" viewBox="0 0 42 42" fill="none" aria-hidden="true" style="color: var(--color-primary); flex-shrink: 0;">',
    '          <path d="M40.0326 14.55C37.2618 11.786 31.1713 12.0833 29.352 15.7964C28.1391 18.2683 29.2213 20.9541 27.3758 23.7337C25.0076 27.306 18.7551 28.0674 15.634 25.0687C12.2934 21.8563 14.8237 18.0754 11.4778 14.6126C6.06699 9.02204 -3.155 15.9841 1.07959 22.8993C4.0438 27.7493 9.74219 23.9006 13.0253 28.7141C14.6303 31.0661 13.8565 33.3659 14.7557 35.8535C16.5907 40.959 24.1973 41.4962 26.8374 36.7505C28.4423 33.8613 26.7955 30.508 29.8068 27.718C32.4051 25.3086 35.6045 26.4664 38.2603 25.1991C42.2178 23.3113 43.1065 17.6112 40.0326 14.5448V14.55Z" fill="currentColor"/>',
    '          <path d="M20.9769 11.2019C24.0779 11.2019 26.5917 8.69429 26.5917 5.60097C26.5917 2.50764 24.0779 0 20.9769 0C17.876 0 15.3622 2.50764 15.3622 5.60097C15.3622 8.69429 17.876 11.2019 20.9769 11.2019Z" fill="currentColor"/>',
    '        </svg>',
    '        <div class="logo-text-stacked" style="display:flex; flex-direction:column; line-height:1.1; margin-left:8px;">',
    '          <span style="font-weight:700; font-size:1.15rem; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.05em;">Bajar</span>',
    '          <span style="font-weight:300; font-size:0.95rem; color:var(--color-white-60); letter-spacing:0.05em;">Peso</span>',
    '        </div>',
    '      </a>',
    '      <div class="nav-links" role="list">',
    '        <a href="' + BP + 'pages/sobre-nosotros.html" class="nav-link" data-i18n="nav.about">Sobre Nosotros</a>',
    '        <div class="nav-dropdown nav-link">',
    '          <div class="nav-dropdown-toggle"><span data-i18n="nav.treatments">Tratamientos</span>',
    '            <svg class="nav-dropdown-arrow" viewBox="0 0 11 6" fill="none"><path d="M0.5 0.5L5 5 9.5 0.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
    '          </div>',
    '          <div class="dropdown-panel">',
    '            <div class="dropdown-heading" data-i18n="nav.our_treatments">Nuestros Tratamientos</div>',
    '            <div class="dropdown-grid">',
    '              <a href="' + BP + 'pages/tratamiento-mounjaro.html" class="dropdown-item"><div class="dropdown-item-icon">💉</div><div class="dropdown-item-text"><div class="dropdown-item-name" data-i18n="treatments.mounjaro_title">Mounjaro</div><div class="dropdown-item-desc" data-i18n="nav.mounjaro_desc">Control efectivo del peso.</div></div><span class="dropdown-arrow-sm">↗</span></a>',
    '              <a href="' + BP + 'pages/tratamiento-wegovy.html"   class="dropdown-item"><div class="dropdown-item-icon">💊</div><div class="dropdown-item-text"><div class="dropdown-item-name" data-i18n="treatments.wegovy_title">Wegovy</div><div class="dropdown-item-desc" data-i18n="nav.wegovy_desc">Te ayuda a sentirte saciado.</div></div><span class="dropdown-arrow-sm">↗</span></a>',
    '              <a href="' + BP + 'pages/tratamiento-ozempic.html"  class="dropdown-item"><div class="dropdown-item-icon">🔬</div><div class="dropdown-item-text"><div class="dropdown-item-name" data-i18n="treatments.ozempic_title">Ozempic</div><div class="dropdown-item-desc" data-i18n="nav.ozempic_desc">Mejora el control glucémico.</div></div><span class="dropdown-arrow-sm">↗</span></a>',
    '              <a href="' + BP + 'pages/tratamiento-saxenda.html"  class="dropdown-item"><div class="dropdown-item-icon">⚕️</div><div class="dropdown-item-text"><div class="dropdown-item-name" data-i18n="treatments.saxenda_title">Saxenda</div><div class="dropdown-item-desc" data-i18n="nav.saxenda_desc">Controla el apetito.</div></div><span class="dropdown-arrow-sm">↗</span></a>',
    '            </div>',
    '          </div>',
    '        </div>',
    '        <div class="nav-dropdown nav-link">',
    '          <div class="nav-dropdown-toggle"><span data-i18n="nav.how">Cómo Funciona</span>',
    '            <svg class="nav-dropdown-arrow" viewBox="0 0 11 6" fill="none"><path d="M0.5 0.5L5 5 9.5 0.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
    '          </div>',
    '          <div class="dropdown-panel" style="min-width:360px">',
    '            <div class="dropdown-heading" data-i18n="nav.our_programs">Nuestros Programas</div>',
    '            <div class="dropdown-grid" style="grid-template-columns:1fr">',
    '              <a href="' + BP + 'pages/como-funciona.html" class="dropdown-item"><div class="dropdown-item-icon">⚙️</div><div class="dropdown-item-text"><div class="dropdown-item-name" data-i18n="nav.how_works">Cómo funciona</div><div class="dropdown-item-desc" data-i18n="nav.how_works_desc">Paso a paso hacia tu objetivo</div></div><span class="dropdown-arrow-sm">↗</span></a>',
    '              <a href="' + BP + 'pages/precios.html"       class="dropdown-item"><div class="dropdown-item-icon">💶</div><div class="dropdown-item-text"><div class="dropdown-item-name" data-i18n="nav.pricing">Precios</div><div class="dropdown-item-desc" data-i18n="nav.pricing_desc">Encuentra tu plan perfecto</div></div><span class="dropdown-arrow-sm">↗</span></a>',
    '            </div>',
    '          </div>',
    '        </div>',
    '        <a href="' + BP + 'pages/blog.html"        class="nav-link" data-i18n="nav.blog">Blog</a>',
    '        <a href="' + BP + 'pages/testimonios.html" class="nav-link" data-i18n="nav.testimonials">Testimonios</a>',
    '      </div>',
    '      <div class="nav-cta">',
    '        <div class="lang-switcher"><button class="lang-btn active" data-lang="es">ES</button><button class="lang-btn" data-lang="en">EN</button></div>',
    '        <a href="' + BP + 'pages/acceso-pacientes.html" class="nav-login"><svg class="nav-login-icon" viewBox="0 0 20 20" fill="none"><path d="M10 10.65c-.06-.01-.14-.01-.2 0C8.43 10.6 7.27 9.4 7.27 7.93 7.27 6.42 8.48 5.2 10 5.2c1.51 0 2.74 1.22 2.74 2.73-.01 1.47-1.17 2.67-2.74 2.72Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.62 16.15c-1.48 1.36-3.45 2.18-5.62 2.18-2.17 0-4.13-.82-5.62-2.18.08-.78.58-1.55 1.47-2.15 2.28-1.52 6.01-1.52 8.27 0 .9.6 1.4 1.37 1.5 2.15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 18.33c4.6 0 8.33-3.73 8.33-8.33S14.6 1.67 10 1.67 1.67 5.4 1.67 10 5.4 18.33 10 18.33Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-i18n="nav.login">Acceso Pacientes</span></a>',
    '        <a href="' + BP + 'pages/evaluacion.html" class="btn btn-primary" data-i18n="nav.cta">Iniciar Evaluación</a>',
    '      </div>',
    '      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>',
    '    </nav>',
    '  </div>',
    '</header>'
  ].join('\n');

  /* ── MOBILE MENU ── */
  var MOB_HTML = [
    '<div class="mobile-menu" id="mobileMenu" aria-hidden="true" role="dialog">',
    '  <nav>',
    '    <a href="' + BP + 'pages/sobre-nosotros.html" class="mobile-nav-link" data-i18n="nav.about">Sobre Nosotros</a>',
    '    <div class="mobile-nav-link" id="mobileDropTreat" style="cursor:pointer"><span data-i18n="nav.treatments">Tratamientos</span><span>›</span></div>',
    '    <div class="mobile-sub-links" id="mobileSubTreat">',
    '      <a href="' + BP + 'pages/tratamiento-mounjaro.html" class="mobile-sub-link">💉 Mounjaro</a>',
    '      <a href="' + BP + 'pages/tratamiento-wegovy.html"   class="mobile-sub-link">💊 Wegovy</a>',
    '      <a href="' + BP + 'pages/tratamiento-ozempic.html"  class="mobile-sub-link">🔬 Ozempic</a>',
    '      <a href="' + BP + 'pages/tratamiento-saxenda.html"  class="mobile-sub-link">⚕️ Saxenda</a>',
    '    </div>',
    '    <div class="mobile-nav-link" id="mobileDropHow" style="cursor:pointer"><span data-i18n="nav.how">Cómo Funciona</span><span>›</span></div>',
    '    <div class="mobile-sub-links" id="mobileSubHow">',
    '      <a href="' + BP + 'pages/como-funciona.html" class="mobile-sub-link">⚙️ <span data-i18n="nav.how_works">Cómo funciona</span></a>',
    '      <a href="' + BP + 'pages/precios.html"       class="mobile-sub-link">💶 <span data-i18n="nav.pricing">Precios</span></a>',
    '    </div>',
    '    <a href="' + BP + 'pages/blog.html"        class="mobile-nav-link" data-i18n="nav.blog">Blog</a>',
    '    <a href="' + BP + 'pages/testimonios.html" class="mobile-nav-link" data-i18n="nav.testimonials">Testimonios</a>',
    '    <div class="mobile-cta-wrapper">',
    '      <div class="lang-switcher" style="width:fit-content"><button class="lang-btn active" data-lang="es">ES</button><button class="lang-btn" data-lang="en">EN</button></div>',
    '      <a href="' + BP + 'pages/evaluacion.html"       class="btn btn-primary"  data-i18n="nav.cta">Iniciar Evaluación</a>',
    '      <a href="' + BP + 'pages/acceso-pacientes.html" class="btn btn-outline"   data-i18n="nav.login">Acceso Pacientes</a>',
    '    </div>',
    '  </nav>',
    '</div>'
  ].join('\n');

  /* ── FOOTER ── */
  var FOOT_HTML = [
    '<footer class="footer" role="contentinfo">',
    '  <div class="container">',
    '    <div class="footer-top">',
    '      <div class="footer-brand">',
    '        <a href="' + BP + 'index.html" class="navbar-logo">',
    '          <svg class="logo-icon" width="32" height="32" viewBox="0 0 42 42" fill="none" aria-hidden="true" style="color: var(--color-primary); flex-shrink: 0;">',
    '            <path d="M40.0326 14.55C37.2618 11.786 31.1713 12.0833 29.352 15.7964C28.1391 18.2683 29.2213 20.9541 27.3758 23.7337C25.0076 27.306 18.7551 28.0674 15.634 25.0687C12.2934 21.8563 14.8237 18.0754 11.4778 14.6126C6.06699 9.02204 -3.155 15.9841 1.07959 22.8993C4.0438 27.7493 9.74219 23.9006 13.0253 28.7141C14.6303 31.0661 13.8565 33.3659 14.7557 35.8535C16.5907 40.959 24.1973 41.4962 26.8374 36.7505C28.4423 33.8613 26.7955 30.508 29.8068 27.718C32.4051 25.3086 35.6045 26.4664 38.2603 25.1991C42.2178 23.3113 43.1065 17.6112 40.0326 14.5448V14.55Z" fill="currentColor"/>',
    '            <path d="M20.9769 11.2019C24.0779 11.2019 26.5917 8.69429 26.5917 5.60097C26.5917 2.50764 24.0779 0 20.9769 0C17.876 0 15.3622 2.50764 15.3622 5.60097C15.3622 8.69429 17.876 11.2019 20.9769 11.2019Z" fill="currentColor"/>',
    '          </svg>',
    '          <div class="logo-text-stacked" style="display:flex; flex-direction:column; line-height:1.1; margin-left:8px;">',
    '            <span style="font-weight:700; font-size:1.05rem; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.05em;">Bajar</span>',
    '            <span style="font-weight:300; font-size:0.85rem; color:var(--color-white-60); letter-spacing:0.05em;">Peso</span>',
    '          </div>',
    '        </a>',
    '        <p class="footer-tagline text-white-60">Clínica médica online especializada en pérdida de peso con tratamientos GLP-1 bajo prescripción médica en España (bajarpeso.es).</p>',
    '        <div class="footer-social"><a href="#" class="social-link" aria-label="Facebook">f</a><a href="#" class="social-link" aria-label="Instagram">ig</a><a href="#" class="social-link" aria-label="LinkedIn">in</a></div>',
    '      </div>',
    '      <div class="footer-col">',
    '        <div class="footer-col-title" data-i18n="footer.programme">Programa</div>',
    '        <div class="footer-links">',
    '          <a href="' + BP + 'pages/como-funciona.html" class="footer-link" data-i18n="footer.how_works">Cómo funciona</a>',
    '          <a href="' + BP + 'pages/tratamientos.html"  class="footer-link" data-i18n="footer.treatments">Tratamientos</a>',
    '          <a href="' + BP + 'pages/precios.html"       class="footer-link" data-i18n="footer.pricing">Precios</a>',
    '          <a href="' + BP + 'pages/testimonios.html"   class="footer-link" data-i18n="footer.testimonials">Testimonios</a>',
    '        </div>',
    '      </div>',
    '      <div class="footer-col">',
    '        <div class="footer-col-title" data-i18n="footer.company">Empresa</div>',
    '        <div class="footer-links">',
    '          <a href="' + BP + 'pages/sobre-nosotros.html" class="footer-link" data-i18n="footer.about">Sobre Nosotros</a>',
    '          <a href="' + BP + 'pages/blog.html"           class="footer-link" data-i18n="footer.blog">Blog</a>',
    '          <a href="' + BP + 'pages/contacto.html"       class="footer-link" data-i18n="footer.contact">Contacto</a>',
    '        </div>',
    '        <div class="footer-col-title mt-6" data-i18n="footer.medical">Médico Responsable</div>',
    '        <div class="footer-links"><p class="footer-link text-white-60" style="cursor:default">Dr. [Nombre Médico]<br/>Médico Colegiado nº 292913499 (Málaga)<br/>Medicina General y Regenerativa</p></div>',
    '      </div>',
    '      <div class="footer-col">',
    '        <div class="footer-col-title" data-i18n="footer.legal">Legal</div>',
    '        <div class="footer-links">',
    '          <a href="' + BP + 'pages/legal/aviso-legal.html" class="footer-link" data-i18n="footer.terms">Aviso Legal</a>',
    '          <a href="' + BP + 'pages/legal/privacidad.html"  class="footer-link" data-i18n="footer.privacy">Política de Privacidad</a>',
    '          <a href="' + BP + 'pages/legal/cookies.html"     class="footer-link" data-i18n="footer.cookies">Política de Cookies</a>',
    '          <a href="' + BP + 'pages/legal/condiciones.html" class="footer-link" data-i18n="footer.conditions">Condiciones del Servicio</a>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <div class="footer-bottom">',
    '      <p class="footer-disclaimer" data-i18n="footer.jurisdiction">Ámbito de servicio: bajarpeso.es actualmente presta servicios únicamente a pacientes ubicados en España.</p>',
    '      <p class="footer-copyright" data-i18n="footer.copyright">© 2026 · Bajar Peso · Todos los derechos reservados</p>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');

  /* ── INJECT ── */
  function inject() {
    var map = {
      'cookie-ph': COOKIE_HTML,
      'nav-ph':    NAV_HTML,
      'mob-ph':    MOB_HTML,
      'footer-ph': FOOT_HTML
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.insertAdjacentHTML('afterend', map[id]);
        el.parentNode.removeChild(el);
      }
    });
    /* Highlight active link */
    var path = window.location.pathname;
    document.querySelectorAll('.nav-link[href], .footer-link[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href !== '#' && path.endsWith(href.replace(/^.*\//, ''))) {
        link.classList.add('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
