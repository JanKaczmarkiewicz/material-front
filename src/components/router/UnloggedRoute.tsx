import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { AUTH as AUTH_CHECK } from "./queries";
import { Auth } from "../../generated/Auth";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const UnloggedRoute: React.FC<Props> = ({ children, ...restProps }) => {
  const { loading, error, data } = useQuery<Auth>(AUTH_CHECK);

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
