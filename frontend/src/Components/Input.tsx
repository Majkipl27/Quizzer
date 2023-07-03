import classes from "./Input.module.css";
import { useEffect, useState } from "react";

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
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(props.value || "");
  }
  , [props.value]);

  return (
    <div className={`${classes.wrap} ${props.className}`}>
      <input
        ref={props.valueRef}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={classes.input}
        title={props.title}
        id={props.id}
        maxLength={props.maxLength}
        defaultValue={value}
      />
    </div>
  );
};

export default Input;
