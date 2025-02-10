import React from 'react';
import Completed from '@/views/completed';


const CompletedPage = () => {
    return (
        <div className="flex items-center justify-center mp-3 grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Completed />
                </div>
            </div>
        </div>
    );
};

export default CompletedPage;