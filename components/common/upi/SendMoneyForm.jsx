
"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth.js";
import { sendMoneyService } from "../../../Services/transaction.service.js";
import { validateUpiId, validateAmount } from "../../../utils/validators.js";

export default function SendMoneyForm() {
  const { token, isAuthenticated } = useAuth();
  const [toUpiId, setToUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
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

    const upiError = validateUpiId(toUpiId);
    if (upiError) {
      setError(upiError);
      return;
    }

    const amountNum = Number(amount);
    const amountError = validateAmount(amountNum);
    if (amountError) {
      setError(amountError);
      return;
    }

    setLoading(true);
    try {
      await sendMoneyService(
        { toUpiId, amount: amountNum, note },
        token
      );
      setStatus("Payment sent successfully!");
      setToUpiId("");
      setAmount("");
      setNote("");
    } catch (err) {
      setError(err.message || "Failed to send payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label className="block text-xs font-medium text-zinc-700">
          UPI ID / Mobile
        </label>
        <input
          value={toUpiId}
          onChange={(e) => setToUpiId(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="block text-xs font-medium text-zinc-700">
          Amount
        </label>
        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="block text-xs font-medium text-zinc-700">
          Note (optional)
        </label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
          ❌ {error}
        </div>
      )}
      {status && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
          ✅ {status}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending...
          </>
        ) : (
          "💸 Send money"
        )}
      </button>
    </form>
  );
}


