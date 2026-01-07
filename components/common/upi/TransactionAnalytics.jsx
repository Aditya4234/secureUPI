"use client";

import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth.js";

const mockAnalytics = {
  monthlySpending: 45000,
  categoryBreakdown: [
    { category: "Food", amount: 12000, color: "bg-red-500" },
    { category: "Transport", amount: 8000, color: "bg-blue-500" },
    { category: "Shopping", amount: 15000, color: "bg-green-500" },
    { category: "Bills", amount: 10000, color: "bg-yellow-500" },
  ],
  topRecipients: [
    { name: "Rahul", amount: 5500, count: 12 },
    { name: "Priya", amount: 4200, count: 8 },
    { name: "Amit", amount: 3800, count: 6 },
  ],
  weeklyTrend: [
    { day: "Mon", amount: 1200 },
    { day: "Tue", amount: 1800 },
    { day: "Wed", amount: 900 },
    { day: "Thu", amount: 2100 },
    { day: "Fri", amount: 1600 },
    { day: "Sat", amount: 2800 },
    { day: "Sun", amount: 1400 },
  ]
};

export default function TransactionAnalytics() {
  const { isAuthenticated } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      // Simulate loading analytics
      setTimeout(() => {
        setAnalytics(mockAnalytics);
        setLoading(false);
      }, 1500);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-900">
        ⚠️ Login to view transaction analytics
      </div>
    );
  }

  const maxWeeklyAmount = Math.max(...analytics.weeklyTrend.map(d => d.amount));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-zinc-900">Analytics</h3>
        <p className="text-sm text-zinc-500">Your spending insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Overview */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h4 className="font-semibold text-zinc-900 mb-3">This Month</h4>
          <div className="text-2xl font-bold text-zinc-900 mb-1">
            ₹{analytics.monthlySpending.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-500">Total spending</div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h4 className="font-semibold text-zinc-900 mb-3">Spending by Category</h4>
          <div className="space-y-2">
            {analytics.categoryBreakdown.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${cat.color}`} />
                  <span className="text-sm text-zinc-700">{cat.category}</span>
                </div>
                <span className="text-sm font-medium text-zinc-900">
                  ₹{cat.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 md:col-span-2">
          <h4 className="font-semibold text-zinc-900 mb-3">Weekly Trend</h4>
          <div className="flex items-end gap-2 h-32">
            {analytics.weeklyTrend.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t mb-2 transition-all hover:opacity-80"
                  style={{ height: `${(day.amount / maxWeeklyAmount) * 100}%` }}
                />
                <div className="text-xs font-medium text-zinc-600">{day.day}</div>
                <div className="text-xs text-zinc-500">₹{day.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recipients */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 md:col-span-2">
          <h4 className="font-semibold text-zinc-900 mb-3">Top Recipients</h4>
          <div className="space-y-3">
            {analytics.topRecipients.map((recipient, index) => (
              <div key={recipient.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900">{recipient.name}</div>
                    <div className="text-xs text-zinc-500">{recipient.count} transactions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-zinc-900">
                    ₹{recipient.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

