(function() {
  // Import modules
  const { createStyles } = await import('./styles.js');
  const { translations, detectLanguage } = await import('./translations.js');

  // Get registration number and verify URL from script attributes
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const registrationNumber = currentScript.getAttribute('data-registration');
  const verifyUrl = currentScript.getAttribute('data-verify-url');
  const currentDomain = window.location.hostname;
  const allowedDomain = currentScript.getAttribute('data-allowed-domain') || '';

  // Check if the current domain is allowed
  if (allowedDomain && !currentDomain.includes(allowedDomain)) {
    console.error('Badge not authorized for this domain');
    return;
  }

  // Create and inject styles
  createStyles();

  // Create topbar content
  async function createTopBar() {
    const container = document.getElementById('verify-link-topbar');
    if (!container) return;

    const language = await detectLanguage();
    const t = translations[language] || translations.en;

    container.className = 'veryfy-topbar';
    container.innerHTML = `
      <div class="veryfy-topbar-content">
        <svg class="veryfy-topbar-check" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="veryfy-topbar-text">
          ${t.verifiedStore}
          <a href="https://veryfy.link" target="_blank" rel="noopener noreferrer" class="veryfy-topbar-link">
            Veryfy
          </a>
          <button class="veryfy-topbar-store" onclick="toggleStoreInfo()">
            <svg viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            ${t.checkStore}
          </button>
        </span>
      </div>
      <div id="veryfy-store-info" class="veryfy-store-info">
        <div class="veryfy-store-content">
          <div class="veryfy-store-header">
            <div class="veryfy-store-logo">V</div>
            <div class="veryfy-store-details">
              <h3>Verified Store</h3>
              <a href="${verifyUrl}" target="_blank">View Verification Details</a>
              <div class="veryfy-store-badge">
                <svg class="veryfy-topbar-check" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified by Veryfy
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add toggle function to window scope
    window.toggleStoreInfo = function() {
      const storeInfo = document.getElementById('veryfy-store-info');
      if (storeInfo) {
        storeInfo.classList.toggle('active');
      }
    };
  }

  // Initialize the topbar
  createTopBar();
})();