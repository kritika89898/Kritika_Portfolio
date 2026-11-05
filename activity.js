// LeetCode activity heatmap: submissions over the last year, plus solved count, rating and streaks.
// Data comes from data/activity.json, refreshed every 6 hours by
// .github/workflows/update-activity.yml. If the file is missing, the section stays hidden.

(function () {
  const section = document.getElementById('activity');
  const grid = document.getElementById('heatGrid');
  const months = document.getElementById('heatMonths');
  const scroller = document.getElementById('heatScroll');
  const statsEl = document.getElementById('actStats');
  const updatedEl = document.getElementById('actUpdated');
  const tip = document.getElementById('heatTip');

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let lc = null;
  let days = [];   // [{ date, n }]

  const pad = n => String(n).padStart(2, '0');
  const keyOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const plural = (n, word) => `${n.toLocaleString('en-IN')} ${word}${n === 1 ? '' : 's'}`;
  const fmtDate = d => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

  function buildDays(byDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - 52 * 7);
    start.setDate(start.getDate() - start.getDay()); // back to Sunday
    const out = [];
    for (const d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      out.push({ date: new Date(d), n: byDate[keyOf(d)] || 0 });
    }
    return out;
  }

  // Levels 1–4 from quartiles of the non-zero days, so one huge day doesn't flatten the rest.
  function thresholds(values) {
    const nz = values.filter(v => v > 0).sort((a, b) => a - b);
    if (!nz.length) return [1, 1, 1];
    const q = p => nz[Math.min(nz.length - 1, Math.floor(p * nz.length))];
    return [q(0.25), q(0.5), q(0.75)];
  }
  function level(v, t) {
    if (v <= 0) return 0;
    if (v <= t[0]) return 1;
    if (v <= t[1]) return 2;
    if (v <= t[2]) return 3;
    return 4;
  }

  function streaks(values) {
    let longest = 0, run = 0;
    for (const v of values) { run = v > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
    // Current streak: today may still be empty, so count back from yesterday in that case.
    let i = values.length - 1;
    if (values[i] === 0) i--;
    let current = 0;
    while (i >= 0 && values[i] > 0) { current++; i--; }
    return { current, longest };
  }

  function render() {
    const values = days.map(d => d.n);
    const t = thresholds(values);
    const active = values.filter(v => v > 0).length;
    const total = values.reduce((a, b) => a + b, 0);
    const { current, longest } = streaks(values);

    // Grid cells
    const frag = document.createDocumentFragment();
    values.forEach((v, i) => {
      const cell = document.createElement('i');
      cell.dataset.l = level(v, t);
      cell.dataset.i = i;
      frag.appendChild(cell);
    });
    grid.replaceChildren(frag);
    grid.setAttribute('aria-label',
      `LeetCode submissions over the last year: ${plural(total, 'submission')} on ${plural(active, 'day')}, longest streak ${plural(longest, 'day')}.`);

    // Month labels: one at the first column of each month, skipped if it would crowd the previous one.
    const mfrag = document.createDocumentFragment();
    let lastCol = -4, lastMonth = -1;
    for (let col = 0; col * 7 < days.length; col++) {
      const first = days[col * 7].date;
      const m = first.getMonth();
      if (m !== lastMonth && (col > 0 || first.getDate() <= 7)) {
        if (col - lastCol >= 3) {
          const s = document.createElement('span');
          s.textContent = MONTHS[m];
          s.style.gridColumn = col + 1;
          mfrag.appendChild(s);
          lastCol = col;
        }
        lastMonth = m;
      }
    }
    months.replaceChildren(mfrag);
    months.style.gridTemplateColumns = grid.style.gridTemplateColumns =
      `repeat(${Math.ceil(days.length / 7)}, var(--cell))`;

    // Stats
    const stats = [];
    if (lc.solved) stats.push(['Problems solved', lc.solved.all.toLocaleString('en-IN'),
      `${lc.solved.easy} easy, ${lc.solved.medium} medium, ${lc.solved.hard} hard`]);
    if (lc.rating) stats.push(['Contest rating', lc.rating,
      lc.topPercentage ? `top ${lc.topPercentage}%` : (lc.contests ? plural(lc.contests, 'contest') : '')]);
    stats.push(['Active days', active.toLocaleString('en-IN'), `${plural(total, 'submission')} this year`]);
    stats.push(['Current streak', plural(current, 'day'), `longest ${plural(longest, 'day')}`]);
    statsEl.replaceChildren(...stats.map(([label, value, note]) => {
      const wrap = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = value;
      if (note) { const s = document.createElement('small'); s.textContent = note; dd.appendChild(s); }
      wrap.append(dt, dd);
      return wrap;
    }));
  }

  // ---------- Tooltip ----------
  function showTip(cell) {
    const day = days[cell.dataset.i];
    if (!day) return;
    tip.textContent = day.n ? `${plural(day.n, 'submission')} on ${fmtDate(day.date)}` : `No submissions on ${fmtDate(day.date)}`;
    tip.hidden = false;
    const r = cell.getBoundingClientRect();
    const w = tip.offsetWidth;
    const left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2));
    tip.style.left = left + 'px';
    tip.style.top = (r.top - tip.offsetHeight - 8) + 'px';
  }
  const hideTip = () => { tip.hidden = true; };
  grid.addEventListener('pointerover', e => { if (e.target.tagName === 'I') showTip(e.target); });
  grid.addEventListener('pointerdown', e => { if (e.target.tagName === 'I') showTip(e.target); });
  grid.addEventListener('pointerleave', hideTip);
  scroller.addEventListener('scroll', hideTip, { passive: true });
  window.addEventListener('scroll', hideTip, { passive: true });

  function updatedText(iso) {
    if (!iso) return '';
    const mins = Math.round((Date.now() - new Date(iso)) / 60000);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (mins < 60) return 'Updated ' + rtf.format(-Math.max(mins, 1), 'minute');
    if (mins < 48 * 60) return 'Updated ' + rtf.format(-Math.round(mins / 60), 'hour');
    return 'Updated ' + rtf.format(-Math.round(mins / 1440), 'day');
  }

  // ---------- Terminal command ----------
  if (typeof COMMANDS !== 'undefined') {
    COMMANDS.leetcode = () => {
      const profile = ['', 'profile  ', { href: LINKS.leetcode, text: 'leetcode.com/u/maIEphSvuk' }];
      if (!lc) return [['dim', 'LeetCode stats are not available right now.'], profile];
      const lines = [['ok', `${lc.solved.all} problems solved`], ['', `  easy ${lc.solved.easy}   medium ${lc.solved.medium}   hard ${lc.solved.hard}`]];
      if (lc.rating) lines.push(['ok', `contest rating ${lc.rating}${lc.topPercentage ? ` (top ${lc.topPercentage}%)` : ''}`]);
      if (days.length) {
        const { current, longest } = streaks(days.map(d => d.n));
        lines.push(['', `  current streak ${plural(current, 'day')}, longest ${plural(longest, 'day')}`]);
      }
      lines.push(profile);
      return lines;
    };
  }

  // ---------- Load ----------
  fetch('data/activity.json', { cache: 'no-cache' })
    .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(json => {
      if (!json.leetcode) return;
      lc = json.leetcode;
      days = buildDays(lc.days || {});
      section.hidden = false;
      const navItem = document.getElementById('navActivity');
      if (navItem) navItem.hidden = false;
      updatedEl.textContent = updatedText(json.updated);
      const ratingEl = document.getElementById('lcRating');
      if (ratingEl && lc.rating) ratingEl.textContent = lc.rating;
      render();
      scroller.scrollLeft = scroller.scrollWidth; // show the most recent weeks first on small screens
      if (typeof observer !== 'undefined') observer.observe(section);
    })
    .catch(() => { /* no data yet: keep the section hidden */ });
})();
