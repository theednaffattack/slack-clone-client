import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

import { development_qql_uri } from "./config";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
  RegisterMutation
} from "../generated/graphql";
import { betterUpdateQuery } from "./utilities.better-update-query";

export const createUrqlClient = (ssrExchange: any) => ({
  fetchOptions: { credentials: "include" as const },
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
                    __typename: "Query"
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
    ssrExchange,
    fetchExchange
  ]
});
