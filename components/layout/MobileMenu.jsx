"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth.js";

const menuLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/transactions", label: "Transactions", icon: "📋" },
  { href: "/receive", label: "Receive", icon: "📥" },
  { href: "/profile", label: "Profile", icon: "👤" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 text-zinc-700 active:bg-zinc-100 sm:hidden"
        aria-label="Menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-xl sm:hidden">
            <div className="flex flex-col h-full">
              <div className="border-b border-zinc-100 p-4">
                <div className="text-lg font-semibold text-zinc-900">
                  secure<span className="text-indigo-600">UPI</span>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {menuLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                          active
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-zinc-700 active:bg-zinc-50"
                        }`}
                      >
                        <span className="text-xl">{link.icon}</span>
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
              {isAuthenticated && (
                <div className="border-t border-zinc-100 p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 active:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

