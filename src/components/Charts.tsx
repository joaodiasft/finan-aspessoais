import React from 'react';
import { storage } from '../utils/storage';

export default function Charts() {
  const transactions = storage.getTransactions();
  
  // Calculate totals by category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += type === 'income' ? amount : -amount;
    return acc;
  }, {} as Record<string, number>);

  // Sort categories by absolute value
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <div className="space-y-2">
        {sortedCategories.map(([category, amount]) => (
          <div key={category} className="flex items-center">
            <div className="w-32 truncate">{category}</div>
            <div className="flex-1 mx-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${amount >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{
                    width: `${Math.min(Math.abs(amount) / Math.max(...Object.values(categoryTotals).map(Math.abs)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
            <div className={`w-24 text-right ${amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}