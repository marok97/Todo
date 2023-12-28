import { Container, CssBaseline, Box, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/Routes";
import theme from "./theme";
import SideBar from "./SideBar";
import TodoContainer from "../../features/todo/container";

const Layout = () => {
  return (
    <>
      <SideBar />
      <TodoContainer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: theme.palette.primary.background,
          height: "100vh", //take full height of page
          display: "flex",
        }}
      >
        {/* <Layout />

         */}
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
