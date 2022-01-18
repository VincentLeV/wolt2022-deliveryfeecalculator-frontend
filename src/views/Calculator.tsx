import React, { useState } from "react";

import CalculatorForm from "../components/CalculatorForm";
import Result from "../components/Result";

export default function Calculator() {
    const [ res, setRes ] = useState<number | null>(null);

    return (
        <section>
            <CalculatorForm setRes={setRes} />

            <Result res={res} />
        </section>
    );
}
