import React from "react";
import { AuthAPI, Provider } from "./AuthContext";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Me } from "../../generated/Me";
import { Login } from "../../generated/Login";

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
  const { loading, error, data } = useQuery<Me>(ME);

  const [login] = useMutation<Login>(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
    },
  });

  if (loading) return <div>loading...</div>;

  const api: AuthAPI = {
    login: (data) => login({ variables: data }),
    logout: () => {},
    me: data?.me || null,
  };

  return <Provider value={api}>{children}</Provider>;
};

export default AuthProvider;
