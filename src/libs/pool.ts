import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

import { ethers } from "ethers";
import { FeeAmount } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { computePoolAddress } from "@uniswap/v3-sdk";

import { CurrentConfig, Pools } from "@/config/UniswapConfig";
import { POOL_FACTORY_CONTRACT_ADDRESS } from "@/libs/constants";

export async function getPoolInfo({
  tokenA,
  tokenB,
  poolFee,
}: {
  tokenA: Token;
  tokenB: Token;
  poolFee: FeeAmount;
}) {
  const provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.bsc);
  if (!provider) {
    throw new Error("No provider");
  }

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: tokenA,
    tokenB: tokenB,
    fee: poolFee,
  });

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    provider,
  );

  const [token0, token1, fee, tickSpacing, liquidity, slot0, address] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
      poolContract.address,
    ]);

  return {
    token0,
    token1,
    fee,
    tickSpacing,
    liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
    address,
    slot0,
  };
}

export async function getPoolInfoByAddress() {
  // super level
  if (Pools.length == 0) return [];
  const poll = Pools.map(async (pair) => await getPoolInfo(pair as any));
  return Promise.all(poll);
}

export async function getPoolInfoByAddressWithToken() {
  // super level
  const tempP = [];
  for (let poolItem of Pools) {
    const address = computePoolAddress({
      factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
      tokenA: poolItem.tokenA,
      tokenB: poolItem.tokenB,
      fee: poolItem.poolFee,
    });
    tempP.push({
      ...poolItem,
      address: address,
    });
  }
  return await Promise.all(tempP);
}

export async function getPoolInfoByNftTokenId(_nftId: string) {}
