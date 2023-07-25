import classes from "./SingleChoiceQuestion.module.css";
import { useState, useRef } from "react";
import Input from "../../Components/Input";
import { useAtom } from "jotai";
import { questionDataAtom, userAnswersAtom } from "../../atoms";

interface SingleChoiceQuestionProps {
  id: number;
  type: string;
  question?: string;
  questionId?: number;
}

interface SingleChoiceQuestionAnswerProps {
  id: number;
  answerContent: string;
  isCorrect: boolean;
}

const SingleChoiceQuestion = ({
  id,
  type,
  question,
  questionId,
}: SingleChoiceQuestionProps) => {
  const [globalQuestionData, setGlobalQuestionData] = useAtom(questionDataAtom);
  const [userGlobalAnswers, setUserGlobalAnswers] = useAtom(userAnswersAtom);
  const [userAnswers, setUserAnswers] = useState<any>(
    userGlobalAnswers[id].answersArray
  );

  const [answersArray, setAnswersArray] = useState<
    Array<SingleChoiceQuestionAnswerProps>
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

  const handleAnswerSelection = (selectedAnswerIndex: number) => {
    let copy = [...globalQuestionData];
    const updatedAnswersArray = answersArray.map((answer, index) => ({
      ...answer,
      isCorrect: index === selectedAnswerIndex,
    }));
    copy[id].answersArray = updatedAnswersArray;
    setAnswersArray(updatedAnswersArray);
  };
  
  const handleUserAnswerSelection = (selectedAnswerIndex: number) => {
    let copy = [...userGlobalAnswers];
    const updatedAnswersArray = answersArray.map((answer, index) => ({
      ...answer,
      isCorrect: index === selectedAnswerIndex,
    }));
    copy[id].answersArray = updatedAnswersArray;
    setUserGlobalAnswers(copy);
  };

  const handleQuestionChange = (e: string) => {
    let copy = [...globalQuestionData];
    copy[id].questionValue = e;
    setQuestionValue(e);
    setGlobalQuestionData(copy);
  };
  
  const tempQuestionId = questionId || Math.random() * 1000;

  const answerLayout = (
    <div className={classes.main}>
      <div className={classes.question}>
        <p>{question}</p>
        <p className={classes.hint}>(wybierz jedno)</p>
      </div>
      <div className={classes.answers}>
        {userAnswers?.map((answer: any) => (
          <div className={classes.answer} key={answer.id}>
            <input
              type="radio"
              name={tempQuestionId?.toString()}
              id={`question${questionId?.toString()}-${answer.id}`}
              onChange={() => handleUserAnswerSelection(answer.id - 1)}
            />
            <label htmlFor={`question${questionId?.toString()}-${answer.id}`}>
              {answer.answerContent}
            </label>
          </div>
        ))}
      </div>
    </div>
  );


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
      <p className={classes.hint}>(Zaznacz poprawną z boku)</p>
      <div className={classes.answers}>
        {answersArray.map((answer, i) => {
          return (
            <div className={classes.answer} key={Math.random()}>
              {answersCount > 2 && (
                <p onClick={() => deleteAnswer(i)}>&#10006;</p>
              )}
              <input
                type="radio"
                name={tempQuestionId?.toString()}
                onChange={() => handleAnswerSelection(i)}
                defaultChecked={answer.isCorrect}
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

export default SingleChoiceQuestion;
