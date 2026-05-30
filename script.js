// --- GITHUB FETCH LOGIC ---
const GITHUB_USERNAME = 'linuteresa';

async function fetchGitHubProjects() {
  const grid = document.getElementById('github-projects-grid');

  try {
    // /starred returns repos this user has starred
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100`);

    if (!response.ok) throw new Error('Network response was not ok');
    const repos = await response.json();

    const topRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12);

    topRepos.forEach(repo => {
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = 'project-card';
      card.style.display = 'flex';
      card.style.textDecoration = 'none';
      card.style.color = 'inherit';

      const formattedTitle = repo.name.replace(/[-_]/g, ' ');
      const description = repo.description || 'Check out this project on GitHub for more details.';

      // Handle tags
      let tagsHtml = '';
      if (repo.topics && repo.topics.length > 0) {
        tagsHtml = repo.topics.slice(0, 4).map(topic => `<span class="tag">${topic}</span>`).join('');
      } else if (repo.language) {
        tagsHtml = `<span class="tag">${repo.language}</span>`;
      }

      card.innerHTML = `
        <div class="project-header">
          <i class="bi bi-github project-icon"></i>
        </div>
        <h3 class="project-title">${formattedTitle}</h3>
        <p class="project-desc">${description}</p>
        <div class="project-tags">
          ${tagsHtml}
        </div>
        <div class="project-link-text">
          View Repository <i class="bi bi-arrow-right"></i>
        </div>
      `;

      grid.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    grid.innerHTML = '<p style="color: #aaa;">Unable to load projects at this time. Please visit my GitHub profile directly.</p>';
  }
}

fetchGitHubProjects();

// --- THREE.JS BACKGROUND SCENE ---
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a0a, 0.5);
renderer.shadowMap.enabled = true;
camera.position.z = 50;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(20, 20, 20);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100);
pointLight2.position.set(-20, -20, 20);
pointLight2.castShadow = true;
scene.add(pointLight2);

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1500;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 400;
  positions[i + 1] = (Math.random() - 0.5) * 400;
  positions[i + 2] = (Math.random() - 0.5) * 400;

  const hue = Math.random();
  colors[i] = Math.sin(hue * Math.PI) * 0.5 + 0.5;
  colors[i + 1] = Math.cos(hue * Math.PI) * 0.5 + 0.5;
  colors[i + 2] = 1;
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
  size: 1.5,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.8,
  vertexColors: true,
  fog: false
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

const shapes = [];

const icosahedronGeo = new THREE.IcosahedronGeometry(8, 4);
const icosahedronMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0x00aaff,
  wireframe: false,
  transparent: true,
  opacity: 0.7
});
const icosahedron = new THREE.Mesh(icosahedronGeo, icosahedronMaterial);
icosahedron.position.set(-30, 0, -50);
icosahedron.castShadow = true;
icosahedron.receiveShadow = true;
scene.add(icosahedron);
shapes.push(icosahedron);

const icosahedronWire = new THREE.EdgesGeometry(icosahedronGeo);
const icosahedronWireMat = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 });
const icosahedronWireframe = new THREE.LineSegments(icosahedronWire, icosahedronWireMat);
icosahedron.add(icosahedronWireframe);

const octahedronGeo = new THREE.OctahedronGeometry(8, 2);
const octahedronMaterial = new THREE.MeshStandardMaterial({
  color: 0xff00ff,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0xff00aa,
  wireframe: false,
  transparent: true,
  opacity: 0.7
});
const octahedron = new THREE.Mesh(octahedronGeo, octahedronMaterial);
octahedron.position.set(30, 0, -50);
octahedron.castShadow = true;
octahedron.receiveShadow = true;
scene.add(octahedron);
shapes.push(octahedron);

const octahedronWire = new THREE.EdgesGeometry(octahedronGeo);
const octahedronWireMat = new THREE.LineBasicMaterial({ color: 0xff00ff, linewidth: 2 });
const octahedronWireframe = new THREE.LineSegments(octahedronWire, octahedronWireMat);
octahedron.add(octahedronWireframe);

const dodecahedronGeo = new THREE.DodecahedronGeometry(8, 2);
const dodecahedronMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff88,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0x00ff88,
  wireframe: false,
  transparent: true,
  opacity: 0.7
});
const dodecahedron = new THREE.Mesh(dodecahedronGeo, dodecahedronMaterial);
dodecahedron.position.set(0, 30, -50);
dodecahedron.castShadow = true;
dodecahedron.receiveShadow = true;
scene.add(dodecahedron);
shapes.push(dodecahedron);

const dodecahedronWire = new THREE.EdgesGeometry(dodecahedronGeo);
const dodecahedronWireMat = new THREE.LineBasicMaterial({ color: 0x00ff88, linewidth: 2 });
const dodecahedronWireframe = new THREE.LineSegments(dodecahedronWire, dodecahedronWireMat);
dodecahedron.add(dodecahedronWireframe);

const spiralGeometry = new THREE.BufferGeometry();
const spiralPositions = [];
for (let i = 0; i < 1000; i++) {
  const angle = (i / 1000) * Math.PI * 8;
  const radius = 20 + (i / 1000) * 30;
  spiralPositions.push(
    Math.cos(angle) * radius,
    (i / 1000) * 100 - 50,
    Math.sin(angle) * radius
  );
}
spiralGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(spiralPositions), 3));
const spiralMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4 });
const spiral = new THREE.Line(spiralGeometry, spiralMaterial);
scene.add(spiral);

const portalShapes = [];
for (let i = 0; i < 5; i++) {
  const ringGeo = new THREE.TorusGeometry(30 + i * 10, 2, 32, 8);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setHSL(i / 5, 1, 0.5),
    transparent: true,
    opacity: 0.3
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.z = -i * 50;
  scene.add(ring);
  portalShapes.push(ring);
}

let targetCameraZ = 50;
let targetCameraY = 0;
let portalIntensity = 0;

function animate() {
  requestAnimationFrame(animate);

  camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
  camera.position.y += (targetCameraY - camera.position.y) * 0.08;

  portalIntensity = 1 - Math.min(camera.position.z / 50, 1);
  portalIntensity = Math.max(portalIntensity, 0);

  portalShapes.forEach((ring, index) => {
    ring.rotation.z += 0.02 + portalIntensity * 0.05;
    ring.rotation.x += 0.01 * portalIntensity;
    ring.scale.set(
      1 + portalIntensity * 0.5,
      1 + portalIntensity * 0.5,
      1
    );
    ring.material.opacity = 0.3 + portalIntensity * 0.5;
  });

  particles.rotation.x += 0.0002;
  particles.rotation.y += 0.0003;
  particles.rotation.x += 0.001 * portalIntensity;
  particles.rotation.y += 0.002 * portalIntensity;

  particles.scale.set(
    1 + portalIntensity * 0.3,
    1 + portalIntensity * 0.3,
    1 + portalIntensity * 0.3
  );

  shapes.forEach((shape, index) => {
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.015;
    shape.rotation.z += 0.008;
    shape.position.y = Math.sin(Date.now() * 0.001 + index) * 15;

    const baseScale = 1;
    const portalScale = 1 + portalIntensity * 0.8;
    shape.scale.set(baseScale * portalScale, baseScale * portalScale, baseScale * portalScale);
  });

  spiral.rotation.z += 0.005;
  spiral.scale.set(
    1 + portalIntensity * 0.4,
    1 + portalIntensity * 0.4,
    1 + portalIntensity * 0.4
  );

  pointLight.intensity = 1 + portalIntensity * 2;
  pointLight2.intensity = 1 + portalIntensity * 2;
  camera.lookAt(0, camera.position.y, 0);

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- SCROLL LOGIC & NAV HIGHLIGHTING ---
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });


  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollProgress = window.scrollY / scrollHeight;
  scrollProgress = Math.max(0, Math.min(1, scrollProgress));

  targetCameraZ = 50 - (scrollProgress * 40);
  targetCameraY = scrollProgress * 150;

  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (window.pageYOffset > 200) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = '1';
    scrollIndicator.style.pointerEvents = 'auto';
  }
});
