"use client";

import * as React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import Chip from '@mui/material/Chip';

import "@/styles/state.css";

const transaction_detail = {
  amount: '+USDT5623',
  date: '05.12pm . 12/09/23',
  type: 'Staking',
  status: 'Successful'
}

const Completed: React.FC = () => {
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
                <div className='icon-completed-show flex justify-center w-[100px] mb-[24px] h-[100px] bg-[#22CAAD] rounded-full mx-auto'>
                  <Image src={`/images/icon-svg/completed.svg`} alt={`user-photo`} width={66} height={66} />
                </div>
                <Typography gutterBottom variant="h3" className='mb-[16px] font-bold text-[32px] text-[#22CAAD]'>
                  Completed!
                </Typography>
                <p className='mb-[0] mx-[20px]  text-[16px] text-[#D2D2D5]'>
                  Your transaction was successful! Your Staking has been confirmed and added to the blockchain.
                </p>
              </div>
              <div className='text-left'>
                <Typography gutterBottom variant="h3" className='font-bold text-[24px] mb-[24px] text-[#E9E9EA]'>
                  Detail Transaction
                </Typography>
                <ul className='sub-card flex flex-col rounded-[8px] lg:rounded-[16px] grid gap-[8px] grid-cols-1 p-[16px]'>
                  <li className='flex justify-between item-list items-center py-[16px] bg-transparent'>
                    <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Amount</span>
                    <span className='text-[#E9E9EA] text-[16px]'>{transaction_detail.amount}</span>
                  </li>
                  <li className='flex justify-between item-list items-center py-[16px] bg-transparent'>
                    <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Date & Time</span>
                    <span className='text-[#E9E9EA] text-[16px]'>{transaction_detail.date}</span>
                  </li>
                  <li className='flex justify-between item-list items-center py-[16px] bg-transparent'>
                    <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Type of Transaction</span>
                    <span className='text-[#E9E9EA] text-[16px]'>{transaction_detail.type}</span>
                  </li>
                  <li className='flex justify-between items-center py-[16px] bg-transparent'>
                    <span className='text-[#A5A5AB] mr-[6px] text-[16px] ml-2'>Status</span>
                    {transaction_detail.status === 'Successful' && (
                      <Chip
                        sx={{
                          background: '#067647',
                          fontSize: 12,
                          fontWeight: 18
                        }}
                        label={transaction_detail.status} className='py-[7px] px-[5px] text-white' />
                    )}
                    {transaction_detail.status === 'Pending' && (
                      <Chip
                        sx={{
                          background: '#B54708',
                          fontSize: 12,
                          fontWeight: 18
                        }}
                        label={transaction_detail.status} className='py-[7px] px-[5px] text-white' />
                    )}
                    {transaction_detail.status === 'Failed' && (
                      <Chip
                        sx={{
                          background: '#B42318',
                          fontSize: 12,
                          fontWeight: 18
                        }}
                        label={transaction_detail.status} className='py-[7px] px-[5px] text-white' />
                    )}
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

export default Completed;