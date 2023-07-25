import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Layout/Header";
import LandingPage from "./Sites/LandingPage/LandingPage";
import Quizzes from "./Sites/Quizzes/Quizzes";
import AddQuiz from "./Sites/AddQuiz/AddQuiz";
import Play from "./Sites/Play/Play";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/quizzes",
        element: <Quizzes />,
      },
      {
        path: "/addquiz",
        element: <AddQuiz />,
      },
      {
        path: "/quiz/:quizId",
        element: <Play />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
