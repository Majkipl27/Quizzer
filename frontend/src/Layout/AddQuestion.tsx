import SingleChoiceQuestion from "./QuestionTypes/SingleChoiceQuestion";
import MultiChoiceQuestion from "./QuestionTypes/MultiChoiceQuestion";
import OpenQuestion from "./QuestionTypes/OpenQuestion";
import classes from "./AddQuestion.module.css";
import { useAtomValue } from "jotai";
import { questionsAtom } from "../atoms";

const AddQuestion = (props: any) => {
  const questions = useAtomValue(questionsAtom);

  return (
    <div className={classes.main}>
      <div
        onClick={() => {
          props.onClose(
            <SingleChoiceQuestion type="question" id={questions.length} />,
            "singleChoice"
          );
        }}
      >
        Pytanie jednokrotnego wyboru
      </div>
      <div
        onClick={() => {
          props.onClose(
            <MultiChoiceQuestion type="question" id={questions.length} />,
            "multiChoice"
          );
        }}
      >
        Pytanie wielokrotnego wyboru
      </div>
      <div
        onClick={() => {
          props.onClose(
            <OpenQuestion type="question" id={questions.length} />,
            "open"
          );
        }}
      >
        Pytanie otwarte
      </div>
      <p onClick={props.close}>&#10006;</p>
    </div>
  );
};

export default AddQuestion;
