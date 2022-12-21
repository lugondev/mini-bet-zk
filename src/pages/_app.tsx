import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";

import { chains, client } from "../wagmi";

import AppHeader from "../components/AppHeader";
import "../styles/cat.scss";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    React.useEffect(() => {
        // @ts-ignore
        const go = new window["Go"]();
        window.WebAssembly.instantiateStreaming(fetch("/static/json.wasm",{
            headers: {
                "Content-Type": "application/wasm"
            }
        }), go.importObject).then((result) => {
            go.run(result.instance);
        });

    })
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
