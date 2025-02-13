"use client";
import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import { useAccount, useDisconnect } from 'wagmi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Footer from '../Footer';
import menuData from "./menuData";
import { MessageItem } from "@/types/menu";
import Topmessage from './Topmessage';
import { useSocket } from "@/contexts/SocketContext";

function generateRandomColorWithOpacity(opacity = 1) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const Header = () => {
  const router = useRouter()
  const { disconnect, disconnectAsync } = useDisconnect();
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { address, isConnected } = useAccount()
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsg] = useState<MessageItem>({} as MessageItem);
  const [msgs2, setMsg2] = useState<MessageItem>({} as MessageItem);
  const { messages } = useSocket();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(true);

  const logOut = () => {
    disconnect();
    disconnectAsync();
    handleClose();
    router.push('/');
  }

  const usePathName = usePathname();

  const toggleDrawer = (newOpen: boolean) => () => {
    document.body.classList.toggle('scroll-block');
    navbarToggleHandler();
    setOpen(newOpen);
  };

  const goProfile = () => {
    handleClose();
    router.push('/profile');
  }

  useEffect(() => {
    if (!isConnected) {
      disconnect();
      disconnectAsync();
      router.push('/');
    }
  }, [isConnected, disconnect, disconnectAsync, router])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dropOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setMessage = React.useCallback(async () => {
    const filtered = messages.filter(item => item.fields.includes("farming")) as MessageItem[];
    const filteredItems = await Promise.all(filtered);
    if (filteredItems.length == 0) return;
    const LastMsg = filteredItems[ filteredItems.length -1 ];
    if (msgs.id == LastMsg?.id) return;
    setMsg({ ...LastMsg, type: generateRandomColorWithOpacity(0.6) } as MessageItem);
  }, [messages, msgs])

  const secondsMsg = React.useCallback(async () => {
    const filtered = messages.filter(item => item.fields.includes("staking")) as MessageItem[];
    const filteredItems = await Promise.all(filtered);
    if (filteredItems.length == 0) return;
    const LastMsg = filteredItems[filteredItems.length - 1];
    if (msgs2.id == LastMsg?.id) return;
    setMsg2({ ...LastMsg, type: generateRandomColorWithOpacity(0.6) } as MessageItem);
  }, [messages, msgs2])

  useEffect(() => {
    setMessage();
    secondsMsg();
  }, [setMessage, secondsMsg])

  const DrawerList = (
    <Box
      sx={{
        width: '100vw',
        background: 'transparent'
      }}
      role="presentation" onClick={toggleDrawer(false)}>
      <nav
        id="navbarCollapse"
        className={`navbar w-full  rounded-0  bg-mobile flex flex-col justify-between right-0 z-30 absolute  duration-300`}
      >
        <div>
          <ul className="block px-[20px] pt-[20px]">
            {menuData.map((menuItem, index) => (
              <li key={index} className="group relative">
                {menuItem.path && (
                  <>
                    <Link
                      href={menuItem.path}
                      className={`flex navbarOpen mt-[15px] text-[18px] px-[13px] py-[10px] text-white opacity-70 hover:opacity-90 `}
                    >
                      <Image src={menuItem.icon} alt={`icons`}
                        width={20}
                        height={20}
                        className={`mr-[5px]`}
                      />
                      {menuItem.title}
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className='px-[30px]'>
            <Button variant="contained"
              color="error" size='large'
              onClick={goProfile}
              className='w-full py-4 text-white mt-[30px] rounded-full '
              sx={{
                background: 'linear-gradient(191.21deg, #BC230B -137.64%, #700F01 119.38%) !important'
              }}>
              My Profile
            </Button>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </nav>
    </Box>
  );

  return (
    <>
      <header
        className={`header relative h-[90px] left-0 top-0 z-40 flex w-full items-center shadow-sticky backdrop-blur-sm py-[24px] border-b-[.5px] bg-[#6868680D] ${sticky
          ? `dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[20] transition ${navbarOpen ? 'max-width fixed navbarOpenHeaderBg border-none' : ''}`
          : "absolute"
          }`}
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <div className="w-full px-[16px] sm:px-0 sm:mx-[30px] md:mx-[50px] lg:mx-[80px]">
          <div className="flex items-center justify-between">
            <div className="w-[140px]">
              <Link
                href="/dashboard"
                className={`header-logo w-full  flex text-black dark:text-white`}
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
            <div className="flex items-center justify-center px-4">
              <div>
                <button
                  onClick={toggleDrawer(true)}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="z-50 absolute sm:mr-0 md:mr-[25px] lg:mr-0 right-4 top-1/2 block translate-y-[-50%] border-transparent rounded-lg px-0 sm:px-3 py-[6px] text-white hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${navbarOpen ? "opacity-0 " : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 dark:bg-white ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                  />
                </button>
                <Drawer
                  sx={{
                    '& .MuiPaper-root': {
                      marginTop: '89px',
                      background: 'transparent'
                    },
                  }}
                  className='lg:hidden'
                  anchor='right'
                  open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>

                <nav
                  id="navbarCollapse"
                  className={`navbar hidden absolute right-0 z-30  border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:block lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative" style={{ marginLeft: "6px" }}>
                        {menuItem.path && (
                          <>
                            <Link
                              href={menuItem.path}
                              className={`flex py-2 text-[14px] lg:mr-0 lg:inline-flex lg:px-[15px] lg:py-[10px] text-white opacity-50 border-t-[0.25px] border-r-[0.25px] border-b-[2px] border-l-[0.25px] ${usePathName.includes(menuItem.path)
                                ? "bg-gradient-to-b rounded-full opacity-90 border-[#BC230B] from-transparent to-[#BC230B33]  underline-offset-8 dark:text-white"
                                : "hover:opacity-80 border-transparent text-dark  dark:text-slate-50 dark:hover:text-white"}`}
                            >
                              <Image src={menuItem.icon} alt={`icons`}
                                width={20}
                                height={20}
                                className={`mr-[5px]`}
                              />
                              {menuItem.title}
                            </Link>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className={`avatar-form w-[140px] items-center justify-end lg:block `}>

              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={dropOpen ? 'long-menu' : undefined}
                aria-expanded={dropOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                  float: 'right'
                }}
              // className={`${dropOpen ? 'mr-[17px]' : ''}`}
              >
                <Avatar className={`w-[40px] h-[40px] right-0 float-right border-2 ${usePathName.includes('profile') ? 'border-white' : 'border-transparent'}`} alt="Remy Sharp" src="/images/users/photo.svg" >{address || "OP"}</Avatar>
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={dropOpen}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: 120,
                      width: 110,
                      left: 'unset !important',
                      right: '20px !important',
                      marginLeft: -20,
                      background: 'rgba(65, 65, 65, 0.1)', // Background color
                      border: '1px solid rgba(255, 255, 255, 0.1)', // Border color
                      backdropFilter: 'blur(25px)', // Backdrop blur effect
                      padding: '5px'
                    },
                  },
                }}
                sx={{
                  marginTop: '5px',
                  left: 0,
                  background: 'transparent !important'
                }}

              >
                <div className=''>
                  <MenuItem key={1} onClick={goProfile} className='drop-menu-item text-white text-[14px]' >
                    My Profile
                  </MenuItem>
                  <MenuItem key={2} onClick={logOut} className='drop-menu-item text-white text-[14px]' >
                    Log Out
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        {
          ((msgs || msgs2) && usePathName.includes("dashboard")) && (
            <Topmessage msg1={msgs} msg2={msgs2} />
          )
        }
      </header>
    </>
  );
};

export default Header;
