"use client";

import React, {Suspense} from "react";
// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from './loading';
import dynamic from 'next/dynamic';

// Dynamically import the WebRTC component with SSR disabled
const Header = dynamic(() => import('@/components/Header'), {
  ssr: false
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center grow w-full text-black dark:text-white">
        <Suspense fallback={<Loading />}>
        {children}
        </Suspense>
      </div>
      <Footer />
    </>
  );
}