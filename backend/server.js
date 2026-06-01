// =============================================
//  server.js — Entry point for Express server
// =============================================
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`);
});

const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://ziauddinzoy_db_user:<xLjHK1aVYYenKZym>@cluster0.9ukn5pj.mongodb.net/ecommerce_ui_db")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.log("❌ MongoDB connection failed:", err));