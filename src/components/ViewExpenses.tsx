import { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { UseManyExpenses } from "../hooks/useManyExpenses";
import { UseError } from "../hooks/useError";

export const ViewExpenses = ({ }) => {
    const { error, setError } = UseError();
    const { expenses, getExpenses } = UseManyExpenses(setError);

    useEffect(() => {
        getExpenses();
    }, []);

    const sortedExpenses = expenses.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
                                    <TableCell>Categoría</TableCell>
                                    <TableCell align="right">Monto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedExpenses.map((expense: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{expense.date}</TableCell>
                                        <TableCell>{expense.description}</TableCell>
                                        <TableCell>{expense.category}</TableCell>
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
