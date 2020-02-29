import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import useAuthContext from "../../context/auth/context";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const UnloggedRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route {...restProps}>
      {isAuthenticated ? (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      ) : (
        children
      )}
    </Route>
  );
};

export default UnloggedRoute;
