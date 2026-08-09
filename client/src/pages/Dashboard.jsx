import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseList from '../components/ExpenseList';

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    // Mixing Tailwind (max-w-5xl, mx-auto, rounded-2xl, etc) with custom CSS (custom-glass-panel)
    <div className="max-w-5xl mx-auto custom-glass-panel rounded-2xl overflow-hidden">
      <div className="bg-slate-900 px-6 py-10 text-center sm:px-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Expense Tracker
        </h1>
        <p className="mt-2 text-lg text-slate-300 font-medium">
          Placement Assignment Project
        </p>
      </div>
      
      <div className="p-6 sm:p-10 space-y-10">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        
        <div className="space-y-10">
          <ExpenseSummary refreshKey={refreshKey} />
          <ExpenseList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
