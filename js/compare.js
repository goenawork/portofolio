/* Before-after slider. A transparent range input handles mouse, touch, and keyboard.
   The Before / After labels are drawn outside the image by main.js. */
function createCompare(w) {
  const el = document.createElement('div');
  el.className = 'compare';
  el.innerHTML = `
    <img src="${w.after}" alt="${w.title}, after retouching">
    <img class="before" src="${w.before}" alt="${w.title}, original">
    <div class="bar"></div>
    <input type="range" min="0" max="100" value="50" aria-label="Compare ${w.title} before and after">`;
  const input = el.querySelector('input');
  input.addEventListener('input', () => el.style.setProperty('--p', input.value + '%'));
  return el;
}
