import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./context/client/ApolloClient";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
