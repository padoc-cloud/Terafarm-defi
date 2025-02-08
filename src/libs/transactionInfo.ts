import { transaction_url } from "@/config/etherscan";

export const fetchTransactionInfo = async (address: string) => {
  const data = await fetch(transaction_url(address), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  return data.json();
};
