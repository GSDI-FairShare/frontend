import { useState } from "react";

export const UseGroupsLayout = () => {
    const [groups, setGroups] = useState([]);
    const addGroup = (group) => {
        setGroups([...groups, group]);
      };
    
    return {groups, addGroup, setGroups}
}