"use client";
import * as React from 'react';
import { useState } from "react";
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import { useRouter } from "next/navigation";

import "@/styles/profile.css";

const Policy: React.FC = () => {


  const items = [
    {
      id: 1,
      content: "If you have a public website or mobile application, you're required to have a dedicated Privacy Policy URL. This is especially true if you are planning to connect your app or website to a third-party platform like Facebook or Instagram."
    },
    {
      id: 2,
      content: "This article will detail exactly what a Privacy Policy is and why you will need a URL for it."
    },
    {
      id: 3,
      content: "We'll also touch on the legal requirements that have to be taken into consideration when creating your Privacy Policy and look at some examples of how the end result should look.",
    },
    {
      id: 4,
      content: "A Privacy Policy is a statement or declaration that explicitly details your company policy regarding how you handle user and customer information."
    },
    {
      id: 5,
      content: "Misuse of consumer personal data can lead to a number of security concerns, such as personal identity theft, banking and financial theft, credit card scams and more. Keeping consumer data safeguarded against risks such as these has become a legal."
    }

  ]

  const router = useRouter();

  const pageHistoryBack = () => {
    router.push('/profile');
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
            <div className='relative items-center card-header py-[18px] px-[24px] text-center rounded-tl-[16px] rounded-tr-[16px] lg:rounded-t1-[32px] lg:rounded-tr-[32px]'>
              <button
                onClick={pageHistoryBack}
                className='absolute flex justify-center items-center w-[40px] h-[40px] icon-form left-[24px]'>
                <Image src={`/images/icon-svg/arrow-left-light.svg`} width={24} height={24} alt='arrow-left' className='opacity-60' />
              </button>
              <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                Privacy Policy
              </Typography>
            </div>
            <CardContent className='grid gap-[16px] grid-cols-1 px-[24px] pt-[32px] pb-[40px] text-left'>
              <Typography gutterBottom variant="h3" className='m-0 font-bold text-[20px] md:text-[24px] text-[#D2D2D5]'>
                Privacy Policy
              </Typography>
              {items.map((item, index) => {
                return (
                  <Typography key={index} gutterBottom className='text-[16px] text-[#D2D2D5]'>
                    {item.content}
                  </Typography>
                )
              })}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Policy;