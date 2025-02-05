export const dateTimeCalculator = (date: number): number => {
    const currentDate = Date.now() / 1000;
    const oneDayInMs = Number(24 * 60 * 60 * 1000); // 1 day in milliseconds
    const twoDaysInMs = Number(2 * oneDayInMs);

    const timeDifference = Number(currentDate) - Number(date);
    if (timeDifference > twoDaysInMs) {
        return 0; // More than 2 days ago
    } else if (timeDifference >= oneDayInMs && timeDifference <= twoDaysInMs) {
        return 1; // Between 1 and 2 days ago
    } else {
        return 2; // Less than 1 day ago
    }
}
