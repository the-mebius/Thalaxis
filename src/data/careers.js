// Thalaxis Technology — Career Listings
// Centralized job posting data

/**
 * @typedef {Object} JobListing
 * @property {string} id - Unique job ID
 * @property {string} title - Job title
 * @property {string} department - Department/function
 * @property {string} location - Job location
 * @property {string} type - Employment type (Full-time, Part-time, Contract)
 * @property {string} description - Job description
 * @property {string[]} responsibilities - Key responsibilities
 * @property {string[]} requirements - Required qualifications
 * @property {string[]} preferred - Preferred qualifications (optional)
 * @property {boolean} active - Whether the position is currently open
 * @property {string} postedDate - ISO date string
 */

/** @type {JobListing[]} */
export const jobListings = [
  {
    id: 'eng-pressure-001',
    title: 'Senior Pressure Systems Engineer',
    department: 'Engineering',
    location: '[LOCATION_PLACEHOLDER]',
    type: 'Full-time',
    description: 'Design and validate pressure hull structures for deep submergence vehicles. Lead finite element analysis and structural optimization for extreme pressure environments.',
    responsibilities: [
      'Design pressure hull structures using FEA software (ANSYS, Abaqus)',
      'Perform structural analysis and optimization for deep ocean pressures',
      'Validate designs through hydrostatic testing protocols',
      'Collaborate with fabrication team on titanium welding procedures',
      'Document design decisions and certification test results',
    ],
    requirements: [
      'MS in Mechanical Engineering or related field',
      '5+ years experience in pressure vessel design',
      'Proficiency with ANSYS or similar FEA tools',
      'Knowledge of ASME PVHO-1 or DNV-GL Naval Vessel Rules',
      'Experience with titanium alloy materials',
    ],
    preferred: [
      'PhD in Structural Engineering',
      'Previous marine vehicle design experience',
      'Professional Engineer (PE) license',
    ],
    active: true,
    postedDate: '2026-09-15',
  },
  {
    id: 'eng-propulsion-001',
    title: 'Marine Propulsion Engineer',
    department: 'Engineering',
    location: '[LOCATION_PLACEHOLDER]',
    type: 'Full-time',
    description: 'Develop thruster systems and control algorithms for precision maneuvering in deep ocean conditions. Work with brushless motor systems and vectored propulsion.',
    responsibilities: [
      'Design and test electric thruster systems for underwater vehicles',
      'Develop motor control algorithms for precision maneuvering',
      'Integrate propulsion systems with vehicle control software',
      'Conduct hydrodynamic testing and performance optimization',
      'Specify and procure motors, controllers, and power electronics',
    ],
    requirements: [
      'BS in Electrical Engineering, Mechanical Engineering, or related field',
      'Experience with brushless motor control systems',
      'Knowledge of hydrodynamics and fluid mechanics',
      'Proficiency in MATLAB/Simulink or similar tools',
      'Hands-on hardware integration experience',
    ],
    preferred: [
      'Experience with underwater vehicle propulsion',
      'Knowledge of marine electrical systems',
      'Embedded systems programming (C/C++)',
    ],
    active: true,
    postedDate: '2026-08-22',
  },
  {
    id: 'ops-pilot-001',
    title: 'Submersible Pilot / Test Operator',
    department: 'Operations',
    location: '[LOCATION_PLACEHOLDER]',
    type: 'Full-time',
    description: 'Conduct test dives and system validation operations. Pilot submersible vehicles during certification testing and customer demonstrations. Extended sea trials required.',
    responsibilities: [
      'Pilot submersible vehicles during test dives and demonstrations',
      'Conduct pre-dive and post-dive system checks',
      'Document operational performance and system behavior',
      'Assist with maintenance and troubleshooting',
      'Travel to customer sites and test locations',
    ],
    requirements: [
      'Commercial diving certification (ADCI, IMCA, or equivalent)',
      '3+ years operating underwater vehicles or manned submersibles',
      'Valid passport and ability to travel internationally',
      'Comfortable with extended sea trials (2-4 weeks)',
      'Strong situational awareness and decision-making under pressure',
    ],
    preferred: [
      'Experience with ROVs or manned submersibles',
      'Marine engineering or technical background',
      'Hyperbaric chamber operations experience',
    ],
    active: true,
    postedDate: '2026-10-01',
  },
  {
    id: 'eng-electrical-001',
    title: 'Electrical Systems Designer',
    department: 'Engineering',
    location: '[LOCATION_PLACEHOLDER]',
    type: 'Full-time',
    description: 'Design power distribution, lighting, and sensor systems for underwater vehicles. Work with high-pressure sealed electrical systems and marine connectors.',
    responsibilities: [
      'Design electrical power distribution systems for submersibles',
      'Specify and integrate underwater connectors and cable assemblies',
      'Develop wiring schematics and electrical documentation',
      'Select batteries, power converters, and distribution hardware',
      'Conduct electrical system testing and troubleshooting',
    ],
    requirements: [
      'BS in Electrical Engineering',
      'Experience with marine electrical systems',
      'Familiarity with underwater connectors (SubConn, Seacon, etc.)',
      'Proficiency with electrical CAD tools (AutoCAD Electrical, EPLAN)',
      'Understanding of DC power systems and battery management',
    ],
    preferred: [
      'Experience with lithium-ion battery systems',
      'Knowledge of marine electrical standards (IEC 60092, IEEE 45)',
      'Embedded systems or PLC programming',
    ],
    active: true,
    postedDate: '2026-09-10',
  },
];

/**
 * Get all active job listings
 * @returns {JobListing[]}
 */
export function getActiveJobs() {
  return jobListings.filter(job => job.active);
}

/**
 * Get job by ID
 * @param {string} id - Job ID
 * @returns {JobListing|undefined}
 */
export function getJobById(id) {
  return jobListings.find(job => job.id === id);
}

/**
 * Get jobs by department
 * @param {string} department - Department name
 * @returns {JobListing[]}
 */
export function getJobsByDepartment(department) {
  return jobListings.filter(job => job.department === department && job.active);
}

/**
 * Get all unique departments
 * @returns {string[]}
 */
export function getAllDepartments() {
  const active = jobListings.filter(job => job.active);
  return [...new Set(active.map(job => job.department))];
}

export default jobListings;