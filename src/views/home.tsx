"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Carousel } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useAccount } from 'wagmi'

import Img1 from '../../public/images/home/img1.svg';
import Img2 from '../../public/images/home/img2.svg';
import Img3 from '../../public/images/home/img3.svg';

import "@/styles/index.scss";

const HomePage = () => {

    const router = useRouter();
    const [isvisible, setIsvisible] = useState(false);
    const { isConnected } = useAccount();

    const items = [
        {
            img: Img1,
            title: 'Connect Your Wallet',
            description: 'To get started, connect your crypto wallet. We support MetaMask, WalletConnect, and more.'
        },
        {
            img: Img2,
            title: 'Participate in Liquidity Pools',
            description: 'Earn rewards by providing liquidity to pools. Choose a pool and deposit your tokens.'
        },
        {
            img: Img3,
            title: 'Start Staking',
            description: 'Stake your tokens and earn additional rewards over time. The longer you stake, the higher the returns.'
        }
    ]

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const changeHandler = () => {
        if (isConnected) {
            if (currentIndex % 3 == 1) {
                router.push('/liquidity')
            } else if (currentIndex % 3 === 2) {
                router.push('/staking')
            } else {
                router.push('/dashboard')
            }
        } else {
            if (isvisible) {
                setIsvisible(false);
            } else setIsvisible(true)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setCurrentIndex(currentIndex + 1)
        }, 5000)
    }, [currentIndex]);


    return (
        <div className="flex items-center justify-center mp-3 grow w-full text-black dark:text-white">
            <div className="container">
                <div className='flex items-center justify-center grow w-full'>
                    <Card
                        sx={{
                            maxWidth: 600,
                            textAlign: 'center',
                            padding: "40px",
                            margin:'30px 0px',
                            backgroundColor: '#4141411A'
                        }}
                        className={`card rounded-[16px] lg:rounded-[32px] ${!isvisible ? "block" : "hidden"}`}
                    >
                        <CardContent
                            sx={{
                                paddingBottom: "0px !important"
                            }}>
                            <Carousel
                                placeholder="Loading..."
                                autoplayDelay={5000}
                                autoplay={true}
                                loop={true}
                                className="rounded-xl overflow-hidden"
                                navigation={({ setActiveIndex, activeIndex, length }) => (
                                    <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                        {new Array(length).fill("").map((_, i) => (
                                            <span
                                                key={i}
                                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                                    }`}
                                                onClick={() => setActiveIndex(i)}
                                            />
                                        ))}
                                    </div>
                                )}
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                            >
                                {items.map((item, index) => {
                                    return (
                                        <div key={index} className={`w-full h-full inline-block flex-none pb-[30px]`}
                                        >
                                            <div className='w-full flex-col grid gap-5 text-center mb-0 sm:mb-12'>
                                                <Typography gutterBottom variant="h4" className='text-[28px] md:text-[40px] ml-2 font-bold  bg-gradient-to-r text-transparent from-[#FFFFFF] to-[#999999] bg-clip-text'>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant='subtitle2' className='text-[#D2D2D5] mb-10 text-[14px]'>
                                                    {item.description}
                                                </Typography>
                                                <div className='w-full h-[150px]'>
                                                    <Image
                                                        src={item.img}
                                                        alt={item.title}
                                                        className='mx-auto h-[150px] sm:h-[200px]'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </CardContent>
                        <div className='w-full text-left mt-[30px]'>
                            <Button variant="contained"
                                onClick={changeHandler} size='large'
                                className='w-full py-3 text-white '
                                sx={{
                                    background: 'linear-gradient(191.21deg, #BC230B -137.64%, #700F01 119.38%) !important',
                                    marginTop: "26px",
                                    borderRadius: 50
                                }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            maxWidth: 700,
                            textAlign: 'center',
                            margin:'30px 0px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: "32px",
                        }}
                        className={`card  flex flex-col p-[40px] justify-between border-2 border-[#FFFFFF1A] rounded-[16px] lg:rounded-[32px] 
                        ${isvisible ? 'block' : 'hidden'}`}
                    >
                        <CardContent className='p-0'>
                            <div className='w-full text-center mb-12'>
                                <Typography gutterBottom variant="h3" component="div" className='text-[40px] text-white'
                                >
                                    Welcome To Terafarm
                                </Typography>
                                <Typography variant='subtitle1' className='text-white text-[18px]'>
                                    By connecting your wallet, you agree to our  
                                    <a href="#" className='text-[#029B1C] font-bold underline'>terms and conditions.</a>
                                </Typography>
                            </div>
                            <div className='w-full text-left mt-8'>
                                <Typography gutterBottom variant="h5" component="div" className='text-[#D2D2D5]'>
                                    Disclaimer
                                </Typography>
                                <Typography variant="body1" className='mb-5 text-[#D2D2D5] text-[16px]'  >
                                    Terafarm is a decentralized platform that enables users to participate in liquidity pools,
                                    staking, and token forging. By using the platform, you acknowledge the inherent risks of
                                    cryptocurrency and blockchain- based technologies. Terafarm is not liable for any potential
                                    loss of tokens or funds. Our goal is to evolve towards a fully decentralized governance model,
                                    where users will have a say in key platform decisions.We advise users to research and fully understand
                                    the platform's mechanics before participating.
                                </Typography>
                                <Link href="/walletselect" >
                                    <Button variant="contained" color="error" size='large'
                                        className='w-full py-3 text-white'
                                        sx={{
                                            marginTop: "26px",
                                            borderRadius: "9999px",
                                            background: 'linear-gradient(191.21deg, #BC230B -137.64%, #700F01 119.38%) !important'
                                        }}>
                                        Connect Wallet
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default HomePage;
