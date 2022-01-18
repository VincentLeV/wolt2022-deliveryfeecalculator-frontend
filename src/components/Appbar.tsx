import React from "react";
import {
    AppBar,
    Typography
} from "@mui/material";

import MyLogo from "../assets/logo-white.svg";

export default function Appbar() {
    return (
        <AppBar 
            position="absolute" 
            sx={{ 
                py: 0.5,
                px: { xs: 2, sm: 4 }, 
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, fontWeight: "bold" }}
            >
                Delivery Fee Calculator
            </Typography>

            <a href="https://www.vincentle.me/" target="_blank" rel="noreferrer">
                <img src={MyLogo} width="26px" height="26px" />
            </a>
        </AppBar>
    );
}
