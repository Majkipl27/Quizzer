import classes from "./Input.module.css"

interface InputProps {
  valueRef: any;
  name: string;
  value?: string;
  onChange: (event: any) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  title?: string;
  id?: string;
  maxLength?: number;
}

const Textarea = (props: InputProps) => {
  return (
    <div className={classes.wrap}>
      <textarea
        ref={props.valueRef}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`${classes.input} ${classes.textarea} ${props.className}`}
        title={props.title}
        id={props.id}
        defaultValue={props.value}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default Textarea;