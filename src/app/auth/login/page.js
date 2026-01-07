"use client";

import Link from "next/link";
import LoginForm from "../../../../components/common/auth/LoginForm.jsx";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8">
      <section className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Enter your registered mobile and UPI PIN to continue
          </p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-zinc-600">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign up
          </Link>
        </div>
      </section>
    </main>
  );
}


