const $ = s => document.querySelector(s);
const LIMIT = 6; // works shown per category before "View all"
const LABEL = { retouch: 'Photo retouching', image: 'Image editing', typography: 'Portrait typography' };

/* Hero: one retouch slider + one typography work (skipped if the list is empty) */
const hero = $('#hero-cards');
if (WORKS.retouch[0]) {
  const f = document.createElement('div');
  f.className = 'frame';
  f.append(createCompare(WORKS.retouch[0]));
  hero.append(f);
}
if (WORKS.typography[0]) {
  const f = document.createElement('div');
  f.className = 'frame';
  f.innerHTML = `<div class="shot"><img src="${WORKS.typography[0].src}" alt="${WORKS.typography[0].title}"></div>`;
  hero.append(f);
}

/* Category rows */
function card(cat, w) {
  const f = document.createElement('figure');
  f.className = 'work';
  if (cat === 'retouch') {
    f.append(createCompare(w));
    f.insertAdjacentHTML('beforeend', '<div class="ba"><span>Before</span><span>After</span></div>');
  } else {
    const b = document.createElement('button');
    b.className = 'thumb';
    b.setAttribute('aria-label', 'Open ' + w.title);
    b.innerHTML = `<img loading="lazy" src="${w.src}" alt="${w.title}">`;
    b.onclick = () => openBox(w);
    f.append(b);
  }
  f.insertAdjacentHTML('beforeend', `<figcaption><div class="cap">${w.title}</div><div class="sub">${LABEL[cat]}</div></figcaption>`);
  return f;
}
document.querySelectorAll('.grid[data-cat]').forEach(g => {
  const cat = g.dataset.cat, list = WORKS[cat], more = g.closest('.row').querySelector('.more');
  const draw = all => g.replaceChildren(...(all ? list : list.slice(0, LIMIT)).map(w => card(cat, w)));
  draw(false);
  if (list.length > LIMIT) {
    more.hidden = false;
    more.onclick = () => { draw(true); more.hidden = true; };
  }
});

/* Lightbox */
const box = $('#lightbox'), boxImg = box.querySelector('img');
function openBox(w) {
  boxImg.src = w.full || w.src;
  boxImg.alt = w.title;
  box.classList.remove('zoom');
  box.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeBox() { box.hidden = true; document.body.style.overflow = ''; }
boxImg.onclick = e => { e.stopPropagation(); box.classList.toggle('zoom'); };
box.onclick = closeBox;
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) closeBox(); });

/* Hide broken images so missing files show the soft placeholder instead of a broken icon */
document.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);

$('#year').textContent = new Date().getFullYear();
