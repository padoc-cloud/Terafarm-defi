import { ethers } from "ethers";
import INONFUNGIBLE_POSITION_MANAGER from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS } from "@/libs/constants";
import { rpcUrl } from "@/config/UniswapConfig";

export const nfpmContract = new ethers.Contract(
  NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
  INONFUNGIBLE_POSITION_MANAGER.abi,
  new ethers.providers.JsonRpcProvider(rpcUrl.bsc),
);
