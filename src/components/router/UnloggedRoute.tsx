import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import context from "../../context/auth/context";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const UnloggedRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { isAuthenticated } = useContext(context);
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
