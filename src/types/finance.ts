export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  type: 'income' | 'expense';
  tags?: string[];
  recurringType?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  attachments?: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  budget?: number;
  parentId?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface Salary {
  id: string;
  baseAmount: number;
  bonuses: Bonus[];
  deductions: Deduction[];
  paymentDate: string;
  period: {
    start: string;
    end: string;
  };
}

export interface Bonus {
  id: string;
  name: string;
  amount: number;
  type: 'performance' | 'holiday' | 'other';
}

export interface Deduction {
  id: string;
  name: string;
  amount: number;
  type: 'tax' | 'insurance' | 'other';
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
  alerts: {
    warning: number; // Percentage threshold for warning
    critical: number; // Percentage threshold for critical alert
  };
}

export interface UserPreferences {
  darkMode: boolean;
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    budgetAlerts: boolean;
    goalReminders: boolean;
  };
  dateFormat: string;
  theme: {
    primary: string;
    secondary: string;
  };
}