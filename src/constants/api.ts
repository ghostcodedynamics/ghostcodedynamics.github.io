/**
 * Central API base URL. Reads from Vite env at build time so the
 * production frontend can point at the real backend without any
 * source changes.
 *   VITE_API_BASE=https://api.ghostcodedynamics.com
 */
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api";
