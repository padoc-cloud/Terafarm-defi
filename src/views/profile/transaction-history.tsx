"use client";
import * as React from 'react';
import { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Card, Button } from '@mui/material';
import { useRouter } from "next/navigation";
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Calendar } from 'react-multi-date-picker';
import { fetchTransactionInfo } from '@/libs/transactionInfo';
import "@/styles/profile.css";
import { useAccount } from 'wagmi';
import { ITransactionItem } from "@/types/transaction"
import { transUTCFormat } from "@/utils/dateformat";

const TransactionHistory: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();

  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [filterData, setFilterData] = useState<ITransactionItem[]>([]);
  const [dates, setDates] = useState<(Date | null)[]>([null, null]);
  const [open, setOpen] = React.useState(false);

  const pageHistoryBack = () => {
    router.push('/profile');
  }

  const TransactionHistories = useMemo(async () => {
    const data = await fetchTransactionInfo(address as string);
    const temp: ITransactionItem[] = [];
    
    for (let i = 0; i < data.result.length; i++) {
      const trans: ITransactionItem = data.result[i];
      if (trans.to?.toLowerCase() == `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`.toLowerCase() && trans.functionName?.includes('harvest')) {
        temp.push({  // harvest in farming
          ...trans,
          field: "farming",
          tokenAddress: `0x${process.env.NEXT_PUBLIC_TERAC_CONTRACT_ADDRESS}`,
          tokenName: 'TERAC',
          InOut: true
        })
      } else if (trans.to?.toLowerCase() == `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`.toLowerCase() || (trans.to?.toLowerCase() == `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`.toLowerCase() && trans.functionName?.includes('unstake'))) {
        temp.push({ // stake or unstake in farming
          ...trans,
          field: "farming",
          tokenAddress: `0x${process.env.NEXT_PUBLIC_NFT_TOKEN_ADDRESS}`,
          tokenName: 'UNISWAP V3 POOL',
          InOut: trans.functionName?.includes('unstake')
        })
      } else if (trans.to?.toLowerCase() == `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`.toLowerCase() && trans.functionName?.includes("claimReward")) {
        temp.push({  // claimReward in staking
          ...trans,
          field: "staking",
          tokenAddress: `0x${process.env.NEXT_PUBLIC_GYNX_CONTRACT_ADDRESS}`,
          tokenName: 'GYNX',
          InOut: true
        })
      } else if (trans.to?.toLowerCase() == `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`.toLowerCase() || (trans.to?.toLowerCase() == `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`.toLowerCase() && trans.functionName?.includes("unstake"))) {
        temp.push({  // unstake or stake in staking
          ...trans,
          field: "staking",
          tokenAddress: `0x${process.env.NEXT_PUBLIC_TERAC_CONTRACT_ADDRESS}`,
          tokenName: 'TERAC',
          InOut: trans.functionName?.includes("unstake")
        })
      }
    }
    return temp;
  }, [address]);

  const filterItemsByDateRange = () => {
    const start = new Date(String(startDate) + " 00:00:00").getTime();
    const end = new Date(String(endDate) + " 23:59:59").getTime();
    TransactionHistories.then(item => {
      const filteredItems = item.filter((item) => {
        const itemDate = new Date(parseInt(item.timeStamp) * 1000).getTime();
        if (itemDate >= start && itemDate <= end) return item;
      });
      setFilterData(filteredItems);
    })
  };

  const handleConfirm = () => {
    filterItemsByDateRange();
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (value: any) => {
    setDates(value);
    if (Array.isArray(value) && value.length === 2) {
      setStartDate(value[0].format('YYYY-MM-DD'));
      setEndDate(value[1].format('YYYY-MM-DD'));
    }
  };

  useEffect(() => {
    const getTransHistory = async () => {
      TransactionHistories.then(async (res) => {
        setFilterData(res);
      })
    }
    getTransHistory();
  }, [address, TransactionHistories])

  return (
    <div className="flex items-center justify-center grow w-full text-black dark:text-white mt-[130px] mb-[30px]">
      <div className="container">
        <div className='flex items-center justify-center grow w-full'>
          <Card
            sx={{
              width: 540,
              textAlign: 'center',
            }}
            className={`card justify-between border-[#FFFFFF1A] rounded-[16px] lg:rounded-[32px] `}
          >

            <div className='relative items-center card-header py-[18px] px-[24px] text-center rounded-tl-[16px] rounded-tr-[16px] lg:rounded-t1-[32px] lg:rounded-tr-[32px]'>
              <button
                onClick={pageHistoryBack}
                className='absolute flex justify-center items-center w-[40px] h-[40px] icon-form left-[24px]'>
                <Image src={`/images/icon-svg/arrow-left-light.svg`} width={24} height={24} alt='arrow-left' className='opacity-60' />
              </button>
              <Typography gutterBottom variant="h3" component="div" className='m-0 font-bold text-[20px] md:text-[24px] text-white'>
                Transaction History
              </Typography>
                <button
                  onClick={handleClickOpen}
                  aria-hidden="true"
                  className='absolute flex justify-center items-center w-[40px] h-[40px] icon-form right-[24px]'>
                  <Image src={`/images/icon-svg/calendar.svg`} width={24} height={24} alt='arrow-left' />
              </button>
            </div>
            <CardContent className='pt-[32px] pb-[40px] px-[24px]'>
              <ul className={`${filterData.length > 0 ? 'h-[500px] overflow-auto scrollable' : ''}`}>
                {filterData.length > 0 ? (
                  filterData && filterData.map((item, index) => (
                    <li key={index} className='sub-card rounded-[8px] flex justify-between mb-[14px] items-center px-[16px] py-[12px]'>
                      <div className='mb-[10px] sm:mb-0 justify-between flex items-center text-left'>
                        {/* <Image width={40} height={40} src={item.img} alt={`Image for ${item.img}`} /> */}
                        <div className='flex flex-col justify-between ml-[8px]'>
                          <h5 className='m-0 text-[14px] text-white'>{ item.InOut ? "+ " : "- " }{item.tokenName}</h5>
                          <span className='text-[#A5A5AB] text-[10px]'>{transUTCFormat(parseInt(item.timeStamp) * 1000)}</span>
                        </div>
                      </div>
                      <div className='w-[80px] sm:w-3/5 text-center sm:flex items-center justify-between'>
                        <span className='text-[#D2D2D5] float-right mb-[5px] sm:mb-0 text-[14px]'>{item.functionName.split("(")[0]}</span>
                        {item.txreceipt_status === '1' && (
                        <Chip
                          sx={{
                            width: 90,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '0.5px solid #ABEFC6 !important',
                            fontSize: 12,
                            color: '#067647'
                          }}
                          label="Success" color="primary" />
                      )}

                        {item.txreceipt_status !== '1' && (
                        <Chip
                          sx={{
                            width: 90,
                            background: 'rgba(254, 243, 242, 0.05)',
                            border: '0.5px solid #FECDCA !important',
                            fontSize: 12,
                            color: '#B42318'
                          }}
                          label="Fail" color="primary" />
                      )}

                        {item.txreceipt_status === 'Pending' && (
                        <Chip
                          sx={{
                            width: 90,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '0.5px solid #FEDF89 !important',
                            fontSize: 12,
                            color: '#B54708'
                          }}
                            label={item.txreceipt_status} color="primary" />
                      )}
                      </div>
                    </li>
                  ))
                ) : (
                  <div className='empty text-center flex flex-col justify-center'>
                    <Image src={`/images/profile/no-history.svg`} width={260} height={230} alt={`no-history`} className='mx-auto mt-[20px]' />
                    <p className='pt-[40px] pm-[32px] text-[#D2D2D5] text-[16px]'>You don&apos;t have any transactions yet. Start by providing liquidity or staking tokens.</p>
                  </div>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
        <Dialog open={open} onClose={handleClose} aria-hidden="true">
          <Calendar
            disableMonthPicker
            disableYearPicker
            range
            rangeHover
            className="custom-calender-style"
            maxDate={today}
            numberOfMonths={1}
            value={dates}
            onChange={handleDateChange}
          />
          <DialogActions
            sx={{ paddingTop: 0 }}
          >
            <Button
              onClick={handleClose} size='small'
              className='py-[5px] px-[20px] text-[12px] text-white rounded-full'
              aria-hidden="true"
              sx={{
                width: 70,
                background: 'rgba(254, 243, 242, 0.05)',
                border: '0.5px solid #FECDCA !important',
                fontSize: 12,
                color: 'red !important'
              }}
            >
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleConfirm}
              className='ml-[10px] py-[5px] px-[20px] text-[12px] text-white rounded-full'
              aria-hidden="true"
              sx={{
                width: 70,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '0.5px solid #ABEFC6 !important',
                fontSize: 12,
                color: '#067647 !important'
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default TransactionHistory;