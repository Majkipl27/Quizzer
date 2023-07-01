import { useState, useEffect } from "react";
import classes from "./AddQuiz.module.css";
import NavCounter from "./Components/NavCounter";
import StageOne from "./Stages/StageOne";
import Button from "../../Components/Button";

interface stageOneData {
  title: any;
  description: any;
}

const AddQuiz = () => {
  const [stage, setStage] = useState<number>(1);
  const [stageOneData, setStageOneData] = useState<stageOneData>({
    title: "",
    description: "",
  });

  return (
    <div className={classes.main}>
      <h2>Stwórz Quiz</h2>
      <NavCounter stage={stage} />
      {stage === 1 && <StageOne setData={setStageOneData} />}
      <div className={classes.buttons}>
        {stage > 1 && (
          <Button text="Wróć" onButtonClick={() => setStage(stage - 1)} />
        )}
        {stage < 3 && (
          <Button text="Dalej" onButtonClick={() => setStage(stage + 1)} />
        )}
        {stage === 3 && <Button text="Zakończ" onButtonClick={() => {}} />}
      </div>
    </div>
  );
};

export default AddQuiz;
