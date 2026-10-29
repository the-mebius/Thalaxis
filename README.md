# Thalaxis Technology — Corporate Website &amp; Submersible Systems Platform

Production-ready, art-directed corporate website for Thalaxis Technology, engineered with exceptional typography, restrained visual language, robust technical SEO, accessibility compliance, and typed product data models.

## Technology Stack

- **Framework / Bundler:** Vite 5 (Static Site Generation / Multi-page app)
- **Language:** JavaScript (ES Modules) / Strict typed data models (`products.js`, `careers.js`, `company.js`)
- **Styling:** Custom CSS design system with design tokens (`tokens.css`), base styles, and component architecture
- **3D Viewer:** Google `model-viewer` integration for GLB/GLTF submersibles
- **Accessibility:** WCAG 2.2 AA compliant focus states, keyboard navigation, and reduced motion support

---

## Route Map

1. `/` (`src/index.html`) — Homepage with cinematic video hero, introduction, featured certified systems, capabilities, journey preview, and FAQ accordion.
2. `/about` (`src/about.html`) — Company profile, purpose, engineering capabilities, mission/vision, chronological timeline, and leadership.
3. `/products` (`src/products.html`) — Product discovery catalog featuring titanium submersibles.
4. `/products/[slug]` (`src/product-detail.html?slug=...`) — Dynamic product detail template supporting technical specs, key features, 3D model viewer, FAQ, and related products.
5. `/contact` (`src/contact.html`) — Enquiries and procurement contact form with client-side validation and secure submission adapter.
6. `/careers` (`src/careers.html`) — Active job listings with department filters and interactive application modal.
7. `/privacy-policy` (`src/privacy-policy.html`) — Legal privacy policy document.
8. `/terms-and-conditions` (`src/terms-and-conditions.html`) — Terms and conditions document.
9. `/404` (`src/404.html`) — Custom not-found error page.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

```bash
npm install
```

### Development Server

Run the Vite development server with hot module replacement:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

Build optimized static assets into the `dist/` directory:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## Maintenance &amp; Content Updates

- **Adding or Updating Products:** Edit `src/data/products.js`. Add new product objects with slug, name, category, specifications, features, and SEO metadata.
- **Updating Company Information:** Edit `src/data/company.js` to update milestones, stats, or contact details.
- **Managing Job Openings:** Edit `src/data/careers.js` to add, update, or deactivate career postings.
- **Replacing Homepage Video:** Place optimized web video files (`hero.mp4`, `hero.webm`) and poster image (`hero-poster.jpg`) in `public/assets/` and update the `<video>` source in `src/index.html`.
- **Adding 3D Models:** Place `.glb` or `.gltf` model files in `public/assets/models/` and link them in `src/data/products.js`.

---

## SEO &amp; Search Console Deployment

1. **Verify Ownership:** Add your domain verification meta tag or HTML file to `public/`.
2. **Submit Sitemap:** Submit `https://www.thalaxistechnology.in/sitemap.xml` in Google Search Console.
3. **Robots.txt:** Configured via `public/robots.txt` to allow indexing of all public routes while pointing to the sitemap.
4. **Structured Data:** Organization schema included on the homepage and appropriate metadata across all routes.

---

## License

MIT License — Thalaxis Technology.
