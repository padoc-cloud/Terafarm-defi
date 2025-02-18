import { useEffect, useState } from 'react'

// https://usehooks.com/
export function useEPrice() {
    const [ETHPrice, setETHPrice] = useState(0)

    useEffect(() => {
        
    }, [ETHPrice])

    return {
        ETHPrice,
        setETHPrice
    }
}
