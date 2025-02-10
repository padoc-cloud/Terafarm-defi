"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card, Button } from '@mui/material';
import { getTokenLogoURL } from "@/utils/CurrencyLogo";
import { getPoolInfoByAddressWithToken } from "@/libs/pool";
import "@/styles/liquidity.css";

const Liquidity: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);

  useEffect(() => {
    const getPools = async () => {
      const data = await getPoolInfoByAddressWithToken();
      setPools(data)
    }
    getPools()
  }, []);

  const isNativeToken = (token: any) => {
    if (token == '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') {
      return "ETH"
    } else return token;
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
                Liquidity Positions
              </Typography>
            </div>
            <CardContent className='p-0  px-[24px]'>
              <ul className='h-[350px] overflow-auto scrollable '>
                {pools.map((item: any, index) => (
                  <li key={index} className='flex justify-between item-list items-center py-[15px] bg-transparent'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center token-icon-group'>
                        <Image className="rounded-full" width={40} height={40} priority src={getTokenLogoURL({ address: item['tokenA']['address'], chainId: item['tokenA']['chainId'] })} alt={`Image for`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                        />
                        {/* <img src={getTokenLogoURL({ address: item['tokenA']['address'] , chainId: item['tokenA']['chainId']})} width={40} height={40} alt="Image" className='rounded-full' /> */}
                        <div className='token-right-image'>
                          <Image width={40} className="rounded-full" height={40} priority src={getTokenLogoURL({ address: item['tokenB']['address'], chainId: item['tokenB']['chainId'] })} alt={`Image for`}
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                          />
                          {/* <img src={getTokenLogoURL({ address: item['tokenB']['address'], chainId: item['tokenB']['chainId'] })} width={40} height={40} alt="Image" className='rounded-full' /> */}
                        </div>
                      </div>

                      <span className='text-[#A5A5AB] text-[14px] sm:text-[16px] ml-0 sm:ml-2'>{item['tokenA']['symbol']} - {item['tokenB']['symbol']}</span> {/* Assuming item has a name property */}
                    </div>
                    <div className="flex li-btn-form">
                      <a 
                      href={`https://app.uniswap.org/add/${isNativeToken(item['tokenA']['address'])}/${isNativeToken(item['tokenB']['address'])}`} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="contained"
                          size="small"
                          className='float-right add-button px-[5px] sm:px-[15px] py-[8px] text-[14px] md:text-[16px]  text-white rounded-full'
                          sx={{
                            background: 'linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important',
                            border: '0.5px solid rgba(255, 255, 255, 0.1) !important'
                          }}
                        >
                          Add
                        </Button>
                      </a>
                      <a 
                        href={`https://app.uniswap.org/add/${isNativeToken(item['tokenA']['address'])}/${isNativeToken(item['tokenB']['address'])}`} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="contained"
                          size="small"
                          className='float-right px-[5px] sm:px-[15px] ml-[5px] sm:ml-[15px] py-[8px] text-[14px] md:text-[16px]  text-white rounded-full'
                          sx={{
                            background: 'linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important',
                            border: '0.5px solid rgba(255, 255, 255, 0.1) !important'
                          }}
                        >
                          Modify
                        </Button>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
export default Liquidity;