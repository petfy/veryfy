(function() {
  // Get registration number and verify URL from script attributes
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const registrationNumber = currentScript.getAttribute('data-registration');
  const verifyUrl = currentScript.getAttribute('data-verify-url');
  const currentDomain = window.location.hostname;
  const allowedDomain = currentScript.getAttribute('data-allowed-domain') || '';

  // Validate required attributes
  if (!registrationNumber || !verifyUrl) {
    console.error('Missing required attributes: data-registration and data-verify-url must be provided');
    return;
  }

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
    .veryfy-store-content {
      max-width: 64rem;
      margin: 0 auto;
      padding: 1rem;
    }
    .veryfy-store-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .veryfy-store-logo {
      width: 64px;
      height: 64px;
      border-radius: 9999px;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #6b7280;
      overflow: hidden;
    }
    .veryfy-store-details h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.5rem 0;
    }
    .veryfy-store-details p {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0.25rem 0;
    }
    .veryfy-store-details a {
      color: #6b7280;
      text-decoration: none;
      font-size: 0.875rem;
    }
    .veryfy-store-details a:hover {
      color: #4f46e5;
    }
    .veryfy-store-badge {
      display: inline-flex;
      align-items: center;
      background: #f3f4f6;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      color: #374151;
      margin-top: 0.5rem;
    }
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Function to fetch store data with retries
  async function fetchStoreData(retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const endpoint = `${verifyUrl}/api/verification-badges/${registrationNumber}`;
        console.log('Fetching store data from:', endpoint);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received store data:', data);
        return data;
      } catch (error) {
        console.warn(`Attempt ${attempt} failed:`, error);
        if (attempt === retries) {
          console.error('All fetch attempts failed:', error);
          return null;
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

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
        <div class="veryfy-store-content">
          <div id="store-data-container">Loading...</div>
        </div>
      </div>
    `;

    // Add toggle function to window scope with error handling
    window.toggleStoreInfo = async function() {
      const storeInfo = document.getElementById('veryfy-store-info');
      const storeDataContainer = document.getElementById('store-data-container');
      
      if (!storeInfo || !storeDataContainer) {
        console.error('Required elements not found');
        return;
      }

      const isActive = storeInfo.classList.toggle('active');
      
      if (isActive) {
        storeDataContainer.innerHTML = 'Loading...';
        const storeData = await fetchStoreData();
        
        if (storeData && storeData.store) {
          const store = storeData.store;
          storeDataContainer.innerHTML = `
            <div class="veryfy-store-header">
              <div class="veryfy-store-logo">
                ${store.logo_url ? 
                  `<img src="${store.logo_url}" alt="${store.name}" style="width: 100%; height: 100%; object-fit: cover;">` :
                  store.name[0]
                }
              </div>
              <div class="veryfy-store-details">
                <h3>${store.name}</h3>
                <p>${store.url}</p>
                <p>Verification Status: ${store.verification_status}</p>
                <a href="${verifyUrl}/verification/${registrationNumber}" target="_blank">View Verification Details</a>
                <div class="veryfy-store-badge">
                  <svg class="veryfy-topbar-check" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified by Veryfy
                </div>
              </div>
            </div>
          `;
        } else {
          storeDataContainer.innerHTML = `
            <div class="veryfy-store-header">
              <div class="veryfy-store-logo">V</div>
              <div class="veryfy-store-details">
                <h3>Verified Store</h3>
                <p>Unable to load store details. Please try again later.</p>
                <a href="${verifyUrl}/verification/${registrationNumber}" target="_blank">View Verification Details</a>
                <div class="veryfy-store-badge">
                  <svg class="veryfy-topbar-check" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified by Veryfy
                </div>
              </div>
            </div>
          `;
        }
      }
    };
  }
})();