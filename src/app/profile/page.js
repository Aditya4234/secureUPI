
"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar.jsx";
import Sidebar from "../../../components/layout/Sidebar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import MobileNav from "../../../components/layout/MobileNav.jsx";
import useAuth from "../../../hooks/useAuth.js";
import { getProfileService } from "../../../Services/user.service.js";

export default function ProfilePage() {
  const { user, isAuthenticated, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProfileService(token);
        setProfile(data.user || data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [isAuthenticated, token]);

  const data = profile || user || {};

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      <Navbar />
      <div className="flex flex-1 pb-20 sm:pb-0">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Profile</h1>
              <p className="mt-1 text-sm text-zinc-500">
                View your basic account information
              </p>
            </div>

            {!isAuthenticated && (
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 px-5 py-4 text-sm font-medium text-amber-900 shadow-sm">
                ⚠️ Login from dashboard to see your profile details
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
                ❌ {error}
              </div>
            )}

            {loading && (
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600" />
                <p className="mt-4 text-sm text-zinc-500">Loading profile...</p>
              </div>
            )}

            {!loading && (
              <div className="space-y-4 rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-4 pb-4 border-b border-zinc-100">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {(data.name || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-900">{data.name || "-"}</div>
                    <div className="text-sm text-zinc-500">{data.mobile || data.phone || "-"}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl bg-zinc-50 p-4">
                    <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 mb-2">UPI ID</div>
                    <div className="text-base font-mono font-semibold text-zinc-900">{data.upiId || "-"}</div>
                  </div>
                  {data.balance !== undefined && (
                    <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 mb-2">Balance</div>
                      <div className="text-2xl font-bold text-zinc-900">
                        ₹{Number(data.balance || 0).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}


