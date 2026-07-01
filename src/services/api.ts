const BASE_URL = import.meta.env.VITE_NOROFF_BASE_URL;
console.log("BASE_URL:", BASE_URL);

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token: string | null = null,
): Promise<T | null> {
  const url = BASE_URL + endpoint;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
    ...(options.headers as Record<string, string>),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 404) return null;
  if (response.status === 204) return null;

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message =
      error?.errors?.[0]?.message ?? `API request failed: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

export async function get<T>(
  endpoint: string,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(endpoint, {}, token);
}

export async function post<T>(
  endpoint: string,
  body: object,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(
    endpoint,
    { method: "POST", body: JSON.stringify(body) },
    token,
  );
}

export async function put<T>(
  endpoint: string,
  body?: object,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(
    endpoint,
    { method: "PUT", body: body ? JSON.stringify(body) : undefined },
    token,
  );
}

export async function del<T>(
  endpoint: string,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(endpoint, { method: "DELETE" }, token);
}
