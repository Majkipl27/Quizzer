import Input from "../../../Components/Input";
import classes from "./Main.module.css";
import Textarea from "../../../Components/Textarea";
import { useRef } from "react";

interface props {
  setData: any;
  data: {
    title: string;
    description: string;
  };
}

const StageOne = ({ setData, data }: props) => {
  const nameRef = useRef<any>();
  const descRef = useRef<any>();
    
  function handleChange() {
    setData({
      title: nameRef.current.value,
      description: descRef.current.value,
    });
  };

  return (
    <div className={classes.main}>
      <p className={classes.titleParagraph}>
        Na początek, uzupełnij podstawowe informacje dotyczące quizu
      </p>
      <Input
        type="text"
        name="quizName"
        onChange={handleChange}
        placeholder="Nazwa Quizu"
        valueRef={nameRef}
        value={data.title}
      />
      <Textarea
        name="quizDescription"
        onChange={handleChange}
        placeholder="Opis Quizu"
        valueRef={descRef}
        value={data.description}
      />
    </div>
  );
}

export default StageOne;