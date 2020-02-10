import React from "react";
import Dashboard from "../routes/Dashboard";
import Add from "../routes/Add";
import Users from "../routes/Users";
import Login from "../routes/Login";
import { Switch, Route } from "react-router-dom";
import UnloggedRoute from "./UnloggedRoute";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        Main
      </Route>

      <Route path="/dashboard" exact>
        <Dashboard />
      </Route>

      <UnloggedRoute path="/login" exact>
        <Login />
      </UnloggedRoute>

      <Route path="/users" exact>
        <Users />
      </Route>
      <Route path="/add" exact>
        <Add />
      </Route>
    </Switch>
  );
};

export default Router;
