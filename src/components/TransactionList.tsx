import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { storage } from '../utils/storage';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { Transaction } from '../types/finance';

export default function TransactionList() {
  const transactions = storage.getTransactions();

  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    storage.setTransactions(updatedTransactions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction: Transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4">
                  {transaction.description || '-'}
                </td>
                <td className="px-6 py-4">
                  {transaction.category}
                </td>
                <td className={`px-6 py-4 ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {/* TODO: Implement edit */}}
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}