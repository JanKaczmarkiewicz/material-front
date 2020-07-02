import React from "react";
import Data from "../routes/Data";
import Login from "../routes/Login";
import { Switch, Route } from "react-router-dom";
import UnloggedRoute from "./UnloggedRoute";
import PrivateRoute from "./PrivateRoute";

import Streets from "../routes/data/streets/Streets";
// import Priests from "../routes/data/Priests";
// import Acolytes from "../routes/data/Acolytes";
import History from "../routes/data/history/History";

import PastoralVisitList from "../routes/data/history/List";
import PastoralVisit from "../routes/data/history/PastoralVisit";
import Street from "../routes/data/streets/Street";
import Calendar from "../Calendar";
import NotFound from "../NotFound";
import DayManager from "../Calendar/DayManager";

const Router: React.FC = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact>
        <Data />
      </PrivateRoute>

      <PrivateRoute path="/calendar" exact>
        <Calendar />
      </PrivateRoute>

      <PrivateRoute path="/calendar/:date" exact component={DayManager} />

      <UnloggedRoute path="/login/" exact>
        <Login />
      </UnloggedRoute>

      <PrivateRoute path={`/data/street/`} exact>
        <Streets />
      </PrivateRoute>

      <PrivateRoute path={`/data/history/`} exact>
        <History />
      </PrivateRoute>

      <Route path={`/data/streets/:id`} exact component={Street} />

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

      <Route
        path={`/data/history/:id/visit`}
        exact
        render={(props) => <PastoralVisitList {...props} variant="visit" />}
      />

      {/* <Route path="*">
        <NotFound />
      </Route> */}

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
