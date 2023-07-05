import classes from "./MultiChoiceQuestion.module.css";
import { useState, useRef } from "react";
import Input from "../../Components/Input";

interface MultiChoiceQuestionProps {
  type: string;
  question?: string;
  questionId?: number;
  answers?: Array<MultiChoiceQuestionAnswerProps>;
}

interface MultiChoiceQuestionAnswerProps {
  id: number;
  answerContent: string;
  isCorrect: boolean;
}

const MultiChoiceQuestion = ({
  type,
  question,
  questionId,
  answers,
}: MultiChoiceQuestionProps) => {
  const [answersArray, setAnswersArray] = useState<
    Array<MultiChoiceQuestionAnswerProps>
  >(
    answers || [
      { id: 0, answerContent: "", isCorrect: true },
      { id: 1, answerContent: "", isCorrect: false },
    ]
  );
  const [answersCount, setAnswersCount] = useState<number>(
    answers ? answers.length : 2
  );
  const [questionValue, setQuestionValue] = useState<string>(question || "");
  const refs = useRef<Array<HTMLInputElement>>([]);

  const addAnswer = () => {
    setAnswersArray([
      ...answersArray,
      { id: answersCount, answerContent: "", isCorrect: false },
    ]);
    setAnswersCount(answersCount + 1);
  };

  const deleteAnswer = (answerIndex: number) => {
    const tempArray = [...answersArray];
    tempArray.splice(answerIndex, 1);
    const updatedArray = tempArray.map((answer, index) => ({
      ...answer,
      id: index,
    }));
    setAnswersArray(updatedArray);
    setAnswersCount((count) => count - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    const tempArray = [...answersArray];
    tempArray[answerIndex].answerContent = e.target.value;
    setAnswersArray(tempArray);
  };

  const handleAnswerSelection = (selectedAnswerIndex: number) => {
    const updatedAnswersArray = answersArray.map((answer, index) => {
      if (index === selectedAnswerIndex) {
        return { ...answer, isCorrect: !answer.isCorrect };
      }
      return answer;
    });
    setAnswersArray(updatedAnswersArray);
  };

  const answerLayout = (
    <div className={classes.main}>
      <div className={classes.question}>
        <p>{question}</p>
        <p className={classes.hint}>(wybierz jedno lub więcej)</p>
      </div>
      <div className={classes.answers}>
        {answers?.map((answer) => (
          <div className={classes.answer} key={answer.id}>
            <input
              type="checkbox"
              name={questionId?.toString()}
              id={`question${questionId?.toString()}-${answer.id}`}
            />
            <label htmlFor={`question${questionId?.toString()}-${answer.id}`}>
              {answer.answerContent}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const tempQuestionId = questionId || Math.random() * 1000;

  const questionLayout = (
    <div className={classes.main}>
      <Input
        type="text"
        name="question"
        placeholder="Pytanie"
        value={questionValue}
        className={classes.questionInput}
        onChange={(e) => {
          setQuestionValue(e.target.value);
        }}
      />
      <p className={classes.hint}>(Zaznacz poprawne z boku)</p>
      <div className={classes.answers}>
        {answersArray.map((answer, i) => {
          return (
            <div className={classes.answer} key={Math.random()}>
              {answersCount > 2 && (
                <p onClick={() => deleteAnswer(i)}>&#10006;</p>
              )}
              <input
                type="checkbox"
                name={tempQuestionId?.toString()}
                onChange={() => handleAnswerSelection(i)}
                checked={answer.isCorrect}
              />
              <Input
                type="text"
                name="answer"
                placeholder="Odpowiedź"
                onBlur={(e) => handleInputChange(e, i)}
                value={answer.answerContent}
                valueRef={refs.current[i]}
                className={classes.answerInput}
              />
            </div>
          );
        })}
      </div>
      {answersCount < 4 && (
        <p onClick={addAnswer} className={classes.add}>
          Dodaj odpowiedź
        </p>
      )}
    </div>
  );

  if (type === "answer") return answerLayout;
  else if (type === "question") return questionLayout;
  else return <></>;
};

export default MultiChoiceQuestion;
