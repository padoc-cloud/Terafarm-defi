"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import { useRouter } from "next/navigation";
import { WalletList } from '@/components/Wallets/WalletList';
import { useAccount, useConnect } from 'wagmi'

import "@/styles/profile.css";

const WalletSelect: React.FC = () => {
    const router = useRouter();
    const { connector, isConnected } = useAccount();
    const { data, submittedAt, status, isSuccess } = useConnect();

    React.useEffect(() => {
        console.log("isConnected result => ", isConnected, submittedAt, status, isSuccess)
        if (isConnected) {
            router.push('/success');
        }
    }, [connector, isConnected, router, submittedAt, status, data, isSuccess])

    return (
        <div className="flex items-center justify-center grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Card
                        sx={{
                            width: 540,
                            textAlign: 'center',
                        }}
                        className={`card justify-between border-[#FFFFFF1A] rounded-[16px]  lg:rounded-[32px] `}
                    >
                        <div className='relative items-center card-header py-[18px] px-[24px] text-center rounded-tl-[16px] rounded-tr-[16px] lg:rounded-t1-[32px] lg:rounded-tr-[32px]'>
                            <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[24px] text-white'>
                                Select Your Wallet
                            </Typography>
                            <Typography variant="body2" className='mt-[16px] font-normal text-[16px] text-white'>
                                By connecting your wallet, you agrery
                            </Typography>
                        </div>
                        <CardContent className=' pt-[32px] pb-[40px] px-[24px]'>
                            <ul className={`grid grid-cols-1 gap-[14px] 'h-[500px] overflow-auto scrollable`}>
                                
                                <WalletList />
                            </ul>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default WalletSelect;