(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ---- Header: sticky, shrinks border on scroll, hides on scroll-down ---- */
  function initHeader() {
    var header = $("[data-header]");
    var mobileNav = $("[data-mobile-nav]");
    if (!header) return;
    var lastY = window.scrollY;
    var ticking = false;

    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);

      if (mobileNav && mobileNav.classList.contains("is-open")) {
        ticking = false;
        return;
      }
      if (y > lastY && y > 120) header.classList.add("is-hidden");
      else header.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Mobile nav open/close ---- */
  function initMobileNav() {
    var navToggle = $("[data-nav-toggle]");
    var mobileNav = $("[data-mobile-nav]");
    if (!navToggle || !mobileNav) return;

    function closeNav() {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    $$("a", mobileNav).forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---- Desktop "Servicios" dropdown — hover works via CSS alone; this adds
     click/keyboard support and outside-click / Escape to close. ---- */
  function initDropdown() {
    var dropdownItem = $("[data-dropdown]");
    var dropdownToggle = $("[data-dropdown-toggle]");
    if (!dropdownItem || !dropdownToggle) return;

    function closeDropdown() {
      dropdownItem.classList.remove("is-open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }

    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      var isOpen = dropdownItem.classList.toggle("is-open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (e) {
      if (!dropdownItem.contains(e.target)) closeDropdown();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDropdown();
    });
  }

  /* ---- Mobile "Servicios" accordion ---- */
  function initMobileAccordion() {
    var accordion = $("[data-accordion]");
    var accordionTrigger = $("[data-accordion-trigger]");
    if (!accordion || !accordionTrigger) return;

    accordionTrigger.addEventListener("click", function () {
      var isOpen = accordion.classList.toggle("is-open");
      accordionTrigger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---- FAQ accordion — each item toggles independently ---- */
  function initFaqAccordion() {
    $$("[data-faq]").forEach(function (item) {
      var trigger = $(".faq-item__trigger", item);
      if (!trigger || trigger.dataset.faqBound) return;
      trigger.dataset.faqBound = "1"; // idempotent
      trigger.addEventListener("click", function () {
        var isOpen = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  /* ---- Scroll reveal — threshold kept very low (large sections would
     never reach a high threshold) + 6s safety net in case the observer
     misses anything, per the skill's gotcha A.8. ---- */
  function initReveals() {
    var revealEls = $$("[data-reveal]");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var groupCounts = new Map();
    revealEls.forEach(function (el) {
      var group = el.closest("[data-reveal-group]");
      if (group) {
        var count = groupCounts.get(group) || 0;
        el.style.setProperty("--i", count);
        groupCounts.set(group, count + 1);
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Safety net: reveal anything still hidden above the fold after 6s
    setTimeout(function () {
      $$("[data-reveal]:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---- Magnetic WhatsApp CTAs (Archetype 04 signature, subtle strength).
     Never on form submit buttons; these are all plain links. ---- */
  function initMagnetic() {
    if (!fineHover || reduced) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.dataset.magneticStrength || "0.25");
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

      function loop() {
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        el.style.transform = "translate3d(" + cx.toFixed(2) + "px, " + cy.toFixed(2) + "px, 0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }

      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        tx = (e.clientX - r.left - r.width / 2) * strength;
        ty = (e.clientY - r.top - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
    });
  }

  /* ---- Current year in footer, if present ---- */
  function initYear() {
    var yearEl = $("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function boot() {
    safe(initHeader, "initHeader");
    safe(initMobileNav, "initMobileNav");
    safe(initDropdown, "initDropdown");
    safe(initMobileAccordion, "initMobileAccordion");
    safe(initFaqAccordion, "initFaqAccordion");
    safe(initReveals, "initReveals");
    safe(initMagnetic, "initMagnetic");
    safe(initYear, "initYear");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) { /* noop */ }
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
