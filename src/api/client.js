import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // https://api.tiburonshark.me

export function useApiClient() {
  const { getAccessTokenSilently } = useAuth0();

  async function apiFetch(path, options = {}) {
    // getAccessTokenSilently cachea el token y lo renueva solo cuando expira
    // (usa el refresh token por debajo) — no hay que manejar expiración a mano.
    const token = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`API ${res.status}: ${body}`);
    }
    return res.json();
  }

  return { apiFetch };
}
