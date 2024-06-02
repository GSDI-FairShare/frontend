import { useState } from "react";

export const UseDebtsMyGroups = () => {
    const [debtsFromMyGroups, setDebtsFromMyGroups] = useState([]);
    return {debtsFromMyGroups, setDebtsFromMyGroups}
}
