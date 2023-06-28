import classes from "./Button.module.css";

interface ButtonProps {
  text: string;
  onButtonClick?: Function;
  classname?: String;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onButtonClick = () => {},
  classname,
}: ButtonProps) => {
  return (
    <div
      className={`${classes.buttonWrap} ${classname}`}
      onClick={() => onButtonClick()}
    >
      <button className={classes.button} onClick={() => onButtonClick()}>
        <p>{text}</p>
      </button>
    </div>
  );
};

export default Button;
