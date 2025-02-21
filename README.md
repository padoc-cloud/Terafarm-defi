# Terafarm-Dex

A cryptocurrency market operating as a DEX (decentralized exchange) It has two natively tokens. TERAC and GYNX.

Core features; Liquidity, Farming, Staking coming soon in a new Governance feature that we are building.

The platform operates on UniSwap V3 liquidity and utilizes NFT tokens for farming.

## Contract Addresses

`TERAC(tera coin)`: 0x0E8C9C72fd9a51d11AD6577E445F75Ce514Ce3EE

`GYNX`: 0x91898E169DE1868Da68A4e9B34AF19DB69360009

`Farming`: 0x89c7d4604adDeBB26702Ae9D9fBcF9ab7a215a58

`Staking`: 0x9f735d33e6d3F9452cECa2e5a78D6220356A310D

## 🛠 Skills
TypeScript, Next.js, Web3.js, Wagmi, Uniswap-sdk, Socket.io

## Authors

- [@padoc-cloud](https://www.github.com/padoc-cloud)


## Features

- Liquidity Pool
- Farming
- Staking
- Governance (coming soon)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_BSCSCAN_API_KEY`

`NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS`

`NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS`

`NEXT_PUBLIC_TERAC_CONTRACT_ADDRESS`

`NEXT_PUBLIC_GYNX_CONTRACT_ADDRESS`

`NEXT_PUBLIC_NFT_TOKEN_ADDRESS`

`NEXT_PUBLIC_BLOCKSPAN_API_KEY`

## API Reference

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `WALLETCONNECT_PROJECT_ID` | `string` | **Required**. Your API key |
| `COINGECKO_API_KEY` | `string` | **Required**. Your API key |
| `ALCHEMY_API_KEY` | `string` | **Required**. Your API key |

## Installation

```bash
  npm install
  npm run build
  npm run start
```