import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const AUTH_CHECK = gql`
  query {
    me {
      confirmed
    }
  }
`;

const UnloggedRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { loading, error, data } = useQuery(AUTH_CHECK);

  if (error) return <div>error</div>;
  if (loading) return <div>loading ...</div>;

  const user = data?.me;

  return (
    <Route {...restProps}>
      {user ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
        children
      )}
    </Route>
  );
};

export default UnloggedRoute;
