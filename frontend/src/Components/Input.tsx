import classes from "./Input.module.css";

interface InputProps {
  valueRef: any;
  type: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  title?: string;
  id?: string;
  maxLength?: number;
}

const Input = (props: InputProps) => {
  return (
    <div className={classes.wrap}>
      <input
        ref={props.valueRef}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`${classes.input} ${props.className}`}
        title={props.title}
        id={props.id}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default Input;
