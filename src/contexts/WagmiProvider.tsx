import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config/wagmi";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config as any}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
};