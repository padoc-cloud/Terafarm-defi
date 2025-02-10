import { ethers } from "ethers";
import INONFUNGIBLE_POSITION_MANAGER from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from "./constants";
import { rpcUrl, TokenDatabyAddress } from "@/config/UniswapConfig";
import { calculateLiquidityValueInUSD } from "./Liquidity";
import JSBI from "jsbi";
import { Token } from "@uniswap/sdk-core";

const nfpmContract = new ethers.Contract(
  NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
  INONFUNGIBLE_POSITION_MANAGER.abi,
  new ethers.providers.JsonRpcProvider(rpcUrl.bsc),
);

export const getPositionsDataByAddress = async (
  address: string,
  stakedTokenIds: [],
) => {
  if (address == undefined || address == null || address == "") return [];
  const numPositions = await nfpmContract.balanceOf(address);
  const calls = [];

  for (let i = 0; i < numPositions; i++) {
    calls.push(nfpmContract.tokenOfOwnerByIndex(address, i));
  }

  const positionIds = await Promise.all([...calls, ...stakedTokenIds]);

  const positionCalls = [];

  for (let id of positionIds) {
    positionCalls.push(nfpmContract.positions(id));
  }

  const callResponses = await Promise.all(positionCalls);

  const positionInfos = callResponses.map(async (position, index) => {
    if (
      Object.hasOwn(TokenDatabyAddress, position.token0) &&
      Object.hasOwn(TokenDatabyAddress, position.token1)
    ) {
      try {
        const TokenA = new Token(
          TokenDatabyAddress[
            position.token0 as keyof typeof TokenDatabyAddress
          ]?.chainId,
          position.token0,
          TokenDatabyAddress[
            position.token0 as keyof typeof TokenDatabyAddress
          ]?.decimals,
          TokenDatabyAddress[
            position.token0 as keyof typeof TokenDatabyAddress
          ]?.symbol,
          TokenDatabyAddress[
            position.token0 as keyof typeof TokenDatabyAddress
          ]?.name,
        );
        const TokenB = new Token(
          TokenDatabyAddress[
            position.token1 as keyof typeof TokenDatabyAddress
          ]?.chainId,
          position.token1,
          TokenDatabyAddress[
            position.token1 as keyof typeof TokenDatabyAddress
          ]?.decimals,
          TokenDatabyAddress[
            position.token1 as keyof typeof TokenDatabyAddress
          ]?.symbol,
          TokenDatabyAddress[
            position.token1 as keyof typeof TokenDatabyAddress
          ]?.name,
        );
        if (position)
          return {
            tokenId: positionIds[index],
            tickLower: position.tickLower,
            tickUpper: position.tickUpper,
            liquidity: JSBI.BigInt(position.liquidity),
            feeGrowthInside0LastX128: JSBI.BigInt(
              position.feeGrowthInside0LastX128,
            ),
            feeGrowthInside1LastX128: JSBI.BigInt(
              position.feeGrowthInside1LastX128,
            ),
            tokensOwed0: JSBI.BigInt(position.tokensOwed0),
            tokensOwed1: JSBI.BigInt(position.tokensOwed1),
            fee: position.fee,
            token0: position.token0,
            token0Symbol:
              TokenDatabyAddress[
                position.token0 as keyof typeof TokenDatabyAddress
              ]?.symbol,
            token1: position.token1,
            token1Symbol:
              TokenDatabyAddress[
                position.token1 as keyof typeof TokenDatabyAddress
              ]?.symbol,
            LiquidityValueInUSD: await calculateLiquidityValueInUSD(
              TokenA,
              TokenB,
              position.tickLower,
              position.tickUpper,
              position.fee,
              position.liquidity,
            ),
          };
        else return null;
      } catch (error) {
        console.log("error => ", error);
        return null;
      }
    } else return null;
  });

  return await Promise.all(positionInfos);
};

export const getPositionsCountByAddress = async (address: string) => {
  return await nfpmContract.balanceOf(address);
};
