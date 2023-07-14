import classes from "./OpenQuestion.module.css";
import Input from "../../Components/Input";
import { useRef, useState } from "react";
import { useAtom } from "jotai";
import { questionDataAtom } from "../../atoms";

interface props {
  id: number;
  type: string;
  question?: string;
}

const OpenQuestion = ({ id, type, question }: props) => {
  const answerRef = useRef<any>();
  const questionRef = useRef<any>();
  const [globalQuestionData, setGlobalQuestionData] = useAtom(questionDataAtom);

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

  const answerLayout = (
    <div className={classes.main}>
      <div className={classes.question}>{question || "Treść pytania"}</div>
      <Input
        type="text"
        name="openQuestion"
        placeholder="Odpowiedź"
        value={answer}
        className={classes.input}
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
