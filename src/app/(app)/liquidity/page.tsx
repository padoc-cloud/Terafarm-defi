
import { Metadata } from 'next';
import React from 'react';
import Liquidity  from '@/views/liquidity';

export const metadata: Metadata = {
    title: "Terafarm | Liquidity",
    description: "This is Liquidity Page"
};


const LiquidityPage = () => {
    return (
        <Liquidity />
    );
};

export default LiquidityPage;