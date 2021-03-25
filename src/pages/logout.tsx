import { LogoutDocument } from "../generated/graphql";
import { setAccessToken } from "../lib/access-token";
import { initializeApollo } from "../lib/config.apollo-client";
import { MyContext } from "../lib/types";
import redirect from "../lib/utilities.redirect";

const Logout = () => {
  return null;
};

Logout.getInitialProps = async (ctx: MyContext) => {
  if (!ctx.apolloClient) ctx.apolloClient = initializeApollo();

  try {
    // await ctx.apolloClient.resetStore();
    await ctx.apolloClient.cache.reset();
  } catch (error) {
    console.warn("APOLLO RESET STORE", error);
  }

  try {
    await ctx.apolloClient.mutate({ mutation: LogoutDocument });
  } catch (error) {
    console.error("APOLLO LOGOUT ERROR", error);
  }
  // Setting access token to an empty string
  // to reset global state. Can't do this with
  // both context and apollo currently.
  setAccessToken("");
  redirect(ctx, "/login");

  return {
    props: {
      initialApolloState: {} //apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default Logout;

// from: https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
// export async function getStaticProps() {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: ALL_POSTS_QUERY,
//     variables: allPostsQueryVars,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   }
// }
