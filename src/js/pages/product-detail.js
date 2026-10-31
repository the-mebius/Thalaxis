import { getProductBySlug, getRelatedProducts } from '../../data/products.js';
    import {
      initSmoothScroll,
      setActiveNavLink,
      initMobileMenu,
      initAccordion,
      respectReducedMotion,
      updateCopyrightYear,
      initThemeSystem
    } from '../utils.js';

    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      setActiveNavLink();
      initMobileMenu();
      updateCopyrightYear();
      initThemeSystem();

      const params = new URLSearchParams(window.location.search);
      const slug = params.get('slug');
      const root = document.getElementById('product-content-root');
      const breadcrumbCurrent = document.getElementById('breadcrumb-current');

      if (!slug) {
        window.location.href = 'products';
        return;
      }

      const product = getProductBySlug(slug);

      if (!product) {
        document.getElementById('page-title').textContent = 'Product Not Found — Thalaxis Technology';
        breadcrumbCurrent.textContent = 'Not Found';
        root.innerHTML = `
          <div style="padding: var(--space-4xl) 0; text-align: center;" class="stack-lg">
            <h2>Product not found</h2>
            <p class="soft" style="margin-inline: auto;">The requested autonomous platform specification could not be found or has been removed.</p>
            <div>
              <a href="products" class="btn btn-primary">Return to Products</a>
            </div>
          </div>
        `;
        return;
      }

      document.getElementById('page-title').textContent = product.seo.title;
      document.getElementById('page-desc').setAttribute('content', product.seo.description);
      document.getElementById('og-title').setAttribute('content', product.seo.title);
      document.getElementById('og-desc').setAttribute('content', product.seo.description);
      breadcrumbCurrent.textContent = product.name;

      const related = getRelatedProducts(slug);

      root.innerHTML = `
        <div class="product-detail-grid">
          <div class="product-main-info">
            <span class="badge badge-brand" style="margin-bottom: var(--space-md); display: inline-flex;">${product.category}</span>
            <h1 style="margin-bottom: var(--space-lg);">${product.name}</h1>
            <p class="page-lead" style="margin-bottom: var(--space-2xl);">${product.shortDescription}</p>

            <div class="row-sm" style="margin-bottom: var(--space-3xl);">
              <a href="contact?product=${product.slug}" class="btn btn-primary">Enquire / Procurement</a>
              <a href="#specifications" class="btn btn-secondary">Technical Specs</a>
            </div>

            <!-- Product Image / Visual Showcase -->
            <div class="product-visual-container card" style="margin-bottom: var(--space-3xl); padding: 0; overflow: hidden; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; background: rgba(14, 20, 29, 0.55);">
              ${product.model3D ? `
                <model-viewer src="${product.model3D}" alt="${product.name} 3D model" auto-rotate camera-controls style="width: 100%; height: 100%;"></model-viewer>
              ` : `
                <img src="${product.mainImage}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
              `}
            </div>

            <h2>Overview</h2>
            <p class="soft" style="line-height: 1.8; margin-bottom: var(--space-2xl);">${product.fullDescription}</p>

            <h2 id="features">Key Features</h2>
            <div class="features-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-xl); margin-bottom: var(--space-3xl); margin-top: var(--space-lg);">
              ${product.features.map(f => `
                <div class="card">
                  <h4 style="margin-bottom: var(--space-xs);">${f.title}</h4>
                  <p class="soft" style="font-size: 0.9375rem;">${f.description}</p>
                </div>
              `).join('')}
            </div>

            ${product.faq && product.faq.length > 0 ? `
              <h2>Frequently Asked Questions</h2>
              <div class="faq-list" style="margin-top: var(--space-lg); margin-bottom: var(--space-3xl);">
                ${product.faq.map(item => `
                  <div class="accordion-item">
                    <button class="accordion-trigger">
                      ${item.question}
                      <span class="accordion-icon">+</span>
                    </button>
                    <div class="accordion-content">
                      <div class="accordion-body">
                        ${item.answer}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Sidebar Specifications -->
          <aside class="product-sidebar">
            <div id="specifications" class="card" style="position: sticky; top: 100px;">
              <h3 style="font-size: 1.25rem; margin-bottom: var(--space-lg); border-bottom: 1px solid var(--color-line); padding-bottom: var(--space-md);">Technical Specifications</h3>
              <table class="spec-table">
                ${product.specifications.map(spec => `
                  <tr>
                    <th>${spec.label}</th>
                    <td>${spec.value}</td>
                  </tr>
                `).join('')}
              </table>

              <div style="margin-top: var(--space-2xl);">
                <a href="contact?product=${product.slug}" class="btn btn-primary" style="width: 100%; justify-content: center;">Request Specification Sheet</a>
              </div>
            </div>
          </aside>
        </div>

        ${related.length > 0 ? `
          <div style="margin-top: var(--space-6xl); border-top: 1px solid var(--color-line); padding-top: var(--space-4xl);">
            <h2 style="margin-bottom: var(--space-2xl);">Related Systems</h2>
            <div class="product-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2xl);">
              ${related.map(rel => `
                <article class="card" style="padding: 0; overflow: hidden;">
                  <div style="height: 200px; overflow: hidden;">
                    <img src="${rel.mainImage}" alt="${rel.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                  </div>
                  <div style="padding: var(--space-xl);">
                    <span class="badge badge-brand" style="margin-bottom: var(--space-md); display: inline-flex;">${rel.category}</span>
                    <h3 style="margin-bottom: var(--space-sm);">${rel.name}</h3>
                    <p class="soft" style="margin-bottom: var(--space-xl);">${rel.shortDescription}</p>
                    <a href="product-detail?slug=${rel.slug}" class="btn btn-secondary">View System</a>
                  </div>
                </article>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;

      initAccordion();
      respectReducedMotion();
    });