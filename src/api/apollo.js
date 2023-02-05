import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://slumpsounds.online/graphql",
  cache: new InMemoryCache(),
});

export default client;
