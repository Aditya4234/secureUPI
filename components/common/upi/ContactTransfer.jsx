"use client";

import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth.js";

const mockContacts = [
  { id: 1, name: "Rahul Sharma", mobile: "9876543210", upiId: "rahul@ybl", avatar: "R" },
  { id: 2, name: "Priya Singh", mobile: "8765432109", upiId: "priya@paytm", avatar: "P" },
  { id: 3, name: "Amit Kumar", mobile: "7654321098", upiId: "amit@sbi", avatar: "A" },
  { id: 4, name: "Sneha Patel", mobile: "6543210987", upiId: "sneha@axis", avatar: "S" },
  { id: 5, name: "Vikas Gupta", mobile: "5432109876", upiId: "vikas@hdfc", avatar: "V" },
];

export default function ContactTransfer() {
  const { isAuthenticated } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // Simulate loading contacts
      setTimeout(() => setContacts(mockContacts), 1000);
    }
  }, [isAuthenticated]);

  const handleTransfer = async () => {
    if (!selectedContact || !amount) return;

    setLoading(true);
    setStatus("");

    try {
      // Simulate transfer
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus(`✅ Sent ₹${amount} to ${selectedContact.name}`);
      setAmount("");
      setSelectedContact(null);
    } catch (err) {
      setStatus("❌ Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-zinc-900">Quick Transfer</h3>
        <p className="text-sm text-zinc-500">Send money to your contacts</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-3">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 transition ${
                selectedContact?.id === contact.id
                  ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200"
                  : "bg-white border border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {contact.avatar}
              </div>
              <span className="text-xs font-medium text-zinc-700 text-center truncate w-full">
                {contact.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>

        {selectedContact && (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {selectedContact.avatar}
              </div>
              <div>
                <div className="font-semibold text-zinc-900">
                  {selectedContact.name}
                </div>
                <div className="text-sm text-zinc-500">
                  {selectedContact.upiId}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={handleTransfer}
                disabled={loading || !amount}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        )}

        {status && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

