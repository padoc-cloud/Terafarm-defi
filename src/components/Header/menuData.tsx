import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    icon : '/images/home/DashboardIcon.svg',
    title: "Dashboard",
    path: "/dashboard",
    newTab: false,
  },
  {
    id: 2,
    icon : '/images/home/LiquidityIcon.svg',
    title: "Liquidity",
    path: "/liquidity",
    newTab: false,
  },
  {
    id: 3,
    icon : '/images/home/FarmingIcon.svg',
    title: "Farming",
    path: "/farming",
    newTab: false,
  },
  {
    id: 4,
    icon : '/images/home/StakingIcon.svg',
    title: "Staking",
    path: "/staking",
    newTab: false,
  },
  {
    id: 5,
    icon : '/images/home/GovernanceIcon.svg',
    title: "Governance",
    path: "/governance",
    newTab: false,
  },
  {
    id: 6,
    icon : '/images/home/ForgingIcon.svg',
    title: "Forging",
    path: "/forging",
    newTab: false,
  },
  {
    id: 7,
    icon : '/images/home/FaqIcon.svg',
    title: "FAQ",
    path: "/faq",
    newTab: false,
  }
];
export default menuData;
