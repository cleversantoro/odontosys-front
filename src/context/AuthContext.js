import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("accessToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
