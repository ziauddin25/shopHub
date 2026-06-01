// src/context/AuthContext.jsx
// ─── Global auth state (user, token, login, logout) ─────────────────────────
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);  // checking stored token on mount

  // On mount: if token exists, fetch current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authAPI.me()
        .then((res) => setUser(res.data))
        .catch(()   => localStorage.removeItem("token"))
        .finally(()  => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const signup = async (name, email, password) => {
    const res = await authAPI.signup({ name, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
