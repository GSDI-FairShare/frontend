import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

export const ViewDebts = ({ debts }) => {
  return (
    <div>
      <h1>Deudas Creadas</h1>
      {debts.length === 0 ? (
        <Typography>No hay deudas creadas.</Typography>
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
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};
