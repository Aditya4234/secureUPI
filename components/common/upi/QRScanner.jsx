"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth.js";

export default function QRScanner() {
  const { isAuthenticated } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const startScanning = () => {
    setIsScanning(true);
    setScannedData(null);
    setStatus("");

    // Simulate QR scanning
    setTimeout(() => {
      setScannedData({
        merchant: "Sample Store",
        upiId: "merchant@ybl",
        amount: "150.00"
      });
      setIsScanning(false);
    }, 3000);
  };

  const processPayment = async () => {
    if (!scannedData || !isAuthenticated) return;

    setLoading(true);
    setStatus("");

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus(`✅ Paid ₹${amount || scannedData.amount} to ${scannedData.merchant}`);
      setScannedData(null);
      setAmount("");
    } catch (err) {
      setStatus("❌ Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-zinc-900">Scan & Pay</h3>
        <p className="text-sm text-zinc-500">Scan QR codes to make payments</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {!scannedData ? (
          <div className="relative">
            <div className={`h-64 w-64 rounded-2xl border-4 border-dashed ${
              isScanning ? "border-indigo-400 bg-indigo-50" : "border-zinc-300"
            } flex items-center justify-center transition-colors`}>
              {isScanning ? (
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mb-2" />
                  <div className="text-sm font-medium text-indigo-600">Scanning...</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <div className="text-sm font-medium text-zinc-500">
                    Point camera at QR code
                  </div>
                </div>
              )}
            </div>
            {!isScanning && (
              <button
                onClick={startScanning}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-indigo-700"
              >
                Scan QR
              </button>
            )}
          </div>
        ) : (
          <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold text-zinc-900">{scannedData.merchant}</div>
              <div className="text-sm text-zinc-500">{scannedData.upiId}</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`₹${scannedData.amount}`}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setScannedData(null)}
                  className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                >
                  {loading ? "..." : "Pay"}
                </button>
              </div>
            </div>
          </div>
        )}

        {status && (
          <div className="w-full max-w-sm rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

