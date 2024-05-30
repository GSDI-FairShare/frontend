import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import "../login.css";
import { UseEmailAndPassword } from "../hooks/useEmailPassword";
import { loginAUser } from "../services/userAccount";

export const Login = ({ toggleScreen }) => {
  const [error, setError] = useState({ activate: false, message: "" });
  const {inputEmail, inputPassword, handlerEmail,
      handlerPassword, isValidBasicEmailPassword } = UseEmailAndPassword(setError);
  
  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (!isValidBasicEmailPassword()){
      return;
    }
    loginAUser(inputEmail, inputPassword, toggleScreen, setError);
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Fair Share 🤝📖</h1>
      <Stack spacing={3}>
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Contraseña" variant="outlined" />
        {error.activate && <p className='message_error'>{error.message}</p>}
        <Button type="submit" size='large' variant="contained">Iniciar sesión</Button>
        <Button onClick={() => toggleScreen('register')} size='large' variant="contained">No tienes una cuenta? 👉 Regístrate</Button>
        <Button onClick={() => toggleScreen('forgotPassword')} size='large' variant="contained">Recuperar contraseña</Button>
      </Stack>
    </form>
  );
};
