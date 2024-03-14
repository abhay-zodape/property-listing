import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddListing from "./pages/AddListing/AddListing";
import Listing from "./pages/Listing/Listing";

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
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
