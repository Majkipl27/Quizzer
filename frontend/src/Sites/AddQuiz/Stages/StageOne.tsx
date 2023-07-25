import Input from "../../../Components/Input";
import classes from "./Main.module.css";
import Textarea from "../../../Components/Textarea";
import { useRef } from "react";
import { useAtom } from "jotai";
import { quizDataAtom } from "../../../atoms";

const StageOne = () => {
  const nameRef = useRef<any>();
  const descRef = useRef<any>();
  const [data, setData] = useAtom(quizDataAtom);
    
  function handleChange() {
    setData({
      title: nameRef.current.value,
      description: descRef.current.value,
      avatarId: data.avatarId,
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
        maxLength={30}
      />
      <Textarea
        name="quizDescription"
        onChange={handleChange}
        placeholder="Opis Quizu"
        valueRef={descRef}
        value={data.description}
        maxLength={150}
      />
    </div>
  );
}

export default StageOne;