import { atom } from "jotai";

interface questionData {
  id: number;
  questionValue: string;
  question_type: string;
  answersArray: Array<{
    id: number;
    answerContent: string;
    isCorrect: boolean;
  }>;
}

interface quizData {
  title: string;
  description: string;
  avatarId: number;
}

interface Answers {
  answersArray: Array<{
    id: number;
    answerContent: string;
    isCorrect: boolean;
  }>;
}

const quizDataAtom = atom<quizData>({
  title: "",
  description: "",
  avatarId: 1,
});
const questionsAtom = atom<any>([]);
const questionDataAtom = atom<Array<questionData>>([]);
const userAnswersAtom = atom<Array<Answers>>([]);

export { questionsAtom, questionDataAtom, quizDataAtom, userAnswersAtom };
