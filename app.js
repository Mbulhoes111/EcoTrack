/* Pure calculation logic exported for testing */
export const transportFactors = {
  car: 3.2,
  bus: 1.1,
  metro: 0.7,
  bike: 0.1,
  walk: 0
};

export const dietFactors = {
  omnivore: 2.6,
  vegetarian: 1.4,
  vegan: 1.0
};

export function calculateImpactFromValues(transport, diet, energyKWh) {
  const transportFactor = transportFactors[transport] || 0;
  const dietFactor = dietFactors[diet] || 0;
  const energyFactor = Number(energyKWh) * 0.004;
  return Number((transportFactor + dietFactor + energyFactor).toFixed(1));
}

export function formatImpact(value) {
  return `${value.toFixed(1)} kg CO₂e`;
}

function safeQuery(selector) {
  return document.querySelector(selector);
}

function init() {
  const form = safeQuery('#impact-form');
  const transportSelect = safeQuery('#transport');
  const dietSelect = safeQuery('#diet');
  const energyInput = safeQuery('#energy');
  const energyValue = safeQuery('#energy-value');
  const impactTotal = safeQuery('#impact-total');
  const impactMessage = safeQuery('#impact-message');
  const offlineToggle = safeQuery('#offline-toggle');
  const offlineMessage = safeQuery('#offline-message');
  const profileStatus = safeQuery('#profile-status');
  const themeToggle = safeQuery('#theme-toggle');
  const tabs = document.querySelectorAll('.tab');
  const screens = document.querySelectorAll('.screen-card');
  const signupForm = safeQuery('#signup-form');
  const signupMessage = safeQuery('#signup-message');
  const loginForm = safeQuery('#login-form');
  const loginMessage = safeQuery('#login-message');
  const phoneGreeting = safeQuery('#phone-greeting');
  const loginScore = safeQuery('#login-score');

  function updateEnergyLabel() {
    if (energyValue && energyInput) energyValue.textContent = `${energyInput.value} kWh`;
  }

  function calculateImpact() {
    if (!impactTotal || !impactMessage || !transportSelect || !dietSelect || !energyInput) return;
    const total = calculateImpactFromValues(transportSelect.value, dietSelect.value, energyInput.value);
    impactTotal.textContent = formatImpact(total);

    if (total < 3.5) {
      impactMessage.textContent = 'Parabéns! Seu padrão está bem alinhado com escolhas mais sustentáveis.';
    } else if (total < 5.5) {
      impactMessage.textContent = 'Você está no caminho certo. Alguns ajustes podem reduzir ainda mais seu impacto.';
    } else {
      impactMessage.textContent = 'Há espaço para melhorar. Pequenas substituições já fazem diferença.';
    }
  }

  function setTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('ecotrack-theme', theme);
  }

  function activateOfflineMode() {
    if (!offlineToggle || !offlineMessage || !profileStatus) return;
    offlineToggle.classList.remove('btn--secondary');
    offlineToggle.classList.add('btn--primary');
    offlineToggle.textContent = 'Desativar modo offline';
    offlineMessage.textContent = 'Modo offline ativo. Suas ações serão sincronizadas automaticamente quando a conexão voltar.';
    profileStatus.textContent = 'Nível 3 • Modo offline ativo';
    localStorage.setItem('ecotrack-offline', 'true');
  }

  function deactivateOfflineMode() {
    if (!offlineToggle || !offlineMessage || !profileStatus) return;
    offlineToggle.classList.remove('btn--primary');
    offlineToggle.classList.add('btn--secondary');
    offlineToggle.textContent = 'Ativar modo offline';
    offlineMessage.textContent = 'Você pode registrar atividades sem internet e sincronizar depois.';
    profileStatus.textContent = 'Nível 2 • 68% da meta';
    localStorage.setItem('ecotrack-offline', 'false');
  }

  function toggleOfflineMode() {
    const isOffline = localStorage.getItem('ecotrack-offline') === 'true';
    if (isOffline) {
      deactivateOfflineMode();
    } else {
      activateOfflineMode();
    }
  }

  function switchTab(targetId) {
    tabs.forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.target === targetId);
    });

    screens.forEach((screen) => {
      screen.classList.toggle('is-visible', screen.id === targetId);
    });
  }

  function handleSignup(event) {
    event.preventDefault();
    const nameEl = document.getElementById('user-name');
    const emailEl = document.getElementById('user-email');
    const goalEl = document.getElementById('user-goal');
    if (!nameEl || !emailEl || !goalEl || !signupMessage || !phoneGreeting) return;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const goal = goalEl.value;

    if (!name || !email) return;

    const goalLabel = {
      transporte: 'reduzir uso de carro',
      energia: 'diminuir consumo de energia',
      alimentacao: 'adotar hábitos mais sustentáveis'
    }[goal] || 'melhorar sua rotina';

    signupMessage.textContent = `Olá, ${name}! Seu perfil foi criado com foco em ${goalLabel}.`;
    signupMessage.style.color = 'var(--primary)';
    phoneGreeting.textContent = `Olá, ${name}`;
    switchTab('tab-dashboard');
  }

  function handleLogin(event) {
    event.preventDefault();
    const emailEl = document.getElementById('login-email');
    const passEl = document.getElementById('login-password');
    if (!emailEl || !passEl || !loginMessage || !loginScore) return;
    const email = emailEl.value.trim();
    const password = passEl.value;
    if (!email || !password) return;
    loginMessage.textContent = `Bem-vindo de volta, ${email}! Seu painel já está pronto.`;
    loginScore.textContent = '+320';
    loginMessage.style.color = 'var(--primary)';
    switchTab('tab-goals');
  }

  if (energyInput) energyInput.addEventListener('input', updateEnergyLabel);
  if (form) form.addEventListener('submit', (event) => { event.preventDefault(); calculateImpact(); });
  if (offlineToggle) offlineToggle.addEventListener('click', toggleOfflineMode);
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  tabs.forEach((tab) => tab.addEventListener('click', () => switchTab(tab.dataset.target)));
  if (signupForm) signupForm.addEventListener('submit', handleSignup);
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const savedTheme = localStorage.getItem('ecotrack-theme') || 'light';
  setTheme(savedTheme);

  if (localStorage.getItem('ecotrack-offline') === 'true') {
    activateOfflineMode();
  } else {
    deactivateOfflineMode();
  }

  updateEnergyLabel();
  calculateImpact();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}

/* default export for compatibility */
export default { init, calculateImpactFromValues };

// Register service worker for PWA (optional)
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // registration failed
    });
  });
}
