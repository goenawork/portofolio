const $ = s => document.querySelector(s);

/* Photo retouching: first work in the hero, the rest in the grid */
function retouchCard(w) {
  const f = document.createElement('figure');
  const c = document.createElement('figcaption');
  c.textContent = w.title;
  f.append(createCompare(w), c);
  return f;
}
const [featured, ...others] = WORKS.retouch;
$('#hero-compare').append(createCompare(featured));
$('#retouch-grid').append(...others.map(retouchCard));

/* Creative works: tabs + lightbox */
const grid = $('#creative-grid');
function showTab(tab) {
  grid.replaceChildren(...WORKS[tab].map(w => {
    const b = document.createElement('button');
    b.className = 'thumb';
    b.setAttribute('aria-label', 'Open ' + w.title);
    b.innerHTML = `<img loading="lazy" src="${w.src}" alt="${w.title}">`;
    b.onclick = () => openBox(w);
    return b;
  }));
}
document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === t));
  showTab(t.dataset.tab);
});
showTab('image');

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

/* Hide broken images so missing files show the dark placeholder instead of a broken icon */
document.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);

$('#year').textContent = new Date().getFullYear();
