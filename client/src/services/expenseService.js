const API_URL = 'http://localhost:3000/expenses';

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
