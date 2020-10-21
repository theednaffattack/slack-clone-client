import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

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
  credentials: "include",
  uri: process.env.NEXT_PUBLIC_DEVELOPMENT_GQL_URI
});

import theme from "../lib/theme";

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
