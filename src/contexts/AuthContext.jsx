import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          username: decoded.sub,
          role: decoded.role,
        });
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post("/auth/login", { username, password });
      const { token } = res.data;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);
      setUser({
        token,
        username: decoded.sub,
        role: decoded.role,
      });

      if (decoded.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (username, password) => {
    try {
      const res = await axios.post("/auth/register", { username, password });
      const { token } = res.data;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);
      setUser({
        token,
        username: decoded.sub,
        role: decoded.role,
      });

      if (decoded.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
