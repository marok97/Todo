import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import { store, persistor } from "./app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

let x =localStorage.getItem("persist:root")
let s = JSON.parse(x)
console.log(s)
console.log(s["token"])
axios.defaults.headers.common["Authorization"] = `Bearer ${s["token"]}`
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
