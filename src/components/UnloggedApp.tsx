import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SignIn from "./routes/login/Login";

const UnloggedApp: React.FC = () => (
  <div>
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6">Logowanie</Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />
    <SignIn />
  </div>
);

export default UnloggedApp;
