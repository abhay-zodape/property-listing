import { USER_LIST } from "../../constants/user";
import { IUserState } from "./UserContext.type";

const username = window.localStorage.getItem("username");

const userDetails = USER_LIST.find((user) => user.username === username);

export const INITIAL_STATE: IUserState = {
  isLoggedIn: Boolean(username),
  username: username ?? "",
  name: userDetails?.name ?? "",
};
