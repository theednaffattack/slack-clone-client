// import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation } from "../generated/graphql";

function Logout() {
  const [, logout] = useLogoutMutation();
  // const router = useRouter();
  logout();
  // router.push("/login");
  return <>Logout page</>;
}

export default Logout;
