import { Token, ChainId } from "@uniswap/sdk-core";
import {
  ETH_TOKEN,
  USDT_TOKEN,
  USDC_TOKEN,
  WBNB_TOKEN,
  TERAC_TOKEN,
  GYNX_TOKEN,
} from "@/libs/constants";
import { FeeAmount } from "@uniswap/v3-sdk";

export const rpcUrl = {
  local: "http://localhost:8545",
  mainnet: `https://bsc-dataseed.binance.org/`,
  sepolia: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_MAINNET_INFURA_API_KEY}`,
  bsc: `https://bsc-dataseed.binance.org/`,
};

// Sets if the example should run locally or on chain
export enum Environment {
  LOCAL,
  MAINNET,
  BNB,
}

// Inputs that configure this example to run
export interface EnvConfig {
  env: Environment;
  rpc: {
    local: string;
    mainnet: string;
    sepolia: string;
    bsc: string;
  };
  pool: {
    token0: Token;
    token1: Token;
    fee: FeeAmount;
  };
}

// Configuration
export const CurrentConfig: EnvConfig = {
  env: Environment.BNB,
  rpc: rpcUrl,
  pool: {
    token0: USDC_TOKEN,
    token1: ETH_TOKEN,
    fee: FeeAmount.MEDIUM,
  },
};

interface Pool {
  token0: Token;
  token1: Token;
  fee: FeeAmount;
}

export const Pools = [
  {
    tokenA: ETH_TOKEN,
    tokenB: USDT_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
  {
    tokenA: USDT_TOKEN,
    tokenB: USDC_TOKEN,
    poolFee: FeeAmount.LOW,
  },
  {
    tokenA: ETH_TOKEN,
    tokenB: WBNB_TOKEN, // bnb native token
    poolFee: FeeAmount.MEDIUM,
  },
];

export const TokenDatabyAddress = {
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    name: "Binance Ethereum Token",
    symbol: "ETH",
    decimals: 18,
    chainId: ChainId.BNB,
  },
  "0x55d398326f99059fF775485246999027B3197955": {
    name: "BSC-USD",
    symbol: "USDT",
    decimals: 18,
    address: "0x55d398326f99059fF775485246999027B3197955",
    chainId: ChainId.BNB,
  },
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
    name: "Binance-Peg USD Coin",
    symbol: "USDC",
    decimals: 18,
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    chainId: ChainId.BNB,
  },
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
    name: "Wrapped BNB",
    symbol: "BNB",
    decimals: 18,
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainId: ChainId.BNB,
  },
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
    name: "Binance-Peg BTCB Token (BTCB)",
    symbol: "BTCB",
    decimals: 18,
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    chainId: ChainId.BNB,
  },
  [TERAC_TOKEN.address]: {
    name: TERAC_TOKEN.name,
    symbol: TERAC_TOKEN.symbol,
    decimals: TERAC_TOKEN.decimals,
    address: TERAC_TOKEN.address,
    chainId: ChainId.BNB,
  },
  [GYNX_TOKEN.address]: {
    name: GYNX_TOKEN.name,
    symbol: GYNX_TOKEN.symbol,
    decimals: GYNX_TOKEN.decimals,
    address: GYNX_TOKEN.address,
    chainId: ChainId.BNB,
  },
};
