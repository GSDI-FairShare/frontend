import { useState } from "react";
import { getExpensePersonal } from "../services/expenses";


export const UseManyExpenses = (setError) => {
    const [expenses, setExpenses] = useState([]);
    const getExpenses = async () => {
        const response = await getExpensePersonal(setError);
        setExpenses(response.data);
    };
    return {expenses, getExpenses}
}