import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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

const PrivateRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { loading, error, data } = useQuery(AUTH_CHECK);

  if (error) return <div>error</div>;

  if (loading) return <div>loading</div>;

  return (
    <Route {...restProps}>
      {data.me ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
