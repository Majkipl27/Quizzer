import classes from "./MultiChoiceQuestion.module.css";
import { useState, useRef } from "react";
import Input from "../../Components/Input";
import { useAtom } from "jotai";
import { questionDataAtom } from "../../atoms";

interface MultiChoiceQuestionProps {
  id: number;
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
  id,
  type,
  question,
  questionId,
  answers,
}: MultiChoiceQuestionProps) => {
  const [globalQuestionData, setGlobalQuestionData] = useAtom(questionDataAtom);

  const [answersArray, setAnswersArray] = useState<
    Array<MultiChoiceQuestionAnswerProps>
  >(globalQuestionData[id].answersArray);

  const [answersCount, setAnswersCount] = useState<number>(
    globalQuestionData[id].answersArray.length
  );

  const [questionValue, setQuestionValue] = useState<string>(
    globalQuestionData[id].questionValue
  );

  const refs = useRef<Array<HTMLInputElement>>([]);

  const addAnswer = () => {
    let copy = [...globalQuestionData];
    setAnswersArray([
      ...answersArray,
      { id: answersCount, answerContent: "", isCorrect: false },
    ]);
    copy[id].answersArray = [
      ...answersArray,
      { id: answersCount, answerContent: "", isCorrect: false },
    ];
    setGlobalQuestionData(copy);
    setAnswersCount((e) => e + 1);
  };

  const deleteAnswer = (answerIndex: number) => {
    const tempArray = [...answersArray];
    tempArray.splice(answerIndex, 1);
    const updatedArray = tempArray.map((answer, index) => ({
      ...answer,
      id: index,
    }));
    let copy = [...globalQuestionData];
    copy[id].answersArray = updatedArray;
    setAnswersArray(updatedArray);
    setGlobalQuestionData(copy);
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

  const handleQuestionChange = (e: string) => {
      let copy = [...globalQuestionData];
      copy[id].questionValue = e;
      setQuestionValue(e);
      setGlobalQuestionData(copy);
  };

  const handleAnswerSelection = (selectedAnswerIndex: number) => {
    let isCorrect = answersArray[selectedAnswerIndex].isCorrect;
    let updatedAnswersArray = [...answersArray];
    let copy = [...globalQuestionData];
    copy[id].answersArray = updatedAnswersArray;
    updatedAnswersArray[selectedAnswerIndex].isCorrect = !isCorrect;
    setAnswersArray(updatedAnswersArray);
    setGlobalQuestionData(copy);
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
          handleQuestionChange(e.target.value);
        }}
      />
      <p className={classes.hint}>(Zaznacz poprawne z boku)</p>
      <div className={classes.answers}>
        {answersArray.map((answer: any, i: number) => {
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

  return type === "answer" ? answerLayout : questionLayout;
};

export default MultiChoiceQuestion;
