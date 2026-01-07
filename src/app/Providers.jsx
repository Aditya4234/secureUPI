"use client";

import { AuthProvider } from "../../context/AuthContext.jsx";
import { UserProvider } from "../../context/UserContext.jsx";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

