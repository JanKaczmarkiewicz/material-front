import React from "react";
import Dashboard from "../routes/Dashboard";
import Users from "../routes/Users";
import Login from "../routes/Login";
import { Switch, Route } from "react-router-dom";
import UnloggedRoute from "./UnloggedRoute";
import PrivateRoute from "./PrivateRoute";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        Main
      </Route>

      <UnloggedRoute path="/login" exact>
        <Login />
      </UnloggedRoute>

      <PrivateRoute path="/dashboard" exact>
        <Dashboard />
      </PrivateRoute>

      <PrivateRoute path="/users" exact>
        <Users />
      </PrivateRoute>
    </Switch>
  );
};

export default Router;
