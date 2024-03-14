import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddListing from "./pages/AddListing/AddListing";
import Listing from "./pages/Listing/Listing";
import SignIn from "./pages/SignIn/SignIn";
import UserContextHOC from "./context/User/UserContext";
import NotFound from "./pages/NotFound/NotFound";

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
      element: <SignIn />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <UserContextHOC>
      <RouterProvider router={routes} />
    </UserContextHOC>
  );
}

export default App;
