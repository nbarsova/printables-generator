import React, {useState} from 'react';
import styles from "./Complexity.module.css";
import {FormattedMessage} from "react-intl";

export function EquationsAmount(props:
                                    {
                                        equationsAmounts: Array<number>,
                                        onChange: (amount: number) => void
                                    }) {

    let [selectedAmount, setSelectedAmount] = useState(props.equationsAmounts[0]);

    let renderAmount = (amount: number) => {
        return (<div key={amount}
                     className={styles.clickable}
                     onClick={() => {
                         if (amount !== selectedAmount) {
                             setSelectedAmount(amount);
                             props.onChange(amount);
                         }
                     }}><input type="radio"
                               checked={amount === selectedAmount}
                               onChange={() => {
                               }}/>{amount}</div>)
    }
    return (
        <div className={styles.numberComplexity}>
            <b><FormattedMessage id="equationsAmount"/></b>
            {props.equationsAmounts.map(renderAmount)}

        </div>
    )
}
