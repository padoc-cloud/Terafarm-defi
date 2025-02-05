"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center grow w-full text-black dark:text-white">
        {children}
      </div>
      <Footer />
    </>
  );
}