import Account from "../Account/Account";

export const GET_NAVIGATION_ITEMS = (isLoggedIn: boolean) => [
  { title: "Home", path: "/home" },
  { title: "Listing", path: "/listing" },
  { title: "Property", path: "/property" },
  { title: "Agent", path: "/agent" },
  { title: "Contact", path: "/contact" },
  isLoggedIn
    ? {
        title: <Account />,
        path: "",
      }
    : { title: "Sign In", path: "/sign-in" },
];
