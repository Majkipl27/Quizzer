import SingleChoiceQuestion from "./QuestionTypes/SingleChoiceQuestion";
import MultiChoiceQuestion from "./QuestionTypes/MultiChoiceQuestion";
import OpenQuestion from "./QuestionTypes/OpenQuestion";
import classes from "./AddQuestion.module.css";

const AddQuestion = (props: any) => {
  return (
    <div className={classes.main}>
      <div
        onClick={() => {
          props.onClose(<SingleChoiceQuestion type="question" />);
        }}
      >
        Pytanie jednokrotnego wyboru
      </div>
      <div
        onClick={() => {
          props.onClose(
            <MultiChoiceQuestion
              type="question"
            />
          );
        }}
      >
        Pytanie wielokrotnego wyboru
      </div>
      <div
        onClick={() => {
          props.onClose(
            <OpenQuestion
              type="question"
            />
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
