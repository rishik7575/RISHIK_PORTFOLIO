/* ═══════════════════════════════════════════════════════════════
   ENTERPRISE NEXUS — Command Center Engine
   ═══════════════════════════════════════════════════════════════ */

// ─── Boot Sequence ───
const bootLog = document.getElementById('boot-log');
const bootProgress = document.getElementById('boot-progress');
const bootStatus = document.getElementById('boot-status');
const bootScreen = document.getElementById('boot-screen');

const bootMessages = [
  '[INIT] Loading Enterprise Nexus kernel...',
  '[SYS] Connecting to SAP Business Technology Platform...',
  '[NET] Establishing secure enterprise channels...',
  '[AUTH] Verifying ABAP Cloud credentials...',
  '[MOD] Loading S/4HANA landscape modules...',
  '[UI] Initializing holographic interface...',
  '[DATA] Syncing enterprise data streams...',
  '[SEC] Encryption layer: AES-256-GCM active',
  '[CMD] Mission Control systems online',
  '[OK] Enterprise Nexus ready — access granted',
];

function runBootSequence() {
  let progress = 0;
  const step = 100 / bootMessages.length;

  bootMessages.forEach((msg, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'log-line';
      line.textContent = msg;
      bootLog.appendChild(line);
      bootLog.scrollTop = bootLog.scrollHeight;

      progress += step;
      bootProgress.style.width = `${progress}%`;
      bootStatus.textContent = msg.split('] ')[1]?.toUpperCase() || 'LOADING...';

      if (i === bootMessages.length - 1) {
        setTimeout(() => {
          bootStatus.textContent = 'ACCESS GRANTED';
          bootStatus.style.color = '#00ff88';
          setTimeout(() => {
            bootScreen.classList.add('hidden');
            initApp();
          }, 800);
        }, 400);
      }
    }, i * 350);
  });
}

// ─── Live Clock ───
function updateClock() {
  const el = document.getElementById('live-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}

// ─── Background Canvas (Data Streams) ───
class BackgroundEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  draw(mouseX, mouseY) {
    const { ctx, canvas, particles } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      if (mouseX && mouseY) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx * 0.01;
          p.y += dy * 0.01;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.fill();

      particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
  }
}

// ─── Network Canvas (Global) ───
class NetworkEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.time = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initNodes();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initNodes() {
    this.nodes = [];
    for (let i = 0; i < 8; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 2 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  draw() {
    this.time += 0.01;
    const { ctx, canvas, nodes } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node, i) => {
      node.pulse += 0.02;
      const glow = Math.sin(node.pulse) * 0.3 + 0.7;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * glow, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 136, 255, ${0.3 * glow})`;
      ctx.fill();

      nodes.slice(i + 1).forEach(other => {
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - dist / 300)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          const pulsePos = (this.time * 0.5 + i * 0.3) % 1;
          const px = node.x + (other.x - node.x) * pulsePos;
          const py = node.y + (other.y - node.y) * pulsePos;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
          ctx.fill();
        }
      });
    });
  }
}

// ─── Technology Network Graph ───
const TECH_NODES = [
  { id: 'abap', label: 'SAP ABAP Cloud', type: 'sap', x: 0.5, y: 0.2 },
  { id: 'rap', label: 'SAP RAP', type: 'sap', x: 0.25, y: 0.35 },
  { id: 's4', label: 'SAP S/4HANA', type: 'sap', x: 0.75, y: 0.35 },
  { id: 'cds', label: 'CDS Views', type: 'sap', x: 0.15, y: 0.55 },
  { id: 'odata', label: 'OData', type: 'integration', x: 0.5, y: 0.5 },
  { id: 'fiori', label: 'SAP Fiori', type: 'sap', x: 0.85, y: 0.55 },
  { id: 'java', label: 'Java', type: 'dev', x: 0.3, y: 0.75 },
  { id: 'python', label: 'Python', type: 'dev', x: 0.55, y: 0.78 },
  { id: 'js', label: 'JavaScript', type: 'dev', x: 0.75, y: 0.72 },
];

const TECH_CONNECTIONS = [
  ['abap', 'rap'], ['abap', 's4'], ['rap', 'cds'], ['rap', 'odata'],
  ['s4', 'odata'], ['s4', 'fiori'], ['cds', 'odata'], ['odata', 'fiori'],
  ['odata', 'js'], ['rap', 'java'], ['java', 'python'], ['js', 'fiori'],
  ['abap', 'odata'], ['python', 'js'],
];

class TechNetwork {
  constructor(canvas, labelsContainer) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.labelsContainer = labelsContainer;
    this.mouseX = 0;
    this.mouseY = 0;
    this.time = 0;
    this.hoveredNode = null;

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.createLabels();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.updateLabels();
  }

  getNodePositions() {
    return TECH_NODES.map(n => ({
      ...n,
      px: n.x * this.canvas.width,
      py: n.y * this.canvas.height,
    }));
  }

  createLabels() {
    this.labelsContainer.innerHTML = '';
    TECH_NODES.forEach(node => {
      const el = document.createElement('div');
      el.className = `tech-node-label tech-node-label--${node.type}`;
      el.textContent = node.label;
      el.dataset.id = node.id;
      el.addEventListener('click', () => showHoloPopup(node.label, getTechDescription(node.id)));
      this.labelsContainer.appendChild(el);
    });
  }

  updateLabels() {
    const positions = this.getNodePositions();
    const labels = this.labelsContainer.querySelectorAll('.tech-node-label');
    labels.forEach((el, i) => {
      if (positions[i]) {
        el.style.left = `${positions[i].px}px`;
        el.style.top = `${positions[i].py}px`;
      }
    });
  }

  getColor(type) {
    const colors = {
      sap: [0, 212, 255],
      dev: [0, 136, 255],
      integration: [123, 47, 255],
    };
    return colors[type] || colors.sap;
  }

  draw() {
    this.time += 0.015;
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const positions = this.getNodePositions();

    TECH_CONNECTIONS.forEach(([from, to], connIndex) => {
      const n1 = positions.find(n => n.id === from);
      const n2 = positions.find(n => n.id === to);
      if (!n1 || !n2) return;

      const gradient = ctx.createLinearGradient(n1.px, n1.py, n2.px, n2.py);
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0.15)');

      ctx.beginPath();
      ctx.moveTo(n1.px, n1.py);
      ctx.lineTo(n2.px, n2.py);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();

      const pulsePos = (this.time * 0.3 + connIndex * 0.1) % 1;
      const px = n1.px + (n2.px - n1.px) * pulsePos;
      const py = n1.py + (n2.py - n1.py) * pulsePos;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
      ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    positions.forEach(node => {
      const [r, g, b] = this.getColor(node.type);
      const pulse = Math.sin(this.time * 2 + node.x * 10) * 0.2 + 0.8;

      ctx.beginPath();
      ctx.arc(node.px, node.py, 6 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.px, node.py, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    this.updateLabels();
  }
}

function getTechDescription(id) {
  const descriptions = {
    abap: 'Core SAP development language for cloud-native ABAP applications on SAP BTP.',
    rap: 'Restful ABAP Programming — modern development model for SAP Fiori apps.',
    s4: 'Next-generation intelligent ERP suite powering enterprise digital transformation.',
    cds: 'Core Data Services for semantic data modeling and analytics.',
    odata: 'Open Data Protocol for standardized RESTful API communication.',
    fiori: 'SAP\'s modern UX design system for responsive enterprise applications.',
    java: 'Enterprise-grade backend development for integration scenarios.',
    python: 'Data processing, automation, and analytics scripting.',
    js: 'Frontend development for Fiori/UI5 and web-based interfaces.',
  };
  return descriptions[id] || 'Enterprise technology component.';
}

// ─── Hero Data Stream ───
function initHeroDataStream() {
  const container = document.getElementById('hero-data-stream');
  if (!container) return;

  const snippets = [
    'OData v4.0 → /sap/opu/odata4/sap/zcollege/',
    'CDS View: ZI_StudentMaster',
    'RAP BO: ZR_StudentManagement',
    'Auth: S_SERVICE → GRANTED',
    'Fiori Launchpad → Tile Active',
    'S/4HANA 2023 FPS02 → Connected',
    'ABAP Cloud → Runtime OK',
    'BTP Subaccount → cf-eu10',
    'Workflow: LoanApproval → RUNNING',
    'Validation: CreditScore > 650 → PASS',
  ];

  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'data-particle';
    el.textContent = snippets[i % snippets.length];
    el.style.left = `${Math.random() * 90 + 5}%`;
    el.style.animationDuration = `${8 + Math.random() * 12}s`;
    el.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(el);
  }
}

// ─── Animated Counters ───
function animateCounters() {
  document.querySelectorAll('.metric-value[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    }

    requestAnimationFrame(update);
  });
}

// ─── Panel Navigation ───
let currentSection = 'profile';
const transitionOverlay = document.getElementById('transition-overlay');

function navigateTo(section) {
  if (section === currentSection) return;

  transitionOverlay.classList.add('active');

  setTimeout(() => {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.mc-item').forEach(m => m.classList.remove('active'));

    const panel = document.getElementById(section);
    const navItem = document.querySelector(`.mc-item[data-section="${section}"]`);

    if (panel) panel.classList.add('active');
    if (navItem) navItem.classList.add('active');

    currentSection = section;

    if (section === 'profile') animateCounters();
    if (section === 'achievements') animateJourneyNodes();

    setTimeout(() => transitionOverlay.classList.remove('active'), 300);
  }, 300);
}

function initNavigation() {
  document.querySelectorAll('.mc-item').forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.section));
  });

  document.querySelectorAll('[data-section]').forEach(el => {
    if (el.tagName === 'BUTTON') {
      el.addEventListener('click', () => navigateTo(el.dataset.section));
    }
  });
}

// ─── Journey Timeline Animation ───
function animateJourneyNodes() {
  document.querySelectorAll('.journey-node').forEach((node, i) => {
    setTimeout(() => node.classList.add('visible'), i * 200);
  });
}

// ─── Holographic Popup ───
const holoPopup = document.getElementById('holo-popup');
const holoPopupBody = document.getElementById('holo-popup-body');
const holoClose = document.getElementById('holo-close');

function showHoloPopup(title, description) {
  holoPopupBody.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
  holoPopup.classList.add('active');
}

holoClose?.addEventListener('click', () => holoPopup.classList.remove('active'));
holoPopup?.addEventListener('click', (e) => {
  if (e.target === holoPopup) holoPopup.classList.remove('active');
});

// ─── Module Layer Interactions ───
function initModuleLayers() {
  document.querySelectorAll('.layer').forEach(layer => {
    layer.addEventListener('click', () => {
      const name = layer.querySelector('.layer-name')?.textContent;
      const detail = layer.querySelector('.layer-detail')?.textContent;
      showHoloPopup(name, detail);
    });
  });
}

// ─── Badge Interactions ───
function initBadges() {
  document.querySelectorAll('.badge-card').forEach(badge => {
    badge.addEventListener('click', () => {
      const title = badge.querySelector('.badge-title')?.textContent;
      const sub = badge.querySelector('.badge-sub')?.textContent;
      showHoloPopup(title, sub);
    });
  });
}

// ─── Cursor Glow ───
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

// ─── Uptime Counter ───
function initUptimeCounter() {
  const el = document.getElementById('metric-uptime');
  if (!el) return;
  let value = 99.97;
  setInterval(() => {
    value = 99.95 + Math.random() * 0.04;
    el.textContent = value.toFixed(2);
  }, 3000);
}

// ─── Main App Init ───
let bgEngine, networkEngine, techNetwork;
let mouseX = 0, mouseY = 0;

function initApp() {
  const bgCanvas = document.getElementById('bg-canvas');
  const networkCanvas = document.getElementById('network-canvas');
  const techCanvas = document.getElementById('tech-canvas');
  const techNodes = document.getElementById('tech-nodes');

  bgEngine = new BackgroundEngine(bgCanvas);
  networkEngine = new NetworkEngine(networkCanvas);
  techNetwork = new TechNetwork(techCanvas, techNodes);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderLoop() {
    bgEngine.draw(mouseX, mouseY);
    networkEngine.draw();
    if (currentSection === 'technologies') {
      techNetwork.draw();
    }
    requestAnimationFrame(renderLoop);
  }
  renderLoop();

  initNavigation();
  initHeroDataStream();
  initModuleLayers();
  initBadges();
  initCursorGlow();
  initUptimeCounter();
  animateCounters();

  setInterval(updateClock, 1000);
  updateClock();
}

// ─── Keyboard Navigation ───
document.addEventListener('keydown', (e) => {
  const sections = ['profile', 'technologies', 'certification', 'projects', 'achievements', 'contact'];
  const idx = sections.indexOf(currentSection);

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (idx < sections.length - 1) navigateTo(sections[idx + 1]);
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (idx > 0) navigateTo(sections[idx - 1]);
  }
  if (e.key === 'Escape') holoPopup?.classList.remove('active');
});

// ─── Start ───
runBootSequence();
