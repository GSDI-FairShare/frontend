import { useState } from "react";

export const UseDebtAmount = (setError) => {
    const [debtAmountUsers, setDebtAmountUsers] = useState({});
    
    const initializeUserAmounts = (resultInfoGroup) => {
        const initialAmounts = {}
        resultInfoGroup.members.forEach( (aMember) => { initialAmounts[aMember.user_id] = 0})
        setDebtAmountUsers(initialAmounts);
    }

    const handlerAmounts = (aUserId:number, aNewAmount:number) => {
        setDebtAmountUsers( (prevState) => {
            return { ...prevState, [aUserId]: aNewAmount }
        })
    }

    const areValidAmounts = (amountTotal:number) : boolean => {
        let accumAmount = 0
        Object.values(debtAmountUsers).forEach( (aMountUser) => {
            accumAmount += Number(aMountUser);
        } )
        
        const result = accumAmount == amountTotal;
        console.log("accumAmount, amountTotal, result", accumAmount, amountTotal, result);
        if(!result){
            setError(`Error.❌ La suma de los montos debe ser ${amountTotal} 👀` );
        }
        return result;
    }

    const getAmountToSend = (amountTotal: number) => {
        const entries = Object.entries(debtAmountUsers);
        const amountToPercentages = entries.map( ([userId, aMount]) => {
            const divisionAux = (aMount/amountTotal)*100;
            const finalAmount = Math.round(divisionAux * 100)/100
            return {user_id: userId, percentage: finalAmount } 
        });
        const sumRoundedPercentages = amountToPercentages.reduce((sum, entry) => sum + entry.percentage, 0);
        const difference = Math.round((100 - sumRoundedPercentages) * 100) / 100;
        amountToPercentages[amountToPercentages.length - 1].percentage += difference;
        return amountToPercentages;
    }

    return {debtAmountUsers, initializeUserAmounts, handlerAmounts, areValidAmounts, getAmountToSend}
}

