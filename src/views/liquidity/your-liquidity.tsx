"use client";
import * as React from 'react';
import { useState } from "react";
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card, Button } from '@mui/material';

import "@/styles/liquidity.css";

const YourLiquidity: React.FC = () => {

  const [isEyeClose, setIsEyeClose] = useState(false)

  const funcModify = () => {
    if (isEyeClose) {
      setIsEyeClose(false);
    } else setIsEyeClose(true)
  }

  const pageHistoryBack = () => {
    window.history.back();
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
            className={`liquidity-card pb-[24px] justify-between border-[#FFFFFF1A] rounded-[16px]  lg:rounded-[32px] `}
          >
            <div className='relative items-center liquidity-card-header py-[18px] px-[24px] mb-[32px] text-center rounded-tl-[16px] rounded-tr-[16px] lg:rounded-t1-[32px] lg:rounded-tr-[32px]'>
              <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                Your Liquidity
              </Typography>
            </div>
            <CardContent className=' p-0 h-[440px] overflow-auto scrollable px-[24px]'>
              <div className='h-2/4 flex flex-col  items-center py-6 pb-10 gap-5 border-b border-dashed border-[#D8DAE5]'>
                <Typography gutterBottom variant="h3" className='m-0 font-bold text-[24px] text-white'>
                  GYNX Yield
                </Typography>
                <Typography variant="body1" className="text-[#ADADAD]" >
                  Your Daily Earned GYNX: : <span className="text-white font-bold text-[16px]">120 GYNX</span>
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => funcModify()}
                  className='w-[160px] my-auto py-[10px] px-[16px] text-[16px]  text-white rounded-full'
                  sx={{
                    background: 'linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important',
                    border: '0.5px solid rgba(255, 255, 255, 0.1) !important'
                  }}
                >
                  {`Harvest GYNX`}
                </Button>
              </div>
              <div className='h-2/4 flex flex-col  items-center py-6 pb-10 gap-5'>
                <Typography gutterBottom variant="h3" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                  Liquidity Pool (LP)
                </Typography>
                <Typography variant="body1" className="text-[#ADADAD]" >
                  Modify your LP settings below:
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => funcModify()}
                  className='w-[160px] my-auto py-[10px] px-[16px] text-[16px]  text-white rounded-full'
                  sx={{
                    background: 'linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important',
                    border: '0.5px solid rgba(255, 255, 255, 0.1) !important'
                  }}
                >
                  {`Harvest GYNX`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default YourLiquidity;