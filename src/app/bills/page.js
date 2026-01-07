"use client";

import Navbar from "../../../components/layout/Navbar.jsx";
import Sidebar from "../../../components/layout/Sidebar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import MobileNav from "../../../components/layout/MobileNav.jsx";
import BillPaymentForm from "../../../components/common/upi/BillPaymentForm.jsx";

export default function BillsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      <Navbar />
      <div className="flex flex-1 pb-20 sm:pb-0">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Bill Payments</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Pay your utility bills, recharge mobile, and more
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <BillPaymentForm />
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}
