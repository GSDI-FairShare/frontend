import { Stack, TextField, Button } from "@mui/material";
import "../styles/login.css";
import { UseAccountRecovery } from "../hooks/useAccountRecovery";
import { UseError } from "../hooks/useError";

export const ForgotPassword = ({ toggleScreen }: { toggleScreen: any }) => {
  const {error, setError} = UseError();
  const {sendMessage, handlerEmail, isValidInput, message} = UseAccountRecovery(setError);
  
  const handlerSubmit = (event:any) => {
    event.preventDefault();
    if (!isValidInput()) {
      return;
    }
    sendMessage()
  };

  return (
    <form className='form' onSubmit={handlerSubmit}>
      <h1 className="login__title">Recuperar Contraseña</h1>
      <Stack spacing={3}>
        <TextField id="inputEmail" onChange={handlerEmail} label="Email" variant="outlined" size='medium' required />
        <Button type='submit' size='large' variant="contained">Enviar</Button>
        <Button onClick={() => toggleScreen('login')} size='large' variant="contained">Volver a Iniciar Sesión</Button>
        {error && <p className='message_error'>{error}</p>}
        {message && <p className='login__message'>{message}</p>}
      </Stack>
    </form>
  );
};
