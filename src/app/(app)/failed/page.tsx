import React from 'react';
import Failed from '@/views/failed';


const FailedPage = () => {
    return (
        <div className="flex items-center justify-center mp-3 grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Failed />
                </div>
            </div>
        </div>
    );
};

export default FailedPage;