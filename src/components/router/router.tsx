import React from "react";
import Dashboard from "../routes/Dashboard";
import Data from "../routes/Data";
import Users from "../routes/Users";
import Login from "../routes/Login";
import { Switch, Route } from "react-router-dom";
import UnloggedRoute from "./UnloggedRoute";
import PrivateRoute from "./PrivateRoute";

import Streets from "../routes/data/streets/Streets";
// import Priests from "../routes/data/Priests";
// import Acolytes from "../routes/data/Acolytes";
// import Houses from "../routes/data/Houses";
import History from "../routes/data/history/History";

import PastoralVisitList from "../routes/data/history/List";
import PastoralVisit from "../routes/data/history/PastoralVisit";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        Main
      </Route>

      <UnloggedRoute path="/login/" exact>
        <Login />
      </UnloggedRoute>

      <PrivateRoute path="/dashboard/" exact>
        <Dashboard />
      </PrivateRoute>

      <PrivateRoute path="/users/" exact>
        <Users />
      </PrivateRoute>

      <PrivateRoute path="/data/" exact>
        <Data />
      </PrivateRoute>

      <PrivateRoute path={`/data/street/`} exact>
        <Streets />
      </PrivateRoute>

      <PrivateRoute path={`/data/history/`} exact>
        <History />
      </PrivateRoute>

      <PrivateRoute
        path={`/data/history/:id`}
        exact
        component={PastoralVisit}
      />

      <Route
        path={`/data/history/:id/visit`}
        exact
        render={(props) => <PastoralVisitList {...props} variant="visit" />}
      />

      <PrivateRoute
        path={`/data/history/:id/reece`}
        exact
        render={(props) => <PastoralVisitList {...props} variant="reece" />}
      />

      {/* <PrivateRoute path={`/data/priest/`} exact>
        <Priests />
      </PrivateRoute>

      <PrivateRoute path={`/data/acolyte/`} exact>
        <Acolytes />
      </PrivateRoute>
  */}
    </Switch>
  );
};

export default Router;
