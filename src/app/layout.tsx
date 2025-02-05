import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "@/styles/index.scss";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Terafarm',
  icons: {
    icon: '/favicon.svg', // Path to favicon in the public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`relative bg-[#360d05] .scrollable scroll-block min-h-[100vh] dark:bg-black flex flex-col ${inter.className}`}>
        <div className="gif-bg h-full"></div>
        <div className="overlay h-full"></div>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
