
import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic'
export const metadata: Metadata = {
    title: "Terafarm | Account",
    description: "This is Account Page"
};
const Account = dynamic(() => import('@/views/profile/account'), { ssr: false })

const AccountyPage = () => {
    return (
        <Account />
    );
};

export default AccountyPage;