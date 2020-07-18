import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthContext } from "../../context/Auth/AuthContext";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const UnloggedRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { me } = useAuthContext();

  return (
    <Route {...restProps}>
      {me ? (
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
