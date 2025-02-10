import { FeeAmount, Pool, Position } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { BigNumber } from "ethers";
import { getPoolInfo } from "./pool";
import JSBI from "jsbi";
const COINGECKOURL = (addr: string) =>
  `https://pro-api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${addr}&vs_currencies=usd&x_cg_pro_api_key=CG-w9KjR3DD7xNKsP4cA833YyvC`;

// Cache for token prices
const priceCache: { [key: string]: { price: number; timestamp: number } } = {};
const CACHE_DURATION = 3 * 60 * 1000; // 5 minutes

async function fetchTokenPrices1(t0Address: string, t1Address: string) {
  const now = Date.now();

  // Check if prices are cached and recent
  if (
    priceCache[t0Address]?.timestamp > now - CACHE_DURATION &&
    priceCache[t1Address]?.timestamp > now - CACHE_DURATION
  ) {
    return {
      priceToken0InUSD: priceCache[t0Address].price,
      priceToken1InUSD: priceCache[t1Address].price,
    };
  }

  try {
    const [response0, response1] = await Promise.all([
      fetch(COINGECKOURL(t0Address), {
        method: "GET",
        headers: { accept: "application/json" },
      }),
      fetch(COINGECKOURL(t1Address), {
        method: "GET",
        headers: { accept: "application/json" },
      }),
    ]);

    const token0PriceData = await response0.json();
    const token1PriceData = await response1.json();

    const priceToken0InUSD = token0PriceData[t0Address.toLowerCase()].usd;
    const priceToken1InUSD = token1PriceData[t1Address.toLowerCase()].usd;

    // Update cache
    priceCache[t0Address] = { price: priceToken0InUSD, timestamp: now };
    priceCache[t1Address] = { price: priceToken1InUSD, timestamp: now };

    return { priceToken0InUSD, priceToken1InUSD };
  } catch (error) {
    console.error("Error fetching token prices:", error);
    // Handle the error appropriately (e.g., re-throw, return default values)
    // throw error;
    return { priceToken0InUSD: 0, priceToken1InUSD: 0 };
  }
}

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
