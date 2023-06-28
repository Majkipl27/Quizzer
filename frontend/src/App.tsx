import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Layout/Header";
import Button from "./Components/Button";
import LandingPage from "./Sites/LandingPage";

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
        element: <h1>quizy</h1>,
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
