import { useState } from "react";

export const UseEmailAndPassword = (setError) => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    
    const handlerEmail = (event) => {
        const newInput = event.target.value;
        setInputEmail(newInput);
    };
    
    const handlerPassword = (event) => {
        const newInput = event.target.value;
        setInputPassword(newInput);
    };
    
    const isValidBasicEmailPassword = () :boolean => {
        if (!inputEmail.includes('@')) {
            setError("Error: El email debería incluir un @");
            return false;
          }
          if (inputPassword.length < 6) {
            setError("Error: La contraseña debe ser mayor a 6 caracteres");
            return false;
          }
        return true
    }    


    return {inputEmail, inputPassword, handlerEmail, handlerPassword, isValidBasicEmailPassword} 
}