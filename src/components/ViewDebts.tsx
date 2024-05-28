import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Box, Divider, Button } from '@mui/material';

export const ViewDebts = ({ debts, toggleScreen, setSelectedDebt }) => {
  const handlePayDebt = (debt) => {
    setSelectedDebt(debt);
    toggleScreen('payDebt');
  };

  return (
    <div>
      <h1>Deudas Creadas</h1>
      {debts.length === 0 ? (
        <center><Typography>No hay deudas creadas.</Typography></center>
      ) : (
        <Box>
          {debts.map((debt, index) => (
            <Box key={index} mb={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{debt.name}</Typography>
                  <Divider />
                  <List>
                    <ListItem>
                      <ListItemText primary={`Grupo: ${debt.group}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Monto: $${debt.amount}`} />
                    </ListItem>
                  </List>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handlePayDebt(debt)}
                  >
                    Pagar Deuda
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
