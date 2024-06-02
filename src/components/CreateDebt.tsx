import { useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { getGroups } from '../services/groups';
import { createDebt } from '../services/debts';
import { UseCreateDebt } from '../hooks/useCreateDebt';
import { UseGroupsBasic } from '../hooks/useGroupsBasic';
import { UseError } from '../hooks/useError';

export const CreateDebt = ({ toggleScreen }) => {
  const {error, setError} = UseError();
  const {debtName, setDebtName, selectedGroupId, setSelectedGroupId,
        amount, setAmount, date, setDate, resetFields, isValidInput} = UseCreateDebt(setError);
  const {groups, setGroups} = UseGroupsBasic();

  useEffect(() => {
    getGroups(setError).then( (groupsResult) =>{ console.log("groupsResult", groupsResult);
     setGroups(groupsResult) } );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( !isValidInput()){
      return;
    }
    await createDebt(selectedGroupId, debtName, amount, date,  setError)
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
          value={selectedGroupId}
          onChange={(e) => { 
           setSelectedGroupId(e.target.value)}}
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
