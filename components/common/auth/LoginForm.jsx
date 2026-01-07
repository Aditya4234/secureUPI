"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth.js";
import { loginService } from "../../../Services/auth.service.js";
import { validateMobile, validatePin } from "../../../utils/validators.js";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const mobileError = validateMobile(mobile);
    if (mobileError) {
      setError(mobileError);
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(pinError);
      return;
    }

    setLoading(true);
    try {
      const data = await loginService({ mobile, pin });
      // Expecting backend to return { user, token }
      login(data.user, data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700">
          Mobile number
        </label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="10-digit mobile"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700">
          UPI PIN
        </label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={6}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
          ❌ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Logging in...
          </>
        ) : (
          "🔐 Login"
        )}
      </button>
    </form>
  );
}


