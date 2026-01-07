
"use client";

import Navbar from "../../../components/layout/Navbar.jsx";
import Sidebar from "../../../components/layout/Sidebar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import MobileNav from "../../../components/layout/MobileNav.jsx";
import useAuth from "../../../hooks/useAuth.js";
import BalanceCard from "../../../components/common/upi/BalanceCard.jsx";
import SendMoneyForm from "../../../components/common/upi/SendMoneyForm.jsx";
import ReceiverQr from "../../../components/common/upi/ReceiverQr.jsx";
import LoginForm from "../../../components/common/auth/LoginForm.jsx";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      <Navbar />
      <div className="flex flex-1 pb-20 sm:pb-0">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            {!isAuthenticated && (
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 px-5 py-4 text-sm font-medium text-amber-900 shadow-sm">
                ⚠️ Please login below to use all UPI features.
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
              <section className="space-y-6">
                <BalanceCard />
                <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-zinc-900">
                      Send money
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      Transfer securely via UPI ID or mobile number
                    </p>
                  </div>
                  <SendMoneyForm />
                </div>
              </section>

              <section className="space-y-6">
                <ReceiverQr />
                {!isAuthenticated && (
                  <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-zinc-900">
                        Quick login
                      </h2>
                      <p className="mt-1 text-sm text-zinc-500">
                        Login here to unlock full dashboard
                      </p>
                    </div>
                    <LoginForm />
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}


