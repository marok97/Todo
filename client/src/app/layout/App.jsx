import React from "react";
import { CssBaseline, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Black
    },
    secondary: {
      main: "#C0C0C0", // Silver
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TopBar />
        <Container maxWidth={false}>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
