"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

const Header = () => {
    // Navbar toggle
    
    const { disconnect, disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount()

    useEffect(() => {
        if (!isConnected) {
            disconnect()
            disconnectAsync()
        }
    }, [isConnected, disconnect, disconnectAsync])

    // Sticky Navbar
    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
    });

    return (
        <>
            <header
                className={`header h-[90px] left-0 top-0 z-40 flex w-full items-center shadow-sticky backdrop-blur-sm border-b-[.5px] bg-[#6868680D]`}
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            >
                <div className="w-full px-[16px] sm:px-0 sm:mx-[30px] md:mx-[50px] lg:mx-[80px]">
                    <div className="flex items-center justify-between">
                        <div className="w-60 max-w-full xl:mr-12">
                            <Link
                                href="/"
                                className={`header-logo w-full flex items-center text-black dark:text-white ${sticky ? "py-5 lg:py-2" : "py-6"
                                    } `}
                            >
                                <Image
                                    src="/images/logo.svg"
                                    alt="logo"
                                    width={30}
                                    height={30}
                                />
                                <span className="ml-2 font-bold text-[24px] bg-gradient-to-r text-transparent from-[#FFFFFF] to-[#999999] bg-clip-text">Terafarm</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
