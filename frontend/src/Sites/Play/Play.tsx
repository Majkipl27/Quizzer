import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { quizDataAtom, questionDataAtom, userAnswersAtom } from "../../atoms";
import classes from "./Play.module.css";
import Button from "../../Components/Button";
import QuizItem from "../Quizzes/Components/QuizItem";
import QuestionPage from "./QuestionPage";
import EndScreen from "./EndScreen";

const Play = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quizData, setQuizData] = useAtom(quizDataAtom);
  const setQuestionData = useSetAtom(questionDataAtom);
  const [stage, setStage] = useState<number>(1);
  const setAnswers = useSetAtom(userAnswersAtom);

  useEffect(() => {
    return () => {
      setQuizData({ title: "", description: "", avatarId: 1 });
    };
  }, []);

  useEffect(() => {
    setQuizData({ title: "", description: "", avatarId: 1 });
    setAnswers([]);
    setQuestionData([]);

    fetch(`http://localhost:5000/quiz/${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuizData({
          title: data.name,
          description: data.description,
          avatarId: data.avatar_id,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Wystąpił błąd podczas pobierania quizu!");
      });

    fetch(`http://localhost:5000/quiz/${quizId}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const questionsDataValues = data.map((question: any) => {
          return {
            id: 0,
            questionValue: question.question,
            question_type: question.question_type,
            answersArray: question.answers.map((answer: any, index: number) => {
              return {
                id: index + 1,
                answerContent: answer.answer,
                isCorrect: answer.iscorrect === "1" ? true : false,
              };
            }),
          };
        });

        let answersArray: any = [];

        questionsDataValues.forEach((question: any) => {
          if (question.question_type === "singleChoice") {
            answersArray.push({
              answersArray: question.answersArray.map((answer: any, index: number) => {
                return {
                  id: index + 1,
                  answerContent: answer.answerContent,
                  isCorrect: false,
                };
              }),
            });
          } else if (question.question_type === "multipleChoice") {
            answersArray.push({
              answersArray: question.answersArray.map((answer: any) => {
                return {
                  id: answer.id,
                  answerContent: answer.answerContent,
                  isCorrect: false,
                };
              }),
            });
          } else {
            answersArray.push({
              answersArray: [
                {
                  id: 1,
                  answerContent: "",
                  isCorrect: true,
                },
              ],
            });
          }
        });

        setAnswers(answersArray);
        setQuestionData(questionsDataValues);
      })
      .catch((err) => {
        console.error(err);
        alert("Wystąpił błąd podczas pobierania quizu!");
      });
  }, [quizId]);

  return (
    <div className={classes.main}>
      {stage === 1 && (
        <>
          <h1 className={classes.mainSign}>Rozwiąż quiz {quizData.title}</h1>
          <h2 className={classes.desc}>Opis quizu: {quizData.description}</h2>
          <QuizItem
            name={quizData.title}
            id={0}
            description={quizData.description}
            avatar_id={quizData.avatarId}
            isButton={false}
          />
          <Button
            text="Rozwiąż Quiz!"
            onButtonClick={() => {
              setStage(2);
            }}
            classname={classes.button}
          />
        </>
      )}
      {stage === 2 && <QuestionPage setStage={setStage} />}
      {stage === 3 && (
        <EndScreen />
      )}
    </div>
  );
};

export default Play;
