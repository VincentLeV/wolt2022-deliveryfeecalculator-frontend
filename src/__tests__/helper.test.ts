import { 
    calculateDistanceFee, 
    calculateSurcharge,
    calculateRushHourFee,
    calculateDeliveryFee,
    checkRushHour
} from "../utils/helper";

describe("Distance Fee", () => {
    test("is 2€ for the first 1000 meters", () => {
        expect(calculateDistanceFee("1000")).toBe(2);
    });
    test("is 2€ if 999 meters", () => {
        expect(calculateDistanceFee("999")).toBe(2);
    });
    test("is 3€ if 1499 meters", () => {
        expect(calculateDistanceFee("1499")).toBe(3);
    });
    test("is 3€ if 1500 meters", () => {
        expect(calculateDistanceFee("1500")).toBe(3);
    });
    test("is 4€ if 1501 meters", () => {
        expect(calculateDistanceFee("1501")).toBe(4);
    });
    test("is 5€ if 2500 meters", () => {
        expect(calculateDistanceFee("2500")).toBe(5);
    });
});

describe("Surcharge Fee", () => {
    test("is 1.1€ if 8.9€ cart value and 4 items", () => {
        expect(calculateSurcharge("8.9", "4")).toBe(1.1);
    });
    test("is 0.5€ if 10€ cart value and 5 items", () => {
        expect(calculateSurcharge("10", "5")).toBe(0.5);
    });
    test("is 3€ if 10€ cart value and 10 items", () => {
        expect(calculateSurcharge("10", "10")).toBe(3);
    });
    test("is 4.3€ if 8.7€ cart value and 10 items", () => {
        expect(calculateSurcharge("8.7", "10")).toBe(4.3);
    });
});

describe("Rush Hour", () => {
    test("friday 3:00pm is rush hour", () => {
        expect(checkRushHour("friday", "15:00")).toBeTruthy();
    });
    test("friday 6:59pm is rush hour", () => {
        expect(checkRushHour("friday", "18:59")).toBeTruthy();
    });
    test("friday 7pm is rush hour", () => {
        expect(checkRushHour("friday", "19:00")).toBeTruthy();
    });
    test("friday 7:01pm is not rush hour", () => {
        expect(checkRushHour("friday", "19:01")).toBeFalsy();
    });
    test("friday 2:59pm is not rush hour", () => {
        expect(checkRushHour("friday", "14:59")).toBeFalsy();
    });
    test("monday 3:00pm is not rush hour", () => {
        expect(checkRushHour("monday", "15:00")).toBeFalsy();
    });
    test("monday 7pm is not rush hour", () => {
        expect(checkRushHour("monday", "19:00")).toBeFalsy();
    });
});

describe("Rush Hour Fee", () => {
    test("can't exceed 15€", () => {
        expect(calculateRushHourFee(14, new Date("2022-01-21T20:00:35"))).toBe(15);
    });
    test("is 13.2€ if rush hour", () => {
        expect(calculateRushHourFee(12, new Date("2022-01-21T20:00:35"))).toBe(13.2);
    });
    test("is 12€ if not rush hour", () => {
        expect(calculateRushHourFee(12, new Date("2022-01-21T11:00:35"))).toBe(12);
    });
});

describe("Delivery Fee", () => {
    test("can't be more than 15€ including possible surcharges", () => {
        expect(calculateDeliveryFee(15.1, 15.1, "1")).toBe(15);
    });
    test("is 0€ if cart value is 100", () => {
        expect(calculateDeliveryFee(10, 11, "100")).toBe(0);
    });
    test("is 11€ if rush hour", () => {
        expect(calculateDeliveryFee(10, 11, "99")).toBe(11);
    });
    test("is 10€ if not rush hour", () => {
        expect(calculateDeliveryFee(10, 10, "99")).toBe(10);
    });
});
