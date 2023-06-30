import { useState, useEffect } from "react";
import classes from "./Quizzes.module.css";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const [newest, setNewest] = useState<Array<Quiz>>([
    {
      id: 0,
      name: "",
      description: "",
      avatar_id: 0,
    },
  ]);

  const navigate = useNavigate();

  interface Quiz {
    id: number;
    name: string;
    description: string;
    avatar_id: number;
  }

  const fetchNewest = async () => {
    const response = await fetch("http://localhost:5000/quizzes/newest");
    const data = await response.json();
    setNewest(data);
  };

  useEffect(() => {
    fetchNewest();
  }, []);

  function importAll(r: any) {
    let images: any = {};
    r.keys().forEach((item: any, index: any) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = Object.values(
    importAll(require.context("./QuizzesAvatars/", false, /\.(png|jpe?g|svg)$/))
  );

  return (
    <div className={classes.main}>
      <h1 className={classes.mainSign}>Quizy</h1>
      <div className={classes.newest}>
        <h2>Najnowsze</h2>
        <div className={classes.newestQuizzes}>
          {newest.map((quiz) => (
            <div
              className={classes.quiz}
              key={quiz.id}
              style={{ background: `url(${images[quiz.avatar_id - 1]})` }}
            >
              <div className={classes.quizNav}>
                <h3>{quiz.name}</h3>
                <p>{quiz.description}</p>
                <Button
                    text="Rozwiąż quiz"
                    onButtonClick={() => navigate(`/quiz/${quiz.id}`)}
                    classname={classes.button}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
