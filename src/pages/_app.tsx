import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { useApollo } from "../lib/config.apollo-client";
import theme from "../lib/theme";

function MyApp({ Component, pageProps, router }: AppProps) {
  const apolloClient = useApollo(pageProps); // pageProps.initialApolloState

  const syncLogout = (event: StorageEvent) => {
    if (event.key === "logout") {
      console.log("logged out from storage!");
      Router.push("/login");
    }
  };

  useEffect(() => {
    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
      window.localStorage.removeItem("logout");
    };
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ApolloProvider client={apolloClient}>
        <CSSReset />
        <Component {...pageProps} router={router} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
