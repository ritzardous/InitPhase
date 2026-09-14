let warmedInSession = false;

/**
 * Smart backend cold-boot warmup:
 * - Runs only during browser idle time (never blocks initial render, interaction, or animation)
 * - Uses low-priority fetch so critical assets/user requests always take precedence
 * - Dispatches the wake-up ping to Render's gateway (Render begins waking up the container instantly)
 * - Automatically times out the client connection after 6 seconds so it never keeps a hanging
 *   network socket open while Render spins up
 * - Persists in sessionStorage to run at most ONCE per browsing session
 */
export const warmupBackend = () => {
  if (typeof window === 'undefined') return;

  // Check if we already dispatched a warmup in this tab session
  try {
    if (sessionStorage.getItem('initphase_warmed') === 'true' || warmedInSession) {
      return;
    }
    sessionStorage.setItem('initphase_warmed', 'true');
  } catch {
    if (warmedInSession) return;
  }
  warmedInSession = true;

  const performWarmup = () => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Abort controller with 6-second timeout:
    // Render starts waking up the instant the HTTP request packet hits its ingress.
    // Releasing the client socket after 6s prevents the browser socket pool from being
    // monopolized while Render spins up, keeping all subsequent frontend actions snappy.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      try {
        controller.abort();
      } catch {
        // Ignore abort error
      }
    }, 6000);

    fetch(`${apiBase}/api/health`, {
      method: 'GET',
      priority: 'low',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (res.ok) {
          console.debug('[InitPhase] Backend is hot and ready.');
        }
      })
      .catch(() => {
        // Abort or network wait during container boot is expected and silent.
        // Render has already registered the ingress traffic and is warming up.
        clearTimeout(timeoutId);
      });
  };

  // Defer execution until after the page is loaded and the main thread is completely idle
  const schedule = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(performWarmup, { timeout: 4000 });
    } else {
      setTimeout(performWarmup, 2000);
    }
  };

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }
};
