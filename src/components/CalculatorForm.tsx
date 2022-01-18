import React, { useState } from "react";
import {
    Box,
    FormControl,
    TextField,
    Button
} from "@mui/material";
import DateTimePicker  from "@mui/lab/DateTimePicker";
import { CalculatorFormValues } from "../types";
import { 
    calculateDistanceFee, 
    calculateSurcharge, 
    calculateRushHourFee,
    calculateDeliveryFee,
    checkRushHour
} from "../utils/helper";
import moment from "moment-timezone";

import ErrorText from "./ErrorText";

export default function CalculatorForm({ 
    setRes,
    setIsRushHour,
    setSurchargeTotal
}: {
    setRes: (res: number) => void
    setIsRushHour: (val: boolean) => void
    setSurchargeTotal: (val: number) => void
}) {
    const [ values, setValues ] = useState<CalculatorFormValues>({
        cartValue: "",
        deliveryDistance: "",
        amountOfItems: "",
    });
    const [ time, setTime ] = useState<Date | null>(new Date());
    const [ isError, setIsError ] = useState<boolean>(false);
    const [ errorMsg, setErrorMsg ] = useState<string>("");
    const [ targetErr, setTargetErr ] = useState<string[]>([]);
    
    const handleChange = (key: keyof CalculatorFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( !e.target.value ) {
            setIsError(false);
            setErrorMsg("");
        }
        
        if ( e.target.value.match(/[a-zA-z]+/) ) {
            setIsError(true);
            setTargetErr([...new Set([ ...targetErr, e.target.id ])]);
            setErrorMsg("Only numbers are allowed");
        } else if ( e.target.value.match(/[.]+/) ) {
            if ( key === "deliveryDistance" || key === "amountOfItems" ) {
                setIsError(true);
                setTargetErr([...new Set([ ...targetErr, e.target.id ])]);
                setErrorMsg("Only integer is allowed");
            }
        } else {
            setIsError(false);
            setErrorMsg("");
            setTargetErr([]);
        }

        setValues({ ...values, [key]: e.target.value });
    };

    const handleTimeChange = (newValue: Date | null) => {
        const weekDay: string = moment.tz(time, "UTC").format("dddd").toLowerCase();
        const timeOfDay: string = moment.tz(time, "UTC").format("HH:mm");
        setIsRushHour(checkRushHour(weekDay, timeOfDay));
        setTime(newValue);
    };

    const handleCalculateDeliveryFee = (): void => {
        const distanceFee: number = calculateDistanceFee(values.deliveryDistance);
        const surcharge: number = calculateSurcharge(values.cartValue, values.amountOfItems);
        const preliminaryFee: number = distanceFee + surcharge;
        const rushHourFee: number = calculateRushHourFee(preliminaryFee, time);

        const result: number = calculateDeliveryFee(preliminaryFee, rushHourFee, values.cartValue);
        setRes(result);
        setSurchargeTotal(surcharge);
        setValues({ cartValue: "", deliveryDistance: "", amountOfItems: "", });
    };
    
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",   
                "& .MuiTextField-root": { my: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl sx={{ width: "25ch" }}>
                <TextField
                    error={isError && targetErr.includes("cart-value")}
                    label="Cart Value (€)"
                    id="cart-value"
                    value={values.cartValue}
                    onChange={handleChange("cartValue")}
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {isError && targetErr.includes("cart-value") ? <ErrorText msg={errorMsg} /> : null}
            </FormControl>

            <FormControl sx={{ width: "25ch" }}>
                <TextField
                    error={isError && targetErr.includes("delivery-distance")}
                    label="Delivery Distance (m)"
                    id="delivery-distance"
                    value={values.deliveryDistance}
                    onChange={handleChange("deliveryDistance")}
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {isError && targetErr.includes("delivery-distance") ? <ErrorText msg={errorMsg} /> : null}
            </FormControl>
            
            <FormControl sx={{ width: "25ch" }}>
                <TextField
                    error={isError && targetErr.includes("amount-of-items")}
                    label="Amount of Items"
                    id="amount-of-items"
                    value={values.amountOfItems}
                    onChange={handleChange("amountOfItems")}
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {isError && targetErr.includes("amount-of-items") ? <ErrorText msg={errorMsg} /> : null}
            </FormControl>

            <FormControl sx={{ my: 1 }}>
                <DateTimePicker 
                    label="Time"
                    value={time}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </FormControl>

            <Button
                id="calculate-btn"
                variant="contained"
                sx={{ width: "270px" }}
                onClick={handleCalculateDeliveryFee}
            >
                Calculate Delivery Price
            </Button>
        </Box>
    );
}
