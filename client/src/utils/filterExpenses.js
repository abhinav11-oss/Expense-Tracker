/**
 * filters the list of expenses based on category and date
 * @param {Array} expenses 
 * @param {string} categoryFilter 
 * @param {string} dateFilter 
 */
export const filterExpenses = (expenses, categoryFilter, dateFilter) => {
  return expenses.filter(expense => {
    // If 'All' is selected, we just pass the category check since they want to see everything
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    const matchesDate = dateFilter === '' || expense.date === dateFilter;
    
    return matchesCategory && matchesDate;
  });
};
