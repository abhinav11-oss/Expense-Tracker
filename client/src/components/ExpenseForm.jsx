import React, { useState } from 'react';
import { addExpense } from '../services/expenseService';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date) {
      alert('Please fill out all fields');
      return;
    }

    try {
      await addExpense({ amount, category, date });
      setAmount('');
      setCategory('Food');
      setDate('');
      
      if (onExpenseAdded) onExpenseAdded();
    } catch (error) {
      console.error(error);
      alert('Something went wrong saving the expense');
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Log New Expense</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
        <div className="space-y-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-slate-700">Amount</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 group-focus-within:text-blue-500 transition-colors font-medium">₹</span>
            </div>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="0.00"
              className="block w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 outline-none"
            />
          </div>
        </div>
        
        <div className="space-y-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-slate-700">Category</label>
          <div className="relative">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 outline-none appearance-none"
            >
              <option value="Food">🍔 Food & Dining</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Bills">🧾 Utilities & Bills</option>
              <option value="Other">🛍️ Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-slate-700">Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="block w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 outline-none"
          />
        </div>
        
        <div className="lg:col-span-1">
          <button 
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-lg shadow-sm"
          >
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
