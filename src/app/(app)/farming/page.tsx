import { Metadata } from 'next';
import React from 'react';
import Farming from '@/views/farming';

export const metadata: Metadata = {
    title: "Terafarm | Farming",
    description: "This is Farming Page"
};


const FarmingyPage = () => {
    return (
        <div className="flex items-center justify-center mp-3 grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Farming />
                </div>
            </div>
        </div>
    );
};

export default FarmingyPage;