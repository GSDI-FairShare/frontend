import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import "../login.css";

export const Register = ({ toggleScreen }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [error, setError] = useState({ activate: false, message: "" });

  const handlerEmail = (event) => {
    const newInput = event.target.value;
    setInputEmail(newInput);
  };

  const handlerPassword = (event) => {
    const newInput = event.target.value;
    setInputPassword(newInput);
  };

  const handlerUserName = (event) => {
    const newInput = event.target.value;
    setNameUser(newInput);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (inputEmail.includes('@') === false) {
      setError({ activate: true, message: "Error: El email deberia incluir un @" });
      return;
    }
    if (inputPassword.length < 6) {
      setError({ activate: true, message: "Error: La contraseña debe ser mayor a 6 caracteres" });
      return;
    }
    setError({ activate: false, message: "" });
    console.log("Enviados: inputEmail:", inputEmail, "inputPassword:", inputPassword);
    toggleScreen('menu');  // Navega al menú principal después de registrarse correctamente
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Regístrate para Gestionar tus gastos 💳 💸</h1>
      <Stack spacing={3}>
        <TextField id="inputNameUser" onChange={handlerUserName} label="Me llamo" variant="outlined" size='medium' />
        <TextField id="inputEmail" onChange={handlerEmail} label="Mi email" variant="outlined" />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Mi Contraseña" variant="outlined" />
        <Button onClick={handlerSubmit} size='large' variant="contained">Crear cuenta</Button>
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Ya tienes una cuenta? 👉 Inicia sesión</Button>
      </Stack>
    </form>
  );
};
