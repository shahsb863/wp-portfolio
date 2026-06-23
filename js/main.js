/* =============================================
   Portfolio — Alex Morgan
   Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== Mobile Nav Toggle ===== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  /* ===== Animated Counter ===== */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '+';
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    function tick() {
      cur += step;
      if (cur >= target) { el.textContent = target + suffix; return; }
      el.textContent = cur + suffix;
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ===== Scroll Reveal + Skill Bars + Counters via IntersectionObserver ===== */
  const reveals = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');

        // Animate skill bars inside this element
        entry.target.querySelectorAll('.bar-fill').forEach(function (fill) {
          fill.style.width = fill.dataset.width + '%';
        });

        // Animate counters inside this element
        entry.target.querySelectorAll('.stat-num[data-count]').forEach(animateCounter);

        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => io.observe(el));

  /* ===== Contact Form (front-end feedback only) ===== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = original;
        btn.disabled  = false;
        contactForm.reset();
      }, 2200);
    });
  }

});
