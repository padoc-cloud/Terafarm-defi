"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getTokenLogoURL } from "@/utils/CurrencyLogo";
import { getPoolInfoByAddressWithToken } from "@/libs/pool";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import "@/styles/liquidity.css";

const LiquidityPosition: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPools = async () => {
      const data = await getPoolInfoByAddressWithToken();
      setPools(data);
      setLoading(false);
    };
    setLoading(true);
    getPools();
  }, []);

  return (
    <>
      {(
        <>
          <div className="mb-[20px] flex w-full items-center justify-between text-left">
            <Typography
              gutterBottom
              component="div"
              className="m-0 text-[20px] font-bold text-[#ffffff] sm:text-[24px] md:text-[32px]"
            >
              Liquidity Positions
            </Typography>
          </div>
          <div className="scrollable grid max-h-[300px] gap-[16px] overflow-auto">
            {pools.map((item: any, index) => (
              <Link key={index} href={"/liquidity"}>
                <div
                  key={index}
                  className={`blink_card lp-token-list-item-bg-red bordergradient flex items-center justify-between rounded-[8px] border-[#FFFFFF1A] px-[15px] py-[8px]`}
                >
                  <div className="flex items-center">
                    <div className="token-icon-group flex items-center">
                      <Image
                        className="rounded-full"
                        width={40}
                        height={40}
                        priority
                        src={getTokenLogoURL({
                          address: item["tokenA"]["address"],
                          chainId: item["tokenA"]["chainId"],
                        })}
                        alt={`Image for`}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                      />
                      <div className="token-right-image">
                        <Image
                          className="rounded-full"
                          width={40}
                          height={40}
                          priority
                          src={getTokenLogoURL({
                            address: item["tokenB"]["address"],
                            chainId: item["tokenB"]["chainId"],
                          })}
                          alt={`Image for`}
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                        />
                      </div>
                    </div>
                    <h5 className="text-[#D2D2D5]">
                      {item["tokenA"]["symbol"]} - {item["tokenB"]["symbol"]}{" "}
                      &nbsp;
                    </h5>
                  </div>
                  <div className="li-btn-form flex"></div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default LiquidityPosition;
