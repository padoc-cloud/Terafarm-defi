import { ethers } from "ethers";
import { rpcUrl } from "@/config/UniswapConfig";
import FarmingABI from "@/config/abi/farming.abi.json";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl.bsc);

export const FarmingContract = new ethers.Contract( // create contract interface
  `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`,
  FarmingABI,
  provider,
);
