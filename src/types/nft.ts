// src/types/nft.ts

export interface NFTDetails {
    token_type: 'erc721'; // Assuming the type is fixed as 'erc721'
    contract_address: string;
    id: string;
    token_name: string | null;
    token_description: string | null;
    uri: string;
    metadata: {
        image: string;
        attributes: {
            value: string;
            trait_type: string;
        }[];
    }; // Define a more specific type if you know the structure of metadata
    metadata_updated_at: string; // ISO date string
    rarity_rank: number | null; // Define more specific type if known
    rarity_score: number | null; // Define more specific type if known
    total_transfers: number;
    minted_at: string; // ISO date string
    total_current_owners: number | null; // Define more specific type if known
    recent_price: {
        contract_address: string;
        id: string;
        hash: string;
        hash_nft_count: string;
        from_address: string;
        to_address: string;
        date: string;
        quantity: string;
        price: string;
        price_currency: string;
        price_usd: string;
        price_native: string;
        currency: {
            name: string;
            price: string;
            symbol: string;
            decimals: number;
            to_address: string;
            from_address: string;
            contract_address: string;
        }[];
        erc20_transfers: {
            name: string;
            price: string;
            symbol: string;
            decimals: number;
            to_address: string;
            from_address: string;
            contract_address: string;
        }[];
    }; // Define more specific type if known
    cached_videos: any | null; // Define a more specific type if known
    cached_images: {
        tiny_100_100: string;
        small_250_250: string;
        medium_500_500: string;
        large_1000_1000: string;
        original: string;
        content_type: string;
    }; // Define a more specific type if known
    cached_other_assets: {
        original: string;
        content_type: string;
    }; // Define a more specific type if known
}

export interface NFT {
    token_type: 'erc721'; // Assuming the type is fixed as 'erc721'
    contract_address: string;
    id: string;
    token_name: string;
    owner_address: string;
    times_acquired: number;
    minted_at: string; // ISO date string
    first_owned: string; // ISO date string
    last_owned: string; // ISO date string
    quantity: string; // Could be number if you want to represent it as a number
    nft_details: NFTDetails;
}

export interface NFTmetadata {
    id: string;
    description: string;
    image: string;
    name: string;
    poolAddress: string;
    feeTier: string;
    wethAddress: string;
    SLPAddress: string;
}

