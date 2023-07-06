import { useState } from "react";
import classes from "./AddQuiz.module.css";
import NavCounter from "./Components/NavCounter";
import StageOne from "./Stages/StageOne";
import StageTwo from "./Stages/StageTwo";
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
  const [stageTwoData, setStageTwoData] = useState<any>([]);

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
        <StageOne setData={setStageOneData} data={stageOneData} />
      )}
      {stage === 2 && (
        <StageTwo data={stageTwoData} setData={setStageTwoData} />
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
