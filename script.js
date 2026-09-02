// Linu Teresa portfolio
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.getElementById('year').textContent = new Date().getFullYear();

// Language colour swatches (GitHub-ish)
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
  'C++': '#f34b7d', C: '#555555', 'C#': '#178600', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', Kotlin: '#A97BFF',
  Dart: '#00B4AB', 'Jupyter Notebook': '#DA5B0B', PHP: '#4F5D95', Swift: '#F05138', Vue: '#41b883',
};

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// ---------- Projects (curated; full code on GitHub) ----------
const PROJECTS = [
  {
    title: 'Bayes Execution Engine',
    lang: 'Python',
    blurb: 'A deterministic plan-and-execute engine for multi-agent pipelines that pairs LLM planning with Bayesian probabilistic modeling to eliminate hallucination loops and resolve conflicting data.',
    tags: ['LangGraph', 'MCP', 'Bayesian networks (pgmpy)', 'Multi-agent'],
    url: 'https://github.com/linuteresa/bayes-execution-engine',
  },
  {
    title: 'Biomed RAG',
    lang: 'Python',
    blurb: 'A production-shaped RAG pipeline over PubMed and PMC literature: section-aware chunking, hybrid dense plus BM25 retrieval, a labelled eval harness (Recall, nDCG, MRR), and answers with verifiable citations.',
    tags: ['RAG', 'LlamaIndex', 'Hybrid retrieval', 'Pinecone', 'Retrieval eval'],
    url: 'https://github.com/linuteresa/biomed-rag',
  },
  {
    title: 'LLM Alignment Lab',
    lang: 'Python',
    blurb: 'A from-scratch PyTorch walkthrough of the full RLHF stack (SFT, reward modeling, PPO, DPO, and GRPO), built around a reward-hacking case study on the KL penalty.',
    tags: ['PyTorch', 'RLHF', 'PPO / DPO / GRPO', 'Reward modeling'],
    url: 'https://github.com/linuteresa/llm-alignment-lab',
  },
  {
    title: 'Big Data Analytics',
    lang: 'Jupyter Notebook',
    blurb: 'Seven hands-on projects spanning the big-data stack: batch and streaming pipelines, graph and vector stores, and workflow orchestration.',
    tags: ['Apache Spark', 'Airflow', 'Dask', 'Neo4j', 'MongoDB', 'ChromaDB'],
    url: 'https://github.com/linuteresa/big-data-analytics',
  },
  {
    title: 'F1 Overtaking Analytics',
    lang: 'Jupyter Notebook',
    blurb: 'An end-to-end pipeline analyzing decades of Formula 1 race data to quantify how hard overtaking really is, with engineered features and a predictive model.',
    tags: ['pandas', 'scikit-learn', 'Feature engineering', 'Data viz'],
    url: 'https://github.com/linuteresa/Data-pipeline-and-Analytics-Framework-Formula-One-historical-data',
  },
  {
    title: 'News Agent',
    lang: 'Python',
    blurb: 'An autonomous agent that compiles and delivers a current-affairs briefing every day.',
    tags: ['Agentic AI', 'LLM tools', 'Scheduled workflows'],
    url: 'https://github.com/linuteresa/news-agent',
  },
  {
    title: 'Peekaboo',
    lang: 'JavaScript',
    blurb: 'An AI-powered interactive learning web app for preschoolers, built around a canvas play surface.',
    tags: ['JavaScript', 'Canvas 2D', 'AI tutor'],
    url: 'https://github.com/linuteresa/peekaboo-webapp',
  },
];

function renderProjects() {
  const grid = document.getElementById('github-projects-grid');
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('a');
    card.href = p.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'project-card';
    card.setAttribute('data-reveal', '');
    card.style.transitionDelay = `${Math.min(i, 6) * 55}ms`;

    const langColor = LANG_COLORS[p.lang] || '#38bdf8';
    const langHtml = p.lang
      ? `<div class="project-lang"><span class="lang-dot" style="background:${langColor}"></span>${p.lang}</div>`
      : '';
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-top">
        <i class="bi bi-github project-icon"></i>
        <span class="project-star">Code <i class="bi bi-arrow-up-right"></i></span>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-desc">${p.blurb}</p>
      ${langHtml}
      <div class="project-tags">${tags}</div>
      <div class="project-link-text">View on GitHub <i class="bi bi-arrow-right"></i></div>
    `;

    grid.appendChild(card);
    revealObserver.observe(card);
  });
}
renderProjects();

// ---------- Nav: scrolled state, active link, sliding indicator ----------
const nav = document.getElementById('nav');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const indicator = document.querySelector('.nav-indicator');
const sections = document.querySelectorAll('section');

function moveIndicator(link) {
  if (!link || !indicator) return;
  indicator.style.opacity = '1';
  indicator.style.left = `${link.offsetLeft}px`;
  indicator.style.width = `${link.offsetWidth}px`;
}

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach((section) => {
    if (window.pageYOffset >= section.offsetTop - 200) current = section.id;
  });

  let activeLink = null;
  navLinks.forEach((link) => {
    const on = link.getAttribute('href').slice(1) === current;
    link.classList.toggle('active', on);
    if (on) activeLink = link;
  });
  moveIndicator(activeLink || navLinks[0]);

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  let p = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
  p = Math.max(0, Math.min(1, p));
  targetCameraZ = 50 - p * 40;
  targetCameraY = p * 150;

  const si = document.querySelector('.scroll-indicator');
  if (si) si.style.opacity = window.pageYOffset > 200 ? '0' : '1';
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => moveIndicator(document.querySelector('.nav-links a.active') || navLinks[0]));
navLinks.forEach((link) => link.addEventListener('mouseenter', () => moveIndicator(link)));
document.querySelector('.nav-links').addEventListener('mouseleave', () =>
  moveIndicator(document.querySelector('.nav-links a.active') || navLinks[0]));

// ---------- THREE.JS BACKGROUND (particles, spiral, portal) ----------
let targetCameraZ = 50;
let targetCameraY = 0;

const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0b0d12, 0.5);
camera.position.z = 50;

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const pointLight = new THREE.PointLight(0x38bdf8, 1, 100);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xa78bfa, 1, 100);
pointLight2.position.set(-20, -20, 20);
scene.add(pointLight2);

// Coloured particle field
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1400;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 400;
  positions[i + 1] = (Math.random() - 0.5) * 400;
  positions[i + 2] = (Math.random() - 0.5) * 400;
  const hue = Math.random();
  colors[i] = Math.sin(hue * Math.PI) * 0.4 + 0.4;
  colors[i + 1] = Math.cos(hue * Math.PI) * 0.3 + 0.6;
  colors[i + 2] = 1;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
  size: 1.4, sizeAttenuation: true, transparent: true, opacity: 0.75, vertexColors: true, fog: false,
}));
scene.add(particles);

// Solid + wireframe shapes
const shapes = [];
function addSolid(geo, color, emissive, pos) {
  const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color, metalness: 0.7, roughness: 0.25, emissive, transparent: true, opacity: 0.6,
  }));
  mesh.position.set(...pos);
  scene.add(mesh);
  shapes.push(mesh);
  const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color }));
  mesh.add(wire);
  return mesh;
}
addSolid(new THREE.IcosahedronGeometry(8, 4), 0x38bdf8, 0x1e6fd0, [-30, 0, -50]);
addSolid(new THREE.OctahedronGeometry(8, 2), 0xa78bfa, 0x6d4fd0, [30, 0, -50]);
addSolid(new THREE.DodecahedronGeometry(8, 2), 0x818cf8, 0x4657d0, [0, 30, -50]);

// Spiral
const spiralGeometry = new THREE.BufferGeometry();
const spiralPositions = [];
for (let i = 0; i < 1000; i++) {
  const angle = (i / 1000) * Math.PI * 8;
  const radius = 20 + (i / 1000) * 30;
  spiralPositions.push(Math.cos(angle) * radius, (i / 1000) * 100 - 50, Math.sin(angle) * radius);
}
spiralGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(spiralPositions), 3));
const spiral = new THREE.Line(spiralGeometry, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 }));
scene.add(spiral);

// Portal rings
const portalShapes = [];
for (let i = 0; i < 5; i++) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(30 + i * 10, 2, 32, 8),
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(0.58 + i / 22, 0.75, 0.55), transparent: true, opacity: 0.3 })
  );
  ring.position.z = -i * 50;
  scene.add(ring);
  portalShapes.push(ring);
}

let portalIntensity = 0;

function animate() {
  requestAnimationFrame(animate);

  camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
  camera.position.y += (targetCameraY - camera.position.y) * 0.08;

  portalIntensity = Math.max(0, 1 - Math.min(camera.position.z / 50, 1));

  portalShapes.forEach((ring) => {
    ring.rotation.z += 0.02 + portalIntensity * 0.05;
    ring.rotation.x += 0.01 * portalIntensity;
    ring.scale.set(1 + portalIntensity * 0.5, 1 + portalIntensity * 0.5, 1);
    ring.material.opacity = 0.3 + portalIntensity * 0.5;
  });

  particles.rotation.x += 0.0002 + 0.001 * portalIntensity;
  particles.rotation.y += 0.0003 + 0.002 * portalIntensity;
  particles.scale.setScalar(1 + portalIntensity * 0.3);

  shapes.forEach((shape, index) => {
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.015;
    shape.rotation.z += 0.008;
    shape.position.y = Math.sin(Date.now() * 0.001 + index) * 15;
    shape.scale.setScalar(1 + portalIntensity * 0.8);
  });

  spiral.rotation.z += 0.005;
  spiral.scale.setScalar(1 + portalIntensity * 0.4);

  pointLight.intensity = 1 + portalIntensity * 2;
  pointLight2.intensity = 1 + portalIntensity * 2;
  camera.lookAt(0, camera.position.y, 0);

  renderer.render(scene, camera);
}

if (reduceMotion) renderer.render(scene, camera);
else animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

onScroll();
