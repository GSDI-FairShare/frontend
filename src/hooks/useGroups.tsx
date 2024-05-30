import { useState } from "react";

export const UseGroups = () => {
    const [groups, setGroups] = useState([]);
    const addGroup = (group) => {
        setGroups([...groups, group]);
      };
    
    return {groups, addGroup}
}