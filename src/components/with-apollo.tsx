import { ApolloProvider } from "@apollo/client";
import { getAccessToken } from "../lib/access-token";
import { setAccessToken } from "../lib/access-token-too";
import { initializeApollo } from "../lib/config.apollo-client";
import { isServer } from "../lib/utilities.is-server";
import { useAuth } from "./auth-provider";

const withApollo = (PageComponent: any) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: any) => {
    const { authState, setAuthToken } = useAuth();
    console.log("VIEW WITH APOLLO PROPS", {
      authState,
      pageProps,
      setAuthToken
    });
    const client =
      apolloClient ||
      initializeApollo(
        apolloState,
        pageProps.accessToken,
        // authState.userId,
        setAuthToken
      );

    if (!isServer() && !getAccessToken() && setAuthToken) {
      console.log("WITH APOLLO SETTING ACCESS TOKEN", {
        accToken: pageProps.accessToken
      });
      // setAuthToken({ token: pageProps.accessToken, userId: undefined });
      setAccessToken(pageProps.accessToken);
    }

    if (process.env.NODE_ENV !== "production") {
      PageComponent.displayName || PageComponent.name || "Component";
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent
          authState={authState}
          setAuthToken={setAuthToken}
          {...pageProps}
        />
      </ApolloProvider>
    );
  };

  return WithApollo;
};

export default withApollo;
