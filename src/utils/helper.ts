import moment from "moment-timezone";

export const calculateDistanceFee = (distance: string): number => {
    let result = 0;
    if ( parseInt(distance) < 1000 ) return result = 2; 
    const arr: string[] = distance.split("");
    const separated: number[] = arr.map((digit: string, i: number) => parseInt(digit) * Math.pow(10, arr.length - i - 1));
    
    const thousandsFee: number = ((separated[0] - 1000) / 500) + 2;
    const rest: number = separated[1] + separated[2] + separated[3];
    if ( rest === 0 ) {
        result = thousandsFee + 0;
    } else if ( rest > 500 ) {
        result = thousandsFee + 2;
    } else if ( rest <= 500 ) {
        result = thousandsFee + 1;
    }

    return result;
};

export const calculateSurcharge = (cart: string, noOfItems: string): number => {
    const cartSurcharge: number = parseFloat(cart) < 10 ? 10 - parseFloat(cart) : 0;
    const itemSurcharge: number = parseInt(noOfItems) < 5 ? 0 : (parseInt(noOfItems) - 4) * 0.5;
    return roundToDecimals(cartSurcharge + itemSurcharge);
};

export const calculateRushHourFee = (preliminary: number, time: Date | null): number => {
    const weekDay: string = moment.tz(time, "UTC").format("dddd").toLowerCase();
    const timeOfDay: string = moment.tz(time, "UTC").format("HH:mm");
    const isRushHour: boolean = checkRushHour(weekDay, timeOfDay);
    const result = isRushHour ? preliminary * 1.1 : preliminary;
    return result > 15 ? 15 : roundToDecimals(result);
};

export const checkRushHour = (weekDay: string, time: string): boolean => {
    const hour = parseInt(time.split(":")[0]);
    const minutes = parseInt(time.split(":")[1]);

    if ( weekDay === "friday" && hour >= 15 ) {
        if ( hour <= 19 && minutes === 0 ) {
            return true;
        } else if ( hour <= 18 && minutes <= 59 ) {
            return true;
        }
    }

    return false;
};

export const calculateDeliveryFee = (preliminaryFee: number, rushHourFee: number, cartValue: string): number => {
    if ( parseFloat(cartValue) >= 100 ) {
        return 0;
    }

    if ( preliminaryFee > 15 || rushHourFee > 15 ) {
        return 15;
    } 

    return roundToDecimals(rushHourFee);
};

export const roundToDecimals = (value: number) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
};