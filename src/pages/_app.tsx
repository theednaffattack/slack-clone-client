import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";

import theme from "../theme";
import { development_qql_uri } from "../config";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  updateFn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => updateFn(result, data as any) as any);
}

const client = createClient({
  fetchOptions: { credentials: "include" },
  url: development_qql_uri,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                console.log("VIEW RESULT AND QUERY", { result, query });

                if (result.login?.errors) {
                  return query;
                } else {
                  return {
                    me: result.login?.user,
                    __typename: "Query"
                  };
                }
              }
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null, __typename: "Query" })
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                    __typename: query.__typename
                  };
                }
              }
            );
          }
        }
        // Subscription: {
        //   newTodo: (result, args, cache, info) => {
        //     // ...
        //   }
        // }
      }
    }),
    fetchExchange
  ]
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
