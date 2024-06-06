import { useState } from "react";

export const UseDebtPercentages = (setError) => {
    const [percentageUsers, setPercentageUser] = useState({});
    
    const initializeUserPercentages = (resultInfoGroup) => {
        const initialPercentages = {}
        resultInfoGroup.members.forEach( (aMember) => { initialPercentages[aMember.user_id] = 0})
        setPercentageUser(initialPercentages);
    }

    const handlerPercentages = (aUserId:number, aNewPercentage:number) => {
        setPercentageUser( (prevState) => {
            return { ...prevState, [aUserId]: aNewPercentage }
        })
    }

    const areValidPercentages = () : boolean => {
        let accumPercentages = 0
        Object.values(percentageUsers).forEach( (aValuePercentage) => {
            accumPercentages += Number(aValuePercentage);
        } )
        const result = accumPercentages == 100;
        if(!result){
            setError("Error.❌ La suma de los porcentajes debe ser 100, por favor revisar 👀 ");
        }
        return result;
    }
    const getPercentagesToSend = () => {
        return Object.entries(percentageUsers).map( ([userId, aPercentage]) => {
            return {user_id: userId, percentage: aPercentage } 
        });
        
    }

    return {percentageUsers, handlerPercentages, initializeUserPercentages, areValidPercentages, getPercentagesToSend};
}   