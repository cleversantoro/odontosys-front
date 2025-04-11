import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    // useEffect(() => {
    //   const storedToken = localStorage.getItem('accessToken');
    //   if (storedToken) {
    //     setToken(storedToken);
    //     setIsAuthenticated(true);
    //   }
    // }, []);

    useEffect(() => {
      const storedToken = localStorage.getItem('accessToken');
      const storedRefresh = localStorage.getItem('refreshToken');
      if (storedToken && storedRefresh) {
        setToken(storedToken);
        setRefreshToken(storedRefresh);
        setIsAuthenticated(true);
      }
    }, []);
    

  // const login = (jwtToken) => {
  //   setToken(jwtToken);
  //   setIsAuthenticated(true);
  //   localStorage.setItem('accessToken', jwtToken);
  // };
  const login = (jwtToken, refresh) => {
    setToken(jwtToken);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', jwtToken);
    localStorage.setItem('refreshToken', refresh);
  };

  // const logout = () => {
  //   setToken(null);
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('accessToken');
  // };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  


return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};






