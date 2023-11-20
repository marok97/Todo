import App from "../layout/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "../../features/login/Login";
import Todo from "../../features/todo/Todo";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/todos",
        element: <Todo />,
      },
      {
        path: "/",
        element: <Todo />,
      },
    ],
  },
]);
