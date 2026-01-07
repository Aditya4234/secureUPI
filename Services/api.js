const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || "Something went wrong";
    throw new Error(message);
  }

  return data;
}

export function get(path, token) {
  return request(path, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function post(path, body, token) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}


