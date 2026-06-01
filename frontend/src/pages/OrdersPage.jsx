// src/pages/OrdersPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Clock, CheckCircle2, Truck, XCircle, ShoppingBag } from "lucide-react";
import { orderAPI } from "../api/services";
import { useAuth } from "../context/AuthContext";

const STATUS_ICONS = {
  pending:    { Icon: Clock,         color: "text-amber-500 bg-amber-50",    label: "Pending"    },
  processing: { Icon: Package,       color: "text-blue-500 bg-blue-50",      label: "Processing" },
  shipped:    { Icon: Truck,         color: "text-purple-500 bg-purple-50",  label: "Shipped"    },
  delivered:  { Icon: CheckCircle2,  color: "text-green-500 bg-green-50",    label: "Delivered"  },
  cancelled:  { Icon: XCircle,       color: "text-red-500 bg-red-50",        label: "Cancelled"  },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    orderAPI.getAll()
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#355872] border-t-transparent" />
    </div>
  );

  if (!orders.length) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        <ShoppingBag size={36} className="text-gray-300" />
      </div>
      <h2 className="text-2xl font-black text-gray-800">No orders yet</h2>
      <p className="text-gray-400 text-sm">Your order history will appear here.</p>
      <button onClick={() => navigate("/products")}
        className="bg-[#355872] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1e3a4f] transition-colors">
        Start Shopping
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <Package className="text-[#355872]" /> My Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_ICONS[order.status] || STATUS_ICONS.pending;
            return (
              <div key={order._id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                {/* Order header */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
                    <status.Icon size={12} />
                    {status.label}
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <img src={item.image} alt={item.title} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-gray-800 max-w-32 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-400">×{item.quantity} · ${item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="text-xs text-gray-500">
                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </div>
                  <div className="font-black text-[#355872]">
                    Total: ${order.totalAmount?.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
