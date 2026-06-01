// src/pages/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signup }  = useAuth();
  const navigate    = useNavigate();
  const [form,     setForm]    = useState({ name: "", email: "", password: "" });
  const [loading,  setLoading] = useState(false);
  const [error,    setError]   = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    try {
      setLoading(true);
      setError("");
      await signup(form.name, form.email, form.password);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#355872] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShoppingBag size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
          <p className="text-gray-400 text-sm mt-1">Join ShopHub and start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
            <input type="text" value={form.name} onChange={set("name")} required
              placeholder="John Smith"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#355872] transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
            <input type="email" value={form.email} onChange={set("email")} required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#355872] transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")} required
                placeholder="Min. 6 characters"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-[#355872] transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#355872] disabled:opacity-50 text-white py-3 rounded-xl font-black hover:bg-[#1e3a4f] transition-colors flex items-center justify-center gap-2 mt-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account…</> : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#355872] font-bold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
