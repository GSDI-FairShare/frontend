import { useState } from "react";

export const UseGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [emails, setEmails] = useState(['']);

    const handleEmailChange = (index:any, event:any) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails(newEmails);
      };
    
    const handleAddEmailField = () => {
      setEmails([...emails, '']);
    };

    const handleRemoveEmailField = (index:any) => {
      const newEmails = [...emails];
      const removeEmails = newEmails.splice(index, 1);
      console.log("removeEmails", removeEmails);
      setEmails(newEmails);
    };
    
    const isValidInput = (setError:any) :boolean => {
      if (groupName === "" || groupName.length < 5 ){
        setError("Por favor, ingrese un nombre de grupo con mas de 5 caracteres");
        return false;
      }
      if(emails.length <= 0 ){
        setError("Por favor, ingrese mas de un mail");
        return false
      }
      setEmails(emails.filter( (aEmail) => {return aEmail !== "" && aEmail.includes("@") } ));
      return true
    }
    
    const resetFields = () => {
        setGroupName('');
        setEmails(['']);
        setGroupDescription('');
    }
    return {groupName, emails, setGroupName, handleEmailChange, handleAddEmailField, handleRemoveEmailField, resetFields, isValidInput, groupDescription, setGroupDescription}
}

