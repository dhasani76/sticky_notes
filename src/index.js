import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import "./../public/styles.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
