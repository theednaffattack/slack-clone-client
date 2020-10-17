import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";

import theme from "../lib/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
