import axios from "axios";

export const createAExpensePersonal = async (expenseDate:string, description:string, amount:number, setError, toggleScreen) => {
    const token = localStorage.getItem('token'); // Obtener el token de autorización del localStorage
    if (!token) {
        setError({ activate: true, message: "Error: Usuario no autenticado" });
        return;
    }
    const response = await axios.post('http://localhost:5000/expenses', {
        date: expenseDate,
        description: description,
        amount: Number(amount)},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluir el token en el encabezado de autorización
            }
    });
    console.log("Gasto creado:", response.data);
    toggleScreen('viewExpenses'); // Navegar a ver gastos después de agregar un nuevo gasto
}

