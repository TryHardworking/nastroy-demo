/* НАСТРОЙ — демо-сайт: анимации появления, шапка, задержки стэггера */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: тень при скролле ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Стэггер: --d для детей [data-stagger] ---------- */
  var groups = document.querySelectorAll("[data-stagger]");
  groups.forEach(function (group) {
    var children = group.querySelectorAll("[data-reveal]");
    children.forEach(function (child, i) {
      if (!child.style.getPropertyValue("--d")) {
        child.style.setProperty("--d", (i * 0.08).toFixed(2) + "s");
      }
    });
  });

  /* ---------- Reveal: появление при скролле ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("revealed"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  revealEls.forEach(function (el) { observer.observe(el); });
})();
