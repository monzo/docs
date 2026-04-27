(function() {
  'use strict';

  var COOKIE_NAME = '_cookies_banner_dismissed';
  var MAX_AGE = 365 * 24 * 60 * 60;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? match[1] : null;
  }

  function setCookie(name, value) {
    document.cookie = name + '=' + value + '; path=/; max-age=' + MAX_AGE + '; SameSite=Lax; Secure';
  }

  function dismiss() {
    setCookie(COOKIE_NAME, 'true');
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.parentNode.removeChild(banner);
  }

  function init() {
    if (getCookie(COOKIE_NAME)) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'banner');
    banner.innerHTML =
      '<div class="cookie-banner__content">' +
        '<p class="cookie-banner__text">' +
          '<strong>This site uses cookies</strong> ' +
          'These are required for our website to work and keep you safe and secure. ' +
          'You can learn more about <a href="https://monzo.com/legal/cookie-policy/" target="_blank" rel="noopener noreferrer">our cookie policy</a>.' +
        '</p>' +
        '<button class="cookie-banner__dismiss" type="button">Got it</button>' +
      '</div>';

    document.body.appendChild(banner);
    banner.querySelector('.cookie-banner__dismiss').addEventListener('click', dismiss);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
