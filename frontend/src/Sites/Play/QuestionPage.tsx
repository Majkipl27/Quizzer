import { useAtomValue } from "jotai";
import { questionDataAtom } from "../../atoms";
import SingleChoiceQuestion from "../../Layout/QuestionTypes/SingleChoiceQuestion";
import MultiChoiceQuestion from "../../Layout/QuestionTypes/MultiChoiceQuestion";
import OpenQuestion from "../../Layout/QuestionTypes/OpenQuestion";
import Button from "../../Components/Button";
import classes from "./Play.module.css";

const QuestionPage = ({ setStage }: any) => {
  const questionDataArray = useAtomValue(questionDataAtom);

  //these divs around questions are looking stupid ye?
  //tell it react devs who made it so stupid in use

  return (
    <>
      <div className={classes.questions}>
        {questionDataArray.map((question, index) => {
          if (question.question_type === "singleChoice") {
            return (
              <div key={index}>
                <SingleChoiceQuestion
                  id={index}
                  type="answer"
                  question={question.questionValue}
                />
              </div>
            );
          } else if (question.question_type === "multipleChoice") {
            return (
              <div key={index}>
                <MultiChoiceQuestion
                  id={index}
                  type="answer"
                  question={question.questionValue}
                  answers={question.answersArray}
                />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <OpenQuestion
                  id={index}
                  type="answer"
                  question={question.questionValue}
                />
              </div>
            );
          }
        })}
      </div>
      <Button
        classname={classes.button}
        text="Zakończ"
        onButtonClick={() => {
          setStage(3);
        }}
      />
    </>
  );
};

export default QuestionPage;
