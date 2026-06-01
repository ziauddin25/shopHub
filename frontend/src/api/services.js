// src/api/services.js
// ─── All API call helpers ────────────────────────────────────────────────────
import API from "./client";

// ── Auth ─────────────────────────────────────
export const authAPI = {
  signup: (data) => API.post("/auth/signup", data),
  login:  (data) => API.post("/auth/login",  data),
  me:     ()     => API.get("/auth/me"),
};

// ── Products ──────────────────────────────────
export const productAPI = {
  getAll:  (params) => API.get("/products", { params }),
  getById: (id)     => API.get(`/products/${id}`),
};

// ── Cart ──────────────────────────────────────
export const cartAPI = {
  get:     ()              => API.get("/cart"),
  add:     (productId, quantity = 1) => API.post("/cart", { productId, quantity }),
  update:  (itemId, quantity)        => API.put(`/cart/${itemId}`, { quantity }),
  remove:  (itemId)        => API.delete(`/cart/${itemId}`),
  clear:   ()              => API.delete("/cart/clear"),
};

// ── Orders ────────────────────────────────────
export const orderAPI = {
  create:  (data) => API.post("/orders", data),
  getAll:  ()     => API.get("/orders"),
  getById: (id)   => API.get(`/orders/${id}`),
};
