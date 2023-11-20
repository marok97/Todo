import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Container,
} from "@mui/material";

const TodoGrid = (todoData) => {
  // Sample data for demonstration purposes
  const todos = todoData.todoData;

  return (
    <Container>
      <Grid container spacing={4}>
        {todos.map((todo) => (
          <Grid item key={todo.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: 200 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {todo.title}
                </Typography>
                <Divider />
                <Typography color="textSecondary" mt={2}>
                  {todo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TodoGrid;
