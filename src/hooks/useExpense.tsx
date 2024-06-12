import { useState } from "react";

export const UseExpense = (setError:any) => {
    const [expenseDate, setExpenseDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    
    const handleDateChange = (event:any) => {
        setExpenseDate(event.target.value);
    };

    const handleDescriptionChange = (event:any) => {
        setDescription(event.target.value);
    };

    const handleAmountChange = (event:any) => {
        setAmount(event.target.value);
    };

    const isValidExpense = () :boolean => {
        if(expenseDate=="" || description=="" || amount==0){
            setError({ activate: true, message:"Error: Todos los campos son obligatorios"});
            return false;
        } else if (amount < 0) {
            setError({ activate: true, message:"Error: El monto no puede ser negativo"});
            return false;
        }
        return true;
    }
    return {expenseDate, description, amount, handleDateChange, handleDescriptionChange, handleAmountChange, isValidExpense}
}
