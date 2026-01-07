"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("secureUPI_auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch {
      // ignore corrupted storage
    }
    setLoading(false);
  }, []);

  const persist = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextUser && nextToken) {
      window.localStorage.setItem(
        "secureUPI_auth",
        JSON.stringify({ user: nextUser, token: nextToken })
      );
    } else {
      window.localStorage.removeItem("secureUPI_auth");
    }
  };

  const login = (nextUser, nextToken) => {
    persist(nextUser, nextToken);
  };

  const logout = () => {
    persist(null, null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}


