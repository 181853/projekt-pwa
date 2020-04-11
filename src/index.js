import React from "react";
import ReactDOM from "react-dom";
import { FirebaseProvider } from "./context";
import App from "./views";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById("root")
);
