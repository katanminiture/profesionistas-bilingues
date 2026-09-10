window.PB_CONSENT = (function () {
  var KEY = 'pb-cookie-consent';

  function get() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function accept() {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) { /* ignore */ }
    if (window.PB_ANALYTICS && window.PB_ANALYTICS.init) window.PB_ANALYTICS.init(true);
    removeBar();
  }

  function decline() {
    try { localStorage.setItem(KEY, 'declined'); } catch (e) { /* ignore */ }
    removeBar();
  }

  function removeBar() {
    var el = document.getElementById('cookie-consent');
    if (el) el.remove();
    document.documentElement.classList.remove('has-cookie-consent');
  }

  function mount(labels) {
    if (get()) {
      if (get() === 'accepted' && window.PB_ANALYTICS) window.PB_ANALYTICS.init(true);
      return;
    }
    if (document.getElementById('cookie-consent')) return;
    var bar = document.createElement('div');
    bar.id = 'cookie-consent';
    bar.className = 'cookie-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', labels.title || 'Cookie consent');
    bar.innerHTML =
      '<div class="cookie-consent__inner">' +
      '<p>' + labels.message + '</p>' +
      '<div class="cookie-consent__actions">' +
      '<button type="button" class="cookie-consent__accept">' + labels.accept + '</button>' +
      '<button type="button" class="cookie-consent__decline">' + labels.decline + '</button>' +
      '</div></div>';
    document.body.appendChild(bar);
    document.documentElement.classList.add('has-cookie-consent');
    bar.querySelector('.cookie-consent__accept').addEventListener('click', accept);
    bar.querySelector('.cookie-consent__decline').addEventListener('click', decline);
  }

  return { mount, accept, decline, get };
})();
