import React, { createContext, useReducer } from "react";
import { userReducer } from "./reducer";
import { INITIAL_STATE } from "./constants";
import { IUserContext, IUserContextHOC } from "./UserContext.type";

export const UserContext = createContext<IUserContext | null>(null);

const UserContextHOC = ({ children }: IUserContextHOC) => {
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ userDispatch, userState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextHOC;
