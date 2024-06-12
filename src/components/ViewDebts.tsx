import { Typography, Card, CardContent, Box, Divider, Button } from '@mui/material';
import { getAllDebtsFromMyGroups } from '../services/debts';
import { useEffect } from 'react';
import { UseError } from '../hooks/useError';
import { UseDebtsMyGroups } from '../hooks/useDebtsMyGroups';

export const ViewDebts = ({ toggleScreen, setSelectedDebt }: { toggleScreen: any, setSelectedDebt: any }) => {
  const { error, setError } = UseError();
  const { debtsFromMyGroups, setDebtsFromMyGroups } = UseDebtsMyGroups();

  useEffect(() => {
    getAllDebtsFromMyGroups(setError).then((debtsResult: any) => {
      console.log("getAllDebtsFromMyGroups", debtsResult);
      setDebtsFromMyGroups(debtsResult);
    });
  }, []);

  const handlePayDebt = (aDebt: any) => {
    setSelectedDebt(aDebt); // Establecer selectedDebt
    toggleScreen('payDebt');
  };

  const getPonderacion = (aPercentage: any) => {
    return Math.round(aPercentage * 100) / 100;
  };

  return (
    <Box>
      <h1>Deudas Creadas</h1>
      {debtsFromMyGroups.length === 0 ? (
        <center><Typography>No hay deudas creadas.</Typography></center>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {error && <Typography variant="h6" color="error"> Error: {error.message} </Typography>}
          {debtsFromMyGroups.map((aGroup: any) => (
            <Box key={aGroup.data[0].group_id} mb={2} flex="1 1 300px" maxWidth="calc(100%)">
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>Grupo: {aGroup.data[0].name} </Typography>
                  <Divider />
                  {aGroup.data.map((aDebt: any, index: any) => (
                    <Card key={index} sx={{ mt: 3, boxShadow: 5 }}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>Deuda: {aDebt.description}</Typography>
                        <Typography variant="h6">Categoría: {aDebt.category}</Typography>
                        <Typography variant='h6'>Monto total del gasto: ${aDebt.amount}</Typography>
                        <Divider sx={{ mb: 1 }} />
                        {aDebt.splits.map((aUser: any, index: any) => (
                          <Box key={index} mt={1} mb={3}>
                            <Typography>Nombre: {aUser.name}</Typography>
                            <Typography>Mail: {aUser.email}</Typography>
                            <Typography>Monto: {getPonderacion(aUser.amount)}</Typography>
                            <Typography>Ponderacion: {getPonderacion(aUser.percentage)}%</Typography>
                            <Typography mr={5}>Deuda pagada: {aUser.paid ? "Si" : "No"}</Typography>
                            <Button variant="contained" color="secondary" onClick={() => handlePayDebt(aDebt)}>Pagar Deuda</Button>
                            <Divider sx={{ mt: 2 }} />
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
