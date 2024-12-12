import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  WalletCards,
  PiggyBank,
  BarChart3,
  Settings,
  DollarSign,
  Target,
  Calendar,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Transactions', icon: WalletCards, path: '/transactions' },
  { name: 'Salary', icon: DollarSign, path: '/salary' },
  { name: 'Budgets', icon: PiggyBank, path: '/budgets' },
  { name: 'Goals', icon: Target, path: '/goals' },
  { name: 'Reports', icon: BarChart3, path: '/reports' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financer</h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}