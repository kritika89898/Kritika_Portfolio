// ---------- Theme ----------
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function currentTheme() {
  return root.dataset.theme === 'light' ? 'light' : 'dark';
}
function setTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (e) {}
  themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'light' ? '#EEF1F5' : '#0D1726');
}
themeBtn.addEventListener('click', () => setTheme(currentTheme() === 'light' ? 'dark' : 'light'));
themeBtn.setAttribute('aria-label', currentTheme() === 'light' ? 'Switch to dark theme' : 'Switch to light theme');

// ---------- Nav: mobile menu, scrolled state, current section ----------
const nav = document.querySelector('.nav');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
}
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const sectionLinks = [...navLinks.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

// ---------- Project filters ----------
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  const filter = chip.dataset.filter;
  chips.forEach(c => {
    const active = c === chip;
    c.classList.toggle('is-active', active);
    c.setAttribute('aria-pressed', String(active));
  });
  projects.forEach(p => {
    p.hidden = filter !== 'all' && !p.dataset.tags.split(' ').includes(filter);
  });
}));

// ---------- ExamForge screenshot switcher ----------
document.querySelectorAll('.feature__media').forEach(media => {
  const imgs = media.querySelectorAll('.shots img');
  const dots = media.querySelectorAll('.dot');
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    imgs.forEach((img, j) => { img.hidden = j !== i; });
    dots.forEach((d, j) => {
      d.classList.toggle('is-active', j === i);
      d.setAttribute('aria-pressed', String(j === i));
    });
  }));
});

// ---------- Contact ----------
const EMAIL = 'kritikabhanariya101@gmail.com';
const form = document.getElementById('contactForm');
const formError = document.getElementById('formError');
const nameIn = document.getElementById('name');
const msgIn = document.getElementById('message');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameIn.value.trim();
  const message = msgIn.value.trim();
  nameIn.setAttribute('aria-invalid', String(!name));
  msgIn.setAttribute('aria-invalid', String(!message));
  if (!name || !message) {
    formError.textContent = !name ? 'Add your name so I know who is writing.' : 'Write a message before sending.';
    (!name ? nameIn : msgIn).focus();
    return;
  }
  formError.textContent = '';
  const subject = encodeURIComponent(`Hello from ${name} (via your portfolio)`);
  const body = encodeURIComponent(`${message}\n\n${name}`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
});

const copyBtn = document.getElementById('copyEmail');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.textContent = 'Copied';
  } catch (e) {
    copyBtn.textContent = 'Select and copy';
  }
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1800);
});

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Terminal ----------
const termBody = document.getElementById('termBody');
const termForm = document.getElementById('termForm');
const termIn = document.getElementById('termIn');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LINKS = {
  examforge: 'https://exam-forge-coral.vercel.app/',
  protools: 'https://protoolsdirectory.kritika-protools-2026.workers.dev/',
  colorwars: 'https://frontendcw.onrender.com/',
  cineverse: 'https://github.com/kritika89898/Cineverse',
  github: 'https://github.com/kritika89898',
  linkedin: 'https://linkedin.com/in/kritika-bhanaria-434242285',
  resume: 'https://drive.google.com/file/d/1MD1mdOTZtzz-3Khr2-LRqMDIds7-cI4m/view?usp=drive_link',
};

const COMMANDS = {
  help: () => [
    ['dim', 'available commands'],
    ['', '  whoami        who I am'],
    ['', '  projects      what I have built'],
    ['', '  open <name>   open a project or profile in a new tab'],
    ['', '  experience    where I have worked'],
    ['', '  skills        languages and tools'],
    ['', '  contact       how to reach me'],
    ['', '  resume        open my resume'],
    ['', '  theme         switch light / dark'],
    ['', '  clear         clear the screen'],
  ],
  whoami: () => [
    ['ok', 'Kritika Bhanaria'],
    ['', 'B.Tech CSE-AI @ IGDTUW, class of 2027'],
    ['', 'Full-stack + systems. Ships on free tiers, cares about edge cases.'],
  ],
  projects: () => [
    ['ok', 'examforge     AI exam-prep portal, 76 papers, ₹0 hosting'],
    ['ok', 'protools      directory of 100 verified tools, Cloudflare Workers'],
    ['ok', 'colorwars     chain-reaction strategy game, vs CPU or friend'],
    ['', 'fakenews      TF-IDF + logistic regression, 97.9% accuracy'],
    ['', 'bigmart       retail sales forecasting'],
    ['', 'cineverse     streaming landing page in HTML/CSS'],
    ['dim', "try 'open examforge'"],
  ],
  experience: () => [
    ['ok', 'DRDO, Delhi  Networking Intern  Jun–Aug 2024'],
    ['', '  packet filter in C with eBPF/XDP, MAC-based access control via eBPF maps'],
    ['ok', 'AWS Cloud Club, IGDTUW  Member  Apr–Nov 2024'],
    ['', '  10+ sessions on DSA and web development'],
  ],
  skills: () => [
    ['', 'lang     C++  C  Python  JavaScript  TypeScript  SQL'],
    ['', 'web      Node.js  Express  REST  serverless'],
    ['', 'systems  Linux  eBPF  XDP  networking'],
    ['', 'ml       scikit-learn  NLP  Gemini API'],
    ['', 'cloud    Vercel  Cloudflare  Render  AWS  GCP'],
  ],
  contact: () => [
    ['', 'email     ', { href: 'mailto:' + EMAIL, text: EMAIL }],
    ['', 'linkedin  ', { href: LINKS.linkedin, text: 'kritika-bhanaria' }],
    ['', 'github    ', { href: LINKS.github, text: 'kritika89898' }],
  ],
  resume: () => openLink('resume'),
  theme: () => {
    setTheme(currentTheme() === 'light' ? 'dark' : 'light');
    return [['ok', `theme set to ${currentTheme()}`]];
  },
  sudo: () => [['warn', 'nice try. permission denied.']],
  ls: () => COMMANDS.projects(),
};

function openLink(key) {
  const aliases = { protoolsdirectory: 'protools', 'color-wars': 'colorwars', colorwar: 'colorwars', cv: 'resume' };
  const k = aliases[key] || key;
  if (k === 'fakenews' || k === 'bigmart') {
    return [['dim', `${k} has no public link yet. Ask me for the code.`]];
  }
  if (!LINKS[k]) {
    return [['warn', `no project called '${key}'. try: examforge, protools, colorwars, cineverse, github, linkedin`]];
  }
  window.open(LINKS[k], '_blank', 'noopener');
  return [['ok', `opening ${k}...`]];
}

function print(lines) {
  lines.forEach(([cls, text, link]) => {
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.textContent = text;
    if (link) {
      const a = document.createElement('a');
      a.href = link.href; a.textContent = link.text;
      if (!link.href.startsWith('mailto')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      p.appendChild(a);
    }
    termBody.appendChild(p);
  });
  const gap = document.createElement('div');
  gap.className = 'gap';
  termBody.appendChild(gap);
  termBody.scrollTop = termBody.scrollHeight;
}

function run(input) {
  const raw = input.trim();
  const echo = document.createElement('p');
  echo.className = 'cmd';
  echo.textContent = raw;
  termBody.appendChild(echo);
  if (!raw) return;
  const [cmd, ...args] = raw.toLowerCase().split(/\s+/);
  if (cmd === 'clear') { termBody.innerHTML = ''; return; }
  if (cmd === 'open' || cmd === 'cd') {
    print(args.length ? openLink(args[0]) : [['warn', 'usage: open <name>']]);
    return;
  }
  if (COMMANDS[cmd]) print(COMMANDS[cmd]());
  else print([['warn', `command not found: ${cmd}`], ['dim', "type 'help' for the list"]]);
}

const history = [];
let hIndex = 0;
termForm.addEventListener('submit', e => {
  e.preventDefault();
  const value = termIn.value;
  if (value.trim()) history.push(value);
  hIndex = history.length;
  termIn.value = '';
  run(value);
});
termIn.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && hIndex > 0) { hIndex--; termIn.value = history[hIndex]; e.preventDefault(); }
  if (e.key === 'ArrowDown') {
    hIndex = Math.min(history.length, hIndex + 1);
    termIn.value = history[hIndex] || '';
    e.preventDefault();
  }
  if (e.key === 'Tab') {
    const v = termIn.value.toLowerCase();
    const options = Object.keys(COMMANDS).concat('open', 'clear').filter(c => c.startsWith(v));
    if (v && options.length === 1) { termIn.value = options[0] + ' '; e.preventDefault(); }
  }
});
document.querySelector('.term__body').addEventListener('click', () => {
  if (!window.getSelection().toString()) termIn.focus({ preventScroll: true });
});

// The one orchestrated moment: type out `whoami` on load.
(function intro() {
  const first = 'whoami';
  if (reduceMotion) { run(first); print([['dim', "type 'help' to see everything I can show you"]]); return; }
  const echo = document.createElement('p');
  echo.className = 'cmd';
  termBody.appendChild(echo);
  let i = 0;
  const tick = () => {
    echo.textContent = first.slice(0, ++i);
    if (i < first.length) setTimeout(tick, 90);
    else setTimeout(() => {
      print(COMMANDS.whoami());
      print([['dim', "type 'help' to see everything I can show you"]]);
    }, 260);
  };
  setTimeout(tick, 500);
})();
