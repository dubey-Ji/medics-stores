import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Oauth2Callback from "./components/Oauth2Callback";
import ForgotPassword from "./components/Forgotpassword";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/oauth2/callback",
    element: <Oauth2Callback />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
