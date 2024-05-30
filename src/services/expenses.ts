import axios from "axios";

export const createAExpensePersonal = async (expenseDate:string, description:string, amount:number, setError, toggleScreen) => {
    const token = localStorage.getItem('token'); // Obtener el token de autorización del localStorage
    if (!token) {
        setError({ activate: true, message: "Error: Usuario no autenticado" });
        return;
    }
    try{
        const response = await axios.post('http://localhost:5000/expenses', {
            date: expenseDate,
            description: description,
            amount: Number(amount)},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
        }});
        console.log("Gasto creado:", response.data);
        toggleScreen('viewExpenses'); // Navegar a ver gastos después de agregar un nuevo gasto
    } catch(error){
        console.error("Error durante la creación del gasto:", error);
        setError({ activate: true, message: "Error: No se pudo crear el gasto. Por favor, inténtelo de nuevo." });
    }
}

export const getExpensePersonal = async (setError) => {
    const token = localStorage.getItem('token'); // Obtener el token de autorización del localStorage
    if (!token) {
        setError({ activate: true, message: "Error: Usuario no autenticado" });
        return;
    }
    try{
        const response = await axios.get('http://localhost:5000/expenses', {
            headers: {
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
        }});
        return response
    }catch (error){
        console.error("Error al obtener los gastos:", error);
        setError({ activate: true, message: "Error: No se pudieron obtener los gastos personales. Por favor, inténtelo de nuevo." });
    }
}

