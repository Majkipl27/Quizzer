import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Layout/Header";
import LandingPage from "./Sites/LandingPage/LandingPage";
import Quizzes from "./Sites/Quizzes/Quizzes";

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
        element: <h1>dodaj quiz</h1>,
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
