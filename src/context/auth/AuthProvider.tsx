import React, { ReactNode, useReducer, useEffect } from "react";
import { User, AuthProvider as Provider, AuthAPI } from "./context";
import authReducer from "./AuthStateReducer";
import request from "../../utils/request";

interface Props {
  children: ReactNode;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

const model = {
  userData: "{username}"
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
    user: null
  } as AuthState);

  useEffect(() => {
    if (state.isAuthenticated) {
      getUserData();
    }
  }, [state.isAuthenticated]);

  const login = (phone: string, password: string) => {
    const query = `mutation{
      login (input: {identifier: "${phone}", password:"${password}"}) {
        jwt
      }
    }`;

    request(query).then(
      ({
        data: {
          login: { jwt }
        }
      }) => {
        dispatch({ type: "AUTH_SUCCESS", payload: jwt });
      }
    );
  };

  // const register = (phone: string, password: string) => {
  //   const query = `mutation{
  //     register (input: {identifier: "${phone}", password:"${password}"}) {
  //       jwt
  //     }
  //   }`;

  //   request(query).then(
  //     ({
  //       data: {
  //         register: { jwt }
  //       }
  //     }) => {
  //       dispatch({ type: "AUTH_SUCCESS", payload: jwt });
  //     }
  //   );
  // };

  const getUserData = () => {
    const query = `
      query {
        loggedUserData  ${model.userData}
      }`;

    request(query, { useAuthorizationToken: true }).then(
      ({ data: { loggedUserData } }) => {
        dispatch({ type: "LOAD_USER", payload: loggedUserData });
      }
    );
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Provider
      value={
        {
          isAuthenticated: state.isAuthenticated,
          login,
          user: state.user,
          logout,
          getUserData
        } as AuthAPI
      }
    >
      {children}
    </Provider>
  );
};

export default AuthProvider;
