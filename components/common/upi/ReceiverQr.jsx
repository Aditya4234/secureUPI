
"use client";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.js";
import { getReceiverQrService } from "../../../Services/upi.service.js";

export default function ReceiverQr() {
  const { token, isAuthenticated } = useAuth();
  const [qr, setQr] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    let ignore = false;
    const load = async () => {
      setError("");
      try {
        const data = await getReceiverQrService(token);
        if (!ignore) setQr(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load QR");
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [token, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 p-4 text-xs text-zinc-500">
        Login to see your UPI QR code.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
      <div className="mb-4 text-center">
        <div className="text-base font-bold text-zinc-900">Receive via QR</div>
        <p className="mt-1 text-xs text-zinc-500">
          Scan to send money to your account
        </p>
      </div>
      {qr?.imageUrl ? (
        <div className="rounded-2xl border-4 border-zinc-100 bg-white p-4 shadow-inner">
          <img
            src={qr.imageUrl}
            alt="UPI QR"
            className="h-48 w-48 rounded-xl"
          />
        </div>
      ) : (
        <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-center">
          <div className="px-4 text-xs font-medium text-zinc-400">
            {error || "QR will appear here"}
          </div>
        </div>
      )}
      {qr?.upiId && (
        <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-2 text-xs font-mono text-zinc-700">
          {qr.upiId}
        </div>
      )}
    </div>
  );
}


