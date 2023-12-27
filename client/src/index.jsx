import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "../src/app/layout/App";
// import "./styles.css"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
