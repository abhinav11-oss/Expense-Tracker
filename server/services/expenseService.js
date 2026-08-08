const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

// Helper to read data from the JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

// Helper to write data to the JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

const getExpenses = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

const getExpenseById = (id) => {
  const expenses = readData();
  return expenses.find(e => e.id === parseInt(id));
};

const addExpense = (expenseData) => {
  const expenses = readData();
  
  // Calculate next ID
  const maxId = expenses.reduce((max, e) => (e.id > max ? e.id : max), 0);
  
  const newExpense = {
    id: maxId + 1,
    amount: expenseData.amount,
    category: expenseData.category,
    date: expenseData.date || new Date().toISOString()
  };
  
  expenses.push(newExpense);
  writeData(expenses);
  return newExpense;
};

const updateExpense = (id, expenseData) => {
  const expenses = readData();
  const index = expenses.findIndex(e => e.id === parseInt(id));
  if (index === -1) return null;
  
  expenses[index] = { 
    ...expenses[index], 
    ...expenseData, 
    updatedAt: new Date().toISOString() 
  };
  
  writeData(expenses);
  return expenses[index];
};

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
