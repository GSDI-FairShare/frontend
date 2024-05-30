import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { UseExpense } from "../hooks/useExpense";
import { createAExpensePersonal } from "../services/expenses";

export const CreateExpense = ({ toggleScreen }) => {
    const [error, setError] = useState({ activate: false, message: "" });
    const {expenseDate, description, amount, handleDateChange, 
            handleDescriptionChange, handleAmountChange, isValidExpense } = UseExpense(setError);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isValidExpense()) {
            return;
        }
        createAExpensePersonal(expenseDate, description, amount, setError, toggleScreen);
    };

    return (
        <form className='form' style={{ marginTop: '0rem' }} onSubmit={handleSubmit}>
            <h1 className="form__title">Crear un Gasto Personal</h1>
            <Stack spacing={3}>
                <TextField id="expenseDate" label="Fecha del gasto" variant="outlined" type="date" value={expenseDate} onChange={handleDateChange} />
                <TextField id="description" label="Descripción" variant="outlined" value={description} onChange={handleDescriptionChange} />
                <TextField id="amount" label="Monto" variant="outlined" type="number" value={amount} onChange={handleAmountChange} />
                {error.activate && <p className='form__error'>{error.message}</p>}
                <Button type='submit' size='large' variant="contained">Agregar Gasto</Button>
            </Stack>
        </form>
    );
};
