export const getToken = ()  => {
    const token = localStorage.getItem('token'); // Obtener el token de autorización del localStorage
    if (!token) {
        alert("❗El token ha expirado. 🫱 Volviendo al login");
        window.location.href = '/login'; // Redirigir a la ruta de login
        return {isValid:false, token:""};
    }
    return {isValid:true, token:token};
}