const API_URL = 'http://localhost:3000/expenses';

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
