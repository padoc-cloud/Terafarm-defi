
export const options = (address: string, chain: string, token_type: string, contractAddress: string, size: number) => (
    {
        method: 'GET',
        url: `https://api.blockspan.com/v1/nfts/owner/${address}?chain=${chain}&token_type=${token_type}&contract_addresses=${contractAddress}&include_nft_details=true&filter=nospam&page_size=${size}`,
        headers: { accept: 'application/json', 'X-API-KEY': process.env.NEXT_PUBLIC_BLOCKSPAN_API_KEY }
    }
);

export const getTokenBatchOptions = (contractAddress: string, chain: string, tokens: string, size: number, order: string) => ({
    method: 'GET',
    url: new URL(`https://api.blockspan.com/v1/nfts/contract/${contractAddress}?token_ids=${tokens}&chain=${chain}&order=${order}&include_current_owners=true&include_recent_price=true&page_size=${size}`),
    headers: { accept: 'application/json', 'X-API-KEY': process.env.NEXT_PUBLIC_BLOCKSPAN_API_KEY }
})