import { useState } from "react";

export const UseExpense = (setError) => {
    const [expenseDate, setExpenseDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    
    const handleDateChange = (event) => {
        setExpenseDate(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const isValidExpense = () :boolean => {
        if(expenseDate=="" || description=="" || amount==0){
            setError("Error: Todos los campos son obligatorios");
            return false;
        } else if (amount < 0) {
            setError("Error: El monto no puede ser negativo");
            return false;
        }
        return true;
    }
    return {expenseDate, description, amount, handleDateChange, handleDescriptionChange, handleAmountChange, isValidExpense}
}
