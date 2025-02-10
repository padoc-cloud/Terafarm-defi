import { ethers } from 'ethers'

export interface IPoolInfo {
    token0: string
    token1: string
    fee: number
    tickSpacing: number
    sqrtPriceX96: ethers.BigNumber
    liquidity: ethers.BigNumber
    tick: number
    address: string
    PoolAddress?: string
}