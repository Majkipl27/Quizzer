import { useState } from "react";
import defaultClasses from "./Main.module.css";
import classes from "./StageTwo.module.css";
import AddQuestion from "../../../Layout/AddQuestion";
import { useAtom } from "jotai";
import { questionsAtom, questionDataAtom } from "../../../atoms";

const StageTwo = () => {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [questionData, setQuestionData] = useAtom(questionDataAtom);

  const [isUserAddingQuestion, setIsUserAddingQuestion] =
    useState<boolean>(false);

  const AddQuestionHandler = (e: React.ReactElement, type: string) => {
    setIsUserAddingQuestion(false);
    switch (type) {
      case "multiChoice":
        setQuestionData([
          ...questionData,
          {
            id: Math.random() * 1000,
            questionValue: "",
            answersArray: [
              { id: 0, answerContent: "", isCorrect: true },
              { id: 1, answerContent: "", isCorrect: false },
            ],
          },
        ]);
        break;

      case "open":
        setQuestionData([
          ...questionData,
          {
            id: Math.random() * 1000,
            questionValue: "",
            answersArray: [{ id: 0, answerContent: "", isCorrect: true }],
          },
        ]);
        break;

      case "singleChoice":
        setQuestionData([
          ...questionData,
          {
            id: Math.random() * 1000,
            questionValue: "",
            answersArray: [
              { id: 0, answerContent: "", isCorrect: true },
              { id: 1, answerContent: "", isCorrect: false },
            ],
          },
        ]);
        break;

      default:
        break;
    }
    setQuestions([...questions, e]);
  };

  function deleteHandler(index: number) {
    let tempArray = [...questions];
    let tempArray2 = [...questionData];
    tempArray[index] = null;
    console.log(tempArray);
    tempArray2[index] = { id: -1, questionValue: "", answersArray: [] };
    setQuestions(tempArray);
    setQuestionData(tempArray2);
  }

  return (
    <div className={defaultClasses.main}>
      <p className={defaultClasses.titleParagraph}>Dodaj pytania do quizu</p>
      <div className={classes.questions}>
        {questions.map((question: React.ReactElement, index: number) => {
          if (questionData[index].id !== -1)
            return (
              <div key={questionData[index].id} className={classes.question}>
                {question}
                {questions.filter((e: any) => e !== null).length > 1 && (
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
            );
        })}
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
