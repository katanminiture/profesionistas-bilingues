window.PB_CONSENT = (function () {
  var KEY = 'pb-cookie-consent';

  function get() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function accept() {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) { /* ignore */ }
    if (window.PB_ANALYTICS && window.PB_ANALYTICS.init) window.PB_ANALYTICS.init(true);
    var el = document.getElementById('cookie-consent');
    if (el) el.remove();
  }

  function decline() {
    try { localStorage.setItem(KEY, 'declined'); } catch (e) { /* ignore */ }
    var el = document.getElementById('cookie-consent');
    if (el) el.remove();
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
    bar.innerHTML =
      '<p>' + labels.message + '</p>' +
      '<div class="cookie-consent__actions">' +
      '<button type="button" class="cookie-consent__accept">' + labels.accept + '</button>' +
      '<button type="button" class="cookie-consent__decline">' + labels.decline + '</button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.cookie-consent__accept').addEventListener('click', accept);
    bar.querySelector('.cookie-consent__decline').addEventListener('click', decline);
  }

  return { mount, accept, decline, get };
})();
