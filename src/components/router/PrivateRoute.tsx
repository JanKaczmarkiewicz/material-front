import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import useAuthContext from "../../context/auth/context";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route {...restProps}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
