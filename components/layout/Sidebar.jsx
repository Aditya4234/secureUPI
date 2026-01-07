
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/transactions", label: "Transactions", icon: "📋" },
  { href: "/receive", label: "Receive", icon: "📥" },
  { href: "/bills", label: "Bills", icon: "💳" },
  { href: "/transfer", label: "Transfer", icon: "💸" },
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/profile", label: "Profile", icon: "👤" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-zinc-100 bg-white/80 px-4 py-6 sm:block">
      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-50 active:bg-zinc-100"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


