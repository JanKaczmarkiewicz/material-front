import React, { ReactNode, useReducer, useEffect } from "react";
import context, { AuthAPI } from "./context";
import authReducer, { UserData } from "./AuthStateReducer";
import request from "../../utils/request";

interface Props {
  children: ReactNode;
}

export type AuthState = {
  isAuthenticated: boolean;
  name: string;
  phone: string;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: !!localStorage.getItem("token")
  } as AuthState);

  useEffect(() => {
    // if (state.isAuthenticated) {
    //   getUserData();
    // }
  }, [state.isAuthenticated]);

  const login = (phone: string, password: string) => {
    const header: RequestInit = {
      method: "POST",
      body: JSON.stringify({ phone, password })
    };
    console.log("start");

    request("/auth", header).then((token: string) => {
      dispatch({ type: "AUTH_SUCCESS", payload: token });
    });
  };

  const register = (phone: string, password: string) => {
    const header: RequestInit = {
      method: "POST",
      body: JSON.stringify({ phone, password })
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
