import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import "../styles/login.css";
import { UseAccountRecovery } from "../hooks/useAccountRecovery";

export const ForgotPassword = ({ toggleScreen }) => {
  const [error, setError] = useState({ activate: false, message: "" });
  const {sendMessage, handlerEmail, isValidInput, message} = UseAccountRecovery(setError);
  
  const handlerSubmit = (event) => {
    event.preventDefault();
    if (!isValidInput()) {
      return;
    }
    sendMessage()
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Recuperar Contraseña</h1>
      <Stack spacing={3}>
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' />
        <Button type='submit' size='large' variant="contained">Enviar</Button>
        {message && <p className='login__message'>{message}</p>}
        {error.activate && <p className='message_error'>{error.message}</p>}
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Volver a Iniciar Sesión</Button>
      </Stack>
    </form>
  );
};
