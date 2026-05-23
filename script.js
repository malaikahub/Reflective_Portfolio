/* ============================
   PORTFOLIO — script.js
============================ */

// ── CUSTOM CURSOR ──────────────────────────────────────────────
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Cursor grow on interactive elements
document.querySelectorAll('a, button, input, textarea, .skill-card, .project-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursorFollower.style.width  = '56px';
    cursorFollower.style.height = '56px';
    cursorFollower.style.borderColor = 'rgba(201,168,76,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width  = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.borderColor = 'rgba(201,168,76,0.5)';
  });
});


// ── NAV SCROLL EFFECT ──────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});


// ── HAMBURGER MENU ─────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}


// ── INTERSECTION OBSERVER — REVEAL ON SCROLL ───────────────────
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));


// ── SKILL BARS ─────────────────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => { fill.style.width = width; }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(f => skillObserver.observe(f));


// ── COUNTER ANIMATION ──────────────────────────────────────────
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = +el.getAttribute('data-target');
      const duration = 1800;
      const step   = duration / target;
      let current  = 0;
      const timer  = setInterval(() => {
        current++;
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, step);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ── CONTACT FORM ───────────────────────────────────────────────
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"] span');
  btn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1500);
});


// ── SMOOTH ACTIVE NAV LINK ─────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ── PARALLAX HERO BG TEXT ──────────────────────────────────────
const heroBgText = document.querySelector('.hero-bg-text');

window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }
});


// ── PAGE LOAD ANIMATION ────────────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Trigger hero reveals immediately
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach((el, i) => {
    setTimeout(() => el.classList.add('in-view'), 200 + i * 120);
  });
});
