/* ═══════════════════════════════════════════════════════════════
   APEX-01 ENTERPRISE CONSOLE — SYSTEM ENGINE
   ═══════════════════════════════════════════════════════════════ */

// ─── Boot Sequence Logger ───
const bootLog = document.getElementById('boot-log');
const bootProgress = document.getElementById('boot-progress');
const bootStatus = document.getElementById('boot-status');
const bootScreen = document.getElementById('boot-screen');

const bootMessages = [
  { text: 'APEX-01 KERNEL INITIALIZATION IN PROGRESS...', type: 'info' },
  { text: 'Loading core system environment parameters...', type: 'info' },
  { text: 'Connecting SAP Business Technology Platform...', type: 'cyan' },
  { text: 'SAP BTP Subaccount cf-eu10 Connection: SUCCESS', type: 'success' },
  { text: 'Initializing Cloud Connector tunnel...', type: 'info' },
  { text: 'SAP S/4HANA On-Premise system connected safely.', type: 'success' },
  { text: 'Mounting active RAP services (zcollege, zloan)...', type: 'purple' },
  { text: 'Validating ABAP Cloud runtime syntax parser...', type: 'info' },
  { text: 'Verifying credential cache signatures...', type: 'info' },
  { text: 'Local decrypter: AES-256-GCM verification active.', type: 'purple' },
  { text: 'Loading file tree workspace components...', type: 'info' },
  { text: 'All modules integrated. APEX-01 workspace online.', type: 'success' }
];

function runBootSequence() {
  if (!bootLog) return;
  let progress = 0;
  const step = 100 / bootMessages.length;

  bootMessages.forEach((msg, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = `boot-log-line text-${msg.type}`;
      line.textContent = `[SYS] ${msg.text}`;
      bootLog.appendChild(line);
      bootLog.scrollTop = bootLog.scrollHeight;

      progress += step;
      bootProgress.style.width = `${progress}%`;
      bootStatus.textContent = msg.text.toUpperCase();

      if (i === bootMessages.length - 1) {
        setTimeout(() => {
          bootStatus.textContent = 'SYSTEM ACTIVE // ACCESS GRANTED';
          bootStatus.style.color = 'var(--green)';
          setTimeout(() => {
            bootScreen.classList.add('hidden');
            initWorkspace();
          }, 800);
        }, 450);
      }
    }, i * 280);
  });
}

// ─── Live Metrics Controller ───
function initLiveMetrics() {
  const btpEl = document.getElementById('metric-btp');
  const abapEl = document.getElementById('metric-abap');
  const rapEl = document.getElementById('metric-rap');
  const deployEl = document.getElementById('metric-deploy');
  const certEl = document.getElementById('metric-cert');
  const healthEl = document.getElementById('metric-health');

  // Animate metrics on load
  setTimeout(() => {
    if (btpEl) {
      btpEl.textContent = 'ONLINE';
      btpEl.className = 'metric-val text-success font-mono';
    }
    
    // Animate ABAP RT
    let abapVal = 0;
    const abapInterval = setInterval(() => {
      abapVal += 5.5;
      if (abapVal >= 99.98) {
        abapVal = 99.98;
        clearInterval(abapInterval);
        
        // Fluctuating metric slightly
        setInterval(() => {
          const delta = (Math.random() - 0.5) * 0.03;
          abapEl.textContent = `${(99.98 + delta).toFixed(2)}%`;
        }, 4000);
      }
      if (abapEl) abapEl.textContent = `${abapVal.toFixed(2)}%`;
    }, 50);

    // Animate RAP Services
    let rapVal = 0;
    const rapInterval = setInterval(() => {
      rapVal += 1;
      if (rapVal >= 12) {
        clearInterval(rapInterval);
      }
      if (rapEl) rapEl.textContent = `${rapVal} Active`;
    }, 80);

    // Set static metrics
    if (deployEl) deployEl.textContent = '2';
    if (certEl) certEl.textContent = 'VERIFIED';
    if (healthEl) healthEl.textContent = 'HEALTHY';
  }, 1000);
}

// ─── Workspace IDE Tab Manager ───
let openTabs = ['profile.abap'];
let activeTab = 'profile.abap';

const fileTypeMap = {
  'profile.abap': { label: 'profile.abap', type: 'ABAP', iconClass: 'abap-icon', iconChar: 'A', linesCount: 84 },
  'why_rishik.md': { label: 'why_rishik.md', type: 'MD', iconClass: 'md-icon', iconChar: 'M', linesCount: 55 },
  'sap_landscape.yaml': { label: 'sap_landscape.yaml', type: 'YAML', iconClass: 'yaml-icon', iconChar: 'Y', linesCount: 52 },
  'certifications.sec': { label: 'certifications.sec', type: 'SEC', iconClass: 'sec-icon', iconChar: 'S', linesCount: 48 },
  'projects.rap': { label: 'projects.rap', type: 'RAP', iconClass: 'rap-icon', iconChar: 'R', linesCount: 96 },
  'achievements.json': { label: 'achievements.json', type: 'JSON', iconClass: 'json-icon', iconChar: 'J', linesCount: 60 },
  'roadmap.future': { label: 'roadmap.future', type: 'FUTURE', iconClass: 'future-icon', iconChar: 'F', linesCount: 42 },
  'terminal.sh': { label: 'terminal.sh', type: 'SH', iconClass: 'terminal-icon', iconChar: '>_', linesCount: 35 }
};

function renderTabs() {
  const tabsBar = document.getElementById('tabs-bar');
  if (!tabsBar) return;
  tabsBar.innerHTML = '';

  openTabs.forEach(file => {
    const meta = fileTypeMap[file];
    const tab = document.createElement('div');
    tab.className = `tab-item ${file === activeTab ? 'active' : ''}`;
    tab.dataset.file = file;
    
    tab.innerHTML = `
      <span class="file-icon ${meta.iconClass}">${meta.iconChar}</span>
      <span class="tab-label">${meta.label}</span>
      <span class="tab-close" data-close="${file}">×</span>
    `;

    // Click tab to focus
    tab.addEventListener('click', (e) => {
      if (e.target.dataset.close) return;
      focusTab(file);
    });

    // Close tab click
    tab.querySelector('.tab-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closeTab(file);
    });

    tabsBar.appendChild(tab);
  });
}

function focusTab(file) {
  if (!openTabs.includes(file)) {
    openTabs.push(file);
  }
  activeTab = file;
  renderTabs();

  // If body is in recruiter mode, switch it back to developer mode to show individual files correctly
  if (document.body.classList.contains('mode-recruiter')) {
    document.body.classList.remove('mode-recruiter');
    document.body.classList.add('mode-developer');
    
    const devBtn = document.getElementById('btn-mode-dev');
    const recruiterBtn = document.getElementById('btn-mode-recruiter');
    if (devBtn && recruiterBtn) {
      devBtn.classList.add('active');
      recruiterBtn.classList.remove('active');
    }
  }

  // Sync left sidebar list selection
  document.querySelectorAll('.tree-file').forEach(el => {
    if (el.dataset.file === file) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Switch displayed panels
  document.querySelectorAll('.panel').forEach(panel => {
    if (panel.dataset.panel === file) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // Gutter lines redraw
  updateGutterLines(file);

  // Update Footer info
  const footerType = document.getElementById('editor-file-type');
  if (footerType) footerType.textContent = fileTypeMap[file].type;

  // Triggers panel-specific events
  if (file === 'roadmap.future') {
    animateRoadmapTimeline();
  }
  if (file === 'terminal.sh') {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) setTimeout(() => terminalInput.focus(), 50);
  }
}

function closeTab(file) {
  const index = openTabs.indexOf(file);
  if (index === -1) return;

  openTabs.splice(index, 1);

  if (activeTab === file) {
    if (openTabs.length > 0) {
      activeTab = openTabs[Math.max(0, index - 1)];
    } else {
      activeTab = '';
    }
  }

  if (activeTab) {
    focusTab(activeTab);
  } else {
    // If no tabs open, open profile.abap by default to keep IDE alive
    focusTab('profile.abap');
  }
}

function updateGutterLines(file) {
  const lineGutter = document.getElementById('line-numbers');
  if (!lineGutter) return;
  lineGutter.innerHTML = '';
  
  const count = fileTypeMap[file]?.linesCount || 50;
  for (let i = 1; i <= count; i++) {
    const num = document.createElement('div');
    num.textContent = i;
    lineGutter.appendChild(num);
  }
}

function initNavigation() {
  document.querySelectorAll('.tree-file').forEach(el => {
    el.addEventListener('click', () => {
      const file = el.dataset.file;
      focusTab(file);
    });
  });
}

// ─── Recruiter / Developer View Toggle ───
function initViewModeToggle() {
  const devBtn = document.getElementById('btn-mode-dev');
  const recruiterBtn = document.getElementById('btn-mode-recruiter');

  if (devBtn && recruiterBtn) {
    devBtn.addEventListener('click', () => {
      document.body.className = 'mode-developer';
      devBtn.classList.add('active');
      recruiterBtn.classList.remove('active');
      
      // Select the last active file tab in Developer Mode
      if (activeTab) {
        focusTab(activeTab);
      }
    });

    recruiterBtn.addEventListener('click', () => {
      document.body.className = 'mode-recruiter';
      recruiterBtn.classList.add('active');
      devBtn.classList.remove('active');
      
      // Open the Recruiter Dashboard panel
      document.querySelectorAll('.panel').forEach(panel => {
        if (panel.dataset.panel === 'recruiter_dashboard') {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Deselect all file explorer items in Recruiter Mode
      document.querySelectorAll('.tree-file').forEach(el => el.classList.remove('active'));
    });
  }
}

// ─── Live RAP Transaction Lab Simulator ───
const studentMockData = [
  { id: 'S001', name: 'Rishik Maduri', dept: 'CSE', credits_earned: '120', cgpa: '8.5' },
  { id: 'S002', name: 'Aaron Smith', dept: 'ECE', credits_earned: '112', cgpa: '7.9' },
  { id: 'S003', name: 'Priya Nair', dept: 'CSE', credits_earned: '120', cgpa: '9.2' },
  { id: 'S004', name: 'John Doe', dept: 'MECH', credits_earned: '98', cgpa: '6.8' }
];

function initRAPLab() {
  const btn = document.getElementById('btn-execute-lab');
  const statusEl = document.getElementById('lab-engine-status');
  const outputPanel = document.getElementById('lab-outputs');
  const resTimeEl = document.getElementById('lab-res-time');
  const resSizeEl = document.getElementById('lab-res-size');
  const queryTimeEl = document.getElementById('lab-query-time');
  const resultTable = document.getElementById('db-result-table');

  if (!btn) return;

  // Print helper for console logger
  function printLog(logContainer, text, type = 'info') {
    if (!logContainer) return;
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = 'log-item';
    line.innerHTML = `
      <span class="log-time">[${time}]</span>
      <span class="log-text ${type}">${text}</span>
    `;
    logContainer.appendChild(line);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  // Highlight helper for ABAP code lines
  function highlightEditorLines(lineNumbers) {
    document.querySelectorAll('#abap-editor-block .code-line').forEach(el => {
      el.classList.remove('compiling-active');
    });
    lineNumbers.forEach(num => {
      const line = document.getElementById(`code-line-${num}`);
      if (line) {
        line.classList.add('compiling-active');
      }
    });
  }

  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.querySelector('.btn-spinner').classList.remove('hidden');
    statusEl.textContent = 'RUNNING';
    statusEl.className = 'lab-status running';
    outputPanel.classList.add('hidden');

    // Clean previous states
    const flowNodes = ['fiori', 'odata', 'behavior', 'rap', 'cds', 'hana'];
    flowNodes.forEach(id => {
      document.getElementById(`node-${id}`)?.classList.remove('active', 'success-active');
    });
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`arrow-${i}`)?.classList.remove('active');
    }
    highlightEditorLines([]);

    // Clear and prepare console logger
    const logBox = document.getElementById('lab-console-log');
    if (logBox) logBox.innerHTML = '';

    // Step timeline
    const timeline = [
      {
        delay: 0,
        node: 'fiori',
        arrow: null,
        lines: [1, 2],
        logs: [
          { text: 'Fiori Client: Transaction engine initialization request sent.', type: 'info' },
          { text: 'GET ZI_STUDENT_Processor_v4/Student(S001) - Request headers established.', type: 'cyan' }
        ]
      },
      {
        delay: 450,
        node: 'odata',
        arrow: 1,
        lines: [3],
        logs: [
          { text: 'OData Gateway V4 Hub: Query mapping request dispatcher active.', type: 'info' },
          { text: 'Access Control (ZDCL_STUDENT): Security clearance check SUCCESS.', type: 'success' }
        ]
      },
      {
        delay: 950,
        node: 'behavior',
        arrow: 2,
        lines: [4, 5],
        logs: [
          { text: 'RAP Behavior Definition (ZI_STUDENT): Executing calculate_credits_earned hook.', type: 'info' },
          { text: 'RAP Core Engine: Registry buffer state set to read-only mode.', type: 'info' }
        ]
      },
      {
        delay: 1450,
        node: 'rap',
        arrow: 3,
        lines: [6, 7],
        logs: [
          { text: 'RAP Business Object: Standard SELECT dispatcher routing DB parameters.', type: 'info' },
          { text: 'Semantic database compiler checking CDS View Entity definitions...', type: 'info' }
        ]
      },
      {
        delay: 1950,
        node: 'cds',
        arrow: 4,
        lines: [8, 9],
        logs: [
          { text: 'CDS View Entity: Resolving semantic annotations and database projection views.', type: 'info' },
          { text: 'HANA Query Planner: SELECT student_id, student_name, department, credits_earned, cgpa FROM zstudent', type: 'cyan' }
        ]
      },
      {
        delay: 2450,
        node: 'hana',
        arrow: 5,
        lines: [10],
        logs: [
          { text: 'SAP HANA Column Store DB: Accessing active records schema. Optimizing execution...', type: 'info' },
          { text: 'SAP HANA Column Store DB: Row search successful. sy-subrc = 0, retrieved: 4', type: 'success' }
        ]
      }
    ];

    timeline.forEach(step => {
      setTimeout(() => {
        const node = document.getElementById(`node-${step.node}`);
        node?.classList.add('active');
        if (step.arrow) {
          document.getElementById(`arrow-${step.arrow}`)?.classList.add('active');
        }
        highlightEditorLines(step.lines);
        step.logs.forEach(log => printLog(logBox, log.text, log.type));
      }, step.delay);
    });

    // Complete transition
    setTimeout(() => {
      flowNodes.forEach(nId => {
        const nd = document.getElementById(`node-${nId}`);
        nd?.classList.remove('active');
        nd?.classList.add('success-active');
      });
      for (let aIdx = 1; aIdx <= 5; aIdx++) {
        document.getElementById(`arrow-${aIdx}`)?.classList.remove('active');
      }

      // Flash editor lines green to show success
      document.querySelectorAll('#abap-editor-block .code-line').forEach(el => {
        el.classList.remove('compiling-active');
        el.classList.add('success-flash');
        setTimeout(() => el.classList.remove('success-flash'), 1000);
      });

      statusEl.textContent = 'SUCCESS';
      statusEl.className = 'lab-status success';
      btn.disabled = false;
      btn.querySelector('.btn-spinner').classList.add('hidden');

      // Set metrics
      resTimeEl.textContent = `${Math.floor(25 + Math.random() * 25)}ms`;
      resSizeEl.textContent = `${studentMockData.length} Rows`;
      queryTimeEl.textContent = `${(0.12 + Math.random() * 0.1).toFixed(2)}ms`;

      // Render table
      renderLabTable(resultTable);
      outputPanel.classList.remove('hidden');

      // Final success logs
      printLog(logBox, '>>> OData Response JSON payload generated successfully. HTTP 200 OK.', 'success');
      printLog(logBox, '>>> RAP Engine simulation completed successfully.', 'success');

      // Scroll down
      const parentViewport = document.getElementById('editor-viewport');
      if (parentViewport) {
        parentViewport.scrollTop = parentViewport.scrollHeight;
      }
    }, 3000);
  });
}

function renderLabTable(tableEl) {
  if (!tableEl) return;
  tableEl.innerHTML = `
    <thead>
      <tr>
        <th>STUDENT_ID</th>
        <th>STUDENT_NAME</th>
        <th>DEPARTMENT</th>
        <th>CREDITS_EARNED</th>
        <th>CGPA</th>
      </tr>
    </thead>
    <tbody>
      ${studentMockData.map(row => `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.dept}</td>
          <td>${row.credits_earned}</td>
          <td>${row.cgpa}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// ─── Interactive SVG Architecture Topology ───
const nodeDescriptions = {
  fiori: {
    title: 'SAP Fiori UI Layer',
    type: 'UI PRESENTATION CLIENT',
    desc: 'The gateway interface for recruiters and operators. Fiori templates query the back-end OData layer using REST protocols to display clean and fully responsive user interface forms.',
    protocol: 'HTTPS / JSON REST',
    role: 'Responsive Presentation UI Layout',
    tech: 'SAPUI5 / Fiori Elements'
  },
  btp: {
    title: 'SAP Business Technology Platform',
    type: 'CLOUD INTEGRATION ORCHESTRATION',
    desc: 'The middleware platform hosted on BTP Cloud. Orchestrates integration paths, API bindings, secure single sign-on tokens, and database connector channels to backend databases.',
    protocol: 'JSON REST / RFC Calls',
    role: 'Middleware Integration Platform',
    tech: 'BTP Cloud Foundry / SAP Business Application Studio'
  },
  api: {
    title: 'OData API Gateway',
    type: 'DATA INTERFACE ENDPOINT',
    desc: 'Exposes structural entities via OData v4 REST interfaces. Standardizes client communications, payload queries, and CRUD transaction requests between client web apps and back-end logic.',
    protocol: 'OData V4 XML / JSON',
    role: 'API Endpoints & Data Model Service Exposure',
    tech: 'SAP Gateway SE / Service Definitions'
  },
  sec: {
    title: 'DCL Security & Identity Access',
    type: 'SECURITY CONTROL MECHANISM',
    desc: 'Data Control Language (DCL) mapping access guidelines. Decides security permissions and checks authorizations so that data is filtered and only validated administrators can execute modifications.',
    protocol: 'SAP Role-Based Security Rules',
    role: 'DCL Filtering & System Security Auths',
    tech: 'DCL View Entities / PFCG Profiles'
  },
  cc: {
    title: 'SAP Cloud Connector',
    type: 'SECURE HYBRID TUNNEL',
    desc: 'Secure link connecting BTP cloud applications to S/4HANA instances inside internal firewalls. Eliminates the need for complex VPN routers by running a secure outbound SSL link.',
    protocol: 'SSL Encrypted Direct Tunnel',
    role: 'Secure On-Premise Gateway Bridge',
    tech: 'SAP Cloud Connector Agent v2'
  },
  s4: {
    title: 'SAP S/4HANA Core System',
    type: 'ENTERPRISE DATABASE SUITE',
    desc: 'The central application processing kernel. Runs the core ABAP logic stack and coordinates business flows, system authorizations, database write queries, and transaction pipelines.',
    protocol: 'RFC / Local ABAP runtime',
    role: 'Central ERP System Logic processing',
    tech: 'S/4HANA FPS02 Core Architecture'
  },
  rap: {
    title: 'SAP Restful ABAP Programming',
    type: 'TRANSACTIONAL BACK-END ENGINE',
    desc: 'The modern cloud programming model. Features decoupled business logic layers including determinations, validation rules, lock definitions, and runtime database persistence overrides.',
    protocol: 'ABAP REST API Standards',
    role: 'Transactional Framework & Determinations Processing',
    tech: 'SAP RAP Framework (Managed Scenarios)'
  },
  db: {
    title: 'SAP HANA Database',
    type: 'IN-MEMORY DB PERSISTENCE',
    desc: 'High-performance in-memory database. Holds physical table entries and handles complex semantic views dynamically using database index optimizations and column-oriented memory architecture.',
    protocol: 'SQL Queries / HDB Pipelines',
    role: 'Persistent Storage & CDS execution Engine',
    tech: 'SAP HANA In-Memory Database Engine v2'
  }
};

function initSVGTopology() {
  const nodes = document.querySelectorAll('.svg-node');
  const titleEl = document.getElementById('drawer-node-title');
  const typeEl = document.getElementById('drawer-node-type');
  const descEl = document.getElementById('drawer-node-desc');
  const protocolEl = document.getElementById('spec-protocol');
  const roleEl = document.getElementById('spec-role');
  const techEl = document.getElementById('spec-tech');
  const specsContainer = document.getElementById('drawer-specs-container');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const nodeId = node.id.replace('svg-node-', '');
      const meta = nodeDescriptions[nodeId];

      if (!meta) return;

      // Toggle active states on SVG nodes
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Highlight active connection lines/paths in SVG
      const connectionLines = document.querySelectorAll('.pulse-line');
      connectionLines.forEach(line => line.classList.remove('active'));
      
      // Selectively pulse connected paths based on node
      if (nodeId === 'fiori' || nodeId === 'btp') {
        document.getElementById('path-fiori-btp')?.classList.add('active');
      }
      if (nodeId === 'btp' || nodeId === 'cc') {
        document.getElementById('path-btp-cc')?.classList.add('active');
      }
      if (nodeId === 'cc' || nodeId === 's4') {
        document.getElementById('path-cc-s4')?.classList.add('active');
      }
      if (nodeId === 'api' || nodeId === 'btp') {
        document.getElementById('path-btp-api')?.classList.add('active');
        document.getElementById('path-api-s4')?.classList.add('active');
      }
      if (nodeId === 'sec' || nodeId === 'btp') {
        document.getElementById('path-btp-sec')?.classList.add('active');
        document.getElementById('path-sec-s4')?.classList.add('active');
      }
      if (nodeId === 'rap' || nodeId === 's4') {
        document.getElementById('path-s4-rap')?.classList.add('active');
      }
      if (nodeId === 'db' || nodeId === 's4') {
        document.getElementById('path-s4-db')?.classList.add('active');
      }
      if (nodeId === 'rap' || nodeId === 'db') {
        document.getElementById('path-rap-db')?.classList.add('active');
      }

      // Update details drawer
      titleEl.textContent = meta.title;
      typeEl.textContent = meta.type;
      descEl.textContent = meta.desc;
      protocolEl.textContent = meta.protocol;
      roleEl.textContent = meta.role;
      techEl.textContent = meta.tech;

      specsContainer.classList.remove('hidden');
    });
  });
}

// ─── Cryptographic Certification Vault Verification ───
const verificationLogs = [
  'Generating SHA-256 local checksum hashes...',
  'Checking credential token registry in browser cache...',
  'Establishing secure connection with Credly API endpoints...',
  'Retrieving digital registry signatures for credential C-ABAPD-2507...',
  'Verifying issuing authority: SAP SE Germany official registry...',
  'Cross-checking metadata integrity constraints... SUCCESS',
  'Verification result: CERTIFICATION SECURE & AUTHENTIC'
];

function initCertVault() {
  const btn = document.getElementById('btn-verify-cert');
  const scannerChamber = document.getElementById('verification-scanner-chamber');
  const logsBox = document.getElementById('cert-verify-logs');
  const statusVal = document.getElementById('cert-status-text');
  const authBadge = document.getElementById('cert-auth-badge');
  const credlyLink = document.getElementById('btn-credly-link');
  
  // Containers to switch
  const svgBadgeContainer = document.getElementById('badge-vector-svg-container');
  const imgCertContainer = document.getElementById('badge-certificate-image-container');

  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.disabled = true;
    scannerChamber.classList.add('scanning');
    authBadge.classList.add('hidden');
    credlyLink.classList.add('hidden');
    logsBox.innerHTML = '';
    statusVal.textContent = 'CHECKING SIGNATURES...';
    statusVal.className = 's-val text-warning font-mono';
    
    // Reset back to SVG during scan
    imgCertContainer.classList.add('hidden');
    svgBadgeContainer.classList.remove('hidden');

    let index = 0;
    
    function printNextLog() {
      if (index < verificationLogs.length) {
        const line = document.createElement('div');
        line.className = 'term-line log-info';
        line.textContent = `> [INIT] ${verificationLogs[index]}`;
        logsBox.appendChild(line);
        logsBox.scrollTop = logsBox.scrollHeight;
        index++;
        
        // Wait slightly between log checks
        setTimeout(printNextLog, 250 + Math.random() * 150);
      } else {
        // Complete Verification
        setTimeout(() => {
          scannerChamber.classList.remove('scanning');
          authBadge.classList.remove('hidden');
          
          // Switch to official generated image certificate view
          svgBadgeContainer.classList.add('hidden');
          imgCertContainer.classList.remove('hidden');
          
          const successLine = document.createElement('div');
          successLine.className = 'term-line log-success';
          successLine.textContent = '>>> [SUCCESS] CREDENTIAL SYSTEM AUTHENTICATION OK.';
          logsBox.appendChild(successLine);
          logsBox.scrollTop = logsBox.scrollHeight;

          statusVal.textContent = 'VERIFIED / ACTIVE / AUTHENTIC';
          statusVal.className = 's-val text-success font-mono';
          btn.disabled = false;
          
          // Reveal Credly button
          credlyLink.classList.remove('hidden');
        }, 300);
      }
    }

    setTimeout(printNextLog, 400);
  });
}

// ─── Image Zoom Modal Event Handlers (Handy Feature) ───
function initImageZoomModal() {
  const modal = document.getElementById('cert-zoom-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = [
    document.getElementById('sap-cert-thumbnail'),
    document.getElementById('recruiter-cert-image')
  ];

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  triggers.forEach(trigger => {
    if (trigger) {
      trigger.addEventListener('click', openModal);
    }
  });

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ─── JSON Accordion Achievements ───
function initJSONAccordion() {
  const triggers = document.querySelectorAll('.j-trigger');
  triggers.forEach(trig => {
    trig.addEventListener('click', () => {
      const parent = trig.parentElement;
      const contents = parent.querySelector('.json-group-contents');
      const toggle = trig.querySelector('.j-toggle');

      if (contents.classList.contains('hidden')) {
        contents.classList.remove('hidden');
        toggle.textContent = '▼';
        parent.classList.add('active');
      } else {
        contents.classList.add('hidden');
        toggle.textContent = '▶';
        parent.classList.remove('active');
      }
    });
  });
}

// ─── Career Timeline Animation ───
function animateRoadmapTimeline() {
  const nodes = document.querySelectorAll('.roadmap-node');
  nodes.forEach((node, i) => {
    setTimeout(() => {
      node.classList.add('visible');
    }, i * 250);
  });
}

// ─── Command Shell Terminal (.sh) ───
const shellBody = document.getElementById('shell-body');
const shellInput = document.getElementById('terminal-input');

const helpOutput = `
APEX-01 Active Commands:
  help           Display this command directory
  about          Learn about Rishik's background and target role
  skills         View core technologies and SAP modules
  projects       Inspect deployed enterprise applications
  certification  View credential verification registry parameters
  achievements   Print summary of academic & competition records
  education      Print degree and performance metrics
  linkedin       Link to official LinkedIn channel
  github         Link to official GitHub repositories
  contact        Print enterprise communication routes
  resume         Download professional CV document (PDF)
  clear          Purge command console logs
  neofetch       Launch console system specifications report
`;

const neofetchOutput = `
   /\\_/\\     \x1b[1;36mrishik_maduri@apex-01\x1b[0m
  ( o.o )    ----------------------
   > ^ <     OS: APEX-01 Console OS v5.0 (Windows Integration)
             Kernel: SAP ABAP Cloud Runtime Kernel
             Uptime: 99.98% (Online)
             Shell: custom-bash-engine v1.0
             Host: SAP Business Technology Platform
             CPU: SAP HANA In-Memory Engine (24 Cores)
             Memory: 128 GB RAM
             Target: SAP Cloud Developer / Solution Architect
`;

const aboutOutput = `
RISHIK MADURI
  SAP Certified Associate Back-End Developer specializing in ABAP Cloud.
  Focused on decoupling business rules from presentation view layouts 
  using SAP Restful Application Programming (RAP), CDS, and OData APIs.
  Goal: Build high-fidelity cloud systems as an Enterprise Architect.
`;

const skillsOutput = `
Rishik's Stack:
  - SAP Technologies: ABAP Cloud, RAP (Managed), CDS View Entities, OData v4
  - Integration Tools: BTP Cockpit, Cloud Connector, Destination configurations
  - Languages: Java, Python, JavaScript (ES6)
  - UX Frameworks: SAP Fiori Elements / SAPUI5
`;

const projectsOutput = `
Deployed Packages:
  [01] Smart College Management System
       Architecture: SAP RAP, CDS Views, DCL, SAP Fiori UX on SAP BTP
       Scope: Deployed administrative scheduler reducing workflow blocks by 45%.
  [02] Loan Eligibility & Approval System
       Architecture: RAP Managed scenario, credit checks validation logic on S/4HANA
       Scope: automated processing checking score variables without manual calculation.
`;

const certOutput = `
Registry Check:
  Certification: SAP Certified Associate - Back-End Developer - ABAP Cloud
  Credential ID: C-ABAPD-2507
  Verify Registry: Credly ID 9e33eaa4-6ff1-4b29-a8fd-79ef407da686
  Link: https://www.credly.com/badges/9e33eaa4-6ff1-4b29-a8fd-79ef407da686
`;

const achOutput = `
Authenticated Records:
  - SAP ABAP Cloud Developer Associate Credential
  - National Engineering Hackathon Championship Winner (1st)
  - Enterprise Technology Hackathon Runner-Up (2nd)
  - Completed SAP Learning courses: S4D400, S4D401, S4D430
`;

const eduOutput = `
Degree Record:
  Major: Bachelor of Computer Science Engineering
  University Scale: 8.5 CGPA out of 10
  Details: Top ranking marks in data structures, OOP, and DB programming.
`;

const contactOutput = `
Communication Parameters:
  Email:        rishikmaduri@gmail.com
  Phone:        +91 75695 59330
  Location:     Hyderabad, India
  Citizenship:  US Citizen (Legally eligible in India & USA without visa sponsorship)
  LinkedIn:     /in/rishik-venkat-shiva-sai-maduri-960716301
  GitHub:       /rishikmaduri
`;

function initTerminal() {
  if (!shellInput) return;

  // Refocus input on console click
  shellBody.parentElement.addEventListener('click', () => {
    shellInput.focus();
  });

  shellInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = shellInput.value.trim().toLowerCase();
      shellInput.value = '';

      if (val === '') return;

      // Print typed command line
      const promptLine = document.createElement('div');
      promptLine.className = 'term-output-line';
      promptLine.innerHTML = `<span class="shell-prompt">rishik_maduri@apex-01:~$</span> ${val}`;
      shellBody.insertBefore(promptLine, shellInput.parentElement);

      let response = '';

      switch (val) {
        case 'help':
          response = helpOutput;
          break;
        case 'about':
          response = aboutOutput;
          break;
        case 'skills':
          response = skillsOutput;
          break;
        case 'projects':
          response = projectsOutput;
          break;
        case 'certification':
          response = certOutput;
          break;
        case 'achievements':
          response = achOutput;
          break;
        case 'education':
          response = eduOutput;
          break;
        case 'linkedin':
          response = 'Directing to LinkedIn Profile...\n(Opening secure external channel...)';
          window.open('https://www.linkedin.com/in/rishik-venkat-shiva-sai-maduri-960716301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
          break;
        case 'github':
          response = 'Directing to: https://github.com/rishikmaduri\n(Opening secure external channel...)';
          window.open('https://github.com/rishikmaduri', '_blank');
          break;
        case 'contact':
          response = contactOutput;
          break;
        case 'resume':
          response = 'Initializing resume CV package fetch...\nDownloading original resume document...';
          window.open('/Rishik_Maduri_Resume.pdf', '_blank');
          break;
        case 'neofetch':
          response = neofetchOutput;
          break;
        case 'clear':
          // Purge console except prompt
          const lines = shellBody.querySelectorAll('.term-output-line');
          lines.forEach(l => l.remove());
          return;
        default:
          response = `shell: command not found: ${val}. Type 'help' to view active commands.`;
          break;
      }

      // Print output lines
      const outLine = document.createElement('div');
      outLine.className = 'term-output-line';
      outLine.innerHTML = response.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
      shellBody.insertBefore(outLine, shellInput.parentElement);

      // Scroll console body to bottom
      shellBody.scrollTop = shellBody.scrollHeight;
    }
  });
}

// ─── Recruiter Scanner Floating Panel Minimized Toggle ───
function initRecruiterScanPanel() {
  const scanPanel = document.getElementById('recruiter-quick-scan');
  const collapseBtn = document.getElementById('btn-collapse-scan');
  const header = document.getElementById('inspector-header');

  if (!scanPanel || !header) return;

  let isDragging = false;
  let hasDragged = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  function toggleCollapse() {
    scanPanel.classList.toggle('collapsed');
    collapseBtn.textContent = scanPanel.classList.contains('collapsed') ? '▲' : '_';
  }

  collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCollapse();
  });

  header.addEventListener('mousedown', (e) => {
    // If clicked on collapseBtn directly, skip drag
    if (e.target === collapseBtn || collapseBtn.contains(e.target)) return;

    isDragging = true;
    hasDragged = false;
    
    const rect = scanPanel.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;

    scanPanel.style.transition = 'none';
    scanPanel.classList.add('is-dragging');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDragged = true;
    }

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    const rect = scanPanel.getBoundingClientRect();
    const minLeft = 10;
    const maxLeft = window.innerWidth - rect.width - 10;
    const minTop = 10;
    const maxTop = window.innerHeight - 40;

    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    newTop = Math.max(minTop, Math.min(newTop, maxTop));

    scanPanel.style.left = `${newLeft}px`;
    scanPanel.style.top = `${newTop}px`;
    scanPanel.style.bottom = 'auto';
    scanPanel.style.right = 'auto';
  }

  function onMouseUp(e) {
    if (!isDragging) return;
    isDragging = false;
    scanPanel.style.transition = '';
    scanPanel.classList.remove('is-dragging');
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  header.addEventListener('click', (e) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (e.target === collapseBtn || collapseBtn.contains(e.target)) return;
    
    toggleCollapse();
  });

  // Collapse by default on narrow screens
  if (window.innerWidth < 768) {
    scanPanel.classList.add('collapsed');
    collapseBtn.textContent = '▲';
  }

  // Resizing implementation
  const resizer = document.getElementById('inspector-resizer');
  if (resizer) {
    let isResizing = false;
    let originalWidth = 0;
    let originalHeight = 0;
    let originalMouseX = 0;
    let originalMouseY = 0;

    resizer.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Disable resizing when collapsed
      if (scanPanel.classList.contains('collapsed')) return;

      isResizing = true;
      originalWidth = scanPanel.offsetWidth;
      originalHeight = scanPanel.offsetHeight;
      originalMouseX = e.clientX;
      originalMouseY = e.clientY;

      scanPanel.style.transition = 'none';
      scanPanel.classList.add('is-resizing');

      document.addEventListener('mousemove', onResizeMouseMove);
      document.addEventListener('mouseup', onResizeMouseUp);
    });

    function onResizeMouseMove(e) {
      if (!isResizing) return;
      const dw = e.clientX - originalMouseX;
      const dh = e.clientY - originalMouseY;

      const newWidth = Math.max(260, originalWidth + dw);
      const newHeight = Math.max(150, originalHeight + dh);

      // On small screens, keep width fluid via CSS (left/right dock)
      if (window.innerWidth > 576) {
        scanPanel.style.width = `${newWidth}px`;
      }
      scanPanel.style.height = `${newHeight}px`;

      // Set max-height to none so the element can stretch and display its inner scrollbar
      const body = scanPanel.querySelector('.inspector-body');
      if (body) {
        body.style.maxHeight = 'none';
      }
    }

    function onResizeMouseUp() {
      if (!isResizing) return;
      isResizing = false;
      scanPanel.style.transition = '';
      scanPanel.classList.remove('is-resizing');
      document.removeEventListener('mousemove', onResizeMouseMove);
      document.removeEventListener('mouseup', onResizeMouseUp);
    }
  }
}

// ─── Mouse cursor position updater for glowing gradients ───
function initCursorTrack() {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    
    // Update footer position indicators as cursor metrics just for IDE immersion
    const posEl = document.getElementById('editor-pos');
    if (posEl) {
      const line = Math.floor(e.clientY / 22) + 1;
      const col = Math.floor(e.clientX / 10) + 1;
      posEl.textContent = `Ln ${line}, Col ${col}`;
    }
  });
}

// ─── Workspace Boot Initialization ───
function initWorkspace() {
  initLiveMetrics();
  renderTabs();
  initNavigation();
  initViewModeToggle();
  initRAPLab();
  initSVGTopology();
  initCertVault();
  initImageZoomModal(); // Wire up zoom triggers
  initJSONAccordion();
  initTerminal();
  initRecruiterScanPanel();
  initCursorTrack();
  initHolographicCards(); // Initialize 3D shine cards
  
  // Open default tab
  focusTab('profile.abap');
}

// Start boot loading script on page load
window.addEventListener('load', () => {
  runBootSequence();
});

// ─── Holographic Tilt Card Effect ───
function initHolographicCards() {
  const cards = document.querySelectorAll('.holo-card');
  
  cards.forEach(card => {
    const shine = card.querySelector('.holo-card-shine');
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const px = x / rect.width;
      const py = y / rect.height;
      
      // Calculate rotation angles (-20 to 20 degrees)
      const rotateX = (0.5 - py) * 20;
      const rotateY = (px - 0.5) * 20;
      
      // Calculate shine position
      const shineX = px * 100;
      const shineY = py * 100;
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 229, 255, 0.25) 30%, rgba(124, 77, 255, 0.15) 70%, transparent 100%)`;
        shine.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      if (shine) {
        shine.style.opacity = '0';
      }
    });
  });
}
