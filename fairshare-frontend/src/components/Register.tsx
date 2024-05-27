import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../login.css";

export const Register = ({ toggleScreen }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [error, setError] = useState({ activate: false, message: "" });
  const navigate = useNavigate();

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

  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (!inputEmail.includes('@')) {
      setError({ activate: true, message: "Error: El email debería incluir un @" });
      return;
    }
    if (inputPassword.length < 6) {
      setError({ activate: true, message: "Error: La contraseña debe ser mayor a 6 caracteres" });
      return;
    }
    if (nameUser.trim() === "") {
      setError({ activate: true, message: "Error: El nombre de usuario no puede estar vacío" });
      return;
    }
    setError({ activate: false, message: "" });

    try {
      const response = await axios.post('http://0.0.0.0:5000/signup', {
        username: nameUser,
        email: inputEmail,
        password: inputPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Registro exitoso:", response.data);
      navigate('/menu');
    } catch (error) {
      console.error("Error durante el registro:", error);
      setError({ activate: true, message: "Error: No se pudo registrar el usuario. Por favor, inténtelo de nuevo." });
    }
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Regístrate para Gestionar tus gastos 💳 💸</h1>
      <Stack spacing={3}>
        <TextField id="inputNameUser" onChange={handlerUserName} label="Me llamo" variant="outlined" size='medium' />
        <TextField id="inputEmail" onChange={handlerEmail} label="Mi email" variant="outlined" />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Mi Contraseña" variant="outlined" />
        {error.activate && <p className='login__error'>{error.message}</p>}
        <Button type="submit" size='large' variant="contained">Crear cuenta</Button>
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Ya tienes una cuenta? 👉 Inicia sesión</Button>
      </Stack>
    </form>
  );
};
