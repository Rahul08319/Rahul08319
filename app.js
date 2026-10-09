/**
 * Rahul Kumar — Flagship Apple Design Engine & Multi-Agent Simulator
 * Governed by Apple HIG Principles & Fluid Physics Motion
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicPerpetualDates();
  initLiveIstClock();
  initThemeToggle();
  initCursorSpotlight();
  initPointerReactiveTilt();
  initMithrilAgentSimulator();
  fetchLiveGithubTelemetry();
});

/* ==========================================================================
   01. PERPETUAL AUTO-UPDATE TEMPORAL ARITHMETIC
   Guarantees zero-maintenance perpetual accuracy for coming years
   ========================================================================== */
function initDynamicPerpetualDates() {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const experienceYears = Math.max(1, currentYear - startYear);

  // Update dynamic elements
  const expElem = document.getElementById('dynamicExpYears');
  if (expElem) expElem.textContent = `${experienceYears}+`;

  const currYearElem = document.getElementById('currentYearDisplay');
  if (currYearElem) currYearElem.textContent = currentYear;

  const cronYearElem = document.getElementById('cronYear');
  if (cronYearElem) cronYearElem.textContent = currentYear;

  const footerYearElem = document.getElementById('footerYear');
  if (footerYearElem) footerYearElem.textContent = currentYear;
}

/* ==========================================================================
   02. LIVE VARANASI IST CLOCK
   ========================================================================== */
function initLiveIstClock() {
  const clockElem = document.getElementById('live-ist-clock');
  if (!clockElem) return;

  function updateClock() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const istString = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockElem.textContent = `Varanasi IST ${istString}`;
    } catch {
      clockElem.textContent = `Varanasi IST Live`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   03. THEME TOGGLE (LIQUID GLASS ADAPTIVE PALETTE)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('apple-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('apple-theme', next);
  });
}

/* ==========================================================================
   04. AMBIENT CURSOR SPOTLIGHT (GPU ACCELERATED)
   ========================================================================== */
function initCursorSpotlight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderSpotlight() {
    // Damped lerp for liquid smoothness
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.left = `${currentX}px`;
    spotlight.style.top = `${currentY}px`;
    requestAnimationFrame(renderSpotlight);
  }

  renderSpotlight();
}

/* ==========================================================================
   05. POINTER-REACTIVE 3D BENTO TILT & SPECULAR SHEEN
   Physics: Apple spring-like tilt with dynamic light follow
   ========================================================================== */
function initPointerReactiveTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach((card) => {
    let bounds;

    function onPointerEnter() {
      bounds = card.getBoundingClientRect();
    }

    function onPointerMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      // Update specular gradient position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation (subtle, restrained Apple angle: max 3.5 deg)
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.2;
      const rotateY = ((x - centerX) / centerX) * 3.2;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
    }

    function onPointerLeave() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      bounds = null;
    }

    card.addEventListener('pointerenter', onPointerEnter, { passive: true });
    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', onPointerLeave, { passive: true });
  });
}

/* ==========================================================================
   06. MITHRIL MULTI-AGENT ORCHESTRATION LAB
   Interactive simulation mirroring mithril_agent.py
   ========================================================================== */
function initMithrilAgentSimulator() {
  const dispatchBtn = document.getElementById('dispatchAgentBtn');
  const queryInput = document.getElementById('researchQueryInput');
  const terminal = document.getElementById('terminalOutput');
  const taskTimestamp = document.getElementById('taskTimestamp');

  if (!dispatchBtn || !queryInput || !terminal) return;

  const nodes = {
    data: document.getElementById('node-data'),
    research: document.getElementById('node-research'),
    tech: document.getElementById('node-tech'),
    smart: document.getElementById('node-smart')
  };

  let isRunning = false;

  function updateNodeState(nodeKey, stateText, stateClass) {
    const node = nodes[nodeKey];
    if (!node) return;
    const badge = node.querySelector('.node-state');
    if (badge) {
      badge.textContent = stateText.toUpperCase();
      badge.className = `node-state ${stateClass}`;
    }
    node.className = `agent-node ${stateClass}`;
  }

  function appendLog(text, type = 'info') {
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  dispatchBtn.addEventListener('click', async () => {
    if (isRunning) return;
    const query = queryInput.value.trim() || 'Emerging Multi-Agent Cognitive Architectures';
    isRunning = true;
    dispatchBtn.disabled = true;
    dispatchBtn.style.opacity = '0.6';

    const timeStr = new Date().toLocaleTimeString();
    if (taskTimestamp) taskTimestamp.textContent = `Job ID: 0x${Math.floor(Math.random()*16777215).toString(16)} @ ${timeStr}`;

    terminal.innerHTML = '';
    appendLog(`<strong>[Orchestrator]</strong> Dispatched objective: <em>"${query}"</em>`, 'prompt');
    appendLog(`→ Initializing <code>asyncio.create_task</code> fan-out across 4 worker agents...`, 'info');

    // Step 1: Fan-out to agents
    updateNodeState('data', 'Processing', 'processing');
    updateNodeState('research', 'Processing', 'processing');
    updateNodeState('tech', 'Processing', 'processing');
    updateNodeState('smart', 'Processing', 'processing');

    await sleep(400);
    appendLog(`📊 <strong>DataAnalyst:</strong> Ingesting real-time market data & streaming indicators.`, 'agent');
    
    await sleep(450);
    appendLog(`📚 <strong>ResearchAssistant:</strong> Querying arXiv & academic corpora for semantic benchmarks.`, 'agent');
    
    await sleep(400);
    appendLog(`⚡ <strong>TechSpecialist:</strong> Evaluating algorithmic latency, concurrency ceilings & GPU utilization.`, 'agent');
    
    await sleep(550);
    appendLog(`🧠 <strong>SmartResearchAgent:</strong> Calling Gemini 1.5 Pro generative pipeline with contextual prompts...`, 'agent');

    // Complete intermediate nodes
    await sleep(350);
    updateNodeState('data', 'Complete', 'complete');
    appendLog(`✓ <strong>DataAnalyst:</strong> Processed real-time stream. Volatility index within normal bounds.`, 'success');

    await sleep(300);
    updateNodeState('tech', 'Complete', 'complete');
    appendLog(`✓ <strong>TechSpecialist:</strong> Verified AsyncIO event loop throughput at 10,000 req/sec.`, 'success');

    await sleep(350);
    updateNodeState('research', 'Complete', 'complete');
    appendLog(`✓ <strong>ResearchAssistant:</strong> Synthesized 8 peer-reviewed architectural frameworks.`, 'success');

    // Complete Gemini Smart Agent
    await sleep(500);
    updateNodeState('smart', 'Complete', 'complete');
    appendLog(`✓ <strong>SmartResearchAgent (Gemini):</strong> Analysis generated successfully:`, 'success');
    appendLog(`<blockquote>"Autonomous agent networks achieve optimal stability when deterministic code enforces coordination boundaries while foundation models handle unstructured semantic synthesis."</blockquote>`, 'info');

    appendLog(`🎉 <strong>[Orchestrator]</strong> Multi-Agent Consensus finalized in 2,450ms. Structured intelligence report compiled.`, 'prompt');

    isRunning = false;
    dispatchBtn.disabled = false;
    dispatchBtn.style.opacity = '1';
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ==========================================================================
   07. LIVE GITHUB TELEMETRY FETCHER
   ========================================================================== */
async function fetchLiveGithubTelemetry() {
  const repoDisplay = document.getElementById('repoCountDisplay');
  if (!repoDisplay) return;

  try {
    const res = await fetch('https://api.github.com/users/Rahul08319');
    if (!res.ok) return;
    const data = await res.json();
    if (data.public_repos !== undefined) {
      repoDisplay.textContent = data.public_repos;
    }
  } catch (err) {
    // Silent graceful fallback to pre-rendered count
  }
}
