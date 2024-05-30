import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { UseManyExpenses } from "../hooks/useManyExpenses";

export const ViewExpenses = ({ toggleScreen }) => {
    const [error, setError] = useState({ activate: false, message: "" });
    const {expenses, getExpenses} = UseManyExpenses(setError);
    useEffect(() => {
        getExpenses();
        console.log("loop infinite.");
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
                                        <TableCell>{expense.description}</TableCell>
                                        <TableCell align="right">${expense.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <center><p>No hay gastos para visualizar 🚶💰</p></center>
                )
            )}
        </div>
    );
};
