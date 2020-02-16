import React from "react";
import Dashboard from "../routes/Dashboard";
import Data from "../routes/Data";
import Users from "../routes/Users";
import Login from "../routes/Login";
import { Switch, Route } from "react-router-dom";
import UnloggedRoute from "./UnloggedRoute";

import Streets from "../routes/data/Streets";
import Priests from "../routes/data/Priests";
import Acolytes from "../routes/data/Acolytes";
import Houses from "../routes/data/Houses";

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
      <Route path="/data" exact>
        <Data />
      </Route>

      <Route path={`/data/street`} exact>
        <Streets />
      </Route>

      <Route path={`/data/priest`} exact>
        <Priests />
      </Route>

      <Route path={`/data/acolyte`} exact>
        <Acolytes />
      </Route>
      <Route path={`/data/house`} exact>
        <Houses />
      </Route>
    </Switch>
  );
};

export default Router;
