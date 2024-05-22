import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../login.css";

export const Login = ({ toggleScreen }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
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
    setError({ activate: false, message: "" });

    try {
      const formData = new URLSearchParams();
      formData.append('username', inputEmail);
      formData.append('password', inputPassword);

      const response = await axios.post('http://0.0.0.0:5000/signin', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log("Token:", response.data.access_token);
      navigate('/menu');
    } catch (error) {
      console.error("Error during sign in:", error);
      setError({ activate: true, message: "Error: Invalid email or password" });
    }
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Fair Share 🤝📖</h1>
      <Stack spacing={3}>
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Contraseña" variant="outlined" />
        {error.activate && <p className='login__error'>{error.message}</p>}
        <Button type="submit" size='large' variant="contained">Iniciar sesión</Button>
        <Button onClick={() => toggleScreen('register')} size='large' variant="contained">No tienes una cuenta? 👉 Regístrate</Button>
        <Button onClick={() => toggleScreen('forgotPassword')} size='large' variant="contained">Recuperar contraseña</Button>
      </Stack>
    </form>
  );
};
