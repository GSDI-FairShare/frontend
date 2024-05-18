import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const ViewExpenses = ({ expenses, toggleScreen }) => {
  // Ordenar los gastos por fecha
  const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Verificar si hay gastos para mostrar
  const hasExpenses = sortedExpenses.length > 0;

  return (
    <div className='view-expenses'>
      <h1 className="form__title">Gastos Existentes</h1>
      {hasExpenses ? (
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
      )}
    </div>
  );
};
