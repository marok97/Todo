import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Container,
} from "@mui/material";
import Draggable from "react-draggable";

const DraggableCard = ({ title, description, bgColor }) => {
  return (
    <Draggable>
      <Card sx={{ height: 150,width:250, backgroundColor: bgColor, color: "#fffff" }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Divider />
          <Typography color="textSecondary" mt={2}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Draggable>
  );
};

const TodoGrid = (todoData) => {
  const todos = todoData.todoData;

  return (
    <Container>
      <Grid container spacing={4}>
        {todos.map((todo) => (
          <Grid item key={todo.id} xs={12} sm={6} md={4}>
            <Typography variant="h3">{todo.status}</Typography>
           
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoGrid;
