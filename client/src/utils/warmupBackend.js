let warmupTriggered = false;

/**
 * Pings the backend health endpoint to wake up the server (e.g. Render free-tier cold start)
 * as soon as the frontend / landing page loads in the user's browser.
 */
export const warmupBackend = () => {
  if (warmupTriggered) return;
  warmupTriggered = true;

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fire-and-forget health check request to wake up the Render instance
  fetch(`${apiBase}/api/health`, {
    method: 'GET',
    cache: 'no-store',
  })
    .then((res) => {
      if (res.ok) {
        console.log('[InitPhase] Backend is awake and responding.');
      }
    })
    .catch(() => {
      // Even if the initial request times out or errors during container boot,
      // Render registers the incoming HTTP traffic and starts spinning up the container.
      console.log('[InitPhase] Backend wake-up ping dispatched.');
    });
};

// Automatically execute upon bundle load for the fastest possible wake-up
warmupBackend();
