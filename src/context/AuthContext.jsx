import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attach token to every request automatically
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${API}/api/user/profile`);
        setUserInfo(data);
      } catch (error) {
        // Token expired or invalid — clear it
        localStorage.removeItem("jwt");
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/api/user/login`, {
      email,
      password,
    });
    localStorage.setItem("jwt", data.token);
    setUserInfo(data);
    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await axios.post(`${API}/api/user/create`, {
      name,
      email,
      password,
      phone,
    });
    localStorage.setItem("jwt", data.token);
    setUserInfo(data);
    return data;
  };

  const logout = async () => {
    await axios.post(`${API}/api/user/logout`);
    localStorage.removeItem("jwt");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
