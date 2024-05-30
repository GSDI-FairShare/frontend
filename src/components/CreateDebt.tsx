import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

export const CreateDebt = ({ toggleScreen, addDebt }) => {
  const [debtName, setDebtName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the auth token from localStorage
        if (!token) {
          setError("Error: Usuario no autenticado");
          return;
        }
        const response = await axios.get('http://localhost:5000/groups', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });

        setGroups(response.data);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.detail);
        } else {
          setError("Error: No se pudieron obtener los grupos. Por favor, inténtelo de nuevo.");
        }
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the auth token from localStorage

    if (!token) {
      setError("Error: Usuario no autenticado");
      return;
    }

    if (selectedGroup && debtName && amount && date) {
      try {
        const response = await axios.post(`http://localhost:5000/groups/${selectedGroup}/expenses`, {
          amount: parseFloat(amount),
          description: debtName,
          date: date
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });

        addDebt(response.data);
        setDebtName('');
        setSelectedGroup('');
        setAmount('');
        setDate('');
        toggleScreen('viewDebts');
      } catch (error) {
        console.error("Error al crear la deuda:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.detail);
        } else {
          setError("Error: No se pudo crear la deuda. Por favor, inténtelo de nuevo.");
        }
      }
    } else {
      alert('Todos los campos son obligatorios.');
    }
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
