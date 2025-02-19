
import React from 'react';
import { Metadata } from 'next';
import TransactionHistory  from '@/views/profile/transaction-history';

export const metadata: Metadata = {
    title: "Terafarm | Transaction History",
    description: "This is Transaction History Page"
};

const TransactionHistoryPage = () => {
    return (
        <TransactionHistory />
    );
};

export default TransactionHistoryPage;