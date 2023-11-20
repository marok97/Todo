import React from "react";
import App from "../layout/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "../../features/login/Login";
import Todo from "../../features/todo/Todo";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/todo",
          element: <Todo />,
        },
      ],
    },
  ]);
  