window.PB_ROUTER = (function () {
  const VIEWS = ['home', 'about', 'programs', 'pricing', 'organizations', 'resources', 'faq', 'diagnostico', 'contact', 'privacy', 'terms', 'checkout', 'buy', 'quiz'];

  const SLUGS = {
    en: { home: '', programs: 'programs', pricing: 'pricing', organizations: 'organizations', about: 'about', resources: 'resources', faq: 'faq', diagnostico: 'diagnostic', contact: 'contact', privacy: 'privacy', terms: 'terms', checkout: 'confirmation', buy: 'buy', quiz: 'quiz' },
    es: { home: '', programs: 'programas', pricing: 'precios', organizations: 'empresas', about: 'nosotros', resources: 'recursos', faq: 'preguntas', diagnostico: 'diagnostico', contact: 'contacto', privacy: 'privacidad', terms: 'terminos', checkout: 'confirmacion', buy: 'comprar', quiz: 'cuestionario' },
  };

  const REVERSE = { en: {}, es: {} };
  Object.keys(SLUGS.en).forEach(view => {
    REVERSE.en[SLUGS.en[view] || ''] = view;
    REVERSE.es[SLUGS.es[view] || ''] = view;
  });
  REVERSE.en[''] = 'home';
  REVERSE.es[''] = 'home';

  function siteBase() {
    const path = window.location.pathname;
    const idx = path.lastIndexOf('/');
    return idx >= 0 ? path.slice(0, idx + 1) : '/';
  }

  function entryPath() {
    const path = window.location.pathname;
    if (/index\.html$/i.test(path)) return path;
    const base = siteBase();
    return base.endsWith('/') ? base + 'index.html' : base + '/index.html';
  }

  function resolveView(lang, token) {
    if (!token) return 'home';
    if (REVERSE[lang] && REVERSE[lang][token]) return REVERSE[lang][token];
    if (VIEWS.includes(token)) return token;
    return 'home';
  }

  function parseHash() {
    const raw = (window.location.hash || '').replace(/^#\/?/, '').split('?')[0];
    if (!raw) return null;

    const parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'es' || parts[0] === 'en') {
      return { lang: parts[0], view: resolveView(parts[0], parts[1] || '') };
    }
    return { lang: localStorage.getItem('pb-lang') || 'es', view: resolveView('en', parts[0]) };
  }

  function parsePathname() {
    const parts = window.location.pathname.replace(/index\.html$/i, '').split('/').filter(Boolean);
    const langPart = parts.find(p => p === 'es' || p === 'en');
    if (!langPart) return null;

    const slugIdx = parts.indexOf(langPart) + 1;
    const slug = parts[slugIdx] || '';
    return { lang: langPart, view: resolveView(langPart, slug) };
  }

  function parse() {
    const fromHash = parseHash();
    if (fromHash) return fromHash;

    const fromPath = parsePathname();
    if (fromPath) return fromPath;

    return {
      lang: localStorage.getItem('pb-lang') || 'es',
      view: 'home',
    };
  }

  /** Canonical production URL (Netlify/Cloudflare with SPA rewrites) */
  function url(lang, view) {
    const slug = SLUGS[lang][view] || '';
    const base = siteBase();
    return `${base}${lang}${slug ? '/' + slug : ''}`;
  }

  /** Hash URL — works with python http.server and file:// previews */
  function hashUrl(lang, view) {
    const slug = SLUGS[lang][view] || '';
    const hash = `#/${lang}${slug ? '/' + slug : ''}`;
    return entryPath() + hash;
  }

  function navigate(lang, view, replace) {
    if (!VIEWS.includes(view)) view = 'home';
    const next = hashUrl(lang, view);
    if (replace) history.replaceState({ lang, view }, '', next);
    else history.pushState({ lang, view }, '', next);
    return { lang, view };
  }

  function updateHreflang(lang, view) {
    const origin = window.location.origin;
    const base = siteBase();
    const canonicalEn = origin + base + 'en' + (SLUGS.en[view] ? '/' + SLUGS.en[view] : '');
    const canonicalEs = origin + base + 'es' + (SLUGS.es[view] ? '/' + SLUGS.es[view] : '');

    [['hreflang-en', canonicalEn], ['hreflang-es', canonicalEs], ['hreflang-default', canonicalEs]].forEach(([id, href]) => {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement('link');
        el.id = id;
        el.rel = 'alternate';
        document.head.appendChild(el);
      }
      el.hreflang = id.replace('hreflang-', '') === 'default' ? 'x-default' : id.replace('hreflang-', '');
      el.href = href;
    });
    document.documentElement.lang = lang;
  }

  return { VIEWS, parse, navigate, url, hashUrl, siteBase, updateHreflang, SLUGS };
})();
