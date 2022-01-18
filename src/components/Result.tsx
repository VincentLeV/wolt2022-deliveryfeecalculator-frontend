import React from "react";
import {
    Paper,
    Stack,
    Typography
} from "@mui/material";

export default function Result({ 
    res,
    isRushHour,
    surchargeTotal
}: {
    res: number | null,
    isRushHour: boolean,
    surchargeTotal: number
}) {
    return (
        <Paper 
            sx={{ 
                width: 320, 
                maxWidth: "85%", 
                p: 1.5, 
                mt: 4,
                mx: "auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }} 
            id="result"
        >
            <Stack sx={{ mr: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Surcharge Fee</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>Rush Hour</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>Delivery Price</Typography>
            </Stack>
            <Stack>
                <Typography variant="h6" sx={{ mb: 1 }}>{surchargeTotal ? surchargeTotal : 0}&euro;</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>{isRushHour ? "Yes" : "No"}</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{res ? res : 0}&euro;</Typography>
            </Stack>
        </Paper>
    );
}
