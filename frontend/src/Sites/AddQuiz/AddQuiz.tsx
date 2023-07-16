import { useState } from "react";
import classes from "./AddQuiz.module.css";
import NavCounter from "./Components/NavCounter";
import StageOne from "./Stages/StageOne";
import StageTwo from "./Stages/StageTwo";
import StageThree from "./Stages/StageThree";
import Button from "../../Components/Button";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { questionDataAtom, questionsAtom, quizDataAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
  const [stage, setStage] = useState<number>(1);
  const quizData = useAtomValue(quizDataAtom);
  const [questionData, setQuestionData] = useAtom(questionDataAtom);
  const setQuestions = useSetAtom(questionsAtom);
  const navigate = useNavigate();

  function isNotEmpty(obj: any): boolean {
    const { id, questionValue, question_type, answersArray } = obj;

    if (
      id === undefined ||
      questionValue === undefined ||
      question_type === undefined ||
      answersArray === undefined
    ) {
      return false;
    }

    if (answersArray.some((answer: any) => !answer.answerContent)) {
      return false;
    }

    if (question_type === "multiChoice") {
      const selectedAnswers = answersArray.filter((answer: any) => answer.isCorrect);
      return selectedAnswers.length >= 2;
    }

    return true;
  }

  const upgdateStageManagement = (number: number) => {
    if (stage === 1 && (quizData.title === "" || quizData.description === ""))
      return alert("Uzupełnij wszystkie pola");

    if (stage === 2) {
      if (questionData.length < 3) return alert("Dodaj przynajmniej trzy pytania!");

      const isAllQuestionsNotEmpty = questionData.every(isNotEmpty);
      if (!isAllQuestionsNotEmpty) return alert("Uzupełnij wszystkie pola, upewnij się, że pytania wielokrotnego wyboru mają conajmniej po 2 odpowiedzi!");
    }

    if (stage + number > 0 && stage + number < 4) {
      setStage(stage + number);
    }
  };

  const addQuizHandler = () => {
    const outputData = {
      name: quizData.title,
      description: quizData.description,
      avatar_id: quizData.avatarId,
      questions: questionData.map((question: any) => ({
        question: question.questionValue,
        question_type: question.question_type,
        answers: question.answersArray.map((answer: any) => ({
          answer: answer.answerContent,
          isCorrect: answer.isCorrect,
        })),
      })),
    };

    const outputJSON = JSON.stringify(outputData, null, 2);
    console.log(outputJSON);

    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: outputJSON,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Quiz został dodany!");
        setQuestionData([]);
        setQuestions([]);
        navigate("/");
      }
      )
      .catch((err) => {console.log(err); alert("Wystąpił błąd podczas dodawania quizu!")});
  };

  return (
    <div className={classes.main}>
      <h2>Stwórz Quiz</h2>
      <NavCounter stage={stage} />
      {stage === 1 && (
        <StageOne />
      )}
      {stage === 2 && (
        <StageTwo />
      )}
      {stage === 3 && (
        <StageThree />
      )}
      <div className={classes.buttons}>
        {stage > 1 && (
          <Button
            text="Wróć"
            onButtonClick={() => upgdateStageManagement(-1)}
          />
        )}
        {stage < 3 && (
          <Button
            text="Dalej"
            onButtonClick={() => upgdateStageManagement(1)}
          />
        )}
        {stage === 3 && <Button text="Zakończ" onButtonClick={addQuizHandler} />}
      </div>
    </div>
  );
};

export default AddQuiz;
