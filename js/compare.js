/* Before-after slider. A transparent range input handles mouse, touch, and keyboard. */
function createCompare(w) {
  const el = document.createElement('div');
  el.className = 'compare';
  el.innerHTML = `
    <img src="${w.after}" alt="${w.title}, after retouching">
    <img class="before" src="${w.before}" alt="${w.title}, original">
    <span class="tag b">Before</span><span class="tag a">After</span>
    <div class="bar"></div>
    <input type="range" min="0" max="100" value="50" aria-label="Compare ${w.title} before and after">`;
  const input = el.querySelector('input');
  input.addEventListener('input', () => el.style.setProperty('--p', input.value + '%'));
  return el;
}
