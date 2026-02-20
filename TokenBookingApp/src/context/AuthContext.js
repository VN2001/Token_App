import React, { createContext, useState, useMemo, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ useCallback ensures these functions are not recreated on every render
  const login = useCallback(() => {
    setUser({ name: "Test User", role: "user" });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // ✅ useMemo ensures the context value object is only recreated when user changes
  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};