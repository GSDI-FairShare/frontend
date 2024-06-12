import axios from "axios";
import { handleError } from "../logic/handleError";
import { getToken } from "../logic/getToken";

export const getUserData = async ( user_id:number ,setError: (error: string) => void) => {
    const {isValid, token} = getToken();
    if (!isValid){
        return
    }
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user_id}`,{
          headers: {
                'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch(error){
      handleError("Al Obtener la Informacion del grupo ", error, setError)
    }
}

