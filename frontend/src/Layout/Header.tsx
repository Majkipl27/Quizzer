import classes from "./Header.module.css";
import { Outlet } from "react-router-dom";
import Logo from "../Graphics/AppLogo.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={Logo.toString()} alt="Logo" />
          <h1>
            <NavLink to={"/"}>Quizzer</NavLink>
          </h1>
        </div>
        <div className={classes.nav}>
          <NavLink to={"/quizzes"} className={classes.navlink}>
            Quizy
          </NavLink>
          <NavLink to={"/addquiz"} className={classes.navlink}>
            Stwórz Quiz
          </NavLink>
        </div>
        <div className={classes.fakeBorderXD}></div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
