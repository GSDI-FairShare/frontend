import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

export const CreateDebt = ({ toggleScreen, groups, addDebt }) => {
  const [debtName, setDebtName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGroup && debtName && amount) {
      addDebt({ name: debtName, group: selectedGroup, amount: parseFloat(amount) });
      setDebtName('');
      setSelectedGroup('');
      setAmount('');
      toggleScreen('viewDebts');
    } else {
        alert('Todos los campos son obligatorios.');
    }
};

return (
    <div>
        <h1>Crear Deuda</h1>
        <form style={{ marginTop: '0rem' }} onSubmit={handleSubmit}>
        <TextField
        label="Nombre de la Deuda"
        value={debtName}
        onChange={(e) => setDebtName(e.target.value)}
        fullWidth
        required
        margin="normal"
        />
        <TextField
        label="Seleccionar Grupo"
        select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        fullWidth
        required
        margin="normal"
        >
        {groups.map((group, index) => (
        <MenuItem key={index} value={group.name}>
            {group.name}
        </MenuItem>
        ))}
        </TextField>
        <TextField
        label="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
        margin="normal"
        type="number"
        />
        <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '1rem' }}
        >
        Crear Deuda
        </Button>
        </form>
    </div>
    );
};