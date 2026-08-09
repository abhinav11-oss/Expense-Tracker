const express = require('express');
const cors = require('cors');
const expenseService = require('./services/expenseService');

const app = express();
const port = process.env.PORT || 3000;

// Allow the React app to talk to this API
app.use(cors());

// We need this line to read the req.body as JSON
app.use(express.json());

// Step 8: Connect GET (Now prefixed with /api and using async/await)
app.get('/api/expenses', async (req, res) => {
  const expenses = await expenseService.getExpenses();
  res.json(expenses);
});

// Step 7: Connect POST
app.post('/api/expenses', async (req, res) => {
  const newExpense = await expenseService.addExpense(req.body);
  if (!newExpense) {
    return res.status(500).json({ error: 'Failed to add expense' });
  }
  res.json(newExpense);
});

// Step 9: Connect DELETE
app.delete('/api/expenses/:id', async (req, res) => {
  const id = req.params.id;
  const deleted = await expenseService.deleteExpense(id);
  
  if (deleted) {
    res.json({ message: 'Expense deleted' });
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
});

// Simple root route so the browser doesn't say "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running!');
});

// Important: export the app for Vercel instead of just listening
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running locally on port ${port}`);
  });
}

module.exports = app;
