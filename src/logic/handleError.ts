export const handleError =(message, error, setError) => {
    console.error(` ❌ Error :${message} `, error);
    if (error.response && error.response.data) {
      setError(error.response.data.detail);
    } else {
      setError("Error: Desconocido sin detalles ❌ ❌.");
    }
}