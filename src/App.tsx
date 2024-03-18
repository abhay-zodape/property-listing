import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddListing from "./pages/AddListing/AddListing";
import Listing from "./pages/Listing/Listing";
import NotFound from "./pages/NotFound/NotFound";
import Auth from "./pages/Auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/add-listing",
      element: <AddListing />,
    },
    {
      path: "/listing",
      element: <Listing />,
    },
    {
      path: "/sign-in",
      element: <Auth />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" hideProgressBar autoClose={2000} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
