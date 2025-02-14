// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { ChainId, Token } from "@uniswap/sdk-core";

// Addresses
export const POOL_FACTORY_CONTRACT_ADDRESS =
  "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7"; // bsc mainnet
export const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
  "0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613"; // bsc mainnet

export const MAX_FEE_PER_GAS = "100000000000";
export const MAX_PRIORITY_FEE_PER_GAS = "100000000000";
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 1000000000000;

export const NONFUNGIBLE_POSITION_MANAGER_ABI = [
  // Read-Only Functions
  "function balanceOf(address _owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string memory)",

  "function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)",
];

// Currencies and Tokens
export const ETH_TOKEN = new Token( // BNB ether token
  ChainId.BNB,
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  18,
  "ETH",
  "Binance-Peg Ethereum Token",
);

export const USDT_TOKEN = new Token( // BNB usdt token
  ChainId.BNB,
  "0x55d398326f99059fF775485246999027B3197955",
  18,
  "USDT",
  "Tether USD",
);
export const USDC_TOKEN = new Token( // BNB usdc token
  ChainId.BNB,
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  18,
  "USDC",
  "Binance-Peg USD Coin",
);

export const WBNB_TOKEN = new Token( // BNB native token
  ChainId.BNB,
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  18,
  "BNB",
  "Wrapped BNB (WBNB)",
);

export const BTCB_TOKEN = new Token(
  ChainId.BNB,
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  18,
  "BTCB",
  "Binance-Peg BTCB Token (BTCB)",
);

export const TERAC_TOKEN = new Token(
  ChainId.BNB,
  `0x${process.env.NEXT_PUBLIC_TERAC_CONTRACT_ADDRESS}`,
  18,
  "TERAC",
  "Tera Coin",
);

export const GYNX_TOKEN = new Token(
  ChainId.BNB,
  `0x${process.env.NEXT_PUBLIC_GYNX_CONTRACT_ADDRESS}`,
  18,
  "GYNX",
  "Gynx",
);
