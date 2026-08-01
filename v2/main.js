/* ══ BURGER ══ */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

/* ══ PROJECTS — hover/tap swaps sticky preview ══ */
(function () {
  const list = document.getElementById('prjList');
  const img = document.getElementById('prjImg');
  const title = document.getElementById('prjTitle');
  const tag = document.getElementById('prjTag');
  if (!list || !img) return;

  const items = [...list.querySelectorAll('.prj__item')];

  function activate(item) {
    if (item.classList.contains('is-active')) return;
    items.forEach(i => i.classList.remove('is-active'));
    item.classList.add('is-active');

    img.classList.add('is-fading');
    const next = item.dataset.img;
    const pre = new Image();
    pre.onload = () => {
      img.src = next;
      img.alt = item.dataset.title;
      img.classList.remove('is-fading');
    };
    pre.src = next;

    title.textContent = item.dataset.title;
    tag.textContent = item.dataset.tag;
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => activate(item));
    item.addEventListener('click', () => activate(item));
  });
})();

/* ══ REVIEWS rail ══ */
(function () {
  const rail = document.getElementById('rail');
  const prev = document.getElementById('railPrev');
  const next = document.getElementById('railNext');
  if (!rail) return;

  const step = () => {
    const card = rail.querySelector('.rev');
    return card ? card.getBoundingClientRect().width + 1 : 421;
  };
  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
})();

/* ══ CONTACT form ══ */
(function () {
  const form = document.getElementById('form');
  const done = document.getElementById('formDone');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Надсилаємо…';
    // Simulated submit — wire to a backend / Formspree / Netlify Forms later
    setTimeout(() => {
      form.classList.add('is-off');
      done.classList.add('is-on');
    }, 900);
  });
})();
