import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { getGroups } from '../services/groups';
import { createDebt } from '../services/debts';
import { UseCreateDebt } from '../hooks/useCreateDebt';
import { UseGroupsLayout } from '../hooks/useGroupsLayout';

export const CreateDebt = ({ toggleScreen, addDebt }) => {
  const [error, setError] = useState("");
  const {debtName, setDebtName, selectedGroup, setSelectedGroup,
        amount, setAmount, date, setDate, resetFields, isValidInput} = UseCreateDebt(setError);
  const {groups, setGroups} = UseGroupsLayout();
    
  useEffect(() => {
    getGroups(setError).then( (groupsResult) =>{ setGroups(groupsResult) } );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( !isValidInput()){
      return;
    }
    const response = await createDebt(selectedGroup, debtName, amount, date,  setError)
    addDebt(response.data);
    resetFields();
    toggleScreen('viewDebts');
  };

  return (
    <div>
      <h1>Crear Deuda</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <MenuItem key={index} value={group.id}>
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
        <TextField
          label="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
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
