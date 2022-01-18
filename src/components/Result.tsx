import React from "react";

export default function Result({ res}: {res: number | null}) {
    return (
        <div>
            <span>Delivery Price: </span>
            <span>{res} &euro;</span>
        </div>
    );
}
