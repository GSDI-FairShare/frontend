import axios from "axios";


export const createGroup = async (groupName, emails, setError) => {
    const token = localStorage.getItem('token'); // Get the auth token from localStorage
    if (!token) {
      setError("Error: Usuario no autenticado");
      return;
    }
    
    try{
      const groupResponse = await axios.post('http://localhost:5000/groups', {
      name: groupName,
      members: emails.filter(email => email)  // Filter out empty emails
      }, {
      headers: {
      'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
        }
      });
      const groupId = groupResponse.data.id;
      // Add members to the group
      await emails.filter(email => email).map(async email => {
        const userResponse = await axios.get(`http://localhost:5000/users/email/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userId = userResponse.data.id;
        return axios.post('http://localhost:5000/group_members', {
          user_id: userId,
          group_id: groupId
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    });
    setError(null); // Clear previous error messages
    return groupResponse;
    } catch( error) {
      console.error("Error al crear el grupo:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.detail);
      } else {
        setError("Error: No se pudo crear el grupo. Por favor, inténtelo de nuevo.");
      }
    }

}

export const getGroups = async (setGroups, setError) => {
  try {
    const token = localStorage.getItem('token'); // Get the auth token from localStorage
    if (!token) {
      setError("Error: Usuario no autenticado");
      return;
    }
    const response = await axios.get('http://localhost:5000/groups', {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });

    setGroups(response.data);
  } catch (error) {
    console.error("Error al obtener los grupos:", error);
    if (error.response && error.response.data) {
      setError(error.response.data.detail);
    } else {
      setError("Error: No se pudieron obtener los grupos. Por favor, inténtelo de nuevo.");
    }
  }
}

