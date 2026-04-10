const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = 'inventory_db';

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
});

const setupSQL = `
CREATE DATABASE IF NOT EXISTS \\`${DB_NAME}\\`;
USE \\`${DB_NAME}\\`;
CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL
);
INSERT INTO inventory (item_name, quantity)
VALUES
  ('Shipping Boxes', 120),
  ('Packing Tape', 40),
  ('Bubble Wrap', 65),
  ('Label Printer', 8),
  ('Pallet Jacks', 23)
ON DUPLICATE KEY UPDATE item_name = VALUES(item_name), quantity = VALUES(quantity);
`;

connection.query(setupSQL, (err) => {
  if (err) {
    console.error('Setup error:', err);
    process.exit(1);
  }
  console.log('Database setup complete.');

  connection.query(`USE \\`${DB_NAME}\\`;`, (err2) => {
    if (err2) {
      console.error('Cannot use database:', err2);
    } else {
      console.log(`Using database: ${DB_NAME}`);
    }
  });
});

app.get('/inventory', (req, res) => {
  const q = 'SELECT item_name, quantity FROM inventory';
  connection.query(q, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});