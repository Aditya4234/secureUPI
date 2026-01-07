"use client";

import { useUserContext } from "../context/UserContext.jsx";

export default function useUser() {
  return useUserContext();
}


