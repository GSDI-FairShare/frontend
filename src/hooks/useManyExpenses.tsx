import { useState } from "react";
import { getExpensePersonal } from "../services/expenses";

export const UseManyExpenses = (setError:any) => {
    const [expenses, setExpenses] = useState([]);
    const getExpenses = async () => {
        const response = await getExpensePersonal(setError);
        if (response) {
            setExpenses(response.data);
        }
    };
    return { expenses, getExpenses };
};
