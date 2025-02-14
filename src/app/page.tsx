
import { Metadata } from "next";
import HomeView from "@/views/home";
import HomeHeader from "@/components/HomeHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terafarm | Welcome",
  description: "This is Home for SimplestMath",
  // other metadata
};

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HomeView />
      <Footer />
    </>
  );
}
