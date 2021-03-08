import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Router from "next/router";
import React, { useEffect } from "react";
import AuthProvider from "../components/auth-provider";
import theme from "../lib/theme";

function MyApp({ Component, pageProps, router }: AppProps) {
  const syncLogout = (event: StorageEvent) => {
    if (event.key === "logout") {
      Router.push("/login");
    }
  };

  // multi-window/tab logout
  useEffect(() => {
    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
      window.localStorage.removeItem("logout");
    };
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Component syncLogout={syncLogout} {...pageProps} router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}
// }

export default MyApp;
