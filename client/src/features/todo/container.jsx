import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import ProjectSideMenu from "./ProjectSideMenu";
import ProjectHeader from "./ProjectHeader";
import TodoCards from "./DragItem";

const TodoContainer = () => {
  return (
    <>
      <ProjectSideMenu />
      <Box flex={4}>
        <ProjectHeader />
        <AppBar
          component={"nav"}
          elevation={0}
          position="sticky"
          sx={{ color: "black", backgroundColor: "#fff", justifyContent:"center" }}
        >
          <Toolbar>
            <Typography
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              SECOND HEADER
            </Typography>
          </Toolbar>
        </AppBar>
        <TodoCards />
      </Box>
    </>
  );
};

export default TodoContainer;
