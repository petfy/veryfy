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
          <button class="veryfy-topbar-store" onclick="window.open('${verifyUrl}', 'verifyStore', 'width=600,height=600,location=no,menubar=no,scrollbars=yes,status=no,toolbar=no'); return false;">
            <svg viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Check Store
          </button>
        </span>
      </div>
    `;
  }
})();