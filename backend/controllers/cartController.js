// =============================================
//  controllers/cartController.js
// =============================================
const Cart    = require("../models/Cart");
const Product = require("../models/Product");

// Helper: return fully populated cart
const populatedCart = (userId) =>
  Cart.findOne({ user: userId }).populate("items.product");

// ── GET /api/cart ─────────────────────────────
const getCart = async (req, res) => {
  try {
    const cart = await populatedCart(req.user._id);
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── POST /api/cart ────────────────────────────
// Body: { productId, quantity }
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
    } else {
      const existingItem = cart.items.find((i) => i.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity; // increment if already in cart
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.json(await populatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── PUT /api/cart/:itemId ─────────────────────
// Body: { quantity }
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (quantity < 1) {
      item.remove(); // remove if quantity drops to 0
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    res.json(await populatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE /api/cart/:itemId ──────────────────
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
    await cart.save();
    res.json(await populatedCart(req.user._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE /api/cart ──────────────────────────
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
