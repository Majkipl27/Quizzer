const express = require('express');
const CORS = require('cors');

require('dotenv').config({path: '../.env'});

const app = express();
const PORT = 5000;

app.use(
  CORS({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'X-Requested-With,Content-Type',
      'Access-Control-Allow-Origin',
      'Origin',
    ],
    credentials: true,
  })
);

app.use(express.json()); 

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

app.get('/quizzes', async (_: any, res: any) => {
  try {
    const quizzes = await db.any('SELECT * FROM quizzes');
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.get('/quizzes/:id', async (req: any, res: any) => {
  try {
    const quiz = await db.one('SELECT * FROM quizzes WHERE id = $1', [
      req.params.id,
    ]);
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.post('/addquiz', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
    }

    const quiz = await db.one(
      'INSERT INTO quizzes (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});