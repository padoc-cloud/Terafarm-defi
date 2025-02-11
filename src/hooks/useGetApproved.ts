import { erc721Abi } from "viem";
import { usePublicClient } from "wagmi";
import { config } from "@/config/wagmi";
import {writeContract} from "@wagmi/core";

export const useGetApproved = () => {
    const client = usePublicClient({
        config
    })

    const checkAllowance = async (
        tokenAddress: string,
        ownerAddress: string,
        operatorAddress: string,
        tokenId: BigInt,
        abi: any[]
    ) => {
        const allowance = await client.readContract({
            address: tokenAddress as `0x${string}`,
            abi: abi || erc721Abi,
            functionName: "isApprovedForAll",
            args: [ownerAddress as `0x${string}`, operatorAddress as `0x${string}`],
        })
        if (allowance) {
            return allowance;
        } else {
            // await approveTokens(tokenAddress, operatorAddress, tokenId, abi);
            const res = await writeContract(config, {
                address: tokenAddress as `0x${string}`,
                abi: abi || erc721Abi,
                functionName: "setApprovalForAll",
                args: [operatorAddress as `0x${string}`, true],
            })
            return res;
        }
    };

    return { checkAllowance };
};