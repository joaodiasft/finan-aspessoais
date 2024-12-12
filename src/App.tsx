import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import SalaryDashboard from './components/salary/SalaryDashboard';
import BudgetOverview from './components/budget/BudgetOverview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="lg:pl-64">
          <main className="py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/salary" element={<SalaryDashboard />} />
              <Route path="/budgets" element={<BudgetOverview />} />
              {/* Add other routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;