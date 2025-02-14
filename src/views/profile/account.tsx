"use client";

import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useAccount } from 'wagmi';
import { Card, Button } from '@mui/material';
import { useRouter } from "next/navigation";
import "@/styles/profile.css";

const Account: React.FC = () => {
  const router = useRouter();
  const { address, connector } = useAccount()

  const pageHistoryBack = () => {
    router.push('/profile');
  }

  function reduceWallet(str? : string | undefined) {
    if(str === undefined){
      return "";
    }
    if (str.length <= 10) {
      return str;
    }

    const front = str.slice(0, 10);
    const back = str.slice(-6);

    return `${front}.....${back}`;
  }

  return (
    <div className="flex items-center justify-center grow w-full text-black dark:text-white mt-[130px] mb-[30px]">
      <div className="container">
        <div className='flex items-center justify-center grow w-full'>
          <Card
            sx={{
              width: 540,
              textAlign: 'center',
            }}
            className={`card pb-[24px] justify-between border-[#FFFFFF1A] rounded-[16px]  lg:rounded-[32px] `}
          >
            <div className='relative items-center card-header py-[18px] px-[24px] mb-[32px] text-center rounded-tl-[16px] rounded-tr-[16px] lg:rounded-t1-[32px] lg:rounded-tr-[32px]'>
              <button
                onClick={pageHistoryBack}
                className='absolute flex justify-center items-center w-[40px] h-[40px] icon-form left-[24px]'>
                <Image src={`/images/icon-svg/arrow-left-light.svg`} width={24} height={24} alt='arrow-left' className='opacity-60' />
              </button>
              <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                Account
              </Typography>
            </div>
            <CardContent className='p-0 px-[24px]'>
              <div className='mb-[24px]'>
                <div className="relative">
                  <Image
                    src={`/images/users/user-1.svg`}
                    alt={`user-photo`}
                    width={100}
                    height={100}
                    className="m-auto"
                  /> 
                    <Button 
                      variant="contained"
                      sx={{
                        color: 'white',
                      }}
                      className="btn-profile-add"
                      endIcon={
                        <Image
                          src={`/images/icon-svg/camera.svg`}
                          alt={`camera`}
                          width={14}
                          height={14}
                          className="m-auto text-white"
                        />
                      }
                    > 
                      <span className="text-white text-[12px]">Add</span>
                    </Button>
                </div>
                <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                  Darlene Robertson
                </Typography>

              </div>
              <div className='sub-card flex-col p-[24px] grid gap-[16px] grid-cols-1 rounded-[8px] lg:rounded-[16px]' >
                <div className='grid gap-[10px] px-[40] text-left' >
                  <Typography className='text-[20px] md:text-[24px] text-[#E9E9EA]'>
                    Wallet Address
                  </Typography>

                  {address && (
                    <Typography component='div' className=' sm:flex justify-start items-center text-[14px] text-[#e9eae9]'>
                      <p className='text-[#2a8846] font-bold text-[16px]'>{connector?.name}&nbsp;:&nbsp;</p>
                      <span className='text-[16px] account-address w-[250px] md:w-[500px] lg:w-full whitespace-nowrap overflow-hidden overflow-ellipsis'>{reduceWallet(address)}</span>
                    </Typography>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Account;