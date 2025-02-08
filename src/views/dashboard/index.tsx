"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { Card, Tooltip } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  getPositionsDataByAddress,
  getPositionsCountByAddress,
} from "@/libs/positions";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
import { useAccount, useCall } from "wagmi";
import { parseCurrencyAmount, CurrencyFormat } from "@/utils/Currency";
import PriceDisplay from "@/components/Common/PriceDisplay";
import { GetBalances, GetStakedTeracBalance } from "@/libs/GetBalance";
import { dateTimeCalculator } from "@/utils/calculatingDateCompare";
import useLpTokenStake from "@/hooks/useLpStake";
import LiquidityPosition from "./lplist";
import { tokenItem } from "@/types/tokenItem";
import "@/styles/dashboard.scss";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Dashboard: React.FC = () => {
  const [showAmount, setShowAmount] = useState(false);
  const periods = ["1D", "1W", "1M", "1Y", "All"];
  const [alignment, setAlignment] = useState<string>("1D"); // Default value
  const [isClient, setIsClient] = useState(false);
  const [xdata, setXdata] = useState<number[]>([]);
  const [ydata, setYdata] = useState<number[]>([]);
  const { address } = useAccount();
  const [per, setper] = useState("1D");
  const [positions, setPositions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [tokenIndex, setTokenIndex] = useState<number | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [earnedState, setEarnedState] = useState<number>(0);
  const { getStakedTokens } = useLpTokenStake();
  const [StakedLPtokens, setStakedLPtokens] = useState<any[]>([]);

  const tokenData: tokenItem[] = GetBalances(address as `0x${string}`);
  const stakedTeracBalance = GetStakedTeracBalance(
    address as `0x${string}`,
  ) as any[];
  type PriceData = [number, number];

  const getStakedLpTokens = useCallback(async () => {
    const res = (await getStakedTokens(
      `0x${process.env.NEXT_PUBLIC_FARMING_CONTRACT_ADDRESS}`,
    )) as any[];
    const ids = Array.isArray(res[3]) ? res[3] : [];
    setStakedLPtokens(ids as []);
  }, []);

  useEffect(() => {
    if (address) {
      setLoading(true);
      getStakedLpTokens();
    }
  }, [address]);

  useEffect(() => {
    async function etherPrice() {
      var prams = "";
      if (per === "1D") {
        prams = "days=1";
      } else if (per === "1W") {
        prams = "days=7";
      } else if (per === "1M") {
        prams = "days=30";
      } else if (per === "1Y") {
        prams = "days=365";
      } else if (per === "All") prams = "days=max";

      const mainUrl = `https://pro-api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&${prams}&precision=5&x_cg_pro_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`;

      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      await fetch(mainUrl, options)
        .then((response) => response.json())
        .then((response) => {
          const timeData = response.prices.map((subArray: PriceData) => {
            const timestamp = subArray[0]; // Extract timestamp
            const date = new Date(timestamp); // Convert to Date object
            return date.toLocaleString(); // Convert to a readable string
          });

          const valueData = response.prices.map(
            (subArray: PriceData) => subArray[1],
          );
          setXdata(timeData);
          setYdata(valueData);
        })
        .catch((err) => console.error(err));
    }

    etherPrice();
    setIsClient(true);
  }, [per]);

  const handleTogglePasswordVisibility = () => {
    setShowAmount(!showAmount);
  };

  const chartConfig = {
    type: "area",
    height: 205,
    background: "transparent",
    series: [
      {
        name: "price",
        data: ydata,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
          easing: "easeinout", // Choose an easing function
          speed: 800, // Duration of the animation
          animateGradually: {
            enabled: true, // Enable gradual animation
            delay: 150, // Delay between series animations
          },
          dynamicAnimation: {
            enabled: true, // Enable dynamic animations
            speed: 350, // Speed of dynamic updates
          },
        },
        zoom: {
          enabled: false, // Disable zooming
        },
        background: "#A5A5AB;", // Set background color for the chart
        colors: [
          "linear-gradient(180deg, rgba(116, 116, 242, 0.6) 0%, rgba(112, 15, 1, 0.01) 100%)",
          "#008FFB",
        ], // Set your desired colors here
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        Opacity: 0.5,
        colors: ["rgba(116, 116, 242, 0.3)"],
      },
      stroke: {
        lineCap: "round",
        curve: "smooth",
        width: 1.8, // Set the stroke width
        colors: ["rgba(165, 165, 171, 0.5)"],
      },
      markers: {
        size: 0, // Set size of the dots
        colors: ["#700F01"], // Background color of the dots
        strokeColors: "#E4E4F0", // Border color of the dots
        strokeWidth: 2, // Border width
        hover: {
          size: 5, // Size of the dot on hover
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        crosshairs: {
          show: true,
          width: 1,
          position: "back",
          opacity: 0.5,
        },
        tooltip: {
          enabled: false, // Disable the x-axis tooltip
        },
        categories: xdata,
      },
      yaxis: {
        show: false, // Hides the entire y-axis
        labels: {
          show: false, // Ensures labels are not shown
        },
        axisBorder: {
          show: false, // Hides the axis border
        },
        crosshairs: {
          show: false, // Optionally hide crosshairs
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: -17,
          left: 0, // Remove padding around the chart
        },
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const handleAlignment = (period: string) => {
    setAlignment(period);
    setper(period);
  };

  useEffect(() => {
    const getPositions = async () => {
      const res = await getPositionsDataByAddress(
        address as `0x${string}`,
        StakedLPtokens as [],
      );
      setPositions(res as any);
      setLoading(false);
    };

    setLoading(true);
    getPositions();
  }, [StakedLPtokens, address]);

  useEffect(() => {
    if (stakedTeracBalance && stakedTeracBalance[1]) {
      const earned = dateTimeCalculator(stakedTeracBalance[1] as number);
      setEarnedState(earned);
    } else setEarnedState(0);
  }, [stakedTeracBalance]);

  const totalAmount = React.useMemo(() => {
    return positions.reduce(
      (sum, item) => sum + (item?.LiquidityValueInUSD ?? 0),
      0,
    );
  }, [positions]);

  const formatNumber = (num: number) => {
    return Math.fround(num).toPrecision(3);
  };

  const handleClick = (index: number, type: string) => {
    setTokenIndex((prevIndex) => (prevIndex === index ? null : index));
    setTokenType((prevType) => (prevType === type ? null : type));
    setOpen(true);
  };

  const handleClose = () => {
    setTokenIndex(null);
    setTokenType(null);
    setOpen(false);
  };

  if (!isClient) return null; // Prevent server-side rendering

  return (
    <div className="mb-[30px] mt-[130px] flex w-full grow items-center justify-center text-black dark:text-white">
      <div className="container">
        <div className="flex w-full grow items-center justify-center">
          <Card
            sx={{
              width: 540,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "32px",
            }}
            className={`dashboard-card flex flex-col justify-between rounded-[16px] border-2 border-[#FFFFFF1A] p-[24px] lg:rounded-[32px] `}
          >
            <Card
              id="chart-card"
              sx={{
                height: 270,
              }}
              className=" bg-chart mb-[24px] flex w-full overflow-hidden rounded-[8px] border-[1px] border-[#FFFFFF1A] lg:rounded-[16px]"
            >
              <Chart
                id="chart"
                {...(chartConfig as object)}
                className="relative h-full w-full"
              />
              <div className="chart-button-form absolute w-full">
                <div className="relative flex h-full w-full flex-col justify-between">
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    aria-label="text alignment"
                    className="m-auto flex justify-center"
                  >
                    {periods.map((item, index) => {
                      return (
                        <ToggleButton
                          key={index}
                          value="center"
                          aria-label="centered"
                          className="mx-[5px] h-[40px] w-[40px] rounded-full text-[14px] font-bold md:mx-[15px] md:h-[48px] md:w-[48px] md:text-[16px]"
                          onClick={() => handleAlignment(item)} // Pass item correctly
                          sx={{
                            backgroundImage:
                              alignment === item
                                ? "linear-gradient(191.21deg, #BC230B -137.64%, #700F01 119.38%) !important"
                                : "transparent", // Change background when selected
                            color:
                              alignment === item
                                ? "white !important"
                                : "#E4E4F0 !important",
                            "&:hover": {
                              backgroundColor:
                                alignment === item
                                  ? "darkred"
                                  : "rgba(255, 0, 0, 0.1)", // Hover effect
                            },
                          }}
                        >
                          {item}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                </div>
              </div>
            </Card>

            <div className="mb-[24px] grid grid-flow-col grid-rows-1 gap-[12px] md:gap-[24px]">
              <Card className="sub-card w-full rounded-[8px] border-[1px] border-[#FFFFFF1A] lg:rounded-[16px]">
                <CardContent className="w-full px-[13px] py-[15px]">
                  <div className="m-auto mb-[7px] flex w-full cursor-pointer items-center justify-center md:w-1/2">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="mb-0 text-[16px] text-[#D2D2D5]"
                    >
                      TERAC
                    </Typography>
                  </div>
                  <Typography
                    gutterBottom
                    component="div"
                    className="text-[20px] font-bold text-[#E9E9EA] lg:text-[24px]"
                  >
                    $2,500
                  </Typography>
                  {tokenData && tokenData[0] && (
                    <Tooltip
                      disableFocusListener
                      enterDelay={0}
                      enterTouchDelay={0}
                      title={tokenData[0].origin}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        className="mb-[5px] flex items-center justify-center text-[14px] text-[#D2D2D5]"
                      >
                        <p className="text-[#D2D2D5]">Balance: </p>&nbsp;
                        <span className="truncate text-[#029B1C]">
                          {tokenData[0].balance}
                        </span>
                      </Typography>
                    </Tooltip>
                  )}
                </CardContent>
              </Card>
              {/* <Card className={`w-full rounded-[8px] lg:rounded-[16px] border-[1px] border-[#FFFFFF1A] blink_card`} style={{ backgroundColor: earnedState == 0 ? 'rgb(241 7 7 / 45%)' : earnedState == 1 ? 'rgb(255 191 0 / 45%)' : 'rgb(97 196 84 / 50%)' }} > */}
              <Card
                className={`sub-card w-full rounded-[8px] border-[1px] border-[#FFFFFF1A] lg:rounded-[16px]`}
              >
                <CardContent className="w-full px-[13px] py-[15px]">
                  {/* <Tooltip
                  arrow
                  placement="top"
                  disableFocusListener enterTouchDelay={0} 
                  sx={{
                    background: '#D9D9D9',
                    borderRadius: 8,
                    width: 290,
                    padding: 10,
                    "& .MuiTooltip-arrow": {
                      left: "10px", // Move arrow to the left
                      margin: "10px", // Remove default margin
                    },
                    "& .MuiTooltip-tooltip": {
                      padding: "10px", // Adjust padding if necessary
                    },
                  }}
                  title={<div className="">
                    <div className="font-semibold flex items-center py-[6px]">
                      <FiberManualRecordIcon className="text-[#FF0000] text-[18px]" />
                      <span className="ml-2 text-white text-[12px]">No GYNX earned in the last 48 hours.</span>
                    </div>
                    <div className="font-semibold flex items-center py-[6px]">
                      <FiberManualRecordIcon className="text-[#FFBF00] text-[18px]" />
                      <span className="ml-2 text-white text-[12px]">GYNX earned between 24-48 hours. </span>
                    </div>
                    <div className="font-semibold flex items-center py-[6px]">
                      <FiberManualRecordIcon className="text-[#61C454] text-[18px]" />
                      <span className="ml-2 text-white text-[12px]">GYNX earned the last 24 hours.</span>
                    </div>
                  </div>}
                > */}
                  <div
                    onClick={() => handleClick(1, "GYNX")}
                    className="m-auto mb-[7px] flex w-full cursor-pointer items-center justify-center md:w-1/2"
                  >
                    {/* <FiberManualRecordIcon className={`text-[14px] mr-[10px] blink_red`} /> */}
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="mb-0 text-[16px] text-[#D2D2D5]"
                    >
                      GYNX
                    </Typography>
                  </div>
                  {/* </Tooltip> */}
                  <Typography
                    gutterBottom
                    component="div"
                    className="text-[20px] font-bold text-[#E9E9EA] lg:text-[24px]"
                  >
                    $2,500
                  </Typography>
                  {tokenData && tokenData[1] && (
                    <Tooltip
                      disableFocusListener
                      enterTouchDelay={0}
                      title={tokenData[1].origin}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        className="mb-[5px] flex items-center justify-center text-[14px] text-[#D2D2D5]"
                      >
                        <p className="text-[#D2D2D5]">Balance: </p>&nbsp;
                        <span className="truncate text-[#029B1C]">
                          {tokenData[1].balance}
                        </span>
                      </Typography>
                    </Tooltip>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* begin staking information */}
            <div className="sub-card mb-[24px] flex flex-col rounded-[8px] px-[12px] py-[24px] lg:rounded-[16px]">
              <div className="grid gap-[8px]">
                <Typography
                  gutterBottom
                  component="div"
                  className="m-0 text-[20px] font-bold text-[#E9E9EA] lg:text-[24px]"
                >
                  Your Staking Information
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  className="m-0 flex items-center justify-center text-[14px] text-[#D2D2D5] lg:text-[18px]"
                >
                  <p className="text-[#D2D2D5]">Volume Locked: </p>&nbsp;
                  <span className="text-[#029B1C]">$34,000</span>
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  className="m-0 flex items-center justify-center text-[12px] text-[#D2D2D5] lg:text-[14px]"
                >
                  <p className="text-[#A5A5AB]">Staked TERAC:</p>&nbsp;
                  <span className="text-[#E9E9EA">
                    {" "}
                    {stakedTeracBalance
                      ? CurrencyFormat(
                          parseCurrencyAmount(
                            Number(stakedTeracBalance[0] as any),
                            Number(18),
                          ),
                        )
                      : 0}{" "}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  className="flex items-center justify-center text-[12px] text-[#D2D2D5] lg:text-[14px]"
                >
                  <p className="text-[#A5A5AB]">Available GYNX:</p>&nbsp;
                  <span className="text-[#E9E9EA]">
                    {stakedTeracBalance && (
                      <PriceDisplay
                        value={Number(stakedTeracBalance[2] as any)}
                        decimals={18}
                      />
                    )}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  className="flex items-center justify-center text-[12px] text-[#D2D2D5] lg:text-[14px]"
                >
                  <p className="text-[#A5A5AB]">APR:</p>&nbsp;
                  <span className="text-[#E9E9EA]">12%</span>
                </Typography>
              </div>
              <div className="total-value-locked mt-[20px] rounded-full py-[8px] text-[14px] text-white  sm:mx-[70px] lg:text-[16px]">
                Total Volume Locked: $73,348
              </div>
            </div>
            {/* end staking information */}

            <div className="p-0">
              {loading ? (
                <>
                  <div className="mb-[20px] flex w-full items-center justify-between text-left">
                    <Typography
                      gutterBottom
                      component="div"
                      className="m-0 text-[20px] font-bold text-[#ffffff] sm:text-[24px] md:text-[32px]"
                    >
                      Your LP Position
                    </Typography>
                    <div className="flex items-center justify-between">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {!showAmount ? (
                          <VisibilityOff className="text-white" />
                        ) : (
                          <Visibility className="text-white" />
                        )}
                      </IconButton>
                      <span className=" ml-[10px] text-[16px] text-[#E9E9EA]">
                        ${" "}
                        {!showAmount
                          ? `${"*".repeat(String(formatNumber(totalAmount)).length)}`
                          : formatNumber(totalAmount)}
                      </span>
                    </div>
                  </div>
                  <div className="scrollable grid max-h-[230px] gap-[16px] overflow-auto">
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={"35px"}
                      sx={{ backgroundColor: "rgba(255, 255, 255, .2)" }}
                    />{" "}
                    :
                  </div>
                </>
              ) : StakedLPtokens.length > 0 ? (
                <>
                  <div className="mb-[20px] flex w-full items-center justify-between text-left">
                    <Typography
                      gutterBottom
                      component="div"
                      className="m-0 text-[20px] font-bold text-[#ffffff] sm:text-[24px] md:text-[32px]"
                    >
                      Your LP Position
                    </Typography>
                    <div className="flex items-center justify-between">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {!showAmount ? (
                          <VisibilityOff className="text-white" />
                        ) : (
                          <Visibility className="text-white" />
                        )}
                      </IconButton>
                      <span className=" ml-[10px] text-[16px] text-[#E9E9EA]">
                        ${" "}
                        {!showAmount
                          ? `${"*".repeat(String(formatNumber(totalAmount)).length)}`
                          : formatNumber(totalAmount)}
                      </span>
                    </div>
                  </div>
                  <div className="scrollable grid max-h-[230px] gap-[16px] overflow-auto">
                    {positions.map((item, index) => {
                      if (!item?.token1Symbol) return;
                      return (
                        <div
                          key={index}
                          onClick={() => handleClick(index, "TERAC")}
                          className={`blink_card ${StakedLPtokens && StakedLPtokens.includes(item?.tokenId) ? "lp-token-list-item-bg-green" : "lp-token-list-item-bg-yellow"} bordergradient flex items-center justify-between rounded-[8px] border-[#FFFFFF1A] px-[15px] py-[20px]`}
                        >
                          <div className="flex items-center">
                            <h5 className="text-[#D2D2D5]">
                              {item?.token0Symbol} / {item?.token1Symbol} &nbsp;
                              {/* <sup className="text-sm"> {(item.fee / 10000).toFixed(2)}% </sup> */}
                            </h5>
                            {/* <FiberManualRecordIcon className={`text-[14px] mr-[10px] blink_green`} /> */}
                          </div>
                          <span className="bg-transparent text-end text-[#D2D2D5]">
                            {!showAmount
                              ? `${"*".repeat(String(formatNumber(item?.LiquidityValueInUSD)).length)}`
                              : `${formatNumber(item?.LiquidityValueInUSD)}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <LiquidityPosition />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
