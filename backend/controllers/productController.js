// =============================================
//  controllers/productController.js
// =============================================
const Product = require("../models/Product");

// Seed data — auto-inserted if DB is empty
const SEED_PRODUCTS = [
  { title: "Wireless Noise-Cancelling Headphones", description: "Premium sound with 30hr battery & ANC technology.", price: 129.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", category: "Electronics", rating: 4.8, reviews: 2341 },
  { title: "Smart Watch Series X", description: "Health tracking, GPS, 7-day battery life.", price: 249.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", category: "Electronics", rating: 4.6, reviews: 1823 },
  { title: "Air Comfort Sneakers", description: "Ultra-lightweight with memory foam insoles.", price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", category: "Footwear", rating: 4.7, reviews: 956 },
  { title: "Minimalist Leather Wallet", description: "Slim RFID-blocking wallet — holds 8 cards.", price: 39.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", category: "Accessories", rating: 4.5, reviews: 432 },
  { title: "4K Action Camera", description: "Waterproof to 30m, stabilised 4K60 video.", price: 199.99, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400", category: "Electronics", rating: 4.4, reviews: 712 },
  { title: "Yoga & Fitness Mat", description: "6mm thick, non-slip, eco-friendly TPE.", price: 49.99, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400", category: "Sports", rating: 4.9, reviews: 1204 },
  { title: "Stainless Steel Water Bottle", description: "24hr cold, 12hr hot — 750ml insulated.", price: 29.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400", category: "Kitchen", rating: 4.7, reviews: 3102 },
  { title: "Mechanical Gaming Keyboard", description: "RGB backlit, blue switches, TKL layout.", price: 149.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", category: "Electronics", rating: 4.6, reviews: 891 },
  { title: "Scented Soy Candle Set", description: "Set of 3 hand-poured candles — 40hr burn.", price: 34.99, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400", category: "Home", rating: 4.8, reviews: 567 },
  { title: "Polarised Aviator Sunglasses", description: "UV400 protection with metal frame.", price: 59.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", category: "Accessories", rating: 4.5, reviews: 288 },
  { title: "Cold Brew Coffee Maker", description: "1L BPA-free glass carafe, 12hr steep.", price: 44.99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400", category: "Kitchen", rating: 4.6, reviews: 1054 },
  { title: "Laptop Stand — Adjustable", description: "Aluminium, 7 angles, fits 10–17\" laptops.", price: 54.99, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400", category: "Electronics", rating: 4.7, reviews: 2187 },
];

// ── GET /api/products ─────────────────────────
const getProducts = async (req, res) => {
  try {
    // Seed if empty
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(SEED_PRODUCTS);
      console.log("✅  Seeded 12 example products");
    }

    const { category, search, sort } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search)   query.title = { $regex: search, $options: "i" };

    let sortObj = {};
    if (sort === "price_asc")  sortObj = { price:  1 };
    if (sort === "price_desc") sortObj = { price: -1 };
    if (sort === "rating")     sortObj = { rating: -1 };

    const products = await Product.find(query).sort(sortObj);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/products/:id ─────────────────────
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getProductById };
