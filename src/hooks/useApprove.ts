import { erc20Abi } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export const useApprove = () => {
    const { data: hash, error, isPending, reset, writeContract } = useWriteContract();

    const approveTokens = async (
        tokenAddress: string,
        spenderAddress: string,
        amount: BigInt,
        abi: any[]
    ) => {
        try {
            await writeContract({
                address: tokenAddress as `0x${string}`,
                abi: abi || erc20Abi,
                functionName: "approve",
                args: [spenderAddress as `0x${string}`, String(amount)],
            });
        } catch (error) {
            console.error("Error approving tokens:", error);
        }
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    return { approveTokens, hash, error, isPending, isConfirming, isConfirmed, reset };
};
