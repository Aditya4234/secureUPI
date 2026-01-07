"use client";

import Navbar from "../../../components/layout/Navbar.jsx";
import Sidebar from "../../../components/layout/Sidebar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import MobileNav from "../../../components/layout/MobileNav.jsx";
import ContactTransfer from "../../../components/common/upi/ContactTransfer.jsx";
import SplitBill from "../../../components/common/upi/SplitBill.jsx";
import SavingsGoal from "../../../components/common/upi/SavingsGoal.jsx";

export default function TransferPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      <Navbar />
      <div className="flex flex-1 pb-20 sm:pb-0">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Transfer & More</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Send money, split bills, and manage your savings goals
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                  <ContactTransfer />
                </div>
                <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                  <SplitBill />
                </div>
              </div>
              <div>
                <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                  <SavingsGoal />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}
