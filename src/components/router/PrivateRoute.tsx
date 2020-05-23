import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { AUTH as AUTH_CHECK } from "./queries";
import { Auth } from "../../generated/Auth";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...restProps }) => {
  const { loading, error, data } = useQuery<Auth>(AUTH_CHECK);

  if (error) return <div>error</div>;

  if (loading || !data) return <div>loading</div>;

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
