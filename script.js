// ===== Año dinámico en el footer =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Resaltar enlace activo según sección visible =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(section => sectionObserver.observe(section));
}

// ===== Carruseles (portfolio y testimonios) =====
function setupCarousel(trackId) {
  const track = document.getElementById(trackId);
  if (!track) return null;

  const wrap = track.closest('.portfolio-carousel, .testimonial-carousel');
  const prevBtn = wrap ? wrap.querySelector('.carousel-prev') : null;
  const nextBtn = wrap ? wrap.querySelector('.carousel-next') : null;

  function visibleCards() {
    return Array.from(track.children).filter(el => !el.classList.contains('is-hidden'));
  }

  function scrollByCard(direction) {
    const card = visibleCards()[0];
    const gap = 20;
    const amount = card ? card.getBoundingClientRect().width + gap : 300;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  function updateArrows() {
    if (!prevBtn || !nextBtn) return;
    const maxScroll = track.scrollWidth - track.clientWidth - 4;
    prevBtn.classList.toggle('is-disabled', track.scrollLeft <= 4);
    nextBtn.classList.toggle('is-disabled', maxScroll <= 4 || track.scrollLeft >= maxScroll);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));
  track.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();

  return { track, updateArrows };
}

const portfolioCarousel = setupCarousel('portfolioTrack');
setupCarousel('testimonialTrack');

// ===== Filtro del portfolio (home) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

if (filterBtns.length && portfolioCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        const show = filter === 'todos' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !show);
      });

      if (portfolioCarousel) {
        portfolioCarousel.track.scrollTo({ left: 0 });
        portfolioCarousel.updateArrows();
      }
    });
  });
}

// ===== Estadísticas animadas (contador ascendente) =====
const statValues = document.querySelectorAll('.stat-value[data-target]');

if (statValues.length) {
  const formatNumber = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const animateStat = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = prefix + formatNumber(value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statValues.forEach(el => statObserver.observe(el));
  } else {
    statValues.forEach(animateStat);
  }
}

// ===== Animación de aparición al hacer scroll =====
const revealTargets = document.querySelectorAll(
  '.feature-card, .tag-pill, .stat, .contact-card, .badge-pill, .quote-card, .testimonial-card'
);

revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}
