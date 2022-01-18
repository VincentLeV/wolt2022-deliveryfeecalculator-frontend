import React from "react";
import { Typography } from "@mui/material";

export default function ErrorText({ msg }: {msg: string}) {
    return (
        <Typography
            component="p"
            variant="subtitle1"
            color="red"
        >
            {msg}
        </Typography>
    );
}
