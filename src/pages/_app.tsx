import "@/styles/globals.css";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { AppProps } from "next/app";
import { configureChains, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "./../styles/globals.css";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";

const projectId = "256e3eeb8618b654b7ca950433144fff";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const wallets = [
  {
    groupName: "Fiserv Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName: projectId, chains }),
    ],
  },
  {
    groupName: "Other Popular Wallets",
    wallets: [walletConnectWallet({ projectId, chains })],
  },
  // {
  //   groupName: "Other Popular Wallets",
  //   wallets: [ledgerWallet({ projectId, chains })],
  // },
];

const appInfo = {
  appName: "Connect via Web3 Wallet",
  learnMoreUrl: "https://learn.metamask.io/lessons/what-is-web3",
};

const connectors = connectorsForWallets([...wallets]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitProvider
          chains={chains}
          appInfo={appInfo}
          theme={lightTheme({
            accentColor: "#fc6e01",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
