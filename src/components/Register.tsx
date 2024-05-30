import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import "../login.css";
import { UseEmailAndPassword } from "../hooks/useEmailPassword";
import { registerAUser } from "../services/user";
import { UseUserName } from "../hooks/useUserName";

export const Register = ({ toggleScreen }) => {
  const [error, setError] = useState({ activate: false, message: "" });
  const {userName, handlerUserName, isValidUserName} = UseUserName(setError);
  const {inputEmail, inputPassword, handlerEmail, handlerPassword, isValidBasicEmailPassword } = UseEmailAndPassword(setError);
  
  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (! isValidBasicEmailPassword() || !isValidUserName()){
      return;
    }

    setError({ activate: false, message: "" });
    
    try {
      registerAUser(userName, inputEmail, inputPassword, toggleScreen);
    } catch (error) {
      setError({ activate: true, message: "Error: Ya se encuentra un usuario con el email registrado, Por favor, inténtelo de nuevo." });
    }
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Regístrate para Gestionar tus gastos 💳 💸</h1>
      <Stack spacing={3}>
        <TextField id="inputNameUser" onChange={handlerUserName} label="Me llamo" variant="outlined" size='medium' />
        <TextField id="inputEmail" onChange={handlerEmail} label="Mi email" variant="outlined" />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Mi Contraseña" variant="outlined" />
        {error.activate && <p className='message_error'>{error.message}</p>}
        <Button type="submit" size='large' variant="contained">Crear cuenta</Button>
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Ya tienes una cuenta? 👉 Inicia sesión</Button>
      </Stack>
    </form>
  );
};
