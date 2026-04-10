const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asim8454',  // 👈 change this
  database: 'expense_db'
});

// GET all expenses
app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET summary by category
app.get('/expenses/summary', (req, res) => {
  db.query(
    'SELECT category, SUM(amount) as total FROM expenses GROUP BY category',
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// POST add expense
app.post('/expenses', (req, res) => {
  const { title, amount, category } = req.body;
  db.query(
    'INSERT INTO expenses (title, amount, category) VALUES (?, ?, ?)',
    [title, amount, category],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Expense added!', id: result.insertId });
    }
  );
});

// DELETE expense
app.delete('/expenses/:id', (req, res) => {
  db.query('DELETE FROM expenses WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Deleted!' });
  });
});

app.listen(3000, () => console.log('✅ Server running on port 3000'));
console.log('Make sure to update the API URL in your React Native app to http://192.168.100.9:3000');
