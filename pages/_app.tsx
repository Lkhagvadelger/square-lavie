import { AuthProvider } from "@lib/auth/ui";
import { queryClient } from "@util/query";
import type { NextPage } from "next";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import "../styles/data-tables-css.css";
import "../styles/satoshi.css";

import { trpc } from "@util/trpc";

// const progress = new ProgressBar();

type Page<P = Record<string, unknown>> = NextPage<P>;

type Props = AppProps & {
  Component: Page;
};

// Router.events.on("routeChangeStart", progress.start);
// Router.events.on("routeChangeError", progress.finish);
// Router.events.on("routeChangeComplete", () => {
//   progress.finish();
// });

export const reportWebVitals = ({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) => {};

const MyApp = ({ Component, pageProps }: Props) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
