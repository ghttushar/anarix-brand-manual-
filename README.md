# Anarix Brand Manual

This repo now ships the Anarix brand manual as a lightweight Vite + React single-page app.

The manual documents the locked Anarix foundation:

- official full logo
- official standalone symbol
- official brand hues
- approved light and dark usage
- exact Lottie loader source

It also includes the current Aan chapter implementation used for mascot behavior, state morphs, and in-product reference mockups.

## Project structure

- `index.html` - Vite entry shell
- `src/App.tsx` - single-scroll Anarix manual composition
- `src/components/AnarixLoader.tsx` - official loader bridge
- `src/components/Aan.tsx` - Aan mascot behavior and morph states
- `src/components/Diamond.tsx` - compact diamond reference used inside the Aan mockup section
- `src/data.ts` - brand colors and usage-rule content
- `src/styles.css` - page styling and layout
- `anarix-logo.svg` - official phase 1 Anarix full logo
- `anarix-symbol.svg` - official phase 1 Anarix standalone symbol
- `anarix-logo-loader.json` - official phase 1 logo animation source

## Local development

```bash
npm install
npm run dev
```

For a production verification pass:

```bash
npm run build
```

## Notes

- The official Anarix assets are preserved exactly and are not redrawn by the React rebuild.
- The full logo should stay on a light carrier whenever it appears in a dark context.
- The logo, symbol, and loader JSON should travel together as the source-of-truth asset package.
