const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * Gets all expenses from the file
 */
const getExpenses = () => {
  return readData();
};

/**
 * Finds a single expense by its ID
 */
const getExpenseById = (id) => {
  const expenses = readData();
  return expenses.find(e => e.id === parseInt(id));
};

/**
 * Adds a new expense to the list and saves it
 */
const addExpense = (expenseData) => {
  const expenses = readData();
  
  // get highest id to generate a new one
  let maxId = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id > maxId) {
      maxId = expenses[i].id;
    }
  }
  
  const newExpense = {
    id: maxId + 1,
    amount: expenseData.amount,
    category: expenseData.category,
    date: expenseData.date
  };
  
  expenses.push(newExpense);
  writeData(expenses);
  
  return newExpense;
};

/**
 * Updates an existing expense using its ID
 */
const updateExpense = (id, expenseData) => {
  const expenses = readData();
  const index = expenses.findIndex(e => e.id === parseInt(id));
  
  if (index === -1) return null;
  
  expenses[index].amount = expenseData.amount || expenses[index].amount;
  expenses[index].category = expenseData.category || expenses[index].category;
  expenses[index].date = expenseData.date || expenses[index].date;
  
  writeData(expenses);
  return expenses[index];
};

/**
 * Removes an expense from the list using its ID
 */
const deleteExpense = (id) => {
  const expenses = readData();
  const index = expenses.findIndex(e => e.id === parseInt(id));
  
  if (index === -1) return false;
  
  expenses.splice(index, 1);
  writeData(expenses);
  
  return true;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense
};
