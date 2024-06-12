import { useState, useEffect } from 'react';
import { Button, Stack, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { UseExpense } from "../hooks/useExpense";
import { createAExpensePersonal, getCategories } from "../services/expenses";
import "../styles/createExpenses.css";
import { UseError } from "../hooks/useError";

export const CreateExpense = ({ toggleScreen }: { toggleScreen: any }) => {
    const { error, setError } = UseError();
    const { expenseDate, description, amount, handleDateChange, handleDescriptionChange, handleAmountChange, isValidExpense } = UseExpense(setError);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories(setError);
            if (categoriesData) {
                setCategories(categoriesData);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!isValidExpense()) {
            return;
        }
        createAExpensePersonal(expenseDate, description, amount, selectedCategory, setError, toggleScreen);
    };

    const handleCategoryChange = (event:any) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <form className="form__CreateExpenses" onSubmit={handleSubmit}>
            <h1>Crear un Gasto Personal</h1>
            <Stack spacing={3}>
                <TextField required id="expenseDate" label="Fecha del gasto" variant="outlined" type="date" value={expenseDate} InputLabelProps={{ shrink: true }} onChange={handleDateChange} />
                <TextField required id="description" label="Descripción" variant="outlined" value={description} onChange={handleDescriptionChange} />
                <TextField required id="amount" label="Monto" variant="outlined" type="number" value={amount} onChange={handleAmountChange} />
                <FormControl required variant="outlined">
                    <InputLabel id="category-label">Categoría</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Categoría"
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {error && <p className='form__error'>{error.message}</p>}
                <Button type='submit' size='large' variant="contained">Agregar Gasto</Button>
            </Stack>
        </form>
    );
};
