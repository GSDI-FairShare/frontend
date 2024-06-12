import { Button, Stack, TextField } from "@mui/material";
import "../styles/login.css";
import { UseEmailAndPassword } from "../hooks/useEmailPassword";
import { registerAUser } from "../services/auth";
import { UseUserName } from "../hooks/useUserName";
import { UseError } from "../hooks/useError";

export const Register = ({ toggleScreen }: { toggleScreen: any }) => {
  const {error, setError} = UseError();
  const {userName, handlerUserName, isValidUserName} = UseUserName(setError);
  const {inputEmail, inputPassword, handlerEmail, handlerPassword, isValidBasicEmailPassword } = UseEmailAndPassword(setError);
  
  const handlerSubmit = async (event:any) => {
    event.preventDefault();
    if (! isValidBasicEmailPassword() || !isValidUserName()){
      return;
    }
    registerAUser(userName, inputEmail, inputPassword, toggleScreen, setError);
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Regístrate para Gestionar tus gastos 💳 💸</h1>
      <Stack spacing={3}>
        <TextField id="inputNameUser" onChange={handlerUserName} label="Me llamo" variant="outlined" size='medium' />
        <TextField id="inputEmail" onChange={handlerEmail} label="Mi email" variant="outlined" />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Mi Contraseña" variant="outlined" />
        {error && <p className='message_error'>{error.message}</p>}
        <Button type="submit" size='large' variant="contained">Crear cuenta</Button>
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Ya tienes una cuenta? 👉 Inicia sesión</Button>
      </Stack>
    </form>
  );
};
