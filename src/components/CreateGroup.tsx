import { TextField, Button, IconButton, Grid, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { UseGroup } from '../hooks/useGroup';
import { createGroup } from '../services/groups';
import { UseError } from '../hooks/useError';

export const CreateGroup = ({ toggleScreen }) => {
  const {error, setError} = UseError();
  const {groupName, emails, setGroupName,  handleAddEmailField,
         handleEmailChange, handleRemoveEmailField, resetFields,
         isValidInput, groupDescription, setGroupDescription } = UseGroup();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidInput(setError)){
      return;
    }
    await createGroup(groupName, groupDescription, emails, setError);
    resetFields();
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
        <TextField
          label="Descripcion del Grupo"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
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
