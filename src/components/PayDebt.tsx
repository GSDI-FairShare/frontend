import { TextField, Button, Box } from '@mui/material';

export const PayDebt = ({ toggleScreen, selectedDebt }: { toggleScreen: any, selectedDebt: any }) => {
  const handlePay = () => {
    alert(`Deuda ${selectedDebt.name} pagada con éxito.`);
    toggleScreen('viewDebts');
  };

  return (
    <Box>
      {selectedDebt && (
        <>
          <h1>Pagar Deuda</h1>
          <TextField
            label="Nombre de la Deuda"
            value={selectedDebt.name}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Grupo"
            value={selectedDebt.group}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Monto"
            value={`$${selectedDebt.amount}`}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Medio de pago"
            value="Efectivo"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
            onClick={handlePay}
          >
            Confirmar Pago
          </Button>
        </>
      )}
    </Box>
  );
};
