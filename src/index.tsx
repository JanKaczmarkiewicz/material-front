import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./context/client/ApolloClient";
import AuthProvider from "./context/Auth/AuthProvider";
import SeasonProvider from "./context/Season/SeasonProvider";

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <SeasonProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </SeasonProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
