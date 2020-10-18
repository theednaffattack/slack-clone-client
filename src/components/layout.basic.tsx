import { useRouter } from "next/router";
import React, { ReactChild, ReactChildren, useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../lib/utilities.is-server";
import { Wrapper } from "./box-wrapper";
import { Navbar } from "./navbar-authenticated";

type LayoutProps = {
  children: ReactChild | ReactChildren;
};

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery({
    // Do not run this query on the server.
    pause: isServer()
  });

  useEffect(() => {
    if (!fetchingMe && !dataMe?.me) {
      router.replace("/login");
    }
  }, [dataMe, fetchingMe, router]);

  // Below is only useful for client routing.
  // Something will need to be prepared to
  // render something else on the server to prevent
  // the first-load flash of content.
  return (
    <>
      <Navbar dataMe={dataMe} fetchingMe={fetchingMe} />
      <Wrapper>
        {!fetchingMe && !dataMe?.me ? "unexpected state" : children}
      </Wrapper>
    </>
  );
}
