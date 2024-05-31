import axios from "axios";

export const createDebt = async (selectedGroup:string, debtName:string, amount:number, date:string, setError) => {
    const token = localStorage.getItem('token'); // Get the auth token from localStorage
    if (!token) {
      setError("Error: Usuario no autenticado");
      return;
    }
    try{
        const response = await axios.post(`http://localhost:5000/groups/${selectedGroup}/expenses`, {
            amount: amount,
            description: debtName,
            date: date
          }, {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
          });
        return response;
    } catch(error){
        console.error("Error al crear la deuda:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.detail);
        } else {
          setError("Error: No se pudo crear la deuda. Por favor, inténtelo de nuevo.");
        }
    }
}