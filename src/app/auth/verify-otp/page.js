"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyOtpService } from "../../../../Services/auth.service.js";
import useAuth from "../../../../hooks/useAuth.js";
import OtpInput from "../../../../components/common/auth/OtpInput.jsx";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [mobile] = useState(searchParams.get("mobile") || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mobile) {
      router.push("/auth/send");
    }
  }, [mobile, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobile) return;

    setError("");
    setLoading(true);
    try {
      const data = await verifyOtpService({ mobile, otp });
      if (data.user && data.token) {
        login(data.user, data.token);
        router.push("/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!mobile) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur">
        <h1 className="text-2xl font-semibold text-zinc-900">Verify OTP</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Enter the OTP sent to {mobile}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <OtpInput value={otp} onChange={setOtp} />

          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Verifying...
              </>
            ) : (
              "✅ Verify OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          <Link
            href="/auth/send"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Resend OTP
          </Link>
        </div>
      </div>
    </div>
  );
}

