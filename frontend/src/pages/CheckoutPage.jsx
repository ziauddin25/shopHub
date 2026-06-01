// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { orderAPI } from "../api/services";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step,     setStep]     = useState(1);  // 1 = shipping, 2 = payment, 3 = success
  const [loading,  setLoading]  = useState(false);
  const [orderId,  setOrderId]  = useState(null);
  const [form,     setForm]     = useState({
    fullName: "", address: "", city: "", zip: "", country: "US",
    cardNumber: "", expiry: "", cvv: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = async () => {
    try {
      setLoading(true);
      const res = await orderAPI.create({
        shippingAddress: {
          fullName: form.fullName,
          address:  form.address,
          city:     form.city,
          zip:      form.zip,
          country:  form.country,
        },
        paymentMethod: "card",
      });
      setOrderId(res.data._id);
      await clearCart();
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const input = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#355872] transition-colors"
      />
    </div>
  );

  if (step === 3) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={44} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Order Placed! 🎉</h1>
        <p className="text-gray-500 text-sm mb-1">Your order has been confirmed.</p>
        <p className="text-xs text-gray-400 mb-6">Order ID: <span className="font-mono">{orderId?.slice(-8).toUpperCase()}</span></p>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate("/orders")}
            className="bg-[#355872] text-white py-3 rounded-xl font-bold hover:bg-[#1e3a4f] transition-colors">
            View My Orders
          </button>
          <button onClick={() => navigate("/products")}
            className="text-[#355872] font-semibold underline text-sm">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-8">
          {[{ n: 1, label: "Shipping" }, { n: 2, label: "Payment" }].map(({ n, label }) => (
            <div key={n} className={`flex items-center gap-2 text-sm font-bold ${step >= n ? "text-[#355872]" : "text-gray-300"}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${step >= n ? "bg-[#355872] text-white" : "bg-gray-200"}`}>{n}</span>
              {label}
              {n < 2 && <div className={`w-12 h-0.5 ${step > n ? "bg-[#355872]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            {step === 1 && (
              <>
                <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-[#355872]" /> Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {input("Full Name", "fullName", "text", "John Smith")}
                  {input("Address", "address", "text", "123 Main St")}
                  <div className="grid grid-cols-2 gap-3">
                    {input("City", "city", "text", "New York")}
                    {input("ZIP Code", "zip", "text", "10001")}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Country</label>
                    <select value={form.country} onChange={set("country")}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#355872]">
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="BD">Bangladesh</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.fullName || !form.address || !form.city || !form.zip}
                  className="mt-6 w-full bg-[#355872] disabled:opacity-40 text-white py-3.5 rounded-xl font-black hover:bg-[#1e3a4f] transition-colors"
                >
                  Continue to Payment →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#355872]" /> Payment Details
                </h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-medium mb-5">
                  🔒 This is a demo — no real payment is processed.
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {input("Card Number", "cardNumber", "text", "4242 4242 4242 4242")}
                  <div className="grid grid-cols-2 gap-3">
                    {input("Expiry", "expiry", "text", "MM/YY")}
                    {input("CVV", "cvv", "text", "123")}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                    ← Back
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={loading || !form.cardNumber || !form.expiry || !form.cvv}
                    className="flex-2 flex-1 bg-[#355872] disabled:opacity-40 text-white py-3 rounded-xl font-black hover:bg-[#1e3a4f] transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Placing…</> : "Place Order"}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-sm mb-4 text-gray-900">Order Summary</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                {cart.items?.map((item) => (
                  <div key={item._id} className="flex items-center gap-2">
                    <img src={item.product?.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.product?.title}</p>
                      <p className="text-xs text-gray-400">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-sm">
                <span>Total</span>
                <span className="text-[#355872]">${(totalAmount * 1.1 + (totalAmount >= 50 ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
