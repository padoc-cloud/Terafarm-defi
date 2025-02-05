import React from 'react';
import { Welcome } from '@/views/welcome';


const SuccessPage = () => {
    return (
        <div className="flex items-center justify-center mp-3 grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Welcome />
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;