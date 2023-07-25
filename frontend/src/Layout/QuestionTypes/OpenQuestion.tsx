import classes from "./OpenQuestion.module.css";
import Input from "../../Components/Input";
import { useRef, useState } from "react";
import { useAtom } from "jotai";
import { questionDataAtom, userAnswersAtom } from "../../atoms";

interface props {
  id: number;
  type: string;
  question?: string;
}

const OpenQuestion = ({ id, type, question }: props) => {
  const answerRef = useRef<any>('');
  const questionRef = useRef<any>();
  const [globalQuestionData, setGlobalQuestionData] = useAtom(questionDataAtom);
  const [userGlobalAnswers, setUserGlobalAnswers] = useAtom(
    userAnswersAtom
  );

  const [userAnswers, setUserAnswers] = useState<any>(userGlobalAnswers[id].answersArray);

  const [answer, setAnswer] = useState<string>(
    globalQuestionData[id].answersArray[0].answerContent
  );

  const [questionValue, setQuestionValue] = useState<string>(
    globalQuestionData[id].questionValue
  );

  const handleQuestionChange = () => {
    let copy = [...globalQuestionData];
    copy[id].questionValue = questionRef.current.value;
    setGlobalQuestionData(copy);
    setQuestionValue(questionRef.current.value);
  };

  const setAnswerHandler = () => {
    let copy = [...globalQuestionData];
    copy[id].answersArray[0].answerContent = answerRef.current.value;
    setGlobalQuestionData(copy);
    setAnswer(answerRef.current.value);
  };

  const handleUserAnswer = () => {
    let copy = [...userAnswers];
    let copy2 = [...userGlobalAnswers];
    copy[0].answerContent = answerRef.current.value;
    copy2[id].answersArray[0].answerContent = answerRef.current.value;

    setUserGlobalAnswers(copy2);
    setUserAnswers(copy);
  }

  const answerLayout = (
    <div className={classes.main}>
      <div className={classes.question}>{question || "Treść pytania"}</div>
      <Input
        type="text"
        name={`openQuestion${Math.random()}`}
        placeholder="Odpowiedź"
        value={answerRef.current.value || ""}
        className={classes.input}
        valueRef={answerRef}
        onChange={handleUserAnswer}
      />
    </div>
  );

  const questionLayout = (
    <div className={classes.main}>
      <Input
        type="text"
        name="openQuestion"
        placeholder="Treść pytania"
        value={questionValue}
        valueRef={questionRef}
        onChange={handleQuestionChange}
        className={classes.input}
      />
      <Input
        type="text"
        name="openQuestion"
        placeholder="Poprawna odpowiedź"
        value={answer}
        valueRef={answerRef}
        onChange={setAnswerHandler}
        className={classes.input}
      />
    </div>
  );

  return type === "answer" ? answerLayout : questionLayout;
};

export default OpenQuestion;
