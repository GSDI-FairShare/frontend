import axios, { AxiosResponse } from "axios";

const saveTokenAndSetScreen = (response:AxiosResponse<any, any>, toggleScreen) => {
    const token = response.data.access_token;
    localStorage.setItem('token', token); // Guardar el token en localStorage
    toggleScreen('/menu');
}

export const registerAUser = async (nameUser:string, inputEmail:string, inputPassword:string, toggleScreen) => {
    const response = await axios.post('http://0.0.0.0:5000/signup', {
        username: nameUser,
        email: inputEmail,
        password: inputPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    saveTokenAndSetScreen(response, toggleScreen)
}

export const loginAUser = async (inputEmail: string, inputPassword: string, toggleScreen: any) => {
    const formData = new URLSearchParams();
    formData.append('username', inputEmail);
    formData.append('password', inputPassword);
    const response = await axios.post('http://0.0.0.0:5000/signin', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    saveTokenAndSetScreen(response, toggleScreen)
}

