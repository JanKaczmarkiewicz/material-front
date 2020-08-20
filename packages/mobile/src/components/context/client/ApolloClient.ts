import { ApolloClient, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/react-hooks";
import { AsyncStorage } from "react-native";
import { storage } from "../../../utils/storage";

const httpLink = createHttpLink({
  uri: "http://localhost:3001",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await storage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
