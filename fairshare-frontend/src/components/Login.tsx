import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import "../login.css";

export const Login = ({ toggleScreen }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState({ activate: false, message: "" });

  const handlerEmail = (event) => {
    const newInput = event.target.value;
    setInputEmail(newInput);
  };

  const handlerPassword = (event) => {
    const newInput = event.target.value;
    setInputPassword(newInput);
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
    toggleScreen('menu');  // Navega al menú principal después de iniciar sesión correctamente
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Fair Share 🤝📖</h1>
      <Stack spacing={3}>
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Contraseña" variant="outlined" />
        {error.activate && <p className='login__error'>{error.message}</p>}
        <Button onClick={handlerSubmit} size='large' variant="contained">Iniciar sesión</Button>
        <Button onClick={() => toggleScreen('register')} size='large' variant="contained">No tienes una cuenta? 👉 Regístrate</Button>
        <Button onClick={() => toggleScreen('forgotPassword')} size='large' variant="contained">Recuperar contraseña</Button>
      </Stack>
    </form>
  );
};
