"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth.js";

export default function SplitBill() {
  const { isAuthenticated } = useAuth();
  const [totalAmount, setTotalAmount] = useState("");
  const [participants, setParticipants] = useState([
    { name: "You", amount: 0, isUser: true },
  ]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const addParticipant = () => {
    setParticipants([...participants, { name: "", amount: 0, isUser: false }]);
  };

  const updateParticipant = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const splitEqually = () => {
    const amount = parseFloat(totalAmount) || 0;
    const share = amount / participants.length;
    const updated = participants.map(p => ({ ...p, amount: share }));
    setParticipants(updated);
  };

  const handleSendRequests = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setStatus("");

    try {
      // Simulate sending split requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus("✅ Split requests sent successfully!");
      setTotalAmount("");
      setParticipants([{ name: "You", amount: 0, isUser: true }]);
    } catch (err) {
      setStatus("❌ Failed to send split requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-zinc-900">Split Bill</h3>
        <p className="text-sm text-zinc-500">Split expenses with friends</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Total Amount
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter total amount"
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={splitEqually}
            disabled={!totalAmount || participants.length < 2}
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Split Equally
          </button>
          <button
            onClick={addParticipant}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + Add Person
          </button>
        </div>

        <div className="space-y-3">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {participant.isUser ? "👤" : participant.name.charAt(0).toUpperCase() || "?"}
              </div>
              <input
                type="text"
                value={participant.name}
                onChange={(e) => updateParticipant(index, "name", e.target.value)}
                placeholder="Name"
                disabled={participant.isUser}
                className="flex-1 rounded-lg border border-zinc-200 px-3 py-1 text-sm outline-none focus:border-indigo-500 disabled:bg-zinc-50 disabled:text-zinc-500"
              />
              <div className="text-sm font-bold text-zinc-900 min-w-[80px] text-right">
                ₹{participant.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {status && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {status}
          </div>
        )}

        <button
          onClick={handleSendRequests}
          disabled={loading || participants.length < 2}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending requests...
            </>
          ) : (
            "📤 Send Split Requests"
          )}
        </button>
      </div>
    </div>
  );
}

