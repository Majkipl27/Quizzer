import { useState, useEffect } from "react";
import classes from "./Quizzes.module.css";
import Button from "../../Components/Button";
import QuizItem from "./Components/QuizItem";

const Quizzes = () => {
  const [newest, setNewest] = useState<Array<Quiz>>([]);
  const [isNewestError, setIsNewestError] = useState<boolean>(false);
  const [quizzes, setQuizzes] = useState<Array<Quiz>>([])
  const [isQuizzesError, setIsQuizzesError] = useState<boolean>(false);

  interface Quiz {
    id: number;
    name: string;
    description: string;
    avatar_id: number;
  }

  const fetchNewest = async () => {
    try {
      const response = await fetch("http://localhost:5000/quizzes/newest");

      if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      }

      const data = await response.json();
      setNewest(data);
    } catch (error) {
      console.error("Wystąpił błąd pobierania danych:", error);
      setIsNewestError(true);
    }
  };

  const fetchAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/quizzes");

      if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      }

      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Wystąpił błąd pobierania danych:", error);
      setIsQuizzesError(true);
    }
  };

  useEffect(() => {
    fetchNewest();
    fetchAll();
  }, []);

  return (
    <div className={classes.main}>
      <h1 className={classes.mainSign}>Quizy</h1>
      <div className={classes.newest}>
        <h2>Najnowsze</h2>
        <div className={classes.newestQuizzes}>
          {isNewestError ? (
            <p className={classes.error}>
              Wystąpił błąd podczas pobierania danych!{" "}
              <Button
                text="Kliknij aby spróbować ponownie"
                onButtonClick={fetchNewest}
              />
            </p>
          ) : (
            newest.map((quiz) => (
              <QuizItem
                id={quiz.id}
                name={quiz.name}
                description={quiz.description}
                avatar_id={quiz.avatar_id}
                key={quiz.id}
              />
            ))
          )}
        </div>
      </div>
      <div className={classes.allQuizzes}>
        <h2>Wszystkie quizy</h2>
        <div className={classes.quizzes}>
          {isQuizzesError ? (
            <p className={classes.error}>
              Wystąpił błąd podczas pobierania danych!{" "}
              <Button
                text="Kliknij aby spróbować ponownie"
                onButtonClick={fetchAll}
              />
            </p>
          ) : (
            quizzes.map((quiz) => (
              <QuizItem
                id={quiz.id}
                name={quiz.name}
                description={quiz.description}
                avatar_id={quiz.avatar_id}
                key={quiz.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
