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

app.get('/quizzes/:id', async (req: any, res: any) => {
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

app.post('/addquiz', async (req: any, res: any) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
    }

    const quiz = await db.one(
      'INSERT INTO quizzes (name, description) VALUES ($1, $2) RETURNING *',
      [name as String, description as String]
    );

    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.post('/addquestions', async (req: any, res: any) => {
  try {
    if (
      !req.body ||
      !req.body.questions.every(
        (question: any) =>
          question.quizId &&
          question.question &&
          question.question_type &&
          question.answers.every(
            (answer: any) => answer.answer && answer.isCorrect !== undefined
          )
      )
    ) {
      return res.sendStatus(400);
    }

    for (const data of req.body.questions) {
      const { quizId, question, question_type, answers } = data;

      if (!quizId || !question || !question_type) {
        return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.' });
      }

      const lastQuestion = await db.one(
        'INSERT INTO quizquestions (quiz_id, question, question_type) VALUES ($1, $2, $3) RETURNING id',
        [quizId, question, question_type]
      );

      for (const questionAnswer of answers) {
        const { answer, isCorrect } = questionAnswer;

        if (!answer || isCorrect === undefined) {
          return res
            .status(400)
            .json({ error: 'Nieprawidłowe dane wejściowe.' });
        }

        await db.one(
          'INSERT INTO questionanswers (questionid, answer, iscorrect) VALUES ($1, $2, $3) RETURNING *',
          [lastQuestion.id, answer, `${+isCorrect}`]
        );
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.get('/question/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await db.one('SELECT * FROM quizquestions WHERE id = $1', [
      questionId,
    ]);

    const answers = await db.any(
      'SELECT * FROM questionanswers WHERE questionid = $1',
      [questionId]
    );

    question.answers = answers;

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd serwera.' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
