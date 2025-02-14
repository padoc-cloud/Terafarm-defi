import TeracAbi from "@/config/abi/terac.abi.json";
import StakingAbi from "@/config/abi/staking.abi.json";

import {
  useWaitForTransactionReceipt,
  useWriteContract,
  usePublicClient,
  useAccount,
} from "wagmi";
import { parseEther } from "viem";

import { config } from "@/config/wagmi";
import { useAllowance } from "./useAllowance";

export const useStake = () => {
  const {
    data: hash,
    error,
    isPending,
    reset,
    writeContract,
  } = useWriteContract();
  const {
    checkAllowance,
    reset: apprReset,
    hash: apprHash,
    error: apprErr,
    isPending: apprPending,
    isConfirming: apprConfirming,
    isConfirmed: apprConfirmed,
  } = useAllowance();
  const { address } = useAccount();
  const client = usePublicClient({
    config,
  });

  const stake = async (
    contractAddress: string,
    tokenAddress: string,
    amount: BigInt,
  ) => {
    await checkAllowance(
      tokenAddress,
      address as `0x${string}`,
      contractAddress,
      amount,
      TeracAbi,
    );
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: StakingAbi,
      functionName: "stake",
      args: [amount],
      value: parseEther("0.0001"),
    });
  };

  const unstake = async (contractAddress: string, amount: BigInt) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: StakingAbi,
      functionName: "unstake",
      args: [amount],
      value: parseEther("0.00001"),
    });
  };

  const harvest = async (contractAddress: string) => {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: StakingAbi,
      functionName: "claimReward",
      value: parseEther("0.00001"),
    });
  };

  const getReward = async (contractAddress: string) => {
    return await client.readContract({
      address: contractAddress as `0x${string}`,
      abi: StakingAbi,
      functionName: "calculateRewards",
      args: [address],
    });
  };

  const {
    isError,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    stake,
    unstake,
    harvest,
    reset,
    getReward,
    apprReset,
    hash,
    error,
    isError,
    isPending,
    isConfirming,
    isConfirmed,
    apprErr,
    apprPending,
    apprConfirming,
    apprConfirmed,
    apprHash,
  };
};
