import { FeeAmount, Pool, Position } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { getPoolInfo } from "./pool";
import JSBI from "jsbi";
const COINGECKOURL = (addr: string) =>
  `https://pro-api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${addr}&vs_currencies=usd&x_cg_pro_api_key=CG-w9KjR3DD7xNKsP4cA833YyvC`;

// Fetch token prices in USD from CoinGecko (or another source)
async function fetchTokenPrices(t0Address: string, t1Address: string) {
  const response = await fetch(COINGECKOURL(t0Address), {
    method: "GET",
    headers: { accept: "application/json" },
  });
  const Token0Price = await response.json();
  const responses = await fetch(COINGECKOURL(t1Address), {
    method: "GET",
    headers: { accept: "application/json" },
  });
  const Token1Price = await responses.json();
  // You can replace this with any other API call if needed
  return {
    priceToken0InUSD: Token0Price[t0Address.toLowerCase()].usd,
    priceToken1InUSD: Token1Price[t1Address.toLowerCase()].usd,
  };
}

// Main function to calculate the value of liquidity in USD
export async function calculateLiquidityValueInUSD(
  token0: Token,
  token1: Token,
  tickLower: number,
  tickUpper: number,
  fee: FeeAmount,
  liquidity: BigInt,
) {
  var { priceToken0InUSD, priceToken1InUSD } = await fetchTokenPrices(
    token0.address,
    token1.address,
  );

  // Define the tokens involved
  const PoolInfo = await getPoolInfo({
    tokenA: token0,
    tokenB: token1,
    poolFee: fee,
  });

  // Create a dummy pool object to use with Position
  const pool = new Pool(
    token0,
    token1,
    PoolInfo.fee,
    PoolInfo.slot0.sqrtPriceX96,
    JSBI.BigInt(liquidity.toString()),
    PoolInfo.slot0.tick,
  );

  // Create Position instance
  const position = new Position({
    pool: pool,
    liquidity: JSBI.BigInt(liquidity.toString()),
    tickLower: tickLower,
    tickUpper: tickUpper,
  });

  // Calculate the amounts
  const amount0 = parseFloat(position.amount0.toSignificant(token0.decimals));
  const amount1 = parseFloat(position.amount1.toSignificant(token1.decimals));

  // Calculate USD values
  const valueToken0InUSD = amount0 * priceToken0InUSD;
  const valueToken1InUSD = amount1 * priceToken1InUSD;

  // Total liquidity value in USD
  const totalLiquidityValueInUSD = valueToken0InUSD + valueToken1InUSD;

  return totalLiquidityValueInUSD;
}
