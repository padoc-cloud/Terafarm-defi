"use client";

import React, { useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Card, Button } from "@mui/material";
import { parseUnits } from "viem";
import { usePublicClient, useAccount, type BaseError } from "wagmi";

import { CurrencyFormat } from "@/utils/Currency";
import { useStake } from "@/hooks/useStake";
import CompletedModal from "@/components/Modal/Completed";
import FailedModal from "@/components/Modal/Failed";
import { ITransactionDetail } from "@/types/transaction";
import { transUTCFormat } from "@/utils/dateformat";
import PriceDisplay from "@/components/Common/PriceDisplay";
import { MessageItem } from "@/types/menu";
import { useSocket } from "@/contexts/SocketContext";
import { generateUUID } from "@/utils/uuid";

import { GYNX_TOKEN, TERAC_TOKEN } from "@/libs/constants";
import { config } from "@/config/wagmi";
import TeracAbi from "@/config/abi/terac.abi.json";
import StakingAbi from "@/config/abi/staking.abi.json";

import "@/styles/staking.css";

const Staking: React.FC = () => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [unstakeAmount, setUnstakeAmount] = useState<number>(0);
  const [context, setContext] = useState<string>("Stake");
  const [context2, setContext2] = useState<string>("Unstake");
  const [actionState, setActionState] = useState<number>(0);
  const [terac_balace, setTeracBalace] = useState<number>(0);
  const [teracStakedBalance, setTeracStakedBalance] = useState<number>(0);
  const [rewardAmount, setRewardAmount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openFailedModal, setOpenFailedModal] = useState<boolean>(false);
  const [actionAmount, setActionAmount] = useState<number>(0);
  const [successData, setSuccessData] = useState<ITransactionDetail>(
    {} as ITransactionDetail,
  );

  const { address } = useAccount();

  const client = usePublicClient({ config });

  const {
    stake,
    unstake,
    harvest,
    reset,
    getReward,
    apprReset,
    error,
    isError,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    apprPending,
    apprConfirming,
    apprConfirmed,
    apprErr,
    apprHash,
  } = useStake();
  
  const { socket } = useSocket();

  const getRewards = useCallback(async () => {
    try {
      if (isPending || isConfirming) return;
      const result = await getReward(
        `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`,
      );
      setRewardAmount(Number(result));
    } catch (error) {
      console.log("get reward method error - ", error);
    }
  }, [isPending, isConfirming, getReward]);

  const sendMessage = useCallback((item: MessageItem) => {
    if (socket) {
      socket.emit('message', item);
    }
  }, [socket]);

  const balance = useCallback(async () => {
    if (!address) return;

    const result = await client.readContract({
      address: `0x${process.env.NEXT_PUBLIC_TERAC_CONTRACT_ADDRESS}`,
      abi: TeracAbi,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    });
    const balances = BigInt(result as any) / BigInt(10 ** TERAC_TOKEN.decimals);
    setTeracBalace(Number(String(balances)));

    const stakedBalance = (await client.readContract({
      address: `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`,
      abi: StakingAbi,
      functionName: "users",
      args: [address as `0x${string}`],
    })) as BigInt[];
    const balances2 =
      BigInt(stakedBalance[0] as any) / BigInt(10 ** TERAC_TOKEN.decimals);
    setTeracStakedBalance(Number(String(balances2)));
  }, [address, client]);

  const setStakeMaxHandler = () => {
    setStakeAmount(terac_balace);
  };

  const setUnstakeMaxHandler = () => {
    setUnstakeAmount(teracStakedBalance);
  };

  const staking = async () => {
    reset();
    apprReset();
    if (stakeAmount > 0) {
      setActionState(0);
      setContext("Staking...");
      await stake(
        `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`,
        TERAC_TOKEN.address,
        parseUnits(String(stakeAmount), TERAC_TOKEN.decimals),
      );
    }
  };

  const unstaking = async () => {
    reset();
    apprReset();
    if (unstakeAmount > teracStakedBalance) return;
    if (unstakeAmount > 0) {
      setActionState(1);
      setContext2("Unstaking...");
      await unstake(
        `0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`,
        parseUnits(String(unstakeAmount), TERAC_TOKEN.decimals),
      );
    }
  };

  const handleModal = (state: boolean) => {
    setOpen(state);
  };

  const handleFailedModal = (state: boolean) => {
    setOpenFailedModal(state);
  };

  const claim = async () => {
    reset();
    apprReset();
    if (rewardAmount == 0) return;
    setActionState(2);
    await harvest(`0x${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`);
  };

  useEffect(() => {
    if ((isError || error) && actionState == 0) {
      setContext("Stake");
      setActionAmount(stakeAmount);
    } else if ((isError || error) && actionState == 1) {
      setContext2("Unstake");
      setActionAmount(unstakeAmount);
    }
    if ((isPending || isConfirming) && actionState === 0) {
      setContext("Staking...");
    } else if ((isPending || isConfirming) && actionState === 1) {
      setContext2("Unstaking...");
    } else if ((isConfirmed || error) && actionState === 0) {
      setContext("Stake");
      setActionAmount(stakeAmount);
    } else if ((isConfirmed || error) && actionState === 1) {
      setContext2("Unstake");
      setActionAmount(unstakeAmount);
    }
    if ((apprPending || apprConfirming) && actionState === 0) {
      setContext("Approving...");
    } else if ((apprPending || apprConfirming) && actionState === 1) {
      setContext2("Approving...");
    } else if (
      (!isPending || !isConfirming) &&
      (apprConfirmed || apprErr) &&
      actionState === 1
    ) {
      setContext2("Unstake");
    } else if (
      (!isPending || !isConfirming) &&
      (apprConfirmed || apprErr) &&
      actionState === 0
    ) {
      setContext("Stake");
    }
    if (isConfirmed) {
      balance();
      getRewards();
    }
  }, [
    isPending,
    actionState,
    balance,
    unstakeAmount,
    stakeAmount,
    apprPending,
    apprConfirming,
    apprConfirmed,
    isConfirming,
    isConfirmed,
    apprErr,
    error,
    isError,
    apprHash,
    getRewards
  ]);

  useEffect(() => {
    const trans = async () => {
      const aaa = actionState == 0 ? stakeAmount : unstakeAmount;
      try {
        const result = await client.getTransactionReceipt({
          hash: hash as `0x${string}`,
        });
        if (result.status == "success") {
          const smsg: MessageItem = {
            id: generateUUID(),
            address: address as string,
            message: `${actionState == 0 ? "staked TERAC for GYNX token" : "unstaked TERAC token in Staking"}`,
            fields: "staking",
          };
          sendMessage(smsg)
          reset();
          apprReset();
          const timing = new Date();
          const data: ITransactionDetail = {
            amount: String(aaa),
            date: transUTCFormat(timing.toUTCString()),
            type: actionState == 0 ? "Stake" : "Unstake",
            status: result.status,
          };
          setSuccessData(data);
          setOpen(true);  // modal open
        } else {
          reset();
          apprReset();
          setOpenFailedModal(true);
        }

        if (actionState === 0) {
          setStakeAmount(0);
        } else {
          setUnstakeAmount(0);
        }
      } catch (error) {
        reset();
        apprReset();
        setOpen(false);
        setOpenFailedModal(false);
      }
    };
    if (isConfirmed && actionState != 2) {
      trans();
    }
  }, [
    isConfirmed,
    hash,
    actionAmount,
    actionState,
    apprReset,
    client,
    reset,
    stakeAmount,
    unstakeAmount,
    sendMessage,
    address,
  ]);

  useEffect(() => {
    getRewards();
    setInterval(() => {
      getRewards();
    }, 1000 * 60);
    if (address && (!terac_balace || !teracStakedBalance)) balance();
  }, [getRewards, address, balance, teracStakedBalance, terac_balace]);

  return (
    <div className="mb-[30px] mt-[130px] flex w-full grow items-center justify-center text-black dark:text-white">
      <div className="flex w-full grow items-center justify-center">
        <Card
          sx={{
            width: 540,
            textAlign: "center",
          }}
          className={`card justify-between rounded-[16px] border-[#FFFFFF1A]  lg:rounded-[32px] `}
        >
          <div className="card-header lg:rounded-t1-[32px] relative items-center rounded-tl-[16px] rounded-tr-[16px] px-[24px] py-[18px] text-center lg:rounded-tr-[32px]">
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              className="m-0 text-[20px] font-bold text-white md:text-[24px]"
            >
              Staking TERAC
            </Typography>
          </div>
          <CardContent className="p-0 px-[24px] py-[32px]">
            <div className="stake-form text-left">
              <div className="flex flex-col gap-6 py-[10px]">
                <div className="sub-card flex h-2/4 flex-col items-center gap-[16px] rounded-[8px]  px-[16px] pb-[20px] lg:rounded-[16px] ">
                  <div className="w-full text-left">
                    <Typography
                      gutterBottom
                      variant="h5"
                      className=" mt-[20px] text-[20px] font-bold text-[#E9E9EA]"
                    >
                      Amount to Stake : {CurrencyFormat(stakeAmount as any)}
                    </Typography>
                  </div>
                  <div className="flex  w-full flex-col items-center">
                    <div className="mb-[4px] w-full text-right">
                      <Typography
                        gutterBottom
                        variant="body1"
                        className="bg-gradient-to-r from-[#4EB44D] to-[#224E21] bg-clip-text text-[12px] font-[400] text-transparent"
                      >
                        Available Balance: {CurrencyFormat(terac_balace as any)}{" "}
                        TERAC
                      </Typography>
                    </div>
                    <div className="action-form mt-[10px] flex w-full items-center justify-between rounded-[8px] px-[16px] py-[20px] md:mt-0">
                      <input
                        placeholder="Enter amount"
                        className="mr-[20px] w-full border-none bg-transparent px-[5px] text-[14px] text-[#777980] outline-none"
                        type="number"
                        value={String(stakeAmount).replace("+", "") || ""}
                        onChange={(event) => {
                          setStakeAmount(
                            Math.abs(Number(event.target.value)) || 0,
                          );
                        }}
                        min={0}
                        max={terac_balace}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        className="btn-max rounded-[4px] px-[12px] py-[7px] text-[10px]  text-white"
                        sx={{
                          background:
                            "linear-gradient(180deg, #4EB44D 0%, #224E21 100%) !important",
                          border:
                            "0.5px solid rgba(255, 255, 255, 0.1) !important",
                        }}
                        onClick={setStakeMaxHandler}
                      >
                        Max
                      </Button>
                    </div>
                    <div className="mb-[4px] w-full pl-1 text-right">
                      <Typography
                        gutterBottom
                        variant="body1"
                        className="text-left text-[13px] font-[400] text-red-300 "
                      >
                        {stakeAmount > terac_balace
                          ? "Input amount is bigger than your TERAC balance."
                          : ""}
                      </Typography>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    className="mx-auto mt-[10px] w-[160px] rounded-full px-[16px] py-[10px]  text-[16px] text-white"
                    sx={{
                      background:
                        "linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important",
                      border: "0.5px solid rgba(255, 255, 255, 0.1) !important",
                    }}
                    onClick={staking}
                    disabled={context.includes("ing") || (stakeAmount > terac_balace) || (stakeAmount == 0)}
                  >
                    {context}
                  </Button>
                  {/* {error && (actionState === 0) && showMessage && (
                    <div className='text-white'>{showMessage}</div>
                  )} */}
                </div>
                <div className="sub-card flex h-2/4 flex-col items-center gap-[16px] rounded-[8px]  px-[16px] pb-[20px] lg:rounded-[16px] ">
                  <div className="w-full text-left">
                    <Typography
                      gutterBottom
                      variant="h5"
                      className=" mt-[20px] text-[20px] font-bold text-[#E9E9EA]"
                    >
                      Unstake TERAC : {CurrencyFormat(unstakeAmount as any)}
                    </Typography>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="mb-[4px] w-full text-right">
                      <Typography
                        gutterBottom
                        variant="body1"
                        className="bg-gradient-to-r from-[#4EB44D] to-[#224E21] bg-clip-text text-[12px] font-[400] text-transparent"
                      >
                        Staked Balance:{" "}
                        {CurrencyFormat(teracStakedBalance as any)} TERAC
                      </Typography>
                    </div>
                    <div className="action-form mt-[10px]  flex w-full items-center justify-between rounded-[8px] px-[16px] py-[20px] md:mt-0">
                      <input
                        placeholder="Enter amount"
                        type="number"
                        className="mr-[20px] w-full border-none bg-transparent px-[5px] text-[14px] text-[#777980] outline-none"
                        value={String(unstakeAmount).replace("+", "") || ""}
                        onChange={(event) => {
                          setUnstakeAmount(
                            Math.abs(Number(event.target.value)) || 0,
                          );
                        }}
                        min={0}
                        max={teracStakedBalance}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        className="btn-max rounded-[4px] px-[12px] py-[7px] text-[10px]  text-white"
                        sx={{
                          background:
                            "linear-gradient(180deg, #4EB44D 0%, #224E21 100%) !important",
                          border:
                            "0.5px solid rgba(255, 255, 255, 0.1) !important",
                        }}
                        onClick={setUnstakeMaxHandler}
                      >
                        Max
                      </Button>
                    </div>
                    <div className="mb-[4px] w-full pl-1 text-right">
                      <Typography
                        gutterBottom
                        variant="body1"
                        className="text-left text-[13px] font-[400] text-red-300 "
                      >
                        {unstakeAmount > teracStakedBalance
                          ? "Input amount is bigger than your staked balance."
                          : ""}
                      </Typography>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    className="mx-auto mt-[10px] w-[160px] rounded-full px-[16px] py-[10px]  text-[16px] text-white"
                    sx={{
                      background:
                        "linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important",
                      border: "0.5px solid rgba(255, 255, 255, 0.1) !important",
                    }}
                    disabled={context2.includes("ing") || (unstakeAmount > teracStakedBalance) || (unstakeAmount == 0)}
                    onClick={unstaking}
                  >
                    {context2}
                  </Button>
                  {/* {error && (actionState === 1) && (
                    <div className='text-white text-center'>{showMessage}</div>
                  )} */}
                </div>
                <Button
                  variant="contained"
                  size="small"
                  className="mx-auto mt-[10px] rounded-full px-[20px] py-[10px]  text-[16px] text-white"
                  sx={{
                    background:
                      "linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important",
                    border: "0.5px solid rgba(255, 255, 255, 0.1) !important",
                  }}
                  onClick={claim}
                  disabled={rewardAmount == 0}
                >
                  {(isPending || isConfirming) && actionState == 2 ? (
                    "Claiming..."
                  ) : (
                    <>
                      Claim&nbsp;&nbsp;
                      <span className="text-[14px]">
                        ({" "}
                        <PriceDisplay
                          value={rewardAmount}
                          decimals={GYNX_TOKEN.decimals}
                        />{" "}
                        GYNX )
                      </span>
                    </>
                  )}
                </Button>
                {/* {error && (actionState === 2) && (
                  <div className='text-white text-center'>{showMessage}</div>
                )} */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <CompletedModal open={open} handleOpen={handleModal} data={successData} />
      <FailedModal
        open={openFailedModal}
        handleOpen={handleFailedModal}
        data={{}}
        href="/staking"
      />
    </div>
  );
};

export default Staking;
