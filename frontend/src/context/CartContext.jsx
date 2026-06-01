// src/context/CartContext.jsx
// ─── Global cart state synced with backend ───────────────────────────────────
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cartAPI } from "../api/services";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart,    setCart]    = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  // Derived values
  const itemCount   = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const totalAmount = cart.items?.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0) || 0;

  // Fetch cart whenever user changes
  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [] }); return; }
    try {
      setLoading(true);
      const res = await cartAPI.get();
      setCart(res.data || { items: [] });
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) throw new Error("Please log in to add items to cart");
    const res = await cartAPI.add(productId, quantity);
    setCart(res.data);
    return res.data;
  };

  const updateItem = async (itemId, quantity) => {
    const res = await cartAPI.update(itemId, quantity);
    setCart(res.data);
  };

  const removeItem = async (itemId) => {
    const res = await cartAPI.remove(itemId);
    setCart(res.data);
  };

  const clearCart = async () => {
    await cartAPI.clear();
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{
      cart, loading, itemCount, totalAmount,
      addToCart, updateItem, removeItem, clearCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
