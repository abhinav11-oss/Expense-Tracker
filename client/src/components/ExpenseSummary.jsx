import React, { useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';
import './ExpenseSummary.css';

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
    
    // going through all expenses and adding up totals per category
    for (let i = 0; i < expenses.length; i++) {
      const category = expenses[i].category;
      const amount = parseFloat(expenses[i].amount);
      
      if (!totals[category]) {
        totals[category] = 0;
      }
      totals[category] += amount;
    }
    
    return totals;
  };

  const totals = getCategoryTotals();

  return (
    <div className="expense-summary-container">
      <h3>Summary by Category</h3>
      <div className="summary-cards">
        {Object.keys(totals).map(category => (
          <div key={category} className="summary-card">
            <h4>{category}</h4>
            <p>₹{totals[category].toFixed(2)}</p>
          </div>
        ))}
        {Object.keys(totals).length === 0 && (
          <p style={{ color: '#666' }}>No expenses yet!</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
