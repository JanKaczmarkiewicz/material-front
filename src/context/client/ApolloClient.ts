import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  uri: "http://localhost:3001",
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});
