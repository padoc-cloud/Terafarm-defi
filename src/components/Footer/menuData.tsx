
type Menu = {
    id: number;
    icon1 : string,
    icon2 : string,
    title: string;
    path?: string;
    newTab: boolean;
};

const menuData: Menu[] = [
  {
    id: 1,
    icon1 : '/images/mobile-menu/Dashboard-1.svg',
    icon2 : '/images/mobile-menu/Dashboard-2.svg',
    title: "Dashboard",
    path: "/dashboard",
    newTab: false,
  },
  {
    id: 2,
    icon1 : '/images/mobile-menu/Liquidity-1.svg',
    icon2 : '/images/mobile-menu/Liquidity-2.svg',
    title: "Liquidity",
    path: "/liquidity",
    newTab: false,
  },
  {
    id: 3,
    icon1 : '/images/mobile-menu/Farming-1.svg',
    icon2 : '/images/mobile-menu/Farming-2.svg',
    title: "Farming",
    path: "/farming",
    newTab: false,
  },
  {
    id: 4,
    icon1 : '/images/mobile-menu/Staking-1.svg',
    icon2 : '/images/mobile-menu/Staking-2.svg',
    title: "Staking",
    path: "/staking",
    newTab: false,
  },
  // {
  //   id: 5,
  //   icon1 : '/images/mobile-menu/More-1.svg',
  //   icon2 : '/images/mobile-menu/More-2.svg',
  //   title: "More",
  //   path: "/more",
  //   newTab: false,
  // }
];
export default menuData;
