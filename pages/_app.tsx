import type { AppProps } from "next/app";
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import '../styles/globals.css'
require('@solana/wallet-adapter-react-ui/styles.css');

import dynamic from 'next/dynamic';

const WalletModalProvider = import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider);
const WalletDisconnectButton = import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletDisconnectButton);
const WalletMultiButton = import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton);

function MyApp({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
}
export default MyApp;
