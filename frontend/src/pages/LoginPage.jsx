// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const location    = useLocation();
  const from        = location.state?.from || "/products";

  const [form,     setForm]    = useState({ email: "", password: "" });
  const [loading,  setLoading] = useState(false);
  const [error,    setError]   = useState("");
  const [showPass, setShowPass] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#355872] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShoppingBag size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your ShopHub account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 font-medium">
              {error}
            </div>
          )}

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
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-[#355872] transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#355872] disabled:opacity-50 text-white py-3 rounded-xl font-black hover:bg-[#1e3a4f] transition-colors flex items-center justify-center gap-2 mt-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#355872] font-bold hover:underline">Sign up free</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
