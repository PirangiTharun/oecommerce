# AYRA FARMS — Cinematic Organic Luxury Website

A living, scroll-driven brand experience for AYRA FARMS' premium natural powders. Apple-grade storytelling fused with organic wellness aesthetics — cinematic, immersive, alive.

## Brand System

- **Palette**: Forest Green `#1f4d36`, Sage `#7a9b76`, Cream `#f7f4ed`, Beige `#e7dbc7`, Turmeric Gold `#d9a321`, Earth Brown `#4b3425`, Lavender accent.
- **Type**: Oversized cinematic display serif (Fraunces) for headlines, clean grotesque (Inter / Geist) for body. Strong hierarchy, generous whitespace.
- **Surfaces**: Glassmorphism cards, soft organic gradients, grain texture overlay, golden-hour lighting.

## Signature Interactive Layer (global)

- **Custom organic cursor (desktop)**: a soft glowing seed-pod that sprouts a tiny leaf trail; on hover over interactive elements it blooms; magnetic snap to buttons.
- **Preloader — "Germination"**: dark earth screen, a seed drops, cracks, a single sprout unfurls upward while the wordmark **AYRA FARMS** assembles from drifting particles, then a warm sunrise wash transitions into the homepage.
- **Particle ecosystem**: pollen, turmeric dust, petals, light rays drifting across every page; reacts subtly to cursor + scroll velocity.
- **Lenis smooth scroll** + GSAP ScrollTrigger across all pages.
- **Breathing UI**: gentle sway/pulse on plants, hero elements, gradient drift.
- **Section transitions**: powder-burst, leaf-sweep, water-ripple, petal-dissolve.
- **Day-to-night journey**: page background lighting shifts with scroll depth (morning → golden hour → evening).
- **Mobile**: cursor disabled, particle counts reduced, scroll story converted to swipe-friendly stacked reveals; all motion respects `prefers-reduced-motion`.

## Pages

### 1. Home — the cinematic journey
- Hero: R3F scene of a seed falling into soil. Scroll grows it through rain → roots → sprout → fruiting plant → harvest → grinding → finished AYRA powder jar. Headline "Pure Nature. Premium Powders." with magnetic CTAs *Explore Products* / *Request Bulk Order*.
- Scroll storytelling band: morning farmland → wind in crops → harvest → drying → grinding → slow-mo powder explosion → premium pack reveal.
- Root Network: animated SVG roots branch beneath the About teaser; hover branches reveal glowing cards (Sustainability, Organic Farming, Hygiene, Nutrient Preservation, Export Quality, Private Labeling).
- Parallax ecosystem: 3 depth layers (mountains/sky • plants/fruits • leaves/petals/powder).
- Why Choose Us — 7 glass cards with particle-reactive hover.
- Industries We Serve — animated tiles (Food & Beverage, Nutraceuticals, Cosmetics, Herbal Medicine, Wellness, Retail, Bulk Mfg).
- Final CTA: ecosystem fully bloomed, logo re-forms from particles. "Bring Nature Into Every Product." → Contact / Sample / Bulk.

### 2. About
- Origin story of Gauribidanur farm, philosophy, process pillars.
- Full-page Root Network as primary navigation device.
- Timeline of seed → harvest → powder with scroll-pinned visuals.

### 3. Products (index)
- Apple-style cinematic grid: massive product names, scroll-snap reveals, ingredient morph thumbnails.
- **Interactive Product Orbit**: R3F floating ring of all 17 powders rotating in 3D; hover enlarges, click zooms in.
- Filters: Vegetable / Fruit / Flower / Herbal.

### 4. Product Detail (one page per powder, dynamic route)
All 17 powders: Turmeric, Garlic, Onion, Tomato, Pumpkin, Mango, Papaya, Papaya Seed, Banana, Guava, Apple, Pomegranate, Hibiscus, Rose Petal, Chamomile, Calendula, Lavender.
- Hero ingredient morphs into powder via scroll.
- **Microscopic nutrient view**: zoom into texture, glowing vitamin/antioxidant particles (Apple-chip-style).
- **Scent visualization**: color-tinted aroma waves unique to each powder (lavender purple, turmeric gold heat, rose crimson trail).
- Sections: Uses · Benefits · Key Features · Industry Applications · Nutritional Highlights · Request Sample CTA.

### 5. Industries
- Seven immersive cards, each opening into a mini scene showing how AYRA powders serve that industry.

### 6. Sustainability
- Root network revisited as a full ecosystem map.
- Pillars: organic processing, chemical-free, hygienic production, nutrient preservation, export quality.
- Interactive **India sourcing map** — ingredients emerge from regions with supply-chain storytelling.

### 7. Contact
- Glassmorphic form (name, company, email, phone, message) with Zod validation.
- WhatsApp CTA → `+91 7899868441`, mailto `info@ayrafarms.com`.
- Embedded Google Map of Gauribidanur.
- "Touch the earth" hero: cursor moves grass, disperses dust/pollen.

### 8. Bulk Order Inquiry
- Multi-step form: company info → products & quantities (multi-select all 17) → packaging/private-label options → timeline → submit.
- Submissions stored in Lovable Cloud (table `bulk_inquiries`); confirmation email via edge function (optional, can be wired later).

## Imagery (AI-generated)
Generate a cohesive on-brand image set with Nano Banana Pro and save to `src/assets/`:
- Hero farmland (golden hour, Karnataka landscape)
- Soil + seed macro
- Process shots: harvesting, sun-drying, grinding, packaging
- One signature ingredient + powder pairing image per product (17)
- Ecosystem / sustainability hero
- Contact "earth" hero
All generated with consistent cinematic warm-light look and shallow depth of field.

## Tech Notes (technical section)
- TanStack Start (project default) with file-based routes under `src/routes/` — one route per page above; product details at `src/routes/products.$slug.tsx`.
- Libraries: `framer-motion`, `gsap` (+ ScrollTrigger), `@studio-freight/lenis`, `@react-three/fiber`, `@react-three/drei`, `three`, `lottie-react`, `zod`, `react-hook-form`.
- 3D scoped to: hero growth scene, product orbit, microscopic nutrient view. Everything else uses GSAP/Framer/CSS + a lightweight 2D canvas particle system to keep FPS high.
- Lovable Cloud: tables `bulk_inquiries`, `contact_messages`, `sample_requests` with RLS (public insert, admin select via `user_roles`).
- Performance: code-split heavy R3F scenes with `React.lazy`, suspend until in-view, mobile fallbacks to static gradients + Framer.
- SEO: per-route `head()` with title/description/og:title/og:description/og:image; sitemap-friendly slugs.
- Accessibility: full keyboard nav, focus rings, reduced-motion fallbacks, semantic landmarks.

## Build Order
1. Brand tokens, fonts, Lenis, particle system, custom cursor, preloader.
2. Generate AI imagery set.
3. Home page (hero R3F + scroll story + root network + sections).
4. Products index + Product Orbit + dynamic product detail template.
5. About, Industries, Sustainability (with India map), Contact, Bulk Inquiry.
6. Cloud tables + form wiring.
7. Mobile polish, performance pass, QA across routes.

This is a large, multi-iteration build. After approval I'll start with foundation + home page, then iterate page by page.