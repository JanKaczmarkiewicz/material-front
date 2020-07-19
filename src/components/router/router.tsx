import React from "react";
import Data from "../routes";
import { Switch, Route } from "react-router-dom";

import Streets from "../routes/data/streets/Streets";
// import Priests from "../routes/data/Priests";
// import Acolytes from "../routes/data/Acolytes";

import PastoralVisitList from "../routes/data/history/List";
import PastoralVisit from "../routes/data/history/PastoralVisit";
import Street from "../routes/data/streets/Street";
import Calendar from "../routes/calendar";
import DayManager from "../routes/calendar/day/Day";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Data />
      </Route>

      <Route path="/calendar" exact>
        <Calendar />
      </Route>

      <Route path="/calendar/:dayId" exact component={DayManager} />

      <Route path={`/data/street/`} exact>
        <Streets />
      </Route>

      <Route path={`/data/streets/:id`} exact component={Street} />

      <Route path={`/data/history/:id`} exact component={PastoralVisit} />

      <Route
        path={`/data/history/:id/visit`}
        exact
        render={(props) => <PastoralVisitList {...props} variant="visit" />}
      />

      <Route
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

      {/* <Route path={`/data/priest/`} exact>
        <Priests />
      </Route>

      <Route path={`/data/acolyte/`} exact>
        <Acolytes />
      </Route>
  */}
    </Switch>
  );
};

export default Router;
