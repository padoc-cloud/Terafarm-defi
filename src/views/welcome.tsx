"use client";
import React, { useEffect } from "react";
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from "next/image";

import CheckIcon from '../../public/images/home/check.svg';
import { useRouter } from 'next/navigation'


export const Welcome = () => {
    const router = useRouter()

    useEffect(() =>{
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000)
    }, [router])

    return (
        <Card
            sx={{
                maxWidth: 540,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}
            className={`blur-effect flex flex-col p-[40px] justify-between border-2 border-[#FFFFFF1A] rounded-[32px]`}
        >
            <div className="flex justify-center mx-auto rounded-full mb-[40px] text-center w-[140px] h-[140px] bg-[#991602] shadow-[0px 0px 30.22px 8.06px #99160259]">
                <Image src={CheckIcon} alt="check icon" width={62} height={42} className="flex" />
            </div>
            <CardContent className='p-0'>
                <div className='w-full text-center'>
                    <Typography gutterBottom variant="h3" component="div" className='text-[30px] md:text-[40px] bg-gradient-to-r text-transparent from-[#FFFFFF] to-[#999999] bg-clip-text'
                    >
                        Welcome!
                    </Typography>
                    <Typography variant='subtitle1' className='text-white text-[18px]'>
                        You have successfully logged in.
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}