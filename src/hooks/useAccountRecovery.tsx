import { useState } from "react";

export const UseAccountRecovery = (setError) => {
    const [inputEmail, setInputEmail] = useState("");
    const [message, setMessage] = useState("");

    const handlerEmail = (event) => {
        const newInput = event.target.value;
        setInputEmail(newInput);
    };

    const isValidInput = () => {
        if (inputEmail.includes('@') === false) {
            setError({ activate: true, message: "Error: El email deberia incluir un @" });
            return false;
          }
        return true
    }
    const sendMessage = () => {
        setError({ activate: false, message: "" });
        setMessage("Un enlace para recuperar su contraseña ha sido enviado a su correo electrónico.");
    }

    return {sendMessage, handlerEmail, isValidInput, message};
}