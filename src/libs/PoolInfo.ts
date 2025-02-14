import { POOL_FACTORY_CONTRACT_ADDRESS } from "@/libs/constants";
import JSBI from "jsbi";
import { computePoolAddress } from "@uniswap/v3-sdk";
import { FarmingContract, nfpmContract } from "@/contracts";

export const getPoolInfoByNftTokenId = async (tokenId: string) => {
  const positions = await nfpmContract.positions(JSBI.BigInt(tokenId));

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: positions.token0,
    tokenB: positions.token1,
    fee: positions.fee,
  });

  return {
    PoolAddress: currentPoolAddress,
    ...positions,
  };
};

export const setApprove = async (tokenId: string) => {
  const result = await nfpmContract.approve(
    FarmingContract.address,
    JSBI.BigInt(tokenId),
  );
  return result;
};

export const extractNFTInfo = (text: string) => {
  const feeTierMatch = text.match(/Fee Tier:\s*([\d.]+%)/);
  const tokenIDMatch = text.match(/Token ID:\s*(\d+)/);
  const poolAddressMatch = text.match(/Pool Address:\s*([a-fA-F0-9x]+)/);

  const feeTier = feeTierMatch ? feeTierMatch[1] : null;
  const id = tokenIDMatch ? tokenIDMatch[1] : null;
  const poolAddress = poolAddressMatch ? poolAddressMatch[1] : null;

  return {
    feeTier,
    id,
    poolAddress,
  };
};

export const getNFTtokensByAddress = async (address: string) => {
  const numPositions = await nfpmContract.balanceOf(address);
  const calls = [];
  for (let i = 0; i < numPositions; i++) {
    calls.push(nfpmContract.tokenOfOwnerByIndex(address, i));
  }
  const tokenIds = await Promise.all(calls);
  const metaInfo = [];
  for (let id of tokenIds) {
    metaInfo.push(nfpmContract.tokenURI(id));
  }

  const TokenMetaInfos = await Promise.all(metaInfo);
  const tokenList = [];
  for (let i of TokenMetaInfos) {
    var res = await fetch(i);
    const rrr = await res.json();
    tokenList.push({
      ...extractNFTInfo(rrr?.description),
      ...rrr,
    });
  }
  return tokenList;
};

export const getNftStakedTokensByTokens = async (tokenIds: []) => {
  if (tokenIds.length == 0) return [];
  const metaInfo = [];
  for (let id of tokenIds) {
    metaInfo.push(nfpmContract.tokenURI(id));
  }

  const TokenMetaInfos = await Promise.all(metaInfo);
  const tokenList = [];
  for (let i of TokenMetaInfos) {
    var res = await fetch(i);
    const rrr = await res.json();
    tokenList.push({
      ...extractNFTInfo(rrr?.description),
      ...rrr,
    });
  }
  // console.log('nft token list by token ids => ', tokenList)
  return tokenList;
};
