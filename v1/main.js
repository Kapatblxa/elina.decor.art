/* ─── HEADER SCROLL ─── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── BURGER MENU ─── */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── PROJECT FILTER ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ─── REVIEWS SLIDER ─── */
(function () {
  const track = document.getElementById('reviewsTrack');
  const dotsWrap = document.getElementById('reviewsDots');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  const perView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  let current = 0;
  let pv = perView();
  let total = Math.ceil(cards.length / pv);
  let autoTimer;

  function buildDots() {
    pv = perView();
    total = Math.ceil(cards.length / pv);
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'reviews__dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', `Слайд ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(idx) {
    current = (idx + total) % total;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    track.style.transform = `translateX(-${current * (cardWidth + gap) * pv}px)`;
    dotsWrap.querySelectorAll('.reviews__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  window.addEventListener('resize', () => {
    current = 0;
    buildDots();
    goTo(0);
  });

  buildDots();
  resetAuto();
})();

/* ─── FADE IN ON SCROLL ─── */
const fadeEls = document.querySelectorAll(
  '.section-header, .intro__text, .intro__visual, .service-item, .project-card, .review-card, .process__step, .cat-card'
);
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  io.observe(el);
});
