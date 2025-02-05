import { Metadata } from "next";
import Dashboard from "@/views/dashboard";

export const metadata: Metadata = {
  title: "Terafarm | Dashboard",
  description: "This is Dashboard Page"
};

const DashboardPage = async () => {
  return (
    <Dashboard />
  );
};

export default DashboardPage;
