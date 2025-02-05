
export const transFormat = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: '2-digit', hour12: false });
}

const timetwoDigitFormat = (value: number) => {
    return (value < 10 ? "0" : "") + value;
}

const hourFormat = (hour: number) => {
    return (hour < 12 ? "am" : "pm");
}

export const transUTCFormat = (timestamp: any) => {
    const date = new Date(timestamp);
    const hour = date.getUTCHours() % 12 || 12
    return timetwoDigitFormat(hour) + "." + timetwoDigitFormat(date.getUTCMinutes()) + hourFormat(date.getUTCHours()) + " . " + timetwoDigitFormat(date.getUTCDate()) + "/" + timetwoDigitFormat(date.getUTCMonth() + 1) + "/" + date.getUTCFullYear().toString().substring(2, 4)
}
