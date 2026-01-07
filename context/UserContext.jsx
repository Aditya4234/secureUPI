"use client";

import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      balance,
      setBalance,
    }),
    [profile, balance]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return ctx;
}


