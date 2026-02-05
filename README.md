# luxury-perfume-store

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Sprint 6 - UX Polish & Review

This update focuses on elevating the UI to a premium, minimal experience with improved spacing, motion, and responsive layouts.

What's included:

- New `Home` page with `HeroSection`, `ScentFamilySelector`, `BestSellersCarousel`, and an editorial About section.
- Skeleton loading components: `SkeletonCard.vue` and `SkeletonGrid.vue` with CSS shimmer.
- Micro-interactions and animations in `src/styles/animations.css`.
- Responsive adjustments and accessibility improvements.

Folder highlights:

```
src/
├─ components/
│  ├─ HeroSection.vue
│  ├─ ScentFamilySelector.vue
│  ├─ BestSellersCarousel.vue
│  ├─ SkeletonCard.vue
│  └─ SkeletonGrid.vue
├─ pages/
│  └─ Home.vue
├─ styles/
│  └─ animations.css
```

How to run locally:

```sh
npm install
npm run dev
```

Notes for portfolio:

- Visual polish aims for clean editorial spacing, high contrast, and an accent color. Replace `hero.jpg` in `public/` with a high-quality image to get the intended cinematic effect.

```
Color,Hex Code,Usage
Primary White,#FFFFFF,"Backgrounds, text on dark elements—creates airy space."
Soft Gray,#F5F5F5,"Subtle backgrounds, dividers—for depth without overwhelm."
Deep Charcoal,#333333,"Text, navigation—elegant contrast."
Gold Accent,#D4AF37,"Buttons, highlights, logo accents—subtle luxury touch."
"Optional Pastel (e.g., Soft Lavender)",#E6E0F8,For scent category highlights or hover effects—evokes floral notes without boldness.i 
```
