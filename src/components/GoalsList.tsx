import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { storage } from '../utils/storage';
import { formatCurrency } from '../utils/formatters';
import type { FinancialGoal } from '../types/finance';

export default function GoalsList() {
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
  });

  const goals = storage.getGoals();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: FinancialGoal = {
      id: crypto.randomUUID(),
      name: newGoal.name,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: Number(newGoal.currentAmount),
      deadline: newGoal.deadline,
    };
    storage.setGoals([...goals, goal]);
    setShowForm(false);
    setNewGoal({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
  };

  const handleDelete = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    storage.setGoals(updatedGoals);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Financial Goals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-blue-500 hover:text-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3">
          <input
            type="text"
            placeholder="Goal name"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Target amount"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Current amount"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newGoal.currentAmount}
            onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add Goal
          </button>
        </form>
      )}

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{goal.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Target: {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>{formatCurrency(goal.currentAmount)}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}