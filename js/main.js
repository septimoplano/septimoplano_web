/* ============================================
   SÉPTIMO PLANO STUDIO — Main JavaScript
   ============================================ */

/* ---------- PAGE LOADER ---------- */
(function () {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-logo">SP</div>
    <div class="loader-bar"><div class="loader-bar-fill"></div></div>
  `;
  document.body.prepend(loader);
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(() => loader.remove(), 600);
    }, 1500);
  });
})();

/* ---------- GSAP + ScrollTrigger ---------- */
gsap.registerPlugin(ScrollTrigger);

/* ---------- CUSTOM CURSOR ---------- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05 });
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  gsap.set(follower, { x: followerX, y: followerY });
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, [data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('is-hovered');
    follower.classList.add('is-hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-hovered');
    follower.classList.remove('is-hovered');
  });
});

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
      this.life = 1;
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

/* ---------- SCROLL REVEAL ---------- */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => observer.observe(el));
}
observeReveal();

/* ---------- GSAP SCROLL ANIMATIONS ---------- */
// Hero parallax
gsap.to('.hero-content', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to('.hero-flare-1', {
  yPercent: 40,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});
gsap.to('.hero-flare-2', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// Services cards stagger
gsap.from('.service-card', {
  scrollTrigger: {
    trigger: '.services-grid',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out'
});

// Branding cards
gsap.from('.branding-card', {
  scrollTrigger: {
    trigger: '.branding-cards',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  x: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out'
});

// Statement section text slide
gsap.from('.statement-big', {
  scrollTrigger: {
    trigger: '.statement-section',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  x: -60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Benefit items
gsap.from('.benefit-item', {
  scrollTrigger: {
    trigger: '.benefits-grid',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  scale: 0.9,
  opacity: 0,
  duration: 0.5,
  stagger: 0.08,
  ease: 'back.out(1.5)'
});

// Trabajo cards
gsap.from('.trabajo-card', {
  scrollTrigger: {
    trigger: '.trabajo-grid',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power3.out'
});

// CTA headline word by word
gsap.from('.cta-headline', {
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top 70%',
    toggleActions: 'play none none none'
  },
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out'
});

/* ---------- COUNTER ANIMATION ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---------- MARQUEE SPEED ON HOVER ---------- */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ---------- SMOOTH SECTION TRANSITIONS ---------- */
gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
  });
});

/* ---------- HERO TEXT GLITCH EFFECT ---------- */
(function () {
  const lines = document.querySelectorAll('.hero-line');
  lines.forEach(line => {
    line.addEventListener('mouseenter', () => {
      line.style.animation = 'none';
      line.offsetHeight;
      line.classList.add('glitch');
      setTimeout(() => line.classList.remove('glitch'), 400);
    });
  });
})();

/* ---------- WAVEFORM SYNC ANIMATION ---------- */
const bars = document.querySelectorAll('.wf-bar');
bars.forEach((bar, i) => {
  bar.style.animationDelay = `${i * 0.1}s`;
  bar.style.animationDuration = `${0.8 + Math.random() * 0.8}s`;
});

/* ---------- NAV ACTIVE LINK ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks2 = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks2.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

/* ---------- ACCESSIBILITY: reduce motion ---------- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.marquee-track').forEach(el => el.style.animation = 'none');
  gsap.globalTimeline.clear();
}

console.log('%c🎵 Séptimo Plano Studio', 'font-size:20px;font-weight:bold;color:#8B5CF6');
console.log('%cDe artistas para artistas — Concepción, Chile', 'color:#A78BFA');
