import React, { useState } from 'react';
import { TextField, Button, IconButton, Grid, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

export const CreateGroup = ({ addGroup, toggleScreen }) => {
  const [groupName, setGroupName] = useState('');
  const [emails, setEmails] = useState(['']);
  const [error, setError] = useState(null);

  const handleEmailChange = (index, event) => {
    const newEmails = emails.slice();
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddEmailField = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmailField = (index) => {
    const newEmails = emails.slice();
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the auth token from localStorage
  
    if (!token) {
      setError("Error: Usuario no autenticado");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/groups', {
        name: groupName,
        members: emails.filter(email => email)  // Filter out empty emails
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
        }
      });
  
      // Call addGroup to update the parent component or state
      addGroup(response.data);
      setGroupName('');
      setEmails(['']);
      setError(null); // Clear previous error messages
    } catch (error) {
      console.error("Error al crear el grupo:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.detail);
      } else {
        setError("Error: No se pudo crear el grupo. Por favor, inténtelo de nuevo.");
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Crear un grupo</h1>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form style={{ marginTop: '0rem' }} onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Typography variant="h6">Emails de los miembros:</Typography>
        {emails.map((email, index) => (
          <Grid container spacing={1} alignItems="center" key={index}>
            <Grid item xs={10}>
              <TextField
                label={`Email ${index + 1}`}
                value={email}
                onChange={(e) => handleEmailChange(index, e)}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => handleRemoveEmailField(index)}
                disabled={emails.length === 1}
              >
                <Remove />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddEmailField}
          startIcon={<Add />}
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Añadir Email
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Crear Grupo
        </Button>
      </form>
    </div>
  );
};
