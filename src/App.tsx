import React from "react";
import "./styles/app.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";

import Main from "./views/Main";

function App() {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Main />
        </LocalizationProvider>
    );
}

export default App;
