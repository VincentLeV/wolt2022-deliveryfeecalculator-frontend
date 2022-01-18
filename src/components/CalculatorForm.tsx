import React, { useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    TextField,
    OutlinedInput,
    InputAdornment,
    Button
} from "@mui/material";
import DateTimePicker  from "@mui/lab/DateTimePicker";
import { CalculatorFormValues } from "../types";
import { calculateDistanceFee, calculateSurcharge, calculateRushHourFee } from "../utils/helper";

export default function CalculatorForm({ setRes }: {setRes: (res: number) => void}) {
    const [ values, setValues ] = useState<CalculatorFormValues>({
        cartValue: "",
        deliveryDistance: "",
        amountOfItems: "",
    });
    const [ time, setTime ] = useState<Date | null>(new Date());
    const handleChange = (key: keyof CalculatorFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [key]: e.target.value });
    };

    const handleTimeChange = (newValue: Date | null) => setTime(newValue);

    const calculateDeliveryFee = (): number => {
        const distanceFee = calculateDistanceFee(values.deliveryDistance);
        const surcharge = calculateSurcharge(values.cartValue, values.amountOfItems);
        const preliminaryFee = distanceFee + surcharge;
        const rushHourFee = calculateRushHourFee(preliminaryFee, time);

        if ( preliminaryFee > 15 || preliminaryFee + rushHourFee > 15 ) {
            setRes(15);
            return 15;
        } else if ( parseFloat(values.cartValue) >= 100 ) {
            setRes(0);
            return 0;
        }

        setRes(Math.round((preliminaryFee + rushHourFee + Number.EPSILON) * 100) / 100);
        return Math.round((preliminaryFee + rushHourFee + Number.EPSILON) * 100) / 100;
    };
    
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel htmlFor="cart-value">Cart Value</InputLabel>
                <OutlinedInput
                    label="Cart Value"
                    id="cart-value"
                    value={values.cartValue}
                    onChange={handleChange("cartValue")}
                    endAdornment={<InputAdornment position="end">&euro;</InputAdornment>}
                />
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel htmlFor="delivery-distance">Delivery Distance</InputLabel>
                <OutlinedInput
                    label="Delivery Distance"
                    id="delivery-distance"
                    value={values.deliveryDistance}
                    onChange={handleChange("deliveryDistance")}
                    endAdornment={<InputAdornment position="end">m</InputAdornment>}
                />
            </FormControl>
            
            <FormControl sx={{ m: 1, width: "25ch" }}>
                <InputLabel htmlFor="amount-of-items">Amount of Items</InputLabel>
                <OutlinedInput
                    label="Amount of Items"
                    id="amount-of-items"
                    value={values.amountOfItems}
                    onChange={handleChange("amountOfItems")}
                />
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }}>
                <DateTimePicker 
                    label="Time"
                    value={time}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </FormControl>

            <Button
                variant="contained"
                sx={{ m: 1, width: "300px" }}
                onClick={calculateDeliveryFee}
            >
                Calculate Delivery Price
            </Button>
        </Box>
    );
}
