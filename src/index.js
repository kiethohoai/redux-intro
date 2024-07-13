import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";

import { Provider } from "react-redux";

store.dispatch({
  type: "account/deposit",
  payload: 250,
});
// console.log(store.getState().account);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
