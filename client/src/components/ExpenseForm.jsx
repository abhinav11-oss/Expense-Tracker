import React, { useState } from 'react';
import { addExpense } from '../services/expenseService';
import './ExpenseForm.css';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  
  /**
   * handles form submission when the user clicks save
   * @param {any} e - the form event
   */
  const handleSubmit = async (e) => {
    // stop the page from refreshing when we submit
    e.preventDefault();
    
    // simple check to make sure they filled everything out
    if (!amount || !category || !date) {
      alert('Please fill out all fields first!');
      return;
    }
    
    try {
      await addExpense({ amount, category, date });
      alert('Expense added successfully!');
      
      // clear the form back to default after saving
      setAmount('');
      setCategory('Food');
      setDate('');
      
      // trigger refresh in parent
      if (onExpenseAdded) onExpenseAdded();
    } catch (error) {
      console.error(error);
      alert('Something went wrong saving the expense');
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Amount:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="e.g. 15.50"
          />
        </div>
        
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        
        <button type="submit">Save Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
