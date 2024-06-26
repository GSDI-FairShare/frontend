import axios, { AxiosResponse } from "axios";

const saveTokenAndSetScreen = (response:AxiosResponse<any, any>, toggleScreen:any) => {
    const token = response.data.access_token;
    localStorage.setItem('token', token); // Guardar el token en localStorage
    toggleScreen('/menu');
}

export const registerAUser = async (nameUser:string, inputEmail:string, inputPassword:string, toggleScreen:any, setError:any) => {
    setError({ activate: false, message:""});
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        username: nameUser,
        email: inputEmail,
        password: inputPassword
        }, {
          headers: {
          'Content-Type': 'application/json'
        }
      });
      saveTokenAndSetScreen(response, toggleScreen)
    } catch(error){
      setError({ activate: true, message:"Error: Ya se encuentra un usuario con el email registrado, Por favor, inténtelo de nuevo."});
    }
}

export const loginAUser = async (inputEmail: string, inputPassword: string, toggleScreen: any, setError:any) => {
    try{
      setError({ activate: false, message:""});
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
        username:inputEmail,
        password:inputPassword
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      saveTokenAndSetScreen(response, toggleScreen)
    } catch(error){
      setError({ activate: true, message:"Error: Email o password incorrectas"});
    }
}



