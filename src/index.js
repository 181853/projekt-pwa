import React from "react";
import ReactDOM from "react-dom";
import { FirebaseProvider } from "./context";
import App from "./views";

import "./styles.css";

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById("root")
);
