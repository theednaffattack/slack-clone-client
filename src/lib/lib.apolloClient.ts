import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  getMainDefinition,
  relayStylePagination
} from "@apollo/client/utilities";
import { setContext } from "@apollo/link-context";
import { TokenRefreshLink } from "apollo-link-token-refresh";

import fetch from "isomorphic-unfetch";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Router } from "next/router";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getAccessToken, setAccessToken } from "./access-token";
import { MyContext } from "./types";
import { isServer } from "./utilities.is-server";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

export default function createApolloClient(
  _initialState: any,
  _ctx: MyContext
): ApolloClient<NormalizedCacheObject> {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  // let apolloClient: ApolloClient<NormalizedCacheObject>;

  const isProduction = process.env.NODE_ENV === "production";

  const httpLink = new HttpLink({
    uri: isProduction
      ? process.env.NEXT_PUBLIC_PRODUCTION_GQL_URI
      : process.env.NEXT_PUBLIC_DEVELOPMENT_GQL_URI,
    credentials: "include"
  });

  // Create a WebSocket link (browser only):
  const wsLink = !isServer()
    ? new WebSocketLink(
        new SubscriptionClient(
          isProduction
            ? process.env.NEXT_PUBLIC_PRODUCTION_WEBSOCKET_URL!
            : process.env.NEXT_PUBLIC_DEVELOPMENT_WEBSOCKET_URL!,
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

  // const authLink = setContext((_, { headers }) => {
  //   // const token = parseCookies(req)[process.env.NEXT_PUBLIC_COOKIE_PREFIX!];
  //   const accessToken = getAccessToken();

  //   return {
  //     headers: {
  //       ...headers,

  //       authorization: accessToken ? `Bearer ${accessToken}` : ""
  //       // cookie: token ? `${process.env.NEXT_PUBLIC_COOKIE_PREFIX!}=${token}` : ""
  //     }
  //   };
  // });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // We don't want the home page to re-route so don't include
    // "createOrUpdateLikes" mutations to be filtered out and
    // redirected.
    const filteredAuthErrors =
      graphQLErrors &&
      graphQLErrors.filter(
        (error) =>
          error.message === "Not authenticated" &&
          !error.path?.includes("createOrUpdateLikes")
      );

    if (filteredAuthErrors && filteredAuthErrors.length > 0) {
      !isServer() && Router.push("/login?flash=You must be authenticated");
      return;
    }

    const filteredRoutes =
      graphQLErrors &&
      graphQLErrors?.filter((errorThing) => {
        const { path } = errorThing;
        const something = path && typeof path[0] === "string" ? path[0] : "";

        return something === "register";
      });

    if (
      (graphQLErrors && filteredRoutes && filteredRoutes.length < 1) ||
      (graphQLErrors && !filteredRoutes)
    ) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const headersLink = setContext((_, prevContext) => {
    const accessToken = getAccessToken();

    return {
      headers: {
        ...prevContext.headers,
        authorization: accessToken ? `Bearer ${accessToken}` : ""
      }
    };
  });

  const tokenRefreshLink = new TokenRefreshLink<{
    token: string;
    refreshToken: string;
  }>({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode<JwtPayload>(token);
        if (exp && Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      const requestRefreshTokenAddress =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_DEVELOPMENT_REFRESH_TOKEN_ADDRESS!
          : process.env.NEXT_PUBLIC_PRODUCTION_REFRESH_TOKEN_ADDRESS!;
      return fetch(requestRefreshTokenAddress, {
        method: "POST",
        credentials: "include"
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken.token);
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    }
  }) as any;

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getGlobalPostsRelay: relayStylePagination()
          }
        }
      }
    }),
    link: errorLink.concat(
      headersLink.concat(
        tokenRefreshLink.concat(new RetryLink().concat(splitLink))
      )
    ),
    ssrMode: isServer()
  });
}
