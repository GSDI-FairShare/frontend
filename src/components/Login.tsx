import { Stack, TextField, Button } from "@mui/material";
import "../styles/login.css";
import { UseEmailAndPassword } from "../hooks/useEmailPassword";
import { loginAUser } from "../services/auth";
import { UseError } from "../hooks/useError";

export const Login = ({ toggleScreen }: { toggleScreen: any }) => {
  const {error, setError} = UseError();
  const {inputEmail, inputPassword, handlerEmail,
      handlerPassword, isValidBasicEmailPassword } = UseEmailAndPassword(setError);
  
  const handlerSubmit = async (event:any) => {
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
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' required />
        <TextField id="inputPassword" onChange={handlerPassword} type='password' label="Contraseña" variant="outlined" required />
        {error && <p className='message_error'>{error.message}</p>}
        <Button type="submit" size='large' variant="contained">Iniciar sesión</Button>
        <Button onClick={() => toggleScreen('register')} size='large' variant="contained">No tienes una cuenta? 👉 Regístrate</Button>
        <Button onClick={() => toggleScreen('forgotPassword')} size='large' variant="contained">Recuperar contraseña</Button>
      </Stack>
    </form>
  );
};
