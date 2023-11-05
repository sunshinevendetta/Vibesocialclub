import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  embeddedWallet,
  paperWallet,
  smartWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/navbar";
import Header from "../components/header";
import * as ThirdwebReact from "@thirdweb-dev/react"; // <-- Add this line

console.log(ThirdwebReact);

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base-goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(
          metamaskWallet(),
          smartWalletOptions,
        ),
        smartWallet(
          coinbaseWallet({ recommended: true }),
          smartWalletOptions,
        ),
        smartWallet(
          walletConnect(),
          smartWalletOptions,
        ),
        smartWallet(embeddedWallet(), {
          factoryAddress: "0x1abb6a0d10cba9b64b2b64e64f8af75a27eecb5c",
          gasless: true,
          personalWallet: [
            paperWallet({
              paperClientId: process.env.PAPER_CLIENT_ID,
            })
          ]
        }),
      ]}
    >
      <Header />
      <Component {...pageProps} />
      <Navbar />
    </ThirdwebProvider>
  );
}



export default MyApp;




const smartWalletOptions = {
  factoryAddress: "0x1abb6a0d10cba9b64b2b64e64f8af75a27eecb5c",
  gasless: true,
};