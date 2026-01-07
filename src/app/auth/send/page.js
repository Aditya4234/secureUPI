"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendOtpService } from "../../../../Services/auth.service.js";
import { validateMobile } from "../../../../utils/validators.js";

export default function SendOtpPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const mobileError = validateMobile(mobile);
    if (mobileError) {
      setError(mobileError);
      return;
    }

    setLoading(true);
    try {
      await sendOtpService({ mobile });
      setSuccess(true);
      setTimeout(() => {
        router.push(`/auth/verify-otp?mobile=${encodeURIComponent(mobile)}`);
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur">
        <h1 className="text-2xl font-semibold text-zinc-900">Send OTP</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Enter your mobile number to receive OTP.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Mobile number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile"
              maxLength={10}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
              OTP sent successfully! Redirecting...
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : success ? (
              "✅ Sent!"
            ) : (
              "📱 Send OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

