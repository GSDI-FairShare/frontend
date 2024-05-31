import { useState } from "react";

export const UseCreateDebt = (setError) => {
    const [debtName, setDebtName] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');

    const resetFields = () => {
        setDebtName('');
        setSelectedGroup('');
        setAmount(0);
        setDate('');
    }

    const isValidInput = () => {
        if( selectedGroup === "" || debtName === "" || amount <= 0 || date === ""){
            setError("Error: Por favor complete todos los campos, ademas el monto debe ser mayor a cero");
            return false;
          }
        return true;
    }
    
    
    return {debtName, setDebtName, selectedGroup, setSelectedGroup, amount, setAmount, date, setDate, resetFields, isValidInput}
}