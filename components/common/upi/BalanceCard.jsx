
"use client";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.js";
import useUser from "../../../hooks/useUser.js";
import { getBalanceService } from "../../../Services/upi.service.js";

export default function BalanceCard() {
  const { token, isAuthenticated } = useAuth();
  const { balance, setBalance } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    let ignore = false;
    const fetchBalance = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getBalanceService(token);
        if (!ignore) {
          setBalance(data.balance ?? 0);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load balance");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBalance();
    return () => {
      ignore = true;
    };
  }, [isAuthenticated, token, setBalance]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      <div className="relative">
        <div className="text-xs font-medium uppercase tracking-wider text-white/80">
          Available balance
        </div>
        <div className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {loading ? (
            <span className="inline-block h-10 w-32 animate-pulse rounded-lg bg-white/20" />
          ) : (
            `₹${balance.toFixed(2)}`
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-100 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}


