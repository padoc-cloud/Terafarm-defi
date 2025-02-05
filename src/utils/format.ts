
export function WalletAddressFormat(str: string) {
    if (str === undefined) {
        return "";
    }
    if (str.length <= 10) {
        return str;
    }

    const front = str.slice(0, 10);
    const back = str.slice(-6);

    return `${front}.....${back}`;
}