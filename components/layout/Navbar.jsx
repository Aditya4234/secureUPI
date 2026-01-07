
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth.js";
import MobileMenu from "./MobileMenu.jsx";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  const onLogout = () => {
    logout();
    router.push("/dashboard");
  };

  const isAuthRoute = pathname?.startsWith("/auth");

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-100 bg-white/95 backdrop-blur-lg px-4 py-3 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        {!isAuthRoute && <MobileMenu />}
        <Link href="/dashboard" className="flex items-center gap-1">
          <span className="text-xl font-bold text-zinc-900">
            secure<span className="text-indigo-600">UPI</span>
          </span>
        </Link>
      </div>

      {!isAuthRoute && (
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                {(user?.name || "U")[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-zinc-700">
                {user?.name || "User"}
              </span>
            </div>
          )}
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="hidden rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 active:bg-zinc-50 sm:inline-flex"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm active:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}


