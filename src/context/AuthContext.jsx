import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/user/profile",
        );
        setUserInfo(data);
      } catch (error) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post((import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/user/login", {
      email,
      password,
    });
    setUserInfo(data);
    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await axios.post((import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/user/create", {
      name,
      email,
      password,
      phone,
    });
    setUserInfo(data);
    return data;
  };

  const logout = async () => {
    await axios.post((import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/user/logout");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, loading, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
