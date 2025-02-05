import { ChainId } from '@uniswap/sdk-core'
export function chainIdToNetworkName(networkId: ChainId) {
    switch (networkId) {
        case ChainId.MAINNET:
            return 'ethereum'
        case ChainId.ARBITRUM_ONE:
            return 'arbitrum'
        case ChainId.OPTIMISM:
            return 'optimism'
        case ChainId.POLYGON:
            return 'polygon'
        case ChainId.BNB:
            return 'smartchain'
        case ChainId.BASE:
            return 'base'
        case ChainId.BNB:
            return 'Binance'
        default:
            return 'ethereum'
    }
}

export const getTokenLogoURL = ({ address, chainId }: { address: string; chainId: any }) => {
    if (address == "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2") return '/images/ethereum-logo.png'
    return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/${chainIdToNetworkName(chainId)}/assets/${address}/logo.png`
}