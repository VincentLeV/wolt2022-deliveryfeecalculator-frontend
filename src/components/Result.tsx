import React from "react";

export default function Result({ res}: {res: number | null}) {
    return (
        <div id="result">
            <span>Delivery Price: </span>
            <span>{res ? res : 0} &euro;</span>
        </div>
    );
}
