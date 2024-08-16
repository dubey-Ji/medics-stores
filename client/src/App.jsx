import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Oauth2Callback from "./components/Oauth2Callback";
import ForgotPassword from "./components/Forgotpassword";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import AddProduct from "./components/AddProduct";

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
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/oauth2/callback",
    element: <Oauth2Callback />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
