import React, { useState } from "react";

import CalculatorForm from "../components/CalculatorForm";
import Result from "../components/Result";

export default function Calculator() {
    const [ res, setRes ] = useState<number | null>(null);
    const [ isRushHour, setIsRushHour ] = useState<boolean>(false);
    const [ surchargeTotal, setSurchargeTotal ] = useState<number>(0);

    return (
        <section>
            <CalculatorForm 
                setRes={setRes} 
                setIsRushHour={setIsRushHour} 
                setSurchargeTotal={setSurchargeTotal}
            />
            <Result 
                res={res} 
                isRushHour={isRushHour} 
                surchargeTotal={surchargeTotal}
            />
        </section>
    );
}
