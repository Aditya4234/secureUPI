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

  if (!mobile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8">
        <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm text-center">
          <div className="text-red-600 mb-4">⚠️ Invalid access</div>
          <p className="text-sm text-zinc-600 mb-4">No mobile number found. Please send OTP first.</p>
          <Link
            href="/auth/send"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Send OTP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-zinc-900">Verify OTP</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Enter the OTP sent to {mobile}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <OtpInput value={otp} onChange={setOtp} />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
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

        <div className="mt-6 text-center text-sm text-zinc-600">
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

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8">
        <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent mb-4" />
          <p className="text-sm text-zinc-600">Loading...</p>
        </div>
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}

