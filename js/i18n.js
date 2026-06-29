/* ============================================================
   i18n.js — Sistema de traducciones ES / EN
   Uso: data-i18n="clave" en cualquier elemento HTML
   ============================================================ */

const translations = {
  es: {
    /* ── NAVBAR ── */
    "nav.about":        "Sobre Nosotros",
    "nav.treatments":   "Tratamientos",
    "nav.how":          "Cómo Funciona",
    "nav.blog":         "Blog",
    "nav.testimonials": "Testimonios",
    "nav.login":        "Acceso Pacientes",
    "nav.cta":          "Iniciar Evaluación",
    "nav.our_treatments": "Nuestros Tratamientos",
    "nav.our_programs":   "Nuestros Programas",
    "nav.mounjaro_desc":  "Control efectivo del peso.",
    "nav.wegovy_desc":    "Te ayuda a sentirte saciado.",
    "nav.ozempic_desc":   "Mejora el control glucémico.",
    "nav.saxenda_desc":   "Controla el apetito.",
    "nav.how_works":      "Cómo funciona",
    "nav.how_works_desc": "Paso a paso hacia tu objetivo",
    "nav.pricing":        "Precios",
    "nav.pricing_desc":   "Encuentra tu plan perfecto",
    "nav.proven_results": "Resultados Probados",
    "nav.expert_guide":   "Orientación médica experta",

    /* ── BANNER ── */
    "banner.text": "Consulta médica online con prescripción — Tu salud, nuestra prioridad",
    "banner.cta":  "¿Soy elegible?",

    /* ── HERO ── */
    "hero.tag":      "Regulado por AEMPS",
    "hero.title":    "Pérdida de Peso Guiada Médicamente con Medicación y Seguimiento",
    "hero.subtitle": "Guiados por expertos que se preocupan, respaldados por la ciencia que te mantiene en camino.",
    "hero.cta":      "¿Soy elegible?",
    "hero.trust1":   "pacientes atendidos",
    "hero.trust1b":  "Más de 500",
    "hero.trust2":   "Soporte médico continuo",
    "hero.trust3":   "Respaldado clínicamente",
    "hero.trust4":   "Programa basado en la ciencia",

    /* ── PARTNERS ── */
    "partners.title": "Confiado por miles de pacientes en España",

    /* ── TREATMENTS ── */
    "treatments.tag":      "Tratamientos",
    "treatments.title":    "Medicamentos GLP-1 Aprobados",
    "treatments.subtitle": "Todos nuestros tratamientos están aprobados por la AEMPS y son prescritos por médicos colegiados españoles tras una evaluación médica completa.",
    "treatments.cta":      "Ver todos los Tratamientos",
    "treatments.mounjaro_title": "Mounjaro",
    "treatments.mounjaro_desc":  "Control efectivo del peso corporal mediante agonismo dual GIP/GLP-1.",
    "treatments.wegovy_title":   "Wegovy",
    "treatments.wegovy_desc":    "Te ayuda a sentirte saciado por más tiempo. Tratamiento semanal de semaglutida.",
    "treatments.ozempic_title":  "Ozempic",
    "treatments.ozempic_desc":   "Mejora el control glucémico y favorece la pérdida de peso.",
    "treatments.saxenda_title":  "Saxenda",
    "treatments.saxenda_desc":   "Controla el hambre y reduce la ingesta calórica de forma sostenida.",
    "treatments.explore":        "Ver tratamiento",
    "treatments.badge":          "Con receta médica",

    /* ── HOW IT WORKS ── */
    "how.tag":   "Proceso",
    "how.title": "¿Cómo Funciona?",
    "how.subtitle": "Un proceso claro, seguro y completamente guiado por médicos.",
    "how.step1_title": "Completa tu evaluación",
    "how.step1_desc":  "Rellena nuestro cuestionario médico online en menos de 10 minutos. Incluye tu historial de salud, medicación actual y objetivos.",
    "how.step2_title": "Revisión médica",
    "how.step2_desc":  "Un médico colegiado español revisa tu evaluación de forma personalizada y determina qué tratamiento es más adecuado para ti.",
    "how.step3_title": "Recibe tu tratamiento",
    "how.step3_desc":  "Con tu receta médica, recoge tu medicación en la farmacia colaboradora más cercana o en tu farmacia habitual.",
    "how.step4_title": "Seguimiento continuo",
    "how.step4_desc":  "Consultas de seguimiento periódicas con tu médico para ajustar el tratamiento y maximizar tus resultados.",
    "how.step_label":  "Paso",

    /* ── STATS / PROOF ── */
    "proof.tag":    "Resultados",
    "proof.title":  "Resultados Reales de Pacientes Reales",
    "proof.stat1":  "Pacientes atendidos",
    "proof.stat2":  "Satisfacción media",
    "proof.stat3":  "Peso medio perdido en 6 meses",
    "proof.stat4":  "Tasa de continuidad del tratamiento",
    "proof.cta":    "Ver Testimonios",

    /* ── TESTIMONIALS ── */
    "test.tag":   "Testimonios",
    "test.title": "Lo Que Dicen Nuestros Pacientes",
    "test.verified": "Paciente verificado",

    /* ── BMI ── */
    "bmi.tag":        "Calculadora",
    "bmi.title":      "Calcula tu IMC",
    "bmi.subtitle":   "Descubre si eres candidato para nuestros tratamientos.",
    "bmi.height":     "Altura (cm)",
    "bmi.weight":     "Peso (kg)",
    "bmi.calculate":  "Calcular IMC",
    "bmi.result":     "Tu IMC es",
    "bmi.underweight":"Peso insuficiente",
    "bmi.normal":     "Peso normal",
    "bmi.overweight": "Sobrepeso",
    "bmi.obese":      "Obesidad",
    "bmi.under_desc": "Tu IMC indica un peso por debajo del rango saludable. Te recomendamos consultar con un médico.",
    "bmi.normal_desc":"¡Enhorabuena! Tu peso se encuentra en el rango saludable. Mantén tus hábitos.",
    "bmi.over_desc":  "Con IMC ≥ 27 y al menos una comorbilidad, podrías ser candidato a tratamiento. Inicia tu evaluación.",
    "bmi.obese_desc": "Con IMC ≥ 30 eres candidato a nuestros tratamientos GLP-1. Inicia tu evaluación médica hoy.",
    "bmi.cta":        "Iniciar Evaluación",
    "bmi.error_height":"Por favor, introduce una altura válida (100–250 cm)",
    "bmi.error_weight":"Por favor, introduce un peso válido (30–300 kg)",

    /* ── FAQ ── */
    "faq.tag":   "Preguntas frecuentes",
    "faq.title": "Tus Dudas, Resueltas",
    "faq.q1":  "¿Necesito receta para obtener el medicamento?",
    "faq.a1":  "Sí. Todos los medicamentos GLP-1 (Mounjaro, Wegovy, Ozempic, Saxenda) son de prescripción obligatoria en España. Nuestro médico colegiado emite la receta tras revisar tu historial médico y evaluación.",
    "faq.q2":  "¿Cómo recibo la medicación?",
    "faq.a2":  "La receta se emite de forma electrónica. Puedes recoger el medicamento en cualquier farmacia española autorizada. No enviamos medicamentos a domicilio.",
    "faq.q3":  "¿Quién es el médico que me va a atender?",
    "faq.a3":  "Contamos con un médico colegiado español especializado en medicina de la obesidad. Todos los datos del médico están disponibles en el aviso legal del sitio.",
    "faq.q4":  "¿Cuáles son los criterios para ser elegible?",
    "faq.a4":  "Según la normativa AEMPS, son elegibles adultos con IMC ≥ 30 kg/m² (obesidad) o IMC ≥ 27 kg/m² (sobrepeso) con al menos una comorbilidad asociada como hipertensión, prediabetes o dislipidemia.",
    "faq.q5":  "¿Cuánto cuesta el tratamiento?",
    "faq.a5":  "La consulta médica online tiene un precio fijo. El coste del medicamento varía según el fármaco y la dosis, y se abona directamente en la farmacia. Consulta nuestra página de precios para más detalles.",
    "faq.q6":  "¿Con qué frecuencia tendré consultas de seguimiento?",
    "faq.a6":  "Las consultas de seguimiento se realizan mensualmente durante los primeros 3 meses y cada 2 meses a partir de entonces. El médico ajustará la dosis según tu evolución.",
    "faq.q7":  "¿Es seguro comprar medicamentos online?",
    "faq.a7":  "En España, la venta online de medicamentos con receta está prohibida. Nosotros gestionamos la consulta médica y la prescripción; tú compras el medicamento en tu farmacia local con la receta emitida.",
    "faq.q8":  "¿Puedo compatibilizar el tratamiento con otros medicamentos?",
    "faq.a8":  "El médico revisará tu medicación actual en la evaluación inicial. Algunos medicamentos pueden ser incompatibles, por lo que la valoración personalizada es imprescindible.",

    /* ── FOOTER ── */
    "footer.programme":   "Programa",
    "footer.how_works":   "Cómo funciona",
    "footer.treatments":  "Tratamientos",
    "footer.pricing":     "Precios",
    "footer.company":     "Empresa",
    "footer.about":       "Sobre Nosotros",
    "footer.blog":        "Blog",
    "footer.testimonials":"Testimonios",
    "footer.contact":     "Contacto",
    "footer.legal":       "Legal",
    "footer.terms":       "Aviso Legal",
    "footer.privacy":     "Política de Privacidad",
    "footer.cookies":     "Política de Cookies",
    "footer.conditions":  "Condiciones del Servicio",
    "footer.regulation":  "Información Regulatoria",
    "footer.medical":     "Médico Responsable",
    "footer.jurisdiction":"Ámbito de servicio: Bajar Peso actualmente presta servicios únicamente a pacientes ubicados en España. No ofrecemos consultas ni servicios de prescripción fuera del territorio español.",
    "footer.copyright":   "© 2026 · Bajar Peso · Todos los derechos reservados",

    /* ── COOKIES ── */
    "cookie.title":     "Hablemos de las cookies",
    "cookie.text":      "Usamos cookies para mejorar tu experiencia, personalizar contenido y analizar el tráfico. Al hacer clic en \"Aceptar Todo\" consientes el uso de cookies. Puedes gestionar tus preferencias en \"Personalizar\". Consulta nuestra Política de Cookies para más detalles.",
    "cookie.accept_all":"Aceptar Todo",
    "cookie.reject":    "Rechazar todo",
    "cookie.customize": "Personalizar",
    "cookie.accept_sel":"Guardar selección",
    "cookie.necessary": "Funcionalidad",
    "cookie.analytics": "Analíticas",
    "cookie.marketing": "Publicidad",
    "cookie.personal":  "Personalización",
  },

  en: {
    /* ── NAVBAR ── */
    "nav.about":        "About",
    "nav.treatments":   "Treatments",
    "nav.how":          "How it Works",
    "nav.blog":         "Blog",
    "nav.testimonials": "Testimonials",
    "nav.login":        "Patient Login",
    "nav.cta":          "Start Assessment",
    "nav.our_treatments": "Our Treatments",
    "nav.our_programs":   "Our Programmes",
    "nav.mounjaro_desc":  "Effective weight management.",
    "nav.wegovy_desc":    "Helping you feel fuller for longer.",
    "nav.ozempic_desc":   "Supports improved glucose control.",
    "nav.saxenda_desc":   "Helps control hunger.",
    "nav.how_works":      "How it works",
    "nav.how_works_desc": "Step by step toward health",
    "nav.pricing":        "Pricing",
    "nav.pricing_desc":   "Find your perfect plan",
    "nav.proven_results": "Proven Results",
    "nav.expert_guide":   "Expert medical guidance",

    /* ── BANNER ── */
    "banner.text": "Online medical consultation with prescription — Your health, our priority",
    "banner.cta":  "Am I eligible?",

    /* ── HERO ── */
    "hero.tag":      "AEMPS Regulated",
    "hero.title":    "Clinically Guided Weight Loss through Medication and Coaching",
    "hero.subtitle": "Guided by experts who care, supported by science that keeps you on track.",
    "hero.cta":      "Am I eligible?",
    "hero.trust1":   "patients treated",
    "hero.trust1b":  "Over 500",
    "hero.trust2":   "Continuous medical support",
    "hero.trust3":   "Clinically supported",
    "hero.trust4":   "Science-backed programme",

    /* ── PARTNERS ── */
    "partners.title": "Trusted by thousands of patients across Spain",

    /* ── TREATMENTS ── */
    "treatments.tag":      "Treatments",
    "treatments.title":    "AEMPS-Approved GLP-1 Medications",
    "treatments.subtitle": "All our treatments are approved by AEMPS and prescribed by registered Spanish doctors after a full medical assessment.",
    "treatments.cta":      "Explore all Treatments",
    "treatments.mounjaro_title": "Mounjaro",
    "treatments.mounjaro_desc":  "Effective weight management through dual GIP/GLP-1 agonism.",
    "treatments.wegovy_title":   "Wegovy",
    "treatments.wegovy_desc":    "Helps you feel fuller for longer. Weekly semaglutide treatment.",
    "treatments.ozempic_title":  "Ozempic",
    "treatments.ozempic_desc":   "Supports improved glucose control and favours weight loss.",
    "treatments.saxenda_title":  "Saxenda",
    "treatments.saxenda_desc":   "Controls hunger and reduces caloric intake in a sustained way.",
    "treatments.explore":        "View treatment",
    "treatments.badge":          "Prescription required",

    /* ── HOW IT WORKS ── */
    "how.tag":   "Process",
    "how.title": "How Does it Work?",
    "how.subtitle": "A clear, safe process, fully guided by doctors.",
    "how.step1_title": "Complete your assessment",
    "how.step1_desc":  "Fill in our online medical questionnaire in less than 10 minutes. Includes your health history, current medication and goals.",
    "how.step2_title": "Medical review",
    "how.step2_desc":  "A registered Spanish doctor personally reviews your assessment and determines which treatment is most suitable for you.",
    "how.step3_title": "Receive your treatment",
    "how.step3_desc":  "With your prescription, collect your medication from the nearest partner pharmacy or your usual pharmacy.",
    "how.step4_title": "Ongoing follow-up",
    "how.step4_desc":  "Regular follow-up consultations with your doctor to adjust the treatment and maximise your results.",
    "how.step_label":  "Step",

    /* ── STATS / PROOF ── */
    "proof.tag":    "Results",
    "proof.title":  "Real Results from Real Patients",
    "proof.stat1":  "Patients treated",
    "proof.stat2":  "Average satisfaction",
    "proof.stat3":  "Average weight lost in 6 months",
    "proof.stat4":  "Treatment continuation rate",
    "proof.cta":    "View Testimonials",

    /* ── TESTIMONIALS ── */
    "test.tag":   "Testimonials",
    "test.title": "What Our Patients Say",
    "test.verified": "Verified patient",

    /* ── BMI ── */
    "bmi.tag":        "Calculator",
    "bmi.title":      "Calculate your BMI",
    "bmi.subtitle":   "Find out if you are a candidate for our treatments.",
    "bmi.height":     "Height (cm)",
    "bmi.weight":     "Weight (kg)",
    "bmi.calculate":  "Calculate BMI",
    "bmi.result":     "Your BMI is",
    "bmi.underweight":"Underweight",
    "bmi.normal":     "Normal weight",
    "bmi.overweight": "Overweight",
    "bmi.obese":      "Obesity",
    "bmi.under_desc": "Your BMI indicates below-healthy weight. We recommend consulting a doctor.",
    "bmi.normal_desc":"Congratulations! Your weight is in the healthy range. Keep up your habits.",
    "bmi.over_desc":  "With BMI ≥ 27 and at least one comorbidity, you may be eligible for treatment. Start your assessment.",
    "bmi.obese_desc": "With BMI ≥ 30 you are a candidate for our GLP-1 treatments. Start your medical assessment today.",
    "bmi.cta":        "Start Assessment",
    "bmi.error_height":"Please enter a valid height (100–250 cm)",
    "bmi.error_weight":"Please enter a valid weight (30–300 kg)",

    /* ── FAQ ── */
    "faq.tag":   "FAQ",
    "faq.title": "Your Questions, Answered",
    "faq.q1":  "Do I need a prescription to get the medication?",
    "faq.a1":  "Yes. All GLP-1 medications (Mounjaro, Wegovy, Ozempic, Saxenda) require a prescription in Spain. Our registered doctor issues the prescription after reviewing your medical history and assessment.",
    "faq.q2":  "How do I receive the medication?",
    "faq.a2":  "The prescription is issued electronically. You can collect the medication from any authorised Spanish pharmacy. We do not ship medications to your home.",
    "faq.q3":  "Who is the doctor that will treat me?",
    "faq.a3":  "We have a registered Spanish doctor specialised in obesity medicine. All doctor details are available in the legal notice of this site.",
    "faq.q4":  "What are the eligibility criteria?",
    "faq.a4":  "According to AEMPS regulations, eligible candidates are adults with BMI ≥ 30 kg/m² (obesity) or BMI ≥ 27 kg/m² (overweight) with at least one associated comorbidity such as hypertension, pre-diabetes or dyslipidaemia.",
    "faq.q5":  "How much does the treatment cost?",
    "faq.a5":  "The online medical consultation has a fixed price. The cost of the medication varies by drug and dose, and is paid directly at the pharmacy. Check our pricing page for details.",
    "faq.q6":  "How often will I have follow-up consultations?",
    "faq.a6":  "Follow-up consultations are held monthly for the first 3 months and every 2 months thereafter. The doctor will adjust the dose based on your progress.",
    "faq.q7":  "Is it safe to buy medication online?",
    "faq.a7":  "In Spain, the online sale of prescription medications is prohibited. We manage the medical consultation and prescription; you buy the medication at your local pharmacy with the issued prescription.",
    "faq.q8":  "Can I combine treatment with other medications?",
    "faq.a8":  "The doctor will review your current medication during the initial assessment. Some medications may be incompatible, so personalised evaluation is essential.",

    /* ── FOOTER ── */
    "footer.programme":   "Programme",
    "footer.how_works":   "How it works",
    "footer.treatments":  "Treatments",
    "footer.pricing":     "Pricing",
    "footer.company":     "Company",
    "footer.about":       "About Us",
    "footer.blog":        "Blog",
    "footer.testimonials":"Testimonials",
    "footer.contact":     "Contact",
    "footer.legal":       "Legal",
    "footer.terms":       "Legal Notice",
    "footer.privacy":     "Privacy Policy",
    "footer.cookies":     "Cookie Policy",
    "footer.conditions":  "Terms of Service",
    "footer.regulation":  "Regulatory Information",
    "footer.medical":     "Responsible Physician",
    "footer.jurisdiction":"Service Jurisdiction: Bajar Peso currently provides services only to patients located in Spain. We do not offer consultations or prescription services outside Spanish territory.",
    "footer.copyright":   "© 2026 · Bajar Peso · All rights reserved",

    /* ── COOKIES ── */
    "cookie.title":     "Let's talk about cookies",
    "cookie.text":      "We use cookies to enhance your browsing experience, serve personalised content, and analyse traffic. By clicking \"Accept All\" you consent to our use of cookies. You can manage your preferences in \"Customise\". See our Cookie Policy for more details.",
    "cookie.accept_all":"Accept All",
    "cookie.reject":    "Reject all",
    "cookie.customize": "Customise",
    "cookie.accept_sel":"Save selection",
    "cookie.necessary": "Functionality",
    "cookie.analytics": "Analytics",
    "cookie.marketing": "Advertising",
    "cookie.personal":  "Personalisation",
  }
};

/* ── Engine ── */
let currentLang = localStorage.getItem('lang') || 'es';

function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  /* Update lang switcher buttons */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initI18n() {
  applyTranslations(currentLang);

  // Utilizar delegación de eventos para botones dinámicos inyectados por components.js
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-btn');
    if (btn && btn.dataset.lang) {
      applyTranslations(btn.dataset.lang);
    }
  });
}

document.addEventListener('DOMContentLoaded', initI18n);
