import classes from "./SingleChoiceQuestion.module.css";
import { useState, useRef } from "react";
import Input from "../../Components/Input";

interface SingleChoiceQuestionProps {
  type: string;
  question?: string;
  questionId?: number;
  answers?: Array<SingleChoiceQuestionAnswerProps>;
}

interface SingleChoiceQuestionAnswerProps {
  id: number;
  answerContent: string;
}

const SingleChoiceQuestion = ({
  type,
  question,
  questionId,
  answers,
}: SingleChoiceQuestionProps) => {
  const [answersArray, setAnswersArray] = useState<
    Array<SingleChoiceQuestionAnswerProps>
  >(answers || [{ id: 0, answerContent: "" }]);
  const [answersCount, setAnswersCount] = useState<number>(
    answers ? answers.length : 1
  );
  const [questionValue, setQuestionValue] = useState<string>(question || "");
  const refs = useRef<Array<HTMLInputElement>>([]);
  const questionRef = useRef<HTMLInputElement>(null);

  const addAnswer = () => {
    setAnswersArray([...answersArray, { id: answersCount, answerContent: "" }]);
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

  const answerLayout = (
    <div className={classes.main}>
      <div className={classes.question}>
        <p>{question}</p>
        <p className={classes.hint}>(wybierz jedno)</p>
      </div>
      <div className={classes.answers}>
        {answers?.map((answer) => (
          <div className={classes.answer} key={answer.id}>
            <input
              type="radio"
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
          valueRef={questionRef}
          className={classes.questionInput}
          onChange={(e) => {
            setQuestionValue(e.target.value);
          }}
        />
        <p className={classes.hint}>(Zaznacz poprawną z boku)</p>
      <div className={classes.answers}>
        {answersArray.map((answer, i) => {
          return (
            <div className={classes.answer} key={Math.random()}>
              {answersCount > 1 && (
                <p onClick={() => deleteAnswer(i)}>&#10006;</p>
              )}
              <input type="radio" name={tempQuestionId?.toString()} />
              <Input
                type="text"
                name="answer"
                placeholder="Odpowiedź"
                onChange={(e) => handleInputChange(e, i)}
                value={answer.answerContent}
                valueRef={(ref: any) => {
                  refs.current[i] = ref;
                }}
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

export default SingleChoiceQuestion;
