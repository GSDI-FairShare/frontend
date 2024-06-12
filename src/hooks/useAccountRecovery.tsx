import { useState } from "react";

export const UseAccountRecovery = (setError:any) => {
    const [inputEmail, setInputEmail] = useState("");
    const [message, setMessage] = useState("");

    const handlerEmail = (event:any) => {
        const newInput = event.target.value;
        setInputEmail(newInput);
    };

    const isValidInput = () => {
        if (inputEmail.includes('@') === false) {
            setError("Error: El email deberia incluir un @");
            return false;
          }
        return true
    }
    
    const sendMessage = () => {
        setError("");
        setMessage("Un enlace para recuperar su contraseña ha sido enviado a su correo electrónico.");
    }

    return {sendMessage, handlerEmail, isValidInput, message};
}