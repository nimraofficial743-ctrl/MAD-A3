const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ticket_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/tickets', (req, res) => {
  const query = 'SELECT user_name, event, seat_no FROM tickets';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');

  db.query(`
    CREATE DATABASE IF NOT EXISTS ticket_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `, (err) => {
    if (err) return console.error('Error creating database', err);

    db.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        event VARCHAR(150) NOT NULL,
        seat_no VARCHAR(20) NOT NULL
      );
    `, (err) => {
      if (err) return console.error('Error creating table tickets', err);

      const sampleQuery = `
        INSERT INTO tickets (user_name, event, seat_no)
        VALUES
          ('Alice Johnson', 'Silver Screen Premiere', 'A1'),
          ('Ravi Patel', 'Rock Concert 2026', 'B14'),
          ('Mia Zhang', 'Broadway Night', 'C7'),
          ('Derek Smith', 'Tech Expo 2026', 'D3'),
          ('Sofia Lopez', 'Jazz & Wine', 'E11')
        ON DUPLICATE KEY UPDATE user_name=VALUES(user_name);
      `;

      db.query(sampleQuery, (err) => {
        if (err) console.error('Error inserting sample tickets', err);
        else console.log('Sample data inserted / upserted into tickets');
      });
    });
  });
});
