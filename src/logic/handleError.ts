export const handleError =(message:any, error:any, setError:any) => {
    console.error(` ❌ Error :${message} `, error);
    if (error.response && error.response.data) {
      setError({ activate: true, message:error.response.data.detail});
    } else {
      setError({ activate: true, message:"Error: Desconocido sin detalles ❌ ❌."});
    }
}