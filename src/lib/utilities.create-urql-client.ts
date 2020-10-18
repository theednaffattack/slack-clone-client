import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import Router from "next/router";

import {
  ChangePasswordMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from "../generated/graphql";
import { development_qql_uri } from "./config";
import { betterUpdateQuery } from "./utilities.better-update-query";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      // If the OperationResult has an error check for specific errors
      // listed below.
      // ["Not authenticated"]
      if (error) {
        // the error is a CombinedError with networkError and graphqlErrors properties
        if (error.message.includes("Not authenticated")) {
          Router.replace("/");
        }
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
  fetchOptions: { credentials: "include" as const },
  url: development_qql_uri,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          changePassword: (_result, _args, cache, _info) => {
            betterUpdateQuery<ChangePasswordMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.changePassword?.errors) {
                  return query;
                } else {
                  return {
                    me: result.changePassword?.user,
                    __typename: "Query"
                  };
                }
              }
            );
          },
          login: (_result, _args, cache, _info) => {
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
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null, __typename: "Query" })
            );
          },
          register: (_result, _args, cache, _info) => {
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
    errorExchange,
    ssrExchange,
    fetchExchange
  ]
});
