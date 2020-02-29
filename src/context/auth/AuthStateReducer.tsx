import { AuthState } from "./AuthProvider";
import { User } from "./context";
type Token = string;

export type AuthAction =
  | { type: "AUTH_SUCCESS"; payload: Token }
  | { type: "AUTH_FAILED" }
  | { type: "LOGOUT" }
  | { type: "LOAD_USER"; payload: User };

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      localStorage.setItem("token", action.payload);
      return { ...state, isAuthenticated: true };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload
      };

    case "LOGOUT":
    case "AUTH_FAILED":
      localStorage.removeItem("token");
      return { ...state, user: null, isAuthenticated: false };

    default:
      break;
  }
  return state;
};

export default authReducer;
