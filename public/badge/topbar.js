(function() {
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
  const style = document.createElement('style');
  style.textContent = `
    .veryfy-topbar {
      width: 100%;
      height: 40px;
      background: linear-gradient(to right, white, #f0fdf4, white);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
      position: relative;
      z-index: 50;
    }
    .veryfy-topbar-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: slideIn 0.5s ease-out;
    }
    .veryfy-topbar-check {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: #16a34a;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .veryfy-topbar-text {
      font-size: 0.875rem;
      color: #374151;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    .veryfy-topbar-link {
      color: #16a34a;
      text-decoration: none;
      margin: 0 0.25rem;
    }
    .veryfy-topbar-link:hover {
      text-decoration: underline;
    }
    .veryfy-topbar-store {
      display: inline-flex;
      align-items: center;
      color: #4f46e5;
      cursor: pointer;
      font-size: 0.875rem;
      margin-left: 0.5rem;
      background: none;
      border: none;
      padding: 0;
    }
    .veryfy-topbar-store svg {
      width: 16px;
      height: 16px;
      margin: 0 0.25rem;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .veryfy-store-info {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      z-index: 49;
    }
    .veryfy-store-info.active {
      display: block;
    }
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Create topbar content
  const container = document.getElementById('verify-link-topbar');
  if (container) {
    container.className = 'veryfy-topbar';
    container.innerHTML = `
      <div class="veryfy-topbar-content">
        <svg class="veryfy-topbar-check" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="veryfy-topbar-text">
          Verified Official Store by
          <a href="https://veryfy.link" target="_blank" rel="noopener noreferrer" class="veryfy-topbar-link">
            Veryfy
          </a>
          <button class="veryfy-topbar-store" onclick="toggleStoreInfo()">
            <svg viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Check Store
          </button>
        </span>
      </div>
      <div id="veryfy-store-info" class="veryfy-store-info">
        <iframe src="${verifyUrl}" frameborder="0" style="width: 100%; height: 400px;"></iframe>
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
})();