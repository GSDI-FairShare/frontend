import React, { useState, useEffect } from "react";
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from 'axios';

export const ViewExpenses = ({ toggleScreen }) => {
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState({ activate: false, message: "" });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token de autorización del localStorage

                if (!token) {
                    setError({ activate: true, message: "Error: Usuario no autenticado" });
                    return;
                }

                const response = await axios.get('http://localhost:5000/expenses', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
                    }
                });

                setExpenses(response.data);
            } catch (error) {
                console.error("Error al obtener los gastos:", error);
                setError({ activate: true, message: "Error: No se pudieron obtener los gastos. Por favor, inténtelo de nuevo." });
            }
        };

        fetchExpenses();
    }, []);

    // Ordenar los gastos por fecha
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Verificar si hay gastos para mostrar
    const hasExpenses = sortedExpenses.length > 0;

    return (
        <div className='view-expenses'>
            <h1 className="form__title">Gastos Existentes</h1>
            {error.activate ? (
                <center><p>{error.message}</p></center>
            ) : (
                hasExpenses ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="right">Monto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedExpenses.map((expense, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{expense.date}</TableCell>
                                        <TableCell>{expense.name}</TableCell>
                                        <TableCell align="right">${expense.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <center><p>No hay gastos para visualizar</p></center>
                )
            )}
        </div>
    );
};
