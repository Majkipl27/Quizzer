import { useState, useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import {
  userAnswersAtom,
  questionDataAtom,
  questionsAtom,
  quizDataAtom,
} from "../../atoms";
import Button from "../../Components/Button";

const EndScreen = () => {
  const navigate = useNavigate();
  const setQuestionAtom = useSetAtom(questionsAtom);
  const setQuizDataAtom = useSetAtom(quizDataAtom);
  const [userAnswers, setUserAnswers] = useAtom(userAnswersAtom);
  const [correctAnswers, setCorrectAnswers] = useAtom(questionDataAtom);
  const [score, setScore] = useState<number>(0);

  function getCorrectAnswers(data: any) {
    return data.map((item: any) => ({
      answersArray: item.answersArray.filter((answer: any) => answer.isCorrect),
    }));
  }

  function checkAnswers() {
    let correctAnswersCount = 0;
    let filteredUserAnswers: any;
    let filteredCorrectAnswers: any;

    filteredUserAnswers = getCorrectAnswers(userAnswers);
    filteredCorrectAnswers = getCorrectAnswers(correctAnswers);

    for (let i = 0; i < filteredUserAnswers.length; i++) {
      const userAnswer = filteredUserAnswers[i].answersArray;
      const correctAnswer = filteredCorrectAnswers[i].answersArray;

      if (
        userAnswer.length === correctAnswer.length &&
        userAnswer.every(
          (item: any, index: number) => item.id === correctAnswer[index].id
        )
      ) {
        correctAnswersCount++;
      }
    }

    return correctAnswersCount;
  }

  useEffect(() => {
    setScore(checkAnswers());
  }, []);

  const goBack = () => {
    setQuizDataAtom({ title: "", description: "", avatarId: 1 });
    setQuestionAtom([]);
    setUserAnswers([]);
    setCorrectAnswers([]);
    navigate("/quizzes");
  };

  return (
    <>
      <h1>Ukończono Quiz!</h1>
      <h2>
        Poprawne odpowiedzi: {score} na {correctAnswers.length}
      </h2>
      <h2>
        Osiągasz wynik {Math.round((score / correctAnswers.length) * 100)}%
      </h2>
      <Button text="Powrót do quizzów!" onButtonClick={goBack} />
    </>
  );
};

export default EndScreen;
