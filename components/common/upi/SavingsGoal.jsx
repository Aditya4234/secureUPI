"use client";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth.js";

const mockGoals = [
  { id: 1, name: "New Phone", target: 50000, saved: 25000, deadline: "2024-12-31", emoji: "📱" },
  { id: 2, name: "Vacation", target: 30000, saved: 12000, deadline: "2024-08-15", emoji: "🏖️" },
  { id: 3, name: "Emergency Fund", target: 100000, saved: 45000, deadline: "2025-12-31", emoji: "🛡️" },
];

export default function SavingsGoal() {
  const { isAuthenticated } = useAuth();
  const [goals, setGoals] = useState(isAuthenticated ? mockGoals : []);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", deadline: "" });

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target) return;

    const goal = {
      id: Date.now(),
      ...newGoal,
      saved: 0,
      emoji: "🎯",
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: "", target: "", deadline: "" });
    setShowAddGoal(false);
  };

  const addToGoal = (goalId, amount) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, saved: goal.saved + parseFloat(amount) }
        : goal
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">Savings Goals</h3>
          <p className="text-sm text-zinc-500">Track your financial targets</p>
        </div>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Add Goal
        </button>
      </div>

      {showAddGoal && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input
              type="text"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              placeholder="Goal name"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              placeholder="Target amount"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={addGoal}
              disabled={!newGoal.name || !newGoal.target}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowAddGoal(false)}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.saved / goal.target) * 100;
          const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

          return (
            <div key={goal.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.emoji}</span>
                  <div>
                    <div className="font-semibold text-zinc-900">{goal.name}</div>
                    <div className="text-sm text-zinc-500">
                      ₹{goal.saved.toLocaleString()} of ₹{goal.target.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-zinc-900">
                    {progress.toFixed(1)}%
                  </div>
                  <div className="text-xs text-zinc-500">
                    {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => addToGoal(goal.id, 100)}
                className="w-full rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
              >
                + Add ₹100 to this goal
              </button>
            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-sm font-medium text-zinc-600">No savings goals yet</div>
            <div className="text-xs text-zinc-500 mt-1">Create your first goal to start saving</div>
          </div>
        )}
      </div>
    </div>
  );
}

