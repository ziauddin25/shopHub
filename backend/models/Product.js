// =============================================
//  models/Product.js
// =============================================
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, default: "" },
    price:       { type: Number, required: true },
    image:       { type: String, required: true },
    category:    { type: String, default: "General" },
    stock:       { type: Number, default: 100 },
    rating:      { type: Number, default: 4.5, min: 0, max: 5 },
    reviews:     { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
