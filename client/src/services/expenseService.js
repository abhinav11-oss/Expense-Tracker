// Use localhost when running locally, but use the relative path when deployed to Vercel
const API_URL = import.meta.env.DEV ? 'http://localhost:3000/api/expenses' : '/api/expenses';

/**
 * fetches all expenses from the backend
 */
export const getExpenses = async () => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }
  
  return await response.json();
};

/**
 * sends a new expense to the backend to be saved
 * @param {Object} expenseData 
 */
export const addExpense = async (expenseData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expenseData)
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return await response.json();
};
