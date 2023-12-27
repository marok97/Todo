import { createBrowserRouter } from "react-router-dom";
import Login from "../../features/login/Login";
import TodoContainer from "../../features/todo/container";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/todos",
        element: <TodoContainer />,
      },
      {
        path: "/",
        element: <TodoContainer />,
      },
    ],
  },
]);
