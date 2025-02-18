
import React from 'react';
import { Metadata } from 'next';
import Policiy  from '@/views/profile/policy';

export const metadata: Metadata = {
    title: "Terafarm | Privacy Policy",
    description: "This is Privacy Policy Page"
};


const PolicyPage = () => {
    return (
        <Policiy />
    );
};

export default PolicyPage;