import { type BaseError, useReadContract, useAccount } from 'wagmi'
import { config } from "@/config/wagmi";
import { tokenItem } from '@/types/tokenItem';
import gynxAbi from "@/config/abi/gynx.abi.json";
import teracAbi from "@/config/abi/terac.abi.json";
import stakingAbi from "@/config/abi/staking.abi.json";
import FarmingAbi from "@/config/abi/farming.abi.json";
import { tokenDisplayFormat, parseCurrencyAmount, CurrencyFormat } from '@/utils/Currency';

export function GetBalances(address : string) {
    const tokenData : tokenItem[] = [];
    
    const { 
        data : terac_balance,
    } = useReadContract({
        config,
        address: `0x${process.env.NEXT_PUBLIC_TERAC_CONTRACT_ADDRESS}`, 
        abi: teracAbi,
        functionName: 'balanceOf',
        args: [address]
    })

    const {
        data: gync_balance,
    } = useReadContract({
        config,
        address: `0x${process.env.NEXT_PUBLIC_GYNX_CONTRACT_ADDRESS}`,
        abi: gynxAbi,
        functionName: 'balanceOf',
        args: [address]
    })
    
    if (terac_balance) {
        tokenData[0] = {
            type: 'TERAC',
            amount: '0.00',
            balance: tokenDisplayFormat(parseCurrencyAmount(Number(terac_balance as any), 18)),
            origin: CurrencyFormat(parseCurrencyAmount(Number(terac_balance as any), 18)),
            usdValue: 0,
        }
    } else {
        tokenData[0] = {
            type: 'TERAC',
            amount: '0.00',
            balance: Number(0),
            origin: '0',
            usdValue: 0,
        }
    }
    if (gync_balance) {
        tokenData[1] = {
            type: 'GYNX',
            amount: '0.00',
            balance: tokenDisplayFormat(parseCurrencyAmount(Number(gync_balance as any), 18)),
            origin: CurrencyFormat(parseCurrencyAmount(Number(gync_balance as any), 18)),
            usdValue: 0,
        }
    } else {
        tokenData[1] = {
            type: 'GYNX',
            amount: '0.00',
            balance: Number(0),
            origin: '0',
            usdValue: 0,
        }
    }

    return tokenData;
}

export const GetStakedTeracBalance = (address: string) => {
    const {
        data,
    } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`,
        abi: stakingAbi,
        functionName: 'users',
        args: [address]
    });
    return data;
}

export const GetStakedGynxBalance = (address: string) => {
    const {
        data,
    } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_GYNX_CONTRACT_ADDRESS}`, 
        abi: gynxAbi, 
        functionName: 'balanceOf', 
        args: [address] 
    });
    return data;
}