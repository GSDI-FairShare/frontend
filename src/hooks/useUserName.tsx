import { useState } from "react";

export const UseUserName = (setError) => {
    const [userName, setUserName] = useState('');
    const handlerUserName = (event) => {
        const newInput = event.target.value;
        setUserName(newInput);
    };

    const isValidUserName = () : boolean => {
        if (userName.trim() === "" || userName.length <= 5 ) {
            setError("Error: El nombre de usuario tiene que ser mayor a 6 caracteres");
            return false;
          }
        return true;
    }
    
    return {userName, handlerUserName, isValidUserName} 

}