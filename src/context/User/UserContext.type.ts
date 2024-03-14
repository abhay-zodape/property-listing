import { PropsWithChildren } from "react";

export interface UserAction {
  type: "sign-in" | "sign-out";
  payload: any;
}

export interface IUserState {
  username: string;
  name: string;
  isLoggedIn: boolean;
}

export interface IUserContextHOC extends PropsWithChildren {}

export interface IUserContext {
  userState: IUserState;
  userDispatch: React.Dispatch<UserAction>;
}
