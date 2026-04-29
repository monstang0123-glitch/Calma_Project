# Calma — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | React DOM renderer |
| react-router-dom | ^7.0 | Client-side routing (Home, 404) |
| gsap | ^3.12 | Core animation engine (ScrollTrigger, SplitText plugins) |
| lenis | ^1.2 | Smooth scroll with inertia |
| three | ^0.170 | WebGL shader background (raw) |
| @fontsource/zen-old-mincho | ^5.0 | Serif display font (self-hosted) |
| @fontsource/outfit | ^5.0 | Sans-serif body font (self-hosted) |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| typescript | ^5.7 | Type checking |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.0 | React Vite plugin |

No shadcn/ui components required — all UI is custom-built to match the warm minimal aesthetic.

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navigation | Custom | Global | Desktop pill bar + mobile fullscreen overlay; theme toggle; scroll-aware backdrop blur |
| Footer | Custom | Global | 4-column grid, dark green background |
| GrainOverlay | Custom | Global | Fixed viewport overlay, 5% opacity, `mix-blend-mode: color` |
| SmoothScrollProvider | Custom (Lenis) | Global | Wraps app, initializes Lenis, syncs with GSAP ScrollTrigger |
| ShaderBackground | Custom (Three.js) | Global | Full-viewport fixed canvas, always rendering behind content |

### Sections (Home)

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | 20-layer parallax image strips, character text reveal, WebGL shader, scroll indicator |
| ArtistsSection | Custom | Editorial intro with 4-column photo grid, content mask reveal |
| CatalogSection | Custom | 9-card grid with staggered clip-path reveal, "Load More" 3D exit animation |
| FeaturesSection | Custom | 4 genre gradient cards with horizontal carousels + 3 feature text columns |
| FAQSection | Custom | 6-item accordion with rotate arrow, single-open behavior |
| StoriesSection | Custom | Newsletter CTA with email input and subscribe button |

### Sections (404)

| Component | Source | Notes |
|-----------|--------|-------|
| NotFoundSection | Custom | Centered image with parallax, back link |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| CharacterReveal | Custom | Hero, Artists, Catalog, FAQ, Stories | SplitText + staggered translateY animation, scroll-triggered or load-triggered |
| ContentMaskReveal | Custom | Artists, Features, Stories | Desktop: circular gradient mask (CSS var `--reveal-progress`); Mobile: horizontal clip-path wipe |
| ScrollIndicator | Custom | Hero | Bouncing arrow, fades after scrolling past hero |
| GenreCard | Custom | FeaturesSection | Gradient background card with image carousel |
| AlbumCard | Custom | CatalogSection | Image + title + genre pill + description + link |
| FAQItem | Custom | FAQSection | Accordion item with animated height + rotating arrow |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Access Lenis instance for scroll position/progress in components |
| useScrollProgress | Returns normalized scroll progress for a given ref (0 → 1) |
| useTheme | Manages light/dark theme state, persists to localStorage, syncs with HTML class |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| 🔒 WebGL audio-reactive shader | Three.js raw | Custom ShaderMaterial on fullscreen quad. Fragment shader uses sinusoidal combinations + fbm Perlin noise for organic blob shapes. Color palette cycling (white→gold→gray→black) over 10s via uniform. Rendered on fixed canvas behind all content, z-index 0. | **High** |
| 🔒 20-layer parallax system | GSAP ScrollTrigger + Lenis | Hero image sliced into 20 horizontal strips (CSS `clip-path: inset()` per strip). Each strip and each background shape layer assigned a speed multiplier (0.25x–3.5x). ScrollTrigger scrubs translateY on all 40 elements simultaneously. Lenis provides interpolated scroll position. | **High** |
| 🔒 Content mask reveal (desktop) | GSAP ScrollTrigger + CSS vars | ScrollTrigger scrubs a CSS custom property `--reveal-progress` (0→1) per section. CSS `mask-image` uses radial-gradient with size driven by the variable (100vh → 15vh). `backdrop-filter: blur()` transitions 20px → 0px. Applied via a wrapper component around each section. | **High** |
| 🔒 Content mask reveal (mobile) | GSAP ScrollTrigger | Horizontal `clip-path: inset()` wipe from `inset(0 100% 0 0)` to `inset(0 0% 0 0)`, scrubbed by ScrollTrigger. Media query switches between desktop/mobile approaches. | **Medium** |
| 🔒 Text character reveal | GSAP + SplitText | SplitText splits heading into chars. GSAP `from()` with `translateY(-50px)`, `opacity: 0`, stagger 25ms, duration 500ms, ease-out. Hero variant: triggered on load (500ms delay). Section variant: ScrollTrigger `onEnter` with threshold 0.5 (desktop) / 0 (mobile). Reusable CharacterReveal component accepts trigger mode. | **Medium** |
| 🔒 Card 3D disappearance | GSAP | On "Load More" click: all cards animate with `perspective(100px) rotateY(20deg) translateX(100vw)`, duration 3000ms. Callback re-renders grid in random order after animation completes. | **Medium** |
| 🔒 Smooth scrolling | Lenis | Global Lenis instance with `lerp: 0.1`. Integrated with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add()` for frame sync. | **Medium** |
| Card staggered clip-path reveal | GSAP ScrollTrigger | `clipPath: inset(0 0% 0 100%)` → `inset(0 0 0 0)`, stagger 150ms, ease-out, triggered on viewport enter. | **Low** |
| FAQ accordion expand/collapse | GSAP | Arrow rotation 0→90° (300ms). Answer container: GSAP `height: 0` → `height: auto` (500ms, ease-out). Single-open: close previously open item before opening new one. | **Low** |
| Nav active indicator slide | GSAP | `translateX` animation of a pill element to position behind the active nav link. Smooth transition on route/scroll change. | **Low** |
| Scroll indicator bounce | CSS @keyframes | `translateY(0→10px→0)`, 1s ease-in-out infinite. Fades out (opacity→0) via ScrollTrigger when scroll > 100vh. | **Low** |
| Mobile menu open/close | GSAP | Full-screen overlay: opacity 0→1, 300ms. Menu items: staggered fade-in from bottom. Close button: scale 0→1. | **Low** |
| Button hover underline | CSS | `::after` pseudo-element, `scaleX(0→1)` on hover, 300ms ease. | **Low** |
| Genre card image carousel | CSS + JS | Horizontal overflow container with `scroll-snap-type: x mandatory`. Touch/drag via native scroll on mobile, optional smooth scroll buttons on desktop. | **Low** |
| Grain texture overlay | CSS | Fixed-position div with repeating background image, `opacity: 0.05`, `mix-blend-mode: color`, `pointer-events: none`. | **Low** |
| Nav backdrop blur on scroll | CSS + ScrollTrigger | Toggle class when scroll > threshold: `backdrop-filter: blur(20px)`, `background: rgba(255,255,255,0.6)`. | **Low** |
| Theme toggle | CSS + JS | Toggle `dark` class on `<html>`. All colors use CSS custom properties driven by the class. Transition on background/text colors. | **Low** |
| 404 image parallax | GSAP ScrollTrigger | Single element `translateY` scrubbed at 0.5x scroll speed. | **Low** |

---

## State & Logic Plan

### Theme Management (useTheme hook)

A lightweight context provider managing a binary `theme` state (light/dark). On mount, reads `localStorage` for persisted preference or falls back to `prefers-color-scheme`. Toggles a `dark` class on `<html>`. All themed colors are CSS custom properties scoped to `:root` and `html.dark`, so no JS re-renders are needed when theme changes — the CSS cascade handles it.

### Lenis ↔ GSAP ScrollTrigger Bridge

Lenis must own the scroll loop. The bridge consists of:
1. `lenis.on('scroll', ScrollTrigger.update)` — feeds Lenis scroll position into GSAP
2. `gsap.ticker.add((time) => lenis.raf(time * 1000))` — drives Lenis from GSAP's ticker
3. `gsap.ticker.lagSmoothing(0)` — disables GSAP's lag smoothing to prevent conflicts

This bridge is initialized once in `SmoothScrollProvider` and the Lenis instance is exposed via React context for components that need direct scroll control (e.g., Hero parallax may need raw scroll progress).

### Parallax Layer Speed Mapping

The 20-layer parallax system requires a deterministic speed assignment. Define a `PARALLAX_SPEEDS` array of 20 float values (0.25 to 3.5, roughly linearly distributed). Each layer index maps to its speed. The scroll-driven translateY offset for each layer is calculated as: `offset = scrollY * speed * direction`, where direction alternates per layer to create opposing motion vectors (layers 1-10 move up, 11-20 move down). This produces the depth illusion.

### Hero Image Slicing

The hero image is conceptually sliced into 20 horizontal strips using CSS `clip-path: inset(y% 0 (100-y-5)% 0)` where each strip shows a 5% vertical slice of the image. Each strip is a separate absolutely-positioned element sized to fill the viewport, with `clip-path` constraining which portion of the underlying image is visible. All strips share the same background image but show different vertical segments. This is done via inline styles generated from a `SLICE_COUNT = 20` constant.

### FAQ Accordion Single-Open Logic

Track the currently open FAQ index in `FAQSection` state (`activeIndex: number | null`). When a user clicks an item: if it's already open, close it (set to null); otherwise, set to the new index. The closing animation of the previous item and opening animation of the new item should overlap briefly (not sequential) for a snappier feel. Use GSAP timeline with `overlapping: true` or trigger both animations independently.

### Catalog "Load More" Card Sorting

On "Load More" click: (1) animate out all cards with the 3D exit, (2) on animation complete, shuffle the album data array (Fisher-Yates), (3) re-render grid, (4) animate in new cards with the staggered clip-path reveal. Use a `key` change on the grid container to force remount, or manage the shuffle in state with a `version` counter that triggers the enter animation.

---

## Other Key Decisions

### Raw Three.js over React Three Fiber

The WebGL requirement is a single fullscreen shader with no scene graph, no 3D objects, and no interactivity. React Three Fiber's declarative model adds abstraction overhead without benefit. Raw Three.js with a single `ShaderMaterial` on a `PlaneGeometry(2,2)` is more direct and keeps the bundle smaller. The canvas is mounted once in `ShaderBackground` and runs independently of React's render cycle.

### GSAP SplitText over manual splitting

Character-by-character text animation requires robust text splitting that handles wrapping, nested elements, and responsive reflow. GSAP's SplitText plugin handles edge cases (CJK text, emoji, nested tags) that manual string-splitting would miss. The plugin is included with the GSAP Club license, which is standard for premium animation work.

### No shadcn/ui

The design is entirely bespoke — every element has custom styling (no standard button patterns, no card shadows, no default form styling). Using shadcn would require overriding every default, defeating its purpose. All components are custom-built with Tailwind utilities.

### Routing Strategy

Two routes: `/` (Home) and `*` (404). React Router v7 with `BrowserRouter`. The 404 route renders a minimal page with the NotFoundSection. The Navigation component reads the current route to highlight the active link.
