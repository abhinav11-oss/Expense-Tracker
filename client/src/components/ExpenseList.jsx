import React, { useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';
import { filterExpenses } from '../utils/filterExpenses';

const ExpenseList = ({ refreshKey }) => {
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

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

  const filteredExpenses = filterExpenses(expenses, categoryFilter, dateFilter);

  // Badge colors mapping
  const categoryColors = {
    'Food': 'bg-orange-100 text-orange-800 border-orange-200',
    'Travel': 'bg-blue-100 text-blue-800 border-blue-200',
    'Bills': 'bg-purple-100 text-purple-800 border-purple-200',
    'Other': 'bg-slate-100 text-slate-800 border-slate-200'
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 overflow-hidden">
      <div className="p-8 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Recent Transactions</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
            <div className="relative">
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium text-slate-700 outline-none appearance-none transition-all"
              >
                <option value="All">All Categories</option>
                <option value="Food">Food & Dining</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Utilities</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            
            <input 
              type="date" 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)} 
              className="px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-medium text-slate-700 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th scope="col" className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Date</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Category</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 bg-white">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-blue-50/30 transition-colors duration-150 group">
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-600">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${categoryColors[expense.category] || categoryColors['Other']}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-800">
                    ₹{parseFloat(expense.amount).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-8 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-500">No transactions match your search</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
