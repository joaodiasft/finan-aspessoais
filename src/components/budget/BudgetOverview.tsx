import React from 'react';
import { storage } from '../../utils/storage';
import { formatCurrency } from '../../utils/formatters';
import { Budget, Transaction } from '../../types/finance';
import { AlertTriangle } from 'lucide-react';

export default function BudgetOverview() {
  const budgets = storage.getBudgets();
  const transactions = storage.getTransactions();

  const calculateSpending = (categoryId: string): number => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === categoryId && 
        new Date(t.date) >= startOfMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget: Budget) => {
          const spent = calculateSpending(budget.categoryId);
          const percentage = (spent / budget.amount) * 100;
          const category = storage.getCategories().find(c => c.id === budget.categoryId);
          
          let alertColor = 'bg-green-500';
          if (percentage >= budget.alerts.critical) {
            alertColor = 'bg-red-500';
          } else if (percentage >= budget.alerts.warning) {
            alertColor = 'bg-yellow-500';
          }

          return (
            <div key={budget.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {category?.name}
                </h3>
                {percentage >= budget.alerts.warning && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Spent</span>
                  <span>{formatCurrency(spent)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Budget</span>
                  <span>{formatCurrency(budget.amount)}</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-full rounded-full ${alertColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                
                <div className="text-right text-sm font-medium">
                  {Math.round(percentage)}% used
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}