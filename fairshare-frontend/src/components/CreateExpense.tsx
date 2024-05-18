import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

export const CreateExpense = ({ addExpense, toggleScreen }) => {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');

    const handleNameChange = (event) => {
        setExpenseName(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (expenseName && amount) {
            const currentDate = new Date(); // Obtener la fecha actual
            addExpense({ 
                name: expenseName, 
                amount: parseFloat(amount), 
                date: currentDate.toLocaleDateString() // Convertir la fecha a un formato de cadena
            });
            toggleScreen('viewExpenses');  // Navigate to view expenses after adding a new expense
        }
    };

    return (
        <form className='form' style={{ marginTop: '0rem' }} onSubmit={handleSubmit}>
            <h1 className="form__title">Crear un Gasto Personal</h1>
            <Stack spacing={3}>
                <TextField id="expenseName" label="Nombre del gasto" variant="outlined" value={expenseName} onChange={handleNameChange} />
                <TextField id="amount" label="Monto" variant="outlined" type="number" value={amount} onChange={handleAmountChange} />
                <Button type='submit' size='large' variant="contained">Agregar Gasto</Button>
            </Stack>
        </form>
    );
};
