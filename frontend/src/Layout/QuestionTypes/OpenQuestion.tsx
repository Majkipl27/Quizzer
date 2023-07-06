import classes from "./OpenQuestion.module.css";
import Input from "../../Components/Input";
import { useRef, useState } from "react";

interface props {
  type: string;
  question?: string;
}

const OpenQuestion = ({ type, question }: props) => {
  const answerRef = useRef<any>();
  const questionRef = useRef<any>();
  const [answer, setAnswer] = useState<string>("");
  const [questionState, setQuestionState] = useState<string>("");

  const answerLayout = (
    <div className={classes.main}>
      <div className={classes.question}>{question || "Treść pytania"}</div>
      <Input
        type="text"
        name="openQuestion"
        placeholder="Odpowiedź"
        valueRef={answerRef}
        onChange={() => setAnswer(answerRef.current.value)}
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
        valueRef={questionRef}
        onChange={() => setQuestionState(questionRef.current.value)}
        className={classes.input}
      />
      <Input
        type="text"
        name="openQuestion"
        placeholder="Poprawna odpowiedź"
        valueRef={answerRef}
        onChange={() => setAnswer(answerRef.current.value)}
        className={classes.input}
      />
    </div>
  );

  if (type === "answer") return answerLayout;
  else if (type === "question") return questionLayout;
  else return <></>;
};

export default OpenQuestion;
