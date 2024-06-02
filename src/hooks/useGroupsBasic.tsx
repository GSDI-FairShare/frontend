import { useState } from "react";

export const UseGroupsBasic = () => {
    const [groups, setGroups] = useState([]);
    return {groups,  setGroups}
}