import { createContext } from "react";

type Auth = (email: string, password: string) => void;

export interface AuthAPI {
  isAuthenticated: boolean;
  login: Auth;
  register: Auth;
}

const initialState: AuthAPI = {
  isAuthenticated: false,
  login: (email, password) => {},
  register: (email, password) => {}
};

const context = createContext<AuthAPI>(initialState);

export default context;
