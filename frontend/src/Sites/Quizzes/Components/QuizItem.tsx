import classes from "./QuizItem.module.css";
import Button from "../../../Components/Button";
import { useNavigate } from "react-router-dom";

interface quizItemProps {
  id: number;
  name: string;
  description: string;
  avatar_id: number;
}

const QuizItem = ({id, name, description, avatar_id}: quizItemProps) => {
  const navigate = useNavigate();

  function importAll(r: any) {
    let images: any = {};
    r.keys().forEach((item: any) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = Object.values(
    importAll(
      require.context(
        "../../../Graphics/QuizzesAvatars",
        false,
        /\.(png|jpe?g|svg)$/
      )
    )
  );

  return (
    <div
      className={classes.quiz}
      key={id}
      style={{ background: `url(${images[avatar_id - 1]})` }}
    >
      <div className={classes.quizNav}>
        <h3>{name}</h3>
        <p>{description}</p>
        <Button
          text="Rozwiąż quiz"
          onButtonClick={() => navigate(`/quiz/${id}`)}
          classname={classes.button}
        />
      </div>
    </div>
  );
};

export default QuizItem;
