import React from "react";
import Dashboard from "../routes/Dashboard";
import Data from "../routes/Data";
import Users from "../routes/Users";
import Login from "../routes/Login";
import { Switch, Route } from "react-router-dom";
import UnloggedRoute from "./UnloggedRoute";
import PrivateRoute from "./PrivateRoute";

// import Streets from "../routes/data/Streets";
// import Priests from "../routes/data/Priests";
import Acolytes from "../routes/data/Acolytes";
import Houses from "../routes/data/Houses";

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

      <PrivateRoute path="/data" exact>
        <Data />
      </PrivateRoute>
      {/* 
      <PrivateRoute path={`/data/street`} exact>
        <Streets />
      </PrivateRoute>

      <PrivateRoute path={`/data/priest`} exact>
        <Priests />
      </PrivateRoute> */}

      <PrivateRoute path={`/data/acolyte`} exact>
        <Acolytes />
      </PrivateRoute>

      <PrivateRoute path={`/data/house`} exact>
        <Houses />
      </PrivateRoute>
    </Switch>
  );
};

export default Router;
