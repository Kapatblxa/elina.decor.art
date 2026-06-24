/* ═══ HEADER solid on scroll ═══ */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ═══ BURGER ═══ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  document.body.style.overflow = open ? 'hidden' : '';
});
nav.querySelectorAll('.nav__link').forEach(l =>
  l.addEventListener('click', () => { nav.classList.remove('is-open'); document.body.style.overflow = ''; })
);

/* ═══ WORKS filter ═══ */
const fbtns = document.querySelectorAll('.fbtn');
const witems = document.querySelectorAll('.witem');
fbtns.forEach(btn => btn.addEventListener('click', () => {
  fbtns.forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  const f = btn.dataset.filter;
  witems.forEach(it => {
    const show = f === 'all' || it.dataset.category === f;
    it.classList.toggle('witem--hidden', !show);
  });
}));

/* ═══ QUOTE slider ═══ */
(function () {
  const root = document.getElementById('quote');
  if (!root) return;
  const slides = [...root.querySelectorAll('.quote__slide')];
  const dotsWrap = document.getElementById('qDots');
  const prev = document.getElementById('qPrev');
  const next = document.getElementById('qNext');
  let i = 0, timer;

  slides.forEach((_, idx) => {
    const d = document.createElement('button');
    d.className = 'quote__dot' + (idx === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', `Відгук ${idx + 1}`);
    d.addEventListener('click', () => { go(idx); restart(); });
    dotsWrap.appendChild(d);
  });
  const dots = [...dotsWrap.children];

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); }

  prev.addEventListener('click', () => { go(i - 1); restart(); });
  next.addEventListener('click', () => { go(i + 1); restart(); });
  restart();
})();

/* ═══ CONTACT form ═══ */
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-line');
  btn.disabled = true; btn.textContent = 'Надсилаємо…';
  setTimeout(() => {
    form.querySelectorAll('input,select,textarea').forEach(el => el.value = '');
    btn.disabled = false; btn.textContent = 'Надіслати заявку';
    success.classList.add('is-visible');
    setTimeout(() => success.classList.remove('is-visible'), 6000);
  }, 1100);
});

/* ═══ REVEAL on scroll ═══ */
const revealEls = document.querySelectorAll(
  '.manifesto__text, .manifesto__meta, .sec-head, .citem, .slist__item, .witem, .quote, .contact__info, .cform'
);
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach((el, idx) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(idx % 3) * 90}ms`;
  io.observe(el);
});
