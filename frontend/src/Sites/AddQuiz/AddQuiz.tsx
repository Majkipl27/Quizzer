import { useState, useEffect } from "react";
import classes from "./AddQuiz.module.css";
import NavCounter from "./Components/NavCounter";
import StageOne from "./Stages/StageOne";
import StageTwo from "./Stages/StageTwo";
import Button from "../../Components/Button";
import { useSetAtom, useAtomValue } from "jotai";
import { questionDataAtom, questionsAtom, quizDataAtom } from "../../atoms";

const AddQuiz = () => {
  const [stage, setStage] = useState<number>(1);
  const stageOneData = useAtomValue(quizDataAtom);
  const setQuestionData = useSetAtom(questionDataAtom);
  const setQuestions = useSetAtom(questionsAtom);

  useEffect(() => {
    return () => {
      setQuestionData([]);
      setQuestions([]);
    }
  }
  , []);

  const upgdateStageManagement = (number: number) => {
    if (
      stage === 1 &&
      (stageOneData.title === "" || stageOneData.description === "")
    )
      return alert("Uzupełnij wszystkie pola");

    if (stage + number > 0 && stage + number < 4) {
      setStage(stage + number);
    }
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
        {stage === 3 && <Button text="Zakończ" onButtonClick={() => {}} />}
      </div>
    </div>
  );
};

export default AddQuiz;
