import * as React from 'react'
import { useConnect, useChainId, Connector } from 'wagmi'
import { WalletOption } from './WalletOption'

export function WalletList() {
    const chainId = useChainId();
    const { connectors, connect } = useConnect()
    const [AllConnector, setConnector] = React.useState([] as Connector[])

    React.useEffect(() => {
        if (connectors.length > 3) {
            const uniqueIds = new Set<string>();
            const uniqueData: Connector[] = connectors.filter((connector) => {
                const isDuplicate = uniqueIds.has(connector.name as string);
                uniqueIds.add(connector.name as string);
                return !isDuplicate;
            });

            setConnector(uniqueData as any)
        }
    }, [connectors])
    
    return AllConnector.map((connector) => {
        
        return (
            <li key={connector['uid']} className='sub-card rounded-[8px] '>
                <WalletOption
                    connector={connector}
                    onConnection={() => connect({ connector, chainId })}
                />
            </li>
        )
    })
}