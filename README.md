# Anarix Brand Manual

This repo now ships the Anarix brand manual as a lightweight Vite + React single-page app.

Phase 1 remains the locked Anarix foundation:

- official full logo
- official standalone symbol
- official brand hues
- approved light and dark usage
- exact Lottie loader source

Phase 2 extends that same manual with an interactive Aan chapter:

- Aan meaning and full form
- live mascot state demos
- guided assistant flow inspired by Aria-style system behavior
- source-backed placement mockups tied to the current Anarix app
- implementation-ready surface and motion rules

## Project structure

- `index.html` - Vite entry shell
- `src/App.tsx` - single-scroll manual composition
- `src/components/` - Aan mascot, guided demo, placement catalog, and loader bridge
- `src/data.ts` - shared state contract and manual content model
- `src/styles.css` - page styling, mascot motion, and demo surfaces
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
- The Aan chapter is a brand-manual demo layer, not a direct implementation inside the live app.
- Placement guidance is based on the analyzed Anarix app source and screenshots stored in this repo.
