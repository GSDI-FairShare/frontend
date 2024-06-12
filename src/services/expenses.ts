import axios from "axios";
import { getToken } from "../logic/getToken";

export const createAExpensePersonal = async (expenseDate:any, description:any, amount:any, category:any, setError:any, toggleScreen:any) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return;
    }
    try{
        const response = await axios.post('http://localhost:5000/expenses', {
            date: expenseDate,
            description: description,
            amount: Number(amount),
            category: category
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        });
        console.log("Gasto creado:", response.data);
        toggleScreen('viewExpenses'); // Navegar a ver gastos después de agregar un nuevo gasto
    } catch(error){
        console.error("Error durante la creación del gasto:", error);
        setError({ activate: true, message:"Error: ❌ No se pudo crear el gasto. Por favor, inténtelo de nuevo."});
    }
}

export const getExpensePersonal = async (setError:any) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return;
    }
    try{
        const response = await axios.get('http://localhost:5000/expenses', {
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
        });
        return response;
    }catch (error){
        console.error("Error al obtener los gastos:", error);
        setError({ activate: true, message:"Error: ❌ No se pudieron obtener los gastos personales. Por favor, inténtelo de nuevo."});
    }
}

export const getCategories = async (setError:any) => {
    try {
        const response = await axios.get('http://localhost:5000/categories');
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        setError({ activate: true, message:"Error: ❌ No se pudieron obtener las categorías. Por favor, inténtelo de nuevo."});
    }
};
