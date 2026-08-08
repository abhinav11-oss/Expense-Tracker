const express = require('express');
const expenseService = require('./services/expenseService');

const app = express();
const port = process.env.PORT || 3000;

// We need this line to read the req.body as JSON
app.use(express.json());

// Step 8: Connect GET
app.get('/expenses', (req, res) => {
  const expenses = expenseService.getExpenses();
  res.json(expenses);
});

// Step 7: Connect POST
app.post('/expenses', (req, res) => {
  const newExpense = expenseService.addExpense(req.body);
  res.json(newExpense);
});

// Step 9: Connect DELETE
app.delete('/expenses/:id', (req, res) => {
  const id = req.params.id;
  const deleted = expenseService.deleteExpense(id);
  
  if (deleted) {
    res.json({ message: 'Expense deleted' });
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
