import { Metadata } from "next";
import WalletSelectPage from "@/views/WalletSelect";

export const metadata: Metadata = {
    title: "Terafarm | Dashboard",
    description: "This is Dashboard Page"
};

const WalletConnectPage = () => {
    return (
        <WalletSelectPage />
    );
};

export default WalletConnectPage;
