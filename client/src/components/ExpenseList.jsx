import React, { useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';
import { filterExpenses } from '../utils/filterExpenses';
import './ExpenseList.css';

const ExpenseList = ({ refreshKey }) => {
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // grab expenses when the component first loads, or when refreshKey changes
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

  return (
    <div className="expense-list-container">
      <h2>My Expenses</h2>
      
      <div className="filters">
        <label>
          Filter by Category:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </label>
        
        <label>
          Filter by Date:
          <input 
            type="date" 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)} 
          />
        </label>
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td className="amount">₹{parseFloat(expense.amount).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No expenses found...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
