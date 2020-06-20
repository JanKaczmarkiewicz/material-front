import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthContext } from "../../context/Auth/AuthContext";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...restProps }) => {
  const { me } = useAuthContext();

  return (
    <Route {...restProps}>
      {me ? (
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
