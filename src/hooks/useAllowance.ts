import { erc20Abi } from "viem";
import { usePublicClient } from "wagmi";
import { useApprove } from "./useApprove";
import { config } from "@/config/wagmi";

export const useAllowance = () => {
    const { approveTokens, hash, error, isPending, isConfirming, isConfirmed, reset } = useApprove();
    const client = usePublicClient({
        config
    })

    const checkAllowance = async (
        tokenAddress: string,
        ownerAddress: string,
        spenderAddress: string,
        amount: BigInt,
        abi: any[]
    ) => {
        const allowance = await client.readContract({
            address: tokenAddress as `0x${string}`,
            abi: abi || erc20Abi,
            functionName: "allowance",
            args: [ownerAddress as `0x${string}`, spenderAddress as `0x${string}`],
        })
        if (allowance && allowance as any >= amount) {
            return;
        } else {
            await approveTokens(tokenAddress, spenderAddress, amount, abi);
        }
    };

    return { checkAllowance, hash, error, isPending, isConfirming, isConfirmed, reset };
};