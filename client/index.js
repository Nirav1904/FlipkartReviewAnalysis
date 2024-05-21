import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/about";
import TextForm from "./components/textForm";
import ReviewExtractor from "./components/reviewExtractor";
import TextShpere from "./components/TextSphere";
import Example from "./components/temp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reviewExtrator",
    element: <ReviewExtractor />,
  },
  {
    path: "/about-tut",
    element: <About />,
  },
  {
    path: "/textExtraction",
    element: <TextForm />,
  },
  {
    path: "/TextSphere",
    element: <TextShpere />,
  },

  {
    path: "/temp",
    element: <Example />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
