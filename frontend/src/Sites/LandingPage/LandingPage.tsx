import classes from "./LandingPage.module.css";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../Graphics/AppLogo.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.landingPage}>
      <div className={classes.left}>
        <h1>Quizzer</h1>
        <p>
          Quizzer to interaktywna aplikacja quizowa, która umożliwia
          użytkownikom testowanie swojej wiedzy poprzez przeróżne quizy!
        </p>
        <Button
          text="Wskocz do świata quizów!"
          onButtonClick={() => navigate("/quizzes")}
          classname={classes.button}
        />
      </div>
      <div className={classes.right}>
        <img src={AppLogo.toString()} alt="Quizzer Logo" />
      </div>
    </div>
  );
};

export default LandingPage;
