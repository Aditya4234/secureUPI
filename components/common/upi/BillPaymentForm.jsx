"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth.js";

const billTypes = [
  { id: "mobile", label: "📱 Mobile Recharge", icon: "📱" },
  { id: "electricity", label: "⚡ Electricity Bill", icon: "⚡" },
  { id: "gas", label: "🔥 Gas Bill", icon: "🔥" },
  { id: "water", label: "💧 Water Bill", icon: "💧" },
  { id: "internet", label: "📡 Internet/DTH", icon: "📡" },
  { id: "insurance", label: "🛡️ Insurance", icon: "🛡️" },
];

export default function BillPaymentForm() {
  const { isAuthenticated } = useAuth();
  const [selectedType, setSelectedType] = useState("mobile");
  const [billNumber, setBillNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!isAuthenticated) {
      setError("Please login first.");
      return;
    }

    if (!billNumber || !amount) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // Simulate bill payment API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus("✅ Bill payment successful!");
      setBillNumber("");
      setAmount("");
    } catch (err) {
      setError("❌ Failed to process bill payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-zinc-900">Bill Payments</h3>
        <p className="text-sm text-zinc-500">Pay your bills instantly</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {billTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex flex-col items-center gap-2 rounded-xl p-4 transition ${
              selectedType === type.id
                ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200"
                : "bg-white border border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            <span className="text-2xl">{type.icon}</span>
            <span className="text-xs font-medium text-zinc-700 text-center">
              {type.label.split(" ")[1]}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            {billTypes.find(t => t.id === selectedType)?.label || "Bill Number"}
          </label>
          <input
            type="text"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            placeholder={
              selectedType === "mobile"
                ? "Enter mobile number"
                : "Enter bill number"
            }
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            required
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {status && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {status}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing...
            </>
          ) : (
            `💳 Pay ₹${amount || "0"}`
          )}
        </button>
      </form>
    </div>
  );
}

