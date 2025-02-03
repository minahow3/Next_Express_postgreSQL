// backend/index.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 環境変数 DATABASE_URL を使ってPostgreSQLに接続
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true },
});
app.use(cors());

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not Set");

pool.connect()
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.error("Database connection error:", err.message));


app.get('/api/greeting', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM greetings LIMIT 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
