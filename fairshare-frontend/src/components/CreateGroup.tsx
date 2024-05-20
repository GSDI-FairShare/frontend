// CreateGroup.js
import React, { useState } from 'react';
import { TextField, Button, IconButton, Grid, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export const CreateGroup = ({ addGroup, toggleScreen }) => {
  const [groupName, setGroupName] = useState('');
  const [emails, setEmails] = useState(['']);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addGroup({ name: groupName, members: emails.filter(email => email) });
    setGroupName('');
    setEmails(['']);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Crear un grupo</Typography>
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
