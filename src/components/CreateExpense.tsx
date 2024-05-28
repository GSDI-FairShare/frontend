import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import axios from 'axios';

export const CreateExpense = ({ toggleScreen }) => {
    const [expenseDate, setExpenseDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState({ activate: false, message: "" });

    const handleDateChange = (event) => {
        setExpenseDate(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!expenseDate || !description || !amount) {
            setError({ activate: true, message: "Error: Todos los campos son obligatorios" });
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Obtener el token de autorización del localStorage

            if (!token) {
                setError({ activate: true, message: "Error: Usuario no autenticado" });
                return;
            }

            const response = await axios.post('http://localhost:5000/expenses', {
                date: expenseDate,
                description: description,
                amount: parseFloat(amount)
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
                }
            });

            console.log("Gasto creado:", response.data);
            toggleScreen('viewExpenses'); // Navegar a ver gastos después de agregar un nuevo gasto
        } catch (error) {
            console.error("Error durante la creación del gasto:", error);
            setError({ activate: true, message: "Error: No se pudo crear el gasto. Por favor, inténtelo de nuevo." });
        }
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
