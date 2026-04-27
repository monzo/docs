(function () {
  "use strict";

  var COOKIE_NAME = "_cookies_banner_dismissed";
  var MAX_AGE = 365 * 24 * 60 * 60;

  function getCookie(name) {
    var match = document.cookie.match(
      new RegExp("(?:^|; )" + name + "=([^;]*)"),
    );
    return match ? match[1] : null;
  }

  function setCookie(name, value) {
    document.cookie =
      name +
      "=" +
      value +
      "; path=/; max-age=" +
      MAX_AGE +
      "; SameSite=Lax; Secure";
  }

  function dismiss(dialog) {
    setCookie(COOKIE_NAME, "true");
    dialog.close();
    dialog.parentNode.removeChild(dialog);
  }

  function init() {
    if (getCookie(COOKIE_NAME)) return;

    var dialog = document.createElement("dialog");
    dialog.className = "cookie-banner";
    dialog.setAttribute("aria-label", "Cookie notice");
    dialog.innerHTML =
      '<div class="cookie-banner__content">' +
      '<h2 class="cookie-banner__title">This site uses cookies</h2>' +
      '<p class="cookie-banner__text">' +
      "These cookies are set by Cloudflare and are required for our website to work and keep you safe and secure." +
      "</p>" +
      '<div class="cookie-banner__actions">' +
      '<button class="cookie-banner__button" type="button">Got it</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.addEventListener("cancel", function (e) {
      e.preventDefault();
    });

    dialog
      .querySelector(".cookie-banner__button")
      .addEventListener("click", function () {
        dismiss(dialog);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
