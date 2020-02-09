import React, { ReactNode, useReducer } from "react";
import context, { AuthAPI } from "./context";
import authReducer, { UserData } from "./AuthStateReducer";
import request from "../../utils/request";

interface Props {
  children: ReactNode;
}

export type AuthState = {
  isAuthenticated: boolean;
  name: string;
  email: string;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: !!localStorage.getItem("token")
  } as AuthState);

  const login = (email: string, password: string) => {
    const header: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password })
    };

    request("/auth", header).then((token: string) => {
      dispatch({ type: "AUTH_SUCCESS", payload: token });
    });
  };

  const register = (email: string, password: string) => {
    const header: RequestInit = {
      method: "POST",
      body: JSON.stringify({ email, password })
    };

    request("/user", header).then((token: string) => {
      dispatch({ type: "AUTH_SUCCESS", payload: token });
    });
  };

  const getUserData = () => {
    const header: RequestInit = {
      method: "GET"
    };

    request("/user/{}", header).then((userData: UserData) => {
      dispatch({ type: "LOAD_USER", payload: userData });
    });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <context.Provider
      value={
        {
          isAuthenticated: state.isAuthenticated,
          login,
          register,
          logout,
          getUserData
        } as AuthAPI
      }
    >
      {children}
    </context.Provider>
  );
};

export default AuthProvider;
