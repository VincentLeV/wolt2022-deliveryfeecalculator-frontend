import React from "react";
import { Typography } from "@mui/material";

export default function Footer() {
    return (
        <footer 
            style={{ 
                textAlign: "center",   
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "6px"   
            }}
        >
            <Typography
                variant="caption"
            >
                Developed with 💖 by <a href="https://www.vincentle.me/" target="_blank" rel="noreferrer">Vincent Le</a>
            </Typography>
        </footer>
    );
}
