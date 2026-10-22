# Kritika Bhanaria – Portfolio

Personal portfolio of Kritika Bhanaria, B.Tech Computer Science & AI student at IGDTUW (class of 2027).

**Live:** https://kritika89898.github.io/Kritika_Portfolio/

## What's inside

- **Interactive terminal** in the hero: try `help`, `projects`, `open examforge`, `contact`, `theme`
- **Projects** with live links, source code and demo videos, filterable by Full-stack, AI / ML and Frontend
- **Experience** timeline (DRDO networking internship: eBPF/XDP packet filter in C)
- **Skills**, **achievements** and a **contact** form that opens your email app
- Light and dark themes (follows your system setting, remembers your choice)
- Responsive down to small phones, keyboard accessible, respects reduced-motion settings

## Tech

Plain HTML, CSS and JavaScript, no framework or build step. Hosted on GitHub Pages.

```
index.html        page markup and content
style.css         design tokens, layout, light/dark themes
script.js         terminal, project filters, theme toggle, contact form
assets/           favicon and project images (WebP / SVG)
```

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Updating a project

Each project is an `<article class="project">` in `index.html`. Add its screenshot to `assets/projects/`,
set `data-tags` to any of `fullstack`, `ml`, `frontend`, and add it to the `projects` list in `script.js`
if it should appear in the terminal too.
