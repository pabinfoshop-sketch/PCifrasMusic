/* app.js - Core */
let currentSection = 'home';
let isPremium = false;

function updatePremiumUI() {
    isPremium = localStorage.getItem('cifras_premium') === 'true';
    const badge = document.getElementById('premium-badge');
    const btnHeader = document.getElementById('btn-premium-header');
    const statusEl = document.getElementById('premium-status');
    const subscribeBtn = document.getElementById('btn-subscribe');
    if (isPremium) {
        if (badge) badge.style.display = 'inline-block';
        if (btnHeader) btnHeader.style.display = 'none';
        if (statusEl) statusEl.innerHTML = '<span style="color:#4ade80;">✓ Premium Ativo</span>';
        if (subscribeBtn) { subscribeBtn.textContent = 'Você já é Premium!'; subscribeBtn.disabled = true; subscribeBtn.style.opacity = '0.6'; }
    } else {
        if (badge) badge.style.display = 'none';
        if (btnHeader) btnHeader.style.display = 'inline-block';
        if (statusEl) statusEl.innerHTML = '<span style="color:#f59e0b;">Trial / Gratuito</span>';
        if (subscribeBtn) { subscribeBtn.textContent = 'Assinar agora (7 dias grátis)'; subscribeBtn.disabled = false; subscribeBtn.style.opacity = '1'; }
    }
    if (window.refreshChords) window.refreshChords();
}

function subscribePremium() {
    if (confirm('Deseja ativar Premium por R$49,90/ano? (Simulação - 7 dias grátis)')) {
        localStorage.setItem('cifras_premium', 'true');
        localStorage.setItem('cifras_premium_date', Date.now().toString());
        updatePremiumUI();
        window.showToast('Parabéns! Premium ativado. 🎉');
        setTimeout(() => window.navigateTo('acordes'), 800);
    }
}

function resetPremium() {
    localStorage.removeItem('cifras_premium');
    localStorage.removeItem('cifras_premium_date');
    updatePremiumUI();
    window.showToast('Premium resetado.');
}

function showToast(message, duration = 2400) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, duration);
}

function navigateTo(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('section-' + section);
    if (target) target.classList.add('active');
    currentSection = section;
    updateNavActive(section);
    if (section === 'acordes' && window.refreshChords) window.refreshChords();
    if (section === 'favoritos' && window.renderFavorites) { window.renderFavorites(); window.renderMyCifras(); }
    if (section === 'escalas' && window.refreshScales) window.refreshScales();
}

function updateNavActive(section) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) item.classList.add('active');
    });
}

window.closeModal = function() {
    const modal = document.getElementById('modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

window.playModalSound = function() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.value = 440; gain.gain.value = 0.3;
        osc.connect(gain); gain.connect(ctx.destination); osc.start();
        setTimeout(() => { gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4); setTimeout(() => osc.stop(), 500); }, 200);
    } catch(e){}
};

window.initApp = function() {
    updatePremiumUI();
    const btnHeader = document.getElementById('btn-premium-header');
    if (btnHeader) btnHeader.addEventListener('click', () => navigateTo('premium'));
    const chordSearch = document.getElementById('chord-search');
    if (chordSearch) chordSearch.addEventListener('input', () => { if (window.filterChords) window.filterChords(); });
    const scaleSearch = document.getElementById('scale-search');
    if (scaleSearch) scaleSearch.addEventListener('input', () => { if (window.filterScales) window.filterScales(); });
    updateNavActive('home');
    if (!localStorage.getItem('cifras_welcomed')) {
        setTimeout(() => { showToast('Bem-vindo ao PCifrasMusic!'); localStorage.setItem('cifras_welcomed', 'true'); }, 1200);
    }
};

window.navigateTo = navigateTo;
window.showToast = showToast;
window.subscribePremium = subscribePremium;
window.resetPremium = resetPremium;
window.updatePremiumUI = updatePremiumUI;
