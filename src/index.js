import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextDataProvider } from "./context/Contextdata";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ContextDataProvider>
   
  </React.StrictMode>
);
