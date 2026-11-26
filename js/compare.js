/* Before-after slider. A transparent range input handles mouse, touch, and keyboard.
   Before / After labels are drawn outside the image by main.js.
   expandable = true adds a full-screen button (openCompare lives in main.js). */
const EXPAND_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';

function createCompare(w, expandable = true) {
  const el = document.createElement('div');
  el.className = 'compare';
  el.innerHTML = `
    <img src="${w.after}" alt="${w.title}, after retouching">
    <img class="before" src="${w.before}" alt="${w.title}, original">
    <div class="bar"></div>
    <input type="range" min="0" max="100" value="50" aria-label="Compare ${w.title} before and after">`;
  const input = el.querySelector('input');
  input.addEventListener('input', () => el.style.setProperty('--p', input.value + '%'));
  if (expandable) {
    const b = document.createElement('button');
    b.className = 'expand';
    b.setAttribute('aria-label', 'View ' + w.title + ' full screen');
    b.innerHTML = EXPAND_ICON;
    b.onclick = () => openCompare(w);
    el.append(b);
  }
  return el;
}
