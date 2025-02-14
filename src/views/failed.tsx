"use client";

import * as React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from 'next/link';

import "@/styles/state.css";

const Failed: React.FC = () => {
  
  return (
    <div className="flex items-center justify-center grow w-full text-black dark:text-white mt-[130px] mb-[30px]">
      <div className="container">
        <div className='flex items-center justify-center grow w-full'>
          <Card
            sx={{
              width: 540,
              textAlign: 'center',
            }}
            className={`card justify-between border-[#FFFFFF1A] rounded-[16px]  lg:rounded-[32px] `}
          >
            <CardContent className='py-[40px] px-[24px] text-center grid grid-cols-1 gap-[24px]'>
              <div className='mb-[24px]'>
                <div className='icon-failed-show flex justify-center w-[100px] mb-[24px] h-[100px] bg-[#EB3D4D] rounded-full mx-auto'>
                  <Image src={`/images/icon-svg/failed.svg`} alt={`user-photo`} width={66} height={66} />
                </div>
                <Typography gutterBottom variant="h3" className='mb-[16px] font-bold text-[32px] text-[#EB3D4D]'>
                  Failed!
                </Typography>
                <p className='mb-[0] mx-[50px]  text-[16px] text-[#D2D2D5]'>
                  Unfortunately, your transaction could not be processed.
                </p>
              </div>
              <div className='text-left'>
                <Typography gutterBottom variant="h3" className='font-bold text-[24px] mb-[24px] text-[#E9E9EA]'>
                  Possible Reasons
                </Typography>
                <ul className='grid gap-[7px] grid-cols-1 p-[10px]'>
                  <li className='flex  items-center bg-transparent'>
                    <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]'  />
                    <span className='text-[#E9E9EA] text-[16px]'>Insufficient funds for gas fees</span>
                  </li>
                  <li className='flex  items-center bg-transparent'>
                    <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]'  />
                    <span className='text-[#E9E9EA] text-[16px]'>Network congestion</span>
                  </li>
                  <li className='flex  items-center bg-transparent'>
                    <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]'  />
                    <span className='text-[#E9E9EA] text-[16px]'>Smart contract issue</span>
                  </li>
                  <li className='flex  items-center bg-transparent'>
                    <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]'  />
                    <Link href={`/liquidity`}><span className='text-[#FF2100] text-[16px]'>Retry</span></Link>
                  </li>
                  <li className='flex  items-center bg-transparent'>
                    <FiberManualRecordIcon className='text-[7px] mr-[10px] text-[#E9E9EA]'  />
                    <Link href={`/liquidity`}><span className='text-[#FF2100] text-[16px]'>Contact support</span></Link>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Failed;