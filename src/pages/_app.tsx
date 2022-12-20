import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import { chains, client } from "../wagmi";

import "../styles/global.css";
import "../styles/cat.scss";
import AppHeader from "../components/AppHeader";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <NextHead>
          <title>My wagmi + RainbowKit App</title>
        </NextHead>
        {mounted && (
          <>
            <AppHeader />
            <Component {...pageProps} />
          </>
        )}
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
