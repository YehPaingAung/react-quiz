import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QNAContextProvider } from "./hooks/QNAContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QNAContextProvider>
      <App />
    </QNAContextProvider>
  </React.StrictMode>
);
