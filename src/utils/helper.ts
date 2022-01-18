import moment from "moment-timezone";

export const calculateDistanceFee = (distance: string): number => {
    const arr: string[] = distance.split("");
    const separated: number[] = arr.map((digit: string, i: number) => parseInt(digit) * Math.pow(10, arr.length - i - 1));

    const thousandsFee: number = ((separated[0] - 1000) / 500) + 2;
    let restFee: number;
    const rest: number = separated[1] + separated[2] + separated[3];
    rest > 500 ? restFee = 2 : restFee = 1;

    return thousandsFee + restFee;
};

export const calculateSurcharge = (cart: string, noOfItems: string): number => {
    const cartSurcharge: number = parseFloat(cart) < 10 ? 10 - parseFloat(cart) : 0;
    const itemSurcharge: number = parseInt(noOfItems) < 5 ? 0 : (parseInt(noOfItems) - 4) * 0.5;
    return  cartSurcharge + itemSurcharge;
};

export const calculateRushHourFee = (preliminary: number, time: Date | null): number => {
    const weekDay: string = moment.tz(time, "UTC").format("dddd").toLowerCase();
    const timeOfDay: string = moment.tz(time, "UTC").format("HH:mm");
    const isRushHour: boolean = checkRushHour(weekDay, timeOfDay);
    return isRushHour ? preliminary * 1.1 : preliminary;
};

const checkRushHour = (weekDay: string, time: string): boolean => {
    const hour = parseInt(time.split(":")[0]);
    return weekDay === "friday" && hour >= 15 && hour <= 18 ? true : false;
};