import { createConfig, http, CreateConnectorFn } from "wagmi";
import { mainnet, sepolia, bsc, bscTestnet } from "wagmi/chains";
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

export const chains = [bsc, bscTestnet];

const projectId = process.env.WALLETCONNECT_PROJECT_API_KEY || '3fbb6bba6f1de962d911bb5b5c9dba88';

const connectors: CreateConnectorFn[] = []
connectors.push(walletConnect({
    projectId,
    relayUrl: 'wss://relay.walletconnect.org',
    metadata: {
        name: "Terafarm-DeFi",
        description: "Terafarm-Frontend",
        url: "https://terafarm.com", // origin must match your domain & subdomain
        icons: ["https://raw.githubusercontent.com/WalletConnect/web3modal-examples/refs/heads/main/walletconnect-modal-auth-react/public/favicon.ico"]
    }
}))
connectors.push(coinbaseWallet({
    appName: "Terafarm-DeFi",
    appLogoUrl: "https://raw.githubusercontent.com/WalletConnect/web3modal-examples/refs/heads/main/walletconnect-modal-auth-react/public/favicon.ico", // optional
    headlessMode: false,
}))
connectors.push(metaMask({
    dappMetadata: {
        name: "Terafarm-DeFi",
        url: "https://terafarm.com"
    },
    infuraAPIKey: process.env.NEXT_PUBLIC_MAINNET_INFURA_API_KEY,
}))

export const config = createConfig({
    chains: [bsc, bscTestnet],
    connectors: connectors,
    transports: {
        // [mainnet.id]: http(`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_MAINNET_INFURA_API_KEY}`), // or your own RPC url
        [bsc.id]: http('https://bsc-dataseed.binance.org/'),
        [bscTestnet.id]: http(`https://data-seed-prebsc-2-s1.binance.org:8545/`),
    },
});

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}