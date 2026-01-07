
"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar.jsx";
import Sidebar from "../../../components/layout/Sidebar.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import MobileNav from "../../../components/layout/MobileNav.jsx";
import useAuth from "../../../hooks/useAuth.js";
import { listTransactionsService } from "../../../Services/transaction.service.js";

export default function TransactionsPage() {
  const { token, isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTransactions = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError("");
    try {
      const data = await listTransactionsService(token);
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 via-white to-indigo-50/30">
      <Navbar />
      <div className="flex flex-1 pb-20 sm:pb-0">
        <Sidebar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">
                  Transactions
                </h1>
                <p className="mt-1 text-sm text-zinc-500">
                  View your recent UPI payments
                </p>
              </div>
              <button
                onClick={loadTransactions}
                disabled={loading || !isAuthenticated}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm active:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "🔄" : "↻"}
              </button>
            </div>

            {!isAuthenticated && (
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 px-5 py-4 text-sm font-medium text-amber-900 shadow-sm">
                ⚠️ Login on the dashboard to see your transactions
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
                ❌ {error}
              </div>
            )}

            {loading && transactions.length === 0 ? (
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm flex flex-col items-center justify-center gap-4 h-full min-h-96 w-full">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600" />
                <p className="mt-4 text-sm text-zinc-500">Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm flex flex-col items-center justify-center gap-4 h-full min-h-96 w-full">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-sm font-medium text-zinc-600">No transactions yet</p>
                <p className="mt-1 text-xs text-zinc-500">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-3 sm:hidden">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="rounded-2xl border border-zinc-200/80 bg-white/80 p-4 shadow-md backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-zinc-900">
                          {tx.counterparty || tx.toUpiId || "-"}
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          {tx.createdAt
                            ? new Date(tx.createdAt).toLocaleString()
                            : "-"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-zinc-900">
                          ₹{Number(tx.amount || 0).toFixed(2)}
                        </div>
                        <div className="mt-1 text-xs font-medium text-zinc-500">
                          {tx.type || tx.direction || "debit"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {transactions.length > 0 && (
              <div className="hidden rounded-3xl border border-zinc-200/80 bg-white/80 shadow-lg backdrop-blur-sm sm:block">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-zinc-100 bg-zinc-50/50 text-xs uppercase tracking-wide text-zinc-500">
                    <tr>
                      <th className="px-6 py-4">To / From</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">View</th>
                      <th className="px-6 py-4">Delete</th>
                      <th className="px-6 py-4">Edit</th>
                      <th className="px-6 py-4">View All</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-t border-zinc-50 hover:bg-zinc-50/50 transition">
                        <td className="px-6 py-4 font-medium text-zinc-900">
                          {tx.counterparty || tx.toUpiId || "-"}
                        </td>
                        <td className="px-6 py-4 font-bold text-zinc-900">
                          ₹{Number(tx.amount || 0).toFixed(2)}
                          <button className="text-indigo-600 hover:text-indigo-700">View</button>
                          <button className="text-indigo-600 hover:text-indigo-700">Delete</button>
                          <button className="text-indigo-600 hover:text-indigo-700">Edit</button>

                        </td>
                        <td className="px-6 py-4 text-zinc-600">
                          {tx.type || tx.direction || "debit"}
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-500">
                          {tx.createdAt
                            ? new Date(tx.createdAt).toLocaleString()
                            : "-"}
                            <button className="text-indigo-600 hover:text-indigo-700">View All</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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



