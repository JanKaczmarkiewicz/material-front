import React, { useReducer, useEffect } from "react";
import { AuthAPI, Provider } from "./AuthContext";
import { gql } from "apollo-boost";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Me } from "../../../generated/Me";
import { Login } from "../../../generated/Login";
import { authReducer, ActionType } from "./AuthReducer";
import { AsyncStorage } from "react-native";
import { storage } from "../../../utils/storage";

interface Props {
  children: React.ReactNode;
}

const ME = gql`
  query Me {
    me {
      username
      confirmed
      email
      id
      role
    }
  }
`;

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    me: null,
  });

  useEffect(() => {
    const autoLogin = async () => {
      const token = await storage.getItem("token");
      if (!token) return;
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: token });
    };
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    state.isAuthenticated && !state.me && getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuthenticated, state.me]);

  const [getMe] = useLazyQuery<Me>(ME, {
    onCompleted({ me }) {
      dispatch({ type: ActionType.ME_SUCCESS, payload: me });
    },
    onError() {
      dispatch({ type: ActionType.ME_FAILED });
    },
  });

  const [login] = useMutation<Login>(LOGIN, {
    async onCompleted({ login: token }) {
      await storage.setItem("token", token);
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: token });
    },
    onError() {
      dispatch({ type: ActionType.LOGIN_FAILED });
    },
  });

  const api: AuthAPI = {
    login: (data) => login({ variables: { input: data } }),
    logout: async () => {
      await storage.removeItem("token");
      dispatch({ type: ActionType.LOGOUT });
    },
    ...state,
  };

  return <Provider value={api}>{children}</Provider>;
};

export default AuthProvider;
