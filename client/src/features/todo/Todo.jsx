import { Button } from "@mui/material";
import service from "../../app/api/service";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut as logOutAction } from "../login/authSlice";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    service.Todo.getTodos()
      .then((data) => setTodos(data))
      .then(() => console.log(todos))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  function logOut() {
    dispatch(logOutAction());
    navigate("/login");
  }

  if (loading) return <LoadingComponent message="Retrieving todos..." />;
  return (
    <>
      <Button variant="contained" onClick={() => console.log(todos)}>Press me</Button>
      <Button variant="contained" onClick={logOut}>Log out..</Button>
    </>
  );
};

export default Todo;
