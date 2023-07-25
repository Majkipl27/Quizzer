const express = require('express');
const CORS = require('cors');

require('dotenv').config({ path: '../.env' });

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

app.get('/quiz/:id', async (req: any, res: any) => {
  try {
    const quiz = await db.one('SELECT * FROM quizzes WHERE id = $1', [
      req.params.id as Number,
    ]);
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const { name, description, avatar_id, questions } = req.body;

    if (!name || !description || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
    }

    const quizInsertQuery =
      'INSERT INTO quizzes (name, description, avatar_id) VALUES ($1, $2, $3) RETURNING id';
    const quizParams = [name, description, avatar_id];

    const insertQuestionQuery =
      'INSERT INTO quizquestions (quiz_id, question, question_type) VALUES ($1, $2, $3) RETURNING id';
    const insertAnswerQuery =
      'INSERT INTO questionanswers (questionid, answer, iscorrect) VALUES ($1, $2, $3) RETURNING *';

    const quizId = await db.one(quizInsertQuery, quizParams);

    for (const data of questions) {
      const { question, question_type, answers } = data;

      if (!question || !question_type || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
      }

      const lastQuestion = await db.one(insertQuestionQuery, [
        quizId.id,
        question,
        question_type,
      ]);

      for (const { answer, isCorrect } of answers) {
        if (!answer || typeof isCorrect !== 'boolean') {
          return res
            .status(400)
            .json({ error: 'Nieprawidłowe dane wejściowe.' });
        }

        await db.one(insertAnswerQuery, [
          lastQuestion.id,
          answer,
          `${+isCorrect}`,
        ]);
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});


app.get('/quiz/:quizId/questions', async (req: any, res: any) => {
  try {
    const quizId = req.params.quizId;

    if (!quizId) {
      return res
        .status(400)
        .json({ error: 'Nieprawidłowy identyfikator quizu.' });
    }

    const questions = await db.any(
      'SELECT * FROM quizquestions WHERE quiz_id = $1',
      [quizId]
    );

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ error: 'Nie znaleziono pytań dla podanego quizu.' });
    }

    for (const question of questions) {
      const answers = await db.any(
        'SELECT * FROM questionanswers WHERE questionid = $1',
        [question.id]
      );
      question.answers = answers;
    }

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.get("/quizzes/newest", async (_: any, res: any) => {
  try {
    const quizzes = await db.any("SELECT * FROM quizzes ORDER BY id DESC LIMIT 10");
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Wystąpił błąd serwera." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
