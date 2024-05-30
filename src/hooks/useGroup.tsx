import { useState } from "react";

export const UseGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [emails, setEmails] = useState(['']);

    const handleEmailChange = (index, event) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails([newEmails]);
      };
    
    const handleAddEmailField = () => {
      setEmails([...emails, '']);
    };

    const handleRemoveEmailField = (index) => {
      const newEmails = [...emails];
      const removeEmails = newEmails.splice(index, 1);
      console.log("removeEmails", removeEmails);
      setEmails(newEmails);
    };
    
    const resetFields = () => {
        setGroupName('');
        setEmails(['']);
    }
    return {groupName, emails, setGroupName, handleEmailChange, handleAddEmailField, handleRemoveEmailField, resetFields}
}

