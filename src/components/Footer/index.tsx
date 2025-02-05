"use client";
import * as React from 'react';
import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import menuData from "./menuData";

const Footer = () => {

  const usePathName = usePathname();

  const [open, setOpen] = React.useState(false);

  const preventScroll = (event: WheelEvent | TouchEvent | KeyboardEvent) => {
      event.preventDefault();
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    // document.body.style.height = '100vh !important';
    document.body.style.overflow = 'hidden !important';
    setOpen(newOpen);
  };

  const Drawerbox = (
    <Box
      sx={{
        // width: '120px',
        // position :'relative',
        // background: 'transparent',
        // boxShadow:'unset !important',
        height:'100%'
      }}
      role="presentation" onClick={toggleDrawer(false)}>
      <div className='relative h-full flex justify-center md:justify-start'>
        <ul className="absolute bottom-[15px] right-[15px] md:right-[30px]">
          
          <li className="flex justify-center relative text-center mt-[8px] rounded-full h-[70px] w-[70px]" style={{background:'rgba(255, 255, 255, 0.1)', border: '0.5px solid rgba(255, 255, 255, 0.1)'}}>
            <Link
              href='/governance'
              className={`mt-[15px] text-[10px] text-white`}
            >
              <Image src='/images/home/GovernanceIcon.svg' width={24} height={24} alt='icon' className='m-auto'/>
              Governance
            </Link>
          </li>
          <li className="flex justify-center relative text-center mt-[8px] rounded-full h-[70px] w-[70px]" style={{background:'rgba(255, 255, 255, 0.1)', border: '0.5px solid rgba(255, 255, 255, 0.1)'}}>
            <Link
              href='/forging'
              className={`mt-[15px] text-[10px] text-white`}
            >
              <Image src='/images/home/ForgingIcon.svg' width={24} height={24} alt='icon' className='m-auto'/>
              Forging
            </Link>
          </li>
          <li className="flex justify-center relative text-center mt-[8px] rounded-full h-[70px] w-[70px]" style={{background:'rgba(255, 255, 255, 0.1)', border: '0.5px solid rgba(255, 255, 255, 0.1)'}}>
            <Link
              href='/faq'
              className={`mt-[15px] text-[10px] text-white`}
            >
              <Image src='/images/home/FaqIcon.svg' width={24} height={24} alt='icon' className='m-auto'/>
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <>
      <footer className={` z-10 footer-bg ${open ? 'footer-fixed' : 'relative'}`} >
        <div className="w-full footer lg:non-footer footer-boder lg:border-transparent">
          <div className="py-[18px] mx-[30px] md:mx-[50px]">
            <p className="hidden lg:block text-center text-base text-body-color dark:text-white">
              © Terafarm. All Rights Reserved.
            </p>
            <ul className="lg:hidden flex justify-between items-center">
              {menuData.map((menuItem, index) => (
                <li key={index} className="group relative text-center">
                  {menuItem.path && (
                    <>
                      <Link
                        href={menuItem.path}
                        className={`navbarOpen text-[12px] ${usePathName.includes(menuItem.path) ? 'text-[#BC230B]' : 'text-[#8F9597]'}`}
                      >
                        <Image src={usePathName.includes(menuItem.path) ? menuItem.icon2 : menuItem.icon1} alt={`icons`}
                          width={24}
                          height={24}
                          className={`m-auto`}
                        />
                        {menuItem.title}
                      </Link>
                    </>
                  )}
                </li>
              ))}
              <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                className="block"
              >
                <Image src={`${open ? '/images/mobile-menu/More-2.svg' : '/images/mobile-menu/More-1.svg'}`} alt={`icons`}
                  width={24}
                  height={24}
                  className={`m-auto`}
                />
                <span className={`text-[12px] ${open ? 'text-[#BC230B]' : 'text-[#8F9597]'}`}>More</span>
              </IconButton>
            </ul>
          </div>
        </div>
        <Drawer
          sx={{
            bottom:'50px',
            '& .MuiPaper-root': {
              height:'calc(100% - 84px)',
              width : '100%',
              background:'rgba(0, 0, 0, 0.2)',
              backdropFilter:'blur(25px)',
              boxShadow : 'unset !important',
            }
          }}
          className='lg:hidden'
          anchor='right'
          open={open} onClose={toggleDrawer(false)}>
          {Drawerbox}
        </Drawer>
      </footer>
    </>
  );
};

export default Footer;
