// =============================================
//  controllers/orderController.js
// =============================================
const Order   = require("../models/Order");
const Cart    = require("../models/Cart");

// ── POST /api/orders ──────────────────────────
// Creates order from current cart, then clears it
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "card" } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Build order items snapshot (price locked at purchase time)
    const items = cart.items.map((i) => ({
      product:  i.product._id,
      title:    i.product.title,
      image:    i.product.image,
      price:    i.product.price,
      quantity: i.quantity,
    }));

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      isPaid: true,       // Mock payment — mark as paid immediately
      paidAt: new Date(),
    });

    // Clear the cart after order placed
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/orders ───────────────────────────
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/orders/:id ───────────────────────
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById };
