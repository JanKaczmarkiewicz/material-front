import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { client, AuthProvider } from "@koleda/common-context";
import App from "./components/App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
