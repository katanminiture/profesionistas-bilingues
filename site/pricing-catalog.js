// Canonical pricing — single source of truth. Paste live Stripe Payment Links before launch.
window.PB_PRICING = {
  currency: 'USD',
  nextCohort: { en: 'August 2026 (planned)', es: 'agosto 2026 (planificado)' },
  corporateTitle: { en: 'Corporate cohort pricing', es: 'Precios corporativos por cohorte' },
  corporateNote: {
    en: 'For employers, the price is by cohort rather than by individual.',
    es: 'Para empleadores, el precio es por cohorte, no por participante individual.',
  },
  tableHeaders: {
    participants: { en: 'Participants', es: 'Participantes' },
    investment: { en: 'Investment', es: 'Inversión' },
  },
  products: {
    '8-week': {
      purchasable: true,
      amount: 1297,
      display: '$1,297',
      period: { en: 'per participant', es: 'por participante' },
      stripePaymentLink: '', // e.g. https://buy.stripe.com/xxxxxxxx
      name: { en: '8-Week Virtual Program', es: 'Programa virtual de 8 semanas' },
      summary: {
        en: '8-week virtual cohort — full program with live coaching and Bilingual Professional Certification included.',
        es: 'Cohorte virtual de 8 semanas — programa completo con coaching en vivo y certificación incluida.',
      },
    },
    '12-week': {
      purchasable: true,
      amount: 1897,
      display: '$1,897',
      period: { en: 'per participant', es: 'por participante' },
      stripePaymentLink: '', // e.g. https://buy.stripe.com/xxxxxxxx
      name: { en: '12-Week Virtual Program', es: 'Programa virtual de 12 semanas' },
      summary: {
        en: '12-week virtual cohort — extended coaching with live sessions and Bilingual Professional Certification included.',
        es: 'Cohorte virtual de 12 semanas — coaching extendido con sesiones en vivo y certificación incluida.',
      },
    },
    'in-person': {
      purchasable: false,
      amount: 7500,
      display: { en: 'Starting at $7,500', es: 'Desde $7,500' },
      period: { en: '', es: '' },
      name: { en: 'Personalized Program', es: 'Programa personalizado' },
      summary: {
        en: 'Fully customized curriculum, schedule, and delivery — in-person or flexible. Starting at $7,500.',
        es: 'Currículo, horario y modalidad a tu medida — presencial o flexible. Desde $7,500.',
      },
    },
    'cert-only': {
      purchasable: true,
      amount: 400,
      display: '$400',
      period: { en: 'certification without program', es: 'certificación sin programa' },
      stripePaymentLink: '', // e.g. https://buy.stripe.com/xxxxxxxx
      name: { en: 'Certification without program', es: 'Certificación sin programa' },
      summary: {
        en: 'Bilingual Professional Certification without the full program.',
        es: 'Certificación de Profesionista Bilingüe sin el programa completo.',
      },
    },
  },
  corporateTable: [
    {
      id: 'corp-10',
      participants: { en: 'Up to 10', es: 'Hasta 10' },
      price: { en: 'Starting at $7,500', es: 'Desde $7,500' },
      purchasable: false,
    },
    {
      id: 'corp-20',
      participants: { en: '11–20', es: '11–20' },
      price: { en: '$10,500–$14,000', es: '$10,500–$14,000' },
      purchasable: false,
    },
  ],
};

window.PB_PRICING_HELPERS = (function () {
  function product(id) {
    return window.PB_PRICING.products[id] || null;
  }

  function isPurchasable(id) {
    const p = product(id);
    return !!(p && p.purchasable);
  }

  function canBuyNow(id) {
    return isPurchasable(id) && hasStripeLink(id);
  }

  function displayPrice(id, lang) {
    const p = product(id);
    if (!p) return '';
    if (typeof p.display === 'string') return p.display;
    return (p.display && p.display[lang]) || p.display.en || '';
  }

  function getStripeLink(id) {
    const fromProduct = product(id) && product(id).stripePaymentLink;
    const fromConfig = window.PB_CONFIG && window.PB_CONFIG.stripePaymentLinks && window.PB_CONFIG.stripePaymentLinks[id];
    const link = (fromConfig || fromProduct || '').trim();
    return /^https:\/\/(buy|checkout)\.stripe\.com\//.test(link) ? link : '';
  }

  function hasStripeLink(id) {
    return !!getStripeLink(id);
  }

  function corporateRows(lang) {
    return (window.PB_PRICING.corporateTable || []).map(row => ({
      id: row.id,
      participants: row.participants[lang] || row.participants.en,
      price: row.price[lang] || row.price.en,
    }));
  }

  return { product, isPurchasable, canBuyNow, displayPrice, getStripeLink, hasStripeLink, corporateRows };
})();

(function applyConfigStripeLinks() {
  const links = window.PB_CONFIG && window.PB_CONFIG.stripePaymentLinks;
  if (!links) return;
  Object.keys(links).forEach(id => {
    const url = (links[id] || '').trim();
    if (url && window.PB_PRICING.products[id]) {
      window.PB_PRICING.products[id].stripePaymentLink = url;
    }
  });
})();
