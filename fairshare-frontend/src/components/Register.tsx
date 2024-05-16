import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import "../login.css"

export const Register = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [nameUser, setNameUser] = useState('')
    const [error, setError] = useState({activate: false, message: ""});

    const handlerEmail = (event) => {
        const newInput = event.target.value;
        setInputEmail(newInput)
    }
    
    const handlerPassword = (event) => {
        const newInput = event.target.value;
        setInputPassword(newInput)
    }

    const handlerUserName = (event) => {
        const newInput = event.target.value;
        setNameUser(newInput)
    }

    const handlerSubmit = (event) => {
        event.preventDefault(); // prevenir q recarge automaticamente.
        // Validaciones de email y size de password basicas.
        if(inputEmail.includes('@') === false){
          setError({activate:true , message: "Error: El email deberia incluir un @"})
          return;
        }
        if (inputPassword.length < 6){
          setError({activate:true , message: "Error: La contraseña debe ser mayor a 6 caracteres"})
          return;
        }
        setError({activate:false , message: ""})
        console.log("Enviados: inputEmail:", inputEmail, "inputPassword:", inputPassword );
      }


    return (
    <form action="">
        <h1 className="login__title" >Registrate para Gestionar tus gastos 💳 💸</h1>
        <Stack spacing={3}>
            <TextField id="inputNameUser" onChange={handlerUserName} label="Me llamo " variant="outlined" size='medium' />
            <TextField id="inputEmail" onChange={handlerEmail} label="Mi email" variant="outlined" />
            <TextField id="inputPassword" onChange={handlerPassword} type='password'  label="Mi Contraseña" variant="outlined" />
            <Button onClick={handlerSubmit} size='large' variant="contained">Crear cuenta</Button>
        </Stack>
    </form>)
}