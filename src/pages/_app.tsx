import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  getMainDefinition,
  relayStylePagination
} from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { HttpLink, split } from "@apollo/client";

import theme from "../lib/theme";
import { parseCookies } from "../lib/utilities.parse-cookies";
import { isServer } from "../lib/utilities.is-server";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DEVELOPMENT_GQL_URI,
  credentials: "include"
});

// Create a WebSocket link (browser only):
const wsLink = !isServer()
  ? new WebSocketLink(
      new SubscriptionClient(
        process.env.NEXT_PUBLIC_DEVELOPMENT_WEBSOCKET_URL!,
        {
          lazy: true,
          reconnect: true
        }
      )
    )
  : null;

const splitLink = !isServer()
  ? split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

const authLink = setContext((_, { headers, req }) => {
  const token = parseCookies(req)[process.env.NEXT_PUBLIC_COOKIE_PREFIX!];

  return {
    headers: {
      ...headers,
      cookie: token ? `${process.env.NEXT_PUBLIC_COOKIE_PREFIX!}=${token}` : ""
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getGlobalPostsRelay: relayStylePagination()
        }
      }
    }
  }),
  link: errorLink.concat(authLink.concat(new RetryLink().concat(splitLink)))
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={client}>
        <CSSReset />
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
