import INONFUNGIBLE_POSITION_MANAGER from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import FarmingAbi from "@/config/abi/farming.abi.json";

import {
  useWaitForTransactionReceipt,
  useWriteContract,
  usePublicClient,
  useAccount,
} from "wagmi";
import { parseEther } from "viem";

import { useGetApproved } from "./useGetApproved";
import { config } from "@/config/wagmi";

const useLpTokenStake = () => {
  const {
    data: hash,
    error,
    isPending,
    reset,
    writeContract,
  } = useWriteContract();
  const { checkAllowance } = useGetApproved();
  const { address } = useAccount();
  const client = usePublicClient({
    config,
  });

  const stake = async (
    contractAddress: string,
    tokenAddress: string,
    tokenId: BigInt,
  ) => {
    const res = await checkAllowance(
      tokenAddress,
      address as `0x${string}`,
      contractAddress,
      tokenId,
      INONFUNGIBLE_POSITION_MANAGER.abi,
    );
    if (!res) return;
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: FarmingAbi,
      functionName: "stake",
      args: [tokenId],
      value: parseEther("0.00001"),
    });
  };

  const unstake = async (contractAddress: string, tokenId: BigInt) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: FarmingAbi,
      functionName: "unstake",
      args: [tokenId],
      value: parseEther("0.00001"),
    });
  };

  const harvest = async (contractAddress: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: FarmingAbi,
      functionName: "harvest",
      account: address,
      value: parseEther("0.00001"),
    });
  };

  const getReward = async (contractAddress: string) => {
    if (contractAddress == `0x` || contractAddress == `` || !contractAddress)
      return;
    return (
      (await client.readContract({
        address: contractAddress as `0x${string}`,
        abi: FarmingAbi,
        functionName: "rewardsUnclaim",
        account: address,
      })) || 0
    );
  };

  const getStakedTokens = async (contractAddress: string) => {
    if (contractAddress == `0x` || contractAddress == `` || !contractAddress)
      return;
    const result = await client.readContract({
      address: contractAddress as `0x${string}`,
      functionName: "stakedTokens",
      abi: FarmingAbi,
      account: address,
    });
    return result as [];
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    stake,
    unstake,
    getReward,
    harvest,
    getStakedTokens,
    reset,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  };
};

export default useLpTokenStake;
