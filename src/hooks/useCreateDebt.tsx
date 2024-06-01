import { useState } from "react";

export const UseCreateDebt = (setError) => {
    const [debtName, setDebtName] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');

    const resetFields = () => {
        setDebtName('');
        setSelectedGroupId('');
        setAmount(0);
        setDate('');
    }

    const isValidInput = () => {
        if( selectedGroupId === "" || debtName === "" || amount <= 0 || date === ""){
            setError("Error: Por favor complete todos los campos, ademas el monto debe ser mayor a cero");
            return false;
          }
        return true;
    }
    
    
    return {debtName, setDebtName, selectedGroupId, setSelectedGroupId, amount, setAmount, date, setDate, resetFields, isValidInput}
}