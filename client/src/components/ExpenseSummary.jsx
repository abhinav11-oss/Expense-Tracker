import React, { useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';

const ExpenseSummary = ({ refreshKey }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [refreshKey]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryTotals = () => {
    const totals = {};
    for (let i = 0; i < expenses.length; i++) {
      const category = expenses[i].category;
      const amount = parseFloat(expenses[i].amount);
      if (!totals[category]) totals[category] = 0;
      totals[category] += amount;
    }
    return totals;
  };

  const totals = getCategoryTotals();

  // Mapping for nice category icons
  const iconMap = {
    'Food': '🍔',
    'Travel': '✈️',
    'Bills': '🧾',
    'Other': '🛍️'
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50">
      <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Financial Overview</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {Object.keys(totals).map(category => (
          <div key={category} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase">{category}</h4>
              <span className="text-lg">{iconMap[category] || '💰'}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              ₹{totals[category].toFixed(2)}
            </p>
          </div>
        ))}
        {Object.keys(totals).length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-10">
            <p className="text-sm font-medium text-gray-500 italic">No expenses logged yet. Start tracking above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
