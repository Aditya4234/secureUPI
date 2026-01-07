
"use client";

import { useState } from "react";
import Navbar from "../../../components/layout/Navbar.jsx";
import Sidebar from "../../../components/layout/Sidebar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import MobileNav from "../../../components/layout/MobileNav.jsx";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      <Navbar />
      <div className="flex flex-1 pb-20 sm:pb-0">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Manage your preferences and account settings
              </p>
            </div>

            <div className="space-y-3 rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setNotifications((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-4 text-left shadow-sm active:bg-zinc-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔔</span>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">UPI Notifications</div>
                    <div className="text-xs text-zinc-500">Get alerts for transactions</div>
                  </div>
                </div>
                <div className={`h-6 w-11 rounded-full transition ${notifications ? "bg-indigo-600" : "bg-zinc-300"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white shadow-md transition transform ${notifications ? "translate-x-5" : "translate-x-0.5"} mt-0.5`} />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDarkMode((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-4 text-left shadow-sm active:bg-zinc-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌙</span>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">Dark Mode</div>
                    <div className="text-xs text-zinc-500">Switch to dark theme</div>
                  </div>
                </div>
                <div className={`h-6 w-11 rounded-full transition ${darkMode ? "bg-indigo-600" : "bg-zinc-300"}`}>
                  <div className={`h-5 w-5 rounded-full bg-white shadow-md transition transform ${darkMode ? "translate-x-5" : "translate-x-0.5"} mt-0.5`} />
                </div>
              </button>

              <p className="pt-2 text-xs text-center text-zinc-500">
                These are demo-only toggles for UI demonstration
              </p>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}


