# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An early-stage UAE gratuity calculator (end-of-service benefit under UAE Labour Law). The repository contains two parallel, unconnected implementations at the repo root:

1. **Static site**: `index.html` + `styles.css` + `script.js` — a landing page with a gratuity form. Open `index.html` directly in a browser to run it; there is no server or build step.
2. **React components**: `App.jsx` and `Calculator.jsx` — standalone components with no entry point, no `package.json`, and no bundler. They import `react`, `firebase`, and `matter-js`, none of which are installed, so they cannot currently be built or run. `Calculator.jsx` is not imported by `App.jsx`; they are independent drafts.

## Commands

There is no build system, package manager, linter, or test suite. The only way to run anything is opening `index.html` in a browser. If you add React tooling (e.g. Vite), create a `package.json` and update this file.

## Known Inconsistencies

These matter when making changes — the codebase has three competing gratuity formulas and some dead wiring:

- **Three different gratuity calculations**: the inline script in `index.html` uses `salary * years * 0.5`; `App.jsx` uses `(salary / 30) * years`; `Calculator.jsx` implements the closest thing to the actual UAE Labour Law rule (21 days' pay per year for the first 5 years, 30 days/year after) but returns days rather than an AED amount and ignores salary and contract type. None is authoritative yet.
- `script.js` is not referenced by `index.html` (the page uses its own inline `<script>` instead), and it queries `#amount`/`#percentage` elements that don't exist in `index.html` (the form uses `#salary`/`#years`). Attaching it to the page as-is would throw.
- `styles.css` defines a `.button` class, but `index.html` uses `.cta-button`, which has no styles.
- `App.jsx` contains placeholder Firebase config values (`YOUR_API_KEY`, etc.) and a placeholder Formspree form ID — these are stubs, not real credentials.
- The Matter.js physics code in both React components is decorative boilerplate and does nothing meaningful.

When implementing features, prefer consolidating toward one implementation rather than extending all of them in parallel.
