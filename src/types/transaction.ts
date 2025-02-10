export interface ITransactionDetail {
    amount: string;
    date: string;
    type: string;
    status: string;
}

export interface ITransactionItem {
    blockHash: string;
    blockNumber: string;
    confirmations: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    from: string;
    functionName: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    hash: string;
    input: string;
    isError: string;
    methodId: string;
    nonce: string;
    timeStamp: string;
    to: string;
    transactionIndex: string;
    txreceipt_status: string;
    value: string;
    field: string; // page 
    tokenAddress: string;
    tokenName: string;
    InOut: boolean;   // if true : in, if false : out 
}