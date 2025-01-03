export const createStyles = () => {
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
      color: #4f46e5;
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
    }
    .veryfy-store-details h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin: 0 0 0.5rem 0;
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
};