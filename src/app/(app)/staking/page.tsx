import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic'
const Staking = dynamic(() => import('@/views/staking'), {
    ssr: false
});

export const metadata: Metadata = {
    title: "Terafarm | Staking",
    description: "This is Staking Page"
};

const StakingPage = () => {
    return (
        <div className="flex items-center justify-center mp-3 grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Staking />
                </div>
            </div>
        </div>
    );
};

export default StakingPage;