import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URI,
  cache: new InMemoryCache(),
  // credentials: "include",
  headers: {
    authorization: import.meta.env.VITE_AUTH_TOKEN,
  },
});
