import service from "../../app/api/service";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useState, useEffect } from "react";

const Todo = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    service.Todo.getTodos()
      .then((data) => setTodos(data))
      .then(() => console.log(todos))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Retrieving todos..."/>;
  return (
    <>
      <div>hej</div>
    </>
  );
};

export default Todo;
