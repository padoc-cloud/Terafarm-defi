
export const CurrencyUSDFormat = (value : number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export const CurrencyFormat = (value: any) => {
    return new Intl.NumberFormat('en-US').format(value)
}

export const tokenDisplayFormat = (val: any) => {
    const value = Number(val)
    if (value / (10 ** 5) < 1) {
        return CurrencyFormat(value)
    } else {
        return CurrencyFormat(String(value).substring(0, 5)) + ' ...'
    }
}

export const parseCurrencyAmount = (value: number, decimals: number) => {
    return value / (10 ** decimals)
}