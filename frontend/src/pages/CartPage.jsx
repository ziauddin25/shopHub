// src/pages/CartPage.jsx
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, itemCount, totalAmount, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#355872] border-t-transparent" />
    </div>
  );

  if (!cart?.items?.length) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        <ShoppingCart size={36} className="text-gray-300" />
      </div>
      <h2 className="text-2xl font-black text-gray-800">Your cart is empty</h2>
      <p className="text-gray-400 text-sm">Start adding products to see them here.</p>
      <button onClick={() => navigate("/products")}
        className="bg-[#355872] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1e3a4f] transition-colors">
        Browse Products
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingCart className="text-[#355872]" />
          Your Cart
          <span className="text-lg font-semibold text-gray-400">({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 space-y-4">
            {cart.items.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={item.product?.image}
                  alt={item.product?.title}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=P"; }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{item.product?.title}</h3>
                  <p className="text-[#355872] font-black text-base mt-1">${item.product?.price?.toFixed(2)}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-1 py-1">
                  <button
                    onClick={() => updateItem(item._id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateItem(item._id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Line total */}
                <p className="font-black text-gray-900 w-16 text-right text-sm">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Package size={18} className="text-[#355872]" /> Order Summary
              </h2>
              <div className="space-y-2 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600">{totalAmount >= 50 ? "FREE" : "$4.99"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="font-bold">${(totalAmount * 0.1).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-base mb-5">
                <span>Total</span>
                <span className="text-[#355872]">
                  ${(totalAmount + (totalAmount >= 50 ? 0 : 4.99) + totalAmount * 0.1).toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#355872] hover:bg-[#1e3a4f] text-white py-3.5 rounded-xl font-black flex items-center justify-center gap-2 transition-colors"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/products")}
                className="w-full mt-3 text-[#355872] text-sm font-semibold underline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
