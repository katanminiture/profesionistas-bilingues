// Replace with your GA4 Measurement ID before launch
window.PB_GA_ID = window.PB_GA_ID || 'G-XXXXXXXXXX';

window.PB_ANALYTICS = (function () {
  function init(force) {
    if (!force && window.PB_CONSENT && window.PB_CONSENT.get() !== 'accepted') return;
    if (!window.PB_GA_ID || window.PB_GA_ID === 'G-XXXXXXXXXX') return;
    if (window.gtag) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.PB_GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', window.PB_GA_ID, { send_page_view: false });
  }

  function track(event, params) {
    if (window.gtag) window.gtag('event', event, params || {});
    if (window.PB_GA_ID === 'G-XXXXXXXXXX') {
      console.debug('[analytics]', event, params || {});
    }
  }

  function pageView(lang, view) {
    track('page_view', { page_language: lang, page_path: view, page_title: document.title });
  }

  function diagnosticClick(source) {
    track('diagnostic_click', { source: source || 'unknown' });
  }

  function programView(programId, source) {
    track('program_view', { program_id: programId, source: source || 'unknown' });
  }

  function checkoutStart(programId) {
    track('begin_checkout', { program_id: programId });
  }

  function quizComplete(recommendedProgram) {
    track('quiz_complete', { recommended_program: recommendedProgram });
  }

  function audienceSelect(audience) {
    track('audience_select', { audience: audience });
  }

  return { init, pageView, diagnosticClick, programView, checkoutStart, quizComplete, audienceSelect };
})();

// Analytics loads only after cookie consent — see consent.js
