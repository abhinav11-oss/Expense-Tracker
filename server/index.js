const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/test', (req, res) => {
  res.send('API is working');
});

// A fallback root route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
