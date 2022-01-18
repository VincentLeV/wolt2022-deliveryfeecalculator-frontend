import React from "react";
import { Container } from "@mui/material";

import Appbar from "../components/Appbar";
import Calculator from "./Calculator";
import Footer from "../components/Footer";

export default function Main() {
    return (
        <main>
            <Appbar />
            <Container 
                maxWidth="sm" 
                sx={{ 
                    height: "90vh", 
                    display: "flex",
                    mt: 7.5,
                    alignItems: "flex-start",
                    justifyContent: "center", 
                }}
            >
                <Calculator />
            </Container>
            <Footer />
        </main>
    );
}
