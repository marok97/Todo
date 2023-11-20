import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import { store, persistor } from "./app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import TopBar from "./app/layout/TopBar";
import { Container, CssBaseline } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Black
      background: "#efe7e7",
    },
    secondary: {
      main: "#C0C0C0", // Silver
    },
  },
});

let x = localStorage.getItem("persist:root");
let s = JSON.parse(x);
let token = JSON.parse(s["token"]);
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <TopBar />
          <Container maxWidth={false} disableGutters sx={{ backgroundColor: theme.palette.primary.background, height: "100vh" }}>
            <RouterProvider router={router} />
          </Container>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
