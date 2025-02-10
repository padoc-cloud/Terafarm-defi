"use client";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Card, Button, Skeleton } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import "@/styles/farming.css";
import { useAccount, usePublicClient } from "wagmi";
import {
  getNftStakedTokensByTokens,
  getNFTtokensByAddress,
} from "@/libs/PoolInfo";
import { NFTmetadata } from "@/types/nft";
import useLpstake from "@/hooks/useLpStake";
import PriceDisplay from "@/components/Common/PriceDisplay";
import {
  TERAC_TOKEN,
  ETH_TOKEN,
  NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
} from "@/libs/constants";
import CompletedModal from "@/components/Modal/Completed";
import FailedModal from "@/components/Modal/Failed";
import { ITransactionDetail } from "@/types/transaction";
import { transUTCFormat } from "@/utils/dateformat";
import { config } from "@/config/wagmi";
import { MessageItem } from "@/types/menu";
import { useSocket } from "@/contexts/SocketContext";
import { generateUUID } from "@/utils/uuid";

const Farming: React.FC = () => {
  const [select, setSelect] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [selectAddress, setSelectAddress] = useState(0);
  const [switched, setSwitched] = useState(false);
  const [filterData, setFilterData] = useState<NFTmetadata[]>([]);
  const [stakeButtonText, setStakeButtonText] = useState<string>("Stake NFT");
  const [poolInfo, setPoolInfo] = useState<NFTmetadata>({} as NFTmetadata);
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [unClaimedReward, setunCaimedReward] = useState<number>(0);
  const [actionState, setActionState] = useState<boolean>(false);
  const [stakedTokenIds, setStakedTokenIds] = useState<number[]>([]);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<ITransactionDetail>(
    {} as ITransactionDetail,
  );
  const client = usePublicClient({
    config,
  });
  const [openFailedModal, setOpenFailedModal] = useState<boolean>(false);
  const { socket } = useSocket();

  const {
    stake,
    unstake,
    getReward,
    getStakedTokens,
    harvest,
    reset,
    error,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
  } = useLpstake();

  const getStakedToken = React.useCallback(async () => {
    const result = (await getStakedTokens(
      `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`,
    )) as any[];
    const ids = Array.isArray(result[3]) ? result[3] : [];
    setStakedTokenIds(ids as []);
  }, [getStakedTokens]);

  const getrewardunClaimed = React.useCallback(async () => {
    if (!process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS) return;
    const res = await getReward(
      `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`,
    );
    setunCaimedReward(Number(res));
  }, [getReward]);

  const handleModal = (state: boolean) => {
    setOpenSuccessModal(state);
  };
  const handleFailedModal = (state: boolean) => {
    setOpenFailedModal(state);
  };

  const sendMessage = React.useCallback((item: MessageItem) => {
    if (socket) {
      socket.emit('message', item);
    }
  }, [socket]);

  const tokenSelect = (param: string) => {
    setSelect(param);
  };

  React.useEffect(() => {
    if (select == "") {
      setPoolInfo({} as NFTmetadata);
    } else {
      for (let index = 0; index < filterData.length; index++) {
        const element = filterData[index];
        if (element.id == select) {
          setPoolInfo({
            ...element,
            wethAddress: ETH_TOKEN.address,
            SLPAddress: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
          });
          break;
        }
      }
    }
  }, [select]);

  function reduceWallet(str?: string | undefined) {
    if (str === undefined) {
      return "";
    }
    if (str.length <= 10) {
      return str;
    }
    const front = str.slice(0, 10);
    const back = str.slice(-6);
    return `${front}.....${back}`;
  }

  const copyToClipboard = async (text: string, index: number) => {
    setSelectAddress(index);
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#65C466",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#2ECA45",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitched(event.target.checked);
  };

  const getFilteredData = React.useCallback(async () => {
    const ress = await getNFTtokensByAddress(address as `0x${string}`);
    setFilterData(ress);
    setSelect("");
    setLoading(false);
  }, [address]);

  const getStakedDataq = React.useCallback(async () => {
    const ress = await getNftStakedTokensByTokens(stakedTokenIds as []);
    setFilterData(ress);
    setSelect("");
    setLoading(false);
  }, [stakedTokenIds]);

  React.useEffect(() => {
    const getTransReceit = async (type: string) => {
      getrewardunClaimed();
      if (type == "Stake") getFilteredData();
      else getStakedDataq();
      const result = await client.getTransactionReceipt({
        hash: hash as `0x${string}`,
      });
      if (result.status == "success") {
        const smsg: MessageItem = {
          id: generateUUID(),
          address: address as string,
          message: `${type == "Stake" ? "deposited" : "unstaked"} a LP token`,
          fields: "farming",
        };
        sendMessage(smsg)

        const timing = new Date();
        const data: ITransactionDetail = {
          amount: String(1),
          date: transUTCFormat(timing.toUTCString()),
          type: type,
          status: result.status,
        };
        setSuccessData(data);
        reset();
        setOpenSuccessModal(true)
      } else {
        reset();
        setOpenFailedModal(true);
      }
    }

    if (actionState) {
      if (switched) {
        // unstaking 
        if ((isPending || isConfirming) && !error) {
          setStakeButtonText("Unstaking...");
        } else if (isConfirmed || error) {
          if (!error) getTransReceit("Unstake");
          setStakeButtonText("Unstake NFT");
          getStakedToken();
          setSelect("");
        }
      } else {
        // staking
        if ((isPending || isConfirming) && !error) {
          setStakeButtonText("Staking...");
        } else if (isConfirmed || error) {
          if (!error) getTransReceit("Stake");
          setStakeButtonText("Stake NFT");
          getStakedToken();
          setSelect("");
        }
      }
    } else {
      if (isConfirmed) {
        getrewardunClaimed();
      }
    }
  }, [isPending, isConfirmed, isConfirming, switched, actionState, error, hash, client, reset, sendMessage, address, getStakedDataq, getFilteredData]);

  const stakeButtonHandler = async () => {
    if (select == "") return;
    setActionState(true);
    if (switched) {
      // unstake
      await unstake(
        `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`,
        BigInt(select),
      );
    } else {
      // stake
      await stake(
        `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`,
        `0x${process.env.NEXT_PUBLIC_NFT_TOKEN_ADDRESS}`, // stake
        BigInt(select), // static data
      );
    }
  };

  const harvestHander = async () => {
    setActionState(false);
    if (unClaimedReward > 0) {
      await harvest(`0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    if (switched) {
      getStakedDataq();
      setStakeButtonText("Unstake NFT");
    } else {
      getFilteredData();
      setStakeButtonText("Stake NFT");
    }
  }, [switched, getFilteredData, getStakedDataq]);

  React.useEffect(() => {
    getrewardunClaimed();
    setInterval(() => {
      getrewardunClaimed();
    }, 1000 * 60);
  }, []);

  React.useEffect(() => {
    getStakedToken();
  }, []);

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
              Farming Lp
            </Typography>
          </div>
          <CardContent className="px-[24px]  pt-[32px]">
            <div className="mb-[10px] flex w-full items-center justify-end">
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                className="m-0 text-[16px] font-bold text-[#D2D2D5]"
              >
                Unstaked
              </Typography>
              <IOSSwitch
                sx={{ m: 1 }}
                checked={switched}
                onChange={handleChange}
                disabled={(isPending || isConfirming) && !error}
              />
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                className="m-0 text-[16px] font-bold text-[#D2D2D5]"
              >
                Staked
              </Typography>
            </div>
            <div className="card-form-bg mb-[20px]">
              <ul className="grid flex-col gap-[16px]">
                {!loading ? (
                  filterData.length > 0 ? (
                    filterData.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => tokenSelect(item.id)}
                      >
                        <li
                          className={`sub-card-farm flex justify-between rounded-[8px] border-b-[1px] border-l-[0.25px] border-r-[0.25px] border-t-[0.25px] px-[14px] py-[24px]
                        ${select === item.id ? "border-b-[#224E21] border-l-[#3A873A] border-r-[#224E21] border-t-[#3A873A]" : "sub-card-farm-border"}`}
                        >
                          <Typography
                            gutterBottom
                            variant="h3"
                            component="div"
                            className="m-0 flex p-0"
                          >
                            {/* <span className='text-[14px] md:text-[18px] text-[#D2D2D5]' >LP TOKEN : &nbsp;</span> */}
                            <span className="text-[14px] text-[#A5A5AB] md:text-[18px]">
                              {item.name || "Uniswap - 0.3% - USDT/WETH"}
                            </span>
                          </Typography>
                          {select === item.id ? (
                            <Image
                              src="/images/icon-svg/select-check.svg"
                              width={24}
                              height={24}
                              alt="selected-check"
                            />
                          ) : (
                            <Image
                              src="/images/icon-svg/nomal-check.svg"
                              width={24}
                              height={24}
                              alt="selected-check"
                            />
                          )}
                        </li>
                      </button>
                    ))
                  ) : (
                    <div className="text-center text-[#D2D2D5]">
                      No LP tokens found.
                    </div>
                  )
                ) : (
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={"35px"}
                    sx={{ backgroundColor: "rgba(255, 255, 255, .2)" }}
                  />
                )}
              </ul>
            </div>
            <div className="btn-form mb-[30px] grid flex-col gap-[16px]">
              <Button
                variant="contained"
                size="small"
                className="my-auto w-full rounded-full py-[15px]  text-[16px] text-white"
                sx={{
                  background:
                    "linear-gradient(191.21deg, rgba(188, 35, 11, 0.2) -137.64%, rgba(112, 15, 1, 0.2) 119.38%) !important",
                  border: "0.5px solid rgba(255, 255, 255, 0.1) !important",
                }}
                onClick={stakeButtonHandler}
                disabled={select == ""}
              >
                {stakeButtonText}
              </Button>
              {/* {error && (
                <div className='text-white'>Error: {(error as BaseError).shortMessage || error.message}</div>
              )} */}
              <Button
                variant="contained"
                className="my-auto w-full rounded-full  py-[15px] text-[16px] text-white"
                sx={{
                  background:
                    "linear-gradient(191.21deg, #BC230B -137.64%, #700F01 119.38%) !important",
                }}
                onClick={harvestHander}
                disabled={unClaimedReward == 0 || isPending || isConfirming}
              >
                Harvest ({" "}
                <PriceDisplay
                  value={unClaimedReward}
                  decimals={TERAC_TOKEN.decimals}
                />{" "}
                TERAC )
              </Button>
            </div>
            <div className="grid gap-[24px] text-left">
              <Typography
                gutterBottom
                variant="h3"
                className="text-[20px] font-bold text-[#E9E9EA] md:text-[24px]"
              >
                Pool & Contract Details
              </Typography>
              <div className="grid flex-col gap-[16px]">
                <div className="sub-card flex items-center justify-between rounded-[8px] p-[16px]">
                  <div className="w-3/5 md:w-3/4">
                    <span className="text-[14px] text-[#D2D2D5] md:text-[18px]">
                      Pool Address : &nbsp;
                    </span>
                    <span className="text-[12px] text-[#A5A5AB] md:text-[14px]">
                      {reduceWallet(poolInfo.poolAddress)}
                    </span>
                  </div>
                  <button
                    className=""
                    onClick={() =>
                      copyToClipboard(poolInfo.poolAddress as string, 0)
                    }
                  >
                    {isCopied && selectAddress === 0 ? (
                      <div className="flex">
                        <span className="mr-[10px] text-[12px] text-[#D2D2D5]">
                          Copied!
                        </span>
                        <Image
                          src="/images/icon-svg/copy.svg"
                          width={20}
                          height={20}
                          alt="icon"
                          className="text-white"
                        />
                      </div>
                    ) : (
                      <Image
                        src="/images/icon-svg/copy.svg"
                        width={20}
                        height={20}
                        alt="icon"
                        className="text-white opacity-60"
                      />
                    )}
                  </button>
                </div>
                <div className="sub-card flex items-center justify-between rounded-[8px] p-[16px]">
                  <div className="w-3/5 md:w-3/4">
                    <span className="text-[14px] text-[#D2D2D5] md:text-[18px]">
                      SLP Address : &nbsp;
                    </span>
                    <span className="text-[12px] text-[#A5A5AB] md:text-[14px]">
                      {reduceWallet(poolInfo.SLPAddress)}
                    </span>
                  </div>
                  <button
                    className=""
                    onClick={() =>
                      copyToClipboard(poolInfo.SLPAddress as string, 1)
                    }
                  >
                    {isCopied && selectAddress === 1 ? (
                      <div className="flex">
                        <span className="mr-[10px] text-[12px] text-[#D2D2D5]">
                          Copied!
                        </span>
                        <Image
                          src="/images/icon-svg/copy.svg"
                          width={20}
                          height={20}
                          alt="icon"
                          className="text-white"
                        />
                      </div>
                    ) : (
                      <Image
                        src="/images/icon-svg/copy.svg"
                        width={20}
                        height={20}
                        alt="icon"
                        className="text-white opacity-60"
                      />
                    )}
                  </button>
                </div>
                <div className="sub-card flex items-center justify-between rounded-[8px] p-[16px]">
                  <div className="w-3/5 md:w-3/4">
                    <span className="text-[14px] text-[#D2D2D5] md:text-[18px]">
                      WETH Address : &nbsp;
                    </span>
                    <span className="text-[12px] text-[#A5A5AB] md:text-[14px]">
                      {reduceWallet(poolInfo.wethAddress)}
                    </span>
                  </div>
                  <button
                    className=""
                    onClick={() =>
                      copyToClipboard(poolInfo.wethAddress as string, 2)
                    }
                  >
                    {isCopied && selectAddress === 2 ? (
                      <div className="flex">
                        <span className="mr-[10px] text-[12px] text-[#D2D2D5]">
                          Copied!
                        </span>
                        <Image
                          src="/images/icon-svg/copy.svg"
                          width={20}
                          height={20}
                          alt="icon"
                          className="text-white"
                        />
                      </div>
                    ) : (
                      <Image
                        src="/images/icon-svg/copy.svg"
                        width={20}
                        height={20}
                        alt="icon"
                        className="text-white opacity-60"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-center">
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  className="mb-[8px] text-[14px]"
                >
                  <span className="text-[#D2D2D5]">Fee Tier : &nbsp;</span>
                  <span className="text-[#377E36]">{poolInfo.feeTier}</span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  className="text-[14px]"
                >
                  <span className="text-[#D2D2D5]">Token ID : &nbsp;</span>
                  <span className="text-[#377E36]">{select}</span>
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
        <CompletedModal
          open={openSuccessModal}
          handleOpen={handleModal}
          data={successData}
        />
        <FailedModal
          open={openFailedModal}
          handleOpen={handleFailedModal}
          data={{}}
          href="/staking"
        />
      </div>
    </div>
  );
};

export default Farming;
