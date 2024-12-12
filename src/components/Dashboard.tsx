import React, { useState, useEffect } from 'react';
import { PlusCircle, Moon, Sun } from 'lucide-react';
import { storage } from '../utils/storage';
import { formatCurrency } from '../utils/formatters';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import GoalsList from './GoalsList';
import Charts from './Charts';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(storage.getPreferences().darkMode);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  
  useEffect(() => {
    const preferences = storage.getPreferences();
    preferences.darkMode = darkMode;
    storage.setPreferences(preferences);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const transactions = storage.getTransactions();
  const balance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Personal Finance</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Charts />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <GoalsList />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Transactions</h2>
          <button
            onClick={() => setShowTransactionForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <PlusCircle className="w-5 h-5" />
            Add Transaction
          </button>
        </div>

        <TransactionList />

        {showTransactionForm && (
          <TransactionForm onClose={() => setShowTransactionForm(false)} />
        )}
      </div>
    </div>
  );
}