import { AuthState } from "./AuthProvider";

export interface UserData {
  id: string | null;
  name: string | null;
  email: string | null;
}

type Token = string;

export type AuthAction =
  | { type: "AUTH_SUCCESS"; payload: Token }
  | { type: "AUTH_FAILED" }
  | { type: "LOGOUT" }
  | { type: "LOAD_USER"; payload: UserData };

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, isAuthenticated: true };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload
      };

    case "LOGOUT":
    case "AUTH_FAILED":
      return { ...state, user: null, isAuthenticated: false };

    default:
      break;
  }
  return state;
};

export default authReducer;
