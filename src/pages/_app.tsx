import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import {
  DisclaimerComponent,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { coinbaseWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "./../styles/globals.css";

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId = "256e3eeb8618b654b7ca950433144fff";

const wallets = [
  {
    groupName: "Fiserv Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ appName: projectId, chains }),
    ],
  },
];

const disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const appInfo = {
  appName: "Connect via Web3 Wallet",
  learnMoreUrl: "https://learn.metamask.io/lessons/what-is-web3",
};

const connectors = connectorsForWallets([
  ...wallets,
  // {
  //   groupName: "Other Popular Wallets",
  //   wallets: [ledgerWallet({ projectId, chains })],
  // },
]);

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
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "large",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
