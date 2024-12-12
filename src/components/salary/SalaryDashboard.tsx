import React from 'react';
import { storage } from '../../utils/storage';
import { formatCurrency } from '../../utils/formatters';
import { Salary } from '../../types/finance';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function SalaryDashboard() {
  const salaries = storage.getSalaries();
  const latestSalary = salaries[0];

  if (!latestSalary) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No salary information yet</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add Salary Details
        </button>
      </div>
    );
  }

  const totalDeductions = latestSalary.deductions.reduce((sum, d) => sum + d.amount, 0);
  const totalBonuses = latestSalary.bonuses.reduce((sum, b) => sum + b.amount, 0);
  const netSalary = latestSalary.baseAmount + totalBonuses - totalDeductions;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Base Salary</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {formatCurrency(latestSalary.baseAmount)}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Monthly base salary before deductions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deductions</h3>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {formatCurrency(totalDeductions)}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Total monthly deductions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Net Salary</h3>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {formatCurrency(netSalary)}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Final take-home amount
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Deductions</h3>
          <div className="space-y-4">
            {latestSalary.deductions.map((deduction) => (
              <div key={deduction.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{deduction.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{deduction.type}</p>
                </div>
                <p className="text-red-500 font-medium">{formatCurrency(deduction.amount)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bonuses</h3>
          <div className="space-y-4">
            {latestSalary.bonuses.map((bonus) => (
              <div key={bonus.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{bonus.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{bonus.type}</p>
                </div>
                <p className="text-green-500 font-medium">{formatCurrency(bonus.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}