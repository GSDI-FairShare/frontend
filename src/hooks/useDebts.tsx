import { useState } from "react";

export const UseDebts = () => {
    const [debts, setDebts] = useState([]);
    const addDebt = (debt) => {
        setDebts([...debts, debt]);
      };
    return {debts, addDebt}
}
