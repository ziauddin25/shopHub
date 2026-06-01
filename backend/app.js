// =============================================
//  app.js — Express app configuration
// =============================================
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes    = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes    = require("./routes/cart");
const orderRoutes   = require("./routes/orders");

const app = express();

// ── Connect to MongoDB ────────────────────────
connectDB();

// ── Middlewares ───────────────────────────────
app.use(cors({
  // Vite defaults to port 5173; update CLIENT_URL if you run the frontend
  // somewhere else. The env var can be set in backend/.env or via export.
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",     cartRoutes);
app.use("/api/orders",   orderRoutes);

// ── Health check ─────────────────────────────
app.get("/", (_req, res) => res.json({ message: "Ecommerce ui API running 🚀" }));

// ── Global error handler ──────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection failed:", err));

module.exports = app;
