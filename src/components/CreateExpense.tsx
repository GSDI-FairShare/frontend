import { Button, Stack, TextField } from "@mui/material";
import { UseExpense } from "../hooks/useExpense";
import { createAExpensePersonal } from "../services/expenses";
import "../styles/createExpenses.css";
import { UseError } from "../hooks/useError";

export const CreateExpense = ({ toggleScreen }) => {
    const {error, setError} = UseError();
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
        <form  className="form__CreateExpenses" onSubmit={handleSubmit}>
            <h1> Crear un Gasto Personal</h1>
            <Stack spacing={3}>
                <TextField required id="expenseDate" label="Fecha del gasto" variant="outlined" type="date" value={expenseDate} InputLabelProps={{ shrink: true }} onChange={handleDateChange} />
                <TextField required id="description" label="Descripción" variant="outlined" value={description} onChange={handleDescriptionChange} />
                <TextField required id="amount" label="Monto" variant="outlined" type="number" value={amount} onChange={handleAmountChange} />
                {error && <p className='form__error'>{error}</p>}
                <Button type='submit' size='large' variant="contained">Agregar Gasto</Button>
            </Stack>
        </form>
    );
};
