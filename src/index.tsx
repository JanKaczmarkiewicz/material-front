import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { client } from "shered/dist/context/Client/ApolloClient";
import AuthProvider, {SReact} from "shered/dist/context/Auth/AuthProvider";
import App from "./components/App";

console.log(React, SReact)


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
