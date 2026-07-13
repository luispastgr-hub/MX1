(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var navToggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile nav open/close */
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* Sticky header: shrink border on scroll, hide on scroll-down, reveal on scroll-up */
  if (header) {
    var lastY = window.scrollY;
    var ticking = false;

    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);

      if (mobileNav && mobileNav.classList.contains('is-open')) {
        ticking = false;
        return;
      }

      if (y > lastY && y > 120) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var groupCounts = new Map();
      revealEls.forEach(function (el) {
        var group = el.closest('[data-reveal-group]');
        if (group) {
          var count = groupCounts.get(group) || 0;
          el.style.setProperty('--i', count);
          groupCounts.set(group, count + 1);
        }
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* Current year in footer, if present */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Desktop "Servicios" dropdown — hover works via CSS alone; this adds
     click/keyboard support and outside-click / Escape to close. */
  var dropdownItem = document.querySelector('[data-dropdown]');
  var dropdownToggle = document.querySelector('[data-dropdown-toggle]');

  function closeDropdown() {
    if (!dropdownItem) return;
    dropdownItem.classList.remove('is-open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  if (dropdownItem && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = dropdownItem.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) closeDropdown();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  /* Mobile "Servicios" accordion */
  var accordion = document.querySelector('[data-accordion]');
  var accordionTrigger = document.querySelector('[data-accordion-trigger]');

  if (accordion && accordionTrigger) {
    accordionTrigger.addEventListener('click', function () {
      var isOpen = accordion.classList.toggle('is-open');
      accordionTrigger.setAttribute('aria-expanded', String(isOpen));
    });
  }
})();
