//backend/index.js
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 5000;

const pool = new Pool({
  user: 'user',
  host: 'db',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

const cors = require('cors');
app.use(cors());



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