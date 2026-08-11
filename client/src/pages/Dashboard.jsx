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
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-800 px-6 py-8 text-center text-white">
        <h1 className="text-3xl font-bold">
          Expense Tracker
        </h1>
      </div>
      
      <div className="p-6 sm:p-10 space-y-8 bg-gray-50">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        
        <div className="space-y-8">
          <ExpenseSummary refreshKey={refreshKey} />
          <ExpenseList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
