import { useState } from "react";

export const UseUserName = (setError:any) => {
    const [userName, setUserName] = useState('');
    const handlerUserName = (event:any) => {
        const newInput = event.target.value;
        setUserName(newInput);
    };

    const isValidUserName = () : boolean => {
        if (userName.trim() === "" || userName.length <= 5 ) {
            setError({ activate: true, message:"Error: El nombre de usuario tiene que ser mayor a 6 caracteres"});
            return false;
          }
        return true;
    }
    
    return {userName, handlerUserName, isValidUserName} 

}