"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "next-themes";
import { Web3Provider } from '@/contexts/WagmiProvider';
import {SocketProvider} from '@/contexts/SocketContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SocketProvider >
            {children}
          </SocketProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Web3Provider>
  );
}