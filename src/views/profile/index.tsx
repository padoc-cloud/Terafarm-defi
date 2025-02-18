"use client";

import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card, Button } from '@mui/material';
import { useRouter } from "next/navigation";
import { useDisconnect } from 'wagmi';
import Link from "next/link";

import "@/styles/profile.css";

const Profile: React.FC = () => {
  const router = useRouter();

  const { disconnect } = useDisconnect();

  const logOut = () => {
    disconnect();
    router.push('/');
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
            className={`card justify-between border-[#FFFFFF1A] rounded-[16px]  lg:rounded-[32px] `}
          >
            <div className='relative items-center card-header py-[18px] px-[24px] mb-[32px] text-center rounded-tl-[16px] rounded-tr-[16px] lg:rounded-t1-[32px] lg:rounded-tr-[32px]'>
              <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                My Profile
              </Typography>
            </div>
            <CardContent className='px-[24px] text-center'>
              <div className='mb-[24px]'>
                <Image src={`/images/users/user-1.svg`} alt={`user-photo`} width={100} height={100} className='m-auto' />
                <Typography gutterBottom variant="h3" component="div" className='m-0 mt-[16px] font-bold text-[20px] md:text-[24px] text-white'>
                  Darlene Robertson
                </Typography>
              </div>
              <ul className='sub-card flex-col rounded-[8px] lg:rounded-[16px] grid gap-[8px] grid-cols-1 p-[16px]'>
                <li className='border-[#2E2E2E]'>
                  <Link href='/profile/account' className='flex justify-between item-list items-center py-[20px] bg-transparent'>
                    <div className='flex items-center'>
                      <span className='text-[#A5A5AB;] mr-[6px] text-[16px] ml-2'>Account</span> {/* Assuming item has a name property */}
                    </div>
                    <Image src={`/images/icon-svg/arrow-right.svg`} width={24} height={24} alt={`arrow-right`} className='hover:opacity-80' />
                  </Link>
                </li>
                <li className='border-[#2E2E2E]'>
                  <Link href='/profile/transaction-history' className='flex justify-between item-list items-center py-[20px] bg-transparent'>
                    <div className='flex items-center'>
                      <span className='text-[#A5A5AB;] mr-[6px] text-[16px] ml-2'>Transaction History</span> {/* Assuming item has a name property */}
                    </div>
                    <Image src={`/images/icon-svg/arrow-right.svg`} width={24} height={24} alt={`arrow-right`} className='hover:opacity-80' />
                  </Link>
                </li>
                <li className='border-[#2E2E2E]'>
                  <Link href='/profile/policy' className='flex justify-between item-list items-center py-[20px] bg-transparent'>
                    <div className='flex items-center'>
                      <span className='text-[#A5A5AB;] mr-[6px] text-[16px] ml-2'>Privacy Policy</span> {/* Assuming item has a name property */}
                    </div>
                    <Image src={`/images/icon-svg/arrow-right.svg`} width={24} height={24} alt={`arrow-right`} className='hover:opacity-80' />
                  </Link>
                </li>
                <li className='border-[#2E2E2E]'>
                  <Link href='/profile/support' className='flex justify-between border-none items-center py-[20px] bg-transparent'>
                    <div className='flex items-center'>
                      <span className='text-[#A5A5AB;] mr-[6px] text-[16px] ml-2'>Help & Support</span> {/* Assuming item has a name property */}
                    </div>
                    <Image src={`/images/icon-svg/arrow-right.svg`} width={24} height={24} alt={`arrow-right`} className='hover:opacity-80' />
                  </Link>
                </li>
              </ul>
              <div className='w-full text-left'>
                <Button variant="contained"
                  onClick={logOut} size='large'
                  startIcon={<Image width={20} height={20} src={`/images/icon-svg/log-out.svg`} alt={`log-out`} />}
                  className='w-full py-[18px] mt-[20px] text-[16px] text-white '
                  sx={{
                    background: 'linear-gradient(191.21deg, #BC230B -137.64%, #700F01 119.38%) !important',
                    borderRadius: 50
                  }}
                >
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Profile;