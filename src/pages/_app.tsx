import "@rainbow-me/rainbowkit/styles.css";
import Script from 'next/script'
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import { chains, client } from "../wagmi";
import favicon from "../public/static/favicon.ico";
import "../styles/global.css";
import { useEffect } from "react"

function App({ Component, pageProps }: AppProps) {
    const [ mounted, setMounted ] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    useEffect(() => {
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
                    <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <script src={"/static/wasm_exec.js"} type="text/javascript"/>
                    <title>My wagmi + RainbowKit App</title>
                </NextHead>
                {mounted && <Component {...pageProps} />}
                <Toaster/>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
