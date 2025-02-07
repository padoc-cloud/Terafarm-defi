// src/hooks/useLptokens.ts

import { useEffect, useState } from "react";
import axios from "axios";
import { options, getTokenBatchOptions } from "@/config/blockspan.config";
import { NFT } from "@/types/nft";
import { useAccount, useReadContract } from "wagmi";
import Header from "@/types/header";
import FarmingABI from "@/config/abi/farming.abi.json";

const useNFT: any = (change: boolean, switched: boolean) => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nftTokenList, setNftTokenList] = useState<NFT[]>([]);
  const { data: result }: any = useReadContract({
    abi: FarmingABI,
    address: `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`, // farming contract address
    functionName: "stakedTokens",
    account: address,
  });
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!isConnected) return;
      setLoading(true);
      setError(null); // Reset error state
      try {
        const tokenIds =
          result && Array.isArray(result[4]) ? result[4].join(",") : "";
        if (
          switched &&
          (tokenIds == "" || tokenIds == undefined || tokenIds == null)
        )
          return;
        console.log("tokenIds => ", tokenIds);
        const ops = switched
          ? getTokenBatchOptions(
              `0x${process.env.NEXT_PUBLIC_NFT_TOKEN_ADDRESS}`, // uniswap nft manage contract
              `${process.env.NEXT_PUBLIC_BLOCKSPAN_NEWWORK_TYPE}`,
              tokenIds,
              30,
              "asc",
            )
          : options(
              address as string,
              `${process.env.NEXT_PUBLIC_BLOCKSPAN_NEWWORK_TYPE}`,
              "erc721",
              `0x${process.env.NEXT_PUBLIC_NFT_TOKEN_ADDRESS}`,
              30,
            );
        const response = await axios.request(ops as Header);
        setNftTokenList(response.data.results);
      } catch (err) {
        setError("Failed to fetch NFTs.");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();

    // Cleanup function to avoid state updates on unmounted components
    return () => {
      setLoading(false);
      setError(null);
      setNftTokenList([]);
    };
  }, [isConnected, change, switched, address, result]);

  return { nftTokenList, loading, error };
};
export default useNFT;

export const useStakeToken: any = (change: boolean) => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nftTokenList, setNftTokenList] = useState<NFT[]>([]);

  useEffect(() => {}, [isConnected, change]);
};
