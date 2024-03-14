import { IUserState, UserAction } from "./UserContext.type";
import { INITIAL_STATE } from "./constants";

export const userReducer = (
  state: IUserState,
  { type, payload }: UserAction
) => {
  switch (type) {
    case "sign-in": {
      return {
        isLoggedIn: true,
        username: payload?.username,
        name: payload?.name,
      };
    }
    case "sign-out": {
      window.localStorage.clear();
      return { isLoggedIn: false, username: "", name: "" };
    }
    default: {
      return state;
    }
  }
};
