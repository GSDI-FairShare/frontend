import axios from "axios";

export const getUserData = async ( user_id:number ,setError) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Ups estas sin token ❌ 🧑‍🎄 ");
      return null;
    }
    try{
      const response = await axios.get(`http://0.0.0.0:5000/users/${user_id}`,{
          headers: {
                'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch(error){
      console.log("Error: Id del usuario no existe ❌ ❌");
      setError("Error: Id del usuario no existe ❌");
    }
}

