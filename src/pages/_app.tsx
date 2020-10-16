import { ChakraProvider } from "@chakra-ui/core";
import { Provider, createClient } from "urql";
import { AppProps } from "next/app";

import theme from "../theme";
import { development_qql_uri } from "../config";

const client = createClient({
  fetchOptions: { credentials: "include" },
  url: process.env.NEXT_PUBLIC_DEVELOPMENT_GQL_URI ?? "http://123" // development_qql_uri
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
