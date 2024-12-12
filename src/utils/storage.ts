import { Transaction, Category, FinancialGoal, UserPreferences } from '../types/finance';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_transactions',
  CATEGORIES: 'finance_categories',
  GOALS: 'finance_goals',
  PREFERENCES: 'finance_preferences',
  AUTH: 'finance_auth',
};

export const storage = {
  getItem: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  
  setItem: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  getTransactions: (): Transaction[] => {
    return storage.getItem(STORAGE_KEYS.TRANSACTIONS) || [];
  },
  
  setTransactions: (transactions: Transaction[]): void => {
    storage.setItem(STORAGE_KEYS.TRANSACTIONS, transactions);
  },
  
  getCategories: (): Category[] => {
    return storage.getItem(STORAGE_KEYS.CATEGORIES) || DEFAULT_CATEGORIES;
  },
  
  setCategories: (categories: Category[]): void => {
    storage.setItem(STORAGE_KEYS.CATEGORIES, categories);
  },
  
  getGoals: (): FinancialGoal[] => {
    return storage.getItem(STORAGE_KEYS.GOALS) || [];
  },
  
  setGoals: (goals: FinancialGoal[]): void => {
    storage.setItem(STORAGE_KEYS.GOALS, goals);
  },
  
  getPreferences: (): UserPreferences => {
    return storage.getItem(STORAGE_KEYS.PREFERENCES) || DEFAULT_PREFERENCES;
  },
  
  setPreferences: (preferences: UserPreferences): void => {
    storage.setItem(STORAGE_KEYS.PREFERENCES, preferences);
  },
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', color: '#FF6B6B' },
  { id: '2', name: 'Transport', color: '#4ECDC4' },
  { id: '3', name: 'Entertainment', color: '#45B7D1' },
  { id: '4', name: 'Bills', color: '#96CEB4' },
  { id: '5', name: 'Shopping', color: '#D4A5A5' },
  { id: '6', name: 'Salary', color: '#9ACD32' },
];

const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: false,
  currency: 'USD',
};