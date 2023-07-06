import { useState } from "react";
import defaultClasses from "./Main.module.css";
import classes from "./StageTwo.module.css";
import AddQuestion from "../../../Layout/AddQuestion";

const StageTwo = ({ data, setData }: any) => {
  const [questions, setQuestions] = useState<React.ReactElement[]>(data);
  const [isUserAddingQuestion, setIsUserAddingQuestion] =
    useState<boolean>(false);

  const AddQuestionHandler = (e: React.ReactElement) => {
    setIsUserAddingQuestion(false);
    setQuestions([...questions, e]);
  };

  function deleteHandler(index: number) {
    const tempArray = [...questions];
    tempArray.splice(index, 1);
    setQuestions(tempArray);
  }

  return (
    <div
      className={defaultClasses.main}
    >
      <p className={defaultClasses.titleParagraph}>Dodaj pytania do quizu</p>
      <div className={classes.questions}>
        {questions.map((question: React.ReactElement, index: number) => (
          <div key={index} className={classes.question}>
            {question}
            {questions.length > 1 && (
              <p
                className={classes.delete}
                onClick={() => {
                  deleteHandler(index);
                }}
              >
                &#10006; Usuń pytanie powyżej
              </p>
            )}
          </div>
        ))}
      </div>
      {isUserAddingQuestion ? (
        <AddQuestion
          onClose={AddQuestionHandler}
          close={() => setIsUserAddingQuestion(false)}
        />
      ) : (
        <p
          onClick={() => setIsUserAddingQuestion(true)}
          style={{ color: "var(--font-clr)", cursor: "pointer" }}
        >
          Dodaj pytanie
        </p>
      )}
    </div>
  );
};

export default StageTwo;
