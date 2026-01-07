"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/transactions", label: "History", icon: "📋" },
  { href: "/receive", label: "Receive", icon: "📥" },
  { href: "/bills", label: "Bills", icon: "💳" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur-lg sm:hidden">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-zinc-500 active:bg-zinc-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

