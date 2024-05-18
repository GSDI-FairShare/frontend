import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import "../login.css";

export const ForgotPassword = ({ toggleScreen }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({ activate: false, message: "" });
  
  const handlerEmail = (event) => {
    const newInput = event.target.value;
    setInputEmail(newInput);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (inputEmail.includes('@') === false) {
        setError({ activate: true, message: "Error: El email deberia incluir un @" });
        return;
    }
    setError({ activate: false, message: "" });
    setMessage("Un enlace para recuperar su contraseña ha sido enviado a su correo electrónico.");
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Recuperar Contraseña</h1>
      <Stack spacing={3}>
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' />
        <Button type='submit' size='large' variant="contained">Enviar</Button>
        {message && <p className='login__message'>{message}</p>}
        {error.activate && <p className='login__error'>{error.message}</p>}
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Volver a Iniciar Sesión</Button>
      </Stack>
    </form>
  );
};
