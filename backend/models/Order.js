// =============================================
//  models/Order.js
// =============================================
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  title:    String,
  image:    String,
  price:    Number,
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user:            { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items:           [orderItemSchema],
    totalAmount:     { type: Number, required: true },
    status:          { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
    shippingAddress: {
      fullName: String,
      address:  String,
      city:     String,
      zip:      String,
      country:  String,
    },
    paymentMethod:   { type: String, default: "card" },
    isPaid:          { type: Boolean, default: false },
    paidAt:          Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
