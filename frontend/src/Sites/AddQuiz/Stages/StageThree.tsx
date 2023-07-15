import classes from "./StageThree.module.css";
import defaultClasses from "./Main.module.css";
import { useAtom } from "jotai";
import { quizDataAtom } from "../../../atoms";

const StageThree = () => {
  const [quizData, setQuizData] = useAtom(quizDataAtom);

  function importAll(r: any) {
    let images: any = {};
    r.keys().forEach((item: any) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = Object.values(
    importAll(
      require.context(
        "../../../Graphics/QuizzesAvatars",
        false,
        /\.(png|jpe?g|svg)$/
      )
    )
  );

  const changeChoosenAvatarHandler = (i: number) => {
    setQuizData({ ...quizData, avatarId: i });
  };

  return (
    <div className={defaultClasses.main}>
      <p className={defaultClasses.titleParagraph}>
        Wybierz obrazek dla twojego quizu!
      </p>
      <div className={classes.images}>
        {images.map((image: any, i: number) => {
          return (
            <div className={quizData.avatarId === i + 1 ? classes.activeOption : classes.option} key={i}>
              <input type="radio" id={`avatar${i}`} name="avatar" defaultChecked={quizData.avatarId === i + 1} onChange={() => changeChoosenAvatarHandler(i + 1)}/>
              <label htmlFor={`avatar${i}`}>
                <img
                  src={image}
                  alt={`Obraz ${i + 1}`}
                  className={classes.image}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageThree;
