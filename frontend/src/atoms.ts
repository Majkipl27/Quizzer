import { atom } from "jotai";

interface questionData {
  id: number;
  questionValue: string;
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

const quizDataAtom = atom<quizData>({
  title: "",
  description: "",
  avatarId: 0,
});
const questionsAtom = atom<any>([]);
const questionDataAtom = atom<Array<questionData>>([]);

export { questionsAtom, questionDataAtom, quizDataAtom };
