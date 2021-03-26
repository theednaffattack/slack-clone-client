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
import jwtDecode, { JwtPayload } from "jwt-decode";
import Router from "next/router";
import { useMemo } from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { IAuthState } from "../components/auth-provider";
import { isServer } from "../lib/utilities.is-server";
// import { parseCookies } from "../lib/utilities.parse-cookies";
import { getAccessToken, setAccessToken } from "./access-token";

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const isProduction = process.env.NODE_ENV === "production";

function createApolloClient(
  serverAccessToken?: string,
  setAuthToken?: (obj: IAuthState) => void
) {
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
    // Below we re-route for un-Authenticated users.
    // For now timeouts are handled slightly differently than
    // other Authentication issues.

    // We don't want the home page to re-route so don't include
    // "createOrUpdateLikes" mutations to be filtered out and
    // redirected.
    const filteredAuthenticationErrors =
      graphQLErrors &&
      graphQLErrors.filter(
        (error) =>
          error.message === "Not authenticated" &&
          !error.path?.includes("createOrUpdateLikes")
      );

    if (
      filteredAuthenticationErrors &&
      filteredAuthenticationErrors.length > 0
    ) {
      !isServer() && Router.push("/login?flash=You must be authenticated");
      return;
    }

    const filteredAuthenticationTimeoutErrors =
      graphQLErrors &&
      graphQLErrors.filter((error) => {
        return (
          error.message === "Your session has expired, please log in." &&
          !error.path?.includes("createOrUpdateLikes")
        );
      });

    if (
      filteredAuthenticationTimeoutErrors &&
      filteredAuthenticationTimeoutErrors.length > 0
    ) {
      console.log(Router.query);

      !isServer() &&
        Router.push(`/login?flash=Your session has expired, please log in.`);
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
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const headersLink = setContext((_, prevContext) => {
    // const accessToken = isServer() ? serverAccessToken : getAccessToken();
    const accessToken = getAccessToken() ? getAccessToken() : serverAccessToken;

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
      if (setAuthToken) {
        setAuthToken({ token: accessToken.token, userId: "" });
      }
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
    // headers: {
    //   cookie:
    // },
    link: errorLink.concat(
      headersLink.concat(
        tokenRefreshLink.concat(new RetryLink().concat(splitLink))
      )
    ),
    ssrMode: typeof window === "undefined"
  });
}

export function initializeApollo(
  initialState = null,
  serverAccessToken?: string,
  setAuthToken?: (obj: IAuthState) => void
) {
  const _apolloClient =
    apolloClient ?? createApolloClient(serverAccessToken, setAuthToken);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state, pageProps.accessToken), [
    state
  ]);

  return store;
}
