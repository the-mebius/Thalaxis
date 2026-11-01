// Thalaxis Technology — Product Data Model
// Centralized product information with imagery and specifications.

/**
 * @typedef {Object} ProductSpec
 * @property {string} label - Specification label
 * @property {string} value - Specification value
 */

/**
 * @typedef {Object} ProductFeature
 * @property {string} title - Feature title
 * @property {string} description - Feature description
 */

/**
 * @typedef {Object} ProductFAQItem
 * @property {string} question - Question text
 * @property {string} answer - Answer text
 */

/**
 * @typedef {Object} Product
 * @property {string} slug - URL-safe identifier
 * @property {string} name - Product name
 * @property {string} category - Product category
 * @property {string} shortDescription - Brief description for cards
 * @property {string} fullDescription - Detailed description for product page
 * @property {string} mainImage - Path to main product image or rendering
 * @property {string[]} galleryImages - Array of gallery image paths
 * @property {ProductSpec[]} specifications - Technical specifications
 * @property {ProductFeature[]} features - Key features
 * @property {string|null} model3D - Path to 3D model file (GLB/GLTF)
 * @property {ProductFAQItem[]} faq - Product-specific FAQ
 * @property {string[]} relatedProducts - Array of related product slugs
 * @property {Object} seo - SEO metadata
 * @property {string} seo.title - SEO title
 * @property {string} seo.description - SEO description
 */

/** @type {Product[]} */
export const products = [
  {
    slug: 'autonomous-surface-vessel',
    name: 'Autonomous Surface Vessel (ASV)',
    category: 'Surface Vessel',
    shortDescription: 'An intelligent autonomous marine platform designed to support modern maritime operations through AI-powered navigation and modular sensor integration.',
    fullDescription: 'The Autonomous Surface Vessel (ASV) is an intelligent autonomous marine platform designed to support modern maritime operations through AI-powered navigation, modular sensor integration, and adaptive mission configurations. Purpose-built for port operations, marine surveying, and environmental monitoring with indigenous engineering at its core.',
    mainImage: './img/ship1.jpg',
    galleryImages: ['./img/ship2.jpg', './img/ship3.jpg'],
    specifications: [
      { label: 'Platform Type', value: 'Autonomous Surface Vessel (ASV)' },
      { label: 'Navigation', value: 'AI-Powered Autonomous / Remote' },
      { label: 'Endurance', value: '24+ hours operational' },
      { label: 'Propulsion system', value: 'Electric / Hybrid vectored drive' },
      { label: 'Hull material', value: 'Marine-grade composite / Aluminum' },
      { label: 'Payload Capacity', value: 'Up to 500 kg modular payload' },
      { label: 'Dimensions (L×W×H)', value: '6.0m × 2.2m × 1.8m' },
      { label: 'Weight (dry)', value: '1,800 kg' },
      { label: 'Communication', value: 'Satellite, 4G/5G, RF Line-of-Sight' },
    ],
    features: [
      {
        title: 'AI-Powered Navigation',
        description: 'Advanced collision avoidance, autonomous waypoint navigation, and COLREGs-compliant path planning.',
      },
      {
        title: 'Modular Payload Bay',
        description: 'Interchangeable payload skids for hydrographic surveying, water quality monitoring, and security patrols.',
      },
      {
        title: 'Extended Endurance',
        description: 'Hybrid power architecture enabling 24+ continuous hours of uninterrupted marine missions.',
      },
      {
        title: 'Real-Time Telemetry',
        description: 'Encrypted multi-link telemetry streaming live sensor data and HD video feeds to command centers.',
      },
    ],
    model3D: './model/asv assembly.glb',
    faq: [
      {
        question: 'What is the primary mission profile for the ASV?',
        answer: 'The ASV is designed for hydrographic surveying, port security, environmental monitoring, and coastal defense support.',
      },
      {
        question: 'Can the ASV operate fully autonomously?',
        answer: 'Yes. It features advanced autonomous navigation with obstacle avoidance and can also be teleoperated from shore stations or support vessels.',
      },
    ],
    relatedProducts: ['deep-submergence-unit'],
    seo: {
      title: 'Autonomous Surface Vessel (ASV) — Thalaxis Technology',
      description: 'Intelligent autonomous marine platform for port operations, surveying, and environmental monitoring.',
    },
  },
  {
    slug: 'deep-submergence-unit',
    name: 'Deep Submergence Unit (AUV)',
    category: 'Deep Submergence',
    shortDescription: 'An underwater robotic platform engineered for subsea operations with integrated vehicle control and real-time acoustic telemetry.',
    fullDescription: 'The Deep Submergence Unit (AUV) is an advanced underwater robotic platform engineered for subsea operations—featuring integrated vehicle control, real-time acoustic telemetry, and mission-specific sensor payloads. Designed for underwater surveying, marine research, and subsea infrastructure inspection at extreme depths.',
    mainImage: './img/11.png',
    galleryImages: ['./img/22.png', './img/33.png'],
    specifications: [
      { label: 'Platform Type', value: 'Autonomous Underwater Vehicle (AUV)' },
      { label: 'Maximum Operating Depth', value: 'Up to 6,000 meters' },
      { label: 'Endurance', value: '20+ hours mission duration' },
      { label: 'Propulsion system', value: 'Brushless DC rim-driven thrusters' },
      { label: 'Pressure Hull', value: 'Titanium Grade 5 / Syntactic foam' },
      { label: 'Sonar & Sensing', value: 'Side-scan sonar & multibeam echo sounder' },
      { label: 'Dimensions (L×W×H)', value: '3.8m × 0.65m × 0.65m' },
      { label: 'Weight (dry)', value: '650 kg' },
      { label: 'Acoustic Communication', value: 'High-speed underwater modem' },
    ],
    features: [
      {
        title: 'Hadal-Rated Subsea Engineering',
        description: 'Engineered with titanium pressure vessels and syntactic foam flotation for extreme depths up to 6,000 meters.',
      },
      {
        title: 'Autonomous Surveying',
        description: 'Pre-programmed bathymetric and side-scan sonar mapping with high-precision inertial navigation systems.',
      },
      {
        title: 'Acoustic Telemetry',
        description: 'Robust subsurface acoustic communication for mission monitoring and abort commands.',
      },
      {
        title: 'Modular Payloads',
        description: 'Configurable instrument bays for oceanographic sensors, cameras, and magnetic anomaly detectors.',
      },
    ],
    model3D: './model/auv assembly.glb',
    faq: [
      {
        question: 'What is the maximum depth rating for the AUV?',
        answer: 'The Deep Submergence Unit is rated for operations down to 6,000 meters, covering over 98% of the world ocean floor.',
      },
      {
        question: 'How is navigation handled underwater where GPS is unavailable?',
        answer: 'The AUV utilizes an advanced Inertial Navigation System (INS) coupled with DVL (Doppler Velocity Log) and acoustic positioning beacons.',
      },
    ],
    relatedProducts: ['autonomous-surface-vessel'],
    seo: {
      title: 'Deep Submergence Unit (AUV) — Thalaxis Technology',
      description: 'Advanced underwater robotic platform engineered for subsea surveying and inspection at extreme depths up to 6,000 meters.',
    },
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

export function getRelatedProducts(slug) {
  const product = getProductBySlug(slug);
  if (!product || !product.relatedProducts) return [];
  return product.relatedProducts
    .map(relatedSlug => getProductBySlug(relatedSlug))
    .filter(Boolean);
}

export function getAllCategories() {
  return [...new Set(products.map(p => p.category))];
}
