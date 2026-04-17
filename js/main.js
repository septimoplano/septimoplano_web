/* ============================================
   SÉPTIMO PLANO STUDIO — Main JavaScript
   ============================================ */

/* ---------- PAGE LOADER ---------- */
(function () {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <img src="assets/logo.png" alt="Séptimo Plano Studio" class="loader-logo-img" />
    <div class="loader-bar"><div class="loader-bar-fill"></div></div>
  `;
  document.body.prepend(loader);
  setTimeout(() => {
    loader.classList.add('done');
    setTimeout(() => loader.remove(), 600);
  }, 1200);
})();

/* ---------- GSAP + ScrollTrigger ---------- */
gsap.registerPlugin(ScrollTrigger);

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------- MOBILE HAMBURGER ---------- */
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ---------- HERO CANVAS (Particle Field) ---------- */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const COLORS = ['rgba(124,58,237,', 'rgba(147,51,234,', 'rgba(167,139,250,', 'rgba(37,99,235,'];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.1;
    }
    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - d / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  init();
  loop();
})();

/* ---------- GSAP SCROLL ANIMATIONS ---------- */

// Hero parallax
gsap.to('.hero-content', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});
gsap.to('.hero-flare-1', {
  yPercent: 40, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});
gsap.to('.hero-flare-2', {
  yPercent: 20, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// Section labels + headlines
gsap.utils.toArray('.section-label, .section-headline, .section-desc').forEach(el => {
  gsap.from(el, {
    y: 30, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
  });
});

// Services cards
gsap.from('.service-card, .sc-anim', {
  y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out',
  scrollTrigger: { trigger: '.services-grid', start: 'top 85%', toggleActions: 'play none none none' }
});

// Nosotros
gsap.from('.nosotros-text > *', {
  y: 30, duration: 0.7, stagger: 0.12, ease: 'power2.out',
  scrollTrigger: { trigger: '.nosotros-text', start: 'top 85%', toggleActions: 'play none none none' }
});
gsap.from('.visual-card', {
  x: 50, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.visual-card', start: 'top 85%', toggleActions: 'play none none none' }
});

// Statement
gsap.from('.statement-big', {
  x: -50, duration: 0.8, stagger: 0.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.statement-section', start: 'top 80%', toggleActions: 'play none none none' }
});

// Branding cards
gsap.from('.branding-card', {
  y: 40, duration: 0.6, stagger: 0.12, ease: 'power2.out',
  scrollTrigger: { trigger: '.branding-cards', start: 'top 85%', toggleActions: 'play none none none' }
});

// Benefit items
gsap.from('.benefit-item', {
  scale: 0.9, duration: 0.5, stagger: 0.07, ease: 'back.out(1.5)',
  scrollTrigger: { trigger: '.benefits-grid', start: 'top 88%', toggleActions: 'play none none none' }
});

// Branding stats
gsap.from('.branding-stats', {
  y: 30, duration: 0.8, ease: 'power2.out',
  scrollTrigger: { trigger: '.branding-stats', start: 'top 85%', toggleActions: 'play none none none' }
});

// Portfolio
gsap.from('.trabajo-card', {
  y: 50, duration: 0.7, stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger: '.trabajo-grid', start: 'top 85%', toggleActions: 'play none none none' }
});

// CTA
gsap.from('.cta-headline, .cta-desc, .btn-cta-main', {
  y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
  scrollTrigger: { trigger: '.cta-section', start: 'top 75%', toggleActions: 'play none none none' }
});

/* ---------- COUNTER ANIMATION ---------- */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target);
    const start = performance.now();
    const duration = 1500;
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---------- MARQUEE PAUSE ON HOVER ---------- */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => marqueeTrack.style.animationPlayState = 'paused');
  marqueeTrack.addEventListener('mouseleave', () => marqueeTrack.style.animationPlayState = 'running');
}

/* ---------- WAVEFORM ANIMATION ---------- */
document.querySelectorAll('.wf-bar').forEach((bar, i) => {
  bar.style.animationDelay = `${i * 0.1}s`;
  bar.style.animationDuration = `${0.8 + Math.random() * 0.8}s`;
});

/* ---------- NAV ACTIVE LINK ---------- */
const sectionEls = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sectionEls.forEach(s => sectionObserver.observe(s));

/* ---------- REDUCE MOTION ---------- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.clear();
  if (marqueeTrack) marqueeTrack.style.animation = 'none';
}

console.log('%c🎵 Séptimo Plano Studio', 'font-size:20px;font-weight:bold;color:#8B5CF6');
console.log('%cDe artistas para artistas — Concepción, Chile', 'color:#A78BFA');
