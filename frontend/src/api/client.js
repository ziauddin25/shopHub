// src/api/client.js
// ─── Centralised Axios instance ─────────────────────────────────────────────
// Vite exposes env vars through `import.meta.env` and they must be prefixed with
// `VITE_`. `process.env.REACT_APP_API_URL` is from Create‑React‑App and won't work
// under Vite, so fall back to a hardcoded value if nothing is provided.
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || // defined in frontend/.env (see README)
    "http://localhost:5000/api",
});

// Attach JWT token automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
